import { useEffect, useState } from 'react';

import { CinematicHero } from './components/CinematicHero';
import { ProductContinuation } from './components/ProductContinuation';
import { siteCopy, type Locale } from './content/siteCopy';

const LOCALE_KEY = 'routebudget-site-locale';

function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem(LOCALE_KEY);
  return stored === 'en' ? 'en' : 'it';
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const copy = siteCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.body.dataset.locale = locale;
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#contenuto">
        {copy.skipLabel}
      </a>
      <main id="contenuto">
        <CinematicHero locale={locale} onLocaleChange={setLocale} />
        <ProductContinuation copy={copy} locale={locale} />
      </main>
    </>
  );
}
