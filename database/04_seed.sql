-- ============================================================
-- Diamond Cleaning Management System
-- Seed Data (04_seed.sql)
-- ============================================================

-- Company info (single record)
INSERT INTO company_info (
  name_ar, name_en, cr_number, unified_number,
  phone, email, website, address,
  bank_name, iban, beneficiary_name,
  manager_name, show_splash
) VALUES (
  E'\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0641 \u0627\u0644\u0645\u0627\u0633\u064a \u0644\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629',
  'Diamond Cleaning Foundation',
  '4030524288',
  '7036375066',
  '+966555955690',
  'cleaninksa@gmail.com',
  'www.cleaninksa.com',
  E'\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 - \u062c\u062f\u0629 - \u0635.\u0628 3169 - \u062c\u062f\u0629 22425',
  E'\u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a',
  'SA7310000001400022356600',
  E'\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0641 \u0627\u0644\u0645\u0627\u0633\u064a \u0644\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0627\u0644\u0646\u0638\u0627\u0641\u0629',
  E'\u0639\u0628\u062f\u0627\u0644\u0644\u0647 \u0645\u062d\u0645\u062f',
  TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Technicians (4 active)
INSERT INTO technicians (name) VALUES
  (E'\u062d\u0628\u064a\u0628'),
  (E'\u0631\u0636\u0648\u0627\u0646'),
  (E'\u0633\u0627\u062c\u062f'),
  (E'\u0639\u0627\u0644\u0645 \u0642\u064a\u0631');

-- Receivers (payment collection methods)
INSERT INTO receivers (name, type, bank_name, iban) VALUES
  (E'\u0639\u0628\u062f\u0627\u0644\u0644\u0647', E'\u0641\u0631\u062f', NULL, NULL),
  (E'\u062d\u0628\u064a\u0628', E'\u0641\u0631\u062f', NULL, NULL),
  (E'\u0631\u0636\u0648\u0627\u0646', E'\u0641\u0631\u062f', NULL, NULL),
  (E'\u0639\u0627\u0644\u0645', E'\u0641\u0631\u062f', NULL, NULL),
  (E'\u0643\u0627\u0634', E'\u0643\u0627\u0634', NULL, NULL),
  (E'\u062d\u0648\u0627\u0644\u0629 \u0627\u0644\u0634\u0631\u0643\u0629', E'\u062d\u0648\u0627\u0644\u0629 \u0628\u0646\u0643\u064a\u0629', E'\u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a', 'SA7310000001400022356600'),
  (E'\u062d\u0648\u0627\u0644\u0629 \u0628\u0646\u0643\u064a\u0629 \u0627\u0644\u0623\u0647\u0644\u064a', E'\u062d\u0648\u0627\u0644\u0629 \u0628\u0646\u0643\u064a\u0629', E'\u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a', 'SA7310000001400022356600');
