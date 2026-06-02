/* =============================================================================
   نظام التحصيلات الشامل - مؤسسة التنظيف الماسي
   PAYMENTS COMPREHENSIVE MODULE
   ============================================================================
   كيفية الاستخدام:
   1. احفظ هذا الملف باسم payments-complete.js في مجلد js/
   2. أضف في نهاية index.html قبل </body>:
      <script src="js/payments-complete.js"></script>
   3. تأكد أن HTML يحتوي على عنصر <div id="payments-page">
   4. حدّث بيانات state.customers و state.payments من ملف pages.js الأصلي
   ============================================================================ */

(function() {
  'use strict';

  // ===========================================================================
  // CONFIGURATION & STATE
  // ===========================================================================
  
  const CONFIG = {
    company: {
      name: 'مؤسسة التنظيف الماسي',
      phone: '0555955690',
      iban: 'SA7310000001400022356600'
    },
    alertLevels: {
      reminder:  { days: -3, label: 'تذكير ودي', color: '#3B82F6', icon: '🟢', urgency: 1 },
      due:       { days: 0,  label: 'يستحق اليوم', color: '#F59E0B', icon: '🟡', urgency: 2 },
      late:      { days: 1,  label: 'متأخر', color: '#F39237', icon: '🟠', urgency: 3 },
      veryLate:  { days: 8,  label: 'متأخر شديد', color: '#EF4444', icon: '🔴', urgency: 4 },
      critical:  { days: 30, label: 'حرج', color: '#7F1D1D', icon: '⚫', urgency: 5 }
    },
    whatsappTemplates: {
      reminder: (name, amount, days) => 
        `السلام عليكم ${name}،\nتذكير ودي: مستحقات الصيانة بقيمة ${amount} ر.س تستحق بعد ${days} أيام.\nنشكر تعاملكم معنا 🌟\nالتنظيف الماسي`,
      due: (name, amount) => 
        `السلام عليكم ${name}،\nمستحقات الصيانة بقيمة ${amount} ر.س مستحقة اليوم.\nالآيبان: SA7310000001400022356600\nشكراً لكم 🙏\nالتنظيف الماسي`,
      late: (name, amount, days) => 
        `السلام عليكم ${name}،\nنود تذكيركم بمستحقات بقيمة ${amount} ر.س متأخرة منذ ${days} يوم.\nنأمل سداد المبلغ قريباً.\nالآيبان: SA7310000001400022356600\nالتنظيف الماسي`,
      veryLate: (name, amount, days) => 
        `السلام عليكم ${name}،\nنأسف للإزعاج، لدينا مستحقات بقيمة ${amount} ر.س متأخرة منذ ${days} يوم.\nنرجو التواصل: 0555955690\nالتنظيف الماسي`,
      critical: (name, amount, days) => 
        `السلام عليكم ${name}،\nمستحقات بقيمة ${amount} ر.س متأخرة ${days} يوم.\nنرجو التواصل بشكل عاجل: 0555955690\nالتنظيف الماسي`
    }
  };

  // Global state (assumes window.state exists from pages.js, otherwise creates)
  if (!window.state) window.state = {};
  if (!window.state.customers) window.state.customers = [];
  if (!window.state.payments) window.state.payments = [];
  
  const localState = {
    activeTab: 'overview',
    filters: {
      search: '',
      technician: 'all',
      month: 'current',
      level: 'all'
    },
    selectedForBulk: new Set(),
    expandedRows: new Set()
  };

  // ===========================================================================
  // HELPER FUNCTIONS
  // ===========================================================================

  function fmt(n) { 
    return Number(n || 0).toLocaleString('en-US'); 
  }

  function daysBetween(date1, date2) {
    const diff = new Date(date2) - new Date(date1);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  }

  function formatDate(date) {
    if (!date) return '—';
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }

  // Calculate financial status for a customer
  function calculateCustomerFinancials(customer) {
    const payments = (window.state.payments || []).filter(p => p.customer_id === customer.id);
    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    
    const contractTotal = Number(customer.contract_amount || customer.total_amount || 0);
    const periodMonths = Number(customer.period_months || 12);
    const monthlyFee = contractTotal / periodMonths;
    const remaining = contractTotal - totalPaid;
    const paidPercent = contractTotal > 0 ? Math.round((totalPaid / contractTotal) * 100) : 0;
    
    // Calculate next due date
    const lastPayment = payments.sort((a,b) => new Date(b.payment_date) - new Date(a.payment_date))[0];
    const startDate = customer.contract_start || customer.start_date || new Date();
    
    // Number of months that should have been paid by now
    const monthsSinceStart = Math.max(0, daysBetween(startDate, new Date()) / 30);
    const monthsExpectedPaid = Math.floor(monthsSinceStart);
    const monthsActuallyPaid = Math.floor(totalPaid / monthlyFee);
    
    // Next due is the (monthsActuallyPaid + 1)th payment
    const nextDueDate = addMonths(startDate, monthsActuallyPaid + 1);
    const daysToNext = daysBetween(new Date(), nextDueDate);
    
    // Status calculation
    let status, statusLevel;
    if (paidPercent >= 100) {
      status = 'completed';
      statusLevel = 0;
    } else if (daysToNext > 7) {
      status = 'onTrack';
      statusLevel = 0;
    } else if (daysToNext > 0) {
      status = 'reminder';
      statusLevel = 1;
    } else if (daysToNext === 0) {
      status = 'due';
      statusLevel = 2;
    } else if (daysToNext >= -7) {
      status = 'late';
      statusLevel = 3;
    } else if (daysToNext >= -30) {
      status = 'veryLate';
      statusLevel = 4;
    } else {
      status = 'critical';
      statusLevel = 5;
    }
    
    return {
      contractTotal,
      totalPaid,
      remaining,
      paidPercent,
      monthlyFee,
      periodMonths,
      monthsExpectedPaid,
      monthsActuallyPaid,
      nextDueDate,
      daysToNext,
      daysOverdue: Math.max(0, -daysToNext),
      status,
      statusLevel,
      lastPaymentDate: lastPayment?.payment_date,
      lastPaymentAmount: lastPayment?.amount,
      monthsRemaining: Math.max(0, periodMonths - monthsActuallyPaid),
      payments
    };
  }

  // Get status badge HTML
  function getStatusBadge(financials) {
    const badges = {
      completed: { text: 'مكتمل ✓', bg: '#D1FAE5', color: '#065F46' },
      onTrack:   { text: 'على الموعد', bg: '#DBEAFE', color: '#1E40AF' },
      reminder:  { text: `بعد ${financials.daysToNext} يوم`, bg: '#DBEAFE', color: '#1E40AF' },
      due:       { text: 'يستحق اليوم', bg: '#FEF3C7', color: '#92400E' },
      late:      { text: `متأخر ${financials.daysOverdue} يوم`, bg: '#FED7AA', color: '#9A3412' },
      veryLate:  { text: `متأخر ${financials.daysOverdue} يوم`, bg: '#FECACA', color: '#991B1B' },
      critical:  { text: `متأخر ${financials.daysOverdue} يوم 🚨`, bg: '#7F1D1D', color: '#FFFFFF' }
    };
    const b = badges[financials.status] || badges.onTrack;
    return `<span style="background:${b.bg};color:${b.color};padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;white-space:nowrap;">${b.text}</span>`;
  }

  // Get progress bar HTML
  function getProgressBar(percent) {
    let color = '#10B981'; // green
    if (percent < 40) color = '#EF4444'; // red
    else if (percent < 70) color = '#F59E0B'; // yellow
    
    return `
      <div style="background:#E5E7EB;height:6px;border-radius:3px;overflow:hidden;margin-top:4px;">
        <div style="background:${color};height:100%;width:${Math.min(percent,100)}%;transition:width 0.3s;"></div>
      </div>
      <div style="font-size:11px;color:#6B7280;margin-top:2px;text-align:center;">${percent}%</div>
    `;
  }

  // ===========================================================================
  // KPI CALCULATIONS
  // ===========================================================================

  function calculateKPIs() {
    const customers = window.state.customers || [];
    const allFinancials = customers.map(c => ({ customer: c, ...calculateCustomerFinancials(c) }));
    
    const totalContracts = allFinancials.reduce((sum, f) => sum + f.contractTotal, 0);
    const totalPaid = allFinancials.reduce((sum, f) => sum + f.totalPaid, 0);
    const totalRemaining = totalContracts - totalPaid;
    const collectionRate = totalContracts > 0 ? Math.round((totalPaid / totalContracts) * 100) : 0;
    
    const overdue = allFinancials.filter(f => f.statusLevel >= 3);
    const dueSoon = allFinancials.filter(f => f.statusLevel === 1 || f.statusLevel === 2);
    const completed = allFinancials.filter(f => f.status === 'completed');
    
    const totalOverdueAmount = overdue.reduce((sum, f) => sum + f.monthlyFee, 0);
    const avgDaysOverdue = overdue.length > 0 
      ? Math.round(overdue.reduce((sum, f) => sum + f.daysOverdue, 0) / overdue.length)
      : 0;
    
    const highestOverdue = overdue.sort((a,b) => b.monthlyFee - a.monthlyFee)[0];
    
    // Contracts ending in 60 days
    const endingSoon = customers.filter(c => {
      const endDate = addMonths(c.contract_start || new Date(), c.period_months || 12);
      const daysLeft = daysBetween(new Date(), endDate);
      return daysLeft > 0 && daysLeft <= 60;
    });
    
    return {
      totalContracts,
      totalPaid,
      totalRemaining,
      collectionRate,
      overdueCount: overdue.length,
      dueSoonCount: dueSoon.length,
      completedCount: completed.length,
      totalOverdueAmount,
      avgDaysOverdue,
      highestOverdue,
      endingSoonCount: endingSoon.length,
      totalCustomers: customers.length
    };
  }

  // ===========================================================================
  // RENDER FUNCTIONS
  // ===========================================================================

  function renderKPIs(kpis) {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:24px;">
        
        <div style="background:white;border-radius:12px;padding:16px;border-right:4px solid #1B2754;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <div style="font-size:13px;color:#6B7280;margin-bottom:8px;">إجمالي العقود</div>
          <div style="font-size:24px;font-weight:800;color:#1B2754;">${fmt(kpis.totalContracts)} <span style="font-size:13px;font-weight:500;">ر.س</span></div>
          <div style="font-size:11px;color:#6B7280;margin-top:4px;">${kpis.totalCustomers} عميل</div>
        </div>
        
        <div style="background:white;border-radius:12px;padding:16px;border-right:4px solid #10B981;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <div style="font-size:13px;color:#6B7280;margin-bottom:8px;">إجمالي المحصّل</div>
          <div style="font-size:24px;font-weight:800;color:#10B981;">${fmt(kpis.totalPaid)} <span style="font-size:13px;font-weight:500;">ر.س</span></div>
          <div style="font-size:11px;color:#6B7280;margin-top:4px;">نسبة التحصيل ${kpis.collectionRate}%</div>
        </div>
        
        <div style="background:white;border-radius:12px;padding:16px;border-right:4px solid #F39237;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <div style="font-size:13px;color:#6B7280;margin-bottom:8px;">المتبقي</div>
          <div style="font-size:24px;font-weight:800;color:#F39237;">${fmt(kpis.totalRemaining)} <span style="font-size:13px;font-weight:500;">ر.س</span></div>
          <div style="font-size:11px;color:#6B7280;margin-top:4px;">من إجمالي العقود</div>
        </div>
        
        <div style="background:white;border-radius:12px;padding:16px;border-right:4px solid #EF4444;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <div style="font-size:13px;color:#6B7280;margin-bottom:8px;">المتأخرين 🚨</div>
          <div style="font-size:24px;font-weight:800;color:#EF4444;">${kpis.overdueCount}</div>
          <div style="font-size:11px;color:#6B7280;margin-top:4px;">${fmt(kpis.totalOverdueAmount)} ر.س متأخرة</div>
        </div>
        
      </div>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:24px;">
        
        <div style="background:#F8FAFC;border-radius:10px;padding:14px;">
          <div style="font-size:12px;color:#6B7280;margin-bottom:6px;">📊 نسبة التحصيل</div>
          <div style="font-size:20px;font-weight:700;color:#1B2754;">${kpis.collectionRate}%</div>
        </div>
        
        <div style="background:#F8FAFC;border-radius:10px;padding:14px;">
          <div style="font-size:12px;color:#6B7280;margin-bottom:6px;">⏱️ متوسط أيام التأخير</div>
          <div style="font-size:20px;font-weight:700;color:#1B2754;">${kpis.avgDaysOverdue} يوم</div>
        </div>
        
        <div style="background:#F8FAFC;border-radius:10px;padding:14px;">
          <div style="font-size:12px;color:#6B7280;margin-bottom:6px;">👤 أعلى متأخر</div>
          <div style="font-size:14px;font-weight:600;color:#1B2754;">${kpis.highestOverdue?.customer?.name || '—'}</div>
          <div style="font-size:12px;color:#EF4444;">${fmt(kpis.highestOverdue?.monthlyFee || 0)} ر.س</div>
        </div>
        
        <div style="background:#FEF3C7;border-radius:10px;padding:14px;border:1px solid #F59E0B;">
          <div style="font-size:12px;color:#92400E;margin-bottom:6px;">⚠️ عقود تنتهي قريباً</div>
          <div style="font-size:20px;font-weight:700;color:#92400E;">${kpis.endingSoonCount}</div>
          <div style="font-size:11px;color:#92400E;">خلال 60 يوم</div>
        </div>
        
      </div>
    `;
  }

  function renderActionBar() {
    return `
      <div style="background:white;border-radius:12px;padding:16px;margin-bottom:20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
        
        <input type="text" id="payments-search" placeholder="🔍 ابحث بالاسم، الكود، أو الجوال..." 
          value="${localState.filters.search}"
          style="flex:1;min-width:200px;padding:10px 14px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:14px;">
        
        <select id="filter-technician" style="padding:10px 14px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:14px;background:white;">
          <option value="all">كل الفنيين</option>
          ${getUniqueTechnicians().map(t => `<option value="${t}" ${localState.filters.technician===t?'selected':''}>${t}</option>`).join('')}
        </select>
        
        <select id="filter-level" style="padding:10px 14px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:14px;background:white;">
          <option value="all">كل الحالات</option>
          <option value="overdue">🔴 المتأخرين</option>
          <option value="dueSoon">🟡 يستحق قريباً</option>
          <option value="completed">✅ مكتمل</option>
        </select>
        
        <button onclick="window.diamondPayments.openBulkReminder()" 
          style="padding:10px 16px;background:#F39237;color:white;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">
          📤 تذكير جماعي
        </button>
        
        <button onclick="window.diamondPayments.openPaymentModal()" 
          style="padding:10px 16px;background:#1B2754;color:white;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">
          + تسجيل دفعة
        </button>
        
        <button onclick="window.diamondPayments.exportData()" 
          style="padding:10px 16px;background:white;color:#1B2754;border:1px solid #1B2754;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">
          📥 تصدير
        </button>
        
      </div>
    `;
  }

  function getUniqueTechnicians() {
    const techs = new Set();
    (window.state.customers || []).forEach(c => {
      if (c.technician_name || c.technician) techs.add(c.technician_name || c.technician);
    });
    return Array.from(techs);
  }

  function renderCustomersTable() {
    const customers = filterCustomers();
    const rows = customers.map(c => {
      const fin = calculateCustomerFinancials(c);
      const tech = c.technician_name || c.technician || '—';
      const phone = c.phone || '';
      const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '966');
      const isOverdue = fin.statusLevel >= 3;
      
      return `
        <tr style="border-bottom:1px solid #F3F4F6;${isOverdue ? 'background:#FFF5F5;' : ''}">
          <td style="padding:14px;font-size:13px;font-weight:600;color:#1B2754;">${c.secret_code || c.code || `C-${String(c.id).padStart(4,'0')}`}</td>
          <td style="padding:14px;">
            <div style="font-weight:600;color:#1B2754;font-size:14px;">${c.name}</div>
            <div style="font-size:12px;color:#6B7280;direction:ltr;text-align:right;">${phone}</div>
          </td>
          <td style="padding:14px;font-size:13px;color:#374151;">${tech}</td>
          <td style="padding:14px;">
            <div style="font-weight:600;color:#1B2754;font-size:14px;">${fmt(fin.contractTotal)} <span style="font-size:11px;font-weight:400;">ر.س</span></div>
            <div style="font-size:11px;color:#6B7280;">${fin.periodMonths} شهر</div>
          </td>
          <td style="padding:14px;min-width:140px;">
            <div style="font-weight:600;color:#10B981;font-size:14px;">${fmt(fin.totalPaid)} <span style="font-size:11px;font-weight:400;color:#6B7280;">ر.س</span></div>
            ${getProgressBar(fin.paidPercent)}
          </td>
          <td style="padding:14px;">
            <div style="font-weight:700;color:${fin.remaining > 0 ? '#F39237' : '#10B981'};font-size:14px;">${fmt(fin.remaining)} <span style="font-size:11px;font-weight:400;">ر.س</span></div>
          </td>
          <td style="padding:14px;">
            <div style="font-weight:600;color:#1B2754;font-size:13px;">${fmt(Math.round(fin.monthlyFee))} ر.س</div>
            <div style="font-size:11px;color:#6B7280;">${formatDate(fin.nextDueDate)}</div>
          </td>
          <td style="padding:14px;">${getStatusBadge(fin)}</td>
          <td style="padding:14px;">
            <div style="display:flex;gap:4px;">
              <button onclick="window.diamondPayments.viewDetails(${c.id})" title="عرض التفاصيل" 
                style="width:32px;height:32px;background:white;border:1px solid #E5E7EB;border-radius:6px;cursor:pointer;font-size:14px;">👁</button>
              <button onclick="window.diamondPayments.openPaymentModal(${c.id})" title="تسجيل دفعة" 
                style="width:32px;height:32px;background:#F39237;border:none;border-radius:6px;cursor:pointer;font-size:14px;">💰</button>
              <button onclick="window.diamondPayments.sendWhatsApp(${c.id})" title="واتساب" 
                style="width:32px;height:32px;background:#10B981;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;">💬</button>
              <button onclick="window.open('tel:${phone}')" title="اتصال" 
                style="width:32px;height:32px;background:#1B2754;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;">📞</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
    
    return `
      <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:1100px;">
            <thead>
              <tr style="background:#F8FAFC;">
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">الكود</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">العميل</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">الفني</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">قيمة العقد</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">المدفوع</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">المتبقي</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">الاستحقاق القادم</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">الحالة</th>
                <th style="padding:14px;text-align:right;font-size:12px;font-weight:700;color:#6B7280;">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              ${rows || '<tr><td colspan="9" style="padding:40px;text-align:center;color:#9CA3AF;">لا توجد بيانات</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function filterCustomers() {
    const customers = window.state.customers || [];
    const f = localState.filters;
    
    return customers.filter(c => {
      // Search filter
      if (f.search) {
        const search = f.search.toLowerCase();
        const matchName = (c.name || '').toLowerCase().includes(search);
        const matchCode = (c.secret_code || c.code || '').toLowerCase().includes(search);
        const matchPhone = (c.phone || '').includes(search);
        if (!matchName && !matchCode && !matchPhone) return false;
      }
      
      // Technician filter
      if (f.technician !== 'all') {
        const tech = c.technician_name || c.technician;
        if (tech !== f.technician) return false;
      }
      
      // Level filter
      if (f.level !== 'all') {
        const fin = calculateCustomerFinancials(c);
        if (f.level === 'overdue' && fin.statusLevel < 3) return false;
        if (f.level === 'dueSoon' && fin.statusLevel !== 1 && fin.statusLevel !== 2) return false;
        if (f.level === 'completed' && fin.status !== 'completed') return false;
      }
      
      return true;
    }).sort((a, b) => {
      const finA = calculateCustomerFinancials(a);
      const finB = calculateCustomerFinancials(b);
      return finB.statusLevel - finA.statusLevel; // Overdue first
    });
  }

  // ===========================================================================
  // MAIN RENDER
  // ===========================================================================

  function render() {
    const container = document.getElementById('payments-page') || document.getElementById('page-payments');
    if (!container) {
      console.warn('Payments container not found');
      return;
    }
    
    const kpis = calculateKPIs();
    
    container.innerHTML = `
      <div style="padding:20px;">
        <div style="margin-bottom:20px;">
          <h1 style="font-size:24px;font-weight:800;color:#1B2754;margin:0 0 4px;">💰 التحصيلات</h1>
          <p style="font-size:14px;color:#6B7280;margin:0;">إدارة شاملة لكل التحصيلات والمتأخرات</p>
        </div>
        
        ${renderKPIs(kpis)}
        ${renderActionBar()}
        ${renderCustomersTable()}
      </div>
      
      <div id="payment-modal-container"></div>
      <div id="bulk-reminder-container"></div>
      <div id="details-modal-container"></div>
    `;
    
    attachEventListeners();
  }

  function attachEventListeners() {
    const search = document.getElementById('payments-search');
    if (search) {
      search.addEventListener('input', e => {
        localState.filters.search = e.target.value;
        render();
        document.getElementById('payments-search')?.focus();
      });
    }
    
    const tech = document.getElementById('filter-technician');
    if (tech) {
      tech.addEventListener('change', e => {
        localState.filters.technician = e.target.value;
        render();
      });
    }
    
    const level = document.getElementById('filter-level');
    if (level) {
      level.addEventListener('change', e => {
        localState.filters.level = e.target.value;
        render();
      });
    }
  }

  // ===========================================================================
  // ACTIONS (Modals & Interactions)
  // ===========================================================================

  function openPaymentModal(customerId) {
    const customer = customerId ? window.state.customers.find(c => c.id === customerId) : null;
    const fin = customer ? calculateCustomerFinancials(customer) : null;
    
    const html = `
      <div onclick="this.remove()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div onclick="event.stopPropagation()" style="background:white;border-radius:16px;max-width:500px;width:100%;max-height:90vh;overflow-y:auto;">
          <div style="background:#1B2754;color:white;padding:20px;border-radius:16px 16px 0 0;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">💰 تسجيل دفعة جديدة</h2>
            ${customer ? `<div style="font-size:13px;opacity:0.9;margin-top:4px;">${customer.name} - ${customer.phone || ''}</div>` : ''}
          </div>
          
          <div style="padding:20px;">
            ${customer ? `
              <div style="background:#F8FAFC;border-radius:10px;padding:14px;margin-bottom:16px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
                  <div><span style="color:#6B7280;">قيمة العقد:</span> <strong>${fmt(fin.contractTotal)} ر.س</strong></div>
                  <div><span style="color:#6B7280;">المدفوع:</span> <strong style="color:#10B981;">${fmt(fin.totalPaid)} ر.س</strong></div>
                  <div><span style="color:#6B7280;">المتبقي:</span> <strong style="color:#F39237;">${fmt(fin.remaining)} ر.س</strong></div>
                  <div><span style="color:#6B7280;">الشهري:</span> <strong>${fmt(Math.round(fin.monthlyFee))} ر.س</strong></div>
                </div>
              </div>
            ` : `
              <div style="margin-bottom:16px;">
                <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">العميل</label>
                <select id="pay-customer" style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;">
                  <option value="">اختر عميل...</option>
                  ${(window.state.customers || []).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>
            `}
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">نوع الدفعة</label>
              <div style="display:flex;gap:8px;">
                <label style="flex:1;display:flex;align-items:center;gap:8px;padding:10px;border:2px solid #1B2754;border-radius:8px;cursor:pointer;background:#EEF2FF;">
                  <input type="radio" name="paytype" value="full" checked onchange="document.getElementById('pay-amount').value='${fin?.monthlyFee ? Math.round(fin.monthlyFee) : ''}'">
                  <span style="font-size:13px;font-weight:600;">دفعة كاملة</span>
                </label>
                <label style="flex:1;display:flex;align-items:center;gap:8px;padding:10px;border:1px solid #E5E7EB;border-radius:8px;cursor:pointer;">
                  <input type="radio" name="paytype" value="partial">
                  <span style="font-size:13px;font-weight:600;">دفعة جزئية</span>
                </label>
              </div>
            </div>
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">المبلغ (ر.س)</label>
              <input type="number" id="pay-amount" value="${fin?.monthlyFee ? Math.round(fin.monthlyFee) : ''}" 
                style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:16px;font-weight:600;">
            </div>
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">تاريخ الدفع</label>
              <input type="date" id="pay-date" value="${new Date().toISOString().split('T')[0]}" 
                style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;">
            </div>
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">المستلم</label>
              <select id="pay-receiver" style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;">
                <option>حواله بنكية - الأهلي</option>
                <option>عبدالله</option>
                <option>حبيب</option>
                <option>رضوان</option>
                <option>عالم</option>
                <option>كاش</option>
              </select>
            </div>
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">اسم الدافع (اختياري)</label>
              <input type="text" id="pay-payer" placeholder="إذا اختلف عن العميل (مثال: ابنه)" 
                style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;">
            </div>
            
            <div style="margin-bottom:16px;">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#374151;">ملاحظات</label>
              <textarea id="pay-notes" rows="2" style="width:100%;padding:10px;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;resize:vertical;"></textarea>
            </div>
            
            <div style="display:flex;gap:10px;">
              <button onclick="window.diamondPayments.savePayment(${customerId || 'null'})" 
                style="flex:1;padding:12px;background:#1B2754;color:white;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;">
                ✅ حفظ الدفعة
              </button>
              <button onclick="this.closest('[onclick]').remove()" 
                style="padding:12px 20px;background:white;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:14px;cursor:pointer;">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    const container = document.getElementById('payment-modal-container');
    if (container) container.innerHTML = html;
  }

  function savePayment(customerId) {
    const id = customerId || Number(document.getElementById('pay-customer')?.value);
    const amount = Number(document.getElementById('pay-amount').value);
    const date = document.getElementById('pay-date').value;
    const receiver = document.getElementById('pay-receiver').value;
    const payer = document.getElementById('pay-payer').value;
    const notes = document.getElementById('pay-notes').value;
    
    if (!id || !amount) {
      alert('يرجى ملء العميل والمبلغ');
      return;
    }
    
    const payment = {
      id: Date.now(),
      customer_id: id,
      amount,
      payment_date: date,
      receiver,
      payer_name: payer,
      notes,
      reference_number: `PAY-${new Date().getFullYear()}-${String((window.state.payments || []).length + 1).padStart(4, '0')}`
    };
    
    if (!window.state.payments) window.state.payments = [];
    window.state.payments.push(payment);
    
    // Save to localStorage as backup
    try {
      localStorage.setItem('diamond_payments', JSON.stringify(window.state.payments));
    } catch(e) {}
    
    // Close modal
    document.querySelector('#payment-modal-container > div')?.remove();
    
    // Show success
    showToast('✅ تم تسجيل الدفعة بنجاح');
    
    // Re-render
    render();
  }

  function viewDetails(customerId) {
    const customer = window.state.customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const fin = calculateCustomerFinancials(customer);
    const phone = customer.phone || '';
    const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '966');
    
    const html = `
      <div onclick="this.remove()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div onclick="event.stopPropagation()" style="background:white;border-radius:16px;max-width:700px;width:100%;max-height:90vh;overflow-y:auto;">
          
          <div style="background:linear-gradient(135deg,#1B2754,#0F1A3E);color:white;padding:24px;border-radius:16px 16px 0 0;">
            <div style="display:flex;justify-content:space-between;align-items:start;gap:16px;">
              <div>
                <h2 style="margin:0;font-size:22px;font-weight:800;">${customer.name}</h2>
                <div style="font-size:13px;opacity:0.9;margin-top:4px;direction:ltr;text-align:right;">${phone}</div>
                <div style="margin-top:8px;">${getStatusBadge(fin)}</div>
              </div>
              <div style="display:flex;gap:6px;">
                <button onclick="window.open('tel:${phone}')" style="width:36px;height:36px;background:rgba(255,255,255,0.2);border:none;border-radius:8px;cursor:pointer;font-size:16px;">📞</button>
                <button onclick="window.diamondPayments.sendWhatsApp(${customer.id})" style="width:36px;height:36px;background:rgba(255,255,255,0.2);border:none;border-radius:8px;cursor:pointer;font-size:16px;">💬</button>
              </div>
            </div>
          </div>
          
          <div style="padding:20px;">
            
            <div style="background:#F8FAFC;border-radius:12px;padding:16px;margin-bottom:16px;">
              <div style="font-size:13px;color:#6B7280;margin-bottom:10px;font-weight:600;">📋 معلومات العقد</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
                <div><span style="color:#6B7280;">قيمة العقد:</span> <strong>${fmt(fin.contractTotal)} ر.س</strong></div>
                <div><span style="color:#6B7280;">المدة:</span> <strong>${fin.periodMonths} شهر</strong></div>
                <div><span style="color:#6B7280;">الاشتراك الشهري:</span> <strong>${fmt(Math.round(fin.monthlyFee))} ر.س</strong></div>
                <div><span style="color:#6B7280;">المتبقي بالعقد:</span> <strong>${fin.monthsRemaining} شهر</strong></div>
              </div>
            </div>
            
            <div style="background:#F0FDF4;border-radius:12px;padding:16px;margin-bottom:16px;border:1px solid #10B981;">
              <div style="font-size:13px;color:#065F46;margin-bottom:10px;font-weight:600;">💰 الملخص المالي</div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;">
                <div>
                  <div style="font-size:11px;color:#6B7280;">المدفوع</div>
                  <div style="font-size:18px;font-weight:800;color:#10B981;">${fmt(fin.totalPaid)}</div>
                </div>
                <div>
                  <div style="font-size:11px;color:#6B7280;">المتبقي</div>
                  <div style="font-size:18px;font-weight:800;color:#F39237;">${fmt(fin.remaining)}</div>
                </div>
                <div>
                  <div style="font-size:11px;color:#6B7280;">النسبة</div>
                  <div style="font-size:18px;font-weight:800;color:#1B2754;">${fin.paidPercent}%</div>
                </div>
              </div>
              ${getProgressBar(fin.paidPercent)}
            </div>
            
            <div style="background:${fin.statusLevel >= 3 ? '#FEF2F2' : '#FEF3C7'};border-radius:12px;padding:16px;margin-bottom:16px;">
              <div style="font-size:13px;color:#92400E;margin-bottom:8px;font-weight:600;">📅 الدفعة القادمة</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:20px;font-weight:800;color:#1B2754;">${fmt(Math.round(fin.monthlyFee))} ر.س</div>
                  <div style="font-size:12px;color:#6B7280;">${formatDate(fin.nextDueDate)}</div>
                </div>
                <div style="text-align:left;">
                  ${getStatusBadge(fin)}
                </div>
              </div>
              <button onclick="document.querySelector('#details-modal-container > div').remove(); window.diamondPayments.openPaymentModal(${customer.id});" 
                style="margin-top:12px;width:100%;padding:10px;background:#F39237;color:white;border:none;border-radius:8px;font-family:inherit;font-weight:700;cursor:pointer;">
                💰 تسجيل دفعة الآن
              </button>
            </div>
            
            <div>
              <div style="font-size:13px;color:#6B7280;margin-bottom:10px;font-weight:600;">📜 سجل الدفعات (${fin.payments.length})</div>
              ${fin.payments.length === 0 ? `
                <div style="text-align:center;padding:20px;color:#9CA3AF;font-size:13px;background:#F9FAFB;border-radius:8px;">
                  لا توجد دفعات مسجلة بعد
                </div>
              ` : fin.payments.map(p => `
                <div style="background:#F9FAFB;border-radius:8px;padding:12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <div style="font-weight:700;color:#1B2754;">${fmt(p.amount)} ر.س</div>
                    <div style="font-size:11px;color:#6B7280;">${formatDate(p.payment_date)} - ${p.receiver || ''}</div>
                    ${p.payer_name ? `<div style="font-size:11px;color:#F39237;">دفعها: ${p.payer_name}</div>` : ''}
                  </div>
                  <div style="font-size:11px;color:#6B7280;font-family:monospace;">${p.reference_number || ''}</div>
                </div>
              `).join('')}
            </div>
            
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('details-modal-container').innerHTML = html;
  }

  function sendWhatsApp(customerId) {
    const customer = window.state.customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const fin = calculateCustomerFinancials(customer);
    const phone = (customer.phone || '').replace(/\D/g, '').replace(/^0/, '966');
    if (!phone) {
      alert('لا يوجد رقم جوال للعميل');
      return;
    }
    
    let message;
    const amount = fmt(Math.round(fin.monthlyFee));
    const days = fin.daysOverdue;
    
    if (fin.status === 'completed') {
      message = `السلام عليكم ${customer.name}،\nنشكركم على تعاملكم المستمر مع التنظيف الماسي.\nالتنظيف الماسي 💎`;
    } else if (fin.status === 'reminder') {
      message = CONFIG.whatsappTemplates.reminder(customer.name, amount, fin.daysToNext);
    } else if (fin.status === 'due') {
      message = CONFIG.whatsappTemplates.due(customer.name, amount);
    } else if (fin.status === 'late') {
      message = CONFIG.whatsappTemplates.late(customer.name, amount, days);
    } else if (fin.status === 'veryLate') {
      message = CONFIG.whatsappTemplates.veryLate(customer.name, amount, days);
    } else if (fin.status === 'critical') {
      message = CONFIG.whatsappTemplates.critical(customer.name, amount, days);
    } else {
      message = CONFIG.whatsappTemplates.due(customer.name, amount);
    }
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  }

  function openBulkReminder() {
    const customers = window.state.customers || [];
    const overdueCustomers = customers
      .map(c => ({ customer: c, fin: calculateCustomerFinancials(c) }))
      .filter(x => x.fin.statusLevel >= 3)
      .sort((a,b) => b.fin.statusLevel - a.fin.statusLevel);
    
    if (overdueCustomers.length === 0) {
      alert('🎉 لا يوجد عملاء متأخرين حالياً!');
      return;
    }
    
    const html = `
      <div onclick="this.remove()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div onclick="event.stopPropagation()" style="background:white;border-radius:16px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;">
          
          <div style="background:#1B2754;color:white;padding:20px;border-radius:16px 16px 0 0;">
            <h2 style="margin:0;font-size:18px;font-weight:700;">📤 تذكير جماعي عبر واتساب</h2>
            <div style="font-size:13px;opacity:0.9;margin-top:4px;">${overdueCustomers.length} عميل متأخر</div>
          </div>
          
          <div style="padding:20px;">
            <div style="margin-bottom:14px;display:flex;gap:8px;">
              <button onclick="document.querySelectorAll('.bulk-check').forEach(c=>c.checked=true)" 
                style="flex:1;padding:8px;background:white;border:1px solid #E5E7EB;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;">
                ✅ تحديد الكل
              </button>
              <button onclick="document.querySelectorAll('.bulk-check').forEach(c=>c.checked=false)" 
                style="flex:1;padding:8px;background:white;border:1px solid #E5E7EB;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;">
                ☐ إلغاء التحديد
              </button>
            </div>
            
            <div style="max-height:300px;overflow-y:auto;border:1px solid #E5E7EB;border-radius:8px;">
              ${overdueCustomers.map(x => `
                <label style="display:flex;align-items:center;gap:10px;padding:12px;border-bottom:1px solid #F3F4F6;cursor:pointer;">
                  <input type="checkbox" class="bulk-check" value="${x.customer.id}" checked>
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:14px;color:#1B2754;">${x.customer.name}</div>
                    <div style="font-size:12px;color:#6B7280;">${fmt(Math.round(x.fin.monthlyFee))} ر.س - متأخر ${x.fin.daysOverdue} يوم</div>
                  </div>
                  ${getStatusBadge(x.fin)}
                </label>
              `).join('')}
            </div>
            
            <div style="background:#FEF3C7;border-radius:8px;padding:12px;margin-top:14px;font-size:12px;color:#92400E;">
              💡 ملاحظة: راح يفتح واتساب لكل عميل بشكل منفصل. أرسل الرسالة لكل واحد ثم رجع للنظام للاستمرار.
            </div>
            
            <div style="display:flex;gap:10px;margin-top:16px;">
              <button onclick="window.diamondPayments.sendBulkReminders()" 
                style="flex:1;padding:12px;background:#10B981;color:white;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;">
                📤 إرسال للمحددين
              </button>
              <button onclick="this.closest('[onclick]').remove()" 
                style="padding:12px 20px;background:white;border:1px solid #E5E7EB;border-radius:8px;font-family:inherit;font-size:14px;cursor:pointer;">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('bulk-reminder-container').innerHTML = html;
  }

  function sendBulkReminders() {
    const checked = Array.from(document.querySelectorAll('.bulk-check:checked'));
    if (checked.length === 0) {
      alert('يرجى اختيار عميل واحد على الأقل');
      return;
    }
    
    document.querySelector('#bulk-reminder-container > div')?.remove();
    
    showToast(`📤 جاري فتح واتساب لـ ${checked.length} عميل...`);
    
    checked.forEach((cb, index) => {
      setTimeout(() => {
        sendWhatsApp(Number(cb.value));
      }, index * 1500); // 1.5 second between each
    });
  }

  function exportData() {
    const customers = filterCustomers();
    let csv = 'الكود,الاسم,الجوال,الفني,قيمة العقد,المدفوع,المتبقي,النسبة,الاستحقاق القادم,الحالة\n';
    
    customers.forEach(c => {
      const fin = calculateCustomerFinancials(c);
      const status = fin.statusLevel >= 3 ? `متأخر ${fin.daysOverdue} يوم` : fin.status;
      csv += `"${c.secret_code || c.code || ''}","${c.name}","${c.phone || ''}","${c.technician_name || c.technician || ''}",${fin.contractTotal},${fin.totalPaid},${fin.remaining},${fin.paidPercent}%,"${formatDate(fin.nextDueDate)}","${status}"\n`;
    });
    
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تحصيلات_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('✅ تم تصدير البيانات بنجاح');
  }

  // ===========================================================================
  // TOAST NOTIFICATIONS
  // ===========================================================================

  function showToast(message, type = 'success') {
    const colors = { success: '#10B981', error: '#EF4444', info: '#3B82F6' };
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed;top:20px;right:20px;background:${colors[type]};color:white;
      padding:14px 20px;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.2);
      z-index:99999;font-family:inherit;font-size:14px;font-weight:600;
      animation:slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===========================================================================
  // PUBLIC API
  // ===========================================================================

  window.diamondPayments = {
    render,
    openPaymentModal,
    savePayment,
    viewDetails,
    sendWhatsApp,
    openBulkReminder,
    sendBulkReminders,
    exportData,
    calculateCustomerFinancials,
    calculateKPIs
  };

  // Auto-render if container exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Load saved payments from localStorage
      try {
        const saved = localStorage.getItem('diamond_payments');
        if (saved && !window.state.payments?.length) {
          window.state.payments = JSON.parse(saved);
        }
      } catch(e) {}
      
      if (document.getElementById('payments-page') || document.getElementById('page-payments')) {
        render();
      }
    });
  } else {
    try {
      const saved = localStorage.getItem('diamond_payments');
      if (saved && !window.state.payments?.length) {
        window.state.payments = JSON.parse(saved);
      }
    } catch(e) {}
    
    if (document.getElementById('payments-page') || document.getElementById('page-payments')) {
      render();
    }
  }

})();
