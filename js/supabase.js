/**
 * Diamond Cleaning - Supabase Connection + State Management
 * ربط قاعدة البيانات الحقيقية مع fallback للبيانات التجريبية
 */

const SUPABASE_URL = 'https://hkhbwtdbivzoqyaoamld.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Xc6Q4c302xtqfOlcqgY4bA_UzbYpk23';

// تهيئة Supabase client
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.db = db;

// ===== STATE (البيانات الحية) =====
window.STATE = {
  technicians: [],
  customers:   [],
  payments:    [],
  contracts:   [],
  receivers:   [],
  districts:   [],
  loaded:      false,
  useSupabase: true,
};

// ===== تحميل البيانات من Supabase =====
async function loadDataFromSupabase() {
  try {
    console.log('⏳ جاري تحميل البيانات من Supabase...');

    // تحميل الفنيين
    const { data: techs, error: tErr } = await db
      .from('technicians').select('*').eq('active', true).order('id');
    if (tErr) throw tErr;
    STATE.technicians = techs || [];

    // تحميل العملاء مع اسم الفني
    const { data: custs, error: cErr } = await db
      .from('customers').select('*').order('name');
    if (cErr) throw cErr;

    // ربط اسم الفني بكل عميل
    STATE.customers = (custs || []).map(c => ({
      ...c,
      id:                  c.id,
      name_ar:             c.name,
      secret_code:         c.secret_code || generateCode(c.id),
      technician_name:     STATE.technicians.find(t => t.id === c.technician_id)?.name || '—',
      monthly_subscription: c.monthly_fee || 0,
      completeness_score:  calcCompleteness(c),
      missing_fields:      getMissingFields(c),
    }));

    // تحميل الدفعات
    const { data: pays, error: pErr } = await db
      .from('payments').select('*').order('payment_date', { ascending: false });
    if (pErr) throw pErr;

    STATE.payments = (pays || []).map(p => ({
      ...p,
      customer_id:    p.customer_id,
      customer_name:  STATE.customers.find(c => c.id === p.customer_id)?.name_ar || '—',
      amount:         p.amount,
      payment_date:   p.payment_date,
      payment_month:  p.payment_date ? parseInt(p.payment_date.split('-')[1]) : null,
      payment_year:   p.payment_date ? parseInt(p.payment_date.split('-')[0])  : null,
      receiver_name:  p.receiver || '—',
      payment_method: p.receiver || '—',
    }));

    // تحميل العقود
    const { data: cons, error: conErr } = await db
      .from('contracts').select('*').order('id');
    if (!conErr && cons) {
      STATE.contracts = cons.map(c => ({
        ...c,
        customer_name: STATE.customers.find(x => x.id === c.customer_id)?.name_ar || '—',
        total_amount:  c.total_amount || 0,
        monthly_amount: c.monthly_amount || 0,
      }));
    }

    // مناطق فريدة
    STATE.districts = [...new Set(STATE.customers.map(c => c.district).filter(Boolean))];

    // تحميل بيانات الشركة
    const { data: compInfo } = await db.from('company_info').select('*').limit(1).single();
    if (compInfo) STATE.company_info = compInfo;

    // مستلمو الدفعات (من الفنيين + ثابت)
    STATE.receivers = [
      { id: 99, name: 'كاش', type: 'كاش' },
      { id: 100, name: 'حوالة بنكية', type: 'حوالة بنكية' },
      ...STATE.technicians.map(t => ({ id: t.id, name: t.name, type: 'فرد' })),
    ];

    // سجل الإجازات
    const { data: leaves } = await db
      .from('employee_leaves')
      .select('*')
      .order('leave_start', { ascending: false });
    STATE.leaves = leaves || [];

    // سجل تجديد الوثائق
    const { data: empDocs } = await db
      .from('employee_documents')
      .select('*')
      .order('renewal_date', { ascending: false });
    STATE.empDocs = empDocs || [];

    STATE.loaded = true;
    STATE.useSupabase = true;
    console.log(`✅ تم تحميل البيانات من Supabase`);
    console.log(`   العملاء: ${STATE.customers.length} | الدفعات: ${STATE.payments.length} | الفنيون: ${STATE.technicians.length}`);
    updateConnectionStatus(true);
    return true;

  } catch (err) {
    console.error('❌ خطأ في تحميل Supabase - الوضع التجريبي:', err.message);
    STATE.useSupabase = false;
    updateConnectionStatus(false);
    return false;
  }
}

