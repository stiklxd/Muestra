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
      navLinks.classList.toggle("active");
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
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
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
