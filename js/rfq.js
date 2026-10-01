const EXPORT_PHONE_NUMBER = "918344767687"; // Official Manager: Vivek Santhakumar
const SECONDARY_EXPORT_PHONE = "919597596903"; // Regional Manager: Askar Ali

document.addEventListener("DOMContentLoaded", () => {
  setupRFQForm();
  updateIndicativePriceDisplay();
});

function setupRFQForm() {
  const form = document.getElementById("export-rfq-form");
  const waBtn = document.getElementById("btn-rfq-whatsapp");
  const prodSelect = document.getElementById("rfq-product-select");
  const qtyInput = document.getElementById("rfq-volume-num");
  const unitSelect = document.getElementById("rfq-unit-select");

  if (form) {
    form.addEventListener("submit", handleRFQSubmit);
  }

  if (waBtn) {
    waBtn.addEventListener("click", handleWhatsAppQuote);
  }

  if (prodSelect) prodSelect.addEventListener("change", updateIndicativePriceDisplay);
  if (qtyInput) qtyInput.addEventListener("input", updateIndicativePriceDisplay);
  if (unitSelect) unitSelect.addEventListener("change", updateIndicativePriceDisplay);
}

/**
 * Update Indicative Price Display Banner based on today's active rate
 */
function updateIndicativePriceDisplay() {
  const prodSelect = document.getElementById("rfq-product-select");
  const qtyInput = document.getElementById("rfq-volume-num");
  const unitSelect = document.getElementById("rfq-unit-select");
  const rateDisplay = document.getElementById("indicative-rate-display");
  const calcDisplay = document.getElementById("indicative-calc-display");
  const dateTag = document.getElementById("indicative-date-tag");

  if (!prodSelect || !rateDisplay) return;

  const productId = prodSelect.value || (window.PRODUCTS_DATA && window.PRODUCTS_DATA[0] ? window.PRODUCTS_DATA[0].id : "");
  if (!productId) return;

  const todayStr = new Date().toISOString().slice(0, 10);
  const activeRateObj = window.getActiveRateForProduct ? window.getActiveRateForProduct(productId, todayStr) : null;

  if (activeRateObj) {
    const rateStr = window.formatPriceSnapshotStr ? window.formatPriceSnapshotStr(activeRateObj.rate, activeRateObj.currency, activeRateObj.unit) : `${activeRateObj.rate} ${activeRateObj.currency}/${activeRateObj.unit}`;
    rateDisplay.textContent = rateStr;

    if (dateTag) {
      dateTag.textContent = `Rate Effective: ${activeRateObj.effectiveDate || todayStr}`;
    }

    const qty = parseFloat(qtyInput?.value) || 1;
    const estVal = qty * activeRateObj.rate;
    const estValStr = window.formatEstimatedValueStr ? window.formatEstimatedValueStr(estVal, activeRateObj.currency) : `${activeRateObj.currency} ${estVal}`;

    if (calcDisplay) {
      calcDisplay.textContent = `(Est. Product Value: ${estValStr} for ${qty} ${unitSelect?.value || activeRateObj.unit})`;
    }
  } else {
    rateDisplay.textContent = "Rate Available Upon Request";
    if (calcDisplay) calcDisplay.textContent = "";
  }
}

// Gather form data
function getRFQFormData() {
  const prodSelect = document.getElementById("rfq-product-select");
  const selectedProdOption = prodSelect ? prodSelect.options[prodSelect.selectedIndex] : null;
  const productName = selectedProdOption ? selectedProdOption.text : (prodSelect?.value || "");

  return {
    fullName: document.getElementById("rfq-name")?.value.trim() || "",
    company: document.getElementById("rfq-company")?.value.trim() || "",
    email: document.getElementById("rfq-email")?.value.trim() || "",
    phone: document.getElementById("rfq-phone")?.value.trim() || "",
    destination: document.getElementById("rfq-destination")?.value.trim() || "",
    productId: prodSelect?.value || "",
    productName: productName,
    quantityNum: parseFloat(document.getElementById("rfq-volume-num")?.value) || 1,
    quantityUnit: document.getElementById("rfq-unit-select")?.value || "KG",
    incoterm: document.getElementById("rfq-incoterm")?.value || "FOB",
    packaging: document.getElementById("rfq-packaging")?.value || "Standard Export Palletized",
    message: document.getElementById("rfq-notes")?.value.trim() || ""
  };
}

