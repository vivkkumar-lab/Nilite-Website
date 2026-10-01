/**
 * NILITE EXPORTS - MULTI-CURRENCY CONVERSION & EXCHANGE RATE SNAPSHOT ENGINE
 * Supported Currencies: INR (₹), USD ($), EUR (€), AED (د.إ), GBP (£), AUD (A$), CAD (C$), SAR (SR)
 */

const DEFAULT_EXCHANGE_RATES = [
  { currency: 'INR', symbol: '₹', rateToUSD: 0.012, name: 'Indian Rupee', effectiveDate: '2026-10-01' },
  { currency: 'USD', symbol: '$', rateToUSD: 1.0, name: 'US Dollar', effectiveDate: '2026-10-01' },
  { currency: 'EUR', symbol: '€', rateToUSD: 1.08, name: 'Euro', effectiveDate: '2026-10-01' },
  { currency: 'AED', symbol: 'د.إ', rateToUSD: 0.27, name: 'UAE Dirham', effectiveDate: '2026-10-01' },
  { currency: 'GBP', symbol: '£', rateToUSD: 1.30, name: 'British Pound', effectiveDate: '2026-10-01' },
  { currency: 'AUD', symbol: 'A$', rateToUSD: 0.67, name: 'Australian Dollar', effectiveDate: '2026-10-01' },
  { currency: 'CAD', symbol: 'C$', rateToUSD: 0.74, name: 'Canadian Dollar', effectiveDate: '2026-10-01' },
  { currency: 'SAR', symbol: 'SR', rateToUSD: 0.27, name: 'Saudi Riyal', effectiveDate: '2026-10-01' }
];

// Initialize and Retrieve Stored Exchange Rates
function getStoredExchangeRates() {
  const stored = localStorage.getItem("nilite_exchange_rates");
  if (!stored) {
    localStorage.setItem("nilite_exchange_rates", JSON.stringify(DEFAULT_EXCHANGE_RATES));
    return DEFAULT_EXCHANGE_RATES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_EXCHANGE_RATES;
  }
}

// Convert amount between currencies using active or snapshot exchange rates
function convertCurrency(amount, fromCurrency, toCurrency, customSnapshot) {
  const amt = parseFloat(amount) || 0;
  if (fromCurrency === toCurrency) return amt;

  const rates = customSnapshot || getStoredExchangeRates();

  const fromObj = rates.find(r => r.currency === fromCurrency) || { rateToUSD: 1.0 };
  const toObj = rates.find(r => r.currency === toCurrency) || { rateToUSD: 1.0 };

  // Amount in USD
  const amountInUSD = amt * (fromObj.rateToUSD || 1.0);
  // Amount in target currency
  const converted = amountInUSD / (toObj.rateToUSD || 1.0);

  return parseFloat(converted.toFixed(2));
}

// Get Currency Symbol
function getCurrencySymbol(curr) {
  const rates = getStoredExchangeRates();
  const found = rates.find(r => r.currency === (curr || '').toUpperCase());
  if (found && found.symbol) return found.symbol;

  switch ((curr || 'INR').toUpperCase()) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'AED': return 'د.إ ';
    case 'GBP': return '£';
    case 'AUD': return 'A$';
    case 'CAD': return 'C$';
    case 'SAR': return 'SR ';
    case 'INR':
    default: return '₹';
  }
}

// Format formatted money string (e.g. $1,250.00 or ₹92,500)
function formatCurrencyStr(amount, currency) {
  const sym = getCurrencySymbol(currency);
  const amt = parseFloat(amount) || 0;
  
  if (currency === 'INR') {
    return `${sym}${Math.round(amt).toLocaleString('en-IN')}`;
  }
  
  return `${sym}${amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Global exports
window.getStoredExchangeRates = getStoredExchangeRates;
window.convertCurrency = convertCurrency;
window.getCurrencySymbol = getCurrencySymbol;
window.formatCurrencyStr = formatCurrencyStr;
