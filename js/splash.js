/**
 * Diamond Cleaning - Splash Screen
 */

function initSplash() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // هل يُعرض السبلاش؟
  const showSplash = localStorage.getItem('dc_show_splash') !== 'false';
  if (!showSplash) { splash.remove(); return; }

  // زر التخطي
  const skipBtn = splash.querySelector('.splash-skip');
  if (skipBtn) skipBtn.addEventListener('click', () => closeSplash());

  // أغلق تلقائياً عند انتهاء الفيديو
  const video = document.getElementById('splash-video');
  if (video) {
    video.addEventListener('ended', () => closeSplash());
    // حد أقصى 10 ثواني لو الفيديو ما اشتغل
    setTimeout(() => closeSplash(), 10000);
  } else {
    // fallback: 3 ثواني بدون فيديو
    setTimeout(() => closeSplash(), 3000);
  }
}

function closeSplash() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;
  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.remove();
    checkFirstVisit();
  }, 600);
}

function checkFirstVisit() {
  const visited = localStorage.getItem('dc_visited');
  if (!visited) {
    localStorage.setItem('dc_visited', 'true');
    showWelcomeModal();
  }
}

function showWelcomeModal() {
  const modal = document.getElementById('welcome-modal');
  if (!modal) return;

  // تحديث الأرقام من STATE الحقيقية
  const customers  = window.STATE?.customers || [];
  const payments   = window.STATE?.payments  || [];
  const technicians = window.STATE?.technicians || [];
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'يعمل').length;
  const totalRevenue = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);

  const wTotal   = document.getElementById('w-total');
  const wActive  = document.getElementById('w-active');
  const wTechs   = document.getElementById('w-techs');
  const wRevenue = document.getElementById('w-revenue');

  if (wTotal)   wTotal.textContent   = totalCustomers.toLocaleString('en-US');
  if (wActive)  wActive.textContent  = activeCustomers.toLocaleString('en-US');
  if (wTechs)   wTechs.textContent   = technicians.length;
  if (wRevenue) wRevenue.textContent = Math.round(totalRevenue).toLocaleString('en-US');

  modal.classList.add('show');
}

function closeWelcomeModal() {
  const modal = document.getElementById('welcome-modal');
  if (modal) {
    modal.classList.remove('show');
  }
}
