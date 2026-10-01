-- ============================================================================
-- NILITE EXPORTS - PRODUCTION RELATIONAL DATABASE SCHEMA (POSTGRESQL / SQLITE)
-- High-Performance B2B Export Architecture for Commodities, Daily Rates & Quotations
-- ============================================================================

-- 1. Product Categories Table
CREATE TABLE IF NOT EXISTS product_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES product_categories(id) ON DELETE SET NULL,
    product_name VARCHAR(150) NOT NULL,
    title VARCHAR(150) NOT NULL,
    certification VARCHAR(100) DEFAULT 'APEDA Certified',
    image_url VARCHAR(255) NOT NULL,
    short_desc TEXT NOT NULL,
    origin VARCHAR(100) DEFAULT 'India (Tamil Nadu)',
    available_packaging VARCHAR(255),
    bulk_packaging VARCHAR(255),
    customization VARCHAR(255) DEFAULT 'Available on request',
    private_label VARCHAR(255) DEFAULT 'Available on request',
    export_markets VARCHAR(255) DEFAULT 'Global Export Destinations',
    moq VARCHAR(100) NOT NULL,
    hs_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Daily Product Rates Table (Active Rates)
CREATE TABLE IF NOT EXISTS product_rates (
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rate NUMERIC(12, 4) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    unit VARCHAR(20) NOT NULL DEFAULT 'KG',
    effective_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Historical Product Rates Log (Non-Overwriting Immutable Ledger)
CREATE TABLE IF NOT EXISTS rate_history (
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(150) NOT NULL,
    rate NUMERIC(12, 4) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    effective_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_by VARCHAR(100) DEFAULT 'SYSTEM_ADMIN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Exchange Rates Snapshot Table
CREATE TABLE IF NOT EXISTS exchange_rates (
    id VARCHAR(100) PRIMARY KEY,
    base_currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    target_currency VARCHAR(10) NOT NULL,
    rate NUMERIC(14, 6) NOT NULL,
    effective_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Customers / B2B Importers Table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(100) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    business_email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(50),
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Inquiries / RFQ Master Table (Immutable Price Snapshot Bound)
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(100) PRIMARY KEY,
    customer_id VARCHAR(100) REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    country VARCHAR(100) NOT NULL,
    business_email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(50),
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(150) NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    quantity_unit VARCHAR(20) NOT NULL DEFAULT 'KG',
    rate_snapshot NUMERIC(12, 4) NOT NULL,
    rate_currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    rate_unit VARCHAR(20) NOT NULL DEFAULT 'KG',
    rate_effective_date DATE NOT NULL,
    estimated_value NUMERIC(14, 2) NOT NULL,
    destination_port VARCHAR(150) NOT NULL,
    incoterm_preference VARCHAR(100),
    packaging_preference VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    submission_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Inquiry Items Detail Table
CREATE TABLE IF NOT EXISTS inquiry_items (
    id VARCHAR(100) PRIMARY KEY,
    inquiry_id VARCHAR(100) NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE SET NULL,
    item_description TEXT NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    unit_rate_snapshot NUMERIC(12, 4) NOT NULL,
    line_total NUMERIC(14, 2) NOT NULL
);

-- 9. Quotations Master Table
CREATE TABLE IF NOT EXISTS quotations (
    id VARCHAR(100) PRIMARY KEY,
    quotation_number VARCHAR(50) UNIQUE NOT NULL,
    inquiry_id VARCHAR(100) REFERENCES inquiries(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    customer_email VARCHAR(150) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    quantity_unit VARCHAR(20) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    incoterm VARCHAR(50) NOT NULL,
    destination_port VARCHAR(150) NOT NULL,
    unit_rate NUMERIC(12, 4) NOT NULL,
    subtotal NUMERIC(14, 2) NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL,
    exchange_rate_snapshot NUMERIC(14, 6) DEFAULT 1.0,
    payment_terms TEXT NOT NULL,
    delivery_terms TEXT NOT NULL,
    validity_days INT DEFAULT 15,
    issue_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Quotation Items Detail Table
CREATE TABLE IF NOT EXISTS quotation_items (
    id VARCHAR(100) PRIMARY KEY,
    quotation_id VARCHAR(100) NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    unit_price NUMERIC(12, 4) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL
);

-- 11. Quotation Export Charges Breakdown Table
CREATE TABLE IF NOT EXISTS quotation_charges (
    id VARCHAR(100) PRIMARY KEY,
    quotation_id VARCHAR(100) NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
    packaging_charge NUMERIC(12, 2) DEFAULT 0.00,
    inland_transport NUMERIC(12, 2) DEFAULT 0.00,
    documentation_fee NUMERIC(12, 2) DEFAULT 0.00,
    ocean_freight NUMERIC(12, 2) DEFAULT 0.00,
    marine_insurance NUMERIC(12, 2) DEFAULT 0.00,
    other_charges NUMERIC(12, 2) DEFAULT 0.00
);

-- 12. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'SUPER_ADMIN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Rapid Querying
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_submission ON inquiries(submission_timestamp);
CREATE INDEX IF NOT EXISTS idx_rate_history_product ON rate_history(product_id);
CREATE INDEX IF NOT EXISTS idx_quotations_number ON quotations(quotation_number);
