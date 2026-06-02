-- ============================================================
-- Diamond Cleaning - Payment & Contract Data (Auto-Generated)
-- Contracts: 170
-- Payments: 564
-- ============================================================

-- ============================================================
-- Contracts
-- ============================================================

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-12-30', '2026-06-28', 6, 3600.0, 600.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'اسراء الحارثي ام عادل' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-06-01', '2026-12-01', 6, 2700.0, 450.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-08-01', '2026-02-01', 6, 2700.0, 450.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'علي الشهري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 3000.0, 500.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'د/ خالد الغامدى' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حسين طارق' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 450.0, 450.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حسن الشهري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-05-01', 3, 1350.0, 450.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 3000.0, 500.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'احمد أبو عمر' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 1000.0, 333.33, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام محمد قدام علي الشهري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد فطاني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-06-01', '2027-06-01', 12, 7200.0, 600.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 12, 10000.0, 833.33, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو صالح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حسن الشريف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 1650.0, 550.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'منصور عنقاوي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-03-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام خالد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'اسامة حريري ابحر الجنوبيه' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 3000.0, 500.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عائشة أحمد باسمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ريان ابحر الجنوبية' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-05', '2026-04-05', 3, 1100.0, 366.67, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام عصام أبو العينين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 500.0, 500.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'فندق السبعين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-10', '2026-05-10', 3, 2100.0, 700.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'الجامعة العريشي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 350.0, 116.67, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'استراحة ام عصام ابحر الجنوبية' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 3000.0, 500.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد عمر باسمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 900.0, 300.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'رائد با خشوين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-05-01', 1, 350.0, 350.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'د / فهد الخليفة' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عاصم العمري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام اياد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 500.0, 500.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عهود ام عبدالله ابحر وليد ملاء' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-07-01', '2026-08-01', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'بيت احمد توفيق' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام الياس' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-05-01', '2026-08-01', 3, 900.0, 300.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'يوسف غازي حسنين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هزاع الغامدي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'صدقة العوفي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالله كردي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 1200.0, 400.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام غازي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-11-01', '2025-12-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'منسقة مشاعل التركي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 200.0, 200.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'247همس' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'شهاب الكعكي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-04-01', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'خالد الزهراني جار حمد فيلا 3' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-05-01', '2026-08-01', 3, 900.0, 300.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عدنان  طاشكندي جار حمد فيلا 5' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-05-01', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حمد علي الصلبي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-03-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حمزة باوزير' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 3000.0, 500.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'بدر با سمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-05-15', '2027-05-15', 12, 3600.0, 300.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ركان خان' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-10', '2026-05-10', 3, 2550.0, 850.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد عريشي الروضة' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'احمد الدويك' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-04-01', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو فيصل حسام مهيني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-04-01', 3, 1050.0, 350.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'مدام شهيره' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-07-01', '2026-01-01', 6, 2100.0, 350.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ياسر بخش فيلا 2' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هاشم فيلا 3' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2027-03-01', 12, 3800.0, 316.67, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'سعود الحوطي فيلا 4' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-07-01', '2027-01-01', 6, 1800.0, 300.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 12, 3600.0, 300.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد بصراوي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-07', '2026-07-07', 6, 1920.0, 320.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2027-01-01', 12, 4200.0, 350.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 400.0, 400.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد با جبير' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'غالب عبدالرحيم' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-05-01', '2025-06-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 280.0, 280.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حمود منسكي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'اسامه جزار' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'وليد قراط' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-10-01', 6, 1500.0, 250.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'تركي الصبحي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام ريان' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو يحي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 280.0, 280.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'قثمي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-09-01', 6, 1800.0, 300.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 3000.0, 500.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'احمد باسمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'اسامه ابوعبدالعزيز' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 230.0, 230.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'سلطان مكي سقطي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-03-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام لما' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-07-01', 3, 900.0, 300.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'فيصل الحربي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-06-01', 4, 1700.0, 425.0, E'مقدم', E'4 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-05-01', '2026-08-01', 3, 1200.0, 400.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام فواد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-07-01', '2027-01-01', 6, 1650.0, 275.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 325.0, 325.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد شافعي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 275.0, 275.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد سراج' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد خليل المسلماني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-11-25', '2001-12-25', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هاشم السليماني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 1000.0, 333.33, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالرحمن سقا' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-03-26', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالعزيز نيازي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ريان بكري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-05-01', 3, 975.0, 325.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عدنان محمد قابل' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 3, 1800.0, 600.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو احمد الاسمري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-07-25', '2002-01-25', 6, 3900.0, 650.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'رحيلي باسمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ياسر العتيبي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 280.0, 280.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ايمان علي حمزة' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-27', '2002-03-27', 12, 4800.0, 400.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-03-26', 1, 800.0, 800.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'رائد المحظار' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-05-25', '2002-05-25', 12, 4800.0, 400.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد با جبع' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-26', '2001-04-26', 3, 750.0, 250.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام عبدالعزيز جارة وفاء الاحمدي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-03-26', 1, 450.0, 450.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عادل خواجي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-03-26', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ربيع البلبيسي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2026-05-01', 3, 1050.0, 350.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 425.0, 425.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 1000.0, 1000.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالاله نصيف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'الدكتورعبد الرحمن ٢٦١' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد خلاف ٢٦٠' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ناديه ٢٦٤' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبد الجواد٢٤٤' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'كابتن سعيد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ايهاب 273' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2025-07-01', '2026-01-01', 6, 2100.0, 350.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-06-26', '2002-06-26', 12, 4800.0, 400.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-08-26', 6, 2700.0, 450.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هارون' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هناء  ابو عبد العزيز' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-04-26', '2001-07-26', 3, 600.0, 200.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد عادل  سليمان' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-09-26', '2001-12-26', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'بندر خياط' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-05-26', 3, 1200.0, 400.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابو محسن معتصم العولقي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-10-25', '2001-11-25', 1, 350.0, 350.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'يامن الخطيب' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-05-26', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ايمن تونكر فيلا 13' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 1680.0, 280.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'فيلا 4 عماد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2014-09-26', '2015-09-26', 12, 3600.0, 300.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-02-26', '2001-03-26', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'منصور الرحيلي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-12-25', '2002-01-25', 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'صالحه المطيري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '1930-06-26', '1930-12-26', 6, 1800.0, 300.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابراهيم الجرادي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أبو نواف فضل' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'توفيق جمب ابو يايا' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-04-01', 3, 900.0, 300.0, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ياسر جمب mg 5,6' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-26', '2001-02-26', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابو ريان هتان سليماني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 200.0, 200.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عهود جمب ام لما' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حلمي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'اخو حلمي ناصر فلبان' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 400.0, 400.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 500.0, 500.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'الاستراحه ابحر الجنوبيه ساجد السوداني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابحر الجنوبية والد احمد عمر' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد قحطاني البحيرات' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 1680.0, 280.0, E'متاخر', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابو جود' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 2700.0, 450.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-05-26', '2001-11-26', 6, 2100.0, 350.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'رانيه سلامة' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ام حسن' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-10-26', '2002-10-26', 12, 2800.0, 233.33, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 3000.0, 500.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-26', '2001-04-26', 3, 250.0, 83.33, E'متاخر', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'روان فيلا ٢ هارون  البساتين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 6, 2400.0, 400.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'الكابتن بندر مدني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'MG6' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبد الرحمن جمب محضار' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-05-26', 2, 1000.0, 500.0, E'متاخر', E'2 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'د. ياسمين جاوي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-27', '2002-01-27', 12, 3800.0, 316.67, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 250.0, 250.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عماد ابو تركي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-11-25', '2002-02-25', 3, 975.0, 325.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'احمد الصواف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-04-26', '2001-05-26', 1, 900.0, 900.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'هيثم جاها' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 180.0, 180.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد الادريسي جار حسن الشريف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-03-26', '2001-04-26', 1, 500.0, 500.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'وليد الميرابي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 350.0, 350.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد عزت جار حسن الشريف' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-07-01', 6, 2400.0, 400.0, E'مقدم', E'6 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-26', '2001-04-26', 3, 900.0, 300.0, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'ابو هاشم فيلا ٤ جار حمد' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2001-01-26', '2001-02-26', 1, 300.0, 300.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'بدر القحطاني' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 400.0, 400.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'يوسف باسمح' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-15', '2026-03-15', 1, 600.0, 600.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'مالك ابو منصور' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-03', '2026-04-03', 1, 350.0, 350.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'منصور الشعيبي 343' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-02-01', '2027-02-01', 12, 3600.0, 300.0, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-01-01', '2026-02-01', 1, 350.0, 350.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'أحمد يحيى البساتين' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, NULL, NULL, 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'جهاد فيلا 22' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-07-01', 3, NULL, NULL, E'مقدم', E'3 اشهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'رامي' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2027-03-01', 12, NULL, NULL, E'مقدم', E'سنه', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'العنود' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, NULL, NULL, NULL, E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'حسن فيلا 59' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-05-01', 1, 300.0, 300.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'سعد من طرف بن كده' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-03-01', '2026-04-01', 1, 350.0, 350.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'جلال' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-05-01', 1, 200.0, 200.0, E'مقدم', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'عبدالله الحربي الاصاله' LIMIT 1;

