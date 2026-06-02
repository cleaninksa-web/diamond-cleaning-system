/**
 * Diamond Cleaning - Payments / Collection Management (v2)
 */
let currentPayTab = 'overview';
const MONTH_NAMES = ['','يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

async function load_payments() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  initPaymentFilters();
  buildCollectionData();
  switchPayTab('overview');
}

function initPaymentFilters() {
  const techFilter = document.getElementById('filter-pay-tech');
  if (techFilter && techFilter.options.length <= 1)
    (window.STATE.technicians || []).forEach(t => techFilter.add(new Option(t.name, t.id)));
  const custField = document.getElementById('f-pay-customer');
  if (custField && custField.options.length <= 1)
    (window.STATE.customers || []).filter(c => c.status === 'يعمل').forEach(c => custField.add(new Option(`${c.secret_code} - ${c.name_ar}`, c.id)));
  const recvField = document.getElementById('f-pay-receiver');
  if (recvField && recvField.options.length <= 1)
    (window.STATE.receivers || []).forEach(r => recvField.add(new Option(r.name, r.id)));
  ['payment-search','filter-pay-month','filter-pay-tech'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el._bound) { el.addEventListener(el.type==='text'?'input':'change', debounce(()=>renderCollectionView(),300)); el._bound=true; }
  });
}

// ===== BUILD COLLECTION DATA =====
function buildCollectionData() {
  const now = new Date();
  const curMonth = now.getMonth()+1, curYear = now.getFullYear();
  const tgtMonth = parseInt(document.getElementById('filter-pay-month')?.value) || curMonth;
  const endOfMonth = new Date(curYear, tgtMonth, 0);
  const customers = (window.STATE.customers || []).filter(c => c.status === 'يعمل');
  const allPay = window.STATE.payments || [];
  const allCon = window.STATE.contracts || [];

  window._collectionData = customers.map(c => {
    const contract = allCon.find(ct => ct.customer_id === c.id && ct.status === 'نشط');
    const contractTotal = contract ? contract.total_amount : (c.monthly_subscription||0)*12;
    const contractMonths = contract ? contract.duration_months || 12 : 12;
    const custPayments = allPay.filter(p => p.customer_id === c.id);
    const totalPaid = custPayments.reduce((s,p) => s+p.amount, 0);
    const remaining = Math.max(0, contractTotal - totalPaid);
    const paidPct = contractTotal > 0 ? Math.round((totalPaid/contractTotal)*100) : 0;
    const monthPay = custPayments.filter(p => p.payment_month===tgtMonth && p.payment_year===curYear);
    const isPaidThisMonth = monthPay.length > 0;
    const today = new Date(); today.setHours(0,0,0,0);
    const diffDays = Math.ceil((endOfMonth - today)/(86400000));
    const nextDueAmount = c.monthly_subscription || 0;
    const nextDueDate = endOfMonth;
    let status, statusText, statusClass, rowClass, sortPri;
    if (isPaidThisMonth) { status='paid'; statusText='🟢 مدفوع'; statusClass='s-paid'; rowClass=''; sortPri=3; }
    else if (diffDays < 0) { status='overdue'; statusText=`🔴 متأخر ${Math.abs(diffDays)} يوم`; statusClass='s-overdue'; rowClass='row-overdue'; sortPri=0; }
    else if (diffDays <= 7) { status='due-soon'; statusText=`🟡 يستحق قريباً`; statusClass='s-due-soon'; rowClass='row-due-soon'; sortPri=1; }
    else { status='on-track'; statusText='⚪ عقد جديد'; statusClass='s-new'; rowClass=''; sortPri=2; }
    let daysText;
    if (isPaidThisMonth) daysText = 'تم الدفع ✅';
    else if (diffDays < 0) daysText = `متأخر ${Math.abs(diffDays)} يوم`;
    else if (diffDays === 0) daysText = 'اليوم آخر يوم!';
    else daysText = `بعد ${diffDays} يوم`;
    const daysClass = diffDays < 0 ? 'overdue' : diffDays <= 7 ? 'soon' : 'ok';
    const lastPay = custPayments.sort((a,b)=>b.payment_date.localeCompare(a.payment_date))[0];
    return { ...c, contract, contractTotal, contractMonths, totalPaid, remaining, paidPct,
      isPaidThisMonth, status, statusText, statusClass, rowClass, sortPri,
      nextDueAmount, nextDueDate: formatDateShort(nextDueDate), daysText, daysClass, diffDays,
      lastPaymentDate: lastPay?.payment_date||null, tgtMonth: tgtMonth, tgtYear: curYear };
  });
  window._collectionData.sort((a,b) => a.sortPri - b.sortPri || a.diffDays - b.diffDays);
}

