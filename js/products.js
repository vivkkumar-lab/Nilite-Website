/**
 * NILITE EXPORTS - PRODUCTS DATA & CATALOG ENGINE
 * Standardized International Export Specification Schema for Each Product
 */

const PRODUCTS_DATA = [
  // 1. SEMI HUSKED COCONUT
  {
    id: "semi-husked-coconut",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Semi Husked Coconut",
    title: "Semi Husked Coconut (Pollachi Grade A)",
    image: "assets/images/coconut.jpg",
    shortDesc: "Carefully graded, mature Pollachi coconuts with a protective husk tuft preserving natural sweetness and water volume during international ocean transit.",
    origin: "India (Pollachi, Tamil Nadu)",
    availablePackaging: "12 to 13 kg Bags (approx. 25 nuts / PP mesh bag) or 25 kg bags (approx. 50 nuts)",
    bulkPackaging: "40ft Reefer Container (approx. 2,000 bags / 50,000 nuts / 25-26 MT at 12°C - 14°C)",
    customization: "Available (Weight grading 550g - 650g, tuft size trimming, partial/full husk)",
    privateLabel: "Available (Custom printed importer tags & branded PP mesh bags)",
    exportMarkets: "UAE, Saudi Arabia, GCC, UK, Europe, Southeast Asia",
    moq: "1x 40ft Reefer Container (25 MT) or 1x 20ft Reefer (12 MT)",
    specs: {
      "Weight per Nut": "550g - 650g Grade A",
      "Nut Circumference": "12 - 14 inches",
      "Water Content": "Sweet natural water (100ml+)",
      "Shelf Life": "Up to 60 days in refrigerated reefers (12°C - 14°C)",
      "Bag Count": "25 or 50 Coconuts per PP Mesh Bag",
      "Phytosanitary Protocol": "Inspected & certified free from pests/weevils"
    },
    hscode: "0801.19.10"
  },

  // 2. COCO PEAT 5KG BLOCKS (LOW EC / WASHED)
  {
    id: "coco-peat-5kg-low-ec",
    category: "coir",
    cert: "Coir Board India",
    productName: "Coco Peat 5kg Blocks (Low EC / Washed)",
    title: "Coco Peat 5kg Blocks (Low EC / Washed)",
    image: "assets/images/coco_peat.jpg",
    shortDesc: "Triple-washed premium coconut coir pith blocks engineered for commercial horticulture, hydroponic greenhouses, and potting mixes.",
    origin: "India (Pollachi & Coimbatore, Tamil Nadu)",
    availablePackaging: "Individual shrink-wrapped blocks with/without handles, or naked blocks on pallets",
    bulkPackaging: "Palletized (24 to 26 MT in 40ft HC Container, approx. 4,800 to 5,200 blocks) or Floor Loaded",
    customization: "Available (Custom EC < 0.5 mS/cm, washed/triple-washed, Calcium-Magnesium buffered)",
    privateLabel: "Available (Custom branded shrink-wrap film & barcode stickers)",
    exportMarkets: "USA, Netherlands, Spain, Australia, South Korea, Japan, UAE",
    moq: "1x 40ft High Cube Container (24 to 26 Metric Tonnes)",
    specs: {
      "EC Level": "< 0.5 mS/cm (Washed)",
      "Expansion Volume": "75+ Litres / block",
      "pH Range": "5.8 - 6.8",
      "Moisture": "< 15%",
      "Compression Ratio": "5:1 High Density",
      "Fumigation": "Methyl Bromide / Phosphine Heat-Treated (ISPM 15)"
    },
    hscode: "5305.00.40"
  },

  // 3. FRESH GREEN CHILLI
  {
    id: "fresh-green-chilli",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Fresh Green Chilli",
    title: "Fresh Farm Green Chilli (Export Grade)",
    image: "assets/images/green_chilli.jpg",
    shortDesc: "Crisp, farm-fresh vibrant green chillies harvested at peak maturity with high spicy flavor notes, optimal shelf life, and APEDA export compliance.",
    origin: "India (Tamil Nadu & Andhra Pradesh)",
    availablePackaging: "4 kg to 5 kg Corrugated Export Boxes or 10 kg Mesh Bags",
    bulkPackaging: "40ft Reefer Container (controlled temperature 8°C - 10°C / 12-14 MT)",
    customization: "Available (Size selection: 6-9 cm, stemless or with stem, customized box ventilation)",
    privateLabel: "Available (Custom printed buyer master cartons with barcode stickers)",
    exportMarkets: "UAE, Qatar, Saudi Arabia, UK, Europe, Singapore, Malaysia",
    moq: "1x 20ft Reefer Container (6 MT) or 1x 40ft Reefer Container (12-14 MT)",
    specs: {
      "Length": "6 cm - 10 cm Grade A",
      "Pungency": "Medium to High Spicy",
      "Moisture / Freshness": "Farm harvested, firm green skin",
      "Shelf Life": "21 - 30 days under cold chain (8°C - 10°C)",
      "Pesticide MRL": "Strict APEDA & EU MRL Compliant",
      "Quality Standard": "100% Sorted & De-stemmed on request"
    },
    hscode: "0709.60.10"
  },

  // 4. FRESH RED ONION
  {
    id: "fresh-red-onion",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Fresh Red Onion",
    title: "Fresh Indian Red Onion (Grade A)",
    image: "assets/images/onion.jpg",
    shortDesc: "Premium quality red onions featuring tight outer skins, high pungent aroma, long storage stability, and uniform diameter grading.",
    origin: "India (Maharashtra & Tamil Nadu)",
    availablePackaging: "5 kg, 10 kg, 25 kg Red Mesh Bags or Poly Net Bags",
    bulkPackaging: "40ft Reefer Container (28-29 MT ventilated at 12°C - 14°C) or Open Top Dry",
    customization: "Available (Size grading: 45mm+, 55mm+, 65mm+; mesh bag color & weight)",
    privateLabel: "Available (Importer branded tags & barcode labelling)",
    exportMarkets: "UAE, Saudi Arabia, Malaysia, Sri Lanka, Singapore, Bangladesh, Vietnam",
    moq: "1x 40ft Reefer / Dry Container (28 Metric Tonnes)",
    specs: {
      "Size Diameter": "45mm - 65mm Grade A",
      "Color": "Deep Natural Red / Purple",
      "Dry Matter": "High pungent solids",
      "Shelf Life": "45 - 60 days under proper ventilation",
      "Skin Condition": "Well-cured 3 to 4 outer dry layers",
      "Foreign Matter": "< 0.5%"
    },
    hscode: "0703.10.10"
  },

  // 5. FRESH ELEPHANT FOOT YAM
  {
    id: "fresh-elephant-yam",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Fresh Elephant Foot Yam",
    title: "Fresh Elephant Foot Yam (Suran)",
    image: "assets/images/elephant_yam.jpg",
    shortDesc: "Freshly harvested, sound Elephant Foot Yam tubers (Amorphophallus paeoniifolius) thoroughly cleaned, sun-cured, and packed for global culinary export.",
    origin: "India (Tamil Nadu & Kerala)",
    availablePackaging: "10 kg to 20 kg Ventilated Master Cartons or Heavy Mesh Bags",
    bulkPackaging: "1x 40ft Reefer Container (24-25 MT at controlled temperature)",
    customization: "Available (Weight grading: 1kg - 3kg per tuber, whole or halved, mud cleaned)",
    privateLabel: "Available (Custom box printing with buyer brand & handling instructions)",
    exportMarkets: "UAE, Qatar, GCC, USA, UK, Singapore, Malaysia",
    moq: "1x 20ft Reefer (12 MT) or 1x 40ft Reefer Container (24 MT)",
    specs: {
      "Tuber Weight": "1 kg to 4 kg per tuber",
      "Appearance": "Firm, intact skin, zero rot or sprouts",
      "Curing": "Traditional sun-cured dry skin",
      "Shelf Life": "30 - 45 days in ventilated storage",
      "Quality Grade": "Grade A Export Selected",
      "Phytosanitary": "Government inspected pest-free certificate"
    },
    hscode: "0714.90.90"
  },

  // 6. PREMIUM GOLDEN TURMERIC FINGERS
  {
    id: "turmeric-fingers-salem",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Premium Golden Turmeric Fingers",
    title: "Premium Golden Turmeric Fingers (Salem)",
    image: "assets/images/category_spices.jpg",
    shortDesc: "Deep golden-yellow export grade polished turmeric fingers with high natural curcumin potency (5%+) and rich aroma.",
    origin: "India (Salem, Tamil Nadu)",
    availablePackaging: "25kg / 50kg Jute Burlap Bags or Polypropylene (PP) Bags",
    bulkPackaging: "20ft FCL (approx. 18 Metric Tonnes) / 40ft FCL (approx. 26 Metric Tonnes)",
    customization: "Available (Double-polished, unpolished, steam-sterilized, machine cleaned)",
    privateLabel: "Available (Custom printed bags with buyer logo & batch numbers)",
    exportMarkets: "USA, UAE, Saudi Arabia, Germany, UK, Japan",
    moq: "1x 20ft FCL (18 Metric Tonnes)",
    specs: {
      "Curcumin Content": "3.5% - 5.5% HPLC tested",
      "Moisture": "< 10%",
      "Total Ash": "< 6.5%",
      "Foreign Matter": "< 0.5% (Mechanically cleaned)",
      "Grade": "Salem Double Polished Grade A",
      "Lab Certification": "NABL Accredited Certificate of Analysis"
    },
    hscode: "0910.30.20"
  },

  // 7. EXPORT GRADE DRY RED CHILLIES
  {
    id: "dry-red-chillies",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Export Grade Dry Red Chillies",
    title: "Export Grade Dry Red Chillies (Guntur / Byadgi)",
    image: "assets/images/category_spices.jpg",
    shortDesc: "Sun-dried whole red chillies with stem and stemless options, notable for high natural ASTA color value and fiery pungent aroma.",
    origin: "India (Karnataka & Andhra Pradesh)",
    availablePackaging: "5kg, 10kg, 25kg Jute bags or compressed bales",
    bulkPackaging: "40ft HC Container (approx. 12 to 14 Metric Tonnes)",
    customization: "Available (Stemless, with stem, crushed chilli flakes, whole pods)",
    privateLabel: "Available (Vacuum packed foil bags or buyer-branded master cartons)",
    exportMarkets: "Malaysia, Sri Lanka, UAE, USA, UK, Singapore",
    moq: "1x 40ft HC Container (approx. 12 MT)",
    specs: {
      "Varieties": "S4 Sanam / Teja / Byadgi",
      "Color Value": "ASTA 100 - 150",
      "Pungency (SHU)": "15,000 to 80,000 SHU",
      "Moisture": "< 11%",
      "Foreign Matter": "< 1%",
      "Pesticide Residue": "Strict compliance with US FDA & EU MRL"
    },
    hscode: "0904.21.10"
  },

  // 8. 1121 EXTRA LONG GRAIN BASMATI RICE
  {
    id: "basmati-rice-1121",
    category: "agro",
    cert: "APEDA Certified",
    productName: "1121 Extra Long Grain Basmati Rice",
    title: "1121 Extra Long Grain Basmati Rice",
    image: "assets/images/category_food.jpg",
    shortDesc: "Aged premium 1121 Basmati Rice offering unparalleled elongated grain length (8.35mm+), sweet natural aroma, and fluffy non-sticky texture.",
    origin: "India (APEDA GI Belt)",
    availablePackaging: "1kg, 5kg, 10kg, 20kg, 25kg, 50kg BOPP / Non-Woven Pouches",
    bulkPackaging: "20ft Container (approx. 24 to 26 Metric Tonnes palletized / loose)",
    customization: "Available (White Sella, Golden Sella, Steam, Raw aged 1-2 years)",
    privateLabel: "Available (High-gloss multi-color printed BOPP bags)",
    exportMarkets: "UAE, Saudi Arabia, Kuwait, Oman, UK, USA, Canada, Europe",
    moq: "1x 20ft FCL (24 Metric Tonnes)",
    specs: {
      "Average Grain Length": "8.35mm+ (Post-cook 18mm+)",
      "Purity": "95% pure Basmati",
      "Moisture": "< 12%",
      "Broken Grains": "< 1%",
      "Types Available": "Raw, Steam, White Sella, Golden Sella",
      "Milling Status": "Sortex Cleaned Grade A"
    },
    hscode: "1006.30.20"
  },

  // 9. ALLEPPEY GREEN EXTRA BOLD CARDAMOM
  {
    id: "green-cardamom-alleppey",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Alleppey Green Extra Bold Cardamom (AGEB 8mm+)",
    title: "Alleppey Green Extra Bold Cardamom (8mm+)",
    image: "assets/images/category_spices.jpg",
    shortDesc: "Queen of Spices — top-tier vibrant green cardamom pods hand-picked from Western Ghats with intact essential oils.",
    origin: "India (Bodinayakanur, Tamil Nadu & Idukki, Kerala)",
    availablePackaging: "5kg, 10kg hermetically sealed aluminium foil bags in master cartons",
    bulkPackaging: "Air Freight Pallets (500kg - 2000kg) or 20ft Sea Container",
    customization: "Available (Grading: 8mm+ Extra Bold AGEB, 7.5mm Bold, 7mm Medium)",
    privateLabel: "Available (Retail zip-lock standup pouches 100g, 250g, 500g, 1kg)",
    exportMarkets: "UAE, Saudi Arabia, Qatar, Kuwait, Europe, USA, Japan",
    moq: "500 kg (Air Freight) or 1x 20ft FCL (Sea Freight)",
    specs: {
      "Pod Size": "8mm+ (AGEB Grade Extra Bold)",
      "Volatile Oil": "> 6.5%",
      "Moisture": "< 11%",
      "Color": "Deep Natural Forest Green",
      "Immature/Empty Pods": "< 1%",
      "Packaging Format": "Vacuum Sealed Poly Foil in 5-ply cartons"
    },
    hscode: "0908.31.20"
  },

  // 10. TELLICHERRY GARBLED EXTRA BOLD PEPPER
  {
    id: "black-pepper-tellicherry",
    category: "agro",
    cert: "APEDA Certified",
    productName: "Tellicherry Garbled Extra Bold Pepper (TGSEB)",
    title: "Tellicherry Garbled Extra Bold Pepper (TGSEB)",
    image: "assets/images/category_spices.jpg",
    shortDesc: "The pinnacle of whole black pepper — large 4.75mm+ berries with intense aroma, balanced heat, and complex fruit notes.",
    origin: "India (Malabar Coast & Western Ghats, Kerala)",
    availablePackaging: "25kg / 50kg Multi-wall kraft paper bags with inner food-grade PE liner",
    bulkPackaging: "1x 20ft FCL (approx. 15 to 16 Metric Tonnes)",
    customization: "Available (TGSEB 4.75mm+, TGB 4.25mm+, steam sterilized, cracked pepper)",
    privateLabel: "Available (Consumer glass jars, grinder bottles, stand-up foil pouches)",
    exportMarkets: "USA, Germany, Netherlands, UK, France, Australia",
    moq: "1x 20ft FCL (15 Metric Tonnes) or LCL consolidation from 2 Metric Tonnes",
    specs: {
      "Berry Size": "4.75mm+ (TGSEB Grade)",
      "Piperine Content": "5.5% - 7.0%",
      "Bulk Density": "570 - 600 g/l",
      "Moisture": "< 11.5%",
      "Foreign Matter": "< 0.25%",
      "Sterilization": "Steam treated / ETO on request"
    },
    hscode: "0904.11.20"
  },

  // 11. COCO PEAT 5KG BLOCKS (HIGH EC / UNWASHED)
  {
    id: "coco-peat-5kg-high-ec",
    category: "coir",
    cert: "Coir Board India",
    productName: "Coco Peat 5kg Blocks (High EC / Unwashed)",
    title: "Coco Peat 5kg Blocks (High EC / Unwashed)",
    image: "assets/images/coco_peat.jpg",
    shortDesc: "Natural unwashed coir pith blocks ideal for horse/animal bedding, industrial spill absorption, and open soil conditioning.",
    origin: "India (Tamil Nadu)",
    availablePackaging: "Naked blocks or strapped bundles on wooden pallets",
    bulkPackaging: "40ft High Cube Container (26 MT Floor Loaded / Palletized)",
    customization: "Available (Sieve mesh sizes: 4mm, 6mm, 8mm; coarse or fine pith blends)",
    privateLabel: "Available (Standard export labeling or importer markings)",
    exportMarkets: "Middle East, UK, Europe, Australia, New Zealand",
    moq: "1x 40ft HC Container (26 MT)",
    specs: {
      "EC Level": "> 1.5 mS/cm (Natural)",
      "Expansion Volume": "70 - 75 Litres",
      "pH Range": "5.5 - 6.5",
      "Moisture": "10% - 15%",
      "Fiber Content": "< 3%",
      "Loading Capacity": "26 MT in 40ft HC"
    },
    hscode: "5305.00.40"
  },

  // 12. COCO COIR BRIQUETTES (650G BRICKS)
  {
    id: "coco-briquettes-650g",
    category: "coir",
    cert: "Coir Board India",
    productName: "Coco Coir Briquettes (650g Bricks)",
    title: "Coco Coir Briquettes (650g Bricks)",
    image: "assets/images/coir-showcase.jpg",
    shortDesc: "Retail-ready compact coir bricks engineered for home gardeners, indoor plant nurseries, floriculture, and seed starting.",
    origin: "India (Pollachi / Coimbatore, Tamil Nadu)",
    availablePackaging: "Individual shrink wrap or multipacks (3-pack, 6-pack, 12-pack in master cartons)",
    bulkPackaging: "Master Corrugated Cartons palletized (approx. 24 MT in 40ft HC Container)",
    customization: "Available (Custom brick weights 500g / 650g / 750g, expansion 9-10L)",
    privateLabel: "Available (Full color retail sleeve with brand logo, UPC/EAN barcode & instructions)",
    exportMarkets: "UK, Germany, France, USA, Canada, Japan, Netherlands",
    moq: "1x 20ft FCL (12 MT) or 1x 40ft HC (24 MT)",
    specs: {
      "EC Level": "< 0.5 mS/cm (Low EC)",
      "Expansion Volume": "9 - 10 Litres / brick",
      "pH Range": "5.8 - 6.5",
      "Moisture": "< 12%",
      "Dimensions": "20 x 10 x 5 cm",
      "Packing Format": "Palletized master cartons"
    },
    hscode: "5305.00.40"
  },

  // 13. PREMIUM COCO HUSK CHIPS (CUT COIR)
  {
    id: "coco-chips-husk",
    category: "coir",
    cert: "Coir Board India",
    productName: "Premium Coco Husk Chips (Cut Coir)",
    title: "Premium Coco Husk Chips (Cut Coir)",
    image: "assets/images/coir-showcase.jpg",
    shortDesc: "Uniformly cut coconut husk cubes providing superior aeration, drainage, and root structure for orchids, berries, and anthuriums.",
    origin: "India (Tamil Nadu)",
    availablePackaging: "5kg compressed blocks / 25kg loose poly bags / 50L grow bags",
    bulkPackaging: "40ft HC Container (approx. 22 - 24 MT palletized)",
    customization: "Available (Chip sizes: 6-12mm, 10-18mm, 12-25mm uniform grades)",
    privateLabel: "Available (Custom printed bags with buyer specifications)",
    exportMarkets: "USA, Netherlands, Mexico, Turkey, China, Chile",
    moq: "1x 40ft HC Container (22 MT)",
    specs: {
      "Chip Size": "10mm - 18mm uniform",
      "EC Level": "< 0.7 mS/cm",
      "Air Filled Porosity": "25% - 35%",
      "pH Range": "5.8 - 6.5",
      "Moisture": "< 18%",
      "Packaging Type": "5kg blocks, 25kg bales or Grow Slabs"
    },
    hscode: "5305.00.40"
  },

  // 14. NATURAL BROWN COIR FIBER BALES
  {
    id: "coir-fiber-bales",
    category: "coir",
    cert: "Coir Board India",
    productName: "Natural Brown Coir Fiber Bales",
    title: "Natural Brown Coir Fiber Bales",
    image: "assets/images/coir-showcase.jpg",
    shortDesc: "Long-staple golden brown coir fiber extracted from seasoned coconut husks for mattress, upholstery, automobile seating, and erosion control.",
    origin: "India (Pollachi, Tamil Nadu & Kerala)",
    availablePackaging: "110kg to 130kg hydraulically pressed bales tied with plastic / iron straps",
    bulkPackaging: "180 to 200 bales in 1x 40ft HC Container (approx. 22 - 24 Metric Tonnes)",
    customization: "Available (Fiber length 10cm - 25cm Grade A, cleaned / double-cleaned)",
    privateLabel: "Available (Export stencil marking on bales)",
    exportMarkets: "China, Europe, Russia, USA, Brazil, Vietnam",
    moq: "1x 40ft HC Container (22 MT)",
    specs: {
      "Fiber Length": "10cm - 25cm (Grade A)",
      "Moisture": "< 15%",
      "Impurities / Dust": "< 2.5%",
      "Bale Weight": "110kg - 130kg pressed",
      "Color": "Golden Brown / Natural Tan",
      "Container Load": "180 - 200 Bales (22-24 MT)"
    },
    hscode: "5305.00.10"
  },

  // 15. HYDROPONIC COIR GROW SLABS & BAGS
  {
    id: "coir-grow-bags",
    category: "coir",
    cert: "Coir Board India",
    productName: "Hydroponic Coir Grow Slabs & Bags",
    title: "Hydroponic Coir Grow Slabs & Bags",
    image: "assets/images/coir-showcase.jpg",
    shortDesc: "Commercial greenhouse grow slabs engineered with customized coir pith to husk chip ratios in 3-year UV stabilized co-extruded sleeves.",
    origin: "India (Tamil Nadu)",
    availablePackaging: "Co-extruded UV-treated plastic sleeves (White outside, Black inside)",
    bulkPackaging: "Palletized in 40ft HC Container (approx. 12,000 to 14,000 slabs)",
    customization: "Available (Custom Peat:Chip ratios 70:30, 50:50, pre-cut plant holes & drainage slits)",
    privateLabel: "Available (Custom printed UV bags with grower branding)",
    exportMarkets: "Netherlands, Spain, Australia, Mexico, Canada, UAE",
    moq: "1x 40ft HC Container (approx. 12,000 slabs)",
    specs: {
      "Substrate Mix": "70% Peat + 30% Husk Chips",
      "EC Level": "< 0.5 mS/cm Super-Washed",
      "UV Stability": "3 Years UV treated co-extruded bags",
      "Sizes": "100x15x12cm / 100x20x10cm / Custom plant holes",
      "Drainage": "Pre-cut drainage slits on request",
      "Loading": "Palletized, 12,000 to 14,000 slabs per 40ft HC"
    },
    hscode: "5305.00.40"
  }
];

