/**
 * Diamond Cleaning - Utility Functions
 */

// Format number with commas (Arabic style)
function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-US');
}

// Format currency (SAR)
function formatCurrency(amount) {
  if (!amount) return '0 \u0631.\u0633';
  return formatNumber(amount) + ' \u0631.\u0633';
}

// Format date to Arabic format
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Format date short
function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Days remaining until date
function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

// Clean phone number
function cleanPhone(phone) {
  if (!phone) return '';
  let p = String(phone).replace(/[\s\-\(\)\+]/g, '');
  if (p.endsWith('.0')) p = p.slice(0, -2);
  if (p.startsWith('966') && p.length === 12) return p;
  if (p.startsWith('0') && p.length === 10) return '966' + p.substring(1);
  if (p.length === 9 && p[0] === '5') return '966' + p;
  return p;
}

// Format phone for display
function formatPhone(phone) {
  if (!phone) return '-';
  const p = cleanPhone(phone);
  if (p.length === 12 && p.startsWith('966')) {
    return `+966 ${p.substring(3, 5)} ${p.substring(5, 8)} ${p.substring(8)}`;
  }
  return phone;
}

// WhatsApp link
function whatsappLink(phone, message = '') {
  const p = cleanPhone(phone);
  const url = `https://wa.me/${p}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

// Phone call link
function phoneLink(phone) {
  return `tel:+${cleanPhone(phone)}`;
}

// Number to Arabic words (Tafqit)
function numberToArabicWords(num) {
  if (!num || num === 0) return '\u0635\u0641\u0631';
  const ones = ['', '\u0648\u0627\u062d\u062f', '\u0627\u062b\u0646\u0627\u0646', '\u062b\u0644\u0627\u062b\u0629', '\u0623\u0631\u0628\u0639\u0629', '\u062e\u0645\u0633\u0629', '\u0633\u062a\u0629', '\u0633\u0628\u0639\u0629', '\u062b\u0645\u0627\u0646\u064a\u0629', '\u062a\u0633\u0639\u0629',
    '\u0639\u0634\u0631\u0629', '\u0623\u062d\u062f \u0639\u0634\u0631', '\u0627\u062b\u0646\u0627 \u0639\u0634\u0631', '\u062b\u0644\u0627\u062b\u0629 \u0639\u0634\u0631', '\u0623\u0631\u0628\u0639\u0629 \u0639\u0634\u0631', '\u062e\u0645\u0633\u0629 \u0639\u0634\u0631',
    '\u0633\u062a\u0629 \u0639\u0634\u0631', '\u0633\u0628\u0639\u0629 \u0639\u0634\u0631', '\u062b\u0645\u0627\u0646\u064a\u0629 \u0639\u0634\u0631', '\u062a\u0633\u0639\u0629 \u0639\u0634\u0631'];
  const tens = ['', '', '\u0639\u0634\u0631\u0648\u0646', '\u062b\u0644\u0627\u062b\u0648\u0646', '\u0623\u0631\u0628\u0639\u0648\u0646', '\u062e\u0645\u0633\u0648\u0646', '\u0633\u062a\u0648\u0646', '\u0633\u0628\u0639\u0648\u0646', '\u062b\u0645\u0627\u0646\u0648\u0646', '\u062a\u0633\u0639\u0648\u0646'];
  const hundreds = ['', '\u0645\u0627\u0626\u0629', '\u0645\u0627\u0626\u062a\u0627\u0646', '\u062b\u0644\u0627\u062b\u0645\u0627\u0626\u0629', '\u0623\u0631\u0628\u0639\u0645\u0627\u0626\u0629', '\u062e\u0645\u0633\u0645\u0627\u0626\u0629', '\u0633\u062a\u0645\u0627\u0626\u0629', '\u0633\u0628\u0639\u0645\u0627\u0626\u0629', '\u062b\u0645\u0627\u0646\u0645\u0627\u0626\u0629', '\u062a\u0633\u0639\u0645\u0627\u0626\u0629'];

  num = Math.floor(num);
  if (num < 20) return ones[num];
  if (num < 100) {
    const t = Math.floor(num / 10), o = num % 10;
    return o ? ones[o] + ' \u0648' + tens[t] : tens[t];
  }
  if (num < 1000) {
    const h = Math.floor(num / 100), rest = num % 100;
    return rest ? hundreds[h] + ' \u0648' + numberToArabicWords(rest) : hundreds[h];
  }
  if (num < 1000000) {
    const th = Math.floor(num / 1000), rest = num % 1000;
    let thText = th === 1 ? '\u0623\u0644\u0641' : th === 2 ? '\u0623\u0644\u0641\u0627\u0646' : numberToArabicWords(th) + ' \u0622\u0644\u0627\u0641';
    return rest ? thText + ' \u0648' + numberToArabicWords(rest) : thText;
  }
  return formatNumber(num);
}

// Amount in words with currency
function amountInWords(amount) {
  const whole = Math.floor(amount);
  const frac = Math.round((amount - whole) * 100);
  let text = numberToArabicWords(whole) + ' \u0631\u064a\u0627\u0644 \u0633\u0639\u0648\u062f\u064a';
  if (frac > 0) text += ' \u0648' + numberToArabicWords(frac) + ' \u0647\u0644\u0644\u0629';
  return text;
}

// Debounce function
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Completeness score to badge
function completenessBadge(score) {
  if (score >= 80) return { class: 'completeness-high', icon: '\uD83D\uDFE2', text: score + '%' };
  if (score >= 50) return { class: 'completeness-medium', icon: '\uD83D\uDFE1', text: score + '%' };
  return { class: 'completeness-low', icon: '\uD83D\uDD34', text: score + '%' };
}

// Status badge HTML
function statusBadge(status) {
  const map = {
    '\u064a\u0639\u0645\u0644': { class: 'badge-active', text: '\u0646\u0634\u0637', icon: '\u2705' },
    '\u0645\u062a\u0648\u0642\u0641': { class: 'badge-stopped', text: '\u0645\u062a\u0648\u0642\u0641', icon: '\u26D4' },
    '\u0646\u0634\u0637': { class: 'badge-active', text: '\u0646\u0634\u0637', icon: '\u2705' },
    '\u0645\u0646\u062a\u0647\u064a': { class: 'badge-expired', text: '\u0645\u0646\u062a\u0647\u064a', icon: '\u23F0' },
    '\u0645\u0644\u063a\u064a': { class: 'badge-stopped', text: '\u0645\u0644\u063a\u064a', icon: '\u274C' },
  };
  const m = map[status] || { class: 'badge-expired', text: status || '-', icon: '\u2753' };
  return `<span class="badge ${m.class}">${m.icon} ${m.text}</span>`;
}

// Generate unique ID
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