// ===== TABS =====
function switchPayTab(tab) {
  currentPayTab = tab;
  document.querySelectorAll('#pay-tabs .tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('#pay-tabs .tab');
  const map = {overview:0,unpaid:1,overdue:2,paid:3,history:4};
  if (tabs[map[tab]]) tabs[map[tab]].classList.add('active');
  renderCollectionView();
}

// ===== RENDER =====
function renderCollectionView() {
  buildCollectionData();
  const data = window._collectionData || [];
  const search = (document.getElementById('payment-search')?.value||'').toLowerCase();
  const techId = document.getElementById('filter-pay-tech')?.value||'';
  let filtered = data;
  if (search) filtered = filtered.filter(c => c.name_ar.toLowerCase().includes(search)||c.secret_code.toLowerCase().includes(search));
  if (techId) filtered = filtered.filter(c => String(c.technician_id)===techId);
  if (currentPayTab==='unpaid') filtered = filtered.filter(c => !c.isPaidThisMonth);
  else if (currentPayTab==='overdue') filtered = filtered.filter(c => c.status==='overdue');
  else if (currentPayTab==='paid') filtered = filtered.filter(c => c.isPaidThisMonth);
  else if (currentPayTab==='history') { renderPaymentHistory(); renderPayKPIs(data); return; }
  renderPayKPIs(data);
  renderCollectionTable(filtered);
}

// ===== KPIs =====
function renderPayKPIs(data) {
  const g1 = document.getElementById('pay-kpi-grid');
  const g2 = document.getElementById('pay-kpi-grid-2');
  if (!g1) return;
  const totalDue = data.reduce((s,c)=>s+(c.monthly_subscription||0),0);
  const totalPaidMonth = data.filter(c=>c.isPaidThisMonth).reduce((s,c)=>s+(c.monthly_subscription||0),0);
  const unpaidAmt = totalDue - totalPaidMonth;
  const paidCount = data.filter(c=>c.isPaidThisMonth).length;
  const unpaidCount = data.filter(c=>!c.isPaidThisMonth).length;
  const overdueList = data.filter(c=>c.status==='overdue');
  const collectPct = totalDue>0 ? Math.round((totalPaidMonth/totalDue)*100) : 0;
  const tgt = data[0]?.tgtMonth || (new Date().getMonth()+1);

  g1.innerHTML = `
    <div class="kpi-card cyan"><div class="kpi-icon">📅</div><div class="kpi-value">${formatNumber(totalDue)}</div><div class="kpi-label">المستحق لشهر ${MONTH_NAMES[tgt]} (ر.س)</div></div>
    <div class="kpi-card success"><div class="kpi-icon">✅</div><div class="kpi-value">${paidCount}<small style="font-size:0.7rem;color:var(--text-secondary)">/${data.length}</small></div><div class="kpi-label">دفعوا (${formatNumber(totalPaidMonth)} ر.س)</div></div>
    <div class="kpi-card orange"><div class="kpi-icon">🔴</div><div class="kpi-value">${unpaidCount}</div><div class="kpi-label">لم يدفعوا (${formatNumber(unpaidAmt)} ر.س)</div></div>
    <div class="kpi-card danger"><div class="kpi-icon">⚠️</div><div class="kpi-value">${overdueList.length}</div><div class="kpi-label">متأخرين</div></div>`;

  if (g2) {
    const avgDelay = overdueList.length > 0 ? Math.round(overdueList.reduce((s,c)=>s+Math.abs(c.diffDays),0)/overdueList.length) : 0;
    const topDebtor = data.filter(c=>c.remaining>0).sort((a,b)=>b.remaining-a.remaining)[0];
    const contracts = window.STATE.contracts || [];
    const expiring = contracts.filter(ct => { const d=daysUntil(ct.end_date); return d!==null && d>=0 && d<=60 && ct.status==='نشط'; }).length;
    g2.innerHTML = `
      <div class="kpi-card navy"><div class="kpi-icon">📊</div><div class="kpi-value">${collectPct}%</div><div class="kpi-label">نسبة التحصيل</div></div>
      <div class="kpi-card orange"><div class="kpi-icon">⏱️</div><div class="kpi-value">${avgDelay}</div><div class="kpi-label">متوسط أيام التأخير</div></div>
      <div class="kpi-card danger"><div class="kpi-icon">💸</div><div class="kpi-value" style="font-size:1rem">${topDebtor?topDebtor.name_ar:'—'}</div><div class="kpi-label">أعلى متأخر${topDebtor?' ('+formatNumber(topDebtor.remaining)+' ر.س)':''}</div></div>
      <div class="kpi-card cyan"><div class="kpi-icon">📝</div><div class="kpi-value">${expiring}</div><div class="kpi-label">عقود تنتهي خلال 60 يوم</div></div>`;
  }
}

// ===== TABLE =====
function renderCollectionTable(data) {
  const tbody = document.getElementById('payments-tbody');
  if (!tbody) return;
  if (!window.STATE?.loaded) { tbody.innerHTML='<tr><td colspan="10"><div class="empty-state"><div class="icon">⏳</div><h3>جاري التحميل...</h3></div></td></tr>'; return; }
  if (!data.length) { tbody.innerHTML='<tr><td colspan="10"><div class="empty-state"><div class="icon">💰</div><h3>لا يوجد نتائج</h3></div></td></tr>'; return; }
  const progressColor = pct => pct>=80?'green':pct>=40?'orange':'red';
  const remClass = c => c.status==='overdue'?'r-overdue':c.status==='due-soon'?'r-soon':'r-ok';

  tbody.innerHTML = data.map((c,i) => `
    <tr class="${c.rowClass}" data-id="${c.id}">
      <td>${i+1}</td>
      <td><strong style="color:var(--navy)">${c.secret_code}</strong></td>
      <td>${c.name_ar}</td>
      <td>${c.technician_name}</td>
      <td><div class="contract-val"><div class="cv-amount">${formatCurrency(c.contractTotal)}</div><div class="cv-duration">${c.contractMonths} شهر</div></div></td>
      <td><div class="paid-cell"><div class="pc-amount">${formatCurrency(c.totalPaid)}</div><div class="pc-pct">(${c.paidPct}%)</div><div class="mini-progress"><div class="mini-progress-fill ${progressColor(c.paidPct)}" style="width:${c.paidPct}%"></div></div></div></td>
      <td><div class="remaining-cell ${remClass(c)}">${formatCurrency(c.remaining)}</div></td>
      <td><div class="next-due-cell"><div class="due-amount">${formatCurrency(c.nextDueAmount)}</div><div class="due-date">${c.nextDueDate}</div><div class="due-days ${c.daysClass}">${c.daysText}</div></div></td>
      <td><span class="status-badge ${c.statusClass}">${c.statusText}</span></td>
      <td style="white-space:nowrap">
        <button class="btn btn-sm btn-outline" onclick="viewCustomerPayments(${c.id})" title="عرض السجل">👁</button>
        ${!c.isPaidThisMonth?`<button class="btn btn-sm btn-orange" onclick="quickRegisterPayment(${c.id})" title="تسجيل دفعة">💰</button>`:''}
        ${c.phone?`<a href="${whatsappLink(c.phone,'السلام عليكم، تذكير باشتراك التنظيف الماسي')}" target="_blank" class="btn btn-sm btn-success" title="واتساب">💬</a>`:''}
        ${c.phone?`<a href="${phoneLink(c.phone)}" class="btn btn-sm btn-primary" title="اتصال">📞</a>`:''}
      </td>
    </tr>`).join('') +
    `<tr style="background:var(--bg);font-weight:700"><td colspan="4">المجموع (${data.length})</td><td>${formatCurrency(data.reduce((s,c)=>s+c.contractTotal,0))}</td><td>${formatCurrency(data.reduce((s,c)=>s+c.totalPaid,0))}</td><td>${formatCurrency(data.reduce((s,c)=>s+c.remaining,0))}</td><td colspan="3"></td></tr>`;
}

// ===== HISTORY TAB =====
function renderPaymentHistory() {
  const tbody = document.getElementById('payments-tbody');
  if (!tbody) return;
  if (!window.STATE?.loaded) { tbody.innerHTML='<tr><td colspan="10"><div class="empty-state"><div class="icon">⏳</div><h3>جاري التحميل...</h3></div></td></tr>'; return; }
  const payments = (window.STATE.payments || []).slice().sort((a,b)=>b.payment_date.localeCompare(a.payment_date));
  tbody.innerHTML = `<tr><th>#</th><th>المرجع</th><th>العميل</th><th colspan="2">المبلغ</th><th colspan="2">التاريخ</th><th>المستلم</th><th colspan="2">إجراءات</th></tr>` +
    payments.slice(0,50).map((p,i)=>`<tr><td>${i+1}</td><td><strong>${p.reference_number}</strong></td><td>${p.customer_name}</td><td colspan="2" style="color:var(--navy);font-weight:700">${formatCurrency(p.amount)}</td><td colspan="2">${formatDateShort(p.payment_date)}</td><td>${p.receiver_name}</td><td colspan="2"><button class="btn btn-sm btn-outline">👁</button></td></tr>`).join('');
}

// ===== VIEW CUSTOMER PAYMENTS (financial only) =====
function viewCustomerPayments(custId) {
  const c = (window.STATE.customers || []).find(x=>x.id===custId);
  if (!c) return;
  const payments = (window.STATE.payments || []).filter(p=>p.customer_id===custId).sort((a,b)=>b.payment_date.localeCompare(a.payment_date));
  const contract = (window.STATE.contracts || []).find(ct=>ct.customer_id===custId && ct.status==='نشط');
  const contractTotal = contract ? contract.total_amount : (c.monthly_subscription||0)*12;
  const contractMonths = contract ? contract.duration_months||12 : 12;
  const totalPaid = payments.reduce((s,p)=>s+p.amount,0);
  const remaining = Math.max(0, contractTotal-totalPaid);
  const paidPct = contractTotal>0 ? Math.round((totalPaid/contractTotal)*100) : 0;
  const progColor = paidPct>=80?'green':paidPct>=40?'orange':'red';
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0);
  const today = new Date(); today.setHours(0,0,0,0);
  const diffDays = Math.ceil((endOfMonth-today)/86400000);
  const daysText = diffDays<0?`متأخر ${Math.abs(diffDays)} يوم`:diffDays===0?'اليوم آخر يوم!':`بعد ${diffDays} يوم`;
  const daysClass = diffDays<0?'overdue':diffDays<=7?'soon':'ok';
  const monthsLeft = contract ? Math.max(0, Math.ceil((new Date(contract.end_date)-today)/2592000000)) : '—';

  let html = `
    <div class="customer-info-header">
      <div class="cust-avatar">👤</div>
      <div class="cust-details"><h3>${c.name_ar}</h3><p>${formatPhone(c.phone)}</p></div>
      <div class="cust-phone">
        ${c.phone?`<a href="${phoneLink(c.phone)}" class="btn btn-sm btn-primary">📞</a>`:''}
        ${c.phone?`<a href="${whatsappLink(c.phone)}" target="_blank" class="btn btn-sm btn-success">💬</a>`:''}
      </div>
    </div>
    <h4 style="color:var(--navy);margin-bottom:12px">📝 معلومات العقد المالية</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;font-size:0.88rem">
      <div><strong>الكود:</strong> ${c.secret_code}</div>
      <div><strong>الفني:</strong> ${c.technician_name||'—'}</div>
      <div><strong>الحي:</strong> ${c.district||'—'}</div>
      <div><strong>قيمة العقد:</strong> <span style="color:var(--navy);font-weight:700">${formatCurrency(contractTotal)}</span></div>
      <div><strong>المدة:</strong> ${contractMonths} شهر</div>
      <div><strong>الاشتراك:</strong> ${formatCurrency(c.monthly_subscription)} / شهر</div>
      ${contract?`<div><strong>البداية:</strong> ${formatDateShort(contract.start_date)}</div><div><strong>النهاية:</strong> ${formatDateShort(contract.end_date)}</div><div><strong>الأشهر المتبقية:</strong> ${monthsLeft}</div>`:''}
      <div><strong>نظام الدفع:</strong> ${c.payment_type||'مقدم'}</div>
    </div>
    <h4 style="color:var(--navy);margin-bottom:12px">💰 الملخص المالي</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:8px">
      <div class="kpi-card success" style="padding:10px"><div class="kpi-value" style="font-size:1rem">${formatCurrency(totalPaid)}</div><div class="kpi-label">إجمالي المدفوع</div></div>
      <div class="kpi-card danger" style="padding:10px"><div class="kpi-value" style="font-size:1rem">${formatCurrency(remaining)}</div><div class="kpi-label">المتبقي من العقد</div></div>
      <div class="kpi-card navy" style="padding:10px"><div class="kpi-value" style="font-size:1rem">${paidPct}%</div><div class="kpi-label">نسبة السداد</div></div>
    </div>
    <div class="mini-progress" style="height:10px;margin-bottom:20px"><div class="mini-progress-fill ${progColor}" style="width:${paidPct}%"></div></div>
    <h4 style="color:var(--navy);margin-bottom:12px">📅 الدفعة القادمة</h4>
    <div style="background:var(--bg);padding:14px;border-radius:8px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-weight:700;color:var(--navy);font-size:1.1rem">${formatCurrency(c.monthly_subscription)}</div><div style="font-size:0.85rem;color:var(--text-secondary)">استحقاق: ${formatDateShort(endOfMonth)}</div></div>
      <div><span class="due-days ${daysClass}" style="font-weight:700;font-size:0.95rem">${daysText}</span></div>
      <button class="btn btn-sm btn-orange" onclick="quickRegisterPayment(${c.id});closeModal('quick-modal')">💰 سجل دفعة</button>
    </div>
    <h4 style="color:var(--navy);margin-bottom:12px">📜 سجل التحصيلات (${payments.length} دفعة)</h4>`;

  if (!payments.length) {
    html += '<div class="empty-state" style="padding:20px"><div class="icon">📭</div><h3>لا يوجد دفعات</h3></div>';
  } else {
    html += payments.map((p,i)=>{
      const hasReceipt = i%3===0;
      return `<div class="pay-history-card ${hasReceipt?'has-receipt':''}">
        <div><div class="pay-history-amount">${formatCurrency(p.amount)}</div><div class="pay-history-receiver">المستلم: ${p.receiver_name}</div>${p.payer_name?`<div style="font-size:0.8rem;color:var(--text-secondary)">الدافع: ${p.payer_name} ${p.payer_relation?'('+p.payer_relation+')':''}</div>`:''}</div>
        <div style="text-align:center"><div class="pay-history-date">${formatDateShort(p.payment_date)}</div><div style="font-size:0.8rem;color:var(--text-secondary)">${MONTH_NAMES[p.payment_month]} ${p.payment_year}</div></div>
        <div style="text-align:left"><div style="font-size:0.8rem;color:var(--text-secondary)">${p.reference_number}</div>${hasReceipt?'<span class="pay-history-receipt-badge">📎 إيصال مرفق</span>':''}</div>
      </div>`;
    }).join('');
  }
  html += `<div style="margin-top:16px;display:flex;gap:8px;justify-content:center">
    <button class="btn btn-orange" onclick="quickRegisterPayment(${c.id});closeModal('quick-modal')">💰 تسجيل دفعة</button>
    <button class="btn btn-outline" onclick="closeModal('quick-modal')">إغلاق</button></div>`;
  showQuickModal('📋 سجل العميل: '+c.name_ar, html);
}

