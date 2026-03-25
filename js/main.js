// ===== NAV SCROLL =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ===== MOBILE TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('.nav__link').forEach(l => {
    l.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// ===== ACTIVE NAV LINK =====
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
});

// ===== PRICING TOGGLE =====
const billingToggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
if (billingToggle) {
  billingToggle.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;
    monthlyLabel && monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel && annualLabel.classList.toggle('active', isAnnual);
    document.querySelectorAll('.amount').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (formSuccess) formSuccess.classList.add('show');
      setTimeout(() => formSuccess && formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}

// ===== SERVICES TABS (services.html) =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.getElementById(target);
    if (content) content.classList.add('active');
    // show first sidebar item by default
    const firstItem = content && content.querySelector('.tab-sidebar__item');
    if (firstItem) firstItem.click();
  });
});

document.querySelectorAll('.tab-sidebar__item').forEach(item => {
  item.addEventListener('click', () => {
    const panel = item.closest('.tab-content');
    panel.querySelectorAll('.tab-sidebar__item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const key = item.dataset.detail;
    panel.querySelectorAll('.tab-detail').forEach(d => d.style.display = 'none');
    const detail = panel.querySelector(`[data-detail-panel="${key}"]`);
    if (detail) detail.style.display = 'block';
  });
});

// init first tab
const firstTab = document.querySelector('.tab-btn');
if (firstTab) firstTab.click();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
