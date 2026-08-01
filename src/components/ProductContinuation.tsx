import { ArrowDown, ArrowUpRight, Check, FileText, FolderClock } from 'lucide-react';

import appArchive from '../assets/app-archive-it.png';
import appCosts from '../assets/app-costs-it.png';
import appScenarios from '../assets/app-scenarios-it.png';
import type { Locale, SiteCopy } from '../content/siteCopy';

const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';
const SUPPORT_EMAIL = 'mailto:mosta1570@gmail.com';
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

const editorial = {
  it: {
    methodEyebrow: '01 — Il metodo',
    methodKicker: 'Una tratta dimostrativa, ricostruita voce per voce.',
    equation: 'Costo operativo + margine = prezzo consigliato',
    metrics: {
      cost: 'Costo operativo',
      recommended: 'Prezzo consigliato',
      profit: 'Utile',
      margin: 'Margine',
      distance: 'Distanza',
    },
    values: {
      cost: '1.220,68 €',
      recommended: '1.525,85 €',
      profit: '305,17 €',
      margin: '20%',
      distance: '870 km',
    },
    compositionLabel: 'Composizione del costo',
    compositionNote: 'Valori dimostrativi: i risultati cambiano con i dati inseriti.',
    productEyebrow: '02 — Il prodotto',
    productProof: 'Schermate reali dell’app Android',
    functionsEyebrow: '03 — Le funzioni',
    functionsHeading: 'Dal risultato a un preventivo che puoi condividere.',
    functionsBody:
      'Il calcolo rimane leggibile in ogni passaggio: scenari di prezzo, PDF e Archivio locale seguono la stessa tratta.',
    scenariosLabel: 'Tre scenari, una base di costo',
    scenarios: [
      {
        name: 'Minimo',
        value: 'Pareggio',
        text: 'Mostra il punto in cui il prezzo copre il costo operativo calcolato.',
      },
      {
        name: 'Consigliato',
        value: '1.525,85 €',
        text: 'Nel caso dimostrativo applica il margine selezionato del 20%.',
      },
      {
        name: 'Ideale',
        value: 'Target superiore',
        text: 'Mantiene visibile un terzo scenario da confrontare durante la trattativa.',
      },
    ],
    pdfEyebrow: 'Preventivo PDF',
    pdfHeading: 'Condivisibile. Professionale. Non vincolante.',
    pdfBody:
      'Esporta un riepilogo della tratta da inviare al cliente. Il dettaglio costi è opzionale; con Pro puoi aggiungere il logo aziendale.',
    pdfFacts: ['Dettaglio costi opzionale', 'Logo aziendale con Pro', 'Documento non vincolante'],
    archiveEyebrow: 'Archivio locale',
    archiveHeading: 'La tratta resta sul dispositivo.',
    archiveBody:
      'Salva i calcoli in locale, riaprili e genera di nuovo il PDF quando serve. Nessun account da creare.',
    pricingEyebrow: '04 — Free e Pro',
    pricingHeading: 'Inizia con tre calcoli. Passa a Pro quando il lavoro cresce.',
    pricingBody:
      'La versione Free include tre calcoli. Pro sblocca calcoli illimitati e il logo aziendale nei preventivi PDF.',
    freeLabel: 'Free',
    freeValue: '3 calcoli',
    freeText: 'Per verificare il metodo con i tuoi dati.',
    proLabel: 'Pro',
    proValue: 'Calcoli illimitati',
    proText: 'Include il logo aziendale nei PDF.',
    audienceEyebrow: '05 — Per chi',
    resourcesEyebrow: 'Metodo aperto',
    resourcesHeading: 'Guide operative e calcolatori gratuiti.',
    resourcesBody:
      'Approfondisci ogni voce del costo o verifica una singola ipotesi prima di aprire l’app.',
    supportEyebrow: 'Supporto',
    downloadEyebrow: 'RouteBudget EU',
    downloadTrust: 'Gratis su App Store e Google Play · Acquisti in-app',
    imageAlts: {
      home: 'Schermata iniziale reale di RouteBudget EU su Android',
      costs: 'Dettaglio reale dei costi di una tratta in RouteBudget EU',
      scenarios: 'Scenari Minimo, Consigliato e Ideale nell’app RouteBudget EU',
      archive: 'Archivio locale reale di RouteBudget EU su Android',
    },
  },
  en: {
    methodEyebrow: '01 — Method',
    methodKicker: 'One demonstration route, rebuilt line by line.',
    equation: 'Operating cost + margin = recommended price',
    metrics: {
      cost: 'Operating cost',
      recommended: 'Recommended price',
      profit: 'Profit',
      margin: 'Margin',
      distance: 'Distance',
    },
    values: {
      cost: '€1,220.68',
      recommended: '€1,525.85',
      profit: '€305.17',
      margin: '20%',
      distance: '870 km',
    },
    compositionLabel: 'Cost composition',
    compositionNote: 'Demonstration values: results change with the data entered.',
    productEyebrow: '02 — Product',
    productProof: 'Real Android app screens',
    functionsEyebrow: '03 — Functions',
    functionsHeading: 'From result to a quote you can share.',
    functionsBody:
      'The calculation stays legible at every step: price scenarios, PDF and local Archive all follow the same route.',
    scenariosLabel: 'Three scenarios, one cost base',
    scenarios: [
      {
        name: 'Minimum',
        value: 'Break-even',
        text: 'Shows the point where the quote covers the calculated operating cost.',
      },
      {
        name: 'Recommended',
        value: '€1,525.85',
        text: 'In this demonstration, it applies the selected 20% margin.',
      },
      {
        name: 'Ideal',
        value: 'Higher target',
        text: 'Keeps a third scenario visible for comparison during negotiation.',
      },
    ],
    pdfEyebrow: 'PDF quote',
    pdfHeading: 'Shareable. Professional. Non-binding.',
    pdfBody:
      'Export a route summary to send to the customer. Cost detail is optional; Pro lets you add your company logo.',
    pdfFacts: ['Optional cost detail', 'Company logo with Pro', 'Non-binding document'],
    archiveEyebrow: 'Local Archive',
    archiveHeading: 'The route stays on your device.',
    archiveBody:
      'Save calculations locally, reopen them and create the PDF again when needed. No account to create.',
    pricingEyebrow: '04 — Free and Pro',
    pricingHeading: 'Start with three calculations. Move to Pro when the work grows.',
    pricingBody:
      'Free includes three calculations. Pro unlocks unlimited calculations and your company logo on PDF quotes.',
    freeLabel: 'Free',
    freeValue: '3 calculations',
    freeText: 'Use your own data to verify the method.',
    proLabel: 'Pro',
    proValue: 'Unlimited calculations',
    proText: 'Includes your company logo on PDFs.',
    audienceEyebrow: '05 — For whom',
    resourcesEyebrow: 'Open method',
    resourcesHeading: 'Operating guides and free calculators.',
    resourcesBody:
      'Explore each cost line or check one assumption before opening the app.',
    supportEyebrow: 'Support',
    downloadEyebrow: 'RouteBudget EU',
    downloadTrust: 'Free on the App Store and Google Play · In-App Purchases',
    imageAlts: {
      home: 'Real RouteBudget EU home screen on Android',
      costs: 'Real route cost detail in RouteBudget EU',
      scenarios: 'Minimum, Recommended and Ideal scenarios in RouteBudget EU',
      archive: 'Real local RouteBudget EU Archive on Android',
    },
  },
} satisfies Record<Locale, object>;