// ===== QUICK REGISTER =====
function quickRegisterPayment(custId) {
  const c = (window.STATE.customers || []).find(x=>x.id===custId);
  if (!c) return;
  const f = id => document.getElementById(id);
  if (f('f-pay-customer')) f('f-pay-customer').value = custId;
  if (f('f-pay-amount')) f('f-pay-amount').value = c.monthly_subscription;
  if (f('f-pay-date')) f('f-pay-date').value = new Date().toLocaleDateString('en-CA');
  if (f('f-pay-type')) f('f-pay-type').value = 'full';
  if (f('pay-partial-info')) f('pay-partial-info').style.display = 'none';
  onPayCustomerChange();
  openModal('payment-modal');
}

// ===== PARTIAL PAYMENT =====
function onPayCustomerChange() {
  const custId = parseInt(document.getElementById('f-pay-customer')?.value);
  const info = document.getElementById('pay-cust-info');
  if (!custId || !info) { if(info) info.style.display='none'; return; }
  const c = (window.STATE.customers || []).find(x=>x.id===custId);
  if (!c) return;
  const allPay = (window.STATE.payments || []).filter(p=>p.customer_id===custId);
  const contract = (window.STATE.contracts || []).find(ct=>ct.customer_id===custId && ct.status==='نشط');
  const contractTotal = contract ? contract.total_amount : (c.monthly_subscription||0)*12;
  const totalPaid = allPay.reduce((s,p)=>s+p.amount,0);
  const rem = contractTotal - totalPaid;
  info.style.display = 'flex';
  info.innerHTML = `<span>💰 اشتراك شهري: <strong>${formatCurrency(c.monthly_subscription)}</strong></span><span>📊 المدفوع: <strong>${formatCurrency(totalPaid)}</strong></span><span>📝 المتبقي من العقد: <strong style="color:var(--danger)">${formatCurrency(rem)}</strong></span>`;
  window._payDueAmount = c.monthly_subscription;
  calcPayRemaining();
}

