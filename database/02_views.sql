-- ============================================================
-- Diamond Cleaning Management System
-- SQL Views (02_views.sql)
-- ============================================================

-- ============================================================
-- View 1: v_customers_full - Complete customer info with joins
-- ============================================================
CREATE OR REPLACE VIEW v_customers_full AS
SELECT
  c.*,
  t.name AS technician_name,
  pd.pool_type,
  pd.pool_count,
  pd.length AS pool_length,
  pd.width AS pool_width,
  pd.depth_1 AS pool_depth_1,
  pd.depth_2 AS pool_depth_2,
  pd.total_area AS pool_area,
  pd.tile_type,
  pd.filter_size,
  pd.lights_count,
  pd.equipment_info,
  pd.equipment_notes,
  ct.id AS active_contract_id,
  ct.reference_number AS active_contract_ref,
  ct.total_amount AS contract_amount,
  ct.monthly_subscription,
  ct.start_date AS contract_start,
  ct.end_date AS contract_end,
  ct.payment_type,
  ct.payment_period,
  ct.weekly_visits,
  ct.monthly_visits,
  ct.visit_days,
  ct.status AS contract_status
FROM customers c
LEFT JOIN technicians t ON c.technician_id = t.id
LEFT JOIN pool_details pd ON pd.customer_id = c.id
LEFT JOIN LATERAL (
  SELECT * FROM contracts
  WHERE customer_id = c.id
  ORDER BY
    CASE WHEN status = E'\u0646\u0634\u0637' THEN 0 ELSE 1 END,
    created_at DESC
  LIMIT 1
) ct ON true;

-- ============================================================
-- View 2: v_technician_stats - Technician performance stats
-- ============================================================
CREATE OR REPLACE VIEW v_technician_stats AS
SELECT
  t.id,
  t.name,
  t.phone,
  t.active,
  COUNT(c.id) FILTER (WHERE c.status = E'\u064a\u0639\u0645\u0644') AS active_customers,
  COUNT(c.id) AS total_customers,
  COALESCE(SUM(ct.monthly_subscription) FILTER (WHERE c.status = E'\u064a\u0639\u0645\u0644'), 0) AS monthly_revenue,
  COALESCE(SUM(ct.total_amount) FILTER (WHERE c.status = E'\u064a\u0639\u0645\u0644'), 0) AS total_contract_value,
  COUNT(c.id) FILTER (WHERE c.status = E'\u064a\u0639\u0645\u0644' AND ct.id IS NULL) AS customers_without_contract
FROM technicians t
LEFT JOIN customers c ON c.technician_id = t.id
LEFT JOIN contracts ct ON ct.customer_id = c.id AND ct.status = E'\u0646\u0634\u0637'
WHERE t.active = TRUE
GROUP BY t.id, t.name, t.phone, t.active;

-- ============================================================
-- View 3: v_payment_status - Payment status per customer
-- ============================================================
CREATE OR REPLACE VIEW v_payment_status AS
SELECT
  c.id AS customer_id,
  c.name_ar,
  c.secret_code,
  c.phone,
  c.district,
  c.status AS customer_status,
  t.name AS technician_name,
  ct.id AS contract_id,
  ct.reference_number,
  ct.start_date,
  ct.end_date,
  ct.total_amount,
  ct.monthly_subscription,
  ct.payment_type,
  COALESCE(paid.total_paid, 0) AS paid_amount,
  COALESCE(ct.total_amount, 0) - COALESCE(paid.total_paid, 0) AS remaining,
  CASE
    WHEN c.status != E'\u064a\u0639\u0645\u0644' THEN c.status
    WHEN ct.id IS NULL THEN E'\u0628\u062f\u0648\u0646 \u0639\u0642\u062f'
    WHEN ct.end_date < CURRENT_DATE THEN E'\u0645\u0646\u062a\u0647\u064a'
    WHEN COALESCE(paid.total_paid, 0) >= ct.total_amount THEN E'\u0645\u062f\u0641\u0648\u0639'
    WHEN ct.end_date <= CURRENT_DATE + INTERVAL '30 days' THEN E'\u064a\u0633\u062a\u062d\u0642 \u0642\u0631\u064a\u0628\u0627\u064b'
    WHEN COALESCE(paid.total_paid, 0) < ct.total_amount THEN E'\u0645\u062a\u0623\u062e\u0631'
    ELSE E'\u063a\u064a\u0631 \u0645\u062d\u062f\u062f'
  END AS payment_status
FROM customers c
LEFT JOIN technicians t ON c.technician_id = t.id
LEFT JOIN contracts ct ON ct.customer_id = c.id AND ct.status = E'\u0646\u0634\u0637'
LEFT JOIN (
  SELECT customer_id, SUM(amount) AS total_paid
  FROM payments
  GROUP BY customer_id
) paid ON paid.customer_id = c.id;

