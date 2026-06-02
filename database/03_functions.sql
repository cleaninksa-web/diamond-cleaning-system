-- ============================================================
-- Diamond Cleaning Management System
-- Functions and Triggers (03_functions.sql)
-- ============================================================

-- ============================================================
-- Function 1: Auto-generate customer secret code (C-0001)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_customer_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.secret_code IS NULL OR NEW.secret_code = '' THEN
    NEW.secret_code := 'C-' || LPAD(NEW.id::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_customer_code ON customers;
CREATE TRIGGER trg_customer_code
  BEFORE INSERT ON customers
  FOR EACH ROW
  EXECUTE FUNCTION generate_customer_code();

-- ============================================================
-- Function 2: Auto-generate contract reference (CON-YYYY-####)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_contract_reference()
RETURNS TRIGGER AS $$
DECLARE
  year_str TEXT;
  next_num INT;
BEGIN
  IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
    year_str := COALESCE(TO_CHAR(NEW.start_date, 'YYYY'), TO_CHAR(NOW(), 'YYYY'));
    SELECT COALESCE(MAX(
      CASE
        WHEN reference_number ~ ('CON-' || year_str || '-\d+$')
        THEN SUBSTRING(reference_number FROM '\d+$')::INT
        ELSE 0
      END
    ), 0) + 1
    INTO next_num
    FROM contracts
    WHERE reference_number LIKE 'CON-' || year_str || '-%';
    NEW.reference_number := 'CON-' || year_str || '-' || LPAD(next_num::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contract_reference ON contracts;
CREATE TRIGGER trg_contract_reference
  BEFORE INSERT ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION generate_contract_reference();

-- ============================================================
-- Function 3: Auto-generate payment reference (PAY-YYYY-####)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_payment_reference()
RETURNS TRIGGER AS $$
DECLARE
  year_str TEXT;
  next_num INT;
BEGIN
  IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
    year_str := COALESCE(TO_CHAR(NEW.payment_date, 'YYYY'), TO_CHAR(NOW(), 'YYYY'));
    SELECT COALESCE(MAX(
      CASE
        WHEN reference_number ~ ('PAY-' || year_str || '-\d+$')
        THEN SUBSTRING(reference_number FROM '\d+$')::INT
        ELSE 0
      END
    ), 0) + 1
    INTO next_num
    FROM payments
    WHERE reference_number LIKE 'PAY-' || year_str || '-%';
    NEW.reference_number := 'PAY-' || year_str || '-' || LPAD(next_num::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_payment_reference ON payments;
CREATE TRIGGER trg_payment_reference
  BEFORE INSERT ON payments
  FOR EACH ROW
  EXECUTE FUNCTION generate_payment_reference();

-- ============================================================
-- Function 4: Auto-calculate contract monthly subscription
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_monthly_subscription()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_amount IS NOT NULL AND NEW.duration_months IS NOT NULL AND NEW.duration_months > 0 THEN
    NEW.monthly_subscription := ROUND(NEW.total_amount / NEW.duration_months, 2);
  END IF;
  IF NEW.weekly_visits IS NOT NULL THEN
    NEW.monthly_visits := NEW.weekly_visits * 4;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contract_calc ON contracts;
CREATE TRIGGER trg_contract_calc
  BEFORE INSERT OR UPDATE ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION calculate_monthly_subscription();

-- ============================================================
-- Function 5: Auto-set payment month/year from date
-- ============================================================
CREATE OR REPLACE FUNCTION set_payment_period()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_date IS NOT NULL THEN
    NEW.payment_month := EXTRACT(MONTH FROM NEW.payment_date)::INT;
    NEW.payment_year := EXTRACT(YEAR FROM NEW.payment_date)::INT;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_payment_period ON payments;
CREATE TRIGGER trg_payment_period
  BEFORE INSERT OR UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION set_payment_period();

-- ============================================================
-- Function 6: Generate contract expiry alerts
-- Called daily (via Supabase cron or Edge Function)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_contract_alerts()
RETURNS void AS $$
BEGIN
  -- Alert at 60 days
  INSERT INTO notifications (type, severity, title, message, customer_id, contract_id, trigger_date)
  SELECT
    'contract_expiring_60',
    'info',
    E'\u0639\u0642\u062f \u0633\u064a\u0646\u062a\u0647\u064a \u0628\u0639\u062f 60 \u064a\u0648\u0645',
    c.name_ar || ' (' || ct.reference_number || ') - ' || TO_CHAR(ct.end_date, 'DD/MM/YYYY'),
    c.id,
    ct.id,
    CURRENT_DATE
  FROM contracts ct
  JOIN customers c ON c.id = ct.customer_id
  WHERE ct.status = E'\u0646\u0634\u0637'
    AND ct.end_date - CURRENT_DATE = 60
    AND NOT EXISTS (
      SELECT 1 FROM notifications n
      WHERE n.contract_id = ct.id AND n.type = 'contract_expiring_60'
    );

  -- Alert at 30 days
  INSERT INTO notifications (type, severity, title, message, customer_id, contract_id, trigger_date)
  SELECT
    'contract_expiring_30',
    'warning',
    E'\u0639\u0642\u062f \u0633\u064a\u0646\u062a\u0647\u064a \u0628\u0639\u062f 30 \u064a\u0648\u0645',
    c.name_ar || ' (' || ct.reference_number || ') - ' || TO_CHAR(ct.end_date, 'DD/MM/YYYY'),
    c.id,
    ct.id,
    CURRENT_DATE
  FROM contracts ct
  JOIN customers c ON c.id = ct.customer_id
  WHERE ct.status = E'\u0646\u0634\u0637'
    AND ct.end_date - CURRENT_DATE = 30
    AND NOT EXISTS (
      SELECT 1 FROM notifications n
      WHERE n.contract_id = ct.id AND n.type = 'contract_expiring_30'
    );

  -- Alert at 15 days (urgent)
  INSERT INTO notifications (type, severity, title, message, customer_id, contract_id, trigger_date)
  SELECT
    'contract_expiring_15',
    'danger',
    E'\u0639\u0642\u062f \u0633\u064a\u0646\u062a\u0647\u064a \u0628\u0639\u062f 15 \u064a\u0648\u0645 - \u0639\u0627\u062c\u0644',
    c.name_ar || ' (' || ct.reference_number || ') - ' || TO_CHAR(ct.end_date, 'DD/MM/YYYY'),
    c.id,
    ct.id,
    CURRENT_DATE
  FROM contracts ct
  JOIN customers c ON c.id = ct.customer_id
  WHERE ct.status = E'\u0646\u0634\u0637'
    AND ct.end_date - CURRENT_DATE = 15
    AND NOT EXISTS (
      SELECT 1 FROM notifications n
      WHERE n.contract_id = ct.id AND n.type = 'contract_expiring_15'
    );

  -- Auto-expire contracts past end_date
  UPDATE contracts
  SET status = E'\u0645\u0646\u062a\u0647\u064a', updated_at = NOW()
  WHERE status = E'\u0646\u0634\u0637'
    AND end_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Function 7: Update timestamp on record change
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
DROP TRIGGER IF EXISTS trg_customers_updated ON customers;
CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_contracts_updated ON contracts;
CREATE TRIGGER trg_contracts_updated BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_pool_details_updated ON pool_details;
CREATE TRIGGER trg_pool_details_updated BEFORE UPDATE ON pool_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_visits_updated ON visits;
CREATE TRIGGER trg_visits_updated BEFORE UPDATE ON visits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_documents_updated ON documents;
CREATE TRIGGER trg_documents_updated BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_company_updated ON company_info;
CREATE TRIGGER trg_company_updated BEFORE UPDATE ON company_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
