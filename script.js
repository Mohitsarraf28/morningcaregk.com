$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    dots: true,
    autoplay: true, // Enable auto-sliding
    autoplayTimeout: 3000, // Slide every 3 seconds
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });
});



// navbar
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (!toggle || !menu) return;

  const openMenu = () => {
    toggle.classList.add('open');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // lock scroll
  };

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // unlock scroll
  };

  const toggleMenu = () => {
    if (menu.classList.contains('active')) closeMenu();
    else openMenu();
  };

  // click hamburger
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // close when clicking a link
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) closeMenu();
  });

  // outside click to close
  document.addEventListener('click', (e) => {
    const clickedInside = e.target.closest('.navbar');
    if (!clickedInside && menu.classList.contains('active')) closeMenu();
  });

  // Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
  });

  // Safety: ensure z-index so toggle is clickable above marquee/logo
  toggle.style.zIndex = '1001';
});

// 
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (!toggle || !menu) return; // safety

  const openMenu = () => {
    toggle.classList.add('open');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    // lock page scroll behind the menu
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    if (menu.classList.contains('active')) closeMenu();
    else openMenu();
  };

  // Tap hamburger
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Tap a link -> close
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) closeMenu();
  });

  // Tap outside -> close
  document.addEventListener('click', (e) => {
    const inside = e.target.closest('.navbar');
    if (!inside && menu.classList.contains('active')) closeMenu();
  });

  // Esc -> close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
  });
});
// end



(function () {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  function closeMenu() {
    menu.classList.remove('active');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    menu.classList.add('active');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click (mobile UX)
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeMenu)
  );

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Reset on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menu.classList.remove('active');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
})();

const mcSlider = document.querySelector(".mc-slider-track");
const mcDots = document.querySelectorAll(".mc-dot");
let mcIndex = 0;
let mcTimer;

function mcUpdateSlider() {
  mcSlider.style.transform = `translateX(-${mcIndex * 100}%)`;
  mcDots.forEach((dot, i) => {
    dot.classList.toggle("mc-active", i === mcIndex);
  });
}

function mcMoveSlide(step) {
  mcIndex = (mcIndex + step + mcDots.length) % mcDots.length;
  mcUpdateSlider();
  mcResetAutoSlide();
}

function mcCurrentSlide(index) {
  mcIndex = index;
  mcUpdateSlider();
  mcResetAutoSlide();
}

function mcAutoSlide() {
  mcIndex = (mcIndex + 1) % mcDots.length;
  mcUpdateSlider();
}

function mcResetAutoSlide() {
  clearInterval(mcTimer);
  mcTimer = setInterval(mcAutoSlide, 3000); // Auto-slide every 3 sec
}

// Start Auto-Slide on Load
// ---- SAFE CALL (fixes #1) -----------------------------------------------
if (typeof mcResetAutoSlide === "function") { mcResetAutoSlide(); }

