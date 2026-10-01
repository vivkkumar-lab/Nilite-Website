/**
 * NILITE EXPORTS - DAILY PRODUCT RATE MANAGEMENT SYSTEM
 * Dynamic price history tracking, snapshotting, and quotation rate calculations.
 */

const DEFAULT_DAILY_RATES = [
  {
    id: "rate_20261001_01",
    productId: "semi-husked-coconut",
    productName: "Semi Husked Coconut",
    rate: 32,
    currency: "INR",
    unit: "Piece",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_02",
    productId: "coco-peat-5kg-low-ec",
    productName: "Coco Peat 5kg Blocks (Low EC / Washed)",
    rate: 2.40,
    currency: "USD",
    unit: "Piece",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_03",
    productId: "turmeric-finger",
    productName: "Turmeric Finger (Single Origin Salem Grade)",
    rate: 185,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_04",
    productId: "fresh-green-chilli",
    productName: "Fresh Green Chilli (G4 / Teja)",
    rate: 65,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_05",
    productId: "fresh-red-onion",
    productName: "Fresh Red Onion (45mm+ Export Grade)",
    rate: 42,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_06",
    productId: "fresh-elephant-foot-yam",
    productName: "Fresh Elephant Foot Yam (Suran)",
    rate: 38,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_07",
    productId: "small-onion-shallots",
    productName: "Small Onion / Shallots (Pods)",
    rate: 75,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_08",
    productId: "dry-red-chilli",
    productName: "Dry Red Chilli (S17 Teja / Sanam)",
    rate: 210,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_09",
    productId: "green-cardamom",
    productName: "Green Cardamom (8mm Bold Pods)",
    rate: 2400,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_10",
    productId: "black-pepper",
    productName: "Malabar Black Pepper (550 GL Bold)",
    rate: 680,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_11",
    productId: "nendran-banana-chips",
    productName: "South Indian Nendran Banana Chips",
    rate: 280,
    currency: "INR",
    unit: "KG",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_12",
    productId: "coco-peat-growbags",
    productName: "Coco Peat Growbags (Planted Slab)",
    rate: 3.20,
    currency: "USD",
    unit: "Piece",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_13",
    productId: "coco-husk-chips",
    productName: "Coco Husk Chips (Sieved 12-18mm)",
    rate: 1.90,
    currency: "USD",
    unit: "Piece",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_14",
    productId: "coir-fibre-bales",
    productName: "Coir Fibre Bales (Raw Brown Mattress)",
    rate: 220,
    currency: "USD",
    unit: "MT",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  },
  {
    id: "rate_20261001_15",
    productId: "pure-coconut-oil",
    productName: "Pure Cold-Pressed Coconut Oil",
    rate: 220,
    currency: "INR",
    unit: "Litre",
    effectiveDate: "2026-10-01",
    active: true,
    createdAt: "2026-10-01T08:00:00.000Z"
  }
];

// Initialize and Retrieve Rates
function getStoredDailyRates() {
  const stored = localStorage.getItem("nilite_daily_rates");
  if (!stored) {
    localStorage.setItem("nilite_daily_rates", JSON.stringify(DEFAULT_DAILY_RATES));
    return DEFAULT_DAILY_RATES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_DAILY_RATES;
  }
}

// Save All Rates
function saveDailyRatesToStorage(ratesArray) {
  localStorage.setItem("nilite_daily_rates", JSON.stringify(ratesArray));
}

/**
 * Retrieve the active rate applicable for a product at the exact submission date.
 * Never modifies history!
 */
function getActiveRateForProduct(productId, dateStr) {
  const rates = getStoredDailyRates();
  const targetDate = dateStr || new Date().toISOString().slice(0, 10);

  // Filter rates for this product that are active and effective on or before targetDate
  const matching = rates.filter(r => {
    return (r.productId === productId || r.productName === productId) &&
           r.active !== false &&
           (r.effectiveDate <= targetDate);
  });

  if (matching.length > 0) {
    // Sort descending by effectiveDate, then by createdAt ID
    matching.sort((a, b) => {
      if (a.effectiveDate !== b.effectiveDate) {
        return b.effectiveDate.localeCompare(a.effectiveDate);
      }
      return b.id.localeCompare(a.id);
    });
    return matching[0];
  }

  // Fallback if no matching rate log found
  const anyProductRate = rates.find(r => r.productId === productId || r.productName === productId);
  if (anyProductRate) return anyProductRate;

  // Ultimate fallback
  return {
    id: `rate_fallback_${Date.now()}`,
    productId: productId,
    productName: productId,
    rate: 100,
    currency: "INR",
    unit: "KG",
    effectiveDate: targetDate,
    active: true,
    createdAt: new Date().toISOString()
  };
}

/**
 * Add a new rate record to historical database.
 * Deactivates older active rates for the same product to ensure single active rate per date.
 * NEVER deletes or overwrites past records!
 */
function addDailyRateRecord(newRateData) {
  const rates = getStoredDailyRates();

  // Deactivate previous active rates for this product if activating new one
  if (newRateData.active) {
    rates.forEach(r => {
      if (r.productId === newRateData.productId || r.productName === newRateData.productName) {
        r.active = false;
      }
    });
  }

  const rateRecord = {
    id: `rate_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    productId: newRateData.productId,
    productName: newRateData.productName,
    rate: parseFloat(newRateData.rate),
    currency: newRateData.currency || "INR",
    unit: newRateData.unit || "KG",
    effectiveDate: newRateData.effectiveDate || new Date().toISOString().slice(0, 10),
    active: newRateData.active !== false,
    createdAt: new Date().toISOString()
  };

  rates.unshift(rateRecord);
  saveDailyRatesToStorage(rates);
  return rateRecord;
}

/**
 * Toggle rate active status in history log
 */
function toggleRateActiveStatus(rateId) {
  const rates = getStoredDailyRates();
  const target = rates.find(r => r.id === rateId);
  if (target) {
    target.active = !target.active;
    saveDailyRatesToStorage(rates);
  }
}

/**
 * Currency Symbol Formatting Helper
 */
function getCurrencySymbol(curr) {
  switch ((curr || 'INR').toUpperCase()) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'AED': return 'د.إ ';
    case 'GBP': return '£';
    case 'INR':
    default: return '₹';
  }
}

/**
 * Format Price Snapshot string (e.g. ₹185 / KG)
 */
function formatPriceSnapshotStr(rate, currency, unit) {
  const sym = getCurrencySymbol(currency);
  const formattedRate = Number(rate).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  return `${sym}${formattedRate} / ${unit || 'KG'}`;
}

/**
 * Format Total Estimated Value string (e.g. ₹92,500)
 */
function formatEstimatedValueStr(val, currency) {
  const sym = getCurrencySymbol(currency);
  const formattedVal = Math.round(Number(val)).toLocaleString('en-IN');
  return `${sym}${formattedVal}`;
}

// Make functions globally available
window.getStoredDailyRates = getStoredDailyRates;
window.getActiveRateForProduct = getActiveRateForProduct;
window.addDailyRateRecord = addDailyRateRecord;
window.toggleRateActiveStatus = toggleRateActiveStatus;
window.getCurrencySymbol = getCurrencySymbol;
window.formatPriceSnapshotStr = formatPriceSnapshotStr;
window.formatEstimatedValueStr = formatEstimatedValueStr;
