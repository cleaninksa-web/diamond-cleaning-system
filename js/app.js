/**
 * Diamond Cleaning - Main Application (Router + Sidebar + Toast)
 */

// ===== ROUTER =====
const routes = {
  dashboard:    { title: 'لوحة التحكم', icon: '📊' },
  customers:    { title: 'العملاء', icon: '👥' },
  technicians:  { title: 'الفنيون', icon: '🔧' },
  payments:     { title: 'التحصيلات', icon: '💰' },
  contracts:    { title: 'العقود', icon: '📝' },
  visits:       { title: 'الزيارات', icon: '📅' },
  accounting:   { title: 'المحاسبة', icon: '🏦' },
  documents:    { title: 'المستندات', icon: '📄' },
  reports:      { title: 'التقارير', icon: '📈' },
  'data-quality': { title: 'جودة البيانات', icon: '✅' },
  notifications:{ title: 'التنبيهات', icon: '🔔' },
  settings:     { title: 'الإعدادات', icon: '⚙️' },
};

let currentRoute = 'dashboard';

function navigate(route) {
  if (!routes[route]) route = 'dashboard';
  currentRoute = route;
  window.location.hash = route;

  // Update sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById('section-' + route);
  if (section) section.classList.add('active');

  // Update sidebar
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.route === route);
  });

  // Update title
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = routes[route].title;

  // Close mobile sidebar
  closeSidebar();

  // Trigger page load
  if (typeof window['load_' + route.replace('-', '_')] === 'function') {
    window['load_' + route.replace('-', '_')]();
  }
}

function initRouter() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'dashboard';
    navigate(hash);
  });

  const initial = window.location.hash.substring(1) || 'dashboard';
  navigate(initial);
}

// ===== SIDEBAR =====
function toggleSidebar() {
  const sidebar  = document.getElementById('main-sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');

  if (window.innerWidth <= 768) {
    // Mobile: slide in/out
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('show');
  } else {
    // Desktop: collapse/expand
    document.body.classList.toggle('sidebar-collapsed');
  }
}

function closeSidebar() {
  const sidebar  = document.getElementById('main-sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

// ===== THEME =====
function toggleTheme(isLight) {
  const body = document.body;
  if (isLight) {
    body.classList.add('light');
  } else {
    body.classList.remove('light');
  }
  // حفظ في STATE بدون localStorage
  if (window.STATE) window.STATE.lightMode = isLight;
}

// ===== TOAST =====
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '\u2705', error: '\u274C', warning: '\u26A0\uFE0F', info: '\u2139\uFE0F' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== MODAL =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  // Init splash immediately
  if (typeof initSplash === 'function') initSplash();

  // Setup sidebar navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.dataset.route;
      if (route) navigate(route);
    });
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleSidebar);

  // Overlay
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.remove('show');
    });
  });

  // Global search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      const q = e.target.value.trim();
      if (q.length >= 2) globalSearch(q);
    }, 400));
  }

  // ===== تحميل البيانات من Supabase =====
  if (typeof loadDataFromSupabase === 'function') {
    await loadDataFromSupabase();
  }

  // Init router (بعد تحميل البيانات)
  initRouter();

  // Init notifications
  if (typeof initNotifications === 'function') initNotifications();

  // Populate notif tech filter
  const ntf = document.getElementById('notif-filter-tech');
  if (ntf && STATE?.technicians?.length) {
    STATE.technicians.forEach(t => {
      if (!ntf.querySelector(`option[value="${t.id}"]`))
        ntf.add(new Option(t.name, t.id));
    });
  }

  // فحص الاتصال كل 30 ثانية
  if (typeof checkConnection === 'function') {
    setInterval(checkConnection, 30000);
  }
});

function globalSearch(query) {
  navigate('customers');
  const searchField = document.getElementById('customer-search');
  if (searchField) {
    searchField.value = query;
    searchField.dispatchEvent(new Event('input'));
  }
}

// Alias for use in notifications
function navigateTo(route) { navigate(route); }

// Update nav badge
function updateNavBadge(count) {
  const b = document.getElementById('nav-notif-badge');
  if (!b) return;
  b.textContent = count > 9 ? '9+' : count;
  b.style.display = count > 0 ? 'inline-flex' : 'none';
}
