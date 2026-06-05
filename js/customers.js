/**
 * Diamond Cleaning - Customers Page
 */

let customersCurrentPage = 1;
const customersPerPage = 15;

async function load_customers() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  populateFilters();
  filterCustomers();
}

function populateFilters() {
  // Technician filter
  const techFilter = document.getElementById('filter-tech');
  const techField = document.getElementById('f-technician');
  if (techFilter && techFilter.options.length <= 1) {
    (window.STATE.technicians || []).forEach(t => {
      techFilter.add(new Option(t.name, t.id));
      if (techField) techField.add(new Option(t.name, t.id));
    });
  }
  // District filter
  const distFilter = document.getElementById('filter-district');
  const distField = document.getElementById('f-district');
  if (distFilter && distFilter.options.length <= 1) {
    (window.STATE.districts || []).forEach(d => {
      distFilter.add(new Option(d, d));
      if (distField) distField.add(new Option(d, d));
    });
  }

  // Bind filter events
  ['customer-search', 'filter-status', 'filter-tech', 'filter-district'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el._bound) {
      el.addEventListener(el.type === 'text' ? 'input' : 'change', debounce(filterCustomers, 300));
      el._bound = true;
    }
  });
}

function filterCustomers() {
  const search = (document.getElementById('customer-search')?.value || '').trim().toLowerCase();
  const status = document.getElementById('filter-status')?.value || '';
  const tech = document.getElementById('filter-tech')?.value || '';
  const district = document.getElementById('filter-district')?.value || '';

  let data = window.STATE.customers || [];

  if (search) {
    data = data.filter(c =>
      c.name_ar.toLowerCase().includes(search) ||
      c.secret_code.toLowerCase().includes(search) ||
      (c.phone || '').includes(search)
    );
  }
  if (status) data = data.filter(c => c.status === status);
  if (tech) data = data.filter(c => String(c.technician_id) === tech);
  if (district) data = data.filter(c => c.district === district);

  renderCustomersTable(data);
}

function renderCustomersTable(data) {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;

  if (!window.STATE?.loaded) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="icon">⏳</div><h3>جاري التحميل...</h3></div></td></tr>`;
    return;
  }

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="icon">👥</div><h3>لا يوجد عملاء</h3><p>لم يتم العثور على نتائج</p></div></td></tr>`;
    return;
  }

  // Pagination
  const totalPages = Math.ceil(data.length / customersPerPage);
  customersCurrentPage = Math.min(customersCurrentPage, totalPages);
  const start = (customersCurrentPage - 1) * customersPerPage;
  const pageData = data.slice(start, start + customersPerPage);

  tbody.innerHTML = pageData.map(c => {
    const badge = completenessBadge(c.completeness_score);
    return `
      <tr data-id="${c.id}">
        <td><strong style="color:var(--navy)">${c.secret_code}</strong></td>
        <td>${c.name_ar}</td>
        <td style="direction:ltr;text-align:right">${formatPhone(c.phone)}</td>
        <td>${c.district || '-'}</td>
        <td>${c.technician_name || '-'}</td>
        <td>${statusBadge(c.status)}</td>
        <td><span class="completeness-badge ${badge.class}">${badge.text}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="viewCustomer(${c.id})" title="عرض">👁</button>
          <button class="btn btn-sm btn-outline" onclick="editCustomer(${c.id})" title="تعديل">✏️</button>
          ${c.phone ? `<a href="${whatsappLink(c.phone)}" target="_blank" class="btn btn-sm btn-success" title="واتساب">💬</a>` : ''}
          <button class="btn btn-sm btn-outline" onclick="toggleCustomerStatus(${c.id})" title="${c.status === 'يعمل' ? 'إيقاف' : 'تفعيل'}">${c.status === 'يعمل' ? '⏸️' : '▶️'}</button>
          <button class="btn btn-sm btn-outline" onclick="deleteCustomer(${c.id})" title="حذف" style="color:var(--danger)">🗑️</button>
        </td>
      </tr>`;
  }).join('');

  // Add pagination
  if (totalPages > 1) {
    tbody.innerHTML += `<tr><td colspan="8" style="text-align:center;padding:16px">
      <div style="display:flex;gap:8px;justify-content:center;align-items:center">
        <button class="btn btn-sm btn-outline" onclick="customersPage(${customersCurrentPage - 1})" ${customersCurrentPage <= 1 ? 'disabled' : ''}>→ السابق</button>
        <span style="font-size:0.85rem;color:var(--text-secondary)">صفحة ${customersCurrentPage} من ${totalPages} (${data.length} عميل)</span>
        <button class="btn btn-sm btn-outline" onclick="customersPage(${customersCurrentPage + 1})" ${customersCurrentPage >= totalPages ? 'disabled' : ''}>التالي ←</button>
      </div>
    </td></tr>`;
  }
}