INSERT INTO contracts (customer_id, start_date, end_date, duration_months, total_amount, monthly_subscription, payment_type, payment_period, status)
SELECT c.id, '2026-04-01', '2026-05-01', 1, 300.0, 300.0, E'متاخر', E'1 شهر', E'\u0646\u0634\u0637'
FROM customers c WHERE c.name_ar = E'زمزمي الاصاله' LIMIT 1;


-- ============================================================
-- Payments
-- ============================================================

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسراء الحارثي ام عادل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسراء الحارثي ام عادل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسراء الحارثي ام عادل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسراء الحارثي ام عادل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد العمران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ خالد الغامدى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ خالد الغامدى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ خالد الغامدى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-10-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسين طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-11-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسين طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسين طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسن الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسن الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسن الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'حسن الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حامد الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-05-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-06-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فهد سعيد باربود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-07-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'احمد أبو عمر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ام محمد قدام علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ام محمد قدام علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ام محمد قدام علي الشهري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد فطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد فطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد فطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد فطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الاميره نورة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-05-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1800.0, '2026-06-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'د/ نما طلحة (سوداد)' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو صالح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو صالح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو صالح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو صالح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسن الشريف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسن الشريف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'منصور عنقاوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'منصور عنقاوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 550.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'منصور عنقاوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام خالد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام خالد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام خالد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'اسامة حريري ابحر الجنوبيه' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'اسامة حريري ابحر الجنوبيه' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'اسامة حريري ابحر الجنوبيه' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عائشة أحمد باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام عصام أبو العينين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام عصام أبو العينين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام عصام أبو العينين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام عصام أبو العينين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فندق السبعين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فندق السبعين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فندق السبعين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 700.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الجامعة العريشي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 700.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الجامعة العريشي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 700.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الجامعة العريشي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 700.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'الجامعة العريشي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'استراحة ام عصام ابحر الجنوبية' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'استراحة ام عصام ابحر الجنوبية' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'استراحة ام عصام ابحر الجنوبية' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عمر باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عمر باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد بصفر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'رائد با خشوين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / فهد الخليفة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / فهد الخليفة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عاصم العمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عاصم العمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عاصم العمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام اياد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام اياد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام اياد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عهود ام عبدالله ابحر وليد ملاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عهود ام عبدالله ابحر وليد ملاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عهود ام عبدالله ابحر وليد ملاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عهود ام عبدالله ابحر وليد ملاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'بيت احمد توفيق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'بيت احمد توفيق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'بيت احمد توفيق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ام الياس' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ام الياس' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'يوسف غازي حسنين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هزاع الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هزاع الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هزاع الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'صدقة العوفي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'صدقة العوفي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'صدقة العوفي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-09-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عبدالله كردي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-10-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عبدالله كردي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-05-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'فؤاد أبو النجاء' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام غازي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام غازي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام غازي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منسقة مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منسقة مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'247همس' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'247همس' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'شهاب الكعكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'شهاب الكعكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'شهاب الكعكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خالد الزهراني جار حمد فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خالد الزهراني جار حمد فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خالد الزهراني جار حمد فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان  طاشكندي جار حمد فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان  طاشكندي جار حمد فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان  طاشكندي جار حمد فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمد علي الصلبي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمزة باوزير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمزة باوزير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمزة باوزير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2025-12-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'بدر با سمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 850.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عريشي الروضة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 850.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عريشي الروضة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 850.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عريشي الروضة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 850.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد عريشي الروضة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'احمد الدويك' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'احمد الدويك' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'احمد الدويك' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل حسام مهيني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل حسام مهيني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل حسام مهيني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مدام شهيره' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مدام شهيره' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مدام شهيره' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'هاشم فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'هاشم فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'هاشم فيلا 3' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سعود الحوطي فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سعود الحوطي فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سعود الحوطي فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علي بن كده فيلا 5' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2027-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2027-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو فيصل فيلا 7' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بصراوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بصراوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بصراوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بصراوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 320.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غفران' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزير الغامدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد با جبير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد با جبير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد با جبير' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غالب عبدالرحيم' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'غالب عبدالرحيم' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-05-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-06-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-07-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-08-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-09-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-10-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-11-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'احمد بابقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمود منسكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمود منسكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حمود منسكي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'وليد قراط' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'تركي الصبحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'تركي الصبحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'تركي الصبحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام ريان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام ريان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام ريان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو يحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو يحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو يحي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 280.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'قثمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 280.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'قثمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 280.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'قثمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ماجد معطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'احمد باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسامه ابوعبدالعزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسامه ابوعبدالعزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'اسامه ابوعبدالعزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 230.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان مكي سقطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 230.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان مكي سقطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 230.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان مكي سقطي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام لما' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيصل الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيصل الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيصل الحربي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'خليل بخش' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام فواد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام فواد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام فواد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام فواد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 258.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'نسرين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد شافعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد شافعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'محمد شافعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد سراج' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد سراج' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد سراج' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد خليل المسلماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد خليل المسلماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هاشم السليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هاشم السليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هاشم السليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عبدالرحمن سقا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عبدالرحمن سقا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'عبدالرحمن سقا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالعزيز نيازي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ريان بكري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ريان بكري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 270.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ريان بكري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان محمد قابل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان محمد قابل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان محمد قابل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عدنان محمد قابل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'أبو احمد الاسمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'أبو احمد الاسمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'أبو احمد الاسمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'أبو احمد الاسمري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رحيلي باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رحيلي باسمح' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ياسر العتيبي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ياسر العتيبي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ياسر العتيبي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايمان علي حمزة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايمان علي حمزة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايمان علي حمزة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 4550.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2027-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2027-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايناس محمد نور الطف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 800.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رائد المحظار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 800.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رائد المحظار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 800.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رائد المحظار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد با جبع' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 40.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد با جبع' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد با جبع' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد با جبع' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام عبدالعزيز جارة وفاء الاحمدي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عادل خواجي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عادل خواجي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'ربيع البلبيسي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'ربيع البلبيسي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'ربيع البلبيسي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'علياء عبدالعزيز سبت' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 425.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د / اديب احمد الطيار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1000.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالاله نصيف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1000.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالاله نصيف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 1000.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالاله نصيف' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الدكتورعبد الرحمن ٢٦١' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الدكتورعبد الرحمن ٢٦١' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الدكتورعبد الرحمن ٢٦١' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد خلاف ٢٦٠' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد خلاف ٢٦٠' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد خلاف ٢٦٠' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ناديه ٢٦٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ناديه ٢٦٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ناديه ٢٦٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبد الجواد٢٤٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبد الجواد٢٤٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبد الجواد٢٤٤' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'كابتن سعيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'كابتن سعيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'كابتن سعيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايهاب 273' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايهاب 273' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايهاب 273' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 325.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله دهان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله علي النهضه بسمة المقوشى' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'طارق' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هناء  ابو عبد العزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هناء  ابو عبد العزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هناء  ابو عبد العزيز' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو محسن معتصم العولقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو محسن معتصم العولقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو محسن معتصم العولقي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'يامن الخطيب' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'يامن الخطيب' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'يامن الخطيب' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ايمن تونكر فيلا 13' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيلا 4 عماد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيلا 4 عماد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'فيلا 4 عماد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سلطان رفاعي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الرحيلي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الرحيلي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 150.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الرحيلي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'صالحه المطيري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'صالحه المطيري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابراهيم الجرادي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابراهيم الجرادي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو نواف فضل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو نواف فضل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أبو نواف فضل' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'توفيق جمب ابو يايا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'توفيق جمب ابو يايا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'توفيق جمب ابو يايا' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو ريان هتان سليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو ريان هتان سليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ابو ريان هتان سليماني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-01-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'عهود جمب ام لما' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-02-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'عهود جمب ام لما' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-03-01', 4, E'عالم'
FROM customers c WHERE c.name_ar = E'عهود جمب ام لما' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'حلمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'حلمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'حلمي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'اخو حلمي ناصر فلبان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'اخو حلمي ناصر فلبان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'اخو حلمي ناصر فلبان' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عباس عبد الرحمن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حسام حريري' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الاستراحه ابحر الجنوبيه ساجد السوداني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الاستراحه ابحر الجنوبيه ساجد السوداني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'الاستراحه ابحر الجنوبيه ساجد السوداني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ابحر الجنوبية والد احمد عمر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ابحر الجنوبية والد احمد عمر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'ابحر الجنوبية والد احمد عمر' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'محمد قحطاني البحيرات' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'محمد قحطاني البحيرات' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2025-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 275.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مايا فيلا 4' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'ابو جود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'ابو جود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 2, E'حبيب'
FROM customers c WHERE c.name_ar = E'ابو جود' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 450.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'ام محمد  الشويعر فوزيه الخيال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رانيه سلامة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رانيه سلامة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رانيه سلامة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'رانيه سلامة' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 180.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'ام حسن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 180.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'ام حسن' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 233.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مازن عبدالله حمدان السيد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-02-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-04-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-05-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-06-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-07-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-08-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-09-01', 1, E'عبدالله'
FROM customers c WHERE c.name_ar = E'جمال باعامر  ام محمد' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'روان فيلا ٢ هارون  البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'روان فيلا ٢ هارون  البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'روان فيلا ٢ هارون  البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'روان فيلا ٢ هارون  البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'MG6' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'MG6' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'MG6' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'عبد الرحمن جمب محضار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'عبد الرحمن جمب محضار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 3, E'رضوان'
FROM customers c WHERE c.name_ar = E'عبد الرحمن جمب محضار' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'د. ياسمين جاوي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 316.0, '2026-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'حازم الشريف A04' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عماد ابو تركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عماد ابو تركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 250.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عماد ابو تركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هيثم جاها' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هيثم جاها' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'هيثم جاها' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 500.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'وليد الميرابي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2025-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 400.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'محمد بكري 340' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'بدر القحطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'بدر القحطاني' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مالك ابو منصور' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مالك ابو منصور' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 600.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مالك ابو منصور' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 100.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الشعيبي 343' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الشعيبي 343' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'منصور الشعيبي 343' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-05-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-06-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-07-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-08-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-09-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-10-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-11-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-12-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2027-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2027-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'مصطفى فلان جمب مشاعل التركي' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-01-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أحمد يحيى البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-02-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أحمد يحيى البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'أحمد يحيى البساتين' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 300.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'سعد من طرف بن كده' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 100.0, '2026-03-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'جلال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 350.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'جلال' LIMIT 1;

INSERT INTO payments (customer_id, amount, payment_date, receiver_id, payment_method)
SELECT c.id, 200.0, '2026-04-01', 6, E'حواله الشركه'
FROM customers c WHERE c.name_ar = E'عبدالله الحربي الاصاله' LIMIT 1;
