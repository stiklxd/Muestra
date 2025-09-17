// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector(".navbar");

  // ====== NAVBAR ======
  const setNavHeightVar = () => {
    const navHeight = nav ? nav.offsetHeight : 72;
    document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
    return navHeight;
  };
  let navHeight = setNavHeightVar();
  window.addEventListener('resize', () => { navHeight = setNavHeightVar(); });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle("open");
      toggleBtn.classList.toggle("active");
    });
  }

  // Scroll suave con offset del navbar
  const links = document.querySelectorAll(".nav-links li a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const targetTop = window.pageYOffset + target.getBoundingClientRect().top - navHeight - 12;
          window.scrollTo({ top: Math.max(0, Math.round(targetTop)), behavior: "smooth" });
        }
      }
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        if (toggleBtn) toggleBtn.classList.remove("active");
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Animar secciones al hacer scroll
  const sections = document.querySelectorAll("section");
  const appearOnScrollSections = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  sections.forEach(section => appearOnScrollSections.observe(section));

  // ====== MODAL SOLICITUD ======
  const modal = document.getElementById('modal-solicitud');
  const closeBtn = document.querySelector('#modal-solicitud .close');
  const servicioInput = document.getElementById('servicio-input');

  // Abrir modal al dar clic en "Solicitar"
  document.querySelectorAll('.plan-card .btn.primary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.closest('.plan-card').querySelector('h2').innerText;
    servicioInput.value = servicio;  // ← Aquí se pone el nombre del plan
    modal.style.display = 'flex';
  });
});


  // Cerrar modal con X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Cerrar modal clic fuera
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Enviar formulario → WhatsApp
  const form = document.getElementById('form-solicitud');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = e.target.nombre.value;
      const email = e.target.email.value;
      const servicio = e.target.servicio.value;
      const mensaje = e.target.mensaje.value;

      const url = `https://wa.me/573124123661?text=Hola, soy ${nombre}. Me interesa el servicio: ${servicio}.%0AEmail: ${email}%0AMensaje: ${mensaje}`;
      window.open(url, '_blank');

      modal.style.display = 'none';
    });
  }
});


/* MENU FIX BY ASSISTANT */
(function(){
  try {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobilePanel = document.getElementById('mobile-panel') || document.querySelector('.mobile-panel');

    function closeMenu() {
      if (menuToggle) { menuToggle.classList.remove('active'); menuToggle.setAttribute('aria-expanded','false'); }
      if (navLinks) { navLinks.classList.remove('open'); }
      if (mobilePanel) { mobilePanel.setAttribute('aria-hidden','true'); }
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', function(e) {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        if (navLinks) navLinks.classList.toggle('open');
        menuToggle.classList.toggle('active');
        if (mobilePanel) mobilePanel.setAttribute('aria-hidden', String(expanded));
      });
    }

    document.querySelectorAll('.nav-links a, .mobile-links a, .mobile-panel a').forEach(a => {
      a.addEventListener('click', function(){ closeMenu(); });
    });

    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });
  } catch(e) { console.error('menu fix error', e); }
})();
// ===== MENÚ HAMBURGUESA =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    // Toggle menú
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      const expanded = menuToggle.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", expanded);
    });

    // Cerrar menú al hacer clic en un link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", false);
      });
    });

    // Cerrar con tecla ESC
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", false);
      }
    });
  }
});