-- ============================================================
-- View 4: v_customer_completeness - Data quality scores
-- ============================================================
CREATE OR REPLACE VIEW v_customer_completeness AS
SELECT
  c.id,
  c.name_ar,
  c.secret_code,
  c.status,
  c.technician_id,
  (
    CASE WHEN c.name_ar IS NOT NULL AND c.name_ar != '' THEN 10 ELSE 0 END +
    CASE WHEN c.phone IS NOT NULL AND c.phone != '' THEN 10 ELSE 0 END +
    CASE WHEN c.district IS NOT NULL AND c.district != '' THEN 8 ELSE 0 END +
    CASE WHEN c.technician_id IS NOT NULL THEN 10 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM contracts WHERE customer_id = c.id AND status = E'\u0646\u0634\u0637'
    ) THEN 15 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM contracts ct WHERE ct.customer_id = c.id AND ct.monthly_subscription IS NOT NULL AND ct.monthly_subscription > 0
    ) THEN 12 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM contracts ct WHERE ct.customer_id = c.id AND ct.visit_days IS NOT NULL AND ct.visit_days != ''
    ) THEN 8 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM pool_details WHERE customer_id = c.id AND pool_type IS NOT NULL AND pool_type != ''
    ) THEN 8 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM contracts ct WHERE ct.customer_id = c.id AND ct.payment_type IS NOT NULL AND ct.payment_type != ''
    ) THEN 8 ELSE 0 END +
    CASE WHEN EXISTS (
      SELECT 1 FROM payments WHERE customer_id = c.id
    ) THEN 11 ELSE 0 END
  ) AS completeness_score,
  ARRAY_REMOVE(ARRAY[
    CASE WHEN c.phone IS NULL OR c.phone = '' THEN E'\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644' END,
    CASE WHEN c.district IS NULL OR c.district = '' THEN E'\u0627\u0644\u062d\u064a' END,
    CASE WHEN c.technician_id IS NULL THEN E'\u0627\u0644\u0641\u0646\u064a \u0627\u0644\u0645\u0633\u0624\u0648\u0644' END,
    CASE WHEN NOT EXISTS (
      SELECT 1 FROM contracts WHERE customer_id = c.id AND status = E'\u0646\u0634\u0637'
    ) THEN E'\u0627\u0644\u0639\u0642\u062f \u0627\u0644\u0646\u0634\u0637' END,
    CASE WHEN NOT EXISTS (
      SELECT 1 FROM payments WHERE customer_id = c.id
    ) THEN E'\u062a\u0633\u062c\u064a\u0644 \u062f\u0641\u0639\u0629' END,
    CASE WHEN NOT EXISTS (
      SELECT 1 FROM pool_details WHERE customer_id = c.id AND pool_type IS NOT NULL AND pool_type != ''
    ) THEN E'\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u0628\u062d' END
  ], NULL) AS missing_fields
FROM customers c;

-- ============================================================
-- View 5: v_customer_debt - Stopped customers with debts
-- ============================================================
CREATE OR REPLACE VIEW v_customer_debt AS
SELECT
  c.id,
  c.name_ar,
  c.secret_code,
  c.phone,
  c.district,
  c.status,
  c.suspension_status,
  c.suspension_date,
  c.suspension_reason,
  t.name AS technician_name,
  COALESCE(contracts_total.total_contracts, 0) AS total_contracts,
  COALESCE(payments_total.total_paid, 0) AS total_paid,
  COALESCE(contracts_total.total_contracts, 0) - COALESCE(payments_total.total_paid, 0) AS debt_amount,
  payments_total.last_payment_date,
  payments_total.last_payment_amount,
  CASE
    WHEN c.suspension_date IS NOT NULL THEN
      CURRENT_DATE - c.suspension_date
    ELSE NULL
  END AS days_since_stopped
FROM customers c
LEFT JOIN technicians t ON c.technician_id = t.id
LEFT JOIN (
  SELECT customer_id, SUM(total_amount) AS total_contracts
  FROM contracts
  WHERE end_date >= CURRENT_DATE - INTERVAL '365 days'
  GROUP BY customer_id
) contracts_total ON contracts_total.customer_id = c.id
LEFT JOIN (
  SELECT
    customer_id,
    SUM(amount) AS total_paid,
    MAX(payment_date) AS last_payment_date,
    (SELECT amount FROM payments p2 WHERE p2.customer_id = payments.customer_id ORDER BY payment_date DESC LIMIT 1) AS last_payment_amount
  FROM payments
  GROUP BY customer_id
) payments_total ON payments_total.customer_id = c.id
WHERE c.status = E'\u0645\u062a\u0648\u0642\u0641' OR c.suspension_status IS NOT NULL;
