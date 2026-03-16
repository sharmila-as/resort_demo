/* =====================================================
   LUXURY HILL RESORTS — Main JavaScript
   ===================================================== */

/* NOTE: Replace +91XXXXXXXXXX with the actual WhatsApp number */
const WA_NUMBER = '91XXXXXXXXXX';

/* ============================================================
   NAVBAR — scroll effect + active link
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobClose = document.getElementById('mobClose');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}
if (mobClose) {
  mobClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}
// Close on nav link tap
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link highlight
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Auto-stagger siblings
  els.forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(c =>
      c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right')
    );
    const idx = siblings.indexOf(el);
    if (!el.dataset.delay) el.dataset.delay = idx * 80;
    observer.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', initReveal);

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateCount(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const dur = 2000;
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = 1;
        animateCount(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}
document.addEventListener('DOMContentLoaded', initCounters);

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
let galItems = [];
let galIdx = 0;

function openLightbox(idx) {
  galIdx = idx;
  const lb = document.getElementById('lightbox');
  const item = galItems[idx];
  if (!lb || !item) return;
  lb.querySelector('.lb-title').textContent = item.dataset.title || 'Resort View';
  lb.querySelector('.lb-loc').textContent   = item.dataset.loc   || 'Luxury Resorts';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = '';
}
function shiftLightbox(dir) {
  galIdx = (galIdx + dir + galItems.length) % galItems.length;
  openLightbox(galIdx);
}

function initGallery() {
  galItems = Array.from(document.querySelectorAll('.gal-item'));
  galItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', () => shiftLightbox(-1));
  document.getElementById('lbNext')?.addEventListener('click', () => shiftLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') shiftLightbox(-1);
    if (e.key === 'ArrowRight') shiftLightbox(1);
  });
}
document.addEventListener('DOMContentLoaded', initGallery);

/* ============================================================
   GALLERY FILTER
   ============================================================ */
function initFilter() {
  const btns  = document.querySelectorAll('.gal-btn');
  const items = document.querySelectorAll('.gal-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            item.style.opacity = '1';
            item.style.transform = '';
          });
        }
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', initFilter);

/* ============================================================
   CONTACT FORM → WHATSAPP
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name     = document.getElementById('fname')?.value.trim()    || '';
    const phone    = document.getElementById('fphone')?.value.trim()   || '';
    const location = document.getElementById('flocation')?.value.trim()|| '';
    const msg      = document.getElementById('fmessage')?.value.trim() || '';

    if (!name || !phone || !location || !msg) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    const text =
      `Hello,\n` +
      `I visited your resort website.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Location Interested:* ${location}\n` +
      `*Message:* ${msg}\n\n` +
      `Please provide more details about the stay.`;

    const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    showToast('Redirecting to WhatsApp…', 'success');
    setTimeout(() => window.open(waURL, '_blank'), 800);
  });
}
document.addEventListener('DOMContentLoaded', initContactForm);

/* ============================================================
   WHATSAPP QUICK ENQUIRE (hero / CTA buttons)
   ============================================================ */
function waEnquire(location) {
  const loc = location || 'General Enquiry';
  const text = `Hello,\nI visited your resort website.\nI am interested in: *${loc}*\nPlease share more details about the stay.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
// Make available globally for inline onclick
window.waEnquire = waEnquire;

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(msg, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:90px; right:28px; z-index:3000;
      padding:14px 22px; border-radius:8px; font-family:'Jost',sans-serif;
      font-size:0.88rem; font-weight:500; transition:all 0.4s;
      box-shadow:0 8px 30px rgba(0,0,0,0.2); transform:translateY(20px); opacity:0;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'success' ? '#2D5A3D' : type === 'error' ? '#8B1A1A' : '#1A1612';
  toast.style.color = type === 'success' ? '#E8C98A' : '#FEF3F3';
  toast.style.border = `1px solid ${type === 'success' ? 'rgba(201,169,110,0.3)' : 'rgba(255,100,100,0.25)'}`;

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3200);
}

/* ============================================================
   PARALLAX — hero scroll
   ============================================================ */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }
});

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 82;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
