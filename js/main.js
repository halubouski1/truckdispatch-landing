const advSwiper = new Swiper('.advantages__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 32,
  watchOverflow: true,
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