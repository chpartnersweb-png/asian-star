import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const header = document.querySelector<HTMLElement>('.site-header');
const hero = document.querySelector<HTMLElement>('.hero');
const navDialog = document.querySelector<HTMLDialogElement>('#navigation-dialog');
const navOpen = document.querySelector<HTMLButtonElement>('[data-nav-open]');
const navClose = document.querySelector<HTMLButtonElement>('[data-nav-close]');
const viewer = document.querySelector<HTMLDialogElement>('#menu-viewer');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopScroll = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
let lenis: Lenis | null = null;
let savedOverflow: string | null = null;

root.classList.add('js-enhanced');

function syncScrollLock() {
  const isOpen = Boolean(navDialog?.open || viewer?.open);
  if (isOpen && savedOverflow === null) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
  } else if (!isOpen && savedOverflow !== null) {
    document.body.style.overflow = savedOverflow;
    savedOverflow = null;
    lenis?.start();
  }
}

function tickLenis(time: number) { lenis?.raf(time * 1000); }

function configureSmoothScroll() {
  if (lenis) {
    gsap.ticker.remove(tickLenis);
    lenis.destroy();
    lenis = null;
  }
  if (desktopScroll.matches && !reducedMotion.matches) {
    lenis = new Lenis({ duration: .9, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);
    if (savedOverflow !== null) lenis.stop();
  }
}

configureSmoothScroll();
desktopScroll.addEventListener('change', configureSmoothScroll);
reducedMotion.addEventListener('change', configureSmoothScroll);

let scrollPending = false;
function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 30);
  root.classList.toggle('is-past-hero', hero ? hero.getBoundingClientRect().bottom < 85 : true);
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateHeader); }
}, { passive: true });
window.addEventListener('resize', updateHeader, { passive: true });
updateHeader();

function closeNavigation() {
  navDialog?.close();
  navOpen?.setAttribute('aria-expanded', 'false');
  syncScrollLock();
}

navOpen?.addEventListener('click', () => {
  if (!navDialog || navDialog.open) return;
  navDialog.showModal();
  navOpen?.setAttribute('aria-expanded', 'true');
  syncScrollLock();
});
navClose?.addEventListener('click', closeNavigation);
navDialog?.addEventListener('close', () => {
  navOpen?.setAttribute('aria-expanded', 'false');
  syncScrollLock();
});
navDialog?.addEventListener('click', (event) => {
  if (!navDialog) return;
  if (event.target === navDialog) {
    const rect = navDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeNavigation();
  }
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    if (navDialog?.open) closeNavigation();
    if (target instanceof HTMLDetailsElement) target.open = true;
    requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
      if (lenis && !reducedMotion.matches) lenis.scrollTo(target, { offset: -96 });
      else target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (location.hash !== href) history.pushState(null, '', href);
    });
  });
});

document.querySelectorAll<HTMLDetailsElement>('.menu-category').forEach((category) => {
  category.addEventListener('toggle', () => {
    lenis?.resize();
    ScrollTrigger.refresh();
  });
});

// Native dialog supplies focus trapping and Escape handling. The anchor links
// still open the original menu images if JavaScript is unavailable.
const sheetLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-menu-sheet]'));
const viewerImage = viewer?.querySelector<HTMLImageElement>('[data-viewer-image]');
const viewerPaper = viewer?.querySelector<HTMLElement>('[data-viewer-paper]');
const viewerTitle = viewer?.querySelector<HTMLElement>('#menu-viewer-title');
const viewerCounter = viewer?.querySelector<HTMLElement>('[data-viewer-counter]');
const viewerOriginal = viewer?.querySelector<HTMLAnchorElement>('[data-viewer-original]');
const viewerScroll = viewer?.querySelector<HTMLElement>('.viewer-scroll');
const zoomButton = viewer?.querySelector<HTMLButtonElement>('[data-viewer-zoom]');
let currentSheet = 0;
let viewerOpener: HTMLElement | null = null;

function showSheet(index: number) {
  if (!viewerImage || !viewerPaper) return;
  currentSheet = (index + sheetLinks.length) % sheetLinks.length;
  const sheet = sheetLinks[currentSheet].dataset;
  const width = Number(sheet.menuWidth);
  const height = Number(sheet.menuHeight);
  const rotated = sheet.menuRotated === 'true';
  viewerImage.src = sheet.menuSrc ?? '';
  viewerImage.alt = `${sheet.menuTitle}のメニュー表`;
  viewerImage.width = width;
  viewerImage.height = height;
  viewerImage.style.width = rotated ? `${width / height * 100}%` : '100%';
  viewerPaper.style.aspectRatio = rotated ? `${height} / ${width}` : `${width} / ${height}`;
  viewerPaper.classList.toggle('is-rotated', rotated);
  viewerPaper.classList.remove('is-zoomed');
  zoomButton?.setAttribute('aria-pressed', 'false');
  if (zoomButton) zoomButton.textContent = '拡大する';
  if (viewerTitle) viewerTitle.textContent = sheet.menuTitle ?? 'メニュー表';
  if (viewerCounter) viewerCounter.textContent = `${currentSheet + 1} / ${sheetLinks.length}`;
  if (viewerOriginal) viewerOriginal.href = sheet.menuSrc ?? '';
  viewerScroll?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

sheetLinks.forEach((link, index) => {
  link.addEventListener('click', (event) => {
    if (!viewer || !viewerImage || !viewerPaper || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    viewerOpener = link;
    showSheet(index);
    viewer.showModal();
    syncScrollLock();
  });
});

viewer?.querySelector('[data-viewer-close]')?.addEventListener('click', () => viewer?.close());
viewer?.querySelector('[data-viewer-prev]')?.addEventListener('click', () => showSheet(currentSheet - 1));
viewer?.querySelector('[data-viewer-next]')?.addEventListener('click', () => showSheet(currentSheet + 1));
zoomButton?.addEventListener('click', () => {
  const isZoomed = viewerPaper?.classList.toggle('is-zoomed') ?? false;
  zoomButton?.setAttribute('aria-pressed', String(isZoomed));
  if (zoomButton) zoomButton.textContent = isZoomed ? '全体を見る' : '拡大する';
});
viewer?.addEventListener('close', () => {
  syncScrollLock();
  viewerOpener?.focus({ preventScroll: true });
});
viewer?.addEventListener('click', (event) => {
  if (!viewer) return;
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});
viewer?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && !viewerPaper?.classList.contains('is-zoomed')) { event.preventDefault(); showSheet(currentSheet - 1); }
  if (event.key === 'ArrowRight' && !viewerPaper?.classList.contains('is-zoomed')) { event.preventDefault(); showSheet(currentSheet + 1); }
});

// The source HTML is visible by default. Only elements below the viewport
// receive a reveal, so a delayed script never hides already visible content.
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  if (window.scrollY < 40) {
    gsap.from('[data-hero-copy]', { opacity: 0, y: 10, duration: .85, stagger: .12, ease: 'power2.out', clearProps: 'all' });
    gsap.from('.hero-visual', { scale: 1.025, duration: 1.8, ease: 'power2.out', clearProps: 'transform' });
  }
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    gsap.from(element, {
      opacity: 0, y: 18, duration: .65, ease: 'power2.out', clearProps: 'all',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });
});
motion.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
    gsap.fromTo(element, { y: 12 }, { y: -12, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: .6 } });
  });
});

window.addEventListener('load', () => { lenis?.resize(); ScrollTrigger.refresh(); }, { once: true });
document.fonts?.ready.then(() => { lenis?.resize(); ScrollTrigger.refresh(); });
