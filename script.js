// ──────────────────────────────────────
// 1. THEME TOGGLE
// ──────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  // Persist preference
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Apply saved theme on load (before paint)
(function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();


// ──────────────────────────────────────
// 2. SUBTLE PARTICLE CANVAS
// ──────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Read particle color from CSS variables so it respects theme
  function getParticleColor(alpha) {
    const style = getComputedStyle(document.documentElement);
    // Fallback to light values if vars not available
    const r = parseInt(style.getPropertyValue('--p-r').trim()) || 107;
    const g = parseInt(style.getPropertyValue('--p-g').trim()) || 93;
    const b = parseInt(style.getPropertyValue('--p-b').trim()) || 82;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x       = Math.random() * W;
      this.y       = initial ? Math.random() * H : H + 10;
      this.r       = Math.random() * 1.5 + 0.5;
      this.vx      = (Math.random() - 0.5) * 0.3;
      this.vy      = -(Math.random() * 0.4 + 0.15);
      this.life    = 0;
      this.maxLife = Math.random() * 400 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset(false);
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.25;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = getParticleColor(alpha);
      ctx.fill();
    }
  }

  const particles = [];
  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();


// ──────────────────────────────────────
// 3. START JOURNEY — BOOK OPEN
// ──────────────────────────────────────
function startJourney() {
  const cover   = document.getElementById('cover');
  const overlay = document.getElementById('bookOverlay');
  const journey = document.getElementById('journey');
  const left    = document.getElementById('pageLeft');
  const right   = document.getElementById('pageRight');

  cover.style.transition    = 'opacity 0.6s ease';
  cover.style.opacity       = '0';
  cover.style.pointerEvents = 'none';

  setTimeout(() => {
    cover.style.display = 'none';
    overlay.style.display = 'block';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        left.classList.add('open');
        right.classList.add('open');
      });
    });

    setTimeout(() => {
      overlay.style.display = 'none';
      journey.style.opacity = '1';
      initScrollReveal();
      animateHero();
    }, 1200);

  }, 500);
}


// ──────────────────────────────────────
// 4. HERO ENTRANCE
// ──────────────────────────────────────
function animateHero() {
  const heroSection = document.querySelector('#journey section:first-child');
  if (!heroSection) return;
  heroSection.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('in-view'), 200 + i * 120);
  });
}


// ──────────────────────────────────────
// 5. SCROLL REVEAL
// ──────────────────────────────────────
function initScrollReveal() {
  const journey = document.getElementById('journey');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('memory-card')) {
        const siblings = Array.from(el.parentElement.querySelectorAll('.memory-card'));
        setTimeout(() => el.classList.add('in-view'), siblings.indexOf(el) * 120);
      } else {
        el.classList.add('in-view');
      }
      observer.unobserve(el);
    });
  }, { root: journey, threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  const heroSection = journey.querySelector('section:first-child');
  journey.querySelectorAll('.reveal, .memory-card').forEach(el => {
    if (!heroSection.contains(el)) observer.observe(el);
  });
}


// ──────────────────────────────────────
// 6. CONFETTI — theme-aware palette
// ──────────────────────────────────────
function launchConfetti() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const tones = isDark
    ? ['#3a3835', '#979691', '#1e2022', '#b0aaa4', '#D0CCC6', '#4a4845', '#ffffff', '#888480']
    : ['#d6cfc4', '#a89d90', '#ede8e0', '#6b5d52', '#f8f4ef', '#c5bdb3', '#000000', '#9a8f84'];

  const shapes = ['circle', 'rect'];

  for (let i = 0; i < 80; i++) {
    const piece    = document.createElement('div');
    piece.classList.add('confetti-piece');
    const size     = Math.random() * 8 + 4;
    const shape    = shapes[Math.floor(Math.random() * shapes.length)];
    const color    = tones[Math.floor(Math.random() * tones.length)];
    const duration = Math.random() * 2 + 2.5;
    const delay    = Math.random() * 0.6;

    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      width:  ${shape === 'circle' ? size : size * 0.6}px;
      height: ${shape === 'circle' ? size : size * 1.4}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : '1px'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      transform: rotate(${Math.random() * 720 - 360}deg);
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + delay + 0.5) * 1000);
  }
}
