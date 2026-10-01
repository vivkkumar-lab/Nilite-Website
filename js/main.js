/**
 * NILITE EXPORTS - MAIN INTERACTION SCRIPT
 * Navigation, Certificate Modals, Counters, and UI Utilities
 */

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupMobileMenu();
  setupStatsCounters();
  setupModalDismissals();
  setupCurrencySelector();
});

// Sticky Navbar Scroll
function setupNavbar() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });
}

// Mobile Menu Drawer
function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close when clicking link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
}

// Stats Counter Animation
function setupStatsCounters() {
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          if (isNaN(target)) return;
          let count = 0;
          const speed = target / 40;
          const update = () => {
            count += speed;
            if (count < target) {
              counter.innerHTML = `${Math.ceil(count)}<span class="plus">+</span>`;
              requestAnimationFrame(update);
            } else {
              counter.innerHTML = `${target}<span class="plus">+</span>`;
            }
          };
          update();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector(".stats-strip");
  if (statsSection) observer.observe(statsSection);
}

// Certificate Verification Modal Triggers
function openCertificateModal(certType) {
  const modal = document.getElementById("cert-verification-modal");
  const modalTitle = document.getElementById("cert-modal-title");
  const modalBody = document.getElementById("cert-modal-body");

  if (!modal || !modalBody) return;

  if (certType === 'coir-board') {
    if (modalTitle) modalTitle.textContent = "Coir Board of India - Statutory RCMC Registration";
    modalBody.innerHTML = `
      <div class="cert-doc-preview">
        <div class="cert-doc-watermark">COIR BOARD GOVT OF INDIA</div>
        <div class="cert-doc-header">
          <h4>COIR BOARD</h4>
          <span>Ministry of Micro, Small and Medium Enterprises, Government of India</span><br>
          <strong style="color: var(--secondary); font-size: 0.85rem;">Registration-cum-Membership Certificate (RCMC)</strong>
        </div>
        <table class="cert-meta-table">
          <tbody>
            <tr>
              <td class="label">Statutory Authority:</td>
              <td class="val">Coir Board of India (Coir Industry Act, 1953)</td>
            </tr>
            <tr>
              <td class="label">Exporter Status:</td>
              <td class="val" style="color: #107c41;">Registered Manufacturer - Merchant Exporter</td>
            </tr>
            <tr>
              <td class="label">Product Categories:</td>
              <td class="val">Coir Pith (Coco Peat Blocks & Briquettes), Coir Fiber Bales, Coir Grow Slabs, Geotextiles</td>
            </tr>
            <tr>
              <td class="label">Phytosanitary Protocol:</td>
              <td class="val">Methyl Bromide / Phosphine Heat-Treated Desiccation Certified</td>
            </tr>
            <tr>
              <td class="label">Ports of Dispatch:</td>
              <td class="val">V.O. Chidambaranar Port (Tuticorin), Chennai Port, Cochin Port</td>
            </tr>
            <tr>
              <td class="label">Verification Status:</td>
              <td class="val" style="color: #107c41;">
                <span class="status-dot" style="display:inline-block; margin-right: 5px;"></span> Active & Valid for Global Export
              </td>
            </tr>
          </tbody>
        </table>
        <div class="cert-doc-seal">
          <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 320px;">
            Issued under provisions of the Coir Board Rules. Verified compliant for European Union, Americas, Far East, and Gulf port clearances.
          </div>
          <div class="seal-stamp" style="border-color: #8c532b; color: #8c532b;">
            COIR BOARD<br>GOVT OF INDIA<br>VERIFIED
          </div>
        </div>
      </div>
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <button class="btn btn-primary" style="flex: 1;" onclick="closeModal('cert-verification-modal'); triggerQuoteForProduct('coco-peat-5kg-low-ec');">
          Source Coir Substrates
        </button>
        <button class="btn btn-outline" onclick="closeModal('cert-verification-modal')">
          Close Window
        </button>
      </div>
    `;
  } else if (certType === 'apeda') {
    if (modalTitle) modalTitle.textContent = "APEDA Registration - Agricultural & Processed Food Products";
    modalBody.innerHTML = `
      <div class="cert-doc-preview">
        <div class="cert-doc-watermark">APEDA MINISTRY OF COMMERCE</div>
        <div class="cert-doc-header">
          <h4>APEDA (Govt. of India)</h4>
          <span>Agricultural and Processed Food Products Export Development Authority</span><br>
          <strong style="color: var(--primary); font-size: 0.85rem;">Ministry of Commerce & Industry, Government of India</strong>
        </div>
        <table class="cert-meta-table">
          <tbody>
            <tr>
              <td class="label">Authority:</td>
              <td class="val">APEDA Export Council (Act No. 2 of 1986)</td>
            </tr>
            <tr>
              <td class="label">Certificate Type:</td>
              <td class="val" style="color: #107c41;">RCMC - Agricultural & Processed Food Export</td>
            </tr>
            <tr>
              <td class="label">Permitted Schedules:</td>
              <td class="val">Spices & Seasonings, Basmati & Non-Basmati Grains, Fresh & Semi-Husked Coconuts, Millets, Dehydrated Foods</td>
            </tr>
            <tr>
              <td class="label">Quality Governance:</td>
              <td class="val">HACCP, Agmark & Export Inspection Agency (EIA) Quality Benchmark</td>
            </tr>
            <tr>
              <td class="label">Traceability:</td>
              <td class="val">Farm-level traceability with batch lab analytical certificates (Pesticide Residue Free)</td>
            </tr>
            <tr>
              <td class="label">Verification Status:</td>
              <td class="val" style="color: #107c41;">
                <span class="status-dot" style="display:inline-block; margin-right: 5px;"></span> Officially Certified & Current
              </td>
            </tr>
          </tbody>
        </table>
        <div class="cert-doc-seal">
          <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 320px;">
            Recognized export entity authorized for shipment to USA FDA, European EFSA, GCC, and ASEAN statutory food standard jurisdictions.
          </div>
          <div class="seal-stamp">
            APEDA INDIA<br>COMMERCE<br>VERIFIED
          </div>
        </div>
      </div>
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <button class="btn btn-primary" style="flex: 1;" onclick="closeModal('cert-verification-modal'); triggerQuoteForProduct('turmeric-fingers-salem');">
          Source Agro Commodities
        </button>
        <button class="btn btn-outline" onclick="closeModal('cert-verification-modal')">
          Close Window
        </button>
      </div>
    `;
  }

  modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

function setupModalDismissals() {
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(modal => {
        modal.classList.remove("active");
      });
    }
  });
}

// Currency Selector
function setupCurrencySelector() {
  const selector = document.getElementById("currency-select");
  if (selector) {
    selector.addEventListener("change", (e) => {
      const curr = e.target.value;
      showToast(`Pricing display currency updated to: ${curr}`);
    });
  }
}

// Toast Utility
window.showToast = function(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};
