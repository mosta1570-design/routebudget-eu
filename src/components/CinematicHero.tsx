import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  X,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';

import appArchive from '../assets/app-archive-it.png';
import appArchiveAvif1080 from '../assets/app-archive-it-1080.avif';
import appArchiveAvif540 from '../assets/app-archive-it-540.avif';
import appCosts from '../assets/app-costs-it.png';
import appCostsAvif1080 from '../assets/app-costs-it-1080.avif';
import appCostsAvif540 from '../assets/app-costs-it-540.avif';
import appScenarios from '../assets/app-scenarios-it.png';
import appScenariosAvif1080 from '../assets/app-scenarios-it-1080.avif';
import appScenariosAvif540 from '../assets/app-scenarios-it-540.avif';
import heroDesktop from '../assets/hero/routebudget-hero-desktop.mp4';
import heroDesktopWebm from '../assets/hero/routebudget-hero-desktop.webm';
import heroMobile from '../assets/hero/routebudget-hero-mobile.mp4';
import heroMobileWebm from '../assets/hero/routebudget-hero-mobile.webm';
import heroPoster from '../assets/hero/routebudget-hero-poster.webp';
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  STORE_BADGES,
} from '../content/siteConfig';
import type { Locale } from '../content/siteCopy';

type CinematicHeroProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

const PRODUCT_REVEAL_QUERY = '(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const APP_ICON = '/logo-ui.png';

type HeroVideoChoice = {
  fallback?: string;
  src: string;
};

function selectHeroVideo(): HeroVideoChoice {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const webm = isMobile ? heroMobileWebm : heroDesktopWebm;
  const mp4 = isMobile ? heroMobile : heroDesktop;
  const probe = document.createElement('video');
  const supportsVp9 = probe.canPlayType('video/webm; codecs="vp9"') !== '';

  return supportsVp9 ? { fallback: mp4, src: webm } : { src: mp4 };
}

type HeroLanguage = {
  navigationLabel: string;
  menuLabel: string;
  closeLabel: string;
  languageLabel: string;
  eyebrow: string;
  headline: [string, string];
  body: string;
  primaryCta: string;
  downloadOptionsLabel: string;
  demoLabel: string;
  demoTitle: string;
  demoIntro: string;
  demoClose: string;
  demoCarouselLabel: string;
  demoControlsLabel: string;
  demoPrevious: string;
  demoNext: string;
  demoScreenLabel: string;
  trust: string;
  ledgerLabel: string;
  ledger: {
    routeLabel: string;
    routeValue: string;
    costLabel: string;
    costValue: string;
    priceLabel: string;
    priceValue: string;
    profitLabel: string;
    profitValue: string;
    disclaimer: string;
  };
  opening: [string, string, string, string];
  nav: Array<{ label: string; href: string }>;
};

