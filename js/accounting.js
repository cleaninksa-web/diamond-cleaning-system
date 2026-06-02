/**
 * Diamond Cleaning — Accounting Module (accounting.js)
 * وحدة المحاسبة الكاملة
 * التبويبات: الملخص | بطاقات العمل | الرواتب | المصروفات | المشاريع | البنوك
 */

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatCurrency(n) {
  const v = parseFloat(n) || 0;
  return v.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
}

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function prevMonthKey() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key) {
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
                  'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const [y, m] = key.split('-');
  return `${months[parseInt(m) - 1]} ${y}`;
}

function last6MonthKeys() {
  const keys = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const dd = new Date(d.getFullYear(), d.getMonth() - i, 1);
    keys.push(`${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
}

function genRef(prefix) {
  const y = new Date().getFullYear();
  const n = String(Math.floor(Math.random() * 9000) + 1000);
  return `${prefix}-${y}-${n}`;
}

function pctChange(prev, curr) {
  if (!prev || prev === 0) return curr > 0 ? '+100%' : '—';
  const p = ((curr - prev) / prev * 100).toFixed(1);
  return (p >= 0 ? '+' : '') + p + '%';
}

function pctClass(prev, curr, invert = false) {
  const up = curr >= prev;
  return (invert ? !up : up) ? 'up' : 'down';
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE للمحاسبة
// ─────────────────────────────────────────────────────────────────────────────
window.ACC = {
  workOrders:      [],
  expenses:        [],
  salaries:        [],
  projects:        [],
  projectPayments: [],
  bankAccounts:    [],
  loaded:          false,
  activeTab:       'summary',
  summaryChart:    null,
  expenseChart:    null,
};

// ─────────────────────────────────────────────────────────────────────────────
// LOAD DATA
// ─────────────────────────────────────────────────────────────────────────────
async function loadAccounting() {
  if (!window.db) return;
  try {
    const [wo, exp, sal, proj, pp, ba] = await Promise.all([
      db.from('work_orders').select('*').order('created_at', { ascending: false }),
      db.from('expenses').select('*').order('date', { ascending: false }),
      db.from('salaries').select('*').order('created_at', { ascending: false }),
      db.from('sales_projects').select('*').order('created_at', { ascending: false }),
      db.from('project_payments').select('*').order('created_at', { ascending: false }),
      db.from('bank_accounts').select('*').order('id'),
    ]);
    ACC.workOrders      = wo.data  || [];
    ACC.expenses        = exp.data || [];
    ACC.salaries        = sal.data || [];
    ACC.projects        = proj.data || [];
    ACC.projectPayments = pp.data  || [];
    ACC.bankAccounts    = ba.data  || [];
    ACC.loaded = true;
  } catch(e) {
    console.warn('Accounting load error:', e.message);
    ACC.loaded = true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY POINT — called by router
// ─────────────────────────────────────────────────────────────────────────────
async function load_accounting() {
  const section = document.getElementById('section-accounting');
  if (!section) return;
  if (!section.innerHTML.trim()) buildAccountingUI(section);

  if (!ACC.loaded) {
    showAccLoading(true);
    await loadAccounting();
    showAccLoading(false);
  }
  switchAccTab(ACC.activeTab);
}

function showAccLoading(show) {
  const el = document.getElementById('acc-loading');
  if (el) el.style.display = show ? 'flex' : 'none';
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD SKELETON UI
// ─────────────────────────────────────────────────────────────────────────────
function buildAccountingUI(section) {
  section.innerHTML = `
  <!-- Loading overlay -->
  <div id="acc-loading" style="display:none;position:absolute;inset:0;background:rgba(255,255,255,0.8);z-index:100;align-items:center;justify-content:center;flex-direction:column;gap:16px">
    <div class="spinner"></div><div style="color:var(--navy);font-weight:600">جاري تحميل البيانات المحاسبية...</div>
  </div>

  <!-- TABS -->
  <div class="tabs acc-tabs" id="acc-tabs">
    <div class="tab active" onclick="switchAccTab('summary')">📊 الملخص المالي</div>
    <div class="tab" onclick="switchAccTab('workorders')">🗂️ بطاقات العمل</div>
    <div class="tab" onclick="switchAccTab('salaries')">💼 الرواتب</div>
    <div class="tab" onclick="switchAccTab('expenses')">🧾 المصروفات</div>
    <div class="tab" onclick="switchAccTab('projects')">🏗️ مشاريع المبيعات</div>
    <div class="tab" onclick="switchAccTab('banks')">🏦 الحسابات البنكية</div>
  </div>

  <!-- PANELS -->
  <div id="acc-panel-summary"  class="acc-panel"></div>
  <div id="acc-panel-workorders" class="acc-panel" style="display:none"></div>
  <div id="acc-panel-salaries"  class="acc-panel" style="display:none"></div>
  <div id="acc-panel-expenses"  class="acc-panel" style="display:none"></div>
  <div id="acc-panel-projects"  class="acc-panel" style="display:none"></div>
  <div id="acc-panel-banks"     class="acc-panel" style="display:none"></div>
  `;
}

function switchAccTab(tab) {
  ACC.activeTab = tab;
  // update tabs
  document.querySelectorAll('#acc-tabs .tab').forEach((t, i) => {
    const names = ['summary','workorders','salaries','expenses','projects','banks'];
    t.classList.toggle('active', names[i] === tab);
  });
  // show/hide panels
  ['summary','workorders','salaries','expenses','projects','banks'].forEach(n => {
    const el = document.getElementById('acc-panel-' + n);
    if (el) el.style.display = n === tab ? 'block' : 'none';
  });
  // render
  const fn = { summary: renderSummary, workorders: renderWorkOrders,
                salaries: renderSalaries, expenses: renderExpenses,
                projects: renderProjects, banks: renderBanks };
  if (fn[tab]) fn[tab]();
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — SUMMARY
// ─────────────────────────────────────────────────────────────────────────────
function calcMonthRevenue(monthKey) {
  // من التحصيلات الحقيقية
  const payments = (STATE.payments || []).filter(p => {
    if (!p.payment_date) return false;
    return p.payment_date.startsWith(monthKey);
  });
  const subsRev = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);

  // من دفعات المشاريع
  const projRev = ACC.projectPayments
    .filter(pp => pp.status === 'مدفوعة' && pp.paid_date && pp.paid_date.startsWith(monthKey))
    .reduce((s, pp) => s + (parseFloat(pp.amount) || 0), 0);

  // من بطاقات العمل المعتمدة نوع "عمل_إضافي"
  const extraRev = ACC.workOrders
    .filter(wo => wo.status === 'معتمد' && wo.type === 'عمل_إضافي' && wo.created_at && wo.created_at.startsWith(monthKey))
    .reduce((s, wo) => s + (parseFloat(wo.amount) || 0), 0);

  return subsRev + projRev + extraRev;
}

function calcMonthExpenses(monthKey) {
  const exp = ACC.expenses
    .filter(e => e.date && e.date.startsWith(monthKey))
    .reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

  const sal = ACC.salaries
    .filter(s => s.month === monthKey && s.status !== 'بانتظار')
    .reduce((s, sa) => s + (parseFloat(sa.net_salary) || 0), 0);

  return exp + sal;
}

function renderSummary() {
  const panel = document.getElementById('acc-panel-summary');
  if (!panel) return;

  const mk = currentMonthKey();
  const pk = prevMonthKey();

  const rev   = calcMonthRevenue(mk);
  const exp   = calcMonthExpenses(mk);
  const pRev  = calcMonthRevenue(pk);
  const pExp  = calcMonthExpenses(pk);
  const profit = rev - exp;
  const profitPct = rev > 0 ? (profit / rev * 100).toFixed(1) : 0;

  // Alert counts
  const pendingWO   = ACC.workOrders.filter(w => w.status === 'بانتظار').length;
  const pendingSal  = ACC.salaries.filter(s => s.status === 'بانتظار').length;
  const nowStr      = new Date().toISOString().split('T')[0];
  const weekLater   = new Date(); weekLater.setDate(weekLater.getDate() + 7);
  const weekStr     = weekLater.toISOString().split('T')[0];
  const duePP       = ACC.projectPayments.filter(p =>
    p.status === 'مستحقة' && p.due_date && p.due_date <= weekStr).length;

  panel.innerHTML = `
  <!-- KPI Row 1 -->
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
    <div class="kpi-card success">
      <div class="kpi-icon">💰</div>
      <div class="kpi-value" style="color:var(--success)">${formatCurrency(rev)}</div>
      <div class="kpi-label">إيراد ${monthLabel(mk)}</div>
      <div class="kpi-change ${pctClass(pRev,rev)}">${pctChange(pRev,rev)} عن الشهر الماضي</div>
    </div>
    <div class="kpi-card danger">
      <div class="kpi-icon">💸</div>
      <div class="kpi-value" style="color:var(--danger)">${formatCurrency(exp)}</div>
      <div class="kpi-label">مصروف ${monthLabel(mk)}</div>
      <div class="kpi-change ${pctClass(pExp,exp,true)}">${pctChange(pExp,exp)} عن الشهر الماضي</div>
    </div>
    <div class="kpi-card ${profit >= 0 ? 'success' : 'danger'}">
      <div class="kpi-icon">${profit >= 0 ? '📈' : '📉'}</div>
      <div class="kpi-value" style="color:${profit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(profit)}</div>
      <div class="kpi-label">صافي الربح</div>
      <div class="kpi-change ${pctClass(pRev-pExp, profit)}">${pctChange(pRev-pExp, profit)}</div>
    </div>
    <div class="kpi-card ${parseFloat(profitPct) >= 50 ? 'success' : 'orange'}">
      <div class="kpi-icon">📊</div>
      <div class="kpi-value" style="color:${parseFloat(profitPct) >= 50 ? 'var(--success)' : 'var(--orange)'}">${profitPct}%</div>
      <div class="kpi-label">هامش الربح</div>
      <div class="kpi-change" style="color:var(--text-secondary)">إيراد ÷ مصروف</div>
    </div>
  </div>

  <!-- Alert Row -->
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-top:0">
    <div class="acc-alert-card ${pendingWO > 0 ? 'warn' : 'ok'}" onclick="switchAccTab('workorders')">
      <span class="acc-alert-icon">🗂️</span>
      <div>
        <div class="acc-alert-num">${pendingWO}</div>
        <div class="acc-alert-lbl">بطاقة عمل بانتظار الاعتماد</div>
      </div>
      <span style="margin-right:auto;color:var(--text-secondary);font-size:0.8rem">اضغط للمراجعة ←</span>
    </div>
    <div class="acc-alert-card ${pendingSal > 0 ? 'warn' : 'ok'}" onclick="switchAccTab('salaries')">
      <span class="acc-alert-icon">💼</span>
      <div>
        <div class="acc-alert-num">${pendingSal}</div>
        <div class="acc-alert-lbl">راتب بانتظار الاعتماد</div>
      </div>
      <span style="margin-right:auto;color:var(--text-secondary);font-size:0.8rem">اضغط للمراجعة ←</span>
    </div>
    <div class="acc-alert-card ${duePP > 0 ? 'danger' : 'ok'}" onclick="switchAccTab('projects')">
      <span class="acc-alert-icon">🏗️</span>
      <div>
        <div class="acc-alert-num">${duePP}</div>
        <div class="acc-alert-lbl">دفعة مشروع مستحقة هذا الأسبوع</div>
      </div>
      <span style="margin-right:auto;color:var(--text-secondary);font-size:0.8rem">اضغط للمراجعة ←</span>
    </div>
  </div>

  <!-- Chart -->
  <div class="card" style="margin-bottom:20px">
    <div class="card-header">
      <h3 class="card-title">📈 الإيراد مقابل المصروف — آخر 6 أشهر</h3>
    </div>
    <canvas id="acc-summary-chart" style="max-height:280px"></canvas>
  </div>

  <!-- Comparison Table -->
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">📋 مقارنة شهرية — ${monthLabel(pk)} مقابل ${monthLabel(mk)}</h3>
    </div>
    ${buildComparisonTable(mk, pk)}
  </div>
  `;

  // Render chart
  setTimeout(() => renderSummaryChart(), 100);
}

function buildComparisonTable(mk, pk) {
  // Subscriptions from payments
  const subsCurr = (STATE.payments || []).filter(p => p.payment_date?.startsWith(mk)).reduce((s,p) => s+(parseFloat(p.amount)||0), 0);
  const subsPrev = (STATE.payments || []).filter(p => p.payment_date?.startsWith(pk)).reduce((s,p) => s+(parseFloat(p.amount)||0), 0);

  // Extra work
  const exCurr = ACC.workOrders.filter(w=>w.status==='معتمد'&&w.type==='عمل_إضافي'&&w.created_at?.startsWith(mk)).reduce((s,w)=>s+(parseFloat(w.amount)||0),0);
  const exPrev = ACC.workOrders.filter(w=>w.status==='معتمد'&&w.type==='عمل_إضافي'&&w.created_at?.startsWith(pk)).reduce((s,w)=>s+(parseFloat(w.amount)||0),0);

  // Projects
  const prCurr = ACC.projectPayments.filter(p=>p.status==='مدفوعة'&&p.paid_date?.startsWith(mk)).reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
  const prPrev = ACC.projectPayments.filter(p=>p.status==='مدفوعة'&&p.paid_date?.startsWith(pk)).reduce((s,p)=>s+(parseFloat(p.amount)||0),0);

  // Salaries
  const salCurr = ACC.salaries.filter(s=>s.month===mk&&s.status!=='بانتظار').reduce((s,sa)=>s+(parseFloat(sa.net_salary)||0),0);
  const salPrev = ACC.salaries.filter(s=>s.month===pk&&s.status!=='بانتظار').reduce((s,sa)=>s+(parseFloat(sa.net_salary)||0),0);

  // Expenses
  const expCurr = ACC.expenses.filter(e=>e.date?.startsWith(mk)).reduce((s,e)=>s+(parseFloat(e.amount)||0),0);
  const expPrev = ACC.expenses.filter(e=>e.date?.startsWith(pk)).reduce((s,e)=>s+(parseFloat(e.amount)||0),0);

  const rows = [
    { label:'💰 الاشتراكات الشهرية', prev: subsPrev, curr: subsCurr, type:'rev' },
    { label:'🔧 أعمال إضافية',       prev: exPrev,   curr: exCurr,   type:'rev' },
    { label:'🏗️ مشاريع',             prev: prPrev,   curr: prCurr,   type:'rev' },
    { label:'💼 رواتب',              prev: salPrev,  curr: salCurr,  type:'exp' },
    { label:'🧾 مصروفات أخرى',       prev: expPrev,  curr: expCurr,  type:'exp' },
  ];

  const rowsHTML = rows.map(r => {
    const chg = pctChange(r.prev, r.curr);
    const cls = r.type === 'rev' ? pctClass(r.prev, r.curr) : pctClass(r.prev, r.curr, true);
    return `<tr>
      <td>${r.label}</td>
      <td style="text-align:left;direction:ltr">${formatCurrency(r.prev)}</td>
      <td style="text-align:left;direction:ltr">${formatCurrency(r.curr)}</td>
      <td><span class="kpi-change ${cls}" style="font-weight:700">${chg}</span></td>
    </tr>`;
  }).join('');

  return `<div class="table-wrapper"><table>
    <thead><tr><th>البند</th><th>الشهر الماضي</th><th>هذا الشهر</th><th>التغيير</th></tr></thead>
    <tbody>${rowsHTML}</tbody>
  </table></div>`;
}

function renderSummaryChart() {
  const ctx = document.getElementById('acc-summary-chart');
  if (!ctx) return;
  if (ACC.summaryChart) { ACC.summaryChart.destroy(); ACC.summaryChart = null; }

  const keys   = last6MonthKeys();
  const labels = keys.map(k => monthLabel(k));
  const revs   = keys.map(k => calcMonthRevenue(k));
  const exps   = keys.map(k => calcMonthExpenses(k));

  ACC.summaryChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'الإيراد', data: revs, borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.08)',
          tension: 0.4, fill: true, pointBackgroundColor: '#10B981', pointRadius: 5, pointHoverRadius: 7 },
        { label: 'المصروف', data: exps, borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.08)',
          tension: 0.4, fill: true, pointBackgroundColor: '#EF4444', pointRadius: 5, pointHoverRadius: 7 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { labels: { font: { family: 'Tajawal', size: 13 } } },
                 tooltip: { callbacks: { label: ctx => ' ' + formatCurrency(ctx.raw) } } },
      scales: {
        y: { ticks: { callback: v => (v/1000).toFixed(0) + 'k', font: { family: 'Tajawal' } },
             grid: { color: 'rgba(0,0,0,0.04)' } },
        x: { ticks: { font: { family: 'Tajawal' } }, grid: { display: false } }
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — WORK ORDERS
// ─────────────────────────────────────────────────────────────────────────────
let woFilter = { status: '', tech: '', month: '' };

function renderWorkOrders() {
  const panel = document.getElementById('acc-panel-workorders');
  if (!panel) return;

  const techOptions = (STATE.technicians || []).map(t =>
    `<option value="${t.id}">${t.name}</option>`).join('');

  const monthOpts = last6MonthKeys().map(k =>
    `<option value="${k}">${monthLabel(k)}</option>`).join('');

  panel.innerHTML = `
  <div class="filter-bar" style="justify-content:space-between">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <select class="form-select" id="wo-filter-status" onchange="filterWO()" style="min-width:130px">
        <option value="">كل الحالات</option>
        <option value="بانتظار">⏳ بانتظار</option>
        <option value="معتمد">✅ معتمد</option>
        <option value="مرفوض">❌ مرفوض</option>
      </select>
      <select class="form-select" id="wo-filter-tech" onchange="filterWO()" style="min-width:130px">
        <option value="">كل الفنيين</option>
        ${techOptions}
      </select>
      <select class="form-select" id="wo-filter-month" onchange="filterWO()" style="min-width:130px">
        <option value="">كل الأشهر</option>
        ${monthOpts}
      </select>
    </div>
    <button class="btn btn-primary" onclick="openWOModal()">➕ بطاقة عمل جديدة</button>
  </div>
  <div id="wo-list"></div>
  `;

  filterWO();
}

function filterWO() {
  const status = document.getElementById('wo-filter-status')?.value || '';
  const tech   = document.getElementById('wo-filter-tech')?.value || '';
  const month  = document.getElementById('wo-filter-month')?.value || '';

  let items = ACC.workOrders;
  if (status) items = items.filter(w => w.status === status);
  if (tech)   items = items.filter(w => String(w.technician_id) === String(tech));
  if (month)  items = items.filter(w => w.created_at?.startsWith(month));

  const list = document.getElementById('wo-list');
  if (!list) return;

  if (!items.length) {
    list.innerHTML = `<div class="empty-state"><div class="icon">🗂️</div><h3>لا توجد بطاقات عمل</h3></div>`;
    return;
  }

  list.innerHTML = items.map(wo => {
    const tech  = STATE.technicians?.find(t => t.id == wo.technician_id);
    const cust  = STATE.customers?.find(c => c.id == wo.customer_id);
    const sMap  = { 'بانتظار': 'warn', 'معتمد': 'ok', 'مرفوض': 'danger-badge' };
    const sIcon = { 'بانتظار': '⏳', 'معتمد': '✅', 'مرفوض': '❌' };
    const tMap  = { 'عمل_إضافي': '🔧', 'ديزل': '⛽', 'عمولة': '💎', 'مصروف_ميداني': '🧾' };

    const showActions = wo.status === 'بانتظار' ? `
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-success btn-sm" onclick="approveWO(${wo.id})">✅ اعتماد</button>
        <button class="btn btn-danger btn-sm" onclick="rejectWO(${wo.id})">❌ رفض</button>
      </div>` : (wo.status === 'مرفوض' && wo.reject_reason ?
      `<div style="color:var(--danger);font-size:0.82rem;margin-top:8px">سبب الرفض: ${wo.reject_reason}</div>` : '');

    return `
    <div class="acc-wo-card ${sMap[wo.status] || ''}">
      <div class="acc-wo-top">
        <span class="acc-wo-ref">${wo.reference_number || 'WO-' + wo.id}</span>
        <span class="acc-wo-type">${tMap[wo.type] || '📋'} ${wo.type}</span>
        <span class="badge acc-badge-${sMap[wo.status] || 'ok'}">${sIcon[wo.status] || ''} ${wo.status}</span>
        <span class="acc-wo-date">${wo.created_at ? wo.created_at.split('T')[0] : '—'}</span>
      </div>
      <div class="acc-wo-body">
        <div class="acc-wo-meta">
          ${tech ? `<span>👷 ${tech.name}</span>` : ''}
          ${cust ? `<span>👤 ${cust.name}</span>` : ''}
        </div>
        <div class="acc-wo-desc">${wo.description || '—'}</div>
        <div class="acc-wo-amount">${formatCurrency(wo.amount)}</div>
      </div>
      ${showActions}
    </div>`;
  }).join('');
}

async function approveWO(id) {
  const wo = ACC.workOrders.find(w => w.id === id);
  if (!wo) return;

  const { error } = await db.from('work_orders').update({
    status: 'معتمد', approved_by: 'المدير', approved_at: new Date().toISOString()
  }).eq('id', id);

  if (error) { showToast('خطأ في الاعتماد', 'error'); return; }

  // Auto-link: commission → salary, field-expense → expenses
  if (wo.type === 'عمولة' && wo.technician_id) {
    await addCommissionToSalary(wo);
  } else if (wo.type === 'مصروف_ميداني') {
    await db.from('expenses').insert({
      date: new Date().toISOString().split('T')[0],
      category: 'مصروف ميداني', amount: wo.amount,
      description: wo.description || '', approved_by: 'المدير'
    });
    ACC.expenses = (await db.from('expenses').select('*').order('date',{ascending:false})).data || [];
  }

  wo.status = 'معتمد';
  showToast('تم اعتماد بطاقة العمل ✅', 'success');
  filterWO();
  if (ACC.activeTab === 'summary') renderSummary();
}

async function addCommissionToSalary(wo) {
  const mk = currentMonthKey();
  const existing = ACC.salaries.find(s => s.technician_id == wo.technician_id && s.month === mk);
  if (existing) {
    const newComm = (parseFloat(existing.commission) || 0) + (parseFloat(wo.amount) || 0);
    const newNet  = (parseFloat(existing.net_salary) || 0) + (parseFloat(wo.amount) || 0);
    await db.from('salaries').update({ commission: newComm, net_salary: newNet }).eq('id', existing.id);
    existing.commission = newComm; existing.net_salary = newNet;
  }
}

async function rejectWO(id) {
  const reason = prompt('سبب الرفض (اختياري):') ?? '';
  const { error } = await db.from('work_orders').update({
    status: 'مرفوض', reject_reason: reason
  }).eq('id', id);
  if (error) { showToast('خطأ في الرفض', 'error'); return; }
  const wo = ACC.workOrders.find(w => w.id === id);
  if (wo) { wo.status = 'مرفوض'; wo.reject_reason = reason; }
  showToast('تم رفض البطاقة', 'warning');
  filterWO();
}

function openWOModal() {
  const techOptions = (STATE.technicians || []).map(t =>
    `<option value="${t.id}">${t.name}</option>`).join('');
  const custOptions = (STATE.customers || []).filter(c=>c.status==='يعمل').slice(0,100).map(c =>
    `<option value="${c.id}">${c.name}</option>`).join('');

  const html = `
  <div class="form-row">
    <div class="form-group">
      <label class="form-label">النوع *</label>
      <select class="form-select" id="wo-f-type">
        <option value="عمل_إضافي">🔧 عمل إضافي</option>
        <option value="ديزل">⛽ ديزل</option>
        <option value="عمولة">💎 عمولة</option>
        <option value="مصروف_ميداني">🧾 مصروف ميداني</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">المبلغ *</label>
      <input type="number" class="form-input" id="wo-f-amount" dir="ltr" placeholder="0.00">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-label">الفني</label>
      <select class="form-select" id="wo-f-tech"><option value="">— اختر —</option>${techOptions}</select>
    </div>
    <div class="form-group">
      <label class="form-label">العميل (اختياري)</label>
      <select class="form-select" id="wo-f-cust"><option value="">— اختر —</option>${custOptions}</select>
    </div>
  </div>
  <div class="form-group">
    <label class="form-label">الوصف</label>
    <textarea class="form-textarea" id="wo-f-desc" rows="3"></textarea>
  </div>`;

  openGenericModal('➕ بطاقة عمل جديدة', html, 'saveWO()');
}

async function saveWO() {
  const type   = document.getElementById('wo-f-type')?.value;
  const amount = parseFloat(document.getElementById('wo-f-amount')?.value);
  const techId = document.getElementById('wo-f-tech')?.value || null;
  const custId = document.getElementById('wo-f-cust')?.value || null;
  const desc   = document.getElementById('wo-f-desc')?.value;

  if (!type || !amount || amount <= 0) { showToast('يرجى إدخال النوع والمبلغ', 'warning'); return; }

  const ref = genRef('WO');
  const { data, error } = await db.from('work_orders').insert({
    reference_number: ref, type, amount, description: desc,
    technician_id: techId || null, customer_id: custId || null,
    status: 'بانتظار', created_by: 'المدير'
  }).select();

  if (error) { showToast('خطأ في الحفظ', 'error'); return; }
  ACC.workOrders.unshift(data[0]);
  closeGenericModal();
  showToast('تم إضافة بطاقة العمل ✅', 'success');
  filterWO();
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — SALARIES
// ─────────────────────────────────────────────────────────────────────────────
function renderSalaries() {
  const panel = document.getElementById('acc-panel-salaries');
  if (!panel) return;

  const monthOpts = last6MonthKeys().map(k =>
    `<option value="${k}" ${k === currentMonthKey() ? 'selected' : ''}>${monthLabel(k)}</option>`).join('');

  panel.innerHTML = `
  <div class="filter-bar" style="justify-content:space-between">
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <select class="form-select" id="sal-filter-month" onchange="renderSalariesTable()" style="min-width:150px">
        ${monthOpts}
      </select>
      <select class="form-select" id="sal-filter-status" onchange="renderSalariesTable()" style="min-width:130px">
        <option value="">كل الحالات</option>
        <option value="بانتظار">⏳ بانتظار</option>
        <option value="معتمد">✅ معتمد</option>
        <option value="مصروف">💰 مصروف</option>
      </select>
    </div>
    <button class="btn btn-primary" onclick="generateSalaries()">⚙️ توليد رواتب الشهر</button>
  </div>
  <div id="sal-table-wrap"></div>
  `;

  renderSalariesTable();
}

function renderSalariesTable() {
  const mk     = document.getElementById('sal-filter-month')?.value || currentMonthKey();
  const status = document.getElementById('sal-filter-status')?.value || '';
  const wrap   = document.getElementById('sal-table-wrap');
  if (!wrap) return;

  let items = ACC.salaries.filter(s => s.month === mk);
  if (status) items = items.filter(s => s.status === status);

  if (!items.length) {
    wrap.innerHTML = `<div class="empty-state"><div class="icon">💼</div>
      <h3>لا توجد رواتب لهذا الشهر</h3>
      <p>اضغط "توليد رواتب الشهر" لإنشاء رواتب تلقائياً</p></div>`;
    return;
  }

  const total = items.reduce((s, i) => s + (parseFloat(i.net_salary) || 0), 0);

  wrap.innerHTML = `
  <div class="card" style="margin-bottom:12px;padding:14px 20px;background:linear-gradient(135deg,var(--navy),#2a3f7a);color:#fff;display:flex;gap:24px;align-items:center">
    <div><div style="font-size:0.8rem;opacity:.7">إجمالي رواتب ${monthLabel(mk)}</div>
    <div style="font-size:1.4rem;font-weight:800">${formatCurrency(total)}</div></div>
    <div><div style="font-size:0.8rem;opacity:.7">عدد الفنيين</div>
    <div style="font-size:1.4rem;font-weight:800">${items.length}</div></div>
  </div>
  <div class="card" style="padding:0">
  <div class="table-wrapper"><table>
    <thead><tr>
      <th>الفني</th><th>الأساسي</th><th>عمولة</th><th>إضافي</th>
      <th>مكافأة</th><th>خصومات</th><th>الصافي</th><th>الحالة</th><th>إجراءات</th>
    </tr></thead>
    <tbody>
    ${items.map(s => {
      const tech = STATE.technicians?.find(t => t.id == s.technician_id);
      const sMap = { 'بانتظار': 'warn', 'معتمد': 'ok', 'مصروف': 'ok' };
      return `<tr>
        <td><strong>${tech?.name || '—'}</strong></td>
        <td dir="ltr">${formatCurrency(s.base_salary)}</td>
        <td dir="ltr" style="color:var(--success)">${formatCurrency(s.commission)}</td>
        <td dir="ltr" style="color:var(--info)">${formatCurrency(s.extra_work)}</td>
        <td dir="ltr" style="color:var(--orange)">${formatCurrency(s.bonus)}</td>
        <td dir="ltr" style="color:var(--danger)">${formatCurrency(s.deductions)}</td>
        <td dir="ltr"><strong style="font-size:1rem">${formatCurrency(s.net_salary)}</strong></td>
        <td><span class="badge acc-badge-${sMap[s.status]||'warn'}">${s.status}</span></td>
        <td>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            ${s.status === 'بانتظار' ? `<button class="btn btn-success btn-sm" onclick="approveSalary(${s.id})">✅</button>` : ''}
            ${s.status === 'معتمد' ? `<button class="btn btn-orange btn-sm" onclick="markSalaryPaid(${s.id})">💰 صُرف</button>` : ''}
            <button class="btn btn-outline btn-sm" onclick="editSalaryDeductions(${s.id})">✏️ تعديل</button>
            <button class="btn btn-outline btn-sm" onclick="showSalaryDetail(${s.id})">📋 تفاصيل</button>
          </div>
        </td>
      </tr>`;
    }).join('')}
    </tbody>
  </table></div></div>`;
}

async function generateSalaries() {
  const mk = document.getElementById('sal-filter-month')?.value || currentMonthKey();
  const techs = STATE.technicians || [];
  if (!techs.length) { showToast('لا يوجد فنيون', 'warning'); return; }

  let created = 0;
  for (const tech of techs) {
    const exists = ACC.salaries.find(s => s.technician_id == tech.id && s.month === mk);
    if (exists) continue;

    // Commissions from approved work orders
    const commissions = ACC.workOrders
      .filter(w => w.status === 'معتمد' && w.type === 'عمولة' && w.technician_id == tech.id && w.created_at?.startsWith(mk))
      .reduce((s, w) => s + (parseFloat(w.amount) || 0), 0);

    // Extra work
    const extraWork = ACC.workOrders
      .filter(w => w.status === 'معتمد' && w.type === 'عمل_إضافي' && w.technician_id == tech.id && w.created_at?.startsWith(mk))
      .reduce((s, w) => s + (parseFloat(w.amount) || 0), 0);

    const base = parseFloat(tech.base_salary) || 0;
    const net  = base + commissions + extraWork;

    const { data, error } = await db.from('salaries').insert({
      technician_id: tech.id, month: mk,
      base_salary: base, commission: commissions, extra_work: extraWork,
      overtime_amount: 0, bonus: 0, deductions: 0, net_salary: net,
      status: 'بانتظار'
    }).select();

    if (!error && data) { ACC.salaries.push(data[0]); created++; }
  }

  if (created === 0) {
    showToast('الرواتب موجودة مسبقاً لهذا الشهر', 'info');
  } else {
    showToast(`تم توليد ${created} راتب بنجاح ✅`, 'success');
  }
  renderSalariesTable();
}

async function approveSalary(id) {
  const { error } = await db.from('salaries').update({ status: 'معتمد' }).eq('id', id);
  if (error) { showToast('خطأ', 'error'); return; }
  const s = ACC.salaries.find(x => x.id === id);
  if (s) s.status = 'معتمد';
  showToast('تم اعتماد الراتب ✅', 'success');
  renderSalariesTable();
}

async function markSalaryPaid(id) {
  const sal = ACC.salaries.find(x => x.id === id);
  if (!sal) return;
  const { error } = await db.from('salaries').update({ status: 'مصروف' }).eq('id', id);
  if (error) { showToast('خطأ', 'error'); return; }
  sal.status = 'مصروف';

  // Add to expenses automatically
  const tech = STATE.technicians?.find(t => t.id == sal.technician_id);
  await db.from('expenses').insert({
    date: new Date().toISOString().split('T')[0],
    category: 'رواتب',
    amount: sal.net_salary,
    description: `راتب ${tech?.name || ''} — ${monthLabel(sal.month)}`,
    approved_by: 'المدير'
  });
  ACC.expenses = (await db.from('expenses').select('*').order('date',{ascending:false})).data || [];

  showToast('تم تسجيل الصرف وإضافته للمصروفات 💰', 'success');
  renderSalariesTable();
}

async function editSalaryDeductions(id) {
  const sal = ACC.salaries.find(x => x.id === id);
  if (!sal) return;
  const tech = STATE.technicians?.find(t => t.id == sal.technician_id);

  const html = `
  <p style="margin-bottom:16px;color:var(--navy);font-weight:600">الفني: ${tech?.name || ''} — ${monthLabel(sal.month)}</p>
  <div class="form-row">
    <div class="form-group"><label class="form-label">مكافأة (ر.س)</label>
      <input type="number" class="form-input" id="sal-f-bonus" value="${sal.bonus||0}" dir="ltr"></div>
    <div class="form-group"><label class="form-label">خصومات (ر.س)</label>
      <input type="number" class="form-input" id="sal-f-ded" value="${sal.deductions||0}" dir="ltr"></div>
  </div>
  <div class="form-group"><label class="form-label">ملاحظات</label>
    <textarea class="form-textarea" id="sal-f-notes">${sal.notes||''}</textarea></div>`;

  openGenericModal('✏️ تعديل الراتب', html, `saveSalaryEdit(${id})`);
}

async function saveSalaryEdit(id) {
  const sal  = ACC.salaries.find(x => x.id === id);
  if (!sal) return;
  const bonus = parseFloat(document.getElementById('sal-f-bonus')?.value) || 0;
  const ded   = parseFloat(document.getElementById('sal-f-ded')?.value) || 0;
  const notes = document.getElementById('sal-f-notes')?.value || '';
  const net   = (parseFloat(sal.base_salary)||0)+(parseFloat(sal.commission)||0)+(parseFloat(sal.extra_work)||0)+bonus-ded;

  const { error } = await db.from('salaries').update({ bonus, deductions: ded, net_salary: net, notes }).eq('id', id);
  if (error) { showToast('خطأ في الحفظ', 'error'); return; }
  sal.bonus = bonus; sal.deductions = ded; sal.net_salary = net; sal.notes = notes;
  closeGenericModal();
  showToast('تم تحديث الراتب ✅', 'success');
  renderSalariesTable();
}

function showSalaryDetail(id) {
  const sal  = ACC.salaries.find(x => x.id === id);
  if (!sal) return;
  const tech = STATE.technicians?.find(t => t.id == sal.technician_id);

  const rows = [
    ['الراتب الأساسي', sal.base_salary, '#1B2754'],
    ['العمولات المعتمدة', sal.commission, '#10B981'],
    ['الأعمال الإضافية', sal.extra_work, '#3b82f6'],
    ['ساعات العمل الإضافي', sal.overtime_amount, '#F39237'],
    ['المكافأة', sal.bonus, '#F39237'],
    ['الخصومات', sal.deductions * -1, '#EF4444'],
  ].map(([l, v, c]) => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
      <span>${l}</span><span style="font-weight:700;color:${c};direction:ltr">${formatCurrency(Math.abs(parseFloat(v)||0))}</span>
    </div>`).join('');

  const html = `
  <div style="background:linear-gradient(135deg,var(--navy),#2a3f7a);color:#fff;padding:16px;border-radius:8px;margin-bottom:16px;text-align:center">
    <div style="font-size:1.1rem;font-weight:700">${tech?.name || '—'}</div>
    <div style="font-size:0.85rem;opacity:.8">${monthLabel(sal.month)}</div>
  </div>
  ${rows}
  <div style="display:flex;justify-content:space-between;padding:14px 0;font-size:1.1rem;font-weight:800;color:var(--success)">
    <span>صافي الراتب</span><span dir="ltr">${formatCurrency(sal.net_salary)}</span>
  </div>
  ${sal.notes ? `<div style="background:var(--bg);padding:10px;border-radius:8px;font-size:0.85rem;color:var(--text-secondary)">ملاحظات: ${sal.notes}</div>` : ''}`;

  openGenericModal('📋 تفاصيل الراتب', html, null, true);
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — EXPENSES
// ─────────────────────────────────────────────────────────────────────────────
function renderExpenses() {
  const panel = document.getElementById('acc-panel-expenses');
  if (!panel) return;

  const monthOpts = last6MonthKeys().map(k =>
    `<option value="${k}" ${k===currentMonthKey()?'selected':''}>${monthLabel(k)}</option>`).join('');

  const bankOpts = ACC.bankAccounts.map(b =>
    `<option value="${b.bank_name}">${b.bank_name}</option>`).join('');

  panel.innerHTML = `
  <div class="filter-bar" style="justify-content:space-between">
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <select class="form-select" id="exp-filter-month" onchange="renderExpensesTable()" style="min-width:150px">
        ${monthOpts}
      </select>
      <select class="form-select" id="exp-filter-cat" onchange="renderExpensesTable()" style="min-width:140px">
        <option value="">كل التصنيفات</option>
        <option>ديزل</option><option>رواتب</option><option>إيجار</option>
        <option>اتصالات</option><option>مواد كيماوية</option><option>معدات</option><option>أخرى</option>
      </select>
    </div>
    <button class="btn btn-primary" onclick="openExpenseModal()">➕ إضافة مصروف</button>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px" id="exp-top">
    <div class="card" id="exp-summary-card"></div>
    <div class="card"><div class="card-header"><h3 class="card-title">توزيع المصروفات</h3></div>
      <canvas id="exp-pie-chart" style="max-height:220px"></canvas></div>
  </div>

  <div class="card" style="padding:0" id="exp-table-wrap"></div>
  `;

  renderExpensesTable();
}

function renderExpensesTable() {
  const mk  = document.getElementById('exp-filter-month')?.value || currentMonthKey();
  const cat = document.getElementById('exp-filter-cat')?.value || '';

  let items = ACC.expenses.filter(e => e.date?.startsWith(mk));
  if (cat) items = items.filter(e => e.category === cat);

  const total = items.reduce((s, e) => s + (parseFloat(e.amount)||0), 0);

  // Category totals for chart
  const catMap = {};
  items.forEach(e => {
    catMap[e.category] = (catMap[e.category] || 0) + (parseFloat(e.amount)||0);
  });

  // Summary card
  const sumCard = document.getElementById('exp-summary-card');
  if (sumCard) {
    const sorted = Object.entries(catMap).sort((a,b) => b[1]-a[1]);
    sumCard.innerHTML = `
      <div class="card-header"><h3 class="card-title">إجمالي ${monthLabel(mk)}</h3></div>
      <div style="font-size:2rem;font-weight:800;color:var(--danger);margin-bottom:16px;direction:ltr">${formatCurrency(total)}</div>
      ${sorted.map(([c,v]) => `
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.85rem">
          <span>${c}</span><span style="font-weight:700;direction:ltr">${formatCurrency(v)}</span>
        </div>`).join('')}`;
  }

  // Pie chart
  renderExpensePie(catMap);

  // Table
  const wrap = document.getElementById('exp-table-wrap');
  if (!wrap) return;
  if (!items.length) {
    wrap.innerHTML = `<div class="empty-state"><div class="icon">🧾</div><h3>لا توجد مصروفات</h3></div>`;
    return;
  }

  wrap.innerHTML = `<div class="table-wrapper"><table>
    <thead><tr><th>التاريخ</th><th>التصنيف</th><th>الوصف</th><th>المبلغ</th><th>البنك</th><th>إجراءات</th></tr></thead>
    <tbody>
    ${items.map(e => `<tr>
      <td>${e.date||'—'}</td>
      <td><span class="badge" style="background:rgba(239,68,68,0.1);color:var(--danger)">${e.category}</span></td>
      <td>${e.description||'—'}</td>
      <td dir="ltr" style="font-weight:700;color:var(--danger)">${formatCurrency(e.amount)}</td>
      <td>${e.bank_account||'—'}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${e.id})">🗑️</button></td>
    </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function renderExpensePie(catMap) {
  const ctx = document.getElementById('exp-pie-chart');
  if (!ctx) return;
  if (ACC.expenseChart) { ACC.expenseChart.destroy(); ACC.expenseChart = null; }
  if (!Object.keys(catMap).length) return;

  const colors = ['#EF4444','#F39237','#F59E0B','#10B981','#3B82F6','#8B5CF6','#EC4899'];
  const labels = Object.keys(catMap);
  const data   = Object.values(catMap);

  ACC.expenseChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors.slice(0, labels.length),
        borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: {
        legend: { position: 'right', labels: { font: { family: 'Tajawal', size: 12 }, padding: 8 } },
        tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } }
      }
    }
  });
}

