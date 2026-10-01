/**
 * NILITE EXPORTS - INTERACTIVE COCONUT TREE HARVEST ENGINE
 * Real-time physics drop animation, Web Audio synthesis, and harvest gamification
 */

class CoconutHarvestEngine {
  constructor() {
    this.harvestCount = 0;
    this.soundEnabled = true;
    this.audioCtx = null;
    this.isDropping = false;
    this.coconutsPositions = [
      { x: 145, y: 110 },
      { x: 165, y: 115 },
      { x: 155, y: 125 },
      { x: 175, y: 120 }
    ];
    this.init();
  }

  init() {
    this.injectTreeSVG();
    this.bindEvents();
    this.updateCounterUI();
  }

  // Generate high-detail vector Coconut Palm Tree
  injectTreeSVG() {
    const treeWrap = document.getElementById("coconut-tree-wrap");
    if (!treeWrap) return;

    treeWrap.innerHTML = `
      <svg viewBox="0 0 320 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Trunk Texture Gradient -->
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#451a03" />
            <stop offset="40%" stop-color="#78350f" />
            <stop offset="70%" stop-color="#92400e" />
            <stop offset="100%" stop-color="#451a03" />
          </linearGradient>

          <!-- Frond Leaves Vibrant Emerald Gradient -->
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669" />
            <stop offset="50%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>

          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="60%" stop-color="#00e599" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Trunk with Curved Natural Aesthetic -->
        <g id="palm-trunk" filter="url(#shadowFilter)">
          <path d="M 160 120 Q 140 230 150 380 L 175 380 Q 165 230 170 120 Z" fill="url(#trunkGrad)" />
          <!-- Trunk Bark Texture Ridges -->
          <ellipse cx="152" cy="340" rx="14" ry="4" fill="#3b1502" opacity="0.6"/>
          <ellipse cx="150" cy="300" rx="13" ry="3.5" fill="#3b1502" opacity="0.6"/>
          <ellipse cx="147" cy="260" rx="12" ry="3" fill="#3b1502" opacity="0.6"/>
          <ellipse cx="146" cy="220" rx="11" ry="3" fill="#3b1502" opacity="0.6"/>
          <ellipse cx="149" cy="180" rx="10" ry="2.5" fill="#3b1502" opacity="0.6"/>
          <ellipse cx="155" cy="140" rx="9" ry="2" fill="#3b1502" opacity="0.6"/>
        </g>

        <!-- Palm Fronds (Lush Green Arching Leaves) -->
        <g id="palm-fronds" filter="url(#shadowFilter)">
          <!-- Top Left Frond -->
          <path d="M 160 120 C 130 90, 60 80, 20 120 C 60 100, 110 110, 160 120 Z" fill="url(#leafGrad1)" />
          <path d="M 160 120 C 120 70, 70 50, 40 80 C 80 70, 120 85, 160 120 Z" fill="url(#leafGrad2)" />

          <!-- Top Right Frond -->
          <path d="M 160 120 C 190 90, 260 80, 300 120 C 260 100, 210 110, 160 120 Z" fill="url(#leafGrad1)" />
          <path d="M 160 120 C 200 70, 250 50, 280 80 C 240 70, 200 85, 160 120 Z" fill="url(#leafGrad2)" />

          <!-- Upper Crown Center Fronds -->
          <path d="M 160 120 C 150 50, 130 10, 100 20 C 130 30, 150 70, 160 120 Z" fill="url(#leafGrad2)" />
          <path d="M 160 120 C 170 50, 190 10, 220 20 C 190 30, 170 70, 160 120 Z" fill="url(#leafGrad1)" />
          <path d="M 160 120 C 160 40, 150 0, 160 0 C 170 0, 160 40, 160 120 Z" fill="url(#leafGrad2)" />

          <!-- Lower Drooping Fronds -->
          <path d="M 160 120 C 110 120, 50 150, 30 200 C 60 160, 120 150, 160 120 Z" fill="url(#leafGrad1)" />
          <path d="M 160 120 C 210 120, 270 150, 290 200 C 260 160, 200 150, 160 120 Z" fill="url(#leafGrad2)" />
        </g>

        <!-- Base Coconut Crown Junction -->
        <circle cx="160" cy="120" r="14" fill="#3b1502" />
      </svg>

      <!-- Hanging Interactive Coconuts in DOM for 3D physics -->
      ${this.coconutsPositions.map((pos, idx) => `
        <div class="hanging-coconut" id="hanging-coconut-${idx}" style="left: ${pos.x}px; top: ${pos.y}px;" data-idx="${idx}" title="Click to harvest!"></div>
      `).join('')}
    `;
  }