const heroLanguage: Record<Locale, HeroLanguage> = {
  it: {
    navigationLabel: 'Navigazione principale',
    menuLabel: 'Apri il menu',
    closeLabel: 'Chiudi il menu',
    languageLabel: 'Lingua del sito',
    eyebrow: 'Cockpit finanziario per l’autotrasporto',
    headline: ['Sai quanto chiedere.', 'Prima di partire.'],
    body:
      'Carburante, pedaggi, ore, pause e usura in un unico costo. Scegli il margine e prepara il preventivo PDF.',
    primaryCta: 'Scarica gratis',
    downloadOptionsLabel: 'Scegli lo store per scaricare RouteBudget',
    demoLabel: 'Vedi un esempio completo',
    demoTitle: 'Un costo leggibile. Tre prezzi da confrontare.',
    demoIntro:
      'Schermate autentiche dell’app Android: composizione dei costi, scenari e Archivio locale.',
    demoClose: 'Chiudi la dimostrazione',
    demoCarouselLabel: 'Schermate autentiche dell’app RouteBudget',
    demoControlsLabel: 'Controlli delle schermate',
    demoPrevious: 'Schermata precedente',
    demoNext: 'Schermata successiva',
    demoScreenLabel: 'Schermata',
    trust: '3 calcoli inclusi · nessun account · dati principali sul dispositivo',
    ledgerLabel: 'Esempio di decisione economica',
    ledger: {
      routeLabel: 'Tratta dimostrativa',
      routeValue: '870 km',
      costLabel: 'Costo operativo',
      costValue: '1.220,68 €',
      priceLabel: 'Prezzo consigliato',
      priceValue: '1.525,85 €',
      profitLabel: 'Utile · Margine',
      profitValue: '305,17 € · 20%',
      disclaimer: 'Stima operativa non vincolante',
    },
    opening: ['TRATTA', 'COSTI', 'MARGINE', 'PREZZO'],
    nav: [
      { label: 'Prodotto', href: '#prodotto' },
      { label: 'Metodo', href: '#metodo' },
      { label: 'Guide', href: '/it/guide/' },
      { label: 'Supporto', href: '#supporto' },
    ],
  },
  en: {
    navigationLabel: 'Primary navigation',
    menuLabel: 'Open menu',
    closeLabel: 'Close menu',
    languageLabel: 'Website language',
    eyebrow: 'Financial cockpit for road transport',
    headline: ['Know what to charge.', 'Before you depart.'],
    body:
      'Fuel, tolls, hours, breaks and wear in one operating cost. Choose your margin and prepare the PDF quote.',
    primaryCta: 'Download free',
    downloadOptionsLabel: 'Choose a store to download RouteBudget',
    demoLabel: 'See a complete example',
    demoTitle: 'One readable cost. Three prices to compare.',
    demoIntro:
      'Authentic Android app screens: cost composition, scenarios and local Archive.',
    demoClose: 'Close demonstration',
    demoCarouselLabel: 'Authentic RouteBudget app screens',
    demoControlsLabel: 'Screen controls',
    demoPrevious: 'Previous screen',
    demoNext: 'Next screen',
    demoScreenLabel: 'Screen',
    trust: '3 calculations included · no account · core data stays on device',
    ledgerLabel: 'Example economic decision',
    ledger: {
      routeLabel: 'Demonstration route',
      routeValue: '870 km',
      costLabel: 'Operating cost',
      costValue: '€1,220.68',
      priceLabel: 'Recommended price',
      priceValue: '€1,525.85',
      profitLabel: 'Profit · Margin',
      profitValue: '€305.17 · 20%',
      disclaimer: 'Non-binding operating estimate',
    },
    opening: ['ROUTE', 'COSTS', 'MARGIN', 'PRICE'],
    nav: [
      { label: 'Product', href: '#prodotto' },
      { label: 'Method', href: '#metodo' },
      { label: 'Guides', href: '/it/guide/' },
      { label: 'Support', href: '#supporto' },
    ],
  },
};

const demoFrames: Record<
  Locale,
  Array<{ image: string; avifSrcSet: string; alt: string; label: string; value: string }>
> = {
  it: [
    {
      image: appScenarios,
      avifSrcSet: `${appScenariosAvif540} 540w, ${appScenariosAvif1080} 1080w`,
      alt: 'RouteBudget mostra gli scenari Minimo, Consigliato e Ideale',
      label: 'SCENARI',
      value: '1.525,85 €',
    },
    {
      image: appCosts,
      avifSrcSet: `${appCostsAvif540} 540w, ${appCostsAvif1080} 1080w`,
      alt: 'RouteBudget mostra carburante, pedaggi, autista e usura',
      label: 'COSTI',
      value: '1.220,68 €',
    },
    {
      image: appArchive,
      avifSrcSet: `${appArchiveAvif540} 540w, ${appArchiveAvif1080} 1080w`,
      alt: 'RouteBudget mostra un calcolo salvato nell’Archivio locale',
      label: 'ARCHIVIO',
      value: 'SALVATO IN LOCALE',
    },
  ],
  en: [
    {
      image: appScenarios,
      avifSrcSet: `${appScenariosAvif540} 540w, ${appScenariosAvif1080} 1080w`,
      alt: 'RouteBudget shows Minimum, Recommended and Ideal price scenarios',
      label: 'SCENARIOS',
      value: '€1,525.85',
    },
    {
      image: appCosts,
      avifSrcSet: `${appCostsAvif540} 540w, ${appCostsAvif1080} 1080w`,
      alt: 'RouteBudget shows fuel, tolls, driver and wear costs',
      label: 'COSTS',
      value: '€1,220.68',
    },
    {
      image: appArchive,
      avifSrcSet: `${appArchiveAvif540} 540w, ${appArchiveAvif1080} 1080w`,
      alt: 'RouteBudget shows a calculation saved in the local Archive',
      label: 'ARCHIVE',
      value: 'SAVED LOCALLY',
    },
  ],
};

