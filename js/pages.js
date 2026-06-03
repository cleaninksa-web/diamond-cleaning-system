/**
 * Diamond Cleaning - Technicians, Payments, Contracts, Settings, Data Quality Pages
 */

// ===== TECHNICIANS =====
async function load_technicians() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  const grid = document.getElementById('technicians-grid');
  if (!grid) return;
  const customers = window.STATE.customers || [];
  const payments = window.STATE.payments || [];

  grid.innerHTML = (window.STATE.technicians || []).map(t => {
    const myCusts = customers.filter(c => c.technician_id == t.id);
    const active = myCusts.filter(c => c.status === 'يعمل');
    const monthlyRev = active.reduce((s, c) => {
      let fee = parseFloat(c.monthly_fee) || parseFloat(c.monthly_subscription) || 0;
      if (fee > 0) return s + fee;
      let contractAmt = parseFloat(c.contract_amount) || 0;
      let period = parseInt(c.period_months) || 12;
      return s + (period > 0 ? contractAmt / period : 0);
    }, 0);
    const totalCollected = payments.filter(p => {
      const cust = customers.find(c => c.id === p.customer_id);
      return cust && cust.technician_id === t.id;
    }).reduce((s, p) => s + p.amount, 0);

    const districts = [...new Set(active.map(c => c.district).filter(Boolean))];

    return `
      <div class="tech-card">
        <div class="tech-name">🔧 ${t.name}</div>
        <div class="tech-stat"><span>عملاء نشطين</span><strong style="color:var(--success)">${active.length}</strong></div>
        <div class="tech-stat"><span>إجمالي العملاء</span><strong>${myCusts.length}</strong></div>
        <div class="tech-stat"><span>الإيراد الشهري</span><strong style="color:var(--navy)">${formatCurrency(monthlyRev)}</strong></div>
        <div class="tech-stat"><span>إجمالي التحصيلات</span><strong>${formatCurrency(totalCollected)}</strong></div>
        <div class="tech-stat"><span>الهاتف</span><strong dir="ltr">${t.phone ? formatPhone(t.phone) : '-'}</strong></div>
        <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:4px">
          ${districts.slice(0, 4).map(d => `<span class="badge badge-active" style="font-size:0.7rem">${d}</span>`).join('')}
          ${districts.length > 4 ? `<span class="badge badge-expired">+${districts.length - 4}</span>` : ''}
        </div>
        <div style="margin-top:12px;display:flex;gap:8px">
          <a href="${whatsappLink(t.phone)}" target="_blank" class="btn btn-sm btn-success">💬 واتساب</a>
          <a href="${phoneLink(t.phone)}" class="btn btn-sm btn-primary">📞 اتصال</a>
        </div>
      </div>`;
  }).join('');

  // عرض القسمين الجديدين
  renderLeavesSection();
  renderDocsSection();
}

async function saveTechnician() {
  const name  = document.getElementById('f-tech-name')?.value.trim();
  const phone = document.getElementById('f-tech-phone')?.value.trim();
  const salary = parseFloat(document.getElementById('f-tech-salary')?.value) || 0;
  const notes = document.getElementById('f-tech-notes')?.value.trim() || '';

  if (!name) { showToast('يرجى إدخال اسم الفني', 'error'); return; }

  const editingId = parseInt(document.getElementById('tech-modal')?.dataset.editId || '0');
  const btn = document.querySelector('#tech-modal .modal-footer .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  try {
    if (editingId) {
      // تعديل فني موجود
      const { data, error } = await window.db.from('technicians')
        .update({ name, phone: phone || null, base_salary: salary, notes: notes || null, updated_at: new Date().toISOString() })
        .eq('id', editingId).select().single();
      if (error) throw error;
      const idx = STATE.technicians.findIndex(t => t.id === editingId);
      if (idx >= 0) STATE.technicians[idx] = { ...STATE.technicians[idx], ...data };
      showToast('تم تحديث بيانات الفني ✅', 'success');
    } else {
      // إضافة فني جديد
      const { data, error } = await window.db.from('technicians')
        .insert({ name, phone: phone || null, base_salary: salary, notes: notes || null, active: true })
        .select().single();
      if (error) throw error;
      STATE.technicians.push(data);
      // أضفه لقوائم الفلتر
      ['filter-tech','f-technician','filter-pay-tech','filter-visit-tech'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel && !sel.querySelector(`option[value="${data.id}"]`))
          sel.add(new Option(data.name, data.id));
      });
      showToast('تم إضافة الفني بنجاح ✅', 'success');
    }
    closeModal('tech-modal');
    document.getElementById('tech-modal').dataset.editId = '';
    document.getElementById('tech-modal-title').textContent = 'إضافة فني';
    // إعادة تعيين الحقول
    ['f-tech-name','f-tech-phone','f-tech-salary','f-tech-notes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    load_technicians();
  } catch (err) {
    showToast('خطأ في الحفظ: ' + err.message, 'error');
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ'; }
  }
}

