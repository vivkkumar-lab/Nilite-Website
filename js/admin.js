/**
 * NILITE EXPORTS - ADMIN & CMS PORTAL LOGIC
 * Full Client-Side CMS Engine for Products, Daily Rates, Inquiries, Blog, and WhatsApp Config
 */

document.addEventListener("DOMContentLoaded", () => {
  checkAdminSession();
  loadAdminStats();
  renderCmsRatesTables();
  renderCmsProductsTable();
  renderCmsInquiriesTable();
  renderCmsBlogTable();
});

// Admin Session Check
function checkAdminSession() {
  const isLogged = localStorage.getItem("nilite_admin_logged");
  const overlay = document.getElementById("login-overlay");
  const mainUI = document.getElementById("admin-main-ui");

  if (isLogged === "true") {
    if (overlay) overlay.style.display = "none";
    if (mainUI) mainUI.style.display = "block";
  } else {
    if (overlay) overlay.style.display = "flex";
    if (mainUI) mainUI.style.display = "none";
  }
}

// Login Handler
function handleAdminLogin(e) {
  e.preventDefault();
  const user = document.getElementById("admin-user").value.trim();
  const pass = document.getElementById("admin-pass").value.trim();
  const err = document.getElementById("login-error");

  if (user === "admin" && pass === "nilite123") {
    localStorage.setItem("nilite_admin_logged", "true");
    if (err) err.style.display = "none";
    checkAdminSession();
    loadAdminStats();
    renderCmsRatesTables();
  } else {
    if (err) err.style.display = "block";
  }
}

// Logout Handler
function handleAdminLogout() {
  localStorage.removeItem("nilite_admin_logged");
  checkAdminSession();
}

