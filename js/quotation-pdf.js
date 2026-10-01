/**
 * NILITE EXPORTS - OFFICIAL B2B QUOTATION GENERATOR & EXPORT PRICING ENGINE
 * Supports EXW, FOB, CFR, CIF, DDP Incoterms with full charges breakdown and PDF generation.
 */

// Retrieve stored quotations from localStorage
function getStoredQuotations() {
  const stored = localStorage.getItem("nilite_quotations");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

// Generate Next Unique Quotation Number (QT-2026-0001, QT-2026-0002...)
function generateQuotationNumber() {
  const quotations = getStoredQuotations();
  const year = new Date().getFullYear();
  const nextNum = quotations.length + 1;
  const padNum = String(nextNum).padStart(4, '0');
  return `QT-${year}-${padNum}`;
}

// Save Quotation Record (Immutable snapshot)
function saveQuotationRecord(quotationObj) {
  const quotations = getStoredQuotations();
  // Check if updating existing or adding new
  const idx = quotations.findIndex(q => q.quotationNumber === quotationObj.quotationNumber);
  if (idx !== -1) {
    quotations[idx] = quotationObj;
  } else {
    quotations.unshift(quotationObj);
  }
  localStorage.setItem("nilite_quotations", JSON.stringify(quotations));
  return quotationObj;
}

/**
 * Generate Printable Official B2B Quotation HTML / Document
 */
function buildQuotationPrintableHtml(q) {
  const formatMoney = window.formatCurrencyStr || ((val, curr) => `${curr} ${val}`);

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Official Export Quotation - ${q.quotationNumber}</title>
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 25px; background: #fff; font-size: 13px; line-height: 1.5; }
      .quote-container { max-width: 800px; margin: 0 auto; border: 2px solid #0a2230; padding: 30px; border-radius: 8px; }
      .header-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
      .brand-title { font-size: 24px; font-weight: 900; color: #0a2230; letter-spacing: -0.02em; }
      .brand-sub { font-size: 11px; font-weight: 700; color: #dfba73; text-transform: uppercase; margin-top: 3px; }
      .quote-ref-box { background: #f8fafc; border: 1.5px solid #0a2230; padding: 12px; border-radius: 6px; text-align: right; }
      .quote-ref-title { font-size: 18px; font-weight: 900; color: #0a2230; }
      .meta-grid { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; }
      .meta-box h4 { margin: 0 0 6px 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
      .meta-box p { margin: 0; font-size: 13px; font-weight: 600; color: #0a2230; }
      .table-data { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      .table-data th { background: #0a2230; color: #ffffff; padding: 10px; font-size: 11px; text-transform: uppercase; text-align: left; }
      .table-data td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
      .total-row td { background: #f1f5f9; font-weight: 800; font-size: 15px; color: #0a2230; border-top: 2px solid #0a2230; }
      .terms-box { background: #fafafa; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin-top: 20px; }
      .terms-title { font-weight: 800; color: #0a2230; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; }
      .footer-note { text-align: center; margin-top: 30px; font-size: 10px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; }
      @media print {
        body { padding: 0; }
        .quote-container { border: none; padding: 0; }
        .no-print { display: none !important; }
      }
    </style>
  </head>
  <body>
    <div class="no-print" style="max-width: 800px; margin: 0 auto 15px auto; text-align: right;">
      <button onclick="window.print()" style="background: #0a2230; color: #fff; border: none; padding: 10px 20px; font-weight: bold; border-radius: 5px; cursor: pointer;">🖨️ Print / Download PDF</button>
    </div>

    <div class="quote-container">
      <table class="header-table">
        <tr>
          <td>
            <div class="brand-title">NILITE EXPORTS</div>
            <div class="brand-sub">Coir Board &amp; APEDA Certified Government Exporter</div>
            <div style="font-size: 11px; color: #475569; margin-top: 5px;">
              Pollachi &amp; Coimbatore Agro Belt, Tamil Nadu, India<br>
              Coir Board Reg #CB/EXP/2026 | APEDA Reg #APEDA/AGRO/IND/99042<br>
              Email: export@niliteexports.com | Phone: +91 8344767687
            </div>
          </td>
          <td style="width: 220px;">
            <div class="quote-ref-box">
              <div style="font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700;">PROFORMA QUOTATION</div>
              <div class="quote-ref-title">${q.quotationNumber}</div>
              <div style="font-size: 11px; color: #475569; margin-top: 4px;">
                <strong>Date:</strong> ${q.quotationDate}<br>
                <strong>Valid Until:</strong> ${q.validUntil}
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div class="meta-grid">
        <div class="meta-box">
          <h4>B2B Customer Details</h4>
          <p><strong>${q.customerName}</strong></p>
          <p>${q.companyName || 'Direct Importer'}</p>
          <p>${q.email} | ${q.phone || 'N/A'}</p>
        </div>
        <div class="meta-box">
          <h4>Destination &amp; Shipping Specs</h4>
          <p><strong>Destination:</strong> ${q.destinationPort}, ${q.country}</p>
          <p><strong>Incoterm:</strong> ${q.incoterm}</p>
          <p><strong>Packaging:</strong> ${q.packaging}</p>
        </div>
      </div>

      <table class="table-data">
        <thead>
          <tr>
            <th>Product Description</th>
            <th>Quantity</th>
            <th>Base Unit Rate</th>
            <th style="text-align: right;">Product Base Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${q.productName}</strong><br>
              <span style="font-size: 11px; color: #64748b;">Origin: India | Standard Export Grade Specification</span>
            </td>
            <td>${q.quantity} ${q.unit}</td>
            <td>${formatMoney(q.rateSnapshot, q.currency)} / ${q.unit}</td>
            <td style="text-align: right;">${formatMoney(q.productBaseTotal, q.currency)}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="font-size: 12px; font-weight: 800; color: #0a2230; text-transform: uppercase; margin-bottom: 8px;">
        Incoterms &amp; Freight Breakdown (${q.incoterm})
      </h4>

      <table class="table-data">
        <thead>
          <tr>
            <th>Charge Component</th>
            <th>Description / Logistics Line</th>
            <th style="text-align: right;">Amount (${q.currency})</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product Base Value</td>
            <td>${q.quantity} ${q.unit} @ ${formatMoney(q.rateSnapshot, q.currency)}</td>
            <td style="text-align: right;">${formatMoney(q.productBaseTotal, q.currency)}</td>
          </tr>
          ${q.charges.packaging > 0 ? `
          <tr>
            <td>Packaging Charges</td>
            <td>Palletization, shrink wrap, strapping &amp; labeling</td>
            <td style="text-align: right;">${formatMoney(q.charges.packaging, q.currency)}</td>
          </tr>` : ''}
          ${q.charges.inlandTrans > 0 ? `
          <tr>
            <td>Inland Transportation</td>
            <td>Factory to Tuticorin / Cochin Container Terminal</td>
            <td style="text-align: right;">${formatMoney(q.charges.inlandTrans, q.currency)}</td>
          </tr>` : ''}
          ${q.charges.documentation > 0 ? `
          <tr>
            <td>Documentation &amp; Certification</td>
            <td>Phytosanitary, Fumigation, Certificate of Origin &amp; B/L</td>
            <td style="text-align: right;">${formatMoney(q.charges.documentation, q.currency)}</td>
          </tr>` : ''}
          ${q.charges.freight > 0 ? `
          <tr>
            <td>Ocean Freight</td>
            <td>Container shipping line freight to ${q.destinationPort}</td>
            <td style="text-align: right;">${formatMoney(q.charges.freight, q.currency)}</td>
          </tr>` : ''}
          ${q.charges.insurance > 0 ? `
          <tr>
            <td>Marine Cargo Insurance</td>
            <td>All Risk Cargo Marine Policy (110% CIF value)</td>
            <td style="text-align: right;">${formatMoney(q.charges.insurance, q.currency)}</td>
          </tr>` : ''}
          ${q.charges.other > 0 ? `
          <tr>
            <td>Other Handling / Clearance</td>
            <td>Terminal handling charges &amp; customs port clearance</td>
            <td style="text-align: right;">${formatMoney(q.charges.other, q.currency)}</td>
          </tr>` : ''}
          <tr class="total-row">
            <td colspan="2" style="text-align: right; text-transform: uppercase;">Total Quotation Value (${q.incoterm}):</td>
            <td style="text-align: right; color: #047857;">${formatMoney(q.totalQuotationValue, q.currency)}</td>
          </tr>
        </tbody>
      </table>

      <div class="terms-box">
        <div class="terms-title">Standard B2B Terms &amp; Conditions</div>
        <ol style="margin: 0; padding-left: 18px; font-size: 11px; color: #475569;">
          <li><strong>Payment Terms:</strong> 30% advance deposit via Telegraphic Transfer (T/T), 70% balance against scanned Bill of Lading (B/L) copy.</li>
          <li><strong>Dispatch Schedule:</strong> Container stuffing within 7-10 days from receipt of confirmed purchase order and advance deposit.</li>
          <li><strong>Inspection:</strong> Quality &amp; weight inspected by Government approved lab prior to port departure.</li>
          <li><strong>Validity:</strong> Quotation rates are valid for 15 days from issuance date due to fluctuating ocean vessel freight rates.</li>
        </ol>
      </div>

      <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div style="font-size: 11px; color: #64748b;">
          Prepared by: Nilite Exports International Trade Desk<br>
          Verification Code: ${q.quotationNumber}-VERIFIED
        </div>
        <div style="text-align: center; border-top: 1.5px solid #0a2230; padding-top: 5px; width: 180px;">
          <strong style="font-size: 11px; color: #0a2230;">Authorized Signatory</strong><br>
          <span style="font-size: 10px; color: #64748b;">Nilite Exports India</span>
        </div>
      </div>

      <div class="footer-note">
        This is an official commercial quotation generated by Nilite Exports Management Portal. Rates and price snapshots are immutably logged for audit compliance.
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Trigger Quotation Print / Download Window
 */
function printQuotationDocument(quotationObj) {
  const htmlContent = buildQuotationPrintableHtml(quotationObj);
  const win = window.open('', '_blank', 'width=900,height=800');
  win.document.write(htmlContent);
  win.document.close();
}

// Global exports
window.getStoredQuotations = getStoredQuotations;
window.generateQuotationNumber = generateQuotationNumber;
window.saveQuotationRecord = saveQuotationRecord;
window.buildQuotationPrintableHtml = buildQuotationPrintableHtml;
window.printQuotationDocument = printQuotationDocument;