// ───────────────────────────────────────────
// سجل الإجازات
// ───────────────────────────────────────────
function renderLeavesSection() {
  let container = document.getElementById('leaves-section');
  if (!container) {
    container = document.createElement('div');
    container.id = 'leaves-section';
    container.style.marginTop = '32px';
    const techSection = document.getElementById('section-technicians');
    if (techSection) techSection.appendChild(container);
  }

  const leaves = window.STATE.leaves || [];
  const techs  = window.STATE.technicians || [];

  const rows = leaves.length === 0
    ? `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-secondary)">لا توجد سجلات بعد</td></tr>`
    : leaves.map(l => {
        const techName = techs.find(t => t.id === l.technician_id)?.name || '—';
        return `<tr>
          <td>${techName}</td>
          <td>${formatDateShort(l.leave_start)}</td>
          <td>${formatDateShort(l.leave_end)}</td>
          <td>${l.actual_return ? formatDateShort(l.actual_return) : '—'}</td>
          <td>${l.travel_cost ? formatCurrency(l.travel_cost) : '—'}</td>
          <td>${l.notes || '—'}</td>
          <td><button class="btn btn-sm btn-outline" style="color:var(--danger)"
              onclick="deleteLeave(${l.id})">🗑️</button></td>
        </tr>`;
      }).join('');

  container.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
        <h3 class="card-title">🏖️ سجل الإجازات</h3>
        <button class="btn btn-primary btn-sm" onclick="openLeaveModal()">➕ إضافة إجازة</button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead><tr>
            <th>الموظف</th><th>من</th><th>إلى</th>
            <th>الرجوع الفعلي</th><th>تكلفة السفرة</th>
            <th>ملاحظة</th><th>حذف</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function openLeaveModal() {
  const techs = window.STATE.technicians || [];
  const techOptions = techs.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  const today = new Date().toISOString().split('T')[0];

  document.getElementById('leave-modal-overlay')?.remove();
  const modal = document.createElement('div');
  modal.id = 'leave-modal-overlay';
  modal.className = 'modal-overlay show';
  modal.innerHTML = `
    <div class="modal modal-lg">
      <div class="modal-header">
        <h3 class="modal-title">🏖️ إضافة إجازة</h3>
        <button class="modal-close" onclick="document.getElementById('leave-modal-overlay').remove()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">الموظف *</label>
          <select class="form-select" id="lv-tech"><option value="">اختر الموظف</option>${techOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">تاريخ البداية *</label>
            <input type="date" class="form-input" id="lv-start" value="${today}" dir="ltr"></div>
          <div class="form-group"><label class="form-label">تاريخ النهاية *</label>
            <input type="date" class="form-input" id="lv-end" value="${today}" dir="ltr"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">تاريخ الرجوع الفعلي</label>
            <input type="date" class="form-input" id="lv-return" dir="ltr"></div>
          <div class="form-group"><label class="form-label">تكلفة السفرة (ر.س)</label>
            <input type="number" class="form-input" id="lv-cost" min="0" placeholder="اختياري" dir="ltr"></div>
        </div>
        <div class="form-group"><label class="form-label">ملاحظات</label>
          <textarea class="form-textarea" id="lv-notes"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="saveLeave()">💾 حفظ</button>
        <button class="btn btn-outline" onclick="document.getElementById('leave-modal-overlay').remove()">إلغاء</button>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

async function saveLeave() {
  const techId = document.getElementById('lv-tech')?.value;
  const start  = document.getElementById('lv-start')?.value;
  const end    = document.getElementById('lv-end')?.value;
  const ret    = document.getElementById('lv-return')?.value || null;
  const cost   = parseFloat(document.getElementById('lv-cost')?.value) || null;
  const notes  = document.getElementById('lv-notes')?.value.trim() || null;

  if (!techId) { showToast('يرجى اختيار الموظف', 'error'); return; }
  if (!start)  { showToast('يرجى تحديد تاريخ البداية', 'error'); return; }
  if (!end)    { showToast('يرجى تحديد تاريخ النهاية', 'error'); return; }

  const btn = document.querySelector('#leave-modal-overlay .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  try {
    const { data, error } = await window.db.from('employee_leaves')
      .insert({ technician_id: parseInt(techId), leave_start: start,
                leave_end: end, actual_return: ret, travel_cost: cost, notes })
      .select().single();
    if (error) throw error;
    STATE.leaves = STATE.leaves || [];
    STATE.leaves.unshift(data);
    document.getElementById('leave-modal-overlay')?.remove();
    showToast('تم تسجيل الإجازة ✅', 'success');
    renderLeavesSection();
  } catch (err) {
    showToast('خطأ في الحفظ: ' + err.message, 'error');
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ'; }
  }
}

async function deleteLeave(id) {
  if (!confirm('هل تريد حذف هذا السجل؟')) return;
  try {
    const { error } = await window.db.from('employee_leaves').delete().eq('id', id);
    if (error) throw error;
    STATE.leaves = (STATE.leaves || []).filter(l => l.id !== id);
    showToast('تم الحذف ✅', 'success');
    renderLeavesSection();
  } catch (err) {
    showToast('خطأ في الحذف: ' + err.message, 'error');
  }
}

// ───────────────────────────────────────────
// سجل تجديد الوثائق
// ───────────────────────────────────────────
function renderDocsSection() {
  let container = document.getElementById('emp-docs-section');
  if (!container) {
    container = document.createElement('div');
    container.id = 'emp-docs-section';
    container.style.marginTop = '24px';
    const techSection = document.getElementById('section-technicians');
    if (techSection) techSection.appendChild(container);
  }

  const docs  = window.STATE.empDocs || [];
  const techs = window.STATE.technicians || [];

  const rows = docs.length === 0
    ? `<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-secondary)">لا توجد سجلات بعد</td></tr>`
    : docs.map(d => {
        const techName = techs.find(t => t.id === d.technician_id)?.name || '—';
        return `<tr>
          <td>${techName}</td>
          <td><span class="badge badge-active">${d.doc_type}</span></td>
          <td>${formatDateShort(d.renewal_date)}</td>
          <td>${d.notes || '—'}</td>
          <td><button class="btn btn-sm btn-outline" style="color:var(--danger)"
              onclick="deleteEmpDoc(${d.id})">🗑️</button></td>
        </tr>`;
      }).join('');

  container.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
        <h3 class="card-title">📄 سجل تجديد الوثائق</h3>
        <button class="btn btn-primary btn-sm" onclick="openDocModal()">➕ إضافة تجديد</button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead><tr>
            <th>الموظف</th><th>نوع الوثيقة</th>
            <th>تاريخ التجديد</th><th>ملاحظة</th><th>حذف</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function openDocModal() {
  const techs = window.STATE.technicians || [];
  const techOptions = techs.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  const today = new Date().toISOString().split('T')[0];

  document.getElementById('doc-modal-overlay')?.remove();
  const modal = document.createElement('div');
  modal.id = 'doc-modal-overlay';
  modal.className = 'modal-overlay show';
  modal.innerHTML = `
    <div class="modal modal-lg">
      <div class="modal-header">
        <h3 class="modal-title">📄 إضافة تجديد وثيقة</h3>
        <button class="modal-close" onclick="document.getElementById('doc-modal-overlay').remove()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الموظف *</label>
            <select class="form-select" id="doc-tech"><option value="">اختر الموظف</option>${techOptions}</select>
          </div>
          <div class="form-group">
            <label class="form-label">نوع الوثيقة *</label>
            <select class="form-select" id="doc-type">
              <option value="">اختر النوع</option>
              <option value="إقامة">إقامة</option>
              <option value="كرت عمل">كرت عمل</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">تاريخ التجديد *</label>
          <input type="date" class="form-input" id="doc-date" value="${today}" dir="ltr">
        </div>
        <div class="form-group"><label class="form-label">ملاحظات</label>
          <textarea class="form-textarea" id="doc-notes"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="saveEmpDoc()">💾 حفظ</button>
        <button class="btn btn-outline" onclick="document.getElementById('doc-modal-overlay').remove()">إلغاء</button>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

async function saveEmpDoc() {
  const techId  = document.getElementById('doc-tech')?.value;
  const docType = document.getElementById('doc-type')?.value;
  const date    = document.getElementById('doc-date')?.value;
  const notes   = document.getElementById('doc-notes')?.value.trim() || null;

  if (!techId)  { showToast('يرجى اختيار الموظف', 'error'); return; }
  if (!docType) { showToast('يرجى اختيار نوع الوثيقة', 'error'); return; }
  if (!date)    { showToast('يرجى تحديد تاريخ التجديد', 'error'); return; }

  const btn = document.querySelector('#doc-modal-overlay .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  try {
    const { data, error } = await window.db.from('employee_documents')
      .insert({ technician_id: parseInt(techId), doc_type: docType,
                renewal_date: date, notes })
      .select().single();
    if (error) throw error;
    STATE.empDocs = STATE.empDocs || [];
    STATE.empDocs.unshift(data);
    document.getElementById('doc-modal-overlay')?.remove();
    showToast('تم تسجيل التجديد ✅', 'success');
    renderDocsSection();
  } catch (err) {
    showToast('خطأ في الحفظ: ' + err.message, 'error');
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ'; }
  }
}

async function deleteEmpDoc(id) {
  if (!confirm('هل تريد حذف هذا السجل؟')) return;
  try {
    const { error } = await window.db.from('employee_documents').delete().eq('id', id);
    if (error) throw error;
    STATE.empDocs = (STATE.empDocs || []).filter(d => d.id !== id);
    showToast('تم الحذف ✅', 'success');
    renderDocsSection();
  } catch (err) {
    showToast('خطأ في الحذف: ' + err.message, 'error');
  }
}

// Payments/Collection code moved to payments.js

// ===== CONTRACTS =====
async function load_contracts() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  populateContractFilters();
  filterContracts();
}

function populateContractFilters() {
  const custField = document.getElementById('f-con-customer');
  if (custField && custField.options.length <= 1) {
    (window.STATE.customers || []).filter(c => c.status === 'يعمل').forEach(c => {
      custField.add(new Option(`${c.secret_code} - ${c.name_ar}`, c.id));
    });
  }
  ['contract-search', 'filter-contract-status'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el._bound) {
      el.addEventListener(el.type === 'text' ? 'input' : 'change', debounce(filterContracts, 300));
      el._bound = true;
    }
  });
}

function filterContracts() {
  const search = (document.getElementById('contract-search')?.value || '').toLowerCase();
  const status = document.getElementById('filter-contract-status')?.value || '';

  const custs = window.STATE.customers || [];
  let data = (window.STATE.contracts || []).map(c => ({
    ...c,
    customer_name: c.customer_name || custs.find(x => x.id === c.customer_id)?.name_ar || '—',
  }));

  if (search) data = data.filter(c =>
    (c.customer_name||'').toLowerCase().includes(search) ||
    (c.reference_number||'').toLowerCase().includes(search)
  );
  if (status) data = data.filter(c => c.status === status);

  const tbody = document.getElementById('contracts-tbody');
  if (!tbody) return;

  if (!window.STATE?.loaded) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="icon">⏳</div><h3>جاري التحميل...</h3></div></td></tr>`;
    return;
  }

  // KPIs
  const totalActive = data.filter(c => c.status === 'نشط').length;
  const totalValue  = data.reduce((s, c) => s + (parseFloat(c.total_amount) || 0), 0);
  const expiring    = data.filter(c => {
    if (!c.end_date) return false;
    const days = Math.ceil((new Date(c.end_date) - new Date()) / 86400000);
    return days >= 0 && days <= 30;
  }).length;

  ['con-kpi-total','con-kpi-active','con-kpi-value','con-kpi-expiring'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = [data.length, totalActive, formatCurrency(totalValue), expiring][i];
  });

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="icon">📝</div><h3>لا يوجد عقود</h3><p>شغّل ملف import_contracts.sql في Supabase أولاً</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(c => {
    const daysLeft = c.end_date ? Math.ceil((new Date(c.end_date) - new Date()) / 86400000) : null;
    const daysText = daysLeft === null ? '—'
      : daysLeft < 0 ? `<span style="color:var(--danger)">منتهي ${Math.abs(daysLeft)} يوم</span>`
      : daysLeft <= 30 ? `<span style="color:var(--warning)">⚠️ ${daysLeft} يوم</span>`
      : `<span style="color:var(--success)">${daysLeft} يوم</span>`;
    return `
    <tr>
      <td><strong style="color:var(--navy)">${c.reference_number || '—'}</strong></td>
      <td>${c.customer_name || '—'}</td>
      <td><strong>${formatCurrency(c.total_amount || 0)}</strong><br><small style="color:var(--text-muted)">${formatCurrency(c.monthly_amount || 0)}/شهر</small></td>
      <td>${formatDateShort(c.start_date)}</td>
      <td>${formatDateShort(c.end_date)}<br><small>${daysText}</small></td>
      <td>${statusBadge(c.status)}</td>
      <td><button class="btn btn-sm btn-outline" onclick="showToast('عرض العقد ${c.reference_number}','info')">👁</button></td>
    </tr>`;
  }).join('');
}