  bindEvents() {
    const stage = document.getElementById("coconut-tree-stage");
    const soundToggle = document.getElementById("sound-toggle-btn");

    if (stage) {
      stage.addEventListener("click", (e) => {
        // Prevent sound toggle click from triggering drop
        if (e.target.closest("#sound-toggle-btn")) return;
        this.harvestCoconut();
      });

      // Touch friendly for mobile
      stage.addEventListener("touchstart", (e) => {
        if (e.target.closest("#sound-toggle-btn")) return;
        this.harvestCoconut();
      }, { passive: true });
    }

    if (soundToggle) {
      soundToggle.addEventListener("click", () => {
        this.soundEnabled = !this.soundEnabled;
        soundToggle.innerHTML = this.soundEnabled 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Sound On`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Muted`;
      });
    }
  }

  // Play natural synthesized audio
  playAudio(type) {
    if (!this.soundEnabled) return;

    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (type === 'snap') {
        // High pitch snap when detaching from tree
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.08);
      } else if (type === 'thud') {
        // Hollow wooden thud when landing in export crate
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, this.audioCtx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // AudioContext fallback safely ignored
    }
  }

  // Harvest action
  harvestCoconut() {
    const treeWrap = document.getElementById("coconut-tree-wrap");
    const stage = document.getElementById("coconut-tree-stage");
    const crate = document.getElementById("export-crate-basket");
    if (!stage || !crate) return;

    // Shake tree
    if (treeWrap) {
      treeWrap.classList.remove("tree-shake-active");
      void treeWrap.offsetWidth; // Force reflow
      treeWrap.classList.add("tree-shake-active");
    }

    this.playAudio('snap');

    // Pick random start position from cluster
    const startIdx = Math.floor(Math.random() * this.coconutsPositions.length);
    const startPos = this.coconutsPositions[startIdx];

    // Create falling coconut element
    const coconut = document.createElement("div");
    coconut.className = "falling-coconut";
    stage.appendChild(coconut);

    let posX = (stage.clientWidth / 2) + (startPos.x - 160);
    let posY = startPos.y;
    let velX = (Math.random() - 0.5) * 1.5;
    let velY = 1.5;
    const gravity = 0.92;
    let rotation = 0;
    const rotSpeed = (Math.random() - 0.5) * 16;
    const targetY = stage.clientHeight - 95; // Crate top position

    let bounceCount = 0;

    const animateDrop = () => {
      velY += gravity;
      posY += velY;
      posX += velX;
      rotation += rotSpeed;

      // Hit the crate
      if (posY >= targetY) {
        posY = targetY;
        this.playAudio('thud');

        // Basket impact bounce
        crate.classList.add("basket-hit");
        setTimeout(() => crate.classList.remove("basket-hit"), 200);

        // Spawn splash particles
        this.spawnImpactParticles(stage, posX + 16, posY + 20);

        bounceCount++;
        if (bounceCount <= 1) {
          velY = -velY * 0.35; // One realistic bounce
        } else {
          // Finished falling!
          coconut.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          coconut.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(0.6)`;
          coconut.style.opacity = "0";

          setTimeout(() => {
            coconut.remove();
          }, 400);

          this.onHarvestSuccess(stage);
          return;
        }
      }

      coconut.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rotation}deg)`;
      requestAnimationFrame(animateDrop);
    };

    requestAnimationFrame(animateDrop);
  }

  // Particle burst on crate landing
  spawnImpactParticles(container, x, y) {
    const colors = ["#00e599", "#ffb703", "#a3ff00", "#ffffff"];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("div");
      p.className = "splash-particle";
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      container.appendChild(p);

      const angle = (Math.PI * 2 * i) / 8;
      const speed = 2 + Math.random() * 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 2;

      let px = x;
      let py = y;
      let opacity = 1;

      const animParticle = () => {
        px += vx;
        py += vy;
        opacity -= 0.05;
        p.style.left = `${px}px`;
        p.style.top = `${py}px`;
        p.style.opacity = opacity;

        if (opacity > 0) {
          requestAnimationFrame(animParticle);
        } else {
          p.remove();
        }
      };
      requestAnimationFrame(animParticle);
    }
  }

  // Update counter & show reward popup
  onHarvestSuccess(stage) {
    this.harvestCount++;
    this.updateCounterUI();

    // Floating text indicator
    const toast = document.createElement("div");
    toast.className = "harvest-toast";
    toast.textContent = `🥥 +1 Harvested! (Total: ${this.harvestCount})`;
    stage.appendChild(toast);
    setTimeout(() => toast.remove(), 1000);

    // Perk unlocks
    if (this.harvestCount === 3) {
      if (window.showToast) {
        window.showToast("🎉 Awesome! You harvested 3 export coconuts! Special proforma priority enabled.");
      }
      const notes = document.getElementById("rfq-notes");
      if (notes && !notes.value.includes("Special Harvester Inquiry")) {
        notes.value = "[Verified Harvest Visitor] Please apply export proforma priority and packaging discounts.";
      }
    }
  }

  updateCounterUI() {
    const el = document.getElementById("harvest-counter-val");
    if (el) {
      el.textContent = this.harvestCount;
    }
  }
}

// Auto initialize on load
document.addEventListener("DOMContentLoaded", () => {
  window.coconutHarvestEngine = new CoconutHarvestEngine();
});
