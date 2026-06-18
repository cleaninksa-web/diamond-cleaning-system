/**
 * Diamond Cleaning - Contracts Module
 * تعديل العقود + طباعة عقد رسمي PDF لكل عميل
 */

// ===== تعديل عقد =====
function editContract(contractId) {
  const contract = (window.STATE.contracts || []).find(c => c.id === contractId);
  if (!contract) { showToast('لم يتم العثور على العقد', 'error'); return; }
  const customer = (window.STATE.customers || []).find(c => c.id === contract.customer_id);

  let modal = document.getElementById('contract-edit-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'contract-edit-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal modal-lg">
      <div class="modal-header"><h3 class="modal-title" id="contract-edit-title"></h3><button class="modal-close" onclick="closeModal('contract-edit-modal')">&times;</button></div>
      <div class="modal-body" id="contract-edit-body"></div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="saveContractEdit()">💾 حفظ التعديلات</button>
        <button class="btn btn-outline" onclick="closeModal('contract-edit-modal')">إلغاء</button>
      </div>
    </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeModal('contract-edit-modal'); });
    document.body.appendChild(modal);
  }

  modal.dataset.contractId = contractId;
  document.getElementById('contract-edit-title').textContent = `✏️ تعديل العقد: ${contract.reference_number}`;
  document.getElementById('contract-edit-body').innerHTML = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">العميل</label>
        <input class="form-input" value="${customer?.name_ar || contract.customer_name || ''}" disabled></div>
      <div class="form-group"><label class="form-label">رقم العقد</label>
        <input class="form-input" id="ce-ref" value="${contract.reference_number || ''}" dir="ltr"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">تاريخ البداية</label>
        <input class="form-input" type="date" id="ce-start" value="${contract.start_date || ''}"></div>
      <div class="form-group"><label class="form-label">تاريخ النهاية</label>
        <input class="form-input" type="date" id="ce-end" value="${contract.end_date || ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">مدة العقد (أشهر)</label>
        <input class="form-input" type="number" id="ce-months" value="${contract.duration_months || 12}"></div>
      <div class="form-group"><label class="form-label">المبلغ الشهري</label>
        <input class="form-input" type="number" id="ce-monthly" value="${contract.monthly_amount || 0}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">إجمالي العقد</label>
        <input class="form-input" type="number" id="ce-total" value="${contract.total_amount || 0}"></div>
      <div class="form-group"><label class="form-label">الحالة</label>
        <select class="form-select" id="ce-status">
          <option value="نشط" ${contract.status === 'نشط' ? 'selected' : ''}>نشط</option>
          <option value="منتهي" ${contract.status === 'منتهي' ? 'selected' : ''}>منتهي</option>
          <option value="ملغي" ${contract.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
        </select></div>
    </div>
    <div class="form-group"><label class="form-label">طريقة الدفع</label>
      <select class="form-select" id="ce-payment">
        <option value="monthly" ${contract.payment_type === 'monthly' ? 'selected' : ''}>شهري</option>
        <option value="مقدم" ${contract.payment_type === 'مقدم' ? 'selected' : ''}>مقدم</option>
        <option value="متأخر" ${contract.payment_type === 'متأخر' ? 'selected' : ''}>متأخر</option>
      </select></div>
  `;
  openModal('contract-edit-modal');
}

async function saveContractEdit() {
  const contractId = parseInt(document.getElementById('contract-edit-modal')?.dataset.contractId);
  if (!contractId) return;

  const updates = {
    reference_number: document.getElementById('ce-ref')?.value?.trim(),
    start_date:       document.getElementById('ce-start')?.value,
    end_date:         document.getElementById('ce-end')?.value,
    duration_months:  parseInt(document.getElementById('ce-months')?.value) || 12,
    monthly_amount:   parseFloat(document.getElementById('ce-monthly')?.value) || 0,
    total_amount:     parseFloat(document.getElementById('ce-total')?.value) || 0,
    status:           document.getElementById('ce-status')?.value,
    payment_type:     document.getElementById('ce-payment')?.value,
  };

  try {
    if (STATE.useSupabase) {
      const { error } = await db.from('contracts').update(updates).eq('id', contractId);
      if (error) throw error;
    }

    // تحديث محلي
    const idx = STATE.contracts?.findIndex(c => c.id === contractId);
    if (idx >= 0) {
      Object.assign(STATE.contracts[idx], updates);
    }

    showToast('تم تحديث العقد بنجاح ✅', 'success');
    closeModal('contract-edit-modal');
    filterContracts();
  } catch (err) {
    showToast('خطأ: ' + err.message, 'error');
  }
}

// ===== طباعة عقد رسمي =====
function printContract(contractId) {
  const contract = (window.STATE.contracts || []).find(c => c.id === contractId);
  if (!contract) { showToast('لم يتم العثور على العقد', 'error'); return; }
  const customer = (window.STATE.customers || []).find(c => c.id === contract.customer_id);
  if (!customer) { showToast('لم يتم العثور على بيانات العميل', 'error'); return; }

  const startDate = contract.start_date ? new Date(contract.start_date) : new Date();
  const endDate = contract.end_date ? new Date(contract.end_date) : new Date();
  const dayName = startDate.toLocaleDateString('ar-SA', { weekday: 'long' });
  const startStr = startDate.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  const endStr   = endDate.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  const startHijri = startDate.toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric', month: 'numeric', day: 'numeric' });
  const totalAmount = contract.total_amount || 0;
  const monthlyAmount = contract.monthly_amount || 0;
  const vatEnabled = window.STATE?.company_info?.vat_enabled;
  const totalVAT = vatEnabled ? totalAmount * 0.15 : 0;
  const monthlyVAT = vatEnabled ? monthlyAmount * 0.15 : 0;
  const totalStr = (totalAmount + totalVAT).toLocaleString('ar-SA');
  const monthlyStr = (monthlyAmount + monthlyVAT).toLocaleString('ar-SA');
  const visits = customer.weekly_visits ? customer.weekly_visits * 4 : 8;
  const months = contract.duration_months || 12;
  const paymentMethod = contract.payment_type === 'مقدم' ? 'يدفع المبلغ دفعة واحدة مقدماً' : 'دفعات شهرية';

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>عقد صيانة - ${customer.name_ar || ''}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Cairo', sans-serif; color: #1a1a1a; line-height: 1.8; direction: rtl; padding: 0; background: #fff; }

  .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm 25mm; position: relative; }

  .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #0f172a; }
  .logo-area { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .logo-area img { width: 80px; height: 80px; object-fit: contain; }
  .company-name { font-size: 18px; font-weight: 800; color: #0f172a; }
  .company-sub { font-size: 11px; color: #64748b; }

  .contract-title { font-size: 22px; font-weight: 800; color: #0f172a; text-align: center;
    background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 12px; border-radius: 8px;
    margin: 15px 0; border: 2px solid #0f172a; }

  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; }
  .party-box { background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
  .party-title { font-weight: 700; color: #0f172a; font-size: 14px; margin-bottom: 8px;
    padding-bottom: 6px; border-bottom: 2px solid #ea580c; }
  .party-row { font-size: 12px; margin: 4px 0; }
  .party-label { font-weight: 600; color: #475569; }
  .party-value { color: #0f172a; font-weight: 700; }

  .clause { margin: 16px 0; }
  .clause-title { font-size: 15px; font-weight: 800; color: #0f172a; padding: 6px 12px;
    background: #0f172a; color: #fff; border-radius: 6px; display: inline-block; margin-bottom: 8px; }
  .clause-body { font-size: 13px; padding-right: 10px; }
  .clause-body ol, .clause-body ul { padding-right: 20px; }
  .clause-body li { margin: 4px 0; }

  .highlight { background: #fff7ed; padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #ea580c; }
  .amount { font-size: 15px; font-weight: 800; color: #0f172a; }

  .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px;
    padding-top: 20px; border-top: 2px solid #0f172a; }
  .sig-box { text-align: center; }
  .sig-title { font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 8px; }
  .sig-name { font-weight: 600; margin: 8px 0; }
  .sig-line { border-bottom: 1px dashed #94a3b8; width: 80%; margin: 30px auto 0; }

  .stamp-area { text-align: center; margin-top: 10px; }
  .stamp-area img { width: 100px; opacity: 0.7; }

  .footer-note { text-align: center; font-size: 10px; color: #94a3b8; margin-top: 20px;
    padding-top: 10px; border-top: 1px solid #e2e8f0; }

  .print-bar { background: #0f172a; color: #fff; padding: 12px 30px; text-align: center;
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex;
    justify-content: space-between; align-items: center; }
  .print-bar button { background: #ea580c; color: #fff; border: none; padding: 8px 24px;
    border-radius: 8px; cursor: pointer; font-family: Cairo; font-size: 14px; font-weight: 600; }

  @media print {
    .print-bar { display: none !important; }
    body { padding: 0; }
    .page { padding: 15mm 20mm; margin: 0; }
    .clause-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .contract-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .party-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>

<div class="print-bar">
  <span>📄 عقد صيانة وتنظيف مسابح — ${customer.name_ar || ''}</span>
  <div>
    <button onclick="window.print()">🖨️ طباعة / حفظ PDF</button>
  </div>
</div>

<div class="page" style="margin-top: 50px">

  <div class="header">
    <div class="logo-area">
      <div>
        <div class="company-name">مؤسسة التنظيف الماسي للصيانة والنظافة</div>
        <div class="company-sub">Diamond Cleaning Est. | سجل تجاري: 4030524288</div>
      </div>
      <img src="assets/logo.png" onerror="this.style.display='none'" alt="Logo">
    </div>
  </div>

  <div class="contract-title">عقد صيانة وتنظيف مسابح</div>

  <p style="text-align:center;font-size:13px;margin-bottom:15px">
    إنه في يوم <strong>${dayName}</strong> وتاريخ <strong>${startHijri}</strong> هـ
    الموافق <strong>${startStr}</strong> م تم الاتفاق بين كلٍ من:
  </p>

  <div class="parties">
    <div class="party-box">
      <div class="party-title">الطرف الأول (المؤسسة)</div>
      <div class="party-row"><span class="party-label">الاسم:</span> <span class="party-value">مؤسسة التنظيف الماسي للصيانة والنظافة</span></div>
      <div class="party-row"><span class="party-label">السجل التجاري:</span> <span class="party-value">4030524288</span></div>
      <div class="party-row"><span class="party-label">رقم التواصل:</span> <span class="party-value" dir="ltr">0555955690</span></div>
    </div>
    <div class="party-box">
      <div class="party-title">الطرف الثاني (العميل)</div>
      <div class="party-row"><span class="party-label">الاسم:</span> <span class="party-value">${customer.name_ar || ''}</span></div>
      <div class="party-row"><span class="party-label">رقم التواصل:</span> <span class="party-value" dir="ltr">${customer.phone || ''}</span></div>
      <div class="party-row"><span class="party-label">العنوان:</span> <span class="party-value">${customer.district || 'جدة'}</span></div>
    </div>
  </div>

  <p style="text-align:center;font-size:12px;color:#475569">ويُشار إليهما فيما بعد بـ (الطرفين)، على ما يلي:</p>

  <div class="clause">
    <div class="clause-title">أولاً: موضوع العقد</div>
    <div class="clause-body">يقوم الطرف الأول (المؤسسة) بتقديم خدمات صيانة وتنظيف المسابح الخاصة بالطرف الثاني (العميل)، وتشمل (التنظيف الدوري، معالجة المياه، فحص المعدات، الصيانة الوقائية والتصحيحية) وذلك وفق الشروط الواردة في هذا العقد.</div>
  </div>

  <div class="clause">
    <div class="clause-title">ثانياً: مدة العقد</div>
    <div class="clause-body">
      <p>مدة هذا العقد: <span class="highlight">${months === 12 ? 'سنة كاملة يضاف إليها شهر مجاني' : months + ' أشهر'}</span></p>
      <p>تبدأ من تاريخ: <strong>${startStr}</strong> وتنتهي في: <strong>${endStr}</strong></p>
      <p>ويجدد تلقائياً ما لم يُخطر أحد الطرفين الآخر قبل (30) يوماً من تاريخ الانتهاء.</p>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">ثالثاً: نطاق العمل</div>
    <div class="clause-body">
      <p>يلتزم الطرف الأول بما يلي:</p>
      <ol>
        <li>تنظيف المسبح (إزالة الأوساخ، تنظيف الجدران والأرضيات).</li>
        <li>فحص وتشغيل نظام الفلترة والمضخات.</li>
        <li>قياس ومعالجة توازن المياه (الكلور، الحموضة).</li>
        <li>إضافة المواد الكيميائية اللازمة.</li>
        <li>تشييك دورية للمعدات.</li>
      </ol>
      <p>عدد الزيارات: <span class="highlight">${visits} زيارة شهرياً</span></p>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">رابعاً: التزامات الطرف الثاني</div>
    <div class="clause-body">
      <ol>
        <li>توفير مصدر كهرباء ومياه صالحين للعمل.</li>
        <li>تسهيل دخول فريق العمل في الأوقات المتفق عليها.</li>
        <li>سداد المستحقات المالية في موعدها.</li>
        <li>إبلاغ الطرف الأول بأي أعطال فور حدوثها.</li>
      </ol>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">خامساً: المقابل المالي</div>
    <div class="clause-body">
      <ul>
        <li>قيمة العقد السنوي: <span class="amount">${totalStr} ريال سعودي</span>${vatEnabled ? ' (شامل الضريبة 15%)' : ''}</li>
        <li>القيمة الشهرية: <span class="amount">${monthlyStr} ريال سعودي</span>${vatEnabled ? ' (شامل الضريبة 15%)' : ''}</li>
        <li>طريقة الدفع: <span class="highlight">${paymentMethod}</span></li>
        <li>يتم السداد خلال مدة أقصاها (5) أيام من تاريخ بداية العقد.</li>
        <li>يتم سداد المستحقات عن طريق التحويل البنكي لحساب الطرف الأول في البنك الأهلي السعودي، على رقم الآيبان: <strong dir="ltr">SA7310000001400022356600</strong></li>
        <li>في حال طلب زيارات طارئة خارج الجدول يتم احتساب رسوم الزيارات الفردية.</li>
      </ul>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">سادساً: المراسلات والتواصل</div>
    <div class="clause-body">يتفق الطرفان على اعتماد المراسلات عبر تطبيق (الواتس آب) لأرقام الجوال المسجلة في صدر هذا العقد كوسيلة تواصل وإشعار رسمية معتمدة بينهما.</div>
  </div>

  <div class="clause">
    <div class="clause-title">سابعاً: المسؤولية</div>
    <div class="clause-body">
      <ol>
        <li>يتحمل الطرف الأول مسؤولية أي ضرر ناتج عن الإهمال أو التقصير أثناء تنفيذ أعمال الصيانة والتنظيف. مثل (نقص المواد – عدم وضع الكميات المطلوبة – التغيب بدون إشعار العميل).</li>
        <li>لا يتحمل الطرف الأول الأضرار الناتجة عن سوء استخدام المسبح.</li>
        <li>لا يتحمل الطرف الأول أي أضرار تطرأ على المسبح بعد إتمام عملية التنظيف إذا كانت ناتجة عن: كوارث طبيعية، عوامل بيئية، توقف الأنظمة أو العبث بالمعدات من قبل الغير.</li>
        <li>تعتبر مسؤولية الطرف الأول محصورة فقط خلال وقت تنفيذ الخدمة.</li>
      </ol>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">ثامناً: الإجازات والظروف الطارئة</div>
    <div class="clause-body">
      <ol>
        <li>لا تُحتسب الإجازات الرسمية ضمن أيام العمل (عيد الفطر، عيد الأضحى، اليوم الوطني، يوم التأسيس).</li>
        <li>لا يلتزم الطرف الأول بتنفيذ الزيارات خلال هذه الإجازات ويتم تعويضها بجدولة بديلة.</li>
        <li>لا يتحمل الطرف الأول أي مسؤولية عن التأخير في حال وقوع ظروف قاهرة.</li>
      </ol>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">تاسعاً: الإنهاء</div>
    <div class="clause-body">
      <p>يحق لأي طرف إنهاء العقد في الحالات التالية:</p>
      <ul>
        <li>الإخلال بأي بند من بنود العقد.</li>
        <li>عدم السداد خلال (15) يوماً من الاستحقاق.</li>
        <li>يتم إشعار الطرف الآخر خطياً قبل (15) يوماً.</li>
      </ul>
    </div>
  </div>

  <div class="clause">
    <div class="clause-title">عاشراً: السرية</div>
    <div class="clause-body">يلتزم الطرفان بالمحافظة على سرية جميع المعلومات المتبادلة وعدم الإفصاح عنها لأي طرف ثالث.</div>
  </div>

  <div class="clause">
    <div class="clause-title">الحادي عشر: النظام الحاكم</div>
    <div class="clause-body">يخضع هذا العقد لأحكام الشريعة الإسلامية وفي حال وقوع خلاف يتم تسويته ودياً، وإذا تعذر يتم اللجوء إلى المحاكم الشرعية المختصة في المملكة العربية السعودية.</div>
  </div>

  <div class="clause">
    <div class="clause-title">الثاني عشر: أحكام عامة</div>
    <div class="clause-body">
      <ul>
        <li>هذا العقد يمثل كامل الاتفاق بين الطرفين.</li>
        <li>أي تعديل يجب أن يكون مكتوباً وموقعاً من الطرفين.</li>
        <li>حرر هذا العقد من نسختين بيد كل طرف نسخة للعمل بموجبها.</li>
      </ul>
    </div>
  </div>

  <div class="signatures">
    <div class="sig-box">
      <div class="sig-title">توقيع الطرف الأول (المؤسسة)</div>
      <div class="sig-name">مؤسسة التنظيف الماسي للصيانة والنظافة</div>
      <div class="stamp-area"><img src="assets/stamp.png" onerror="this.style.display='none'" alt="Stamp"></div>
      <div class="sig-line"></div>
    </div>
    <div class="sig-box">
      <div class="sig-title">توقيع الطرف الثاني (العميل)</div>
      <div class="sig-name">${customer.name_ar || ''}</div>
      <div style="height:60px"></div>
      <div class="sig-line"></div>
    </div>
  </div>

  <div class="footer-note">
    مؤسسة التنظيف الماسي للصيانة والنظافة — جدة | هاتف: 0555955690 | IBAN: SA7310000001400022356600 | البنك الأهلي السعودي
  </div>

</div>
</body>
</html>`);
  win.document.close();
}

// ===== حذف عقد =====
async function deleteContract(contractId) {
  if (!confirm('هل أنت متأكد من حذف هذا العقد؟')) return;
  try {
    if (STATE.useSupabase) {
      const { error } = await db.from('contracts').delete().eq('id', contractId);
      if (error) throw error;
    }
    STATE.contracts = STATE.contracts.filter(c => c.id !== contractId);
    showToast('تم حذف العقد 🗑️', 'success');
    filterContracts();
  } catch (err) {
    showToast('خطأ: ' + err.message, 'error');
  }
}