async function saveContract() {
  const custId = document.getElementById('f-con-customer')?.value;
  const amount = parseFloat(document.getElementById('f-con-amount')?.value);
  const startDate = document.getElementById('f-con-start')?.value;
  const period = parseInt(document.getElementById('f-con-period')?.value) || 12;
  const payType = document.getElementById('f-con-paytype')?.value || 'متأخر';
  const freeMonths = parseInt(document.getElementById('f-con-free')?.value) || 0;
  const notes = document.getElementById('f-con-notes')?.value.trim() || '';

  if (!custId) { showToast('يرجى اختيار العميل', 'error'); return; }
  if (!amount || amount <= 0) { showToast('يرجى إدخال قيمة العقد', 'error'); return; }
  if (!startDate) { showToast('يرجى تحديد تاريخ البداية', 'error'); return; }

  const btn = document.querySelector('#contract-modal .modal-footer .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  try {
    // حساب تاريخ النهاية
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + period);
    const endDateStr = endDate.toISOString().split('T')[0];

    // رقم مرجعي
    const refNum = 'CON-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-5);
    const monthlyAmount = Math.round(amount / period * 100) / 100;

    const payload = {
      reference_number: refNum,
      customer_id:      parseInt(custId),
      start_date:       startDate,
      end_date:         endDateStr,
      duration_months:  period,
      free_months:      freeMonths,
      total_amount:     amount,
      monthly_subscription: monthlyAmount,
      monthly_amount:   monthlyAmount,
      payment_type:     payType,
      status:           'نشط',
      notes:            notes || null,
    };

    const { data, error } = await window.db.from('contracts').insert(payload).select().single();
    if (error) throw error;

    // تحديث STATE
    const custName = (STATE.customers || []).find(c => c.id === parseInt(custId))?.name_ar || '—';
    STATE.contracts.push({ ...data, customer_name: custName });

    closeModal('contract-modal');
    // إعادة تعيين الحقول
    ['f-con-customer','f-con-start','f-con-amount','f-con-free','f-con-notes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    showToast(`تم حفظ العقد ${refNum} بنجاح ✅`, 'success');
    filterContracts();
  } catch (err) {
    showToast('خطأ في حفظ العقد: ' + err.message, 'error');
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ العقد'; }
  }
}

