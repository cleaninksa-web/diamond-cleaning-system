/**
 * Diamond Cleaning - Notifications System (v1)
 * نظام التنبيهات الذكي للتحصيلات
 */

// ===== CONFIG =====
const NOTIF_CONFIG = {
  levels: {
    1: { days: -3,  label: 'تذكير ودي',      color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  icon: '🟢', urgency: 'info'    },
    2: { days:  0,  label: 'استحقاق اليوم',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: '🟡', urgency: 'warning' },
    3: { days:  7,  label: 'متأخر بسيط',     color: '#f97316', bg: 'rgba(249,115,22,0.1)',  icon: '🟠', urgency: 'medium'  },
    4: { days: 30,  label: 'متأخر متوسط',    color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   icon: '🔴', urgency: 'high'    },
    5: { days: 999, label: 'متأخر شديد',     color: '#7f1d1d', bg: 'rgba(127,29,29,0.1)',   icon: '⚫', urgency: 'critical'}
  },
  messages: {
    1: (n) => `السلام عليكم ${n.name}،\nتذكير ودي: مستحقات الصيانة لشهر ${n.month} (${n.amount} ر.س) تستحق بعد 3 أيام.\nنشكر تعاملكم معنا 🌟\nالتنظيف الماسي`,
    2: (n) => `السلام عليكم ${n.name}،\nتذكير: مستحقات الصيانة لشهر ${n.month} (${n.amount} ر.س) مستحقة اليوم.\nرقم الآيبان: SA7310000001400022356600\nشكراً لكم 🙏\nالتنظيف الماسي`,
    3: (n) => `السلام عليكم ${n.name}،\nنود تذكيركم بمستحقات بقيمة ${n.amount} ر.س متأخرة منذ ${n.days} يوم.\nنأمل سداد المبلغ في أقرب وقت.\nالآيبان: SA7310000001400022356600\nالتنظيف الماسي`,
    4: (n) => `السلام عليكم ${n.name}،\nنأسف لإزعاجكم، لكن لدينا مستحقات بقيمة ${n.amount} ر.س متأخرة منذ ${n.days} يوم.\nنرجو التواصل معنا لترتيب السداد على الرقم: 0555955690\nشكراً لتفهمكم.\nالتنظيف الماسي`,
    5: (n) => `السلام عليكم ${n.name}،\nلدينا مستحقات بقيمة ${n.amount} ر.س متأخرة منذ ${n.days} يوم.\nنرجو التواصل معنا بشكل عاجل على الرقم: 0555955690 لمناقشة الوضع.\nشاكرين لكم.\nالتنظيف الماسي`
  }
};

