const advSwiper = new Swiper('.advantages__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  watchOverflow: true,
  breakpoints: {
    1920: { spaceBetween: 32 },
  },
});

const prevBtn = document.querySelector('.advantages__btn--prev');
const nextBtn = document.querySelector('.advantages__btn--next');

function updateNavBtns() {
  prevBtn.classList.toggle('swiper-button-disabled', advSwiper.isBeginning);
  nextBtn.classList.toggle('swiper-button-disabled', advSwiper.isEnd);
}

prevBtn.addEventListener('click', () => {
  advSwiper.slidePrev();
  updateNavBtns();
});

nextBtn.addEventListener('click', () => {
  advSwiper.slideNext();
  updateNavBtns();
});

advSwiper.on('slideChange', updateNavBtns);

updateNavBtns();

// ========== CALM SWIPER ==========

const calmSwiper = new Swiper('.calm__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 22,
  watchOverflow: true,
});

const calmPrev = document.querySelector('.calm__btn--prev');
const calmNext = document.querySelector('.calm__btn--next');

function updateCalmBtns() {
  calmPrev.classList.toggle('swiper-button-disabled', calmSwiper.isBeginning);
  calmNext.classList.toggle('swiper-button-disabled', calmSwiper.isEnd);
}

calmPrev.addEventListener('click', () => {
  calmSwiper.slidePrev();
  updateCalmBtns();
});

calmNext.addEventListener('click', () => {
  calmSwiper.slideNext();
  updateCalmBtns();
});

calmSwiper.on('slideChange', updateCalmBtns);

updateCalmBtns();

// ========== TRUCK SELECTOR ==========

const truckItems = document.querySelectorAll('.truck-item');
const truckImages = document.querySelectorAll('.truck-selector__img');

function setActiveTruck(index) {
  truckItems.forEach((item, i) => item.classList.toggle('is-active', i === index));
  truckImages.forEach((img, i) => img.classList.toggle('is-active', i === index));
}

truckItems.forEach((item, i) => {
  item.addEventListener('click', () => setActiveTruck(i));
});

// ========== CTA DROPDOWN ==========

document.querySelectorAll('.cta__dropdown').forEach(dropdown => {
  const trigger  = dropdown.querySelector('.cta__dropdown-trigger');
  const valueEl  = dropdown.querySelector('.cta__dropdown-value');
  const items    = dropdown.querySelectorAll('.cta__dropdown-item');
  const input    = dropdown.querySelector('input[type="hidden"]');

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('is-open');
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      input.value    = item.dataset.value;
      valueEl.textContent = item.textContent;
      trigger.classList.add('has-value');
      items.forEach(i => i.classList.remove('is-selected'));
      item.classList.add('is-selected');
      dropdown.classList.remove('is-open');
    });
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove('is-open');
  });
});

// ========================================
// Lenis smooth scroll
// ========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// ========================================
// AOS init
// ========================================
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
});
lenis.on('scroll', AOS.refresh);

// ========== POPUP ==========
(function () {
  const CLOSE_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.30213 15.5C0.968571 15.5 0.635009 15.3734 0.381578 15.1181C-0.127193 14.6094 -0.127193 13.7845 0.381578 13.2758L13.2757 0.38157C13.7848 -0.12719 14.6097 -0.12719 15.1184 0.38157C15.6272 0.890329 15.6272 1.71516 15.1184 2.22423L2.22396 15.1181C1.96703 15.3734 1.63379 15.5 1.30213 15.5Z" fill="#7B7B7B"/>
    <path d="M14.1961 15.5C13.8628 15.5 13.5293 15.3734 13.2758 15.1181L0.381812 2.22439C-0.127271 1.71558 -0.127271 0.890664 0.381812 0.381849C0.890577 -0.127283 1.71541 -0.127283 2.22418 0.381849L15.1182 13.2771C15.6273 13.7859 15.6273 14.6108 15.1182 15.1197C14.8632 15.3734 14.5296 15.5 14.1961 15.5Z" fill="#7B7B7B"/>
  </svg>`;

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
      <button class="popup__close" aria-label="Close">${CLOSE_SVG}</button>

      <div class="popup__body">
        <h2 class="popup__title" id="popupTitle">Fill out a consultation request</h2>
        <form class="popup__form" novalidate>
          <div class="popup__inputs">
            <input class="popup__input" type="text"  name="name"  placeholder="Name">
            <input class="popup__input" type="tel"   name="phone" placeholder="+1 (000)-000-00-00">
            <input class="popup__input" type="email" name="email" placeholder="example@mail.com">
          </div>
          <button type="submit" class="hero__btn-audit popup__submit">Get a Free Audit</button>
        </form>
      </div>

      <div class="popup__success" aria-live="polite">
        <img src="assets/img/popup-success.svg" alt="" width="54" height="54" class="popup__success-icon">
        <span class="popup__success-text">Your application has been successfully submitted</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const popup    = overlay.querySelector('.popup');
  const closeBtn = overlay.querySelector('.popup__close');
  const form     = overlay.querySelector('.popup__form');

  function openPopup() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  }

  function closePopup() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lenis.start();
    setTimeout(() => { popup.classList.remove('is-success'); form.reset(); }, 350);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    popup.classList.add('is-success');
  });

  document.querySelectorAll('.hero__btn-audit:not(.popup__submit):not(.cta__btn)').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); openPopup(); });
  });

  closeBtn.addEventListener('click', closePopup);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePopup();
  });
})();

// ========== HEADER HIDE/SHOW ON SCROLL ==========
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 80) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      header.classList.toggle('is-scrolled', y > 40);
      lastY = y;
      ticking = false;
    });
  });
})();

// ========== SCROLL TO TOP ==========
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.4 });
  });
}