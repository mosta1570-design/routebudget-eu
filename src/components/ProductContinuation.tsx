import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileText, FolderClock } from 'lucide-react';

import appArchive from '../assets/app-archive-it.png';
import appCosts from '../assets/app-costs-it.png';
import appScenarios from '../assets/app-scenarios-it.png';
import { APP_STORE_URL, GOOGLE_PLAY_URL, STORE_BADGES, SUPPORT_EMAIL } from '../content/siteConfig';
import type { Locale, SiteCopy } from '../content/siteCopy';

const editorial = {
  it: {
    methodLabel: 'Il conto della tratta',
    methodNote: 'Esempio dimostrativo · 870 km · dati inseriti nell’app',
    costLines: 'Costi operativi',
    operatingCost: 'Costo operativo',
    targetMargin: 'Margine obiettivo',
    recommendedPrice: 'Prezzo consigliato',
    expectedProfit: 'Utile previsto',
    values: {
      cost: '1.220,68 €',
      margin: '20%',
      recommended: '1.525,85 €',
      profit: '305,17 €',
    },
    calculationNote: 'Valori dimostrativi. Il risultato cambia con i dati inseriti.',
    productLabel: 'Il prodotto sul campo',
    productProof: 'Schermate reali dell’app Android',
    productSteps: ['Confronta il prezzo', 'Verifica ogni costo', 'Riapri la tratta'],
    functionsLabel: 'Flusso operativo',
    functionsHeading: 'Dai dati al cliente, senza perdere il filo.',
    functionsBody:
      'Quattro passaggi seguono la stessa tratta. Nessun trasferimento manuale tra calcolo, preventivo e Archivio.',
    pdfLabel: 'Preventivo PDF',
    pdfHeading: 'Un riepilogo pronto da condividere.',
    pdfBody:
      'Esporta un documento non vincolante. Il dettaglio costi è opzionale; con Pro puoi aggiungere il logo aziendale.',
    pdfFacts: ['Dettaglio costi opzionale', 'Logo aziendale con Pro', 'Documento non vincolante'],
    archiveLabel: 'Archivio locale',
    archiveHeading: 'Ogni tratta resta disponibile.',
    archiveBody:
      'Salva i calcoli sul dispositivo, riaprili e genera di nuovo il PDF. Nessun account da creare.',
    pricingLabel: 'Free e Pro',
    pricingHeading: 'Inizia gratis. Sblocca Pro quando serve.',
    pricingBody:
      'Stesso metodo di calcolo. Cambiano limite operativo e personalizzazione del preventivo.',
    freeLabel: 'Free',
    freeValue: '3 calcoli',
    freeText: 'Per verificare il metodo con i tuoi dati.',
    proLabel: 'Pro',
    proValue: 'Calcoli illimitati',
    proText: 'Include il logo aziendale nei PDF.',
    pricingAction: 'Vai al download',
    resourcesLabel: 'Metodo aperto',
    resourcesHeading: 'Guide e calcolatori per controllare ogni ipotesi.',
    resourcesBody:
      'Approfondisci una voce di costo o prepara una tratta prima di aprire l’app.',
    supportLabel: 'Supporto diretto',
    downloadLabel: 'RouteBudget EU',
    downloadTrust: 'Gratis su App Store e Google Play · Acquisti in-app',
    imageAlts: {
      scenarios: 'Scenari Minimo, Consigliato e Ideale nell’app RouteBudget EU',
      costs: 'Dettaglio reale dei costi di una tratta in RouteBudget EU',
      archive: 'Archivio locale reale di RouteBudget EU su Android',
    },
  },
  en: {
    methodLabel: 'Route ledger',
    methodNote: 'Demonstration example · 870 km · data entered in the app',
    costLines: 'Operating costs',
    operatingCost: 'Operating cost',
    targetMargin: 'Target margin',
    recommendedPrice: 'Recommended price',
    expectedProfit: 'Expected profit',
    values: {
      cost: '€1,220.68',
      margin: '20%',
      recommended: '€1,525.85',
      profit: '€305.17',
    },
    calculationNote: 'Demonstration values. Results change with the data entered.',
    productLabel: 'Product in the field',
    productProof: 'Real Android app screens',
    productSteps: ['Compare the price', 'Verify every cost', 'Reopen the route'],
    functionsLabel: 'Operating flow',
    functionsHeading: 'From data to customer, without losing the thread.',
    functionsBody:
      'Four steps follow the same route. No manual transfer between calculation, quote and Archive.',
    pdfLabel: 'PDF quote',
    pdfHeading: 'A summary ready to share.',
    pdfBody:
      'Export a non-binding document. Cost detail is optional; Pro lets you add your company logo.',
    pdfFacts: ['Optional cost detail', 'Company logo with Pro', 'Non-binding document'],
    archiveLabel: 'Local Archive',
    archiveHeading: 'Every route stays available.',
    archiveBody:
      'Save calculations on your device, reopen them and create the PDF again. No account to create.',
    pricingLabel: 'Free and Pro',
    pricingHeading: 'Start free. Unlock Pro when needed.',
    pricingBody:
      'Same calculation method. The operating limit and quote customisation change.',
    freeLabel: 'Free',
    freeValue: '3 calculations',
    freeText: 'Use your own data to verify the method.',
    proLabel: 'Pro',
    proValue: 'Unlimited calculations',
    proText: 'Includes your company logo on PDFs.',
    pricingAction: 'Go to download',
    resourcesLabel: 'Open method',
    resourcesHeading: 'Guides and calculators to check every assumption.',
    resourcesBody: 'Explore one cost line or prepare a route before opening the app.',
    supportLabel: 'Direct support',
    downloadLabel: 'RouteBudget EU',
    downloadTrust: 'Free on the App Store and Google Play · In-App Purchases',
    imageAlts: {
      scenarios: 'Minimum, Recommended and Ideal scenarios in RouteBudget EU',
      costs: 'Real route cost detail in RouteBudget EU',
      archive: 'Real local RouteBudget EU Archive on Android',
    },
  },
} satisfies Record<Locale, object>;