// ================= SLIDER / FULLSCREEN BLOCK ==============================
(() => {
  const track = document.getElementById('mcTrack');
  const dotsWrap = document.getElementById('mcDots');
  const prevBtn = document.getElementById('mcPrev');
  const nextBtn = document.getElementById('mcNext');
  const fsWrap = document.getElementById('mcFs');
  const fsVideo = document.getElementById('mcFsVideo');
  const fsClose = document.getElementById('mcClose');

  // If this page doesn't have the slider, exit gracefully
  if (!track) return;

  const dots = Array.from(dotsWrap?.querySelectorAll('.mc-dot') || []);
  const slides = Array.from(track.querySelectorAll('.mc-video-slide'));
  const videos = slides.map(s => s.querySelector('video'));

  let idx = 0, timer = null;
  const INTERVAL = 5000;

  function setActive(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, k) => d.classList.toggle('mc-active', k === idx));
  }
  function next() { setActive(idx + 1); resetAuto(); }
  function prev() { setActive(idx - 1); resetAuto(); }
  function auto() { setActive(idx + 1); }
  function resetAuto() { clearInterval(timer); timer = setInterval(auto, INTERVAL); }

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  dotsWrap?.addEventListener('click', (e) => {
    const dot = e.target.closest('.mc-dot'); if (!dot) return;
    const i = parseInt(dot.dataset.index, 10);
    if (!Number.isNaN(i)) { setActive(i); resetAuto(); }
  });

  // Only attach fullscreen on videos that are NOT inside .mc-card
  videos.forEach(v => {
    if (!v) return;
    v.muted = true; v.play().catch(() => { });
    if (!v.closest('.mc-card')) {
      v.addEventListener('click', () => {
        const src = v.currentSrc || v.getAttribute('src') || (v.querySelector('source')?.getAttribute('src') || '');
        if (!src) return;
        if (fsWrap && fsVideo) {
          fsVideo.src = src;
          fsWrap.style.display = 'flex';
          fsVideo.currentTime = 0;
          fsVideo.play().catch(() => { });
          clearInterval(timer);
        }
      });
    }
  });

  fsClose?.addEventListener('click', () => {
    if (!fsWrap || !fsVideo) return;
    fsWrap.style.display = 'none';
    fsVideo.pause(); fsVideo.removeAttribute('src'); fsVideo.load();
    resetAuto();
  });

  fsWrap?.addEventListener('click', (e) => { if (e.target === fsWrap) fsClose?.click(); });

  const slider = document.getElementById('mcSlider');
  slider?.addEventListener('mouseenter', () => clearInterval(timer));
  slider?.addEventListener('mouseleave', resetAuto);

  setActive(0);
  resetAuto();
})();

// ================= MUTE / UNMUTE FOR .mc-card VIDEOS ======================
(() => {
  const cards = Array.from(document.querySelectorAll('.mc-card'));
  if (cards.length === 0) return;

  const videos = cards.map(c => c.querySelector('.mc-video') || c.querySelector('video'));
  const buttons = cards.map(c => c.querySelector('.mc-mute'));

  function forceMute(v, btn) {
    if (!v) return;
    v.pause();
    v.muted = true;
    v.volume = 0;
    v.setAttribute('muted', '');
    btn && (btn.dataset.state = 'muted',
      btn.textContent = '🔇 Mute',
      btn.setAttribute('aria-label', 'Unmute'));
    v.play().catch(() => { });
  }

  function unmuteExclusive(targetVideo, targetBtn) {
    videos.forEach((v, i) => { if (v && v !== targetVideo) forceMute(v, buttons[i]); });

    try {
      targetVideo.pause();
      targetVideo.removeAttribute('muted');
      targetVideo.muted = false;
      targetVideo.volume = 1;
      targetVideo.play().then(() => {
        if (targetBtn) {
          targetBtn.dataset.state = 'unmuted';
          targetBtn.textContent = '🔊 Unmute';
          targetBtn.setAttribute('aria-label', 'Mute');
        }
      }).catch((err) => {
        // If blocked, show controls so the user can start playback
        targetVideo.controls = true;
        console.warn('Play blocked, showing controls:', err);
      });
    } catch (e) { console.warn(e); }
  }

  cards.forEach((card, i) => {
    const v = videos[i];
    const b = buttons[i];
    if (!v || !b) return; // guard (fixes #3)

    // Ensure initial silent autoplay
    v.setAttribute('playsinline', '');
    v.setAttribute('muted', '');
    v.muted = true; v.volume = 0;
    v.play().catch(() => { });

    const toggle = (evt) => {
      evt?.preventDefault();
      evt?.stopPropagation(); // don't bubble into other handlers
      if (v.muted || v.volume === 0) unmuteExclusive(v, b);
      else forceMute(v, b);
    };

    b.addEventListener('click', toggle);
    // video tap toggles sound for cards (does NOT open fullscreen because we skipped it above)
    v.addEventListener('click', toggle);
  });
})();

