# Supabase Setup Guide - Diamond Cleaning System

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email or GitHub account
3. Verify your email

## Step 2: Create New Project

1. Click **"New Project"**
2. Fill in:
   - **Name**: `diamond-cleaning`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select **Bahrain (me-south-1)** (closest to Saudi Arabia)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be ready

## Step 3: Run SQL Files (In Order)

Go to **SQL Editor** (left sidebar) and run each file in order:

### File 1: Schema (01_schema.sql)
- Copy the entire content of `database/01_schema.sql`
- Paste in SQL Editor
- Click **"Run"**
- Should see: "Success. No rows returned"

### File 2: Views (02_views.sql)
- Copy `database/02_views.sql`
- Paste and Run

### File 3: Functions (03_functions.sql)
- Copy `database/03_functions.sql`
- Paste and Run

### File 4: Seed Data (04_seed.sql)
- Copy `database/04_seed.sql`
- Paste and Run
- Should insert: 1 company record, 4 technicians, 7 receivers

### File 5: Customer Data (05_customer_data.sql)
- Copy `database/05_customer_data.sql`
- Paste and Run
- Should insert: 232 customers + pool details

### File 6: Payment Data (06_payment_data.sql)
- Copy `database/06_payment_data.sql`
- Paste and Run
- Should insert: ~168 contracts + 564 payments

## Step 4: Verify Data

Run these queries in SQL Editor to verify:

```sql
-- Check counts
SELECT 'customers' as tbl, COUNT(*) as cnt FROM customers
UNION ALL SELECT 'technicians', COUNT(*) FROM technicians
UNION ALL SELECT 'receivers', COUNT(*) FROM receivers
UNION ALL SELECT 'contracts', COUNT(*) FROM contracts
UNION ALL SELECT 'payments', COUNT(*) FROM payments;
```

Expected results:
- customers: 232
- technicians: 4
- receivers: 7
- contracts: ~168
- payments: ~564

## Step 5: Get API Keys

1. Go to **Settings** (gear icon) > **API**
2. Copy:
   - **Project URL**: `https://xxxx.supabase.co`
   - **anon public key**: `eyJxxx...`
3. These go in the app's `js/supabase.js` file

## Step 6: Upload Assets (Optional)

1. Go to **Storage** (left sidebar)
2. Create a new bucket called `assets`
3. Set it to **Public**
4. Upload `logo.png` and `stamp.png`

## Troubleshooting

### "Permission denied" errors
Make sure RLS policies are created (they're in 01_schema.sql)

### "Relation does not exist" errors
Run the SQL files in order (01 before 02 before 03, etc.)

### Customer data not linking to payments
The migration uses customer names to link. If names don't match exactly,
some payments may not link. Check with:
```sql
SELECT * FROM payments WHERE customer_id IS NULL;
```
