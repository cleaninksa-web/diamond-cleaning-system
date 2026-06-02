/**
 * Diamond Cleaning - Dashboard Page
 */

async function load_dashboard() {
  if (!window.STATE?.loaded) await loadDataFromSupabase();
  const customers = window.STATE.customers || [];
  const payments = window.STATE.payments || [];
  const contracts = window.STATE.contracts || [];
  const techs = window.STATE.technicians || [];

  const active = customers.filter(c => c.status === 'يعمل').length;
  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);
  const activeContracts = contracts.filter(c => c.status === 'نشط').length;

  // Update KPIs
  animateValue('kpi-revenue', 0, totalRevenue, 1000);
  animateValue('kpi-active', 0, active, 800);
  animateValue('kpi-contracts', 0, activeContracts, 800);

  // Technician cards
  const techGrid = document.getElementById('dashboard-techs');
  if (techGrid) {
    techGrid.innerHTML = techs.map(t => {
      const custCount = customers.filter(c => c.technician_id == t.id && c.status === 'يعمل').length;
      const totalCust = customers.filter(c => c.technician_id == t.id).length;
      const revenue = customers.filter(c => c.technician_id == t.id && c.status === 'يعمل')
        .reduce((s, c) => {
          let fee = parseFloat(c.monthly_fee) || parseFloat(c.monthly_subscription) || 0;
          if (fee > 0) return s + fee;
          let contractAmt = parseFloat(c.contract_amount) || 0;
          let period = parseInt(c.period_months) || 12;
          return s + (period > 0 ? contractAmt / period : 0);
        }, 0);
      return `
        <div class="tech-card">
          <div class="tech-name">🔧 ${t.name}</div>
          <div class="tech-stat"><span>عملاء نشطين</span><strong>${custCount}</strong></div>
          <div class="tech-stat"><span>إجمالي العملاء</span><strong>${totalCust}</strong></div>
          <div class="tech-stat"><span>الإيراد الشهري</span><strong>${formatCurrency(revenue)}</strong></div>
          <div class="tech-stat"><span>الهاتف</span><strong style="direction:ltr">${t.phone ? formatPhone(t.phone) : '-'}</strong></div>
        </div>`;
    }).join('');
  }

  // Revenue chart
  renderRevenueChart(payments);
  // Technician distribution chart
  renderTechChart(customers, techs);
}

function animateValue(id, start, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const range = end - start;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatNumber(Math.floor(start + range * eased));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function renderRevenueChart(payments) {
  const canvas = document.getElementById('chart-revenue');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Group by month
  const monthly = {};
  payments.forEach(p => {
    const key = p.payment_date.substring(0, 7);
    monthly[key] = (monthly[key] || 0) + p.amount;
  });
  const labels = Object.keys(monthly).sort();
  const data = labels.map(k => monthly[k]);
  const monthNames = ['', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  if (window._revenueChart) window._revenueChart.destroy();
  window._revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(l => {
        const [y, m] = l.split('-');
        return monthNames[parseInt(m)] + ' ' + y;
      }),
      datasets: [{
        label: 'التحصيلات (ر.س)',
        data: data,
        backgroundColor: 'rgba(157, 212, 224, 0.6)',
        borderColor: '#9DD4E0',
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => formatNumber(v) } },
        x: { ticks: { font: { family: 'Tajawal' } } }
      }
    }
  });
}

function renderTechChart(customers, techs) {
  const canvas = document.getElementById('chart-technicians');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const activeCustomers = customers.filter(c => c.status === 'يعمل');
  const data = techs.map(t => activeCustomers.filter(c => c.technician_id === t.id).length);

  if (window._techChart) window._techChart.destroy();
  window._techChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: techs.map(t => t.name),
      datasets: [{
        data: data,
        backgroundColor: ['#1B2754', '#9DD4E0', '#F39237', '#6bbdd0'],
        borderWidth: 3,
        borderColor: '#fff',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Tajawal', size: 13 }, padding: 16 } }
      }
    }
  });
}
