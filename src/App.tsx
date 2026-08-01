import { useEffect, useState } from 'react';

import { AudienceSection } from './components/AudienceSection';
import { ClosingSection } from './components/ClosingSection';
import { CostEquation } from './components/CostEquation';
import { GrowthResourcesSection } from './components/GrowthResourcesSection';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { SupportSection } from './components/SupportSection';
import { WorkflowSection } from './components/WorkflowSection';
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
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  return (
    <>
      <a className="skip-link" href="#contenuto">
        {copy.skipLabel}
      </a>
      <SiteHeader locale={locale} copy={copy} onLocaleChange={setLocale} />
      <main id="contenuto">
        <Hero copy={copy.hero} />
        <CostEquation copy={copy.equation} />
        <ProductShowcase copy={copy.showcase} />
        <WorkflowSection copy={copy.flow} />
        <GrowthResourcesSection copy={copy.resources} />
        <AudienceSection copy={copy.audience} />
        <SupportSection copy={copy.support} />
        <ClosingSection copy={copy.closing} />
      </main>
      <SiteFooter copy={copy.footer} />
    </>
  );
}