// ===== حفظ عميل جديد =====
async function saveCustomerToDB(formData) {
  const code = await generateNextCode();
  const payload = {
    secret_code:    code,
    name:           formData.name_ar,
    phone:          formData.phone,
    district:       formData.district,
    technician_id:  formData.technician_id ? parseInt(formData.technician_id) : null,
    monthly_fee:    parseFloat(formData.monthly_subscription) || 0,
    contract_amount: parseFloat(formData.monthly_subscription || 0) * (parseInt(formData.period_months) || 12),
    period_months:  parseInt(formData.period_months) || 12,
    contract_start: formData.contract_start || null,
    payment_type:   formData.payment_type || 'متأخر',
    pool_type:      formData.pool_type || null,
    weekly_visits:  parseInt(formData.weekly_visits) || 2,
    visit_days:     formData.visit_days || null,
    notes:          formData.notes || null,
    job_title:      formData.job_title || null,
    house_number:   formData.house_number || null,
    status:         'يعمل',
    updated_at:     new Date().toISOString(),
  };

  const { data, error } = await db.from('customers').insert([payload]).select().single();
  if (error) throw error;

  // أضف للـ STATE محلياً فوراً
  const techName = STATE.technicians.find(t => t.id === data.technician_id)?.name || '—';
  const newCust = {
    ...data,
    name_ar:             data.name,
    technician_name:     techName,
    monthly_subscription: data.monthly_fee,
    completeness_score:  calcCompleteness(data),
    missing_fields:      getMissingFields(data),
  };
  STATE.customers.push(newCust);
  return newCust;
}

// ===== تحديث عميل =====
async function updateCustomerInDB(id, formData) {
  const payload = {
    name:           formData.name_ar,
    phone:          formData.phone,
    district:       formData.district,
    technician_id:  formData.technician_id ? parseInt(formData.technician_id) : null,
    monthly_fee:    parseFloat(formData.monthly_subscription) || 0,
    contract_amount: parseFloat(formData.monthly_subscription || 0) * (parseInt(formData.period_months) || 12),
    period_months:  parseInt(formData.period_months) || 12,
    contract_start: formData.contract_start || null,
    payment_type:   formData.payment_type || 'متأخر',
    pool_type:      formData.pool_type || null,
    weekly_visits:  parseInt(formData.weekly_visits) || 2,
    visit_days:     formData.visit_days || null,
    notes:          formData.notes || null,
    job_title:      formData.job_title || null,
    house_number:   formData.house_number || null,
    updated_at:     new Date().toISOString(),
  };

  const { data, error } = await db.from('customers').update(payload).eq('id', id).select().single();
  if (error) throw error;

  const techName = STATE.technicians.find(t => t.id === data.technician_id)?.name || '—';
  const updated = {
    ...data,
    name_ar:             data.name,
    technician_name:     techName,
    monthly_subscription: data.monthly_fee,
    completeness_score:  calcCompleteness(data),
    missing_fields:      getMissingFields(data),
  };

  const idx = STATE.customers.findIndex(c => c.id === id);
  if (idx >= 0) STATE.customers[idx] = updated;
  return updated;
}

// ===== حفظ دفعة =====
async function savePaymentToDB(formData) {
  const payRef = 'PAY-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-6);
  const payload = {
    reference_number: payRef,
    customer_id:  parseInt(formData.customer_id),
    amount:        parseFloat(formData.amount),
    payment_date:  formData.payment_date || new Date().toLocaleDateString('en-CA'),
    receiver:      formData.receiver_name || null,
    payer_name:    formData.payer_name || null,
    payer_relation: formData.payer_relation || null,
    notes:         formData.notes || null,
  };

  const { data, error } = await db.from('payments').insert([payload]).select().single();
  if (error) throw error;

  const cust = STATE.customers.find(c => c.id === payload.customer_id);
  const newPay = {
    ...data,
    customer_name:  cust?.name_ar || '—',
    payment_month:  data.payment_date ? parseInt(data.payment_date.split('-')[1]) : null,
    payment_year:   data.payment_date ? parseInt(data.payment_date.split('-')[0])  : null,
    receiver_name:  data.receiver || '—',
    payment_method: data.receiver || '—',
  };
  STATE.payments.unshift(newPay);
  return newPay;
}

// ===== تغيير حالة عميل =====
async function changeCustomerStatus(id, newStatus) {
  if (STATE.useSupabase) {
    const { error } = await db.from('customers')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }
  const idx = STATE.customers.findIndex(c => c.id === id);
  if (idx >= 0) STATE.customers[idx].status = newStatus;
}

