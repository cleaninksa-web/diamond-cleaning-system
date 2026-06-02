/**
 * Diamond Cleaning - Reports Module
 * تصدير تقارير احترافية PDF (عبر الطباعة) + Excel
 */

const COMPANY = {
  name:   'مؤسسة التنظيف الماسي للصيانة والنظافة',
  phone:  '+966555955690',
  email:  'cleaninksa@gmail.com',
  cr:     '4030524288',
  iban:   'SA7310000001400022356600',
  bank:   'البنك الأهلي السعودي',
  city:   'جدة',
};

// ===== PDF via Print (Arabic-safe) =====
function printReport(title, bodyHTML) {
  const win = window.open('', '_blank');
  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${title} - Diamond Cleaning</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Cairo', sans-serif; color: #1e293b; background: #fff; padding: 0; direction: rtl; }

    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      color: #fff; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center;
    }
    .header h1 { font-size: 20px; font-weight: 700; }
    .header .sub { font-size: 12px; opacity: 0.8; margin-top: 4px; }
    .header .logo-text { font-size: 28px; font-weight: 700; color: #ea580c; }

    .title-bar {
      background: #f8fafc; border-bottom: 3px solid #ea580c;
      padding: 16px 40px; display: flex; justify-content: space-between; align-items: center;
    }
    .title-bar h2 { font-size: 18px; color: #0f172a; }
    .title-bar .date { font-size: 12px; color: #64748b; }

    .content { padding: 24px 40px; }

    .kpi-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px; margin-bottom: 24px;
    }
    .kpi-box {
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
      padding: 16px; text-align: center;
    }
    .kpi-box .value { font-size: 24px; font-weight: 700; color: #0f172a; }
    .kpi-box .label { font-size: 12px; color: #64748b; margin-top: 4px; }
    .kpi-box.primary { border-right: 4px solid #0891b2; }
    .kpi-box.success { border-right: 4px solid #16a34a; }
    .kpi-box.warning { border-right: 4px solid #ea580c; }
    .kpi-box.danger  { border-right: 4px solid #dc2626; }

    table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 16px; }
    th { background: #0f172a; color: #fff; padding: 10px 12px; text-align: right; font-weight: 600; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background: #f8fafc; }
    tr:hover { background: #f1f5f9; }

    .badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-red   { background: #fee2e2; color: #991b1b; }
    .badge-orange { background: #fff7ed; color: #9a3412; }

    .footer {
      margin-top: 40px; padding: 16px 40px; background: #f8fafc;
      border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between;
      font-size: 11px; color: #94a3b8;
    }

    .section-title { font-size: 16px; color: #0f172a; font-weight: 700; margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #ea580c; }

    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .kpi-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background:#0f172a;color:#fff;padding:12px 40px;display:flex;justify-content:space-between;align-items:center">
    <span>📄 معاينة التقرير — اضغط <strong>Ctrl+P</strong> أو الزر للطباعة كـ PDF</span>
    <button onclick="window.print()" style="background:#ea580c;color:#fff;border:none;padding:8px 24px;border-radius:8px;cursor:pointer;font-family:Cairo;font-size:14px;font-weight:600">🖨️ طباعة / حفظ PDF</button>
  </div>

  <div class="header">
    <div>
      <h1>${COMPANY.name}</h1>
      <div class="sub">${COMPANY.phone} | ${COMPANY.email} | سجل تجاري: ${COMPANY.cr}</div>
    </div>
    <div class="logo-text">💎</div>
  </div>

  <div class="title-bar">
    <h2>${title}</h2>
    <div class="date">${dateStr} — ${timeStr}</div>
  </div>

  <div class="content">
    ${bodyHTML}
  </div>

  <div class="footer">
    <span>${COMPANY.name} — ${COMPANY.city}</span>
    <span>IBAN: ${COMPANY.iban} | ${COMPANY.bank}</span>
  </div>
</body>
</html>`);
  win.document.close();
}

// ===== DATA HELPERS =====
function getReportData() {
  const customers = window.STATE.customers || [];
  const payments  = window.STATE.payments || [];
  const contracts = window.STATE.contracts || [];
  const techs     = window.STATE.technicians || [];
  const active    = customers.filter(c => c.status === 'يعمل');
  const totalPaid = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const monthlyRev = active.reduce((s, c) => s + (parseFloat(c.monthly_subscription || c.monthly_fee) || 0), 0);
  return { customers, payments, contracts, techs, active, totalPaid, monthlyRev };
}

function fmtN(n) { return (n || 0).toLocaleString('ar-SA'); }
function fmtC(n) { return fmtN(n) + ' ر.س'; }

// ===== REPORT PREVIEW + EXPORT =====
function generateReport(type) {
  const output = document.getElementById('report-output');
  if (!output) return;
  const { customers, payments, techs, active, totalPaid, monthlyRev, contracts } = getReportData();

  if (type === 'performance') {
    output.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 class="card-title">📊 تقرير الأداء الشامل</h3>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-danger" onclick="exportPerformancePDF()">📄 تصدير PDF</button>
          <button class="btn btn-sm btn-success" onclick="exportPerformanceExcel()">📊 تصدير Excel</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-top:16px">
        <div class="kpi-card cyan"><div class="kpi-value">${customers.length}</div><div class="kpi-label">إجمالي العملاء</div></div>
        <div class="kpi-card success"><div class="kpi-value">${active.length}</div><div class="kpi-label">نشطين</div></div>
        <div class="kpi-card orange"><div class="kpi-value">${customers.length - active.length}</div><div class="kpi-label">متوقفين</div></div>
        <div class="kpi-card navy"><div class="kpi-value">${formatCurrency(totalPaid)}</div><div class="kpi-label">إجمالي التحصيلات</div></div>
        <div class="kpi-card success"><div class="kpi-value">${formatCurrency(monthlyRev)}</div><div class="kpi-label">الإيراد الشهري</div></div>
        <div class="kpi-card danger"><div class="kpi-value">${payments.length}</div><div class="kpi-label">عدد الدفعات</div></div>
      </div>
    </div>`;
  }

  else if (type === 'technicians') {
    const rows = techs.map(t => {
      const mc = customers.filter(c => c.technician_id === t.id);
      const ma = mc.filter(c => c.status === 'يعمل');
      const rev = ma.reduce((s,c) => s + (parseFloat(c.monthly_subscription||c.monthly_fee)||0), 0);
      const paid = payments.filter(p => { const c = customers.find(x => x.id === p.customer_id); return c && c.technician_id === t.id; }).reduce((s,p) => s + (parseFloat(p.amount)||0), 0);
      return `<tr><td><strong>🔧 ${t.name}</strong></td><td>${mc.length}</td><td style="color:var(--success)">${ma.length}</td><td>${formatCurrency(rev)}</td><td>${formatCurrency(paid)}</td></tr>`;
    }).join('');

    output.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 class="card-title">🔧 تقرير أداء الفنيين</h3>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-danger" onclick="exportTechPDF()">📄 PDF</button>
          <button class="btn btn-sm btn-success" onclick="exportTechExcel()">📊 Excel</button>
        </div>
      </div>
      <div class="table-wrapper"><table>
        <thead><tr><th>الفني</th><th>إجمالي</th><th>نشطين</th><th>الإيراد الشهري</th><th>إجمالي التحصيلات</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
  }

  else if (type === 'customers') {
    output.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 class="card-title">👥 تقرير بيانات العملاء (${customers.length})</h3>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-danger" onclick="exportCustomersPDF()">📄 PDF</button>
          <button class="btn btn-sm btn-success" onclick="exportCustomersExcel()">📊 Excel</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:16px">
        <div class="kpi-card cyan"><div class="kpi-value">${customers.length}</div><div class="kpi-label">إجمالي</div></div>
        <div class="kpi-card success"><div class="kpi-value">${active.length}</div><div class="kpi-label">يعمل</div></div>
        <div class="kpi-card danger"><div class="kpi-value">${customers.length - active.length}</div><div class="kpi-label">متوقف</div></div>
      </div>
    </div>`;
  }

  else if (type === 'arrears') {
    // حساب المتأخرات
    const now = new Date();
    const curMonth = now.getMonth() + 1;
    const curYear  = now.getFullYear();

    const arrears = active.map(c => {
      const custPays = payments.filter(p => p.customer_id === c.id);
      const totalPaid = custPays.reduce((s,p) => s + (parseFloat(p.amount)||0), 0);
      const monthly = parseFloat(c.monthly_subscription || c.monthly_fee) || 0;
      const startDate = c.contract_start ? new Date(c.contract_start) : new Date(curYear - 1, 0, 1);
      const monthsElapsed = Math.max(1, (curYear - startDate.getFullYear()) * 12 + (curMonth - startDate.getMonth()));
      const shouldPaid = monthly * monthsElapsed;
      const remaining  = shouldPaid - totalPaid;
      return { ...c, totalPaid, remaining, shouldPaid, monthly, monthsElapsed };
    }).filter(c => c.remaining > 0 && c.monthly > 0).sort((a,b) => b.remaining - a.remaining);

    const totalArrears = arrears.reduce((s,c) => s + c.remaining, 0);

    output.innerHTML = `
    <div class="card">
      <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 class="card-title">⚠️ تقرير المتأخرات (${arrears.length} عميل)</h3>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-danger" onclick="exportArrearsPDF()">📄 PDF</button>
          <button class="btn btn-sm btn-success" onclick="exportArrearsExcel()">📊 Excel</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0">
        <div class="kpi-card danger"><div class="kpi-value">${arrears.length}</div><div class="kpi-label">عملاء متأخرين</div></div>
        <div class="kpi-card orange"><div class="kpi-value">${formatCurrency(totalArrears)}</div><div class="kpi-label">إجمالي المتأخرات</div></div>
      </div>
      <div class="table-wrapper"><table>
        <thead><tr><th>#</th><th>العميل</th><th>الفني</th><th>الشهري</th><th>المدفوع</th><th>المتبقي</th></tr></thead>
        <tbody>${arrears.slice(0,30).map((c,i) => `<tr><td>${i+1}</td><td>${c.name_ar||c.name||''}</td><td>${c.technician_name||'—'}</td><td>${formatCurrency(c.monthly)}</td><td>${formatCurrency(c.totalPaid)}</td><td style="color:var(--danger);font-weight:700">${formatCurrency(c.remaining)}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>`;

    // Store for PDF export
    window._arrearsData = arrears;
  }
}

// ===== PDF EXPORTS =====

function exportPerformancePDF() {
  const { customers, payments, active, totalPaid, monthlyRev } = getReportData();
  printReport('تقرير الأداء الشامل', `
    <div class="kpi-grid">
      <div class="kpi-box primary"><div class="value">${fmtN(customers.length)}</div><div class="label">إجمالي العملاء</div></div>
      <div class="kpi-box success"><div class="value">${fmtN(active.length)}</div><div class="label">عملاء نشطين</div></div>
      <div class="kpi-box warning"><div class="value">${fmtN(customers.length - active.length)}</div><div class="label">متوقفين</div></div>
      <div class="kpi-box primary"><div class="value">${fmtC(totalPaid)}</div><div class="label">إجمالي التحصيلات</div></div>
      <div class="kpi-box success"><div class="value">${fmtC(monthlyRev)}</div><div class="label">الإيراد الشهري المتوقع</div></div>
      <div class="kpi-box warning"><div class="value">${fmtN(payments.length)}</div><div class="label">عدد عمليات الدفع</div></div>
    </div>

    <h3 class="section-title">توزيع العملاء حسب الحالة</h3>
    <table>
      <thead><tr><th>الحالة</th><th>العدد</th><th>النسبة</th></tr></thead>
      <tbody>
        <tr><td><span class="badge badge-green">يعمل</span></td><td>${active.length}</td><td>${Math.round(active.length/customers.length*100)}%</td></tr>
        <tr><td><span class="badge badge-red">متوقف</span></td><td>${customers.length-active.length}</td><td>${Math.round((customers.length-active.length)/customers.length*100)}%</td></tr>
      </tbody>
    </table>
  `);
}

function exportTechPDF() {
  const { customers, payments, techs } = getReportData();
  const rows = techs.map(t => {
    const mc = customers.filter(c => c.technician_id === t.id);
    const ma = mc.filter(c => c.status === 'يعمل');
    const rev = ma.reduce((s,c) => s + (parseFloat(c.monthly_subscription||c.monthly_fee)||0), 0);
    const paid = payments.filter(p => { const c = customers.find(x=>x.id===p.customer_id); return c && c.technician_id===t.id; }).reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    return `<tr><td><strong>${t.name}</strong></td><td>${mc.length}</td><td>${ma.length}</td><td>${fmtC(rev)}</td><td>${fmtC(paid)}</td></tr>`;
  }).join('');

  printReport('تقرير أداء الفنيين', `
    <table>
      <thead><tr><th>الفني</th><th>إجمالي العملاء</th><th>نشطين</th><th>الإيراد الشهري</th><th>إجمالي التحصيلات</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `);
}

function exportCustomersPDF() {
  const { customers, techs } = getReportData();
  const rows = customers.map((c,i) => {
    const techName = techs.find(t => t.id === c.technician_id)?.name || c.technician_name || '—';
    const badge = c.status === 'يعمل' ? 'badge-green' : 'badge-red';
    return `<tr>
      <td>${i+1}</td>
      <td>${c.secret_code||''}</td>
      <td><strong>${c.name_ar||c.name||''}</strong></td>
      <td dir="ltr">${c.phone||''}</td>
      <td>${c.district||''}</td>
      <td>${techName}</td>
      <td><span class="badge ${badge}">${c.status||''}</span></td>
      <td>${fmtC(parseFloat(c.monthly_subscription||c.monthly_fee)||0)}</td>
    </tr>`;
  }).join('');

  printReport(`تقرير بيانات العملاء (${customers.length} عميل)`, `
    <table>
      <thead><tr><th>#</th><th>الكود</th><th>الاسم</th><th>الجوال</th><th>الحي</th><th>الفني</th><th>الحالة</th><th>الاشتراك</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `);
}

function exportArrearsPDF() {
  const arrears = window._arrearsData || [];
  if (!arrears.length) { generateReport('arrears'); setTimeout(exportArrearsPDF, 500); return; }
  const totalArrears = arrears.reduce((s,c) => s + c.remaining, 0);

  const rows = arrears.map((c,i) => `<tr>
    <td>${i+1}</td>
    <td><strong>${c.name_ar||c.name||''}</strong></td>
    <td>${c.technician_name||'—'}</td>
    <td dir="ltr">${c.phone||''}</td>
    <td>${fmtC(c.monthly)}</td>
    <td>${fmtC(c.totalPaid)}</td>
    <td style="color:#dc2626;font-weight:700">${fmtC(c.remaining)}</td>
  </tr>`).join('');

  printReport(`تقرير المتأخرات (${arrears.length} عميل)`, `
    <div class="kpi-grid">
      <div class="kpi-box danger"><div class="value">${fmtN(arrears.length)}</div><div class="label">عملاء متأخرين</div></div>
      <div class="kpi-box warning"><div class="value">${fmtC(totalArrears)}</div><div class="label">إجمالي المتأخرات</div></div>
    </div>
    <table>
      <thead><tr><th>#</th><th>العميل</th><th>الفني</th><th>الجوال</th><th>الشهري</th><th>المدفوع</th><th>المتبقي</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `);
}

// ===== EXCEL EXPORTS =====

function exportPerformanceExcel() {
  const { customers, payments, active, totalPaid, monthlyRev } = getReportData();
  const data = [
    { 'المؤشر': 'إجمالي العملاء', 'القيمة': customers.length },
    { 'المؤشر': 'عملاء نشطين', 'القيمة': active.length },
    { 'المؤشر': 'متوقفين', 'القيمة': customers.length - active.length },
    { 'المؤشر': 'إجمالي التحصيلات', 'القيمة': totalPaid },
    { 'المؤشر': 'عدد الدفعات', 'القيمة': payments.length },
    { 'المؤشر': 'الإيراد الشهري', 'القيمة': monthlyRev },
  ];
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = [{ wch: 25 }, { wch: 18 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'الأداء');
  XLSX.writeFile(wb, `الماسي_الأداء_${new Date().toLocaleDateString('en-CA')}.xlsx`);
  showToast('تم تصدير تقرير الأداء Excel 📊', 'success');
}

function exportTechExcel() {
  const { customers, payments, techs } = getReportData();
  const data = techs.map(t => {
    const mc = customers.filter(c => c.technician_id === t.id);
    const ma = mc.filter(c => c.status === 'يعمل');
    const rev = ma.reduce((s,c) => s + (parseFloat(c.monthly_subscription||c.monthly_fee)||0), 0);
    const paid = payments.filter(p => { const c = customers.find(x=>x.id===p.customer_id); return c && c.technician_id===t.id; }).reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    return { 'الفني': t.name, 'إجمالي العملاء': mc.length, 'نشطين': ma.length, 'الإيراد الشهري': rev, 'التحصيلات': paid };
  });
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = [{ wch: 15 }, { wch: 14 }, { wch: 10 }, { wch: 16 }, { wch: 16 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'الفنيون');
  XLSX.writeFile(wb, `الماسي_الفنيون_${new Date().toLocaleDateString('en-CA')}.xlsx`);
  showToast('تم تصدير تقرير الفنيين Excel 📊', 'success');
}

function exportCustomersExcel() {
  const { customers, techs } = getReportData();
  const data = customers.map((c,i) => ({
    '#': i+1,
    'الكود': c.secret_code || '',
    'الاسم': c.name_ar || c.name || '',
    'الجوال': c.phone || '',
    'الحي': c.district || '',
    'الفني': techs.find(t=>t.id===c.technician_id)?.name || c.technician_name || '',
    'الحالة': c.status || '',
    'نوع المسبح': c.pool_type || '',
    'الزيارات': c.weekly_visits || '',
    'الأيام': c.visit_days || c.days || '',
    'الاشتراك الشهري': parseFloat(c.monthly_subscription||c.monthly_fee) || 0,
    'ملاحظات': c.notes || '',
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = Array(12).fill({ wch: 16 });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'العملاء');
  XLSX.writeFile(wb, `الماسي_العملاء_${new Date().toLocaleDateString('en-CA')}.xlsx`);
  showToast('تم تصدير بيانات العملاء Excel 📊', 'success');
}

function exportArrearsExcel() {
  const arrears = window._arrearsData || [];
  if (!arrears.length) { generateReport('arrears'); setTimeout(exportArrearsExcel, 500); return; }
  const data = arrears.map((c,i) => ({
    '#': i+1,
    'الكود': c.secret_code || '',
    'العميل': c.name_ar || c.name || '',
    'الفني': c.technician_name || '',
    'الجوال': c.phone || '',
    'الشهري': c.monthly,
    'المدفوع': c.totalPaid,
    'المتبقي': c.remaining,
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = Array(8).fill({ wch: 16 });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'المتأخرات');
  XLSX.writeFile(wb, `الماسي_المتأخرات_${new Date().toLocaleDateString('en-CA')}.xlsx`);
  showToast('تم تصدير تقرير المتأخرات Excel 📊', 'success');
}
