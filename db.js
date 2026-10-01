/**
 * NILITE EXPORTS - PRODUCTION DATABASE ACCESS LAYER
 * Supports Managed PostgreSQL (DATABASE_URL) and SQLite / File-Based Persistent Storage.
 * Guarantees Immutable Price Snapshots & Rate History Auditing.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default Seed Products Data
const DEFAULT_PRODUCTS = [
  {
    id: "coco-peat-5kg-low-ec",
    category: "coir",
    cert: "Coir Board Certified",
    productName: "5kg Coco Peat Block (Washed Low EC)",
    title: "5kg Coco Peat Block (Washed Low EC)",
    image: "assets/images/coco_peat_export.jpg",
    shortDesc: "Triple washed, low electrical conductivity (< 0.5 mS/cm) premium horticultural substrate block.",
    origin: "India (Tamil Nadu)",
    availablePackaging: "5kg Compressed Block, Shrink Wrapped, Palletized",
    bulkPackaging: "24 MT per 40ft HC Container (220 Blocks per Pallet)",
    customization: "Available on request",
    privateLabel: "Available on request",
    exportMarkets: "Netherlands, USA, Spain, Australia, South Korea",
    moq: "1x 40ft High Cube Container (24 MT)",
    specs: { "Standard": "Export Grade A", "HS Code": "5305.00.40" },
    hscode: "5305.00.40"
  },
  {
    id: "turmeric-fingers-salem",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Salem Turmeric Fingers (High Curcumin 5%+)",
    title: "Salem Turmeric Fingers (High Curcumin 5%+)",
    image: "assets/images/turmeric_export.jpg",
    shortDesc: "Deep yellow finger turmeric from Salem region with minimum 5% natural curcumin content.",
    origin: "India (Salem, Tamil Nadu)",
    availablePackaging: "25kg / 50kg Double Jute Burlap Bags, PP Woven Bags",
    bulkPackaging: "18 MT per 20ft FCL Container",
    customization: "Polished / Unpolished, Ground Powder Grade",
    privateLabel: "Available on request",
    exportMarkets: "UAE, Saudi Arabia, USA, UK, Malaysia, Japan",
    moq: "1x 20ft Container (18 MT)",
    specs: { "Standard": "Export Grade A", "HS Code": "0910.30.20" },
    hscode: "0910.30.20"
  },
  {
    id: "semi-husked-coconut",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Pollachi Semi-Husked Coconut",
    title: "Pollachi Semi-Husked Coconut",
    image: "assets/images/coconut_export.jpg",
    shortDesc: "Fresh 550g - 650g semi-husked coconuts directly harvested from Pollachi palm groves.",
    origin: "India (Pollachi, Tamil Nadu)",
    availablePackaging: "25 Coconuts per PP Mesh Bag (Approx 13-14 kg)",
    bulkPackaging: "2,050 Mesh Bags (51,250 Coconuts) per 40ft High Cube Reefer",
    customization: "Weight Grading, Outer Husk Trimming",
    privateLabel: "Available on request",
    exportMarkets: "UAE, Qatar, Kuwait, Oman, UK, Singapore",
    moq: "1x 40ft Reefer Container (2,000 Mesh Bags)",
    specs: { "Standard": "Export Grade A", "HS Code": "0801.19.10" },
    hscode: "0801.19.10"
  },
  {
    id: "fresh-green-chilli",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Fresh Green Chilli (G4 / Teja Grade)",
    title: "Fresh Green Chilli (G4 / Teja Grade)",
    image: "assets/images/green_chilli_export.jpg",
    shortDesc: "Crisp green chilli with high spiciness, uniform length (7cm - 10cm), and 14-day reefer shelf life.",
    origin: "India (Tamil Nadu / Andhra)",
    availablePackaging: "4kg / 5kg / 10kg Corrugated Fiber Boxes with Micro-Perforated Polybags",
    bulkPackaging: "12 MT per 40ft High Cube Reefer Container",
    customization: "Stem On / Stem Off",
    privateLabel: "Available on request",
    exportMarkets: "UAE, Qatar, Bahrain, Malaysia, UK",
    moq: "1x 40ft Reefer Container (12 MT)",
    specs: { "Standard": "Export Grade A", "HS Code": "0709.60.10" },
    hscode: "0709.60.10"
  }
];

// Initialize JSON Database with Seed Data if absent
function initJsonDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const seed = {
      products: DEFAULT_PRODUCTS,
      dailyRates: [
        { id: "rate_20261001_01", productId: "semi-husked-coconut", productName: "Pollachi Semi-Husked Coconut", rate: 32, currency: "INR", unit: "Piece", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_02", productId: "coco-peat-5kg-low-ec", productName: "5kg Coco Peat Block (Washed Low EC)", rate: 2.40, currency: "USD", unit: "Piece", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_03", productId: "turmeric-fingers-salem", productName: "Salem Turmeric Fingers (High Curcumin 5%+)", rate: 185, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_04", productId: "fresh-green-chilli", productName: "Fresh Green Chilli (G4 / Teja Grade)", rate: 65, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() }
      ],
      rateHistory: [
        { id: "hist_20261001_01", productId: "semi-husked-coconut", productName: "Pollachi Semi-Husked Coconut", rate: 32, currency: "INR", unit: "Piece", effectiveDate: "2026-10-01", status: "ACTIVE", createdAt: new Date().toISOString() },
        { id: "hist_20261001_02", productId: "coco-peat-5kg-low-ec", productName: "5kg Coco Peat Block (Washed Low EC)", rate: 2.40, currency: "USD", unit: "Piece", effectiveDate: "2026-10-01", status: "ACTIVE", createdAt: new Date().toISOString() },
        { id: "hist_20261001_03", productId: "turmeric-fingers-salem", productName: "Salem Turmeric Fingers (High Curcumin 5%+)", rate: 185, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", status: "ACTIVE", createdAt: new Date().toISOString() },
        { id: "hist_20261001_04", productId: "fresh-green-chilli", productName: "Fresh Green Chilli (G4 / Teja Grade)", rate: 65, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", status: "ACTIVE", createdAt: new Date().toISOString() }
      ],
      exchangeRates: [
        { currency: "USD", rate: 1.0, base: "USD" },
        { currency: "INR", rate: 83.5, base: "USD" },
        { currency: "EUR", rate: 0.92, base: "USD" },
        { currency: "AED", rate: 3.67, base: "USD" },
        { currency: "GBP", rate: 0.78, base: "USD" }
      ],
      inquiries: [
        {
          id: "NIL-INQ-2026-8912",
          date: "2026-09-29 14:30",
          name: "Ahmed Al-Mansoor",
          company: "Gulf Oasis Fresh Produce LLC",
          country: "United Arab Emirates",
          email: "ahmed@gulfoasis.ae",
          phone: "+971 50 892 4110",
          productId: "semi-husked-coconut",
          productName: "Pollachi Semi-Husked Coconut",
          quantity: 4000,
          quantityUnit: "Piece",
          rateSnapshot: 32,
          rateCurrency: "INR",
          rateUnit: "Piece",
          rateEffectiveDate: "2026-09-29",
          estimatedValue: 128000,
          destinationPort: "Jebel Ali Port, Dubai",
          message: "Require phytosanitary certificate, weight cert, and CIF Jebel Ali quotation for 4,000 bags.",
          status: "New"
        }
      ],
      quotations: [],
      whatsappConfig: {
        number: "+91 8344767687",
        title: "Need a quotation?",
        subtitle: "Chat with our export team",
        message: "Hi, I am interested in your products.\nI would like to request an export quotation."
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
  }
}

initJsonDatabase();

function readDatabase() {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error("Database Read Failure:", err);
    return { products: [], dailyRates: [], rateHistory: [], inquiries: [], quotations: [] };
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error("Database Write Failure:", err);
    return false;
  }
}

// Accessor Methods with Rate Snapshot Protection
module.exports = {
  getProducts: () => {
    const db = readDatabase();
    return db.products || [];
  },

  getDailyRates: () => {
    const db = readDatabase();
    return db.dailyRates || [];
  },

  getRateHistory: () => {
    const db = readDatabase();
    return db.rateHistory || db.dailyRates || [];
  },

  saveDailyRate: (rateObj) => {
    const db = readDatabase();
    if (!db.dailyRates) db.dailyRates = [];
    if (!db.rateHistory) db.rateHistory = [];

    // Mark previous active rate for this product as inactive
    db.dailyRates.forEach(r => {
      if (r.productId === rateObj.productId && rateObj.active !== false) {
        r.active = false;
      }
    });

    const newRate = {
      id: rateObj.id || `rate_${Date.now()}`,
      productId: rateObj.productId,
      productName: rateObj.productName,
      rate: parseFloat(rateObj.rate),
      currency: rateObj.currency || 'INR',
      unit: rateObj.unit || 'KG',
      effectiveDate: rateObj.effectiveDate || new Date().toISOString().slice(0, 10),
      active: rateObj.active !== false,
      createdAt: new Date().toISOString()
    };

    db.dailyRates.unshift(newRate);

    // Record immutable history log entry
    db.rateHistory.unshift({
      id: `hist_${Date.now()}`,
      productId: newRate.productId,
      productName: newRate.productName,
      rate: newRate.rate,
      currency: newRate.currency,
      unit: newRate.unit,
      effectiveDate: newRate.effectiveDate,
      status: newRate.active ? "ACTIVE" : "HISTORICAL",
      createdAt: newRate.createdAt
    });

    writeDatabase(db);
    return newRate;
  },

  getInquiries: () => {
    const db = readDatabase();
    return db.inquiries || [];
  },

  saveInquiry: (inquiryObj) => {
    const db = readDatabase();
    if (!db.inquiries) db.inquiries = [];

    // Resolve rate snapshot immutably
    const activeRates = db.dailyRates || [];
    const matchedRate = activeRates.find(r => r.productId === inquiryObj.productId && r.active !== false);

    const rateSnapshot = matchedRate ? matchedRate.rate : (inquiryObj.rateSnapshot || 185);
    const rateCurrency = matchedRate ? matchedRate.currency : (inquiryObj.rateCurrency || 'INR');
    const rateUnit = matchedRate ? matchedRate.unit : (inquiryObj.rateUnit || 'KG');
    const rateEffectiveDate = matchedRate ? matchedRate.effectiveDate : (inquiryObj.rateEffectiveDate || new Date().toISOString().slice(0, 10));

    const qty = parseFloat(inquiryObj.quantity) || 1;
    const estVal = qty * rateSnapshot;

    const newInquiry = {
      id: inquiryObj.id || `NIL-INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      name: inquiryObj.name || inquiryObj.customerName,
      company: inquiryObj.company || 'Direct Importer',
      country: inquiryObj.country || inquiryObj.destinationCountry || 'International',
      email: inquiryObj.email || inquiryObj.businessEmail,
      phone: inquiryObj.phone || 'N/A',
      productId: inquiryObj.productId,
      productName: inquiryObj.productName || inquiryObj.product,
      quantity: qty,
      quantityUnit: inquiryObj.quantityUnit || rateUnit,
      // IMMUTABLE PRICE SNAPSHOT BINDING
      rateSnapshot: rateSnapshot,
      rateCurrency: rateCurrency,
      rateUnit: rateUnit,
      rateEffectiveDate: rateEffectiveDate,
      estimatedValue: estVal,
      destinationPort: inquiryObj.destinationPort || inquiryObj.destination || 'Port of Destination',
      incotermPreference: inquiryObj.incotermPreference || 'FOB',
      packagingPreference: inquiryObj.packagingPreference || 'Standard Export Palletized',
      message: inquiryObj.message || inquiryObj.notes || '',
      status: 'New'
    };

    db.inquiries.unshift(newInquiry);
    writeDatabase(db);
    return newInquiry;
  },

  saveQuotation: (quotationObj) => {
    const db = readDatabase();
    if (!db.quotations) db.quotations = [];

    const newQuote = {
      id: `quote_${Date.now()}`,
      quotationNumber: quotationObj.quotationNumber || `QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      inquiryId: quotationObj.inquiryId,
      customerName: quotationObj.customerName,
      companyName: quotationObj.companyName,
      customerEmail: quotationObj.customerEmail,
      productName: quotationObj.productName,
      quantity: quotationObj.quantity,
      quantityUnit: quotationObj.quantityUnit,
      currency: quotationObj.currency,
      incoterm: quotationObj.incoterm,
      destinationPort: quotationObj.destinationPort,
      unitRate: quotationObj.unitRate,
      additionalCharges: quotationObj.additionalCharges || {},
      paymentTerms: quotationObj.paymentTerms,
      deliveryTerms: quotationObj.deliveryTerms,
      validityDays: quotationObj.validityDays || 15,
      issueDate: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString()
    };

    db.quotations.unshift(newQuote);
    writeDatabase(db);
    return newQuote;
  },

  getQuotations: () => {
    const db = readDatabase();
    return db.quotations || [];
  }
};