// In-memory store (يتم استبداله بـ Supabase لاحقاً)
let _notifications = [];
let _remindersLog = {};   // { custId: [{date, level, method, note}] }
let _dismissed = {};      // { notifId: timestamp }
let _snoozed = {};        // { notifId: untilTimestamp }
let _bannerHidden = false;
const MONTH_NAMES_AR = ['','يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

// ===== BUILD NOTIFICATIONS =====
function buildNotifications() {
  const now = new Date(); now.setHours(0,0,0,0);
  const curMonth = now.getMonth()+1, curYear = now.getFullYear();
  const endOfMonth = new Date(curYear, curMonth, 0);
  // استخدام بيانات STATE الحقيقية من Supabase
  const allPay = (window.STATE?.payments) || [];
  const customers = (window.STATE?.customers || []).filter(c => c.status === 'يعمل');

  _notifications = [];

  customers.forEach(c => {
    const monthPay = allPay.filter(p => p.customer_id===c.id && p.payment_month===curMonth && p.payment_year===curYear);
    if (monthPay.length > 0) return; // دفع - لا تنبيه

    const diffDays = Math.ceil((endOfMonth - now)/86400000);
    const overdueDays = -diffDays; // موجب = متأخر

    // تحديد المستوى
    let level;
    if (diffDays === 3 || diffDays === 2 || diffDays === 1) level = 1;      // قبل 3 أيام
    else if (diffDays === 0) level = 2;                                      // اليوم
    else if (overdueDays >= 1  && overdueDays <= 7)  level = 3;             // متأخر 1-7
    else if (overdueDays >= 8  && overdueDays <= 30) level = 4;             // متأخر 8-30
    else if (overdueDays > 30) level = 5;                                    // متأخر 30+
    else return; // لا تنبيه

    const notifId = `notif_${c.id}_${curMonth}_${curYear}`;
    if (_dismissed[notifId]) return;
    if (_snoozed[notifId] && _snoozed[notifId] > Date.now()) return;
    if (wasRemindedToday(c.id)) return; // ذكّرته اليوم - لا تنبيه مرة ثانية

    const lastPay = allPay.filter(p=>p.customer_id===c.id).sort((a,b)=>b.payment_date.localeCompare(a.payment_date))[0];

    _notifications.push({
      id: notifId,
      custId: c.id,
      name: c.name_ar,
      code: c.secret_code,
      phone: c.phone,
      techName: c.technician_name,
      techId: c.technician_id,
      amount: c.monthly_subscription,
      level,
      days: overdueDays > 0 ? overdueDays : null,
      daysUntil: diffDays > 0 ? diffDays : null,
      month: MONTH_NAMES_AR[curMonth],
      lastPayDate: lastPay?.payment_date || null,
      remindCount: (_remindersLog[c.id]||[]).length,
      lastReminderDate: (_remindersLog[c.id]||[]).slice(-1)[0]?.date || null,
      createdAt: Date.now()
    });
  });

  // رتّب: المستوى 5 أولاً
  _notifications.sort((a,b) => b.level - a.level || (b.days||0) - (a.days||0));
}

function wasRemindedToday(custId) {
  const log = _remindersLog[custId] || [];
  const today = new Date().toLocaleDateString('en-CA');
  return log.some(r => r.date === today);
}

// ===== NOTIFICATION TEXT =====
function getNotifText(n) {
  if (n.level === 1) return `${n.name} — دفعة بعد ${n.daysUntil} يوم — ${formatCurrency(n.amount)}`;
  if (n.level === 2) return `${n.name} — الاستحقاق اليوم — ${formatCurrency(n.amount)}`;
  return `${n.name} — متأخر ${n.days} يوم — ${formatCurrency(n.amount)}`;
}

// ===== BELL BADGE =====
function updateBellBadge() {
  buildNotifications();
  const badge = document.getElementById('notif-badge');
  const count = _notifications.length;
  if (badge) {
    badge.textContent = count > 9 ? '9+' : count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== BELL DROPDOWN =====
function toggleNotifDropdown() {
  const dd = document.getElementById('notif-dropdown');
  if (!dd) return;
  const isOpen = dd.classList.contains('show');
  document.querySelectorAll('.notif-dropdown').forEach(d => d.classList.remove('show'));
  if (!isOpen) { renderNotifDropdown(); dd.classList.add('show'); }
}

function renderNotifDropdown() {
  buildNotifications();
  const dd = document.getElementById('notif-dropdown');
  if (!dd) return;
  const top5 = _notifications.slice(0, 5);
  const cfg = NOTIF_CONFIG.levels;

  if (!top5.length) {
    dd.innerHTML = `<div class="notif-empty"><div style="font-size:2rem">🎉</div><div>لا يوجد تنبيهات جديدة</div></div>`;
    return;
  }

  dd.innerHTML = `
    <div class="notif-dd-header">
      <span>التنبيهات (${_notifications.length})</span>
      <button onclick="markAllDone()" class="notif-mark-all">تحديد الكل كمقروء</button>
    </div>
    <div class="notif-dd-list">
      ${top5.map(n => `
        <div class="notif-dd-item notif-level-${n.level}" data-id="${n.id}">
          <div class="notif-dd-icon" style="background:${cfg[n.level].bg};color:${cfg[n.level].color}">${cfg[n.level].icon}</div>
          <div class="notif-dd-body">
            <div class="notif-dd-text">${getNotifText(n)}</div>
            <div class="notif-dd-meta">
              <span class="notif-level-badge" style="background:${cfg[n.level].bg};color:${cfg[n.level].color}">${cfg[n.level].label}</span>
              <span>${n.lastReminderDate ? 'آخر تذكير: '+formatDateShort(n.lastReminderDate) : 'لم يتم التذكير'}</span>
            </div>
            <div class="notif-dd-actions">
              ${n.phone ? `<a href="${phoneLink(n.phone)}" class="notif-btn notif-btn-blue" title="اتصال">📞</a>` : ''}
              ${n.phone ? `<a href="${whatsappLink(n.phone, NOTIF_CONFIG.messages[n.level](n))}" target="_blank" class="notif-btn notif-btn-green" title="واتساب">💬</a>` : ''}
              <button onclick="logReminder(${n.custId},'whatsapp');dismissNotif('${n.id}')" class="notif-btn notif-btn-check" title="تم التذكير">✅</button>
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div class="notif-dd-footer">
      <button onclick="closeNotifDropdown();navigateTo('notifications')">عرض كل التنبيهات (${_notifications.length})</button>
    </div>`;
}

function closeNotifDropdown() {
  document.getElementById('notif-dropdown')?.classList.remove('show');
}

function markAllDone() {
  _notifications.forEach(n => { _dismissed[n.id] = Date.now(); });
  updateBellBadge();
  closeNotifDropdown();
  showToast('تم تحديد جميع التنبيهات كمقروءة ✅','success');
}

function dismissNotif(id) {
  _dismissed[id] = Date.now();
  updateBellBadge();
  renderNotifDropdown();
  if (document.getElementById('section-notifications')?.classList.contains('active')) load_notifications();
}

function snoozeNotif(id, hours=24) {
  _snoozed[id] = Date.now() + hours*3600000;
  dismissNotif(id);
  showToast(`تم التأجيل ${hours} ساعة ⏰`,'info');
}

// ===== LOG REMINDER =====
function logReminder(custId, method='whatsapp', note='') {
  if (!_remindersLog[custId]) _remindersLog[custId] = [];
  const n = _notifications.find(x=>x.custId===custId);
  _remindersLog[custId].push({ date: new Date().toLocaleDateString('en-CA'), level: n?.level||3, method, note, timestamp: Date.now() });
  showToast('تم تسجيل التذكير 📝','success');
}

// ===== BANNER =====
function renderDashboardBanner() {
  buildNotifications();
  const banner = document.getElementById('overdue-banner');
  if (!banner) return;
  const critical = _notifications.filter(n => n.level >= 3);
  if (!critical.length || _bannerHidden) { banner.style.display='none'; return; }
  const total = critical.reduce((s,n)=>s+n.amount,0);
  banner.style.display = 'flex';
  banner.innerHTML = `
    <div class="banner-icon">⚠️</div>
    <div class="banner-text">
      <strong>لديك ${critical.length} عملاء متأخرين</strong> بإجمالي ${formatCurrency(total)}
    </div>
    <div class="banner-actions">
      <button class="btn btn-sm" style="background:#fff;color:#b91c1c;border:none" onclick="navigateTo('notifications')">عرض القائمة</button>
      <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:#fff;border:1px solid rgba(255,255,255,0.4)" onclick="openBulkReminderFromNotifs()">📤 تذكير جماعي</button>
    </div>
    <button class="banner-close" onclick="hideBanner()">✕</button>`;
}

function hideBanner() {
  _bannerHidden = true;
  document.getElementById('overdue-banner').style.display='none';
  // Reset tomorrow
  setTimeout(()=>{ _bannerHidden=false; renderDashboardBanner(); }, 86400000);
}

// ===== FULL NOTIFICATIONS PAGE =====
function load_notifications() {
  buildNotifications();
  renderNotifPage();
}

let _notifFilterLevel = '';
let _notifFilterTech = '';
let _notifFilterStatus = 'active';

function renderNotifPage() {
  const container = document.getElementById('notif-page-content');
  if (!container) return;

  let list = [..._notifications];
  if (_notifFilterLevel) list = list.filter(n=>n.level===parseInt(_notifFilterLevel));
  if (_notifFilterTech) list = list.filter(n=>String(n.techId)===_notifFilterTech);

  const cfg = NOTIF_CONFIG.levels;

  container.innerHTML = list.length === 0
    ? `<div class="empty-state"><div class="icon">🎉</div><h3>لا يوجد تنبيهات</h3><p>كل العملاء في وضع ممتاز!</p></div>`
    : list.map(n => {
      const c = cfg[n.level];
      const log = _remindersLog[n.custId] || [];
      return `
      <div class="notif-card notif-card-l${n.level}">
        <div class="notif-card-header">
          <div class="notif-card-badge" style="background:${c.bg};color:${c.color}">${c.icon} ${c.label}</div>
          <div class="notif-card-name">${n.name} <span class="notif-card-code">${n.code}</span></div>
          <div class="notif-card-tech">👷 ${n.techName}</div>
        </div>
        <div class="notif-card-stats">
          <div class="notif-stat"><div class="ns-val" style="color:${c.color}">${n.days ? n.days+' يوم' : 'اليوم'}</div><div class="ns-lbl">${n.level<=2?'أيام متبقية':'أيام تأخير'}</div></div>
          <div class="notif-stat"><div class="ns-val">${formatCurrency(n.amount)}</div><div class="ns-lbl">المبلغ</div></div>
          <div class="notif-stat"><div class="ns-val">${n.lastPayDate ? formatDateShort(n.lastPayDate) : '—'}</div><div class="ns-lbl">آخر دفعة</div></div>
          <div class="notif-stat"><div class="ns-val">${log.length}</div><div class="ns-lbl">مرات التذكير</div></div>
          <div class="notif-stat"><div class="ns-val">${log.length ? formatDateShort(log[log.length-1].date) : '—'}</div><div class="ns-lbl">آخر تذكير</div></div>
        </div>
        <div class="notif-card-actions">
          ${n.phone ? `<a href="${phoneLink(n.phone)}" class="btn btn-sm btn-primary">📞 اتصال</a>` : ''}
          ${n.phone ? `<button class="btn btn-sm btn-success" onclick="sendNotifWhatsapp(${n.custId})">💬 واتساب</button>` : ''}
          <button class="btn btn-sm btn-orange" onclick="quickRegisterPayment(${n.custId})">💰 تسجيل دفعة</button>
          <button class="btn btn-sm" style="background:rgba(34,197,94,0.1);color:var(--success);border:1px solid var(--success)" onclick="markReminderDone(${n.custId},'${n.id}')">✅ تم التذكير</button>
          <button class="btn btn-sm btn-outline" onclick="viewCustomerPayments(${n.custId})">👁 السجل</button>
          <button class="btn btn-sm btn-outline" onclick="snoozeNotif('${n.id}',24)">⏰ تأجيل 24س</button>
        </div>
        ${log.length ? `<div class="notif-reminder-log"><strong>سجل التذكيرات:</strong> ${log.slice(-3).map(r=>`<span class="notif-log-item">${r.method==='whatsapp'?'💬':'📞'} ${formatDateShort(r.date)}</span>`).join('')}</div>` : ''}
      </div>`;
    }).join('');
}

function sendNotifWhatsapp(custId) {
  const n = _notifications.find(x=>x.custId===custId);
  if (!n || !n.phone) return;
  const msg = NOTIF_CONFIG.messages[n.level](n);
  window.open(whatsappLink(n.phone, msg), '_blank');
  logReminder(custId, 'whatsapp');
  showToast('تم فتح واتساب وتسجيل التذكير 💬','success');
}

function markReminderDone(custId, notifId) {
  logReminder(custId, 'marked');
  dismissNotif(notifId);
  renderNotifPage();
}

// Bulk from notifications
function openBulkReminderFromNotifs() {
  navigateTo('notifications');
  setTimeout(openNotifBulkReminder, 300);
}

function openNotifBulkReminder() {
  buildNotifications();
  const list = _notifications.filter(n=>n.level>=3 && n.phone);
  if (!list.length) { showToast('لا يوجد متأخرين لديهم أرقام','warning'); return; }
  const cfg = NOTIF_CONFIG.levels;

  let html = `
    <div class="form-group" style="margin-bottom:12px">
      <label class="form-label">فلترة المستوى</label>
      <select class="form-select" id="bulk-level-filter" onchange="filterBulkList()" style="width:auto">
        <option value="">كل المستويات</option>
        ${[3,4,5].map(l=>`<option value="${l}">${cfg[l].icon} ${cfg[l].label}</option>`).join('')}
      </select>
    </div>
    <div id="bulk-notif-count" style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px">تم اختيار ${list.length} عميل</div>
    <div style="max-height:320px;overflow-y:auto;margin-bottom:16px">
      <table style="width:100%">
        <thead><tr>
          <th><input type="checkbox" id="bulk-all-notif" checked onchange="toggleBulkNotifAll(this)"></th>
          <th>العميل</th><th>المستوى</th><th>التأخير</th><th>المبلغ</th>
        </tr></thead>
        <tbody id="bulk-notif-tbody">
          ${list.map(n=>`
            <tr>
              <td><input type="checkbox" class="bulk-notif-check" value="${n.custId}" data-level="${n.level}" checked></td>
              <td><strong>${n.name}</strong><br><small>${n.code}</small></td>
              <td><span style="background:${cfg[n.level].bg};color:${cfg[n.level].color};padding:2px 8px;border-radius:12px;font-size:0.75rem">${cfg[n.level].icon} ${cfg[n.level].label}</span></td>
              <td>${n.days ? n.days+' يوم' : 'اليوم'}</td>
              <td>${formatCurrency(n.amount)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:8px;justify-content:center">
      <button class="btn btn-success" onclick="sendBulkNotifReminders()">📤 إرسال واتساب للمختارين</button>
      <button class="btn btn-outline" onclick="closeModal('quick-modal')">إلغاء</button>
    </div>`;

  showQuickModal('📤 التذكير الجماعي للمتأخرين', html);
}

function toggleBulkNotifAll(el) { document.querySelectorAll('.bulk-notif-check').forEach(c=>c.checked=el.checked); }

function sendBulkNotifReminders() {
  const checks = document.querySelectorAll('.bulk-notif-check:checked');
  if (!checks.length) { showToast('اختر عميل واحد على الأقل','warning'); return; }
  let sent = 0;
  checks.forEach((cb, i) => {
    const custId = parseInt(cb.value);
    const n = _notifications.find(x=>x.custId===custId);
    if (!n || !n.phone) return;
    const msg = NOTIF_CONFIG.messages[n.level](n);
    setTimeout(()=>window.open(whatsappLink(n.phone, msg),'_blank'), i*800);
    logReminder(custId,'whatsapp');
    _dismissed[n.id] = Date.now();
    sent++;
  });
  showToast(`تم إرسال ${sent} رسالة واتساب 📤`,'success');
  closeModal('quick-modal');
  updateBellBadge();
  if (document.getElementById('section-notifications')?.classList.contains('active')) load_notifications();
}

// ===== SETTINGS NOTIFICATIONS =====
function renderNotifSettings() {
  const c = document.getElementById('notif-settings-content');
  if (!c) return;
  const cfg = NOTIF_CONFIG.levels;
  c.innerHTML = `
    <h4 style="color:var(--navy);margin-bottom:16px">⚙️ إعدادات التنبيهات</h4>
    <div class="settings-grid">
      ${Object.entries(cfg).map(([lvl,l])=>`
        <div class="setting-item">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="font-size:1.3rem">${l.icon}</span>
            <strong style="color:${l.color}">${l.label}</strong>
          </div>
          <div class="form-group" style="margin-bottom:8px">
            <label class="form-label" style="font-size:0.8rem">نص رسالة واتساب (قابل للتعديل)</label>
            <textarea class="form-textarea" id="msg-tpl-${lvl}" rows="4" style="font-size:0.8rem">${NOTIF_CONFIG.messages[lvl]({name:'اسم العميل', month:'الشهر', amount:'المبلغ', days:'X'})}</textarea>
          </div>
        </div>`).join('')}
    </div>
    <button class="btn btn-orange" onclick="saveNotifSettings()">💾 حفظ الإعدادات</button>`;
}

function saveNotifSettings() { showToast('تم حفظ إعدادات التنبيهات ✅','success'); }

// ===== INIT =====
function initNotifications() {
  buildNotifications();
  updateBellBadge();
  renderDashboardBanner();
  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.notif-bell-wrapper')) closeNotifDropdown();
  });
}
