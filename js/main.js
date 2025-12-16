document.addEventListener('DOMContentLoaded', () => {

  /* =============================
     MENÚ HAMBURGUESA
  ============================= */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      hamburger.classList.toggle('active');
    });
  }

  /* =============================
     LINK ACTIVO
  ============================= */
  const links = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop();

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* =============================
     SCROLL REVEAL (ÚNICO SISTEMA)
  ============================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(
    '.skill-card, .project-card, .hobby-card, .reason-card, .timeline-item'
  ).forEach(el => revealObserver.observe(el));

  /* =============================
     PROYECTOS (DEMO / REPO)
  ============================= */
  document.querySelectorAll('.project-media a[data-url]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.dataset.url;
      if (!url || url === '#') {
        alert('Enlace no configurado');
        return;
      }
      window.open(url, '_blank', 'noopener');
    });
  });

  /* =============================
     FORMULARIO CONTACTO
  ============================= */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      submitBtn?.classList.add('sending');
      formStatus.textContent = 'Enviando mensaje...';
      formStatus.className = 'form-status';
      formStatus.style.opacity = '1';

      setTimeout(() => {
        submitBtn?.classList.remove('sending');
        formStatus.textContent = 'Mensaje enviado correctamente ✅';
        formStatus.classList.add('success');
        contactForm.reset();
      }, 1500);
    });
  }

  /* =============================
     CV UPLOAD
  ============================= */
  const cvForm = document.getElementById('cv-upload');
  const cvStatus = document.getElementById('cv-status');
  const cvSubmit = document.getElementById('cv-submit');

  if (cvForm) {
    cvForm.addEventListener('submit', e => {
      e.preventDefault();

      cvSubmit.classList.add('sending');
      cvStatus.textContent = 'Subiendo CV...';
      cvStatus.className = 'form-status';
      cvStatus.style.opacity = '1';

      setTimeout(() => {
        cvSubmit.classList.remove('sending');
        cvStatus.textContent = 'CV subido correctamente ✅';
        cvStatus.classList.add('success');
        cvForm.reset();
      }, 1500);
    });
  }

  /* =============================
     HERO PARTÍCULAS
  ============================= */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.vx = Math.random() - 0.5;
      this.vy = Math.random() - 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const amount = Math.floor(canvas.width / 12);
    for (let i = 0; i < amount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

});
//==== Tema Oscuro / Claro ===//
const toggle = document.getElementById ('theme-toggle');
const body = document.body

if(toggle){
  //Cargamos las preferencias 
  if(localStorage.getItem('theme') === 'light'){
    body.classList.add('light');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('light');

    const islight = body.classList.contains('light');
    toggle.textContent = islight ? '☀️' : '🌙';
    localStorage.setItem('theme', islight ? 'light': 'dark');
  });
}

// ===== Indicador animado navbar (FIX UX) =====
const nav = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (nav && navLinksItems.length) {
  const indicator = document.createElement('span');
  indicator.classList.add('nav-indicator');
  nav.appendChild(indicator);

  let activeLink =
    document.querySelector('.nav-links a.active') || navLinksItems[0];

  const moveIndicator = (el) => {
    const rect = el.getBoundingClientRect();
    const parentRect = nav.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
  };

  // Posición inicial
  moveIndicator(activeLink);

  // Hover
  navLinksItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
      moveIndicator(link);
    });

    link.addEventListener('click', () => {
      // Actualizamos activo
      navLinksItems.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeLink = link;
      moveIndicator(activeLink);
    });
  });

  // Recalcular en resize
  window.addEventListener('resize', () => moveIndicator(activeLink));
}
