-- ============================================================
-- Diamond Cleaning System — Accounting Module Schema
-- شغّل هذا الملف في Supabase SQL Editor
-- ============================================================

-- 1. بطاقات العمل (قلب المحاسبة)
CREATE TABLE IF NOT EXISTS work_orders (
  id               SERIAL PRIMARY KEY,
  reference_number TEXT UNIQUE,
  type             TEXT NOT NULL,
  customer_id      INT REFERENCES customers(id) ON DELETE SET NULL,
  technician_id    INT REFERENCES technicians(id) ON DELETE SET NULL,
  description      TEXT,
  amount           NUMERIC NOT NULL DEFAULT 0,
  status           TEXT DEFAULT 'بانتظار',
  reject_reason    TEXT,
  approved_by      TEXT,
  approved_at      TIMESTAMPTZ,
  receipt_url      TEXT,
  created_by       TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2. المصروفات العامة
CREATE TABLE IF NOT EXISTS expenses (
  id           SERIAL PRIMARY KEY,
  date         DATE DEFAULT CURRENT_DATE,
  category     TEXT NOT NULL,
  amount       NUMERIC NOT NULL,
  description  TEXT,
  bank_account TEXT DEFAULT 'الأهلي',
  receipt_url  TEXT,
  approved_by  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. الرواتب الشهرية
CREATE TABLE IF NOT EXISTS salaries (
  id              SERIAL PRIMARY KEY,
  technician_id   INT REFERENCES technicians(id),
  month           TEXT NOT NULL,
  base_salary     NUMERIC DEFAULT 0,
  commission      NUMERIC DEFAULT 0,
  overtime_hours  NUMERIC DEFAULT 0,
  overtime_amount NUMERIC DEFAULT 0,
  extra_work      NUMERIC DEFAULT 0,
  bonus           NUMERIC DEFAULT 0,
  deductions      NUMERIC DEFAULT 0,
  net_salary      NUMERIC DEFAULT 0,
  status          TEXT DEFAULT 'بانتظار',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(technician_id, month)
);

-- 4. مشاريع المبيعات
CREATE TABLE IF NOT EXISTS sales_projects (
  id               SERIAL PRIMARY KEY,
  reference_number TEXT UNIQUE,
  client_name      TEXT NOT NULL,
  client_phone     TEXT,
  project_type     TEXT NOT NULL,
  description      TEXT,
  total_amount     NUMERIC NOT NULL,
  payment_method   TEXT DEFAULT 'مرحلي',
  status           TEXT DEFAULT 'جديد',
  sales_person     TEXT,
  technician_id    INT REFERENCES technicians(id),
  start_date       DATE,
  end_date         DATE,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 5. دفعات المشاريع
CREATE TABLE IF NOT EXISTS project_payments (
  id               SERIAL PRIMARY KEY,
  project_id       INT REFERENCES sales_projects(id),
  reference_number TEXT UNIQUE,
  phase_name       TEXT,
  amount           NUMERIC NOT NULL,
  percentage       NUMERIC,
  due_date         DATE,
  paid_date        DATE,
  status           TEXT DEFAULT 'مستحقة',
  bank_account     TEXT DEFAULT 'الأهلي',
  receipt_url      TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 6. الحسابات البنكية
CREATE TABLE IF NOT EXISTS bank_accounts (
  id           SERIAL PRIMARY KEY,
  bank_name    TEXT NOT NULL,
  account_name TEXT,
  iban         TEXT UNIQUE,
  balance      NUMERIC DEFAULT 0,
  is_primary   BOOLEAN DEFAULT false,
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- إضافة الحساب الأساسي
INSERT INTO bank_accounts (bank_name, account_name, iban, is_primary, active)
VALUES ('البنك الأهلي السعودي', 'مؤسسة التنظيف الماسي', 'SA7310000001400022356600', true, true)
ON CONFLICT (iban) DO NOTHING;

-- تحديث جدول الدفعات
ALTER TABLE payments ADD COLUMN IF NOT EXISTS bank_account TEXT DEFAULT 'الأهلي';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS transfer_reference TEXT;

-- تحديث جدول الفنيين
ALTER TABLE technicians ADD COLUMN IF NOT EXISTS base_salary NUMERIC DEFAULT 0;
ALTER TABLE technicians ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC DEFAULT 0;