function openExpenseModal() {
  const bankOpts = ACC.bankAccounts.map(b =>
    `<option value="${b.bank_name}">${b.bank_name}</option>`).join('') || '<option value="الأهلي">الأهلي</option>';

  const html = `
  <div class="form-row">
    <div class="form-group"><label class="form-label">التاريخ *</label>
      <input type="date" class="form-input" id="exp-f-date" value="${new Date().toISOString().split('T')[0]}" dir="ltr"></div>
    <div class="form-group"><label class="form-label">التصنيف *</label>
      <select class="form-select" id="exp-f-cat">
        <option value="ديزل">⛽ ديزل</option>
        <option value="رواتب">💼 رواتب</option>
        <option value="إيجار">🏠 إيجار</option>
        <option value="اتصالات">📱 اتصالات</option>
        <option value="مواد كيماوية">🧪 مواد كيماوية</option>
        <option value="معدات">🔧 معدات</option>
        <option value="مصروف ميداني">🧾 مصروف ميداني</option>
        <option value="أخرى">📋 أخرى</option>
      </select></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label class="form-label">المبلغ *</label>
      <input type="number" class="form-input" id="exp-f-amount" dir="ltr" placeholder="0.00"></div>
    <div class="form-group"><label class="form-label">الحساب البنكي</label>
      <select class="form-select" id="exp-f-bank">${bankOpts}</select></div>
  </div>
  <div class="form-group"><label class="form-label">الوصف</label>
    <textarea class="form-textarea" id="exp-f-desc" rows="2"></textarea></div>`;

  openGenericModal('➕ إضافة مصروف', html, 'saveExpense()');
}