// ===== VISITS =====
async function load_visits() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  const container = document.getElementById('visits-container');
  if (!container) return;
  const today = new Date().toLocaleDateString('en-CA');
  document.getElementById('filter-visit-date').value = today;

  // Populate tech filter
  const techFilter = document.getElementById('filter-visit-tech');
  if (techFilter && techFilter.options.length <= 1) {
    (window.STATE.technicians || []).forEach(t => techFilter.add(new Option(t.name, t.id)));
  }

  container.innerHTML = `<div class="empty-state"><div class="icon">📅</div><h3>اضغط "توليد زيارات اليوم" لإنشاء جدول الزيارات</h3><p>سيتم توليد الزيارات بناءً على أيام الزيارة المحددة لكل عميل</p></div>`;
}

function generateDailyVisits() {
  const container = document.getElementById('visits-container');
  const customers = (window.STATE.customers || []).filter(c => c.status === 'يعمل');

  let html = '';
  (window.STATE.technicians || []).forEach(t => {
    const myCusts = customers.filter(c => c.technician_id === t.id).slice(0, 8);
    html += `<div class="card" style="margin-bottom:16px">
      <div class="card-header"><h3 class="card-title">🔧 ${t.name} (${myCusts.length} زيارة)</h3></div>
      <div class="table-wrapper"><table><thead><tr><th>#</th><th>العميل</th><th>الحي</th><th>الحالة</th></tr></thead><tbody>
      ${myCusts.map((c, i) => `<tr><td>${i + 1}</td><td>${c.name_ar}</td><td>${c.district}</td><td><span class="badge badge-active">مجدولة</span></td></tr>`).join('')}
      </tbody></table></div></div>`;
  });

  container.innerHTML = html;
  showToast('تم توليد زيارات اليوم ✅', 'success');
}