function onPayTypeChange() {
  const type = document.getElementById('f-pay-type')?.value;
  const partial = document.getElementById('pay-partial-info');
  if (partial) partial.style.display = type==='partial' ? 'block' : 'none';
  calcPayRemaining();
}

function calcPayRemaining() {
  const due = window._payDueAmount || 0;
  const paid = parseFloat(document.getElementById('f-pay-amount')?.value) || 0;
  const rem = Math.max(0, due - paid);
  const el = id => document.getElementById(id);
  if (el('pay-due-total')) el('pay-due-total').textContent = formatCurrency(due);
  if (el('pay-now')) el('pay-now').textContent = formatCurrency(paid);
  if (el('pay-remaining-after')) el('pay-remaining-after').textContent = formatCurrency(rem);
}

async function savePayment() {
  const custId = document.getElementById('f-pay-customer')?.value;
  const amount = document.getElementById('f-pay-amount')?.value;
  if (!custId) { showToast('يرجى اختيار العميل','error'); return; }
  if (!amount || parseFloat(amount) <= 0) { showToast('يرجى إدخال مبلغ صحيح','error'); return; }

  const btn = document.querySelector('#payment-modal .modal-footer .btn-success, #payment-modal .modal-footer .btn-orange');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  const formData = {
    customer_id:   custId,
    amount:        parseFloat(amount),
    payment_date:  document.getElementById('f-pay-date')?.value || new Date().toLocaleDateString('en-CA'),
    receiver_name: document.getElementById('f-pay-receiver')?.options[document.getElementById('f-pay-receiver').selectedIndex]?.text || '',
    payer_name:    document.getElementById('f-pay-payer')?.value || '',
    payer_relation: document.getElementById('f-pay-relation')?.value || '',
    notes:         document.getElementById('f-pay-notes')?.value || '',
  };

  try {
    // ===== رفع الإيصال إذا وجد =====
    const receiptInput = document.getElementById('f-pay-receipt');
    if (receiptInput?.files?.length > 0) {
      const receiptUrl = await uploadReceiptToStorage(receiptInput.files[0], custId);
      if (receiptUrl) formData.receipt_url = receiptUrl;
    }

    if (STATE.useSupabase) {
      await savePaymentToDB(formData);
      const type = document.getElementById('f-pay-type')?.value;
      showToast(`تم تسجيل ${type==='partial'?'الدفعة الجزئية':'الدفعة'} في قاعدة البيانات ✅`, 'success');
    } else {
      showToast('وضع تجريبي - لم يتم الحفظ فعلياً', 'warning');
    }
    closeModal('payment-modal');
    // إعادة تعيين حقل الإيصال وتنظيف المعاينة
    const receiptInp = document.getElementById('f-pay-receipt');
    if (receiptInp) receiptInp.value = '';
    const phEl = document.getElementById('receipt-placeholder');
    const plEl = document.getElementById('receipt-preview-list');
    if (phEl) phEl.style.display = 'block';
    if (plEl) { plEl.style.display = 'none'; plEl.innerHTML = ''; }
    buildCollectionData();
    renderCollectionView();
    // تحديث التنبيهات
    if (typeof updateBellBadge === 'function') updateBellBadge();
  } catch (err) {
    showToast('خطأ في حفظ الدفعة: ' + err.message, 'error');
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ الدفعة'; }
  }
}

