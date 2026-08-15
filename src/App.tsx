import { useEffect, useState } from 'react';

import { CinematicHero } from './components/CinematicHero';
import { ProductContinuation } from './components/ProductContinuation';
import { siteCopy, type Locale } from './content/siteCopy';

const LOCALE_KEY = 'routebudget-site-locale';

const HOME_META: Record<
  Locale,
  {
    title: string;
    description: string;
    socialDescription: string;
    ogLocale: string;
    imageAlt: string;
  }
> = {
  it: {
    title: 'RouteBudget EU | Costi camion e preventivi PDF',
    description:
      'RouteBudget EU calcola costi di tratta, pedaggi, carburante, ore di guida e margine. Preventivi PDF professionali per autotrasportatori europei.',
    socialDescription: 'Calcola il prezzo giusto prima di accettare la tratta.',
    ogLocale: 'it_IT',
    imageAlt: 'RouteBudget EU, controllo dei costi di una tratta camion',
  },
  en: {
    title: 'RouteBudget EU | Truck costs and PDF quotes',
    description:
      'RouteBudget EU calculates route costs, tolls, fuel, driving hours and margin. Professional PDF quotes for European road transport.',
    socialDescription: 'Calculate the right price before accepting the route.',
    ogLocale: 'en_GB',
    imageAlt: 'RouteBudget EU truck route cost control',
  },
};

function setMeta(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function getInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_KEY);
    return stored === 'en' ? 'en' : 'it';
  } catch {
    return 'it';
  }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const copy = siteCopy[locale];

  useEffect(() => {
    const meta = HOME_META[locale];

    document.documentElement.lang = locale;
    document.body.dataset.locale = locale;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.ogLocale);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.socialDescription);
    setMeta('meta[property="og:image:alt"]', meta.imageAlt);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.socialDescription);
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      // Browsers may disable storage in privacy-restricted contexts.
    }
  }, [locale]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return undefined;
    }

    let targetId: string;

    try {
      targetId = decodeURIComponent(hash);
    } catch {
      return undefined;
    }

    let innerFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#hero-title">
        {copy.skipLabel}
      </a>
      <main id="contenuto">
        <CinematicHero locale={locale} onLocaleChange={setLocale} />
        <ProductContinuation copy={copy} locale={locale} />
      </main>
    </>
  );
}