type ProductContinuationProps = {
  copy: SiteCopy;
  locale: Locale;
};

function useFreightReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const pending: HTMLElement[] = [];

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.dataset.revealed = 'true';
      } else {
        pending.push(element);
      }
    });

    root.dataset.revealReady = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8%', threshold: 0.12 },
    );

    pending.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return rootRef;
}

export function ProductContinuation({ copy, locale }: ProductContinuationProps) {
  const text = editorial[locale];
  const badges = STORE_BADGES[locale];
  const rootRef = useFreightReveal();

  const productScreens = [
    {
      src: appScenarios,
      alt: text.imageAlts.scenarios,
      title: copy.showcase.screens[2],
      body: copy.showcase.captions[2],
      step: text.productSteps[0],
    },
    {
      src: appCosts,
      alt: text.imageAlts.costs,
      title: copy.showcase.screens[1],
      body: copy.showcase.captions[1],
      step: text.productSteps[1],
    },
    {
      src: appArchive,
      alt: text.imageAlts.archive,
      title: copy.showcase.screens[3],
      body: copy.showcase.captions[3],
      step: text.productSteps[2],
    },
  ];

  return (
    <div className="freight-root" ref={rootRef}>
      <section className="freight-section freight-method" id="metodo" aria-labelledby="freight-method-title">
        <div className="freight-wrap">
          <header className="freight-heading" data-reveal>
            <p className="freight-kicker">{text.methodLabel}</p>
            <div className="freight-heading__copy">
              <h2 id="freight-method-title">{copy.equation.heading}</h2>
              <p>{copy.equation.body}</p>
            </div>
          </header>

          <div className="freight-ledger" data-reveal>
            <div className="freight-ledger__route">
              <span className="freight-status-dot" aria-hidden="true" />
              <span>{text.methodNote}</span>
            </div>

            <div className="freight-ledger__body">
              <div className="freight-ledger__costs">
                <p className="freight-label">{text.costLines}</p>
                <ol className="freight-cost-list">
                  {copy.equation.items.map((item) => (
                    <li className="freight-cost-line" key={item.label}>
                      <div>
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </div>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ol>
                <dl className="freight-ledger__subtotal">
                  <dt>{text.operatingCost}</dt>
                  <dd>{text.values.cost}</dd>
                </dl>
              </div>

              <div className="freight-ledger__bridge" aria-hidden="true">
                <ArrowRight size={22} strokeWidth={1.5} />
              </div>

              <div className="freight-ledger__decision">
                <div className="freight-margin">
                  <span>{text.targetMargin}</span>
                  <strong>{text.values.margin}</strong>
                </div>
                <dl className="freight-result">
                  <div className="freight-result__primary">
                    <dt>{text.recommendedPrice}</dt>
                    <dd>{text.values.recommended}</dd>
                  </div>
                  <div>
                    <dt>{text.expectedProfit}</dt>
                    <dd>{text.values.profit}</dd>
                  </div>
                </dl>
                <p className="freight-ledger__note">{text.calculationNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="freight-section freight-product" id="prodotto" aria-labelledby="freight-product-title">
        <div className="freight-wrap">
          <header className="freight-heading" data-reveal>
            <p className="freight-kicker">{text.productLabel}</p>
            <div className="freight-heading__copy">
              <h2 id="freight-product-title">{copy.showcase.heading}</h2>
              <p>{copy.showcase.body}</p>
              <span className="freight-proof">
                <Check aria-hidden="true" size={16} />
                {text.productProof}
              </span>
            </div>
          </header>

          <div
            aria-label={text.productProof}
            className="freight-screen-story"
            role="region"
            tabIndex={0}
          >
            {productScreens.map((screen, index) => (
              <figure className={`freight-screen freight-screen--${index + 1}`} data-reveal key={screen.title}>
                <div className="freight-screen__media">
                  <img
                    alt={screen.alt}
                    decoding="async"
                    height="2400"
                    loading="lazy"
                    src={screen.src}
                    width="1080"
                  />
                </div>
                <figcaption className="freight-screen__caption">
                  <span>{screen.step}</span>
                  <strong>{screen.title}</strong>
                  <p>{screen.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="freight-section freight-functions" id="funzioni" aria-labelledby="freight-functions-title">
        <div className="freight-wrap">
          <header className="freight-heading" data-reveal>
            <p className="freight-kicker">{text.functionsLabel}</p>
            <div className="freight-heading__copy">
              <h2 id="freight-functions-title">{text.functionsHeading}</h2>
              <p>{text.functionsBody}</p>
            </div>
          </header>

          <ol className="freight-flow" data-reveal>
            {copy.flow.items.map((item, index) => (
              <li className="freight-flow__step" key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="freight-tools">
            <article className="freight-tool" data-reveal>
              <FileText aria-hidden="true" size={26} strokeWidth={1.5} />
              <p className="freight-label">{text.pdfLabel}</p>
              <h3>{text.pdfHeading}</h3>
              <p>{text.pdfBody}</p>
              <ul className="freight-checks">
                {text.pdfFacts.map((fact) => (
                  <li key={fact}>
                    <Check aria-hidden="true" size={15} />
                    {fact}
                  </li>
                ))}
              </ul>
            </article>

            <article className="freight-tool" data-reveal>
              <FolderClock aria-hidden="true" size={26} strokeWidth={1.5} />
              <p className="freight-label">{text.archiveLabel}</p>
              <h3>{text.archiveHeading}</h3>
              <p>{text.archiveBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="freight-section freight-pricing" id="prezzi" aria-labelledby="freight-pricing-title">
        <span className="freight-anchor" id="per-chi" aria-hidden="true" />
        <div className="freight-wrap">
          <header className="freight-heading" data-reveal>
            <p className="freight-kicker">{text.pricingLabel}</p>
            <div className="freight-heading__copy">
              <h2 id="freight-pricing-title">{text.pricingHeading}</h2>
              <p>{text.pricingBody}</p>
            </div>
          </header>

          <dl className="freight-plans" data-reveal>
            <div className="freight-plan">
              <dt>{text.freeLabel}</dt>
              <dd>
                <strong>{text.freeValue}</strong>
                <span>{text.freeText}</span>
              </dd>
              <a href="#scarica">
                {text.pricingAction}
                <ArrowDown aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="freight-plan freight-plan--pro">
              <dt>{text.proLabel}</dt>
              <dd>
                <strong>{text.proValue}</strong>
                <span>{text.proText}</span>
              </dd>
              <a href="#scarica">
                {text.pricingAction}
                <ArrowDown aria-hidden="true" size={17} />
              </a>
            </div>
          </dl>
        </div>
      </section>

      <section className="freight-section freight-resources" aria-labelledby="freight-resources-title">
        <div className="freight-wrap">
          <header className="freight-heading" data-reveal>
            <p className="freight-kicker">{text.resourcesLabel}</p>
            <div className="freight-heading__copy">
              <h2 id="freight-resources-title">{text.resourcesHeading}</h2>
              <p>{text.resourcesBody}</p>
            </div>
          </header>

          <ul className="freight-resource-list">
            {copy.resources.items.map((item) => (
              <li className="freight-resource" data-reveal key={item.href}>
                <div className="freight-resource__copy">
                  <small>{item.kind}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <a href={item.href} aria-label={`${item.action}: ${item.title}`}>
                  {item.action}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </li>
            ))}
          </ul>

          <a className="freight-resource-hub" href="/it/guide/">
            {copy.resources.hubAction}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <section className="freight-section freight-support" id="supporto" aria-labelledby="freight-support-title">
        <div className="freight-wrap freight-support__layout">
          <header className="freight-support__intro" data-reveal>
            <p className="freight-kicker">{text.supportLabel}</p>
            <h2 id="freight-support-title">{copy.support.heading}</h2>
            <p>{copy.support.body}</p>
            <a href={SUPPORT_EMAIL}>
              {copy.support.emailCta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </header>

          <div className="freight-faq-list" data-reveal>
            {copy.support.faqs.map((faq) => (
              <details className="freight-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="freight-section freight-download" id="scarica" aria-labelledby="freight-download-title">
        <div className="freight-wrap freight-download__layout" data-reveal>
          <div className="freight-download__copy">
            <p className="freight-kicker">{text.downloadLabel}</p>
            <h2 id="freight-download-title">{copy.closing.heading}</h2>
            <p>{copy.closing.body}</p>
          </div>

          <div className="freight-download__actions">
              <a
                aria-label={badges.appStoreAlt}
                data-analytics-id="download-app-store"
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
              <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
            </a>
              <a
                aria-label={badges.googlePlayAlt}
                data-analytics-id="download-google-play"
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
              >
              <img alt={badges.googlePlayAlt} height="50" src={badges.googlePlay} width="129" />
            </a>
            <small>{text.downloadTrust}</small>
          </div>
        </div>
      </section>

      <footer className="freight-footer">
        <div className="freight-wrap freight-footer__layout">
          <p>{copy.footer.copyright}</p>
          <nav aria-label={locale === 'it' ? 'Link legali e risorse' : 'Legal and resource links'}>
            <a href="/it/guide/">{copy.footer.guides}</a>
            <a href="/it/calcolatori/">{copy.footer.calculators}</a>
            <a href="#supporto">{copy.footer.support}</a>
            <a href="/privacy.html">{copy.footer.privacy}</a>
            <a href="/terms.html">{copy.footer.terms}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