// ===== BULK REMINDER =====
function openBulkReminder() {
  const data = (window._collectionData||[]).filter(c=>!c.isPaidThisMonth && c.phone);
  if (!data.length) { showToast('لا يوجد عملاء متأخرين لديهم أرقام جوال','warning'); return; }
  let html = `<div class="form-group"><label class="form-label">نص الرسالة (قابل للتعديل)</label>
    <textarea class="form-textarea" id="bulk-msg" rows="3">السلام عليكم {اسم_العميل}، تذكير بمستحقات بقيمة {المبلغ} ر.س. نشكر تعاونكم - التنظيف الماسي</textarea></div>
    <div style="max-height:300px;overflow-y:auto">
    <table style="width:100%"><thead><tr><th><input type="checkbox" id="bulk-all" checked onchange="toggleBulkAll(this)"></th><th>العميل</th><th>المبلغ</th><th>الحالة</th></tr></thead><tbody>`;
  data.forEach(c => {
    html += `<tr><td><input type="checkbox" class="bulk-check" value="${c.id}" data-name="${c.name_ar}" data-phone="${c.phone}" data-amount="${c.monthly_subscription}" checked></td>
      <td>${c.name_ar}</td><td>${formatCurrency(c.monthly_subscription)}</td><td><span class="status-badge ${c.statusClass}">${c.statusText}</span></td></tr>`;
  });
  html += '</tbody></table></div><div style="margin-top:16px;display:flex;gap:8px;justify-content:center">';
  html += '<button class="btn btn-success" onclick="sendBulkReminders()">📤 إرسال عبر واتساب</button>';
  html += '<button class="btn btn-outline" onclick="closeModal(\'quick-modal\')">إلغاء</button></div>';
  showQuickModal('📤 تذكير جماعي للمتأخرين ('+data.length+' عميل)', html);
}

