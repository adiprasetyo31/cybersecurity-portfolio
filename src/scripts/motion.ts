import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_OFFSET = -64;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Smooth scroll (Lenis), disinkronkan dengan ticker GSAP
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // 2. Link anchor (#work, #contact, ...) ikut smooth scroll
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash) return;
      const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : NAV_OFFSET });
      history.replaceState(null, '', hash);
    });
  });

  // 3. Reveal: elemen dengan atribut data-reveal muncul halus saat di-scroll
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}
