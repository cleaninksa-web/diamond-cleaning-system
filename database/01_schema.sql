-- ============================================================
-- Diamond Cleaning Management System
-- Database Schema (01_schema.sql)
-- PostgreSQL / Supabase
-- ============================================================

-- ============================================================
-- 1. company_info - Company information (single record)
-- ============================================================
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL DEFAULT E'\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0641 \u0627\u0644\u0645\u0627\u0633\u064a \u0644\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629',
  name_en TEXT DEFAULT 'Diamond Cleaning Foundation',
  cr_number TEXT DEFAULT '4030524288',
  unified_number TEXT DEFAULT '7036375066',
  phone TEXT DEFAULT '+966555955690',
  email TEXT DEFAULT 'cleaninksa@gmail.com',
  website TEXT DEFAULT 'www.cleaninksa.com',
  address TEXT DEFAULT E'\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 - \u062c\u062f\u0629 - \u0635.\u0628 3169 - \u062c\u062f\u0629 22425',
  bank_name TEXT DEFAULT E'\u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a',
  iban TEXT DEFAULT 'SA7310000001400022356600',
  beneficiary_name TEXT DEFAULT E'\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0641 \u0627\u0644\u0645\u0627\u0633\u064a \u0644\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629',
  logo_url TEXT,
  stamp_url TEXT,
  manager_name TEXT DEFAULT E'\u0639\u0628\u062f\u0627\u0644\u0644\u0647 \u0645\u062d\u0645\u062f',
  show_splash BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. technicians - Technicians
