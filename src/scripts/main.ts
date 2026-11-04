const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const segment = (v: number, from: number, to: number) => clamp((v - from) / (to - from));
const smooth = (t: number) => t * t * (3 - 2 * t);

/* Hero: the letters drift apart, the sentence arrives, then the doors open. */
const open = document.querySelector<HTMLElement>('[data-open]');
if (open) {
  open.querySelectorAll('.open__name path').forEach((glyph, i) => {
    (glyph as SVGPathElement).style.setProperty('--g', String(i));
    (glyph as SVGPathElement).style.setProperty('--s', i % 2 ? '1' : '-1');
  });
}
if (open && !still) {
  const stage = open.querySelector<HTMLElement>('.open__stage')!;
  let queued = false;
  const update = () => {
    queued = false;
    const range = open.offsetHeight - stage.offsetHeight;
    const progress = clamp((scrollY - open.offsetTop) / range);
    open.style.setProperty('--p', segment(progress, 0, 0.3).toFixed(3));
    open.style.setProperty('--d', smooth(segment(progress, 0.42, 0.96)).toFixed(3));
  };
  const request = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  update();
}

/* The four panels: hover with a mouse, a real tap on touch, Tab on a keyboard. Never on a drag. */
const rooms = [...document.querySelectorAll<HTMLButtonElement>('[data-rooms] .room')];
const select = (room: HTMLButtonElement) => {
  rooms.forEach((r) => {
    r.classList.toggle('is-open', r === room);
    r.setAttribute('aria-expanded', String(r === room));
  });
};
/* Phones: glide to the tapped letter so its panel ends up centred on screen. */
const OPEN_GROW = 7; // matches .room.is-open on phones in global.css
const focusRoom = (room: HTMLButtonElement) => {
  if (!matchMedia('(max-width: 760px)').matches) return;
  const section = room.parentElement!;
  const bar = document.querySelector<HTMLElement>('.top')!.offsetHeight;
  const unit = section.offsetHeight / (rooms.length - 1 + OPEN_GROW);
  const panelTop = section.getBoundingClientRect().top + scrollY + rooms.indexOf(room) * unit;
  const panelCentre = panelTop + (OPEN_GROW * unit) / 2;
  const screenCentre = bar + (innerHeight - bar) / 2;
  scrollTo({ top: panelCentre - screenCentre, behavior: still ? 'auto' : 'smooth' });
};
rooms.forEach((room) => {
  let startX = 0;
  let startY = 0;
  room.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') select(room);
  });
  room.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  room.addEventListener('click', (e) => {
    const moved = Math.hypot(e.clientX - startX, e.clientY - startY);
    if (e.detail === 0 || moved < 10) {
      select(room);
      focusRoom(room);
    }
  });
  room.addEventListener('focus', () => {
    if (room.matches(':focus-visible')) select(room);
  });
});

/* Mobile menu. <dialog> supplies the focus trap, Esc and the inert page behind it. */
const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
if (menu) {
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => menu.showModal());
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => menu.close());
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.close()));
  matchMedia('(min-width: 761px)').addEventListener('change', () => menu.close());
}

/* Carousel: native swipe and snapping, with arrows, keys and mouse drag on top. */
const carousel = document.querySelector<HTMLElement>('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector<HTMLElement>('[data-track]')!;
  const slides = [...track.querySelectorAll<HTMLElement>('.slide')];
  const count = carousel.querySelector<HTMLElement>('[data-count]')!;
  let current = 0;

  const show = (i: number) => {
    current = i;
    slides.forEach((s, n) => s.classList.toggle('is-current', n === i));
    count.textContent = `${i + 1} / ${slides.length}`;
    playCurrent();
  };
  /* Videos only run while they are the current slide and the gallery is on screen. */
  let onScreen = false;
  const playCurrent = () => {
    slides.forEach((s, n) => {
      const video = s.querySelector('video');
      if (!video) return;
      if (n === current && onScreen && !still) video.play().catch(() => {});
      else video.pause();
    });
  };
  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    playCurrent();
  }, { threshold: 0.3 }).observe(track);
  const offsetOf = (slide: HTMLElement) => slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
  const goTo = (i: number) => {
    const next = (i + slides.length) % slides.length;
    track.scrollTo({ left: offsetOf(slides[next]), behavior: still ? 'auto' : 'smooth' });
    show(next);
  };
  const nearest = () => {
    let best = 0;
    let gap = Infinity;
    slides.forEach((s, n) => {
      const d = Math.abs(offsetOf(s) - track.scrollLeft);
      if (d < gap) {
        gap = d;
        best = n;
      }
    });
    return best;
  };

  carousel.querySelector('[data-prev]')?.addEventListener('click', () => goTo(current - 1));
  carousel.querySelector('[data-next]')?.addEventListener('click', () => goTo(current + 1));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(current + (e.key === 'ArrowRight' ? 1 : -1));
    }
  });

  let settle = 0;
  track.addEventListener(
    'scroll',
    () => {
      if (dragging) return;
      clearTimeout(settle);
      settle = window.setTimeout(() => show(nearest()), 90);
    },
    { passive: true },
  );

  let dragging = false;
  let dragX = 0;
  let dragLeft = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    dragging = true;
    dragX = e.clientX;
    dragLeft = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', (e) => {
    if (dragging) track.scrollLeft = dragLeft - (e.clientX - dragX);
  });
  const release = () => {
    if (!dragging) return;
    dragging = false;
    const moved = track.scrollLeft - dragLeft;
    const target = Math.abs(moved) > 60 ? current + Math.sign(moved) : current;
    goTo(Math.max(0, Math.min(slides.length - 1, target)));
    setTimeout(() => track.classList.remove('is-dragging'), 450);
  };
  track.addEventListener('pointerup', release);
  track.addEventListener('pointercancel', release);

  const center = () => {
    track.scrollLeft = offsetOf(slides[current]);
  };
  addEventListener('resize', center);
  center();
  show(0);
}

/* A quiet fade as things arrive. */
const items = document.querySelectorAll('[data-in]');
if (still) {
  items.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}