// Switch Tabs
function switchAdminTab(tabId) {
  const tabs = ["dashboard", "rates", "products", "inquiries", "blog", "whatsapp"];
  tabs.forEach(t => {
    const sec = document.getElementById(`sec-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (sec) sec.style.display = (t === tabId) ? "block" : "none";
    if (btn) {
      if (t === tabId) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  if (tabId === "rates") renderCmsRatesTables();
  if (tabId === "products") renderCmsProductsTable();
  if (tabId === "inquiries") renderCmsInquiriesTable();
  if (tabId === "blog") renderCmsBlogTable();
}

// Stats Counter
function loadAdminStats() {
  const countProd = document.getElementById("count-products");
  const countRates = document.getElementById("count-active-rates");
  const countRfq = document.getElementById("count-rfqs");
  const countNew = document.getElementById("count-new-rfqs");
  
  if (window.PRODUCTS_DATA && countProd) {
    countProd.textContent = window.PRODUCTS_DATA.length;
  }

  if (window.getStoredDailyRates && countRates) {
    const rates = window.getStoredDailyRates();
    const activeCount = rates.filter(r => r.active !== false).length;
    countRates.textContent = activeCount;
  }

  const rfqs = getStoredInquiries();
  if (countRfq) countRfq.textContent = rfqs.length;
  
  if (countNew) {
    const numNew = rfqs.filter(r => r.status === "New").length;
    countNew.textContent = numNew;
  }
}

/* ==========================================================================
   DAILY PRODUCT RATE MANAGEMENT (ADMIN ENGINE)
   ========================================================================== */

function renderCmsRatesTables() {
  const activeTbody = document.getElementById("active-rates-tbody");
  const historyTbody = document.getElementById("history-rates-tbody");
  if (!window.getStoredDailyRates) return;

  const rates = window.getStoredDailyRates();
  
  // Render Active Daily Rates Table
  if (activeTbody) {
    const activeRatesMap = {};
    rates.forEach(r => {
      if (r.active !== false && !activeRatesMap[r.productId]) {
        activeRatesMap[r.productId] = r;
      }
    });

    const activeList = Object.values(activeRatesMap);

    activeTbody.innerHTML = activeList.length === 0 ? `
      <tr><td colspan="7" style="text-align: center; color: #94a3b8;">No active rates set. Set a daily rate below.</td></tr>
    ` : activeList.map(r => {
      const formattedRate = window.formatPriceSnapshotStr ? window.formatPriceSnapshotStr(r.rate, r.currency, r.unit) : `${r.rate} ${r.currency}/${r.unit}`;
      return `
        <tr>
          <td style="font-weight: 700; color: #ffffff;">${r.productName}</td>
          <td style="font-size: 1.1rem; font-weight: 900; color: #dfba73;">${formattedRate}</td>
          <td><span class="admin-badge">${r.currency}</span></td>
          <td style="color: #cbd5e1;">${r.unit}</td>
          <td style="color: #60a5fa; font-family: monospace;">${r.effectiveDate}</td>
          <td><span style="background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid #10b981; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 800; font-size: 0.75rem;">ACTIVE</span></td>
          <td>
            <button class="btn-action btn-edit" onclick="openAddRateModal('${r.productId}')">Update Rate</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Render Complete Historical Rates Log Table (Non-Overwriting)
  if (historyTbody) {
    historyTbody.innerHTML = rates.length === 0 ? `
      <tr><td colspan="9" style="text-align: center; color: #94a3b8;">No rate log history available.</td></tr>
    ` : rates.map(r => {
      const formattedRate = window.formatPriceSnapshotStr ? window.formatPriceSnapshotStr(r.rate, r.currency, r.unit) : `${r.rate} ${r.currency}`;
      const statusBadge = r.active !== false 
        ? `<span style="background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid #10b981; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 800; font-size: 0.75rem;">ACTIVE</span>`
        : `<span style="background: rgba(100,116,139,0.2); color: #94a3b8; border: 1px solid #64748b; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 700; font-size: 0.75rem;">HISTORICAL</span>`;

      return `
        <tr>
          <td style="font-family: monospace; font-size: 0.78rem; color: #94a3b8;">${r.id}</td>
          <td style="font-weight: 700; color: #ffffff;">${r.productName}</td>
          <td style="font-weight: 800; color: #dfba73;">${formattedRate}</td>
          <td>${r.currency}</td>
          <td>${r.unit}</td>
          <td style="color: #38bdf8; font-family: monospace;">${r.effectiveDate}</td>
          <td style="font-size: 0.78rem; color: #94a3b8;">${(r.createdAt || '').replace('T', ' ').slice(0, 16)}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn-action btn-edit" onclick="toggleRateActiveStatusAdmin('${r.id}')">${r.active !== false ? 'Deactivate' : 'Activate'}</button>
          </td>
        </tr>
      `;
    }).join('');
  }
}

function openAddRateModal(presetProductId) {
  const prodSelect = document.getElementById("rate-prod-select");
  const dateInput = document.getElementById("rate-effective-date");
  const modalHeading = document.getElementById("rate-modal-heading");

  if (modalHeading) modalHeading.textContent = "Set Daily Product Rate";

  if (prodSelect && window.PRODUCTS_DATA) {
    prodSelect.innerHTML = window.PRODUCTS_DATA.map(p => `
      <option value="${p.id}" ${presetProductId === p.id ? 'selected' : ''}>${p.productName}</option>
    `).join('');
  }

  if (dateInput) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  const modal = document.getElementById("rate-modal-overlay");
  if (modal) modal.classList.add("active");
}

function handleSaveDailyRate(e) {
  e.preventDefault();
  const prodSelect = document.getElementById("rate-prod-select");
  const selectedOption = prodSelect.options[prodSelect.selectedIndex];
  const productId = prodSelect.value;
  const productName = selectedOption ? selectedOption.text : productId;
  const rate = document.getElementById("rate-amount").value;
  const currency = document.getElementById("rate-currency").value;
  const unit = document.getElementById("rate-unit").value;
  const effectiveDate = document.getElementById("rate-effective-date").value;
  const active = document.getElementById("rate-active-check").checked;

  if (!productId || !rate || !effectiveDate) {
    alert("Please complete all required fields for setting the daily rate.");
    return;
  }

  window.addDailyRateRecord({
    productId: productId,
    productName: productName,
    rate: rate,
    currency: currency,
    unit: unit,
    effectiveDate: effectiveDate,
    active: active
  });

  closeCmsModal("rate-modal-overlay");
  renderCmsRatesTables();
  loadAdminStats();
  alert(`Daily Rate for "${productName}" set to ${currency} ${rate}/${unit} effective ${effectiveDate}!`);
}

function toggleRateActiveStatusAdmin(rateId) {
  if (window.toggleRateActiveStatus) {
    window.toggleRateActiveStatus(rateId);
    renderCmsRatesTables();
    loadAdminStats();
  }
}


/* ==========================================================================
   PRODUCTS CMS ENGINE
   ========================================================================== */

function renderCmsProductsTable() {
  const tbody = document.getElementById("cms-products-tbody");
  if (!tbody || !window.PRODUCTS_DATA) return;

  tbody.innerHTML = window.PRODUCTS_DATA.map(p => `
    <tr>
      <td><img src="${p.image}" alt="${p.productName}" style="width: 50px; height: 40px; object-fit: cover; border-radius: 6px;"></td>
      <td style="font-weight: 700; color: #ffffff;">${p.productName}</td>
      <td><span class="admin-badge">${p.category === 'coir' ? 'Coir Board' : 'APEDA Agro'}</span></td>
      <td>${p.cert}</td>
      <td style="color: #00e599;">${p.origin.split('(')[0]}</td>
      <td>${p.moq.split('(')[0]}</td>
      <td style="font-family: monospace;">${p.hscode}</td>
      <td>
        <button class="btn-action btn-edit" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn-action btn-delete" onclick="deleteProduct('${p.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openAddProductModal() {
  document.getElementById("prod-modal-heading").textContent = "Add New Export Product";
  document.getElementById("prod-edit-id").value = "";
  document.getElementById("product-form").reset();
  document.getElementById("product-modal-overlay").classList.add("active");
}

function editProduct(productId) {
  const p = window.PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  document.getElementById("prod-modal-heading").textContent = `Edit Product: ${p.productName}`;
  document.getElementById("prod-edit-id").value = p.id;
  document.getElementById("prod-name").value = p.productName;
  document.getElementById("prod-cat").value = p.category;
  document.getElementById("prod-cert").value = p.cert;
  document.getElementById("prod-img").value = p.image;
  document.getElementById("prod-desc").value = p.shortDesc;
  document.getElementById("prod-origin").value = p.origin;
  document.getElementById("prod-pack").value = p.availablePackaging;
  document.getElementById("prod-bulk").value = p.bulkPackaging;
  document.getElementById("prod-moq").value = p.moq;
  document.getElementById("prod-hs").value = p.hscode;

  document.getElementById("product-modal-overlay").classList.add("active");
}

function handleSaveProduct(e) {
  e.preventDefault();
  const editId = document.getElementById("prod-edit-id").value;
  const name = document.getElementById("prod-name").value.trim();
  const cat = document.getElementById("prod-cat").value;
  const cert = document.getElementById("prod-cert").value.trim();
  const img = document.getElementById("prod-img").value.trim();
  const desc = document.getElementById("prod-desc").value.trim();
  const origin = document.getElementById("prod-origin").value.trim();
  const pack = document.getElementById("prod-pack").value.trim();
  const bulk = document.getElementById("prod-bulk").value.trim();
  const moq = document.getElementById("prod-moq").value.trim();
  const hs = document.getElementById("prod-hs").value.trim();

  if (editId) {
    const p = window.PRODUCTS_DATA.find(item => item.id === editId);
    if (p) {
      p.productName = name;
      p.title = name;
      p.category = cat;
      p.cert = cert;
      p.image = img;
      p.shortDesc = desc;
      p.origin = origin;
      p.availablePackaging = pack;
      p.bulkPackaging = bulk;
      p.moq = moq;
      p.hscode = hs;
    }
  } else {
    const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.PRODUCTS_DATA.unshift({
      id: newId,
      category: cat,
      cert: cert,
      productName: name,
      title: name,
      image: img,
      shortDesc: desc,
      origin: origin,
      availablePackaging: pack,
      bulkPackaging: bulk,
      customization: "Available on request",
      privateLabel: "Available on request",
      exportMarkets: "Global Export Destinations",
      moq: moq,
      specs: {
        "Standard": "Export Grade A",
        "HS Code": hs
      },
      hscode: hs
    });
  }

  closeCmsModal("product-modal-overlay");
  renderCmsProductsTable();
  loadAdminStats();
  alert("Product saved successfully!");
}

function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product from the catalog?")) {
    const idx = window.PRODUCTS_DATA.findIndex(p => p.id === productId);
    if (idx !== -1) {
      window.PRODUCTS_DATA.splice(idx, 1);
      renderCmsProductsTable();
      loadAdminStats();
    }
  }
}

/* ==========================================================================
   DEFAULT B2B LEADS WITH PRICE SNAPSHOTS
   ========================================================================== */

const DEFAULT_INQUIRIES = [
  {
    id: "NIL-INQ-2026-8912",
    date: "2026-09-29 14:30",
    name: "Ahmed Al-Mansoor",
    company: "Gulf Oasis Fresh Produce LLC",
    country: "United Arab Emirates",
    email: "ahmed@gulfoasis.ae",
    phone: "+971 50 892 4110",
    productId: "semi-husked-coconut",
    product: "Pollachi Semi-Husked Coconut",
    productName: "Pollachi Semi-Husked Coconut",
    quantity: 4000,
    quantityUnit: "Piece",
    rateSnapshot: 32,
    rateCurrency: "INR",
    rateUnit: "Piece",
    rateEffectiveDate: "2026-09-29",
    estimatedValue: 128000,
    destination: "Jebel Ali Port, Dubai",
    message: "Require phytosanitary certificate, weight cert, and CIF Jebel Ali quotation for 4,000 bags.",
    status: "New"
  },
  {
    id: "NIL-INQ-2026-8894",
    date: "2026-09-28 11:15",
    name: "Marcus Vance",
    company: "GreenEarth Agri Substrates Ltd",
    country: "Netherlands",
    email: "m.vance@greenearth-agri.nl",
    phone: "+31 10 409 8830",
    productId: "coco-peat-5kg-low-ec",
    product: "5kg Coco Peat Block (Washed Low EC)",
    productName: "5kg Coco Peat Block (Washed Low EC)",
    quantity: 24000,
    quantityUnit: "Piece",
    rateSnapshot: 2.40,
    rateCurrency: "USD",
    rateUnit: "Piece",
    rateEffectiveDate: "2026-09-28",
    estimatedValue: 57600,
    destination: "Port of Rotterdam",
    message: "Looking for long-term supply contract for commercial tomato greenhouses. EC < 0.5 mS/cm required.",
    status: "Quotation Sent"
  },
  {
    id: "NIL-INQ-2026-8871",
    date: "2026-09-27 16:45",
    name: "Kiyoshi Tanaka",
    company: "Tokyo Spice & Food Importers Corp",
    country: "Japan",
    email: "k.tanaka@tokyospice.co.jp",
    phone: "+81 3 5555 0142",
    productId: "fresh-green-chilli",
    product: "Fresh Green Chilli (G4 / Teja)",
    productName: "Fresh Green Chilli (G4 / Teja)",
    quantity: 14000,
    quantityUnit: "KG",
    rateSnapshot: 65,
    rateCurrency: "INR",
    rateUnit: "KG",
    rateEffectiveDate: "2026-09-27",
    estimatedValue: 910000,
    destination: "Yokohama Port",
    message: "Temperature-controlled 4°C shipment with pre-cooling certificate and MRL pesticide test report.",
    status: "Negotiation"
  },
  {
    id: "NIL-INQ-2026-8850",
    date: "2026-09-25 09:20",
    name: "David Miller",
    company: "Atlantic Fresh Produce Distributing",
    country: "United States",
    email: "dmiller@atlanticfresh.com",
    phone: "+1 305 678 9910",
    productId: "fresh-red-onion",
    product: "Fresh Red Onion (45mm+ Grade)",
    productName: "Fresh Red Onion (45mm+ Grade)",
    quantity: 84000,
    quantityUnit: "KG",
    rateSnapshot: 42,
    rateCurrency: "INR",
    rateUnit: "KG",
    rateEffectiveDate: "2026-09-25",
    estimatedValue: 3528000,
    destination: "Port of Miami, FL",
    message: "USD CIF Miami pricing needed. Mesh bag 10kg packaging required.",
    status: "Converted"
  },
  {
    id: "NIL-INQ-2026-8812",
    date: "2026-09-20 18:00",
    name: "Farhan Siddiqui",
    company: "Al Baraka Wholesale Spices",
    country: "Saudi Arabia",
    email: "farhan@albaraka.com.sa",
    phone: "+966 11 478 3020",
    productId: "fresh-elephant-foot-yam",
    product: "Fresh Elephant Foot Yam (Suran)",
    productName: "Fresh Elephant Foot Yam (Suran)",
    quantity: 24000,
    quantityUnit: "KG",
    rateSnapshot: 38,
    rateCurrency: "INR",
    rateUnit: "KG",
    rateEffectiveDate: "2026-09-20",
    estimatedValue: 912000,
    destination: "Jeddah Islamic Port",
    message: "Jeddah discharge port quotation requested with phytosanitary clearance.",
    status: "Contacted"
  }
];

// Ensure local storage has initialized inquiries
function getStoredInquiries() {
  let stored = localStorage.getItem("nilite_rfqs");
  if (!stored) {
    localStorage.setItem("nilite_rfqs", JSON.stringify(DEFAULT_INQUIRIES));
    return DEFAULT_INQUIRIES;
  }
  return JSON.parse(stored);
}

// Status Styling Helper
function getStatusBadgeHtml(status) {
  const styles = {
    "New": { bg: "rgba(59, 130, 246, 0.2)", border: "#3b82f6", text: "#60a5fa" },
    "Contacted": { bg: "rgba(139, 92, 246, 0.2)", border: "#8b5cf6", text: "#a78bfa" },
    "Quotation Sent": { bg: "rgba(245, 158, 11, 0.2)", border: "#f59e0b", text: "#fbbf24" },
    "Negotiation": { bg: "rgba(234, 179, 8, 0.2)", border: "#eab308", text: "#fde047" },
    "Converted": { bg: "rgba(16, 185, 129, 0.2)", border: "#10b981", text: "#34d399" },
    "Closed": { bg: "rgba(100, 116, 139, 0.2)", border: "#64748b", text: "#94a3b8" }
  };

  const st = styles[status] || styles["New"];
  return `<span style="background: ${st.bg}; border: 1px solid ${st.border}; color: ${st.text}; padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">${status}</span>`;
}

// Filter Inquiries State
let currentInquiryStatusFilter = "All";
let currentInquirySearchQuery = "";

function filterInquiriesByStatus(status, btnElem) {
  currentInquiryStatusFilter = status;
  document.querySelectorAll('.crm-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');
  renderCmsInquiriesTable();
}

function handleInquirySearch(query) {
  currentInquirySearchQuery = query.toLowerCase().trim();
  renderCmsInquiriesTable();
}

// Inquiries CRM Table Renderer
function renderCmsInquiriesTable() {
  const recentTbody = document.getElementById("recent-rfqs-tbody");
  const allTbody = document.getElementById("all-inquiries-tbody");

  let rfqs = getStoredInquiries();

  // Apply filters
  if (currentInquiryStatusFilter !== "All") {
    rfqs = rfqs.filter(r => r.status === currentInquiryStatusFilter);
  }

  if (currentInquirySearchQuery) {
    rfqs = rfqs.filter(r => {
      return (r.id || '').toLowerCase().includes(currentInquirySearchQuery) ||
             (r.name || r.customerName || '').toLowerCase().includes(currentInquirySearchQuery) ||
             (r.company || '').toLowerCase().includes(currentInquirySearchQuery) ||
             (r.country || '').toLowerCase().includes(currentInquirySearchQuery) ||
             (r.email || r.businessEmail || '').toLowerCase().includes(currentInquirySearchQuery) ||
             (r.product || r.productName || '').toLowerCase().includes(currentInquirySearchQuery);
    });
  }

  const statusOptions = ["New", "Contacted", "Quotation Sent", "Negotiation", "Converted", "Closed"];

  const rowsHtml = rfqs.length === 0 ? `
    <tr>
      <td colspan="10" style="text-align: center; color: #94a3b8; padding: 2.5rem;">
        No inquiries found matching current status filter or search criteria.
      </td>
    </tr>
  ` : rfqs.map(r => {
    const rateSnapshot = r.rateSnapshot !== undefined ? r.rateSnapshot : 185;
    const currency = r.rateCurrency || 'INR';
    const unit = r.rateUnit || r.quantityUnit || 'KG';
    const rateSnapshotStr = window.formatPriceSnapshotStr ? window.formatPriceSnapshotStr(rateSnapshot, currency, unit) : `${rateSnapshot} ${currency}/${unit}`;
    
    const estVal = r.estimatedValue || r.estimatedProductValue || (r.quantity * rateSnapshot) || 0;
    const estValStr = window.formatEstimatedValueStr ? window.formatEstimatedValueStr(estVal, currency) : `${currency} ${estVal}`;

    const qtyStr = typeof r.quantity === 'number' ? `${r.quantity.toLocaleString('en-IN')} ${unit}` : (r.quantity || r.volume || '1 Container');

    return `
      <tr>
        <td style="font-family: monospace; font-weight: 800; color: #dfba73;">${r.id || r.inquiryId}</td>
        <td style="white-space: nowrap; font-size: 0.8rem; color: #cbd5e1;">${r.date || (r.submissionTimestamp ? r.submissionTimestamp.slice(0,10) : '2026-09-29')}</td>
        <td>
          <strong style="color: #ffffff; font-size: 0.95rem;">${r.name || r.customerName}</strong><br>
          <span style="font-size: 0.8rem; color: #94a3b8;">🏢 ${r.company || 'Direct Buyer'}</span><br>
          <span style="font-size: 0.78rem; color: #60a5fa;">📍 ${r.country || r.destinationCountry || 'International'}</span>
        </td>
        <td>
          <a href="mailto:${r.email || r.businessEmail}" style="color: #00e599; font-weight: 600;">${r.email || r.businessEmail}</a><br>
          <span style="font-size: 0.8rem; color: #cbd5e1;">📞 ${r.phone || 'N/A'}</span>
        </td>
        <td style="font-weight: 700; color: #ffffff;">${r.productName || r.product}</td>
        <td style="color: #38bdf8; font-weight: 700;">${qtyStr}</td>
        <td style="color: #dfba73; font-weight: 800; font-size: 0.88rem;">${rateSnapshotStr}</td>
        <td style="color: #34d399; font-weight: 900; font-size: 0.95rem;">${estValStr}</td>
        <td style="font-size: 0.82rem; color: #cbd5e1;">${r.destination || r.destinationPort || 'TBA'}</td>
        <td>
          <select class="admin-select-status" onchange="updateInquiryStatus('${r.id || r.inquiryId}', this.value)" style="background: #0f172a; color: #ffffff; border: 1px solid #334155; padding: 0.35rem 0.5rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
            ${statusOptions.map(opt => `<option value="${opt}" ${r.status === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
          <div style="margin-top: 0.35rem;">
            ${getStatusBadgeHtml(r.status)}
          </div>
          <div style="margin-top: 0.5rem;">
            <button class="btn-action btn-view" onclick="openQuotationModalForInquiry('${r.id || r.inquiryId}')" style="background: #059669; font-size: 0.75rem; width: 100%; font-weight: 800;">📄 Create Quote PDF</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (recentTbody) recentTbody.innerHTML = rowsHtml;
  if (allTbody) allTbody.innerHTML = rowsHtml;
}

// Update Inquiry Status in LocalStorage
function updateInquiryStatus(inquiryId, newStatus) {
  const rfqs = getStoredInquiries();
  const lead = rfqs.find(r => (r.id === inquiryId || r.inquiryId === inquiryId));
  if (lead) {
    lead.status = newStatus;
    localStorage.setItem("nilite_rfqs", JSON.stringify(rfqs));
    loadAdminStats();
    renderCmsInquiriesTable();
    alert(`Status for Lead ${inquiryId} updated to "${newStatus}"!`);
  }
}

/* ==========================================================================
   QUOTATION GENERATOR ENGINE
   ========================================================================== */

function openQuotationModalForInquiry(inquiryId) {
  const rfqs = getStoredInquiries();
  const lead = rfqs.find(r => (r.id === inquiryId || r.inquiryId === inquiryId));
  if (!lead) return;

  const modal = document.getElementById("quotation-modal-overlay");
  if (!modal) return;

  // Auto-generate quote number if not present
  const quoteNum = lead.quotationNum || (window.generateUniqueQuotationNumber ? window.generateUniqueQuotationNumber() : `QT-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  
  document.getElementById("quote-inquiry-id").value = lead.id || lead.inquiryId;
  document.getElementById("quote-num").value = quoteNum;
  document.getElementById("quote-cust-name").value = lead.name || lead.customerName || '';
  document.getElementById("quote-company").value = lead.company || '';
  document.getElementById("quote-email").value = lead.email || lead.businessEmail || '';
  document.getElementById("quote-product-name").value = lead.productName || lead.product || '';
  document.getElementById("quote-qty").value = typeof lead.quantity === 'number' ? lead.quantity : 500;
  
  const unitSelect = document.getElementById("quote-qty-unit");
  if (unitSelect) unitSelect.value = lead.quantityUnit || lead.rateUnit || 'KG';

  const currSelect = document.getElementById("quote-currency");
  if (currSelect) currSelect.value = lead.rateCurrency || 'USD';

  document.getElementById("quote-destination").value = lead.destination || lead.destinationPort || 'Port of Destination';
  document.getElementById("quote-unit-rate").value = lead.rateSnapshot !== undefined ? lead.rateSnapshot : 185;

  recalculateQuoteTotalAdmin();
  modal.classList.add("active");
}

function recalculateQuoteTotalAdmin() {
  const qty = parseFloat(document.getElementById("quote-qty").value) || 0;
  const rate = parseFloat(document.getElementById("quote-unit-rate").value) || 0;
  const pack = parseFloat(document.getElementById("quote-pack-charge").value) || 0;
  const inland = parseFloat(document.getElementById("quote-inland-charge").value) || 0;
  const doc = parseFloat(document.getElementById("quote-doc-charge").value) || 0;
  const freight = parseFloat(document.getElementById("quote-freight-charge").value) || 0;
  const insurance = parseFloat(document.getElementById("quote-insurance-charge").value) || 0;
  const currency = document.getElementById("quote-currency").value || 'USD';

  const baseTotal = qty * rate;
  const grandTotal = baseTotal + pack + inland + doc + freight + insurance;

  const displayElem = document.getElementById("quote-calculated-total-display");
  if (displayElem) {
    displayElem.textContent = window.formatCurrencyAmount ? window.formatCurrencyAmount(grandTotal, currency) : `${currency} ${grandTotal.toFixed(2)}`;
  }
}

function handleGenerateQuotationPdf(e) {
  e.preventDefault();

  const inquiryId = document.getElementById("quote-inquiry-id").value;
  const quotationNumber = document.getElementById("quote-num").value;
  const customerName = document.getElementById("quote-cust-name").value;
  const companyName = document.getElementById("quote-company").value;
  const customerEmail = document.getElementById("quote-email").value;
  const productName = document.getElementById("quote-product-name").value;
  const quantity = parseFloat(document.getElementById("quote-qty").value) || 0;
  const quantityUnit = document.getElementById("quote-qty-unit").value;
  const currency = document.getElementById("quote-currency").value;
  const incoterm = document.getElementById("quote-incoterm").value;
  const destinationPort = document.getElementById("quote-destination").value;
  const unitRate = parseFloat(document.getElementById("quote-unit-rate").value) || 0;
  
  const packagingCharge = parseFloat(document.getElementById("quote-pack-charge").value) || 0;
  const inlandTransport = parseFloat(document.getElementById("quote-inland-charge").value) || 0;
  const documentationFee = parseFloat(document.getElementById("quote-doc-charge").value) || 0;
  const oceanFreight = parseFloat(document.getElementById("quote-freight-charge").value) || 0;
  const marineInsurance = parseFloat(document.getElementById("quote-insurance-charge").value) || 0;

  const paymentTerms = document.getElementById("quote-payment-terms").value;
  const deliveryTerms = document.getElementById("quote-delivery-terms").value;

  const quoteData = {
    quotationNumber,
    customerName,
    companyName,
    customerEmail,
    productName,
    quantity,
    quantityUnit,
    currency,
    incoterm,
    destinationPort,
    unitRate,
    additionalCharges: {
      packaging: packagingCharge,
      inlandTransport: inlandTransport,
      documentation: documentationFee,
      freight: oceanFreight,
      insurance: marineInsurance,
      other: 0
    },
    paymentTerms,
    deliveryTerms,
    validityDays: 15
  };

  // Update lead status in localStorage to "Quotation Sent"
  if (inquiryId) {
    updateInquiryStatus(inquiryId, "Quotation Sent");
  }

  closeCmsModal("quotation-modal-overlay");

  if (window.generateB2BQuotationPDF) {
    window.generateB2BQuotationPDF(quoteData);
  } else {
    alert("Quotation generated successfully!");
  }
}

// Export All Inquiries to CSV
function exportRFQsToCSV() {
  const rfqs = getStoredInquiries();
  if (rfqs.length === 0) {
    alert("No RFQ inquiry records found to export.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
  // CSV Header with all fields including price snapshots
  csvContent += "Inquiry ID,Date,Name,Company,Country,Email,Phone,Product,Quantity,Unit,Rate at Submission,Currency,Est Product Value,Destination,Message,Status\n";

  rfqs.forEach(r => {
    const rateVal = r.rateSnapshot !== undefined ? r.rateSnapshot : 185;
    const currency = r.rateCurrency || 'INR';
    const unit = r.rateUnit || r.quantityUnit || 'KG';
    const estVal = r.estimatedValue || r.estimatedProductValue || 0;

    const row = [
      r.id || r.inquiryId || '',
      r.date || (r.submissionTimestamp ? r.submissionTimestamp.slice(0,10) : ''),
      `"${(r.name || r.customerName || '').replace(/"/g, '""')}"`,
      `"${(r.company || '').replace(/"/g, '""')}"`,
      `"${(r.country || '').replace(/"/g, '""')}"`,
      r.email || r.businessEmail || '',
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.productName || r.product || '').replace(/"/g, '""')}"`,
      r.quantity || r.quantityNum || '',
      unit,
      rateVal,
      currency,
      estVal,
      `"${(r.destination || r.destinationPort || '').replace(/"/g, '""')}"`,
      `"${(r.message || r.notes || '').replace(/"/g, '""')}"`,
      `"${(r.status || 'New').replace(/"/g, '""')}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Nilite_Exports_Lead_Database_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// Blog Articles CMS
const ARTICLES_DATA = [
  { id: 1, title: "How Triple Washed Low EC Coco Peat Boosts Greenhouse Yields", category: "Horticulture Insights", date: "2026-09-15" },
  { id: 2, title: "Navigating Phytosanitary Regulations for Spices Export to US FDA & EU", category: "Quality & Compliance", date: "2026-09-10" },
  { id: 3, title: "Tuticorin V.O.C Port Connection: Direct Ocean Lines to Jebel Ali & Rotterdam", category: "Global Trade Logistics", date: "2026-09-02" }
];

function renderCmsBlogTable() {
  const tbody = document.getElementById("cms-blog-tbody");
  if (!tbody) return;

  tbody.innerHTML = ARTICLES_DATA.map(a => `
    <tr>
      <td style="font-weight: 700; color: #ffffff;">${a.title}</td>
      <td><span class="admin-badge">${a.category}</span></td>
      <td>${a.date}</td>
      <td>
        <button class="btn-action btn-edit" onclick="alert('Article edit mode')">Edit</button>
        <button class="btn-action btn-delete" onclick="alert('Article deleted')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openAddArticleModal() {
  document.getElementById("article-modal-overlay").classList.add("active");
}

function handleSaveArticle(e) {
  e.preventDefault();
  const title = document.getElementById("art-title").value.trim();
  const cat = document.getElementById("art-cat").value.trim();

  ARTICLES_DATA.unshift({
    id: Date.now(),
    title: title,
    category: cat,
    date: new Date().toISOString().slice(0, 10)
  });

  closeCmsModal("article-modal-overlay");
  renderCmsBlogTable();
  alert("Blog article published successfully!");
}

function saveWhatsAppConfig() {
  const num = document.getElementById("wa-config-number").value.trim();
  const title = document.getElementById("wa-config-title").value.trim();
  const sub = document.getElementById("wa-config-sub").value.trim();
  const msg = document.getElementById("wa-config-msg").value.trim();

  localStorage.setItem("nilite_wa_number", num);
  localStorage.setItem("nilite_wa_title", title);
  localStorage.setItem("nilite_wa_sub", sub);
  localStorage.setItem("nilite_wa_msg", msg);

  alert("WhatsApp floating widget configuration saved successfully!");
}

function closeCmsModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}