// ===== حذف عميل =====
async function deleteCustomerFromDB(id) {
  if (!confirm('هل أنت متأكد من حذف هذا العميل؟ سيتم حذف جميع دفعاته وعقوده!')) return false;

  if (STATE.useSupabase) {
    const { error } = await db.from('customers').delete().eq('id', id);
    if (error) { showToast('خطأ في الحذف: ' + error.message, 'error'); return false; }
  }

  STATE.customers = STATE.customers.filter(c => c.id !== id);
  STATE.payments  = STATE.payments.filter(p => p.customer_id !== id);
  STATE.contracts = STATE.contracts.filter(c => c.customer_id !== id);

  showToast('تم حذف العميل بنجاح 🗑️', 'success');
  return true;
}

// ===== حذف دفعة =====
async function deletePaymentFromDB(id) {
  if (!confirm('هل أنت متأكد من حذف هذه الدفعة؟')) return false;

  if (STATE.useSupabase) {
    const { error } = await db.from('payments').delete().eq('id', id);
    if (error) { showToast('خطأ في الحذف: ' + error.message, 'error'); return false; }
  }

  STATE.payments = STATE.payments.filter(p => p.id !== id);

  showToast('تم حذف الدفعة بنجاح 🗑️', 'success');
  return true;
}

// ===== تحديث أيام الزيارة =====
async function updateVisitDays(id, days) {
  if (STATE.useSupabase) {
    const { error } = await db.from('customers')
      .update({ visit_days: days, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }
  const idx = STATE.customers.findIndex(c => c.id === id);
  if (idx >= 0) STATE.customers[idx].visit_days = days;
}

// ===== تحديث حالة العميل مع UI =====
async function toggleCustomerStatus(id) {
  const c = STATE.customers.find(x => x.id === id);
  if (!c) return;
  const newStatus = c.status === 'يعمل' ? 'متوقف' : 'يعمل';
  try {
    await changeCustomerStatus(id, newStatus);
    showToast(`تم تغيير الحالة إلى "${newStatus}" ✅`, 'success');
    filterCustomers();
  } catch (err) {
    showToast('خطأ: ' + err.message, 'error');
  }
}

// ===== تهيئة عند التحميل =====
function initSupabase() {
  return db;
}

function isConnected() {
  return STATE.useSupabase;
}

// ===== مؤشر الاتصال =====
function updateConnectionStatus(online) {
  const el = document.getElementById('connection-status');
  if (!el) return;
  el.textContent = online ? '🟢' : '🔴';
  el.title = online
    ? 'متصل بـ Supabase ✅'
    : 'وضع تجريبي - غير متصل بقاعدة البيانات';
}

async function checkConnection() {
  try {
    const { error } = await db.from('company_info').select('id').limit(1);
    updateConnectionStatus(!error);
  } catch {
    updateConnectionStatus(false);
  }
}

// ===== Helpers =====
function generateCode(id) {
  return 'C-' + String(id).padStart(4, '0');
}

async function generateNextCode() {
  // جيب كل الأكواد الموجودة فعلاً في قاعدة البيانات
  const { data } = await db.from('customers').select('secret_code');

  // استخرج الأرقام من الأكواد بصيغة C-XXXX أو C-XXX
  const maxNum = (data || []).reduce((max, row) => {
    if (!row.secret_code) return max;
    const match = row.secret_code.match(/C-0*(\d+)/i);
    const num = match ? parseInt(match[1], 10) : 0;
    return num > max ? num : max;
  }, 0);

  const nextNum = maxNum + 1;
  const newCode = 'C-' + String(nextNum).padStart(4, '0');

  // تحقق مزدوج: تأكد أن الكود غير موجود فعلاً قبل الإرجاع
  const { data: existing } = await db.from('customers')
    .select('id').eq('secret_code', newCode).limit(1);

  if (existing && existing.length > 0) {
    // الكود مكرر بشكل غير متوقع — جرّب الرقم التالي
    console.warn(`⚠️ الكود ${newCode} مكرر — جاري المحاولة بـ ${nextNum + 1}`);
    return 'C-' + String(nextNum + 1).padStart(4, '0');
  }

  return newCode;
}

function calcCompleteness(c) {
  let score = 0;
  if (c.name || c.name_ar) score += 20;
  if (c.phone)              score += 20;
  if (c.district)           score += 15;
  if (c.technician_id)      score += 15;
  if (c.monthly_fee || c.monthly_subscription) score += 15;
  if (c.pool_type)          score += 10;
  if (c.weekly_visits)      score += 5;
  return score;
}

function getMissingFields(c) {
  const missing = [];
  if (!c.phone)       missing.push('رقم الجوال');
  if (!c.district)    missing.push('الحي');
  if (!c.pool_type)   missing.push('نوع المسبح');
  return missing;
}