// WhatsApp Direct Exporter Chat
function handleWhatsAppQuote(e) {
  if (e) e.preventDefault();
  const data = getRFQFormData();

  let message = "";
  if (data.productName || data.company) {
    message = `Hi, I am interested in your products.\nI would like to request an export quotation.\n\n` +
      `*Inquiry Details:*\n` +
      `• Product: ${data.productName || "General Catalog Inquiry"}\n` +
      `• Quantity: ${data.quantityNum} ${data.quantityUnit}\n` +
      `• Incoterm: ${data.incoterm}\n` +
      (data.destination ? `• Destination Port: ${data.destination}\n` : '') +
      (data.company ? `• Company: ${data.company}\n` : '') +
      (data.fullName ? `• Contact: ${data.fullName}\n` : '');
  } else {
    message = `Hi, I am interested in your products.\nI would like to request an export quotation.`;
  }

  const encodedUrl = `https://wa.me/${EXPORT_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");

  if (window.showToast) {
    window.showToast("Opening WhatsApp trade desk with your quote request...");
  }
}

// Official RFQ Form Submission with Rate Snapshotting
function handleRFQSubmit(e) {
  e.preventDefault();
  const data = getRFQFormData();

  if (!data.fullName || !data.email || !data.productId) {
    alert("Please fill in your name, email, and select a product.");
    return;
  }

  // Generate Unique B2B Inquiry ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const quoteRef = `NIL-INQ-${new Date().getFullYear()}-${randomSuffix}`;
  
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const timestampStr = now.toISOString();

  // Extract Country from destination port if provided, or default
  let countryStr = "International Importer";
  if (data.destination) {
    const parts = data.destination.split(',');
    countryStr = parts[parts.length - 1].trim();
  }

  // Retrieve Active Daily Rate Snapshot at exact submission date/time
  const activeRateObj = window.getActiveRateForProduct ? window.getActiveRateForProduct(data.productId, todayStr) : null;

  const rateSnapshot = activeRateObj ? activeRateObj.rate : 100;
  const rateCurrency = activeRateObj ? activeRateObj.currency : "INR";
  const rateUnit = activeRateObj ? activeRateObj.unit : data.quantityUnit;
  const rateEffectiveDate = activeRateObj ? activeRateObj.effectiveDate : todayStr;
  const estimatedProductValue = data.quantityNum * rateSnapshot;

  // Complete Inquiry Payload with Snapshot
  const newLead = {
    id: quoteRef,
    inquiryId: quoteRef,
    productId: data.productId,
    product: data.productName,
    productName: data.productName,
    quantity: data.quantityNum,
    quantityNum: data.quantityNum,
    quantityUnit: data.quantityUnit,
    unit: data.quantityUnit,
    rateSnapshot: rateSnapshot,
    rateCurrency: rateCurrency,
    rateUnit: rateUnit,
    rateEffectiveDate: rateEffectiveDate,
    submissionTimestamp: timestampStr,
    estimatedValue: estimatedProductValue,
    estimatedProductValue: estimatedProductValue,
    name: data.fullName,
    customerName: data.fullName,
    company: data.company || "Direct Importer",
    country: countryStr,
    destination: data.destination || "To Be Advised",
    destinationPort: data.destination || "To Be Advised",
    destinationCountry: countryStr,
    packaging: data.packaging,
    packagingRequirement: data.packaging,
    email: data.email,
    businessEmail: data.email,
    phone: data.phone || "Not Provided",
    message: data.message || "Standard Export Spec & Proforma Quotation requested.",
    incoterm: data.incoterm,
    date: now.toISOString().replace('T', ' ').slice(0, 16),
    status: "New"
  };

  // Save to nilite_rfqs for CRM backend (Immutable past snapshot)
  const savedInquiries = JSON.parse(localStorage.getItem("nilite_rfqs") || "[]");
  savedInquiries.unshift(newLead);
  localStorage.setItem("nilite_rfqs", JSON.stringify(savedInquiries));

  // Show Success Confirmation Modal
  showRFQSuccessModal(quoteRef, newLead);

  // Reset form
  const form = document.getElementById("export-rfq-form");
  if (form) form.reset();
  updateIndicativePriceDisplay();
}

function showRFQSuccessModal(ref, leadObj) {
  const modal = document.getElementById("rfq-success-modal");
  const modalBody = document.getElementById("rfq-success-body");

  if (modalBody) {
    const rateSnapshotStr = window.formatPriceSnapshotStr ? window.formatPriceSnapshotStr(leadObj.rateSnapshot, leadObj.rateCurrency, leadObj.rateUnit) : `${leadObj.rateSnapshot} ${leadObj.rateCurrency}`;
    const estValStr = window.formatEstimatedValueStr ? window.formatEstimatedValueStr(leadObj.estimatedValue, leadObj.rateCurrency) : `${leadObj.rateCurrency} ${leadObj.estimatedValue}`;

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <div style="width: 65px; height: 65px; background: rgba(4,120,87,0.15); color: #047857; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h4 style="font-size: 1.4rem; font-weight: 800; color: #0a2230; margin-bottom: 0.5rem;">
          Request Received!
        </h4>
        <p style="font-size: 0.92rem; color: #475569; line-height: 1.5; font-weight: 500; background: #f8fafc; padding: 0.85rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          "Your request has been received. Our export team will review the current pricing, freight, packaging and destination requirements and send you the final quotation."
        </p>
      </div>

      <div style="background: #0a2230; color: #ffffff; border: 1.5px dashed #dfba73; padding: 1.1rem; border-radius: 12px; text-align: center; margin-bottom: 1.25rem;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #dfba73; text-transform: uppercase; letter-spacing: 0.05em;">
          Quotation Tracking Reference
        </span>
        <div style="font-size: 1.35rem; font-weight: 900; color: #ffffff; letter-spacing: 0.05em; margin-top: 0.2rem;">
          ${ref}
        </div>
      </div>

      <table class="cert-meta-table" style="margin-bottom: 1.25rem; width: 100%;">
        <tbody>
          <tr>
            <td class="label">Product Requested:</td>
            <td class="val"><strong>${leadObj.productName}</strong></td>
          </tr>
          <tr>
            <td class="label">Quantity & Unit:</td>
            <td class="val">${leadObj.quantity} ${leadObj.quantityUnit}</td>
          </tr>
          <tr>
            <td class="label">Rate Snapshot at Submission:</td>
            <td class="val" style="color: #047857; font-weight: 700;">${rateSnapshotStr} (Effective: ${leadObj.rateEffectiveDate})</td>
          </tr>
          <tr>
            <td class="label">Est. Product Value:</td>
            <td class="val" style="color: #0a2230; font-weight: 800;">${estValStr}</td>
          </tr>
          <tr>
            <td class="label">Destination Port & Country:</td>
            <td class="val">${leadObj.destination}</td>
          </tr>
        </tbody>
      </table>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-whatsapp" style="flex: 1;" onclick="handleWhatsAppQuote(); closeModal('rfq-success-modal');">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.983.54 1.871.828 2.796.828 3.182 0 5.77-2.587 5.77-5.766-.001-3.181-2.588-5.766-5.77-5.766zm9.969 5.766c0 5.495-4.474 9.969-9.969 9.969-1.758 0-3.412-.464-4.86-1.272l-5.171 1.365 1.387-5.068c-.908-1.504-1.425-3.266-1.425-5.044 0-5.495 4.474-9.969 9.969-9.969 5.495 0 9.969 4.474 9.969 9.969z"/></svg>
          Accelerate via WhatsApp
        </button>
        <button class="btn btn-outline" style="flex: 1;" onclick="closeModal('rfq-success-modal')">
          Close
        </button>
      </div>
    `;
  }

  if (modal) modal.classList.add("active");
}