async function saveExpense() {
  const date   = document.getElementById('exp-f-date')?.value;
  const cat    = document.getElementById('exp-f-cat')?.value;
  const amount = parseFloat(document.getElementById('exp-f-amount')?.value);
  const bank   = document.getElementById('exp-f-bank')?.value || 'الأهلي';
  const desc   = document.getElementById('exp-f-desc')?.value;

  if (!date || !cat || !amount || amount <= 0) { showToast('يرجى تعبئة الحقول المطلوبة', 'warning'); return; }

  const { data, error } = await db.from('expenses').insert({
    date, category: cat, amount, bank_account: bank, description: desc, approved_by: 'المدير'
  }).select();

  if (error) { showToast('خطأ في الحفظ', 'error'); return; }
  ACC.expenses.unshift(data[0]);
  closeGenericModal();
  showToast('تم إضافة المصروف ✅', 'success');
  renderExpensesTable();
}

async function deleteExpense(id) {
  if (!confirm('هل تريد حذف هذا المصروف؟')) return;
  const { error } = await db.from('expenses').delete().eq('id', id);
  if (error) { showToast('خطأ في الحذف', 'error'); return; }
  ACC.expenses = ACC.expenses.filter(e => e.id !== id);
  showToast('تم الحذف', 'warning');
  renderExpensesTable();
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5 — PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
function renderProjects() {
  const panel = document.getElementById('acc-panel-projects');
  if (!panel) return;

  const techOptions = (STATE.technicians||[]).map(t=>
    `<option value="${t.id}">${t.name}</option>`).join('');

  panel.innerHTML = `
  <div class="filter-bar" style="justify-content:space-between">
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <select class="form-select" id="proj-filter-status" onchange="renderProjectsList()" style="min-width:140px">
        <option value="">كل الحالات</option>
        <option value="جديد">🆕 جديد</option>
        <option value="قيد_التنفيذ">🔄 قيد التنفيذ</option>
        <option value="منتهي">✅ منتهي</option>
        <option value="ملغي">❌ ملغي</option>
      </select>
    </div>
    <button class="btn btn-primary" onclick="openProjectModal()">➕ مشروع جديد</button>
  </div>
  <div id="proj-list"></div>
  `;

  renderProjectsList();
}

function renderProjectsList() {
  const status = document.getElementById('proj-filter-status')?.value || '';
  const list   = document.getElementById('proj-list');
  if (!list) return;

  let items = ACC.projects;
  if (status) items = items.filter(p => p.status === status);

  if (!items.length) {
    list.innerHTML = `<div class="empty-state"><div class="icon">🏗️</div><h3>لا توجد مشاريع</h3></div>`;
    return;
  }

  list.innerHTML = items.map(proj => {
    const payments = ACC.projectPayments.filter(pp => pp.project_id === proj.id);
    const paid     = payments.filter(pp => pp.status === 'مدفوعة').reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
    const pct      = proj.total_amount > 0 ? (paid / proj.total_amount * 100).toFixed(0) : 0;
    const tech     = STATE.technicians?.find(t => t.id == proj.technician_id);
    const hasLate  = payments.some(pp => {
      if (pp.status === 'مدفوعة') return false;
      return pp.due_date && pp.due_date < new Date().toISOString().split('T')[0];
    });
    const sColor   = { 'جديد':'#3b82f6','قيد_التنفيذ':'#F39237','منتهي':'#10B981','ملغي':'#ef4444' };
    const tColor   = { 'صيانة_طارئة':'🔧','إنشاء':'🏗️','تركيب':'⚙️','ترقية':'⬆️' };

    return `
    <div class="acc-proj-card" style="border-right:4px solid ${sColor[proj.status]||'#ccc'}">
      <div class="acc-proj-header">
        <div>
          <span style="font-weight:700;color:var(--navy);font-size:1rem">${proj.client_name}</span>
          ${proj.client_phone ? `<span style="color:var(--text-secondary);font-size:0.85rem;margin-right:8px">📞 ${proj.client_phone}</span>` : ''}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge" style="background:rgba(27,39,84,0.08);color:var(--navy)">${tColor[proj.project_type]||'📋'} ${proj.project_type}</span>
          <span class="badge" style="background:${sColor[proj.status]}22;color:${sColor[proj.status]}">${proj.status}</span>
          ${hasLate ? `<span class="badge" style="background:rgba(239,68,68,0.15);color:var(--danger)">⚠️ متأخرة</span>` : ''}
        </div>
      </div>
      <div class="acc-proj-ref">${proj.reference_number||''}</div>
      ${proj.description ? `<div style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px">${proj.description}</div>` : ''}

      <!-- Progress bar -->
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:4px">
          <span>المحصّل: <strong style="color:var(--success);direction:ltr">${formatCurrency(paid)}</strong></span>
          <span>الإجمالي: <strong style="direction:ltr">${formatCurrency(proj.total_amount)}</strong></span>
          <span style="font-weight:700;color:${pct>=100?'var(--success)':'var(--navy)'}">${pct}%</span>
        </div>
        <div class="mini-progress"><div class="mini-progress-fill ${pct>=100?'green':pct>50?'orange':'red'}" style="width:${pct}%"></div></div>
      </div>

      <!-- Payments phases -->
      <div class="acc-proj-phases">
        ${payments.map(pp => {
          const isLate = pp.status !== 'مدفوعة' && pp.due_date && pp.due_date < new Date().toISOString().split('T')[0];
          return `<div class="acc-phase ${pp.status==='مدفوعة'?'paid':isLate?'late':'pending'}">
            <span>${pp.phase_name || 'دفعة'}</span>
            <span dir="ltr" style="font-weight:600">${formatCurrency(pp.amount)}</span>
            <span style="font-size:0.75rem">${pp.due_date||'—'}</span>
            <span>${pp.status==='مدفوعة'?'✅':isLate?'🔴':'⏳'}</span>
            ${pp.status!=='مدفوعة'?`<button class="btn btn-success btn-sm" onclick="markPhasePaid(${pp.id},${proj.id})">تسجيل دفعة</button>`:''}
          </div>`;
        }).join('')}
      </div>

      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-outline btn-sm" onclick="editProjectStatus(${proj.id})">🔄 تحديث الحالة</button>
        ${tech ? `<span style="font-size:0.82rem;color:var(--text-secondary);align-self:center">👷 ${tech.name}</span>` : ''}
        <button class="btn btn-outline btn-sm" onclick="sendProjectWhatsapp(${proj.id})">📤 واتساب</button>
      </div>
    </div>`;
  }).join('');
}

function openProjectModal() {
  const techOptions = (STATE.technicians||[]).map(t=>
    `<option value="${t.id}">${t.name}</option>`).join('');
  const bankOpts = ACC.bankAccounts.map(b=>
    `<option value="${b.bank_name}">${b.bank_name}</option>`).join('')||'<option value="الأهلي">الأهلي</option>';

  const html = `
  <div class="form-row">
    <div class="form-group"><label class="form-label">اسم العميل *</label>
      <input type="text" class="form-input" id="proj-f-name"></div>
    <div class="form-group"><label class="form-label">رقم الجوال</label>
      <input type="tel" class="form-input" id="proj-f-phone" dir="ltr"></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label class="form-label">نوع المشروع *</label>
      <select class="form-select" id="proj-f-type">
        <option value="صيانة_طارئة">🔧 صيانة طارئة</option>
        <option value="إنشاء">🏗️ إنشاء</option>
        <option value="تركيب">⚙️ تركيب</option>
        <option value="ترقية">⬆️ ترقية</option>
      </select></div>
    <div class="form-group"><label class="form-label">المبلغ الإجمالي *</label>
      <input type="number" class="form-input" id="proj-f-total" dir="ltr" placeholder="0.00"></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label class="form-label">طريقة الدفع</label>
      <select class="form-select" id="proj-f-method" onchange="togglePhasesUI()">
        <option value="مرحلي">مرحلي</option>
        <option value="دفعة_وحدة">دفعة واحدة</option>
      </select></div>
    <div class="form-group"><label class="form-label">الفني المنفذ</label>
      <select class="form-select" id="proj-f-tech"><option value="">— اختر —</option>${techOptions}</select></div>
  </div>
  <div class="form-row">
    <div class="form-group"><label class="form-label">تاريخ البداية</label>
      <input type="date" class="form-input" id="proj-f-start" dir="ltr"></div>
    <div class="form-group"><label class="form-label">تاريخ النهاية المتوقعة</label>
      <input type="date" class="form-input" id="proj-f-end" dir="ltr"></div>
  </div>
  <div class="form-group"><label class="form-label">الوصف التفصيلي</label>
    <textarea class="form-textarea" id="proj-f-desc" rows="2"></textarea></div>
  <div id="proj-phases-ui" style="margin-top:12px">
    <div style="font-weight:600;margin-bottom:8px;color:var(--navy)">📋 المراحل (مرحلي)</div>
    <div id="proj-phases-list">
      <div class="acc-phase-input">
        <input type="text" class="form-input" placeholder="اسم المرحلة (مثال: دفعة أولى)" style="flex:2">
        <input type="number" class="form-input" placeholder="%" dir="ltr" style="flex:0.7">
        <input type="date" class="form-input" dir="ltr" style="flex:1.2">
      </div>
    </div>
    <button type="button" class="btn btn-outline btn-sm" style="margin-top:8px" onclick="addPhaseRow()">+ إضافة مرحلة</button>
  </div>`;

  openGenericModal('🏗️ مشروع جديد', html, 'saveProject()');
  setTimeout(() => togglePhasesUI(), 100);
}

function togglePhasesUI() {
  const method = document.getElementById('proj-f-method')?.value;
  const ui = document.getElementById('proj-phases-ui');
  if (ui) ui.style.display = method === 'مرحلي' ? 'block' : 'none';
}

function addPhaseRow() {
  const list = document.getElementById('proj-phases-list');
  if (!list) return;
  const div = document.createElement('div');
  div.className = 'acc-phase-input';
  div.innerHTML = `
    <input type="text" class="form-input" placeholder="اسم المرحلة" style="flex:2">
    <input type="number" class="form-input" placeholder="%" dir="ltr" style="flex:0.7">
    <input type="date" class="form-input" dir="ltr" style="flex:1.2">
    <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
}

async function saveProject() {
  const name   = document.getElementById('proj-f-name')?.value?.trim();
  const phone  = document.getElementById('proj-f-phone')?.value?.trim();
  const type   = document.getElementById('proj-f-type')?.value;
  const total  = parseFloat(document.getElementById('proj-f-total')?.value);
  const method = document.getElementById('proj-f-method')?.value;
  const techId = document.getElementById('proj-f-tech')?.value || null;
  const start  = document.getElementById('proj-f-start')?.value || null;
  const end    = document.getElementById('proj-f-end')?.value || null;
  const desc   = document.getElementById('proj-f-desc')?.value;

  if (!name || !type || !total || total <= 0) { showToast('يرجى تعبئة الحقول المطلوبة', 'warning'); return; }

  const ref = genRef('PROJ');
  const { data: pd, error: pe } = await db.from('sales_projects').insert({
    reference_number: ref, client_name: name, client_phone: phone, project_type: type,
    description: desc, total_amount: total, payment_method: method,
    technician_id: techId||null, start_date: start, end_date: end, status: 'جديد'
  }).select();

  if (pe) { showToast('خطأ في الحفظ', 'error'); return; }
  const proj = pd[0];
  ACC.projects.unshift(proj);

  // Save phases
  if (method === 'مرحلي') {
    const rows = document.querySelectorAll('#proj-phases-list .acc-phase-input');
    for (const row of rows) {
      const inputs = row.querySelectorAll('input');
      const pName  = inputs[0]?.value?.trim();
      const pct    = parseFloat(inputs[1]?.value) || 0;
      const due    = inputs[2]?.value || null;
      const amt    = pct > 0 ? (total * pct / 100) : 0;
      if (!pName) continue;
      const { data: ppd } = await db.from('project_payments').insert({
        project_id: proj.id, reference_number: genRef('PPAY'),
        phase_name: pName, amount: amt, percentage: pct,
        due_date: due, status: 'مستحقة'
      }).select();
      if (ppd) ACC.projectPayments.push(ppd[0]);
    }
  } else {
    const { data: ppd } = await db.from('project_payments').insert({
      project_id: proj.id, reference_number: genRef('PPAY'),
      phase_name: 'دفعة كاملة', amount: total, percentage: 100, status: 'مستحقة'
    }).select();
    if (ppd) ACC.projectPayments.push(ppd[0]);
  }

  closeGenericModal();
  showToast('تم إنشاء المشروع ✅', 'success');
  renderProjectsList();
}

async function markPhasePaid(ppId, projId) {
  const today = new Date().toISOString().split('T')[0];
  const { error } = await db.from('project_payments').update({
    status: 'مدفوعة', paid_date: today
  }).eq('id', ppId);
  if (error) { showToast('خطأ', 'error'); return; }
  const pp = ACC.projectPayments.find(p => p.id === ppId);
  if (pp) { pp.status = 'مدفوعة'; pp.paid_date = today; }
  showToast('تم تسجيل الدفعة ✅', 'success');
  renderProjectsList();
}

async function editProjectStatus(id) {
  const proj = ACC.projects.find(p => p.id === id);
  if (!proj) return;
  const newStatus = prompt(
    `الحالة الحالية: ${proj.status}\nاكتب الحالة الجديدة:\nجديد | قيد_التنفيذ | منتهي | ملغي`,
    proj.status);
  if (!newStatus) return;
  await db.from('sales_projects').update({ status: newStatus }).eq('id', id);
  proj.status = newStatus;
  showToast('تم تحديث الحالة ✅', 'success');
  renderProjectsList();
}

function sendProjectWhatsapp(id) {
  const proj = ACC.projects.find(p => p.id === id);
  if (!proj || !proj.client_phone) { showToast('لا يوجد رقم جوال للعميل', 'warning'); return; }
  const payments = ACC.projectPayments.filter(pp => pp.project_id === id && pp.status !== 'مدفوعة');
  const msg = `مرحباً ${proj.client_name}،\nبخصوص مشروع ${proj.project_type}:\n` +
    payments.map(p => `• ${p.phase_name}: ${formatCurrency(p.amount)} (${p.due_date||'—'})`).join('\n') +
    '\nنرجو التواصل لترتيب السداد.\nمؤسسة التنظيف الماسي';
  const phone = proj.client_phone.replace(/\D/g, '');
  window.open(`https://wa.me/966${phone.replace(/^0/,'')}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6 — BANK ACCOUNTS
// ─────────────────────────────────────────────────────────────────────────────
function renderBanks() {
  const panel = document.getElementById('acc-panel-banks');
  if (!panel) return;

  const mk = currentMonthKey();

  // Income per bank from payments
  function bankIncome(bankName) {
    return (STATE.payments||[]).filter(p=>p.bank_account===bankName&&p.payment_date?.startsWith(mk))
      .reduce((s,p)=>s+(parseFloat(p.amount)||0),0);
  }
  function bankExpenses(bankName) {
    return ACC.expenses.filter(e=>e.bank_account===bankName&&e.date?.startsWith(mk))
      .reduce((s,e)=>s+(parseFloat(e.amount)||0),0);
  }

  panel.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h2 style="color:var(--navy)">🏦 الحسابات البنكية</h2>
    <button class="btn btn-primary" onclick="openBankModal()">➕ إضافة حساب</button>
  </div>
  <div class="acc-banks-grid">
    ${ACC.bankAccounts.filter(b=>b.active).map(b => `
    <div class="acc-bank-card">
      <div class="acc-bank-top">
        <div class="acc-bank-icon">🏦</div>
        <div>
          <div class="acc-bank-name">${b.bank_name}</div>
          <div class="acc-bank-iban">IBAN: ****${(b.iban||'').slice(-4)}</div>
        </div>
        ${b.is_primary ? `<span class="badge" style="background:rgba(16,185,129,0.12);color:var(--success);margin-right:auto">أساسي</span>` : ''}
      </div>
      <div class="acc-bank-balance">
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px">الرصيد الحالي</div>
        <div style="font-size:1.6rem;font-weight:800;color:var(--navy);direction:ltr">${formatCurrency(b.balance)}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
        <div style="background:rgba(16,185,129,0.08);padding:10px;border-radius:8px;text-align:center">
          <div style="font-size:0.75rem;color:var(--text-secondary)">دخل ${monthLabel(mk)}</div>
          <div style="font-weight:700;color:var(--success);direction:ltr;font-size:0.9rem">${formatCurrency(bankIncome(b.bank_name))}</div>
        </div>
        <div style="background:rgba(239,68,68,0.08);padding:10px;border-radius:8px;text-align:center">
          <div style="font-size:0.75rem;color:var(--text-secondary)">مصروف ${monthLabel(mk)}</div>
          <div style="font-weight:700;color:var(--danger);direction:ltr;font-size:0.9rem">${formatCurrency(bankExpenses(b.bank_name))}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" style="width:100%;margin-top:12px" onclick="updateBankBalance(${b.id})">
        ✏️ تحديث الرصيد
      </button>
    </div>`).join('')}
  </div>`;
}

function openBankModal() {
  const html = `
  <div class="form-group"><label class="form-label">اسم البنك *</label>
    <input type="text" class="form-input" id="bank-f-name" placeholder="مثال: البنك الراجحي"></div>
  <div class="form-group"><label class="form-label">اسم الحساب</label>
    <input type="text" class="form-input" id="bank-f-acct" placeholder="مؤسسة التنظيف الماسي"></div>
  <div class="form-group"><label class="form-label">رقم IBAN</label>
    <input type="text" class="form-input" id="bank-f-iban" dir="ltr" placeholder="SA..."></div>
  <div class="form-group"><label class="form-label">الرصيد الابتدائي</label>
    <input type="number" class="form-input" id="bank-f-balance" dir="ltr" value="0"></div>`;

  openGenericModal('🏦 إضافة حساب بنكي', html, 'saveBank()');
}

async function saveBank() {
  const name    = document.getElementById('bank-f-name')?.value?.trim();
  const account = document.getElementById('bank-f-acct')?.value?.trim();
  const iban    = document.getElementById('bank-f-iban')?.value?.trim();
  const balance = parseFloat(document.getElementById('bank-f-balance')?.value) || 0;
  if (!name) { showToast('يرجى إدخال اسم البنك', 'warning'); return; }

  const { data, error } = await db.from('bank_accounts').insert({
    bank_name: name, account_name: account, iban: iban||null, balance, active: true
  }).select();
  if (error) { showToast('خطأ في الحفظ', 'error'); return; }
  ACC.bankAccounts.push(data[0]);
  closeGenericModal();
  showToast('تم إضافة الحساب ✅', 'success');
  renderBanks();
}

async function updateBankBalance(id) {
  const bank = ACC.bankAccounts.find(b => b.id === id);
  if (!bank) return;
  const val = prompt(`الرصيد الحالي لـ ${bank.bank_name}:\nأدخل الرصيد الجديد:`, bank.balance);
  if (val === null) return;
  const balance = parseFloat(val);
  if (isNaN(balance)) { showToast('رقم غير صحيح', 'error'); return; }
  await db.from('bank_accounts').update({ balance }).eq('id', id);
  bank.balance = balance;
  showToast('تم تحديث الرصيد ✅', 'success');
  renderBanks();
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC MODAL
// ─────────────────────────────────────────────────────────────────────────────
function openGenericModal(title, bodyHTML, saveFn, readOnly = false) {
  let modal = document.getElementById('acc-generic-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'acc-generic-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeGenericModal(); });
  }
  modal.innerHTML = `
  <div class="modal modal-lg">
    <div class="modal-header">
      <h3 class="modal-title">${title}</h3>
      <button class="modal-close" onclick="closeGenericModal()">✕</button>
    </div>
    <div class="modal-body">${bodyHTML}</div>
    ${!readOnly && saveFn ? `
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="${saveFn}">💾 حفظ</button>
      <button class="btn btn-outline" onclick="closeGenericModal()">إلغاء</button>
    </div>` : `<div class="modal-footer"><button class="btn btn-outline" onclick="closeGenericModal()">إغلاق</button></div>`}
  </div>`;
  modal.classList.add('show');
}

function closeGenericModal() {
  const modal = document.getElementById('acc-generic-modal');
  if (modal) modal.classList.remove('show');
}
