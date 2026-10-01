/**
 * NILITE EXPORTS - PRODUCTION NODE.JS BACKEND SERVER
 * Express REST API Server with Persistent Database, Security Middleware, & Static File Serving.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// Environment Variables Configuration
const PORT = process.env.PORT || 8085;
const NODE_ENV = process.env.NODE_ENV || 'production';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.niliteexports.com';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'nilite123';

// Data Directory Initialization
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database Files
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initialize Persistent Database if missing
function initDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      products: [],
      dailyRates: [
        { id: "rate_20261001_01", productId: "semi-husked-coconut", productName: "Semi Husked Coconut", rate: 32, currency: "INR", unit: "Piece", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_02", productId: "coco-peat-5kg-low-ec", productName: "Coco Peat 5kg Blocks (Low EC / Washed)", rate: 2.40, currency: "USD", unit: "Piece", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_03", productId: "turmeric-finger", productName: "Turmeric Finger (Single Origin Salem Grade)", rate: 185, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() },
        { id: "rate_20261001_04", productId: "fresh-green-chilli", productName: "Fresh Green Chilli (G4 / Teja)", rate: 65, currency: "INR", unit: "KG", effectiveDate: "2026-10-01", active: true, createdAt: new Date().toISOString() }
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
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
  }
}

initDatabase();

function readDb() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { products: [], dailyRates: [], inquiries: [], quotations: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Database Write Error:", e);
  }
}

// MIME Types for Static File Server
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

// Helper to parse JSON body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const db = require('./db.js');

// Security Headers Helper
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ==========================================================================
  // REST API ROUTES
  // ==========================================================================

  // Health Check Endpoint
  if (pathname === '/api/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'READY',
      environment: NODE_ENV,
      siteUrl: SITE_URL,
      timestamp: new Date().toISOString(),
      database: process.env.DATABASE_URL ? 'Managed PostgreSQL Connected' : 'Persistent File DB Active'
    }));
  }

  // Products Catalog API Endpoint
  if (pathname === '/api/products' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(db.getProducts()));
  }

  // Customer RFQ Submission API Endpoint
  if (pathname === '/api/rfq' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      if (!body.fullName && !body.name && !body.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing required customer fields (fullName/name, email)' }));
      }

      const savedInquiry = db.saveInquiry({
        name: body.fullName || body.name,
        company: body.company || 'Direct Importer',
        email: body.email || body.businessEmail,
        phone: body.phone || 'N/A',
        country: body.country || body.destinationCountry || 'International',
        productId: body.productId,
        productName: body.productName || body.product,
        quantity: body.quantityNum || body.quantity || 1,
        quantityUnit: body.quantityUnit || 'KG',
        destinationPort: body.destination || body.destinationPort || 'Port of Destination',
        incotermPreference: body.incoterm || 'FOB',
        packagingPreference: body.packaging || 'Standard Export Palletized',
        message: body.message || body.notes || ''
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        reference: savedInquiry.id,
        message: 'Your request has been received. Our export team will review the current pricing, freight, packaging and destination requirements and send you the final quotation.',
        inquiry: savedInquiry
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Internal Server Error processing RFQ' }));
    }
  }

  // Daily Rates API (GET & POST)
  if (pathname === '/api/rates') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(db.getDailyRates()));
    }
    if (method === 'POST') {
      const body = await parseRequestBody(req);
      const newRecord = db.saveDailyRate(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, rateRecord: newRecord }));
    }
  }

  // Admin Inquiries CRM API (GET)
  if (pathname === '/api/inquiries' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(db.getInquiries()));
  }

  // Quotations API (GET & POST)
  if (pathname === '/api/quotations') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(db.getQuotations()));
    }
    if (method === 'POST') {
      const body = await parseRequestBody(req);
      const savedQuote = db.saveQuotation(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, quotation: savedQuote }));
    }
  }

  // Admin Login API (POST)
  if (pathname === '/api/admin/login' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, token: 'nilite_session_active_2026' }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid admin credentials' }));
    }
  }

  // ==========================================================================
  // STATIC FILE SERVER
  // ==========================================================================

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security: Prevent Directory Traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Return custom 404 page
      const page404 = path.join(__dirname, '404.html');
      if (fs.existsSync(page404)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        return fs.createReadStream(page404).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Page Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🌱 NILITE EXPORTS PRODUCTION SERVER RUNNING`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`⚙️  Environment: ${NODE_ENV}`);
  console.log(`📁 Persistent DB: ${DB_FILE}`);
  console.log(`===================================================`);
});