function toggleBulkAll(el) { document.querySelectorAll('.bulk-check').forEach(c=>c.checked=el.checked); }

function sendBulkReminders() {
  const msgTpl = document.getElementById('bulk-msg')?.value||'';
  const checks = document.querySelectorAll('.bulk-check:checked');
  if (!checks.length) { showToast('اختر عميل واحد على الأقل','warning'); return; }
  checks.forEach((cb,i) => {
    const msg = msgTpl.replace('{اسم_العميل}',cb.dataset.name).replace('{المبلغ}',cb.dataset.amount);
    setTimeout(()=>window.open(whatsappLink(cb.dataset.phone, msg),'_blank'), i*800);
  });
  showToast(`تم فتح ${checks.length} محادثة واتساب 📤`,'success');
  closeModal('quick-modal');
}

// ===== EXPORT =====
function exportCollectionReport() {
  const data = window._collectionData||[];
  let csv = '\uFEFF#,الكود,العميل,الفني,قيمة العقد,المدفوع,المتبقي,الحالة\n';
  data.forEach((c,i)=>{ csv+=`${i+1},${c.secret_code},${c.name_ar},${c.technician_name},${c.contractTotal},${c.totalPaid},${c.remaining},${c.statusText.replace(/[🔴🟢🟡⚪]/g,'').trim()}\n`; });
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `تقرير_التحصيلات_${MONTH_NAMES[(new Date().getMonth()+1)]}_${new Date().getFullYear()}.csv`;
  link.click();
  showToast('تم تصدير التقرير بنجاح 📥','success');
}

