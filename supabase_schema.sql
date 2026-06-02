-- =====================================================
-- Diamond Cleaning System - Supabase Schema
-- شغّل هذا الملف في Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. الفنيون
CREATE TABLE IF NOT EXISTS technicians (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. العملاء
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  secret_code TEXT UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  district TEXT,
  status TEXT DEFAULT 'يعمل',
  technician_id INT REFERENCES technicians(id),
  contract_amount NUMERIC DEFAULT 0,
  period_months INT DEFAULT 12,
  monthly_fee NUMERIC DEFAULT 0,
  contract_start DATE,
  payment_type TEXT DEFAULT 'متأخر',
  pool_type TEXT,
  weekly_visits INT DEFAULT 2,
  visit_days TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. الدفعات
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  reference_number TEXT UNIQUE,
  customer_id INT NOT NULL REFERENCES customers(id),
  amount NUMERIC NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  receiver TEXT,
  payer_name TEXT,
  payer_relation TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. معلومات الشركة
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  manager_name TEXT DEFAULT 'عبدالله محمد',
  show_splash BOOLEAN DEFAULT true
);

INSERT INTO company_info (manager_name) VALUES ('عبدالله محمد')
ON CONFLICT DO NOTHING;

-- 5. إضافة الفنيين الأساسيين
INSERT INTO technicians (name) VALUES 
  ('حبيب'), ('رضوان'), ('ساجد'), ('عالم قير')
ON CONFLICT DO NOTHING;

-- 6. تفعيل RLS (Row Level Security) مع سماح القراءة العامة
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for anon" ON technicians FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON customers FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON payments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON company_info FOR ALL TO anon USING (true) WITH CHECK (true);