// ===== DOCUMENTS =====
function load_documents() {}
function openDocTemplate(type) {
  const names = { contract: 'عقد خدمة', quote: 'عرض سعر', invoice: 'مطالبة مالية', 'cleaning-log': 'سجل تنظيف' };
  showToast(`جاري تحضير قالب: ${names[type] || type}`, 'info');
}

// ===== REPORTS =====
// Report functions moved to reports.js (PDF + Excel exports)
function load_reports() {}


// ===== DATA QUALITY =====
async function load_data_quality() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  const customers = window.STATE.customers || [];
  const statsEl = document.getElementById('dq-stats');
  const tbody = document.getElementById('dq-tbody');

  const excellent = customers.filter(c => c.completeness_score >= 80).length;
  const medium = customers.filter(c => c.completeness_score >= 50 && c.completeness_score < 80).length;
  const low = customers.filter(c => c.completeness_score < 50).length;
  const avg = Math.round(customers.reduce((s, c) => s + c.completeness_score, 0) / customers.length);

  if (statsEl) {
    statsEl.innerHTML = `
      <div class="kpi-card success"><div class="kpi-icon">🟢</div><div class="kpi-value">${excellent}</div><div class="kpi-label">ممتاز (80%+)</div></div>
      <div class="kpi-card orange"><div class="kpi-icon">🟡</div><div class="kpi-value">${medium}</div><div class="kpi-label">متوسط (50-79%)</div></div>
      <div class="kpi-card danger"><div class="kpi-icon">🔴</div><div class="kpi-value">${low}</div><div class="kpi-label">ضعيف (أقل من 50%)</div></div>
      <div class="kpi-card navy"><div class="kpi-icon">📊</div><div class="kpi-value">${avg}%</div><div class="kpi-label">المتوسط العام</div></div>`;
  }

  if (tbody) {
    const incomplete = customers.filter(c => c.completeness_score < 80).sort((a, b) => a.completeness_score - b.completeness_score);
    tbody.innerHTML = incomplete.map(c => {
      const badge = completenessBadge(c.completeness_score);
      return `<tr>
        <td>${c.secret_code}</td>
        <td>${c.name_ar}</td>
        <td><span class="completeness-badge ${badge.class}">${badge.text}</span></td>
        <td>${(c.missing_fields || []).join('، ') || '-'}</td>
        <td><button class="btn btn-sm btn-primary" onclick="editCustomer(${c.id})">✏️ إكمال</button></td>
      </tr>`;
    }).join('');
  }
}

