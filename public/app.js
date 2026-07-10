/* =============================================
   D2 — Detail Driven | app.js
   ============================================= */

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── PARALLAX HERO ───
const heroBg  = document.getElementById('hero-bg');
const heroImg = document.getElementById('hero-img');
const heroRadial = document.getElementById('hero-radial');

window.addEventListener('mousemove', e => {
  const xPct = (e.clientX / window.innerWidth) * 100;
  const yPct = (e.clientY / window.innerHeight) * 100;
  heroRadial.style.background =
    `radial-gradient(400px at ${xPct}% ${yPct * 0.3 + 70}%, rgba(225,6,0,0.08) 0%, transparent 65%)`;
}, { passive: true });

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shift   = scrollY * 0.35;
  if (heroImg) heroImg.style.transform = `translateY(${shift}px)`;
}, { passive: true });

// ─── MOBILE MENU ───
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), parseInt(delay));
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── FAQ ACCORDION ───
const faqTriggers = document.querySelectorAll('.faq-trigger');

faqTriggers.forEach((trigger, i) => {
  trigger.addEventListener('click', () => {
    const isOpen   = trigger.getAttribute('aria-expanded') === 'true';
    const bodyId   = `faq-body-${i + 1}`;
    const body     = document.getElementById(bodyId);

    // Close all
    faqTriggers.forEach((t, j) => {
      t.setAttribute('aria-expanded', 'false');
      const b = document.getElementById(`faq-body-${j + 1}`);
      if (b) b.classList.remove('open');
    });

    // Open clicked (if was closed)
    if (!isOpen && body) {
      trigger.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  });
});

// ─── ESTIMATOR ───
const priceMatrix = {
  // vehicle: [correction, ceramic, ppf, restoration]
  sedan:  [300,  575,  1500, 0],
  suv:    [400,  750,  1800, 0],
  truck:  [450,  850,  2000, 0],
  exotic: [600, 1200,  2500, 0],
};

const serviceIndex = { correction: 0, ceramic: 1, ppf: 2, restoration: 3 };

let selectedVehicle = null;
let selectedService = null;

const optionBtns = document.querySelectorAll('.option-btn');
const estimateInner = document.getElementById('estimate-inner');

optionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    const val   = btn.dataset.val;

    // Deselect siblings
    document.querySelectorAll(`.option-btn[data-group="${group}"]`)
      .forEach(b => b.classList.remove('selected'));

    btn.classList.add('selected');

    if (group === 'vehicle') selectedVehicle = val;
    if (group === 'service') selectedService = val;

    updateEstimate();
  });
});

function updateEstimate() {
  if (!selectedVehicle || !selectedService) {
    estimateInner.innerHTML =
      `<p class="estimate-label">Select both options above for a starting estimate</p>`;
    return;
  }

  const prices = priceMatrix[selectedVehicle];
  const idx    = serviceIndex[selectedService];
  const price  = prices[idx];

  const vehicleLabels  = { sedan: 'Sedan / Coupe', suv: 'SUV / Crossover', truck: 'Truck / Van', exotic: 'Exotic / Luxury' };
  const serviceLabels  = { correction: 'Paint Correction', ceramic: 'Ceramic Coating', ppf: 'PPF (Paint Protection Film)', restoration: 'Complete Vehicle Restoration' };

  if (price === 0) {
    estimateInner.innerHTML = `
      <div class="estimate-price" style="font-size: 1.8rem; margin: 10px 0;">
        Bespoke Quote
      </div>
      <p class="estimate-note">
        ${vehicleLabels[selectedVehicle]} &nbsp;·&nbsp; ${serviceLabels[selectedService]}
        &nbsp;·&nbsp; Contact us for a custom assessment.
      </p>
    `;
  } else {
    estimateInner.innerHTML = `
      <div class="estimate-price">
        <span class="price-from">Starting from</span>
        $${price.toLocaleString()}
      </div>
      <p class="estimate-note">
        ${vehicleLabels[selectedVehicle]} &nbsp;·&nbsp; ${serviceLabels[selectedService]}
        &nbsp;·&nbsp; Final price depends on paint condition &amp; inspection.
      </p>
    `;
  }
}

// ─── QUOTE FORM ───
const quoteForm    = document.getElementById('quote-form');
const formSuccess  = document.getElementById('form-success');
const submitBtn    = document.getElementById('submit-btn');

quoteForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  // Simulate async send
  setTimeout(() => {
    quoteForm.querySelectorAll('.form-input, .form-textarea').forEach(el => el.value = '');
    formSuccess.style.display = 'flex';
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Send Request <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

    setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
  }, 1200);
}

// ─── SMOOTH ANCHOR LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