// Initialize Catalog
document.addEventListener("DOMContentLoaded", () => {
  renderProductsCatalog("all");
  setupProductFilterTabs();
  populateRFQProductSelect();
});

function renderProductsCatalog(category = "all") {
  const container = document.getElementById("products-container");
  if (!container) return;

  const filtered = category === "all" 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === category);

  container.innerHTML = filtered.map(product => {
    let badgeClass = "badge-apeda";
    if (product.category === "coir") {
      badgeClass = "badge-coir";
    } else if (product.id.includes("turmeric")) {
      badgeClass = "badge-turmeric";
    } else if (product.id.includes("chilli")) {
      badgeClass = "badge-chilli";
    } else if (product.id.includes("rice") || product.id.includes("basmati")) {
      badgeClass = "badge-rice";
    } else if (product.id.includes("cardamom")) {
      badgeClass = "badge-cardamom";
    } else if (product.id.includes("coconut") || product.id.includes("pepper")) {
      badgeClass = "badge-marine";
    }

    return `
      <div class="product-card tilt-card-3d" data-category="${product.category}">
        <div class="product-card-img-wrap" style="height: 135px; max-height: 135px; overflow: hidden;">
          <span class="product-card-badge ${badgeClass}">${product.cert}</span>
          <img src="${product.image}" alt="${product.title}" style="height: 135px; max-height: 135px; width: 100%; object-fit: cover;" loading="lazy">
        </div>
        <div class="product-card-body">
          <h4>${product.title}</h4>
          <p class="product-card-desc">${product.shortDesc}</p>

          <!-- Standard Export Specs Quick Preview -->
          <div class="product-specs-table">
            <div class="spec-row">
              <span class="spec-label">Origin:</span>
              <span class="spec-val">${product.origin}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Packaging:</span>
              <span class="spec-val">${product.availablePackaging.split('(')[0].trim()}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Export Markets:</span>
              <span class="spec-val" style="color: #2563eb;">${product.exportMarkets.split(',').slice(0, 2).join(', ')}...</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">MOQ:</span>
              <span class="spec-val" style="color: #ea580c;">${product.moq.split('(')[0].trim()}</span>
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn btn-primary btn-3d btn-sm" onclick="triggerQuoteForProduct('${product.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Request Quote &rarr;
            </button>
            <button class="btn btn-outline btn-3d btn-sm" onclick="openProductSpecModal('${product.id}')">
              Full Export Info
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterCategoryFromCard(cat) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(b => {
    if (b.getAttribute("data-filter") === cat) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
  renderProductsCatalog(cat);
}

function setupProductFilterTabs() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProductsCatalog(category);
    });
  });
}

function populateRFQProductSelect() {
  const select = document.getElementById("rfq-product-select");
  if (!select) return;

  select.innerHTML = `<option value="" disabled selected>Select Export Product...</option>`;

  const coirGroup = document.createElement("optgroup");
  coirGroup.label = "Coir Board Certified Substrates";
  
  const agroGroup = document.createElement("optgroup");
  agroGroup.label = "APEDA Certified Agro Commodities";

  PRODUCTS_DATA.forEach(prod => {
    const opt = document.createElement("option");
    opt.value = prod.productName;
    opt.textContent = `${prod.productName} (HS: ${prod.hscode})`;
    if (prod.category === "coir") {
      coirGroup.appendChild(opt);
    } else {
      agroGroup.appendChild(opt);
    }
  });

  select.appendChild(coirGroup);
  select.appendChild(agroGroup);
}

// Open Detailed Product Spec Modal in the requested standard layout
function openProductSpecModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modalTitle = document.getElementById("spec-modal-title");
  const modalBody = document.getElementById("spec-modal-body");
  const modal = document.getElementById("product-spec-modal");

  if (modalTitle) modalTitle.textContent = product.productName;
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="background: linear-gradient(135deg, #0a2230 0%, #163e56 100%); color: #fff; padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; box-shadow: 0 10px 25px rgba(10,34,48,0.3); border: 1px solid rgba(223,186,115,0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.5rem;">
          <h4 style="font-size: 1.3rem; font-weight: 900; color: #ffffff; margin: 0;">${product.productName}</h4>
          <span class="cert-badge-pill" style="background: rgba(223,186,115,0.2); color: #dfba73; border: 1px solid #dfba73;">${product.cert}</span>
        </div>
        <p style="font-size: 0.88rem; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.5;">${product.shortDesc}</p>
      </div>

      <!-- Requested Standardized Export Information Table -->
      <h5 style="font-size: 1rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        Export Profile & Trade Parameters:
      </h5>

      <table class="cert-meta-table" style="margin-bottom: 1.5rem;">
        <tbody>
          <tr>
            <td class="label">Product Name:</td>
            <td class="val" style="color: #0f172a; font-weight: 800;">${product.productName}</td>
          </tr>
          <tr>
            <td class="label">Category:</td>
            <td class="val">${product.category === 'coir' ? 'Coir Substrates & Horticulture (Coir Board)' : 'Agricultural Produce & Spices (APEDA)'}</td>
          </tr>
          <tr>
            <td class="label">Origin:</td>
            <td class="val" style="color: #059669; font-weight: 700;">${product.origin}</td>
          </tr>
          <tr>
            <td class="label">Available Packaging:</td>
            <td class="val">${product.availablePackaging}</td>
          </tr>
          <tr>
            <td class="label">Bulk Packaging:</td>
            <td class="val">${product.bulkPackaging}</td>
          </tr>
          <tr>
            <td class="label">Customization:</td>
            <td class="val" style="color: #2563eb; font-weight: 700;">${product.customization}</td>
          </tr>
          <tr>
            <td class="label">Private Label:</td>
            <td class="val" style="color: #7c3aed; font-weight: 700;">${product.privateLabel}</td>
          </tr>
          <tr>
            <td class="label">Export Markets:</td>
            <td class="val" style="color: #ea580c; font-weight: 700;">${product.exportMarkets}</td>
          </tr>
          <tr>
            <td class="label">MOQ (Min. Order Qty):</td>
            <td class="val" style="color: #e11d48; font-weight: 900;">${product.moq}</td>
          </tr>
          <tr>
            <td class="label">HS Code:</td>
            <td class="val" style="color: #0f172a; font-family: monospace; font-size: 0.95rem;">${product.hscode}</td>
          </tr>
        </tbody>
      </table>

      <!-- Technical & Lab Specs -->
      <h5 style="font-size: 1rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        Laboratory Quality & Bio-Security Parameters:
      </h5>

      <table class="cert-meta-table" style="margin-bottom: 1.5rem;">
        <tbody>
          ${Object.entries(product.specs).map(([k, v]) => `
            <tr>
              <td class="label">${k}:</td>
              <td class="val">${v}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; padding: 1.15rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <div style="font-weight: 800; font-size: 0.85rem; color: #b45309; margin-bottom: 0.3rem;">
          Export Inspection & Fumigation Protocol:
        </div>
        <p style="font-size: 0.82rem; color: #78350f; margin: 0; line-height: 1.5;">
          All shipments include mandatory Phytosanitary Certificate issued by Plant Quarantine Organization of India, Fumigation Certificate (Methyl Bromide/Phosphine), Certificate of Origin (Chamber of Commerce), and Batch Quality Analysis Report.
        </p>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button class="btn btn-primary btn-3d" style="flex: 1;" onclick="closeModal('product-spec-modal'); triggerQuoteForProduct('${product.id}');">
          Request Quotation for ${product.productName}
        </button>
        <button class="btn btn-whatsapp btn-3d" style="flex: 1;" onclick="handleWhatsAppQuoteForProduct('${product.productName}'); closeModal('product-spec-modal');">
          WhatsApp Quote
        </button>
      </div>
    `;
  }

  if (modal) modal.classList.add("active");
}

function handleWhatsAppQuoteForProduct(productName) {
  const number = "918344767687";
  const message = `*EXPORT INQUIRY - NILITE EXPORTS*\nProduct: ${productName}\nPlease provide current FOB / CIF quotation, packaging specs, and earliest shipping schedule.`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
}

function triggerQuoteForProduct(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const select = document.getElementById("rfq-product-select");
  if (select) {
    select.value = product.productName;
  }

  // Pre-fill MOQ in volume field if empty
  const volumeInput = document.getElementById("rfq-volume");
  if (volumeInput && (!volumeInput.value || volumeInput.value.trim() === "")) {
    volumeInput.value = product.moq.split('(')[0].trim();
  }

  // Scroll smoothly to RFQ section
  const rfqSection = document.getElementById("rfq-section");
  if (rfqSection) {
    rfqSection.scrollIntoView({ behavior: "smooth" });
  }

  if (window.showToast) {
    window.showToast(`Selected "${product.productName}" (MOQ: ${product.moq.split('(')[0].trim()})`);
  }
}

// Open Master Trade Specifications Dossier (All 12 Products)
function openMasterCatalogModal() {
  const modal = document.getElementById("master-catalog-modal");
  const modalBody = document.getElementById("master-catalog-modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background: linear-gradient(135deg, #0a2230 0%, #163e56 100%); color: #fff; padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid rgba(223,186,115,0.4);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin: 0 0 0.25rem 0;">Nilite Exports - Full Commodities Trade Matrix</h4>
          <p style="font-size: 0.85rem; color: rgba(255,255,255,0.85); margin: 0;">Standardized international export specifications across all 15 Coir & APEDA certified lines.</p>
        </div>
        <button class="btn btn-primary btn-sm btn-3d" onclick="copyFullTradeSpecsToClipboard()">
          📋 Copy All 15 Product Specs
        </button>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-height: 65vh; overflow-y: auto; padding-right: 0.5rem;">
      ${PRODUCTS_DATA.map((p, idx) => `
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; color: #dfba73; text-transform: uppercase; letter-spacing: 0.05em;">#${idx + 1} &bull; ${p.category === 'coir' ? 'Coir Board Registered' : 'APEDA Certified'}</span>
              <h5 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0.15rem 0 0 0;">${p.productName}</h5>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-3d btn-sm" onclick="closeModal('master-catalog-modal'); openProductSpecModal('${p.id}')">Full Lab Specs</button>
              <button class="btn btn-primary btn-3d btn-sm" onclick="closeModal('master-catalog-modal'); triggerQuoteForProduct('${p.id}')">Get Quote</button>
            </div>
          </div>

          <table class="cert-meta-table" style="font-size: 0.85rem;">
            <tbody>
              <tr><td class="label" style="width: 32%;">Product Name:</td><td class="val" style="font-weight: 700; color: #0f172a;">${p.productName}</td></tr>
              <tr><td class="label">Category:</td><td class="val">${p.category === 'coir' ? 'Horticultural Coir Substrates' : 'Agro Produce & Spices'}</td></tr>
              <tr><td class="label">Origin:</td><td class="val" style="color: #059669; font-weight: 700;">${p.origin}</td></tr>
              <tr><td class="label">Available Packaging:</td><td class="val">${p.availablePackaging}</td></tr>
              <tr><td class="label">Bulk Packaging:</td><td class="val">${p.bulkPackaging}</td></tr>
              <tr><td class="label">Customization:</td><td class="val" style="color: #2563eb; font-weight: 600;">${p.customization}</td></tr>
              <tr><td class="label">Private Label:</td><td class="val" style="color: #7c3aed; font-weight: 600;">${p.privateLabel}</td></tr>
              <tr><td class="label">Export Markets:</td><td class="val" style="color: #ea580c; font-weight: 600;">${p.exportMarkets}</td></tr>
              <tr><td class="label">MOQ:</td><td class="val" style="color: #e11d48; font-weight: 800;">${p.moq}</td></tr>
              <tr><td class="label">HS Code:</td><td class="val" style="font-family: monospace;">${p.hscode}</td></tr>
            </tbody>
          </table>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add("active");
}

function copyFullTradeSpecsToClipboard() {
  let text = "NILITE EXPORTS - COMPLETE COMMODITIES SPECIFICATION MATRIX\\n";
  text += "Registered with Coir Board India & APEDA | Port: Tuticorin (135km)\\n";
  text += "Phone: +91 8344767687 / +91 9597596903 | Email: niliteexports@gmail.com\\n\\n";

  PRODUCTS_DATA.forEach((p, i) => {
    text += `${i + 1}. Product Name: ${p.productName}\\n`;
    text += `Category: ${p.category === 'coir' ? 'Coir Board Registered' : 'APEDA Certified'}\\n`;
    text += `Origin: ${p.origin}\\n`;
    text += `Available Packaging: ${p.availablePackaging}\\n`;
    text += `Bulk Packaging: ${p.bulkPackaging}\\n`;
    text += `Customization: ${p.customization}\\n`;
    text += `Private Label: ${p.privateLabel}\\n`;
    text += `Export Markets: ${p.exportMarkets}\\n`;
    text += `MOQ: ${p.moq}\\n`;
    text += `HS Code: ${p.hscode}\\n`;
    text += `-----------------------------------------------------\\n\\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    if (window.showToast) {
      window.showToast("Copied all 12 product specifications to clipboard!");
    } else {
      alert("All product specifications copied to clipboard!");
    }
  }).catch(() => {
    alert("Unable to copy to clipboard automatically. You can review the specs directly in the table.");
  });
}