// ===== SETTINGS =====
function load_settings() { switchSettingsTab('company'); }

async function switchSettingsTab(tab) {
  document.querySelectorAll('#section-settings .tab').forEach(t => t.classList.remove('active'));
  event?.target?.classList?.add('active');
  const content = document.getElementById('settings-content');
  if (!content) return;

  if (tab === 'company') {
    // تحميل البيانات من Supabase
    let info = {};
    const db = window.db;
    if (db) {
      const { data } = await db.from('company_info').select('*').limit(1).single();
      if (data) info = data;
    }

    content.innerHTML = `
    <div class="card">
      <h3 class="card-title" style="margin-bottom:20px">🏢 بيانات الشركة</h3>
      <div class="form-row">
        <div class="form-group"><label class="form-label">اسم الشركة</label>
          <input class="form-input" id="s-name" value="${info.name || 'مؤسسة التنظيف الماسي للصيانة والنظافة'}"></div>
        <div class="form-group"><label class="form-label">السجل التجاري</label>
          <input class="form-input" id="s-cr" value="${info.commercial_reg || '4030524288'}" dir="ltr"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">📞 الهاتف</label>
          <input class="form-input" id="s-phone" value="${info.phone || '+966555955690'}" dir="ltr"></div>
        <div class="form-group"><label class="form-label">📧 البريد الإلكتروني</label>
          <input class="form-input" id="s-email" value="${info.email || 'cleaninksa@gmail.com'}" dir="ltr"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">🏦 IBAN</label>
          <input class="form-input" id="s-iban" value="${info.iban || 'SA7310000001400022356600'}" dir="ltr"></div>
        <div class="form-group"><label class="form-label">🏦 البنك</label>
          <input class="form-input" id="s-bank" value="${info.bank_name || 'البنك الأهلي السعودي'}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">📍 المدينة</label>
          <input class="form-input" id="s-city" value="${info.city || 'جدة'}"></div>
        <div class="form-group"><label class="form-label">📍 العنوان</label>
          <input class="form-input" id="s-address" value="${info.address || ''}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">🌐 الموقع الإلكتروني</label>
          <input class="form-input" id="s-website" value="${info.website || ''}" dir="ltr" placeholder="https://"></div>
        <div class="form-group"><label class="form-label">ضريبة القيمة المضافة (VAT)</label>
          <select class="form-select" id="s-vat">
            <option value="false" ${!info.vat_enabled ? 'selected' : ''}>معطل</option>
            <option value="true" ${info.vat_enabled ? 'selected' : ''}>مفعل (15%)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">💎 شعار الشركة</label>
          <div style="display:flex;gap:8px;align-items:center">
            ${info.logo_url ? `<img src="${info.logo_url}" style="width:48px;height:48px;border-radius:8px;object-fit:contain;border:1px solid #e2e8f0">` : '<div style="width:48px;height:48px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:24px">💎</div>'}
            <input type="file" id="s-logo-file" accept="image/*" class="form-input" style="flex:1">
          </div>
        </div>
      </div>
      <div style="margin-top:20px;display:flex;gap:12px">
        <button class="btn btn-primary" onclick="saveCompanyInfo()" id="s-save-btn">💾 حفظ الإعدادات</button>
        <span id="s-save-status" style="color:var(--success);font-size:14px;align-self:center"></span>
      </div>
    </div>`;
  }

  else if (tab === 'splash') {
    // تحميل إعدادات الترحيب
    let splashName = localStorage.getItem('splash_name') || 'عبدالله محمد';
    let showSplash = localStorage.getItem('show_splash') !== 'false';

    content.innerHTML = `
    <div class="card">
      <h3 class="card-title" style="margin-bottom:20px">🎬 شاشة الترحيب</h3>
      <div class="form-group"><label class="form-label">اسم المدير في الترحيب</label>
        <input class="form-input" id="s-splash-name" value="${splashName}"></div>
      <div class="form-group"><label class="form-label">إظهار الشاشة الترحيبية</label>
        <select class="form-select" id="s-show-splash">
          <option value="true" ${showSplash ? 'selected' : ''}>نعم</option>
          <option value="false" ${!showSplash ? 'selected' : ''}>لا</option>
        </select></div>
      <button class="btn btn-primary" style="margin-top:16px" onclick="saveSplashSettings()">💾 حفظ</button>
    </div>`;
  }

  else if (tab === 'receivers') {
    // المستلمين
    const receivers = [
      { name: 'عبدالله', type: 'فرد' },
      { name: 'حبيب', type: 'فني' },
      { name: 'رضوان', type: 'فني' },
      { name: 'عالم قير', type: 'فني' },
      { name: 'كاش', type: 'كاش' },
      { name: 'حوالة الشركة', type: 'حوالة بنكية' },
      { name: 'حوالة بنكية الأهلي', type: 'حوالة بنكية' },
    ];

    content.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
        <h3 class="card-title">💰 المستلمين / طرق الاستلام</h3>
      </div>
      <div class="table-wrapper"><table>
        <thead><tr><th>الاسم</th><th>النوع</th><th>الحالة</th></tr></thead>
        <tbody>
        ${receivers.map(r => `<tr>
          <td><strong>${r.name}</strong></td>
          <td><span class="badge badge-active">${r.type}</span></td>
          <td><span class="badge badge-active">نشط</span></td>
        </tr>`).join('')}
        </tbody>
      </table></div>
    </div>`;
  }

  else if (tab === 'backup') {
    content.innerHTML = `
    <div class="card">
      <h3 class="card-title" style="margin-bottom:20px">💾 النسخ الاحتياطي</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="kpi-card success" style="cursor:pointer" onclick="exportAllDataExcel()">
          <div class="kpi-icon">📊</div>
          <div class="kpi-label">تصدير كل البيانات Excel</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">العملاء + الدفعات + العقود</div>
        </div>
        <div class="kpi-card cyan">
          <div class="kpi-icon">☁️</div>
          <div class="kpi-label">Supabase Cloud</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">البيانات محفوظة تلقائياً في السحابة</div>
        </div>
      </div>
      <div style="margin-top:20px;padding:16px;background:var(--bg-muted);border-radius:10px">
        <strong>📊 إحصائيات القاعدة:</strong>
        <div style="display:flex;gap:24px;margin-top:8px;flex-wrap:wrap">
          <span>👥 العملاء: <strong>${STATE?.customers?.length || 0}</strong></span>
          <span>💰 الدفعات: <strong>${STATE?.payments?.length || 0}</strong></span>
          <span>📝 العقود: <strong>${STATE?.contracts?.length || 0}</strong></span>
          <span>🔧 الفنيون: <strong>${STATE?.technicians?.length || 0}</strong></span>
        </div>
      </div>
    </div>`;
  }
}

async function saveCompanyInfo() {
  const btn = document.getElementById('s-save-btn');
  const status = document.getElementById('s-save-status');
  btn.disabled = true;
  btn.textContent = '⏳ جاري الحفظ...';

  const info = {
    name:           document.getElementById('s-name')?.value?.trim(),
    commercial_reg: document.getElementById('s-cr')?.value?.trim(),
    phone:          document.getElementById('s-phone')?.value?.trim(),
    email:          document.getElementById('s-email')?.value?.trim(),
    iban:           document.getElementById('s-iban')?.value?.trim(),
    bank_name:      document.getElementById('s-bank')?.value?.trim(),
    city:           document.getElementById('s-city')?.value?.trim(),
    address:        document.getElementById('s-address')?.value?.trim(),
    website:        document.getElementById('s-website')?.value?.trim(),
    vat_enabled:    document.getElementById('s-vat')?.value === 'true',
  };

  const db = window.db;
  if (!db) {
    showToast('Supabase غير متصل', 'error');
    btn.disabled = false; btn.textContent = '💾 حفظ الإعدادات';
    return;
  }

  // Check if row exists
  const { data: existing } = await db.from('company_info').select('id').limit(1).single();

  let error;
  if (existing) {
    ({ error } = await db.from('company_info').update(info).eq('id', existing.id));
  } else {
    ({ error } = await db.from('company_info').insert(info));
  }

  btn.disabled = false;
  btn.textContent = '💾 حفظ الإعدادات';

  if (error) {
    showToast('خطأ في الحفظ: ' + error.message, 'error');
    console.error(error);
  } else {
    showToast('تم حفظ بيانات الشركة ✅', 'success');
    status.textContent = '✅ تم الحفظ';
    setTimeout(() => { if (status) status.textContent = ''; }, 3000);

    // Update reports COMPANY object
    if (window.COMPANY) {
      Object.assign(window.COMPANY, {
        name: info.name, phone: info.phone, email: info.email,
        cr: info.commercial_reg, iban: info.iban, bank: info.bank_name, city: info.city,
        vat_enabled: info.vat_enabled
      });
    }
    if (window.STATE) {
      window.STATE.company_info = { ...window.STATE.company_info, ...info };
    }
  }
}

function saveSplashSettings() {
  const name = document.getElementById('s-splash-name')?.value?.trim();
  const show = document.getElementById('s-show-splash')?.value;
  localStorage.setItem('splash_name', name || 'عبدالله محمد');
  localStorage.setItem('show_splash', show);
  showToast('تم حفظ إعدادات الترحيب ✅', 'success');
}

function exportAllDataExcel() {
  if (!window.XLSX) { showToast('مكتبة Excel غير محملة', 'error'); return; }
  const wb = XLSX.utils.book_new();

  // Customers
  const custs = (window.STATE.customers || []).map((c,i) => ({
    '#': i+1, 'الكود': c.secret_code||'', 'الاسم': c.name_ar||c.name||'',
    'الجوال': c.phone||'', 'الحي': c.district||'', 'الفني': c.technician_name||'',
    'الحالة': c.status||'', 'الاشتراك': parseFloat(c.monthly_subscription||c.monthly_fee)||0,
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(custs), 'العملاء');

  // Payments
  const pays = (window.STATE.payments || []).map((p,i) => ({
    '#': i+1, 'العميل': p.customer_name||'', 'المبلغ': p.amount||0,
    'التاريخ': p.payment_date||'', 'المستلم': p.receiver_name||p.receiver||'',
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pays), 'الدفعات');

  // Contracts
  const cons = (window.STATE.contracts || []).map((c,i) => ({
    '#': i+1, 'الرقم': c.reference_number||'', 'العميل': c.customer_name||'',
    'المبلغ': c.total_amount||0, 'البداية': c.start_date||'', 'النهاية': c.end_date||'', 'الحالة': c.status||'',
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cons), 'العقود');

  XLSX.writeFile(wb, `الماسي_نسخة_احتياطية_${new Date().toLocaleDateString('en-CA')}.xlsx`);
  showToast('تم تصدير النسخة الاحتياطية الكاملة 📊', 'success');
}