-- ============================================================
CREATE TABLE IF NOT EXISTS technicians (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  phone TEXT,
  notes TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. receivers - Payment receivers / collection methods
-- ============================================================
CREATE TABLE IF NOT EXISTS receivers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT E'\u0641\u0631\u062f',
  bank_name TEXT,
  account_number TEXT,
  iban TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. customers - Main customers table
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,

  -- Secret internal code (C-0001)
  secret_code TEXT UNIQUE,

  -- Identity
  name_ar TEXT NOT NULL,
  name_en TEXT,
  national_id TEXT,

  -- Contact
  phone TEXT,
  driver_phone TEXT,
  maid_phone TEXT,

  -- Address
  district TEXT,
  address_details TEXT,
  location_url TEXT,
  location_lat NUMERIC(10, 7),
  location_lng NUMERIC(10, 7),

  -- Status: active / paused / stopped_with_debt / stopped_paid / cancelled
  status TEXT NOT NULL DEFAULT E'\u064a\u0639\u0645\u0644',
  suspension_status TEXT,
  suspension_date DATE,
  suspension_reason TEXT,

  -- Technician
  technician_id INT REFERENCES technicians(id) ON DELETE SET NULL,

  -- Notes
  general_notes TEXT,

  -- Legacy ID from Excel
  legacy_id INT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast search
CREATE INDEX IF NOT EXISTS idx_customers_secret_code ON customers(secret_code);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name_ar);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_technician ON customers(technician_id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_district ON customers(district);

-- ============================================================
-- 5. pool_details - Pool technical specifications
-- ============================================================
CREATE TABLE IF NOT EXISTS pool_details (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,

  -- Pool specs
  pool_type TEXT,
  pool_count INT DEFAULT 1,

  -- Dimensions
  length NUMERIC,
  width NUMERIC,
  depth_1 NUMERIC,
  depth_2 NUMERIC,
  total_area NUMERIC,

  -- Equipment
  tile_type TEXT,
  filter_size TEXT,
  lights_count INT,
  equipment_info TEXT,
  equipment_notes TEXT,

  -- Technical notes
  technical_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pool_details_customer ON pool_details(customer_id);

-- ============================================================
-- 6. contracts - Service contracts
-- ============================================================
CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,

  -- Reference number visible to customer (CON-2026-0042)
  reference_number TEXT UNIQUE,

  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,

  -- Duration
  start_date DATE,
  end_date DATE,
  duration_months INT,
  free_months INT DEFAULT 0,

  -- Amount
  total_amount NUMERIC,
  monthly_subscription NUMERIC,

  -- Payment system
  payment_type TEXT DEFAULT E'\u0645\u0642\u062f\u0645',
  payment_period TEXT,

  -- Visits
  weekly_visits INT DEFAULT 2,
  monthly_visits INT,
  visit_days TEXT,

  -- Day checkboxes stored as comma-separated
  visit_day_sat BOOLEAN DEFAULT FALSE,
  visit_day_sun BOOLEAN DEFAULT FALSE,
  visit_day_mon BOOLEAN DEFAULT FALSE,
  visit_day_tue BOOLEAN DEFAULT FALSE,
  visit_day_wed BOOLEAN DEFAULT FALSE,
  visit_day_thu BOOLEAN DEFAULT FALSE,
  visit_day_fri BOOLEAN DEFAULT FALSE,

  -- Status: active / expired / cancelled
  status TEXT NOT NULL DEFAULT E'\u0646\u0634\u0637',

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contracts_customer ON contracts(customer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_end_date ON contracts(end_date);
CREATE INDEX IF NOT EXISTS idx_contracts_reference ON contracts(reference_number);

-- ============================================================
-- 7. payments - Payment records
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,

  -- Reference number (PAY-2026-0234)
  reference_number TEXT UNIQUE,

  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  contract_id INT REFERENCES contracts(id) ON DELETE SET NULL,

  -- Payment details
  amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_month INT,
  payment_year INT,

  -- Collection method
  receiver_id INT REFERENCES receivers(id) ON DELETE SET NULL,
  payment_method TEXT,

  -- Payer info (when different from customer)
  payer_name TEXT,
  payer_relation TEXT,
  payer_phone TEXT,

  -- Notes
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_contract ON payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference_number);
CREATE INDEX IF NOT EXISTS idx_payments_year_month ON payments(payment_year, payment_month);

-- ============================================================
-- 8. visits - Visit schedule with route ordering
-- ============================================================
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,

  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  technician_id INT REFERENCES technicians(id) ON DELETE SET NULL,

  -- Schedule
  scheduled_date DATE NOT NULL,
  day_of_week TEXT,

  -- Route order (within same day + technician)
  route_order INT DEFAULT 0,

  -- Status: scheduled / completed / postponed / cancelled / missed
  status TEXT NOT NULL DEFAULT E'\u0645\u062c\u062f\u0648\u0644\u0629',

  -- Execution
  executed_at TIMESTAMPTZ,
  notes TEXT,

  -- Photos (Supabase Storage URLs)
  before_photos TEXT[],
  after_photos TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visits_customer ON visits(customer_id);
CREATE INDEX IF NOT EXISTS idx_visits_technician ON visits(technician_id);
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_visits_status ON visits(status);
CREATE INDEX IF NOT EXISTS idx_visits_route ON visits(technician_id, scheduled_date, route_order);

-- ============================================================
-- 9. customer_photos - Customer photos
-- ============================================================
CREATE TABLE IF NOT EXISTS customer_photos (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,

  category TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,

  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_photos_customer ON customer_photos(customer_id);

-- ============================================================
-- 10. documents - Generated documents archive
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,

  reference_number TEXT UNIQUE,

  doc_type TEXT NOT NULL,

  customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
  contract_id INT REFERENCES contracts(id) ON DELETE SET NULL,

  title TEXT,
  data JSONB,

  pdf_url TEXT,
  word_url TEXT,

  has_stamp BOOLEAN DEFAULT FALSE,

  status TEXT DEFAULT E'\u0645\u0633\u0648\u062f\u0629',
  sent_via TEXT,
  sent_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_customer ON documents(customer_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(doc_type);
CREATE INDEX IF NOT EXISTS idx_documents_reference ON documents(reference_number);

-- ============================================================
-- 11. notifications - Alert system
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,

  type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',

  title TEXT NOT NULL,
  message TEXT NOT NULL,

  customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
  contract_id INT REFERENCES contracts(id) ON DELETE CASCADE,

  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,

  trigger_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- ============================================================
-- 12. audit_log - Change tracking
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,

  table_name TEXT NOT NULL,
  record_id INT,
  action TEXT NOT NULL,

  user_id TEXT,
  changes JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_table ON audit_log(table_name, record_id);

-- ============================================================
-- Enable Row Level Security (prepare for future roles)
-- ============================================================
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE receivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Phase 1: Allow all access (single admin user)
-- These policies allow full access via the anon key
CREATE POLICY "Allow all access" ON company_info FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON technicians FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON receivers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON pool_details FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON contracts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON customer_photos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access" ON audit_log FOR ALL USING (true) WITH CHECK (true);