type ProductContinuationProps = {
  copy: SiteCopy;
  locale: Locale;
};

export function ProductContinuation({ copy, locale }: ProductContinuationProps) {
  const text = editorial[locale];
  const badges = STORE_BADGES[locale];

  return (
    <div className="continuation-root">
      <section
        className="continuation-section continuation-method"
        id="metodo"
        aria-labelledby="continuation-method-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.methodEyebrow}</p>
              <h2 id="continuation-method-title">{copy.equation.heading}</h2>
            </div>
            <div className="continuation-intro-copy">
              <p className="continuation-lead">{copy.equation.body}</p>
              <p className="continuation-note">{text.methodKicker}</p>
            </div>
          </header>

          <div className="continuation-calculation">
            <div className="continuation-calculation-summary">
              <p className="continuation-label">{copy.equation.exampleLabel}</p>
              <dl className="continuation-metrics">
                <div className="continuation-metric continuation-metric--primary">
                  <dt>{text.metrics.cost}</dt>
                  <dd>{text.values.cost}</dd>
                </div>
                <div className="continuation-metric continuation-metric--accent">
                  <dt>{text.metrics.recommended}</dt>
                  <dd>{text.values.recommended}</dd>
                </div>
                <div className="continuation-metric">
                  <dt>{text.metrics.profit}</dt>
                  <dd>{text.values.profit}</dd>
                </div>
                <div className="continuation-metric">
                  <dt>{text.metrics.margin}</dt>
                  <dd>{text.values.margin}</dd>
                </div>
                <div className="continuation-metric">
                  <dt>{text.metrics.distance}</dt>
                  <dd>{text.values.distance}</dd>
                </div>
              </dl>
              <p className="continuation-equation">{text.equation}</p>
            </div>

            <div className="continuation-cost-composition">
              <p className="continuation-label">{text.compositionLabel}</p>
              <ol className="continuation-cost-list">
                {copy.equation.items.map((item, index) => (
                  <li className="continuation-cost-item" key={item.label}>
                    <span className="continuation-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="continuation-cost-copy">
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </div>
                    <span className="continuation-cost-value">{item.value}</span>
                  </li>
                ))}
              </ol>
              <p className="continuation-note">{text.compositionNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="continuation-section continuation-product"
        id="prodotto"
        aria-labelledby="continuation-product-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.productEyebrow}</p>
              <h2 id="continuation-product-title">{copy.showcase.heading}</h2>
            </div>
            <div className="continuation-intro-copy">
              <p className="continuation-lead">{copy.showcase.body}</p>
              <p className="continuation-proof">
                <Check aria-hidden="true" size={16} />
                {text.productProof}
              </p>
            </div>
          </header>

          <div className="continuation-screen-story">
            <figure className="continuation-screen continuation-screen--lead">
              <div className="continuation-screen-media">
                <img src={appScenarios} alt={text.imageAlts.scenarios} loading="lazy" />
              </div>
              <figcaption>
                <span>01</span>
                <strong>{copy.showcase.screens[2]}</strong>
                <p>{copy.showcase.captions[2]}</p>
              </figcaption>
            </figure>
            <figure className="continuation-screen">
              <div className="continuation-screen-media">
                <img src={appCosts} alt={text.imageAlts.costs} loading="lazy" />
              </div>
              <figcaption>
                <span>02</span>
                <strong>{copy.showcase.screens[1]}</strong>
                <p>{copy.showcase.captions[1]}</p>
              </figcaption>
            </figure>
            <figure className="continuation-screen">
              <div className="continuation-screen-media">
                <img src={appArchive} alt={text.imageAlts.archive} loading="lazy" />
              </div>
              <figcaption>
                <span>03</span>
                <strong>{copy.showcase.screens[3]}</strong>
                <p>{copy.showcase.captions[3]}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section
        className="continuation-section continuation-functions"
        id="funzioni"
        aria-labelledby="continuation-functions-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.functionsEyebrow}</p>
              <h2 id="continuation-functions-title">{text.functionsHeading}</h2>
            </div>
            <p className="continuation-lead">{text.functionsBody}</p>
          </header>

          <div className="continuation-scenarios">
            <p className="continuation-label">{text.scenariosLabel}</p>
            <ol className="continuation-scenario-list">
              {text.scenarios.map((scenario, index) => (
                <li className="continuation-scenario" key={scenario.name}>
                  <span className="continuation-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="continuation-scenario-heading">
                    <strong>{scenario.name}</strong>
                    <span>{scenario.value}</span>
                  </div>
                  <p>{scenario.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="continuation-feature-row continuation-feature-row--pdf">
            <div className="continuation-feature-copy">
              <FileText aria-hidden="true" size={28} strokeWidth={1.5} />
              <p className="continuation-eyebrow">{text.pdfEyebrow}</p>
              <h3>{text.pdfHeading}</h3>
              <p>{text.pdfBody}</p>
              <ul className="continuation-fact-list">
                {text.pdfFacts.map((fact) => (
                  <li key={fact}>
                    <Check aria-hidden="true" size={15} />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="continuation-feature-figure">
              <img src={appCosts} alt={text.imageAlts.costs} loading="lazy" />
            </figure>
          </div>

          <div className="continuation-feature-row continuation-feature-row--archive">
            <figure className="continuation-feature-figure">
              <img src={appArchive} alt={text.imageAlts.archive} loading="lazy" />
            </figure>
            <div className="continuation-feature-copy">
              <FolderClock aria-hidden="true" size={28} strokeWidth={1.5} />
              <p className="continuation-eyebrow">{text.archiveEyebrow}</p>
              <h3>{text.archiveHeading}</h3>
              <p>{text.archiveBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="continuation-section continuation-pricing"
        id="prezzi"
        aria-labelledby="continuation-pricing-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.pricingEyebrow}</p>
              <h2 id="continuation-pricing-title">{text.pricingHeading}</h2>
            </div>
            <p className="continuation-lead">{text.pricingBody}</p>
          </header>

          <dl className="continuation-plan-list">
            <div className="continuation-plan">
              <dt>{text.freeLabel}</dt>
              <dd>
                <strong>{text.freeValue}</strong>
                <span>{text.freeText}</span>
              </dd>
              <a href="#scarica">
                {copy.closing.appStoreCta}
                <ArrowDown aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="continuation-plan continuation-plan--pro">
              <dt>{text.proLabel}</dt>
              <dd>
                <strong>{text.proValue}</strong>
                <span>{text.proText}</span>
              </dd>
              <a href="#scarica">
                {copy.closing.appStoreCta}
                <ArrowDown aria-hidden="true" size={17} />
              </a>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="continuation-section continuation-audience"
        id="per-chi"
        aria-labelledby="continuation-audience-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.audienceEyebrow}</p>
              <h2 id="continuation-audience-title">{copy.audience.heading}</h2>
            </div>
            <p className="continuation-lead">{copy.audience.body}</p>
          </header>

          <ol className="continuation-audience-list">
            {copy.audience.items.map((item, index) => (
              <li className="continuation-audience-item" key={item.title}>
                <span className="continuation-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="continuation-section continuation-resources"
        aria-labelledby="continuation-resources-title"
      >
        <div className="continuation-wrap">
          <header className="continuation-section-header continuation-section-header--split">
            <div className="continuation-heading-group">
              <p className="continuation-eyebrow">{text.resourcesEyebrow}</p>
              <h2 id="continuation-resources-title">{text.resourcesHeading}</h2>
            </div>
            <p className="continuation-lead">{text.resourcesBody}</p>
          </header>

          <ol className="continuation-resource-list">
            {copy.resources.items.map((item, index) => (
              <li className="continuation-resource" key={item.href}>
                <span className="continuation-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="continuation-resource-copy">
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
          </ol>

          <a className="continuation-resource-hub" href="/it/guide/">
            {copy.resources.hubAction}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <section
        className="continuation-section continuation-support"
        id="supporto"
        aria-labelledby="continuation-support-title"
      >
        <div className="continuation-wrap continuation-support-layout">
          <header className="continuation-support-intro">
            <p className="continuation-eyebrow">{text.supportEyebrow}</p>
            <h2 id="continuation-support-title">{copy.support.heading}</h2>
            <p>{copy.support.body}</p>
            <a href={SUPPORT_EMAIL}>
              {copy.support.emailCta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </header>

          <div className="continuation-faq-list">
            {copy.support.faqs.map((faq) => (
              <details className="continuation-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="continuation-section continuation-download"
        id="scarica"
        aria-labelledby="continuation-download-title"
      >
        <div className="continuation-wrap continuation-download-layout">
          <div className="continuation-download-copy">
            <p className="continuation-eyebrow">{text.downloadEyebrow}</p>
            <h2 id="continuation-download-title">{copy.closing.heading}</h2>
            <p>{copy.closing.body}</p>
          </div>

          <div className="continuation-download-actions">
            <a aria-label={badges.appStoreAlt} href={APP_STORE_URL} target="_blank" rel="noreferrer">
              <img alt={badges.appStoreAlt} height="40" src={badges.appStore} width="120" />
            </a>
            <a aria-label={badges.googlePlayAlt} href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
              <img alt={badges.googlePlayAlt} height="50" src={badges.googlePlay} width="129" />
            </a>
            <small>{text.downloadTrust}</small>
          </div>
        </div>
      </section>

      <footer className="continuation-footer">
        <div className="continuation-wrap continuation-footer__layout">
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