function LanguageSwitch({
  copy,
  locale,
  onLocaleChange,
  compact = false,
}: CinematicHeroProps & { copy: HeroLanguage; compact?: boolean }) {
  return (
    <div
      aria-label={copy.languageLabel}
      className={compact ? 'hero-language hero-language--menu' : 'hero-language'}
      role="group"
    >
      {(['it', 'en'] as const).map((value) => (
        <button
          aria-pressed={locale === value}
          className={locale === value ? 'is-active' : undefined}
          key={value}
          onClick={() => onLocaleChange(value)}
          type="button"
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function DemoOverlay({
  copy,
  locale,
  onClose,
}: {
  copy: HeroLanguage;
  locale: Locale;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const badges = STORE_BADGES[locale];
  const frames = demoFrames[locale];

  useEffect(() => {
    closeButtonRef.current?.focus();
    overlayRef.current?.scrollTo({ top: 0 });
    framesRef.current?.scrollTo({ left: 0 });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) {
      return undefined;
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => {
        const styles = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        return styles.display !== 'none'
          && styles.visibility !== 'hidden'
          && bounds.width > 0
          && bounds.height > 0;
      });
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    overlay.addEventListener('keydown', trapFocus);
    return () => overlay.removeEventListener('keydown', trapFocus);
  }, []);

  useEffect(() => () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }
  }, []);

  const scrollToFrame = (index: number) => {
    const container = framesRef.current;
    const nextIndex = Math.max(0, Math.min(index, frames.length - 1));
    const target = container?.children.item(nextIndex);

    if (!container || !(target instanceof HTMLElement)) {
      return;
    }

    container.scrollTo({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      left: target.offsetLeft - container.offsetLeft,
    });
    setActiveFrame(nextIndex);
  };

  const updateActiveFrame = () => {
    if (scrollFrameRef.current !== null) {
      return;
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const container = framesRef.current;
      scrollFrameRef.current = null;

      if (!container) {
        return;
      }

      const viewportCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(container.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) {
          return;
        }

        const frameCenter = child.offsetLeft - container.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(frameCenter - viewportCenter);

        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });
      setActiveFrame(closestIndex);
    });
  };

  return createPortal(
    <div
      aria-describedby="product-demo-intro"
      aria-labelledby="product-demo-title"
      aria-modal="true"
      className="demo-overlay is-open"
      ref={overlayRef}
      role="dialog"
    >
      <header className="demo-overlay__header">
        <div>
          <p className="technical-label">ROUTEBUDGET / PRODUCT PROOF</p>
          <h2 id="product-demo-title">{copy.demoTitle}</h2>
          <p id="product-demo-intro">{copy.demoIntro}</p>
        </div>
        <button
          aria-label={copy.demoClose}
          className="icon-control"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={22} strokeWidth={1.7} />
        </button>
      </header>

      <div aria-label={copy.demoControlsLabel} className="demo-overlay__controls" role="group">
        <button
          aria-label={copy.demoPrevious}
          disabled={activeFrame === 0}
          onClick={() => scrollToFrame(activeFrame - 1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} strokeWidth={1.7} />
        </button>
        <p aria-atomic="true" aria-live="polite">
          <span>{copy.demoScreenLabel}</span>
          <strong>
            {String(activeFrame + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
          </strong>
        </p>
        <button
          aria-label={copy.demoNext}
          disabled={activeFrame === frames.length - 1}
          onClick={() => scrollToFrame(activeFrame + 1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={22} strokeWidth={1.7} />
        </button>
      </div>

      <div
        aria-label={copy.demoCarouselLabel}
        className="demo-overlay__frames"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollToFrame(activeFrame - 1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollToFrame(activeFrame + 1);
          }
        }}
        onScroll={updateActiveFrame}
        ref={framesRef}
        role="region"
        tabIndex={0}
      >
        {frames.map((frame, index) => (
          <figure className="demo-frame" key={frame.label}>
            <div className="demo-frame__image">
              <picture>
                <source
                  sizes="(max-width: 900px) 78vw, 360px"
                  srcSet={frame.avifSrcSet}
                  type="image/avif"
                />
                <img
                  alt={frame.alt}
                  decoding="async"
                  height="2400"
                  loading="lazy"
                  src={frame.image}
                  width="1080"
                />
              </picture>
            </div>
            <figcaption>
              <span className="technical-label">
                {String(index + 1).padStart(2, '0')} / {frame.label}
              </span>
              <strong>{frame.value}</strong>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="demo-overlay__stores">
        <a aria-label={badges.appStoreAlt} data-analytics-id="demo-app-store" href={APP_STORE_URL} rel="noreferrer" target="_blank">
          <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
        </a>
        <a aria-label={badges.googlePlayAlt} data-analytics-id="demo-google-play" href={GOOGLE_PLAY_URL} rel="noreferrer" target="_blank">
          <img alt={badges.googlePlayAlt} height="50" src={badges.googlePlay} width="129" />
        </a>
      </div>
    </div>,
    document.body,
  );
}

export function CinematicHero({ locale, onLocaleChange }: CinematicHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [storeChooserOpen, setStoreChooserOpen] = useState(false);
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const saveDataEnabled = Boolean(connection?.saveData);
  const constrainedConnection = saveDataEnabled || ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');
  const [mediaEnabled, setMediaEnabled] = useState(false);
  const [heroVideo, setHeroVideo] = useState<HeroVideoChoice>(selectHeroVideo);
  const [productRevealEnabled, setProductRevealEnabled] = useState(
    () => !constrainedConnection && window.matchMedia(PRODUCT_REVEAL_QUERY).matches,
  );
  const closeMenuRef = useRef<HTMLButtonElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const demoTriggerRef = useRef<HTMLButtonElement>(null);
  const firstStoreRef = useRef<HTMLAnchorElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroStageRef = useRef<HTMLElement>(null);
  const spotlightFrameRef = useRef<number | null>(null);
  const copy = heroLanguage[locale];
  const badges = STORE_BADGES[locale];

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let heroVisible = true;
    let mediaReady = false;

    const syncPlayback = () => {
      const video = heroVideoRef.current;
      const canPlay = mediaReady && !motionPreference.matches && !constrainedConnection;

      setMediaEnabled(canPlay);

      if (!video) {
        return;
      }

      if (!canPlay || !heroVisible || document.hidden) {
        video.pause();
        if (!canPlay) {
          video.currentTime = 0;
        }
        return;
      }

      void video.play().catch(() => undefined);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry?.isIntersecting ?? true;
        syncPlayback();
      },
      { threshold: 0.05 },
    );

    syncPlayback();
    const mediaTimer = window.setTimeout(() => {
      mediaReady = true;
      syncPlayback();
    }, 1200);
    motionPreference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    if (heroVideoRef.current) {
      visibilityObserver.observe(heroVideoRef.current);
    }

    return () => {
      motionPreference.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      visibilityObserver.disconnect();
      window.clearTimeout(mediaTimer);
    };
  }, [constrainedConnection]);

  useEffect(() => {
    const revealPreference = window.matchMedia(PRODUCT_REVEAL_QUERY);
    const syncReveal = () => setProductRevealEnabled(!constrainedConnection && revealPreference.matches);

    syncReveal();
    revealPreference.addEventListener('change', syncReveal);
    return () => revealPreference.removeEventListener('change', syncReveal);
  }, [constrainedConnection]);

  useEffect(() => {
    if (!menuOpen && !demoOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const mainElement = document.getElementById('contenuto');
    document.body.style.overflow = 'hidden';
    mainElement?.setAttribute('inert', '');
    mainElement?.setAttribute('aria-hidden', 'true');

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (menuOpen) {
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuTriggerRef.current?.focus({ preventScroll: true }));
      }
      if (demoOpen) {
        setDemoOpen(false);
        window.requestAnimationFrame(() => demoTriggerRef.current?.focus({ preventScroll: true }));
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
      mainElement?.removeAttribute('inert');
      mainElement?.removeAttribute('aria-hidden');
    };
  }, [demoOpen, menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      closeMenuRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const overlay = menuOverlayRef.current;

    if (!menuOpen || !overlay) {
      return undefined;
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => {
        const styles = window.getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        return styles.visibility !== 'hidden'
          && styles.display !== 'none'
          && bounds.width > 0
          && bounds.height > 0;
      });
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    overlay.addEventListener('keydown', trapFocus);
    return () => overlay.removeEventListener('keydown', trapFocus);
  }, [menuOpen]);

  useEffect(() => () => {
    if (spotlightFrameRef.current !== null) {
      window.cancelAnimationFrame(spotlightFrameRef.current);
    }
  }, []);

  const focusHashTarget = (href: string) => {
    if (!href.startsWith('#')) {
      return;
    }

    let targetId: string;

    try {
      targetId = decodeURIComponent(href.slice(1));
    } catch {
      return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const headingId = target.getAttribute('aria-labelledby');
    const focusTarget = headingId ? document.getElementById(headingId) ?? target : target;
    focusTarget.setAttribute('tabindex', '-1');
    target.scrollIntoView();
    focusTarget.focus({ preventScroll: true });
    focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true });
  };

  const closeMenu = (restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuTriggerRef.current?.focus({ preventScroll: true }));
    }
  };

  const followMenuLink = (href: string) => {
    closeMenu(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => focusHashTarget(href));
    });
  };

  const openStoreChooser = () => {
    setStoreChooserOpen(true);
    window.requestAnimationFrame(() => firstStoreRef.current?.focus({ preventScroll: true }));
  };

  const updateSpotlight = (event: ReactPointerEvent<HTMLElement>) => {
    if (!productRevealEnabled || event.pointerType !== 'mouse' || spotlightFrameRef.current !== null) {
      return;
    }

    const { clientX, clientY } = event;
    spotlightFrameRef.current = window.requestAnimationFrame(() => {
      const stage = heroStageRef.current;
      spotlightFrameRef.current = null;

      if (!stage) {
        return;
      }

      const bounds = stage.getBoundingClientRect();
      stage.style.setProperty('--spot-x', `${clientX - bounds.left}px`);
      stage.style.setProperty('--spot-y', `${clientY - bounds.top}px`);
    });
  };

  const resetSpotlight = () => {
    const stage = heroStageRef.current;
    stage?.style.setProperty('--spot-x', '76vw');
    stage?.style.setProperty('--spot-y', '38svh');
  };

  const useFallbackVideo = () => {
    setHeroVideo((current) => (
      current.fallback ? { src: current.fallback } : current
    ));
  };

  return (
    <>
      <section
        className="hero-stage"
        id="top"
        onPointerLeave={resetSpotlight}
        onPointerMove={updateSpotlight}
        ref={heroStageRef}
      >
        <div aria-hidden="true" className="hero-opening">
          {copy.opening.map((label, index) => (
            <div className="hero-opening__panel" key={label} style={{ '--opening-index': index } as CSSProperties}>
              <span>{label}</span>
            </div>
          ))}
          <div className="hero-opening__brand">
            <img alt="" height="96" src={APP_ICON} width="96" />
            <strong>ROUTEBUDGET EU</strong>
          </div>
        </div>

        <div className="hero-stage__media-wrap">
          <video
            aria-hidden="true"
            autoPlay={mediaEnabled}
            className="hero-stage__media"
            data-media-status="higgsfield-approved-original"
            loop
            muted
            onError={useFallbackVideo}
            playsInline
            poster={heroPoster}
            preload={mediaEnabled ? 'metadata' : 'none'}
            ref={heroVideoRef}
            src={mediaEnabled ? heroVideo.src : undefined}
          />
        </div>
        <div aria-hidden="true" className="hero-stage__contrast" />
        <div aria-hidden="true" className="hero-stage__grid" />
        {productRevealEnabled ? (
          <div aria-hidden="true" className="hero-product-reveal">
            <div className="hero-product-reveal__plane">
              <div className="hero-product-reveal__device">
                <picture>
                  <source
                    sizes="340px"
                    srcSet={`${appScenariosAvif540} 540w, ${appScenariosAvif1080} 1080w`}
                    type="image/avif"
                  />
                  <img alt="" decoding="async" fetchPriority="low" height="2400" loading="lazy" src={appScenarios} width="1080" />
                </picture>
              </div>
            </div>
          </div>
        ) : null}
        <div className="hero-shell">
          <nav aria-label={copy.navigationLabel} className="hero-navbar">
            <a aria-label="RouteBudget EU — Home" className="hero-brand" href="#top">
              <img alt="" height="96" src={APP_ICON} width="96" />
              <span>ROUTEBUDGET <b>EU</b></span>
            </a>

            <div className="hero-desktop-nav">
              {copy.nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
            </div>

            <div className="hero-navbar__actions">
              <LanguageSwitch copy={copy} locale={locale} onLocaleChange={onLocaleChange} />
              <button
                aria-controls="hero-download-options"
                aria-expanded={storeChooserOpen}
                className="hero-nav-download"
                data-analytics-id="hero-nav-download"
                onClick={openStoreChooser}
                type="button"
              >
                {copy.primaryCta}
                <ArrowDown aria-hidden="true" size={16} />
              </button>
            </div>

            <button
              aria-controls="routebudget-mobile-menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-label={copy.menuLabel}
              className="hero-mobile-menu icon-control"
              onClick={() => setMenuOpen(true)}
              ref={menuTriggerRef}
              type="button"
            >
              <Menu aria-hidden="true" size={22} strokeWidth={1.7} />
            </button>
          </nav>

          <div className="hero-composition">
            <div className="hero-copy">
              <p className="hero-kicker"><span aria-hidden="true" />{copy.eyebrow}</p>
              <h1 className="hero-headline" id="hero-title" tabIndex={-1}>
                <span>{copy.headline[0]}</span>
                <span>{copy.headline[1]}</span>
              </h1>
              <p className="hero-body">{copy.body}</p>

              <div className="hero-actions">
                <button
                  aria-controls="hero-download-options"
                  aria-expanded={storeChooserOpen}
                  className="hero-primary-cta"
                  data-analytics-id="hero-primary-download"
                  onClick={openStoreChooser}
                  type="button"
                >
                  <span>{copy.primaryCta}</span>
                  <span aria-hidden="true" className="hero-primary-cta__disc"><ArrowDown size={18} strokeWidth={1.8} /></span>
                </button>
                <div
                  aria-label={copy.downloadOptionsLabel}
                  className="hero-store-choices"
                  hidden={!storeChooserOpen}
                  id="hero-download-options"
                  role="group"
                >
                  <a
                    aria-label={badges.appStoreAlt}
                    data-analytics-id="hero-app-store"
                    href={APP_STORE_URL}
                    ref={firstStoreRef}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
                  </a>
                  <a
                    aria-label={badges.googlePlayAlt}
                    data-analytics-id="hero-google-play"
                    href={GOOGLE_PLAY_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={badges.googlePlayAlt} height="50" src={badges.googlePlay} width="129" />
                  </a>
                </div>
                <button
                  aria-haspopup="dialog"
                  className="hero-demo-button"
                  data-analytics-id="hero-product-demo"
                  onClick={() => setDemoOpen(true)}
                  ref={demoTriggerRef}
                  type="button"
                >
                  <Play aria-hidden="true" fill="currentColor" size={14} strokeWidth={1.5} />
                  <span>{copy.demoLabel}</span>
                </button>
              </div>
              <p className="hero-trust">{copy.trust}</p>
            </div>

            <div aria-hidden="true" className="hero-route-marker">
              <span className="hero-route-marker__label">EU / 870 KM</span>
              <span className="hero-route-marker__line" />
              <span className="hero-route-marker__dot" />
            </div>
          </div>

          <div aria-label={copy.ledgerLabel} className="hero-ledger">
            <div className="hero-ledger__route">
              <span>{copy.ledger.routeLabel}</span>
              <strong>{copy.ledger.routeValue}</strong>
            </div>
            <div className="hero-ledger__decision">
              <dl><dt>{copy.ledger.costLabel}</dt><dd>{copy.ledger.costValue}</dd></dl>
              <div aria-hidden="true" className="hero-ledger__connector">
                <svg viewBox="0 0 156 24" preserveAspectRatio="none">
                  <path d="M2 12H142" pathLength="1" />
                  <path d="M134 4L144 12L134 20" />
                </svg>
              </div>
              <dl className="hero-ledger__price"><dt>{copy.ledger.priceLabel}</dt><dd>{copy.ledger.priceValue}</dd></dl>
              <dl className="hero-ledger__profit"><dt>{copy.ledger.profitLabel}</dt><dd>{copy.ledger.profitValue}</dd></dl>
            </div>
            <p>{copy.ledger.disclaimer}</p>
          </div>
        </div>
      </section>

      {createPortal(
        <div
          aria-hidden={!menuOpen}
          aria-labelledby="mobile-menu-title"
          aria-modal="true"
          className={`mobile-nav-overlay ${menuOpen ? 'is-open' : ''}`}
          id="routebudget-mobile-menu"
          inert={!menuOpen}
          ref={menuOverlayRef}
          role="dialog"
        >
          <h2 className="sr-only" id="mobile-menu-title">{copy.navigationLabel}</h2>
          <div className="mobile-nav-overlay__header">
            <a aria-label="RouteBudget EU — Home" className="hero-brand" href="#top" onClick={() => followMenuLink('#top')} tabIndex={menuOpen ? 0 : -1}>
              <img alt="" height="96" src={APP_ICON} width="96" />
              <span>ROUTEBUDGET <b>EU</b></span>
            </a>
            <button aria-label={copy.closeLabel} className="icon-control" onClick={() => closeMenu()} ref={closeMenuRef} tabIndex={menuOpen ? 0 : -1} type="button">
              <X aria-hidden="true" size={22} strokeWidth={1.7} />
            </button>
          </div>

          <nav aria-label={copy.navigationLabel} className="mobile-nav-overlay__links">
            {copy.nav.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => followMenuLink(item.href)} style={{ '--menu-delay': `${90 + index * 55}ms` } as CSSProperties} tabIndex={menuOpen ? 0 : -1}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
                <ArrowUpRight aria-hidden="true" size={20} />
              </a>
            ))}
          </nav>

          <div className="mobile-nav-overlay__footer">
            <LanguageSwitch compact copy={copy} locale={locale} onLocaleChange={onLocaleChange} />
            <div className="mobile-nav-overlay__stores">
              <a aria-label={badges.appStoreAlt} data-analytics-id="mobile-menu-app-store" href={APP_STORE_URL} rel="noreferrer" tabIndex={menuOpen ? 0 : -1} target="_blank">
                <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
              </a>
              <a aria-label={badges.googlePlayAlt} data-analytics-id="mobile-menu-google-play" href={GOOGLE_PLAY_URL} rel="noreferrer" tabIndex={menuOpen ? 0 : -1} target="_blank">
                <img alt={badges.googlePlayAlt} height="50" src={badges.googlePlay} width="129" />
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {demoOpen ? (
        <DemoOverlay
          copy={copy}
          locale={locale}
          onClose={() => {
            setDemoOpen(false);
            window.requestAnimationFrame(() => demoTriggerRef.current?.focus({ preventScroll: true }));
          }}
        />
      ) : null}
    </>
  );
}
