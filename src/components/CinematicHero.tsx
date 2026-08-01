import {
  ArrowUpRight,
  Menu,
  Play,
  X,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';

import appArchive from '../assets/app-archive-it.png';
import appCosts from '../assets/app-costs-it.png';
import appIcon from '../assets/app-icon.png';
import appScenarios from '../assets/app-scenarios-it.png';
import heroDesktop from '../assets/hero/routebudget-hero-desktop.mp4';
import heroMobile from '../assets/hero/routebudget-hero-mobile.mp4';
import heroPoster from '../assets/hero/routebudget-hero-poster.webp';
import type { Locale } from '../content/siteCopy';

const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';
const STORE_BADGES = {
  it: {
    appStore: '/store-badges/app-store-it.svg',
    googlePlay: '/store-badges/google-play-it.png',
    appStoreAlt: 'Scarica su App Store',
    googlePlayAlt: 'Disponibile su Google Play',
  },
  en: {
    appStore: '/store-badges/app-store-en.svg',
    googlePlay: '/store-badges/google-play-en.png',
    appStoreAlt: 'Download on the App Store',
    googlePlayAlt: 'Get it on Google Play',
  },
} satisfies Record<Locale, { appStore: string; googlePlay: string; appStoreAlt: string; googlePlayAlt: string }>;

type CinematicHeroProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

type HeroLanguage = {
  navigationLabel: string;
  menuLabel: string;
  closeLabel: string;
  demoLabel: string;
  demoTitle: string;
  demoIntro: string;
  demoClose: string;
  downloadLabel: string;
  availability: string;
  footerFacts: string;
  meta: {
    blurb: string[];
    positioning: string;
    problemLabel: string;
    problem: string;
    functionsLabel: string;
    functions: string[];
  };
  headline: [string, string, string, string];
  chips: Array<{ label: string; detail: string }>;
  nav: Array<{ label: string; href: string }>;
};

const heroLanguage: Record<Locale, HeroLanguage> = {
  it: {
    navigationLabel: 'Navigazione principale',
    menuLabel: 'Apri il menu',
    closeLabel: 'Chiudi il menu',
    demoLabel: 'Guarda come funziona',
    demoTitle: 'Dal costo al prezzo, senza fogli sparsi.',
    demoIntro:
      'Tre schermate reali dell’app Android: scenari, composizione dei costi e Archivio locale.',
    demoClose: 'Chiudi la dimostrazione',
    downloadLabel: 'Scarica RouteBudget',
    availability: 'Disponibile per iPhone e Android.',
    footerFacts: '7 lingue • Preventivi PDF • Archivio locale',
    meta: {
      blurb: ['Il controllo economico', 'di ogni tratta, prima', 'di partire.'],
      positioning: 'MARGINI',
      problemLabel: 'COSA RISOLVE',
      problem: 'Stima il costo operativo e il prezzo corretto prima di accettare il viaggio.',
      functionsLabel: 'FUNZIONI',
      functions: [
        'Carburante e pedaggi',
        'Autista e usura',
        'Tre scenari di prezzo',
        'Preventivo PDF',
        'Archivio locale',
      ],
    },
    headline: ['CALCOLA IL', 'COSTO REALE', 'PRIMA DI ACCETTARE', 'LA TRATTA'],
    chips: [
      { label: 'COSTI', detail: 'COMPLETI' },
      { label: '3 PREZZI', detail: 'MIN • CONS • IDEAL' },
      { label: 'PDF', detail: 'PROFESSIONALE' },
    ],
    nav: [
      { label: 'PRODOTTO', href: '#prodotto' },
      { label: 'COME FUNZIONA', href: '#metodo' },
      { label: 'FUNZIONI', href: '#funzioni' },
      { label: 'PREZZI', href: '#prezzi' },
      { label: 'GUIDE', href: '/it/guide/' },
      { label: 'SCARICA', href: '#scarica' },
    ],
  },
  en: {
    navigationLabel: 'Primary navigation',
    menuLabel: 'Open menu',
    closeLabel: 'Close menu',
    demoLabel: 'See how it works',
    demoTitle: 'From operating cost to a clear price.',
    demoIntro:
      'Three authentic Android app screens: scenarios, cost composition, and local Archive.',
    demoClose: 'Close demonstration',
    downloadLabel: 'Download RouteBudget',
    availability: 'Available for iPhone and Android.',
    footerFacts: '7 languages • PDF estimates • Local Archive',
    meta: {
      blurb: ['Economic control', 'for every route, before', 'you depart.'],
      positioning: 'MARGINS',
      problemLabel: 'WHAT IT SOLVES',
      problem: 'Estimate operating cost and the right price before accepting the trip.',
      functionsLabel: 'FUNCTIONS',
      functions: [
        'Fuel and tolls',
        'Driver and wear',
        'Three price scenarios',
        'PDF estimate',
        'Local Archive',
      ],
    },
    headline: ['CALCULATE THE', 'REAL COST', 'BEFORE YOU ACCEPT', 'THE ROUTE'],
    chips: [
      { label: 'COSTS', detail: 'COMBINED' },
      { label: '3 PRICES', detail: 'MIN • REC • IDEAL' },
      { label: 'PDF', detail: 'SHAREABLE' },
    ],
    nav: [
      { label: 'PRODUCT', href: '#prodotto' },
      { label: 'HOW IT WORKS', href: '#metodo' },
      { label: 'FUNCTIONS', href: '#funzioni' },
      { label: 'PRICING', href: '#prezzi' },
      { label: 'GUIDES', href: '/it/guide/' },
      { label: 'DOWNLOAD', href: '#scarica' },
    ],
  },
};

const demoFrames = [
  {
    image: appScenarios,
    alt: 'RouteBudget mostra gli scenari Minimo, Consigliato e Ideale',
    label: '01 / SCENARI',
    value: '1.525,85 €',
  },
  {
    image: appCosts,
    alt: 'RouteBudget mostra carburante, pedaggi, autista e usura',
    label: '02 / COSTI',
    value: '1.220,68 €',
  },
  {
    image: appArchive,
    alt: 'RouteBudget mostra un calcolo salvato nell’Archivio locale',
    label: '03 / ARCHIVIO',
    value: 'SALVATO IN LOCALE',
  },
];

function LanguageSwitch({
  locale,
  onLocaleChange,
  compact = false,
}: CinematicHeroProps & { compact?: boolean }) {
  return (
    <div className={compact ? 'hero-language hero-language--menu' : 'hero-language'} aria-label="Language">
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
  open,
  onClose,
}: {
  copy: HeroLanguage;
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const badges = STORE_BADGES[locale];

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  return createPortal(
    <div
      aria-hidden={!open}
      aria-labelledby="product-demo-title"
      aria-modal="true"
      className={`demo-overlay ${open ? 'is-open' : ''}`}
      inert={!open}
      role="dialog"
    >
      <div className="demo-overlay__header">
        <div>
          <p className="font-pixel">PRODUCT DEMO / ANDROID</p>
          <h2 id="product-demo-title">{copy.demoTitle}</h2>
          <p>{copy.demoIntro}</p>
        </div>
        <button
          aria-label={copy.demoClose}
          className="icon-control"
          onClick={onClose}
          ref={closeButtonRef}
          tabIndex={open ? 0 : -1}
          type="button"
        >
          <X aria-hidden="true" size={24} strokeWidth={1.6} />
        </button>
      </div>

      <div className="demo-overlay__frames">
        {demoFrames.map((frame) => (
          <figure className="demo-frame" key={frame.label}>
            <div className="demo-frame__image">
              <img alt={frame.alt} height="2400" src={frame.image} width="1080" />
            </div>
            <figcaption>
              <span className="font-pixel">{frame.label}</span>
              <strong>{frame.value}</strong>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="demo-overlay__stores">
        <a aria-label={badges.appStoreAlt} href={APP_STORE_URL} rel="noreferrer" target="_blank">
          <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
        </a>
        <a aria-label={badges.googlePlayAlt} href={GOOGLE_PLAY_URL} rel="noreferrer" target="_blank">
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
  const closeMenuRef = useRef<HTMLButtonElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const copy = heroLanguage[locale];

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPlayback = () => {
      const video = heroVideoRef.current;

      if (!video) {
        return;
      }

      if (motionPreference.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => undefined);
    };

    syncPlayback();
    motionPreference.addEventListener('change', syncPlayback);

    return () => motionPreference.removeEventListener('change', syncPlayback);
  }, []);

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
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setDemoOpen(false);
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <section
        className="hero-stage relative h-screen w-full overflow-hidden bg-black text-white"
        id="top"
      >
        <video
          aria-hidden="true"
          autoPlay
          className="hero-stage__media absolute inset-0 h-full w-full object-cover"
          data-media-status="higgsfield-original"
          loop
          muted
          playsInline
          poster={heroPoster}
          preload="metadata"
          ref={heroVideoRef}
        >
          <source media="(max-width: 767px)" src={heroMobile} type="video/mp4" />
          <source src={heroDesktop} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="hero-stage__contrast" />

        <div className="hero-stage__content relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
          <nav
            aria-label={copy.navigationLabel}
            className="hero-navbar flex items-center justify-between py-6"
          >
            <a aria-label="RouteBudget EU — Home" className="hero-brand" href="#top">
              <img alt="" height="512" src={appIcon} width="512" />
              <span>
                ROUTEBUDGET <b className="font-pixel">EU</b>
              </span>
            </a>

            <div className="hero-desktop-nav">
              {copy.nav.map((item) => (
                <a className={item.href === '#scarica' ? 'hero-nav-download' : undefined} href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
              <LanguageSwitch locale={locale} onLocaleChange={onLocaleChange} />
            </div>

            <button
              aria-expanded={menuOpen}
              aria-label={copy.menuLabel}
              className="hero-mobile-menu icon-control"
              onClick={() => setMenuOpen(true)}
              type="button"
            >
              <Menu aria-hidden="true" size={24} strokeWidth={1.6} />
            </button>
          </nav>

          <div className="hero-meta mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div className="hero-meta__brand">
              <p>ROUTEBUDGET</p>
              <p className="font-pixel">EU</p>
              <span aria-hidden="true" className="font-pixel hero-meta__marker">*</span>
              <p className="font-pixel hero-meta__blurb">
                {copy.meta.blurb.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>

            <div className="hero-meta__positioning">
              <p>COSTI &amp;</p>
              <p className="font-pixel">{copy.meta.positioning}</p>
            </div>

            <div className="hero-meta__problem">
              <p className="font-pixel hero-meta__label">{copy.meta.problemLabel}</p>
              <p>{copy.meta.problem}</p>
            </div>

            <div className="hero-meta__functions">
              <p className="font-pixel hero-meta__label">{copy.meta.functionsLabel}</p>
              <ul>
                {copy.meta.functions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="flex-1" />

          <div className="hero-bottom pb-4">
            <div className="hero-bottom__main grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
              <h1 className="hero-headline text-3xl font-normal uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
                <span>{copy.headline[0]}</span>
                <span className="font-pixel hero-headline__pixel">{copy.headline[1]}</span>
                <span className="hero-headline__compact">{copy.headline[2]}</span>
                <span className="font-pixel hero-headline__pixel">{copy.headline[3]}</span>
              </h1>

              <div className="hero-actions flex flex-col justify-end gap-4 sm:gap-6">
                <button
                  className="hero-demo-button"
                  onClick={() => setDemoOpen(true)}
                  type="button"
                >
                  <Play aria-hidden="true" fill="currentColor" size={16} strokeWidth={1.4} />
                  <span>{copy.demoLabel}</span>
                </button>

                <div className="hero-chips" aria-label="RouteBudget capabilities">
                  {copy.chips.map((chip) => (
                    <div className="hero-chip" key={chip.label}>
                      <strong>{chip.label}</strong>
                      <small className="font-pixel">{chip.detail}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-footer mt-4 grid grid-cols-1 gap-2 pt-4 sm:mt-5 sm:grid-cols-2 sm:gap-4">
              <p>
                <span>{copy.availability}</span>{' '}
                <a href="#scarica">
                  {copy.downloadLabel}
                  <ArrowUpRight aria-hidden="true" size={13} />
                </a>
              </p>
              <p>{copy.footerFacts}</p>
            </div>
          </div>
        </div>
      </section>

      {createPortal(<div
        aria-hidden={!menuOpen}
        className={`mobile-nav-overlay ${menuOpen ? 'is-open' : ''}`}
        inert={!menuOpen}
      >
        <div className="mobile-nav-overlay__header">
          <a aria-label="RouteBudget EU — Home" className="hero-brand" href="#top" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <img alt="" height="512" src={appIcon} width="512" />
            <span>
              ROUTEBUDGET <b className="font-pixel">EU</b>
            </span>
          </a>
          <button
            aria-label={copy.closeLabel}
            className="icon-control"
            onClick={closeMenu}
            ref={closeMenuRef}
            tabIndex={menuOpen ? 0 : -1}
            type="button"
          >
            <X aria-hidden="true" size={24} strokeWidth={1.6} />
          </button>
        </div>

        <nav aria-label={copy.navigationLabel} className="mobile-nav-overlay__links">
          {copy.nav.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              onClick={closeMenu}
              style={{ '--menu-delay': `${100 + index * 60}ms` } as CSSProperties}
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mobile-nav-overlay__footer">
          <LanguageSwitch compact locale={locale} onLocaleChange={onLocaleChange} />
          <p>iPhone • Android</p>
        </div>
      </div>, document.body)}

      <DemoOverlay copy={copy} locale={locale} onClose={() => setDemoOpen(false)} open={demoOpen} />
    </>
  );
}