function customersPage(page) {
  customersCurrentPage = page;
  filterCustomers();
}

function viewCustomer(id) {
  const c = (window.STATE.customers || []).find(x => x.id === id);
  if (!c) return;
  const contract = (window.STATE.contracts || []).find(ct => ct.customer_id === id);
  const payments = (window.STATE.payments || []).filter(p => p.customer_id === id);
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  const html = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div><strong>الكود:</strong> ${c.secret_code}</div>
      <div><strong>الحالة:</strong> ${statusBadge(c.status)}</div>
      <div><strong>الجوال:</strong> <span dir="ltr">${formatPhone(c.phone)}</span></div>
      <div><strong>الحي:</strong> ${c.district || '-'}</div>
      ${c.house_number ? `<div><strong>رقم المنزل:</strong> ${c.house_number}</div>` : ''}
      ${c.job_title ? `<div><strong>المسمى الوظيفي:</strong> ${c.job_title}</div>` : ''}
      <div><strong>الفني:</strong> ${c.technician_name || '-'}</div>
      <div><strong>نوع المسبح:</strong> ${c.pool_type || '-'}</div>
      <div><strong>الاشتراك الشهري:</strong> ${formatCurrency(c.monthly_subscription)}</div>
      <div><strong>زيارات أسبوعية:</strong> ${c.weekly_visits}</div>
      ${(c.maps_url || (c.latitude && c.longitude)) ? `
      <div style="grid-column: 1 / -1; background: var(--bg); padding: 12px; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 12px; border: 1px solid var(--surface-border);">
        ${c.maps_url ? `<a href="${c.maps_url}" target="_blank" class="btn btn-sm btn-cyan" style="text-decoration:none">📍 افتح الموقع</a>` : ''}
        ${(c.latitude && c.longitude) ? `<span style="font-size: 0.85rem; color: var(--text-dim); direction: ltr;">${c.latitude}, ${c.longitude}</span>` : ''}
      </div>` : ''}
    </div>
    ${contract ? `<hr style="margin:16px 0"><h4 style="color:var(--navy);margin-bottom:8px">📝 العقد النشط</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.9rem">
        <div>المرجع: ${contract.reference_number}</div>
        <div>القيمة: ${formatCurrency(contract.total_amount)}</div>
        <div>البداية: ${formatDateShort(contract.start_date)}</div>
        <div>النهاية: ${formatDateShort(contract.end_date)}</div>
      </div>` : ''}
    <hr style="margin:16px 0"><h4 style="color:var(--navy);margin-bottom:8px">💰 التحصيلات (${payments.length} دفعة)</h4>
    <div><strong>إجمالي المدفوع:</strong> ${formatCurrency(totalPaid)}</div>`;

  // Use a quick modal
  showQuickModal('👤 ' + c.name_ar, html);
}

function editCustomer(id) {
  const c = (window.STATE.customers || []).find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('customer-modal');
  if (modal) modal.dataset.editId = id;
  document.getElementById('customer-modal-title').textContent = '✏️ تعديل عميل: ' + (c.name_ar || c.name);
  document.getElementById('f-name-ar').value = c.name_ar || c.name || '';
  document.getElementById('f-phone').value = c.phone || '';
  document.getElementById('f-district').value = c.district || '';
  document.getElementById('f-technician').value = c.technician_id || '';
  document.getElementById('f-weekly-visits').value = c.weekly_visits || 2;
  document.getElementById('f-pool-type').value = c.pool_type || '';
  const fFee = document.getElementById('f-monthly-fee');
  if (fFee) fFee.value = c.monthly_subscription || c.monthly_fee || '';
  const fPeriod = document.getElementById('f-period-months');
  if (fPeriod) fPeriod.value = c.period_months || 12;
  const fPayType = document.getElementById('f-payment-type');
  if (fPayType) fPayType.value = c.payment_type || 'متأخر';
  const fStart = document.getElementById('f-contract-start');
  if (fStart) fStart.value = c.contract_start || '';
  // الحقلان الجديدان
  const fJob = document.getElementById('f-job-title');
  if (fJob) fJob.value = c.job_title || '';
  const fHouse = document.getElementById('f-house-number');
  if (fHouse) fHouse.value = c.house_number || '';
  const fMaps = document.getElementById('f-maps-url');
  if (fMaps) fMaps.value = c.maps_url || '';
  const fLat = document.getElementById('f-latitude');
  if (fLat) fLat.value = c.latitude || '';
  const fLng = document.getElementById('f-longitude');
  if (fLng) fLng.value = c.longitude || '';
  // تعبئة أيام الزيارة
  const savedDays = c.visit_days ? c.visit_days.split(',') : [];
  document.querySelectorAll('#f-visit-days input[type="checkbox"]').forEach(cb => {
    cb.checked = savedDays.includes(cb.value);
    cb.closest('.day-check').classList.toggle('selected', cb.checked);
  });
  openModal('customer-modal');
}

async function saveCustomer() {
  const nameEl  = document.getElementById('f-name-ar');
  const phoneEl = document.getElementById('f-phone');
  const name  = nameEl?.value.trim();
  const phone = phoneEl?.value.trim();
  if (!name)  { showToast('يرجى إدخال اسم العميل', 'error');  return; }
  if (!phone) { showToast('يرجى إدخال رقم الجوال', 'error');  return; }

  const btn = document.querySelector('#customer-modal .modal-footer .btn-primary, #customer-modal .modal-footer .btn-orange');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...'; }

  const formData = {
    name_ar:              name,
    phone:                phone,
    district:             document.getElementById('f-district')?.value || '',
    technician_id:        document.getElementById('f-technician')?.value || null,
    weekly_visits:        document.getElementById('f-weekly-visits')?.value || 2,
    pool_type:            document.getElementById('f-pool-type')?.value || '',
    monthly_subscription: document.getElementById('f-monthly-fee')?.value || 0,
    period_months:        document.getElementById('f-period-months')?.value || 12,
    contract_start:       document.getElementById('f-contract-start')?.value || null,
    payment_type:         document.getElementById('f-payment-type')?.value || 'متأخر',
    notes:                document.getElementById('f-notes')?.value || '',
    job_title:            document.getElementById('f-job-title')?.value?.trim() || null,
    house_number:         document.getElementById('f-house-number')?.value?.trim() || null,
    maps_url:             document.getElementById('f-maps-url')?.value?.trim() || null,
    latitude:             parseFloat(document.getElementById('f-latitude')?.value) || null,
    longitude:            parseFloat(document.getElementById('f-longitude')?.value) || null,
    // أيام الزيارة من checkboxes
    visit_days: Array.from(document.querySelectorAll('#f-visit-days input[type="checkbox"]:checked'))
                     .map(cb => cb.value).join(',') || null,
  };

  const editingId = parseInt(document.getElementById('customer-modal')?.dataset.editId || '0');

  try {
    if (STATE.useSupabase) {
      if (editingId) {
        await updateCustomerInDB(editingId, formData);
        showToast('تم تحديث بيانات العميل ✅', 'success');
      } else {
        await saveCustomerToDB(formData);
        showToast('تم إضافة العميل بنجاح ✅', 'success');
      }
    } else {
      showToast('وضع تجريبي - لم يتم الحفظ فعلياً', 'warning');
    }
    closeModal('customer-modal');
    document.getElementById('customer-modal').dataset.editId = '';
    filterCustomers();
  } catch (err) {
    showToast('خطأ في الحفظ: ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 حفظ'; }
  }
}

function showQuickModal(title, content) {
  let modal = document.getElementById('quick-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal modal-lg"><div class="modal-header"><h3 class="modal-title" id="quick-modal-title"></h3><button class="modal-close" onclick="closeModal('quick-modal')">&times;</button></div><div class="modal-body" id="quick-modal-body"></div></div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeModal('quick-modal'); });
    document.body.appendChild(modal);
  }
  document.getElementById('quick-modal-title').textContent = title;
  document.getElementById('quick-modal-body').innerHTML = content;
  openModal('quick-modal');
}

async function deleteCustomer(id) {
  const deleted = await deleteCustomerFromDB(id);
  if (deleted) {
    closeModal('quick-modal');
    filterCustomers();
  }
}