// ===== RECEIPT PREVIEW =====
function previewReceipts(input) {
  const list = document.getElementById('receipt-preview-list');
  const ph = document.getElementById('receipt-placeholder');
  if (!list||!input.files.length) return;
  ph.style.display='none'; list.style.display='flex'; list.innerHTML='';
  Array.from(input.files).forEach(file => {
    const item = document.createElement('div'); item.className='receipt-preview-item';
    if (file.type.startsWith('image/')) { const img=document.createElement('img'); img.src=URL.createObjectURL(file); item.appendChild(img); }
    else { const d=document.createElement('div'); d.className='pdf-icon'; d.textContent='📄'; item.appendChild(d); }
    const n=document.createElement('div'); n.className='receipt-name'; n.textContent=file.name; item.appendChild(n);
    const r=document.createElement('button'); r.className='receipt-remove'; r.innerHTML='✕';
    r.onclick=e=>{ e.stopPropagation(); item.remove(); if(!list.children.length){ph.style.display='block';list.style.display='none';input.value='';} };
    item.appendChild(r); list.appendChild(item);
  });
}

// ===== رفع الإيصال إلى Supabase Storage =====
async function uploadReceiptToStorage(file, custId) {
  if (!file || !window.db) return null;
  try {
    const ext = file.name.split('.').pop().toLowerCase();
    const fileName = `receipts/${custId}_${Date.now()}.${ext}`;
    const { data, error } = await window.db.storage
      .from('receipts')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) {
      // Storage قد يكون غير مفعّل - لا نوقف الحفظ بسببه
      console.warn('تحذير: فشل رفع الإيصال:', error.message);
      showToast('تم حفظ الدفعة بدون الإيصال (التخزين غير متوفر)', 'warning');
      return null;
    }
    const { data: urlData } = window.db.storage.from('receipts').getPublicUrl(data.path);
    return urlData?.publicUrl || null;
  } catch (e) {
    console.warn('خطأ في رفع الإيصال:', e);
    return null;
  }
}
