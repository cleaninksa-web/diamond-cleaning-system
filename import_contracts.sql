CREATE TABLE IF NOT EXISTS contracts (
  id               SERIAL PRIMARY KEY,
  reference_number TEXT UNIQUE,
  customer_id      INT REFERENCES customers(id) ON DELETE CASCADE,
  start_date       DATE,
  end_date         DATE,
  duration_months  INT DEFAULT 12,
  total_amount     NUMERIC DEFAULT 0,
  monthly_amount   NUMERIC DEFAULT 0,
  status           TEXT DEFAULT 'active',
  payment_type     TEXT DEFAULT 'monthly',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for anon" ON contracts;
CREATE POLICY "Allow all for anon" ON contracts FOR ALL TO anon USING (true) WITH CHECK (true);

TRUNCATE TABLE contracts RESTART IDENTITY CASCADE;

INSERT INTO contracts (reference_number, customer_id, start_date, end_date, duration_months, total_amount, monthly_amount, status, payment_type)
SELECT
  'CON-' || LPAD(c.id::TEXT, 4, '0'),
  c.id,
  COALESCE(c.contract_start, '2025-01-01'),
  COALESCE(c.contract_start, '2025-01-01') + INTERVAL '1 year',
  12,
  COALESCE(c.monthly_fee, 0) * 12,
  COALESCE(c.monthly_fee, 0),
  CASE WHEN c.status = 'active' THEN 'active' ELSE 'inactive' END,
  COALESCE(c.payment_type, 'monthly')
FROM customers c
ON CONFLICT (reference_number) DO UPDATE SET
  total_amount   = EXCLUDED.total_amount,
  monthly_amount = EXCLUDED.monthly_amount,
  status         = EXCLUDED.status;

SELECT COUNT(*) as total_contracts FROM contracts;
