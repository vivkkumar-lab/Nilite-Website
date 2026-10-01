/**
 * NILITE EXPORTS - INTERACTIVE 3D BACKGROUND PARTICLE & DEPTH ENGINE
 * Hardware-accelerated Canvas 3D constellation with cursor-reactive parallax
 */

class Background3DScene {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.nodes = [];
    this.nodeCount = 65;
    this.maxDistance = 115;
    this.fov = 420;
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetAngleX = 0;
    this.targetAngleY = 0;
    this.currentAngleX = 0;
    this.currentAngleY = 0;
    
    this.animationFrameId = null;
    this.isRunning = true;
    
    this.colors = [
      "rgba(225, 29, 72, ",   // Ruby Red Chilli
      "rgba(245, 158, 11, ",  // Golden Saffron Turmeric
      "rgba(14, 165, 233, ",  // Ocean Azure Blue
      "rgba(139, 92, 246, ",  // Royal Amethyst Purple
      "rgba(0, 229, 153, ",   // Tropical Mint
      "rgba(251, 133, 0, ",   // Sunset Amber
      "rgba(244, 63, 94, ",   // Warm Coral Pink
      "rgba(223, 186, 115, "  // Metallic Gold
    ];

    this.init();
  }

  init() {
    this.setupCanvas();
    this.createNodes();
    this.bindEvents();
    this.render();
  }

  setupCanvas() {
    let canvas = document.getElementById("bg-3d-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "bg-3d-canvas";
      document.body.prepend(canvas);
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Mobile Performance Optimization
    if (this.width < 768) {
      this.nodeCount = 20;
    } else {
      this.nodeCount = 50;
    }
  }

  createNodes() {
    this.nodes = [];
    const spreadX = Math.max(this.width * 0.9, 900);
    const spreadY = Math.max(this.height * 0.9, 700);
    const spreadZ = 600;

    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push({
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
        z: (Math.random() - 0.5) * spreadZ,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        baseRadius: 1.5 + Math.random() * 2.5,
        colorPrefix: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createNodes();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.targetAngleY = (this.mouseX / this.width - 0.5) * 0.35;
      this.targetAngleX = (this.mouseY / this.height - 0.5) * -0.35;
    });

    // Pause when page is hidden
    document.addEventListener("visibilitychange", () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.render();
      } else {
        cancelAnimationFrame(this.animationFrameId);
      }
    });
  }

  render() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth angle interpolation
    this.currentAngleX += (this.targetAngleX - this.currentAngleX) * 0.05;
    this.currentAngleY += (this.targetAngleY - this.currentAngleY) * 0.05;

    // Ambient rotation drift
    const driftY = 0.0015;
    this.targetAngleY += driftY;

    const cosX = Math.cos(this.currentAngleX);
    const sinX = Math.sin(this.currentAngleX);
    const cosY = Math.cos(this.currentAngleY);
    const sinY = Math.sin(this.currentAngleY);

    const projectedNodes = [];

    // 3D Rotate and Project Nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Drift in 3D
      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;

      // Wrap around bounds
      const boundX = this.width * 0.55;
      const boundY = this.height * 0.55;
      const boundZ = 320;
      if (node.x > boundX) node.x = -boundX;
      if (node.x < -boundX) node.x = boundX;
      if (node.y > boundY) node.y = -boundY;
      if (node.y < -boundY) node.y = boundY;
      if (node.z > boundZ) node.z = -boundZ;
      if (node.z < -boundZ) node.z = boundZ;

      // Y-axis rotation
      const x1 = node.x * cosY - node.z * sinY;
      const z1 = node.x * sinY + node.z * cosY;

      // X-axis rotation
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      // Perspective scale
      const projectedZ = z2 + 100;
      const scale = this.fov / (this.fov + projectedZ);

      if (scale > 0) {
        const screenX = x1 * scale + this.centerX;
        const screenY = y2 * scale + this.centerY;
        const radius = Math.max(node.baseRadius * scale, 0.5);
        const alpha = Math.min(Math.max((scale - 0.3) * 0.9, 0.1), 0.85);

        projectedNodes.push({
          screenX,
          screenY,
          radius,
          alpha,
          colorPrefix: node.colorPrefix,
          scale
        });
      }
    }

    // Draw connecting 3D constellation lines
    const len = projectedNodes.length;
    for (let i = 0; i < len; i++) {
      const p1 = projectedNodes[i];
      for (let j = i + 1; j < len; j++) {
        const p2 = projectedNodes[j];
        const dx = p1.screenX - p2.screenX;
        const dy = p1.screenY - p2.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const lineAlpha = (1 - dist / this.maxDistance) * Math.min(p1.alpha, p2.alpha) * 0.45;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(223, 186, 115, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8 * Math.min(p1.scale, p2.scale);
          this.ctx.moveTo(p1.screenX, p1.screenY);
          this.ctx.lineTo(p2.screenX, p2.screenY);
          this.ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    for (let i = 0; i < len; i++) {
      const p = projectedNodes[i];

      // Soft ambient glow halo
      this.ctx.beginPath();
      this.ctx.arc(p.screenX, p.screenY, p.radius * 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = p.colorPrefix + (p.alpha * 0.25) + ")";
      this.ctx.fill();

      // Sharp central node
      this.ctx.beginPath();
      this.ctx.arc(p.screenX, p.screenY, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.colorPrefix + p.alpha + ")";
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
}

// Auto instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.background3DScene = new Background3DScene();
});
