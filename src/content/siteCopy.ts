export type Locale = 'it' | 'en';

type NavItem = {
  label: string;
  href: string;
};

type EquationItem = {
  label: string;
  value: string;
  detail: string;
};

type FlowItem = {
  title: string;
  text: string;
};

type AudienceItem = {
  title: string;
  text: string;
};

type ResourceItem = {
  kind: string;
  title: string;
  text: string;
  action: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type SiteCopy = {
  skipLabel: string;
  menuLabel: string;
  closeLabel: string;
  languageLabel: string;
  navigationLabel: string;
  nav: NavItem[];
  hero: {
    context: string;
    titleLead: string;
    titleFocus: string;
    body: string;
    appStoreCta: string;
    methodCta: string;
    availability: string;
    androidStatus: string;
    trust: string[];
    decisionLabel: string;
    decisionValue: string;
    decisionMeta: string;
  };
  equation: {
    heading: string;
    body: string;
    exampleLabel: string;
    items: EquationItem[];
    resultLabel: string;
    resultValue: string;
    resultNote: string;
  };
  showcase: {
    heading: string;
    body: string;
    screens: string[];
    captions: string[];
  };
  flow: {
    heading: string;
    body: string;
    items: FlowItem[];
  };
  audience: {
    heading: string;
    body: string;
    items: AudienceItem[];
  };
  resources: {
    eyebrow: string;
    heading: string;
    body: string;
    items: ResourceItem[];
    hubAction: string;
  };
  support: {
    heading: string;
    body: string;
    emailCta: string;
    faqs: FaqItem[];
  };
  closing: {
    heading: string;
    body: string;
    appStoreCta: string;
    googlePlayCta: string;
    availability: string;
  };
  footer: {
    guides: string;
    calculators: string;
    support: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
};

const italian: SiteCopy = {
  skipLabel: 'Vai al contenuto',
  menuLabel: 'Apri il menu',
  closeLabel: 'Chiudi il menu',
  languageLabel: 'Lingua del sito',
  navigationLabel: 'Navigazione principale',
  nav: [
    { label: 'Il metodo', href: '#metodo' },
    { label: 'Il prodotto', href: '#prodotto' },
    { label: 'Guide', href: '/it/guide/' },
    { label: 'Per chi', href: '#per-chi' },
    { label: 'Supporto', href: '#supporto' },
  ],
  hero: {
    context: 'Controllo economico per ogni tratta',
    titleLead: 'Il costo reale.',
    titleFocus: 'Prima di accettare la tratta.',
    body:
      'RouteBudget mette nello stesso calcolo carburante, pedaggi, ore di guida, usura e margine. Vedi quanto costa il viaggio e quale prezzo proporre.',
    appStoreCta: 'Scarica su App Store',
    methodCta: 'Guarda come funziona',
    availability: 'Disponibile per iPhone e Android',
    androidStatus: 'Scarica su Google Play',
    trust: ['Nessun account', 'Dati principali sul dispositivo', '7 lingue'],
    decisionLabel: 'Prezzo consigliato',
    decisionValue: '1.525,85 €',
    decisionMeta: 'Esempio: 870 km · margine 20%',
  },
  equation: {
    heading: 'Ogni costo entra nel prezzo.',
    body:
      'Un viaggio può sembrare redditizio finché non aggiungi tempo, pedaggi e chilometri a vuoto. RouteBudget ricompone il conto prima della decisione.',
    exampleLabel: 'Esempio di calcolo',
    items: [
      { label: 'Carburante', value: '495,55 €', detail: 'Consumo e prezzo inseriti' },
      { label: 'Pedaggi', value: '295,80 €', detail: 'Stima per mezzo e assi' },
      { label: 'Autista', value: '298,83 €', detail: 'Durata operativa e pause' },
      { label: 'Usura', value: '130,50 €', detail: 'Costo per chilometro' },
    ],
    resultLabel: 'Costo operativo',
    resultValue: '1.220,68 €',
    resultNote: 'Valori dimostrativi tratti da un calcolo reale nell’app.',
  },
  showcase: {
    heading: 'Una decisione, non un foglio di calcolo.',
    body:
      'Dalla tratta al preventivo, ogni schermata mantiene visibili costo, margine e prezzo scelto. Le immagini mostrano l’app reale su Android.',
    screens: ['Panoramica', 'Dettaglio costi', 'Scenari di prezzo', 'Archivio locale'],
    captions: [
      'Capisci subito se il prezzo protegge il margine.',
      'Carburante, pedaggi, autista e usura restano leggibili.',
      'Confronta Minimo, Consigliato e Ideale.',
      'Riapri un calcolo e genera il PDF quando serve.',
    ],
  },
  flow: {
    heading: 'Dal telefono al cliente, senza perdere il filo.',
    body:
      'RouteBudget segue il lavoro che fai davvero: raccogli i dati, confronti gli scenari, prepari il preventivo e conservi la tratta.',
    items: [
      { title: 'Inserisci', text: 'Tratta, mezzo, carburante, costo autista e margine.' },
      { title: 'Confronta', text: 'Minimo, Consigliato e Ideale con pareggio e utile per km.' },
      { title: 'Esporta', text: 'Un preventivo PDF professionale, con dettaglio costi opzionale.' },
      { title: 'Archivia', text: 'Calcoli salvati in locale, pronti da riaprire e aggiornare.' },
    ],
  },
  audience: {
    heading: 'Pensato per chi guida e per chi decide.',
    body:
      'Un unico linguaggio economico per la cabina, il telefono con il cliente e il piccolo ufficio operativo.',
    items: [
      {
        title: 'Autista',
        text: 'Vedi cosa pesa davvero sul viaggio prima di partire o accettare un prezzo.',
      },
      {
        title: 'Padroncino',
        text: 'Proteggi il margine con costi operativi, ritorno a vuoto e scenari confrontabili.',
      },
      {
        title: 'Piccola impresa',
        text: 'Condividi preventivi più chiari e conserva uno storico locale delle tratte.',
      },
    ],
  },
  resources: {
    eyebrow: 'Metodo aperto · strumenti gratuiti',
    heading: 'Capisci il costo. Poi completa la tratta.',
    body:
      'Guide italiane e calcolatori trasparenti per verificare le ipotesi prima di aprire l’app. Contenuti operativi, senza numeri magici né promesse di margine.',
    items: [
      {
        kind: 'Guida pilastro',
        title: 'Calcolo del costo di trasporto',
        text: 'Un metodo completo per riunire carburante, pedaggi, autista, usura, ritorno a vuoto e margine.',
        action: 'Leggi il metodo',
        href: '/it/guide/calcolo-costo-trasporto/',
      },
      {
        kind: 'Calcolatore',
        title: 'Costo chilometrico camion',
        text: 'Stima il costo operativo per km con i tuoi dati annuali e variabili.',
        action: 'Apri il calcolatore',
        href: '/it/calcolatori/costo-chilometrico-camion/',
      },
      {
        kind: 'Calcolatore',
        title: 'Carburante del viaggio',
        text: 'Calcola litri e costo di andata e ritorno a vuoto, senza inviare dati.',
        action: 'Apri il calcolatore',
        href: '/it/calcolatori/costo-carburante-viaggio/',
      },
      {
        kind: 'Guida decisionale',
        title: 'Tariffe per trazionisti',
        text: 'Controlla se l’offerta di subvezione copre km reali, vuoto, pedaggi, ore, attese e costi fissi.',
        action: 'Valuta l’offerta',
        href: '/it/guide/tariffe-trazionisti/',
      },
      {
        kind: 'Guida internazionale',
        title: 'Pedaggio camion in Svizzera',
        text: 'Calcola TTPCP con km, peso e classe emissioni; prepara NMTS prima del confine.',
        action: 'Prepara la TTPCP',
        href: '/it/guide/pedaggio-camion-svizzera/',
      },
      {
        kind: 'Guida Germania 2026',
        title: 'Pedaggio LKW-Maut',
        text: 'Verifica massa, assi, EURO, classe CO₂ 2026 e chilometri Toll Collect prima del prezzo.',
        action: 'Stima il pedaggio',
        href: '/it/guide/pedaggio-camion-germania/',
      },
    ],
    hubAction: 'Esplora tutte le guide operative',
  },
  support: {
    heading: 'Supporto, senza giri lunghi.',
    body:
      'Nessun account da recuperare. Per assistenza, privacy o dubbi sull’abbonamento puoi scrivere direttamente allo sviluppatore.',
    emailCta: 'Scrivi al supporto',
    faqs: [
      {
        question: 'Come viene calcolato il pedaggio?',
        answer:
          'RouteBudget usa una stima operativa per classe veicolo, numero di assi e tratta. Quando necessario, l’app indica che l’importo va verificato o inserito manualmente secondo le tariffe ufficiali.',
      },
      {
        question: 'Funziona offline?',
        answer:
          'I calcoli principali e l’Archivio locale funzionano senza internet. Ricerca della distanza reale, acquisto, ripristino e sincronizzazione dell’abbonamento richiedono una connessione.',
      },
      {
        question: 'Serve un account?',
        answer:
          'No. La versione Free include tre calcoli. Pro sblocca calcoli illimitati e il logo aziendale nei preventivi PDF.',
      },
      {
        question: 'Android include Trip Tracking o una mappa?',
        answer:
          'No. La versione Android è dedicata a calcolo, scenari di prezzo, PDF, Archivio e abbonamenti. Il Trip Tracking opzionale resta una funzione iOS.',
      },
    ],
  },
  closing: {
    heading: 'Prima di dire sì alla prossima tratta, fai i conti.',
    body:
      'RouteBudget EU trasforma costi sparsi in un prezzo che puoi spiegare, difendere e inviare.',
    appStoreCta: 'Scarica RouteBudget EU',
    googlePlayCta: 'Scarica su Google Play',
    availability: 'Gratis su App Store e Google Play · Acquisti in-app',
  },
  footer: {
    guides: 'Guide',
    calculators: 'Calcolatori',
    support: 'Supporto',
    privacy: 'Privacy',
    terms: 'Termini',
    copyright: '© 2026 RouteBudget EU · Eng. Mostafa',
  },
};

const english: SiteCopy = {
  skipLabel: 'Skip to content',
  menuLabel: 'Open menu',
  closeLabel: 'Close menu',
  languageLabel: 'Website language',
  navigationLabel: 'Primary navigation',
  nav: [
    { label: 'Method', href: '#metodo' },
    { label: 'Product', href: '#prodotto' },
    { label: 'Guides', href: '/it/guide/' },
    { label: 'For whom', href: '#per-chi' },
    { label: 'Support', href: '#supporto' },
  ],
  hero: {
    context: 'Cost control for every route',
    titleLead: 'The real cost.',
    titleFocus: 'Before you accept the route.',
    body:
      'RouteBudget puts fuel, tolls, driver time, wear and margin into one calculation. See what the trip costs and what price to quote.',
    appStoreCta: 'Download on the App Store',
    methodCta: 'See how it works',
    availability: 'Available for iPhone and Android',
    androidStatus: 'Get it on Google Play',
    trust: ['No account', 'Core data on device', '7 languages'],
    decisionLabel: 'Recommended price',
    decisionValue: '€1,525.85',
    decisionMeta: 'Example: 870 km · 20% margin',
  },
  equation: {
    heading: 'Every cost belongs in the price.',
    body:
      'A trip can look profitable until you add time, tolls and the empty return. RouteBudget rebuilds the calculation before you decide.',
    exampleLabel: 'Calculation example',
    items: [
      { label: 'Fuel', value: '€495.55', detail: 'Entered use and price' },
      { label: 'Tolls', value: '€295.80', detail: 'Estimate by vehicle and axles' },
      { label: 'Driver', value: '€298.83', detail: 'Operating time and breaks' },
      { label: 'Wear', value: '€130.50', detail: 'Cost per kilometre' },
    ],
    resultLabel: 'Operating cost',
    resultValue: '€1,220.68',
    resultNote: 'Demonstration values from a real calculation in the app.',
  },
  showcase: {
    heading: 'A decision, not a spreadsheet.',
    body:
      'From route to quote, each screen keeps cost, margin and selected price visible. Images show the real Android app.',
    screens: ['Overview', 'Cost detail', 'Price scenarios', 'Local Archive'],
    captions: [
      'See immediately whether the price protects your margin.',
      'Keep fuel, tolls, driver and wear easy to read.',
      'Compare Minimum, Recommended and Ideal.',
      'Reopen a calculation and create the PDF when needed.',
    ],
  },
  flow: {
    heading: 'From phone to customer, without losing context.',
    body:
      'RouteBudget follows the work you already do: collect inputs, compare scenarios, prepare the quote and keep the route.',
    items: [
      { title: 'Enter', text: 'Route, vehicle, fuel, driver cost and margin.' },
      { title: 'Compare', text: 'Minimum, Recommended and Ideal, with break-even and profit per km.' },
      { title: 'Export', text: 'A professional PDF quote with optional cost detail.' },
      { title: 'Archive', text: 'Calculations saved locally, ready to reopen and update.' },
    ],
  },
  audience: {
    heading: 'Built for the people who drive and decide.',
    body:
      'One economic language for the cab, the customer call and the small operations office.',
    items: [
      {
        title: 'Driver',
        text: 'See what really weighs on the trip before you leave or accept a price.',
      },
      {
        title: 'Owner-operator',
        text: 'Protect margin with operating costs, empty return and comparable scenarios.',
      },
      {
        title: 'Small transport business',
        text: 'Share clearer quotes and keep a local history of every route.',
      },
    ],
  },
  resources: {
    eyebrow: 'Open method · free tools in Italian',
    heading: 'Understand the cost. Then complete the route.',
    body:
      'Professional Italian guidance and transparent calculators help verify assumptions before opening the app. No magic numbers or margin promises.',
    items: [
      {
        kind: 'Pillar guide · Italian',
        title: 'How to calculate transport cost',
        text: 'A complete method covering fuel, tolls, driver time, wear, empty return and margin.',
        action: 'Read in Italian',
        href: '/it/guide/calcolo-costo-trasporto/',
      },
      {
        kind: 'Calculator · Italian',
        title: 'Truck cost per kilometre',
        text: 'Estimate operating cost per kilometre from your annual and variable inputs.',
        action: 'Open calculator',
        href: '/it/calcolatori/costo-chilometrico-camion/',
      },
      {
        kind: 'Calculator · Italian',
        title: 'Trip fuel cost',
        text: 'Estimate litres and cost for the outbound route and empty return, without sending data.',
        action: 'Open calculator',
        href: '/it/calcolatori/costo-carburante-viaggio/',
      },
      {
        kind: 'Decision guide · Italian',
        title: 'Traction subcontract rates',
        text: 'Check whether an offer covers real kilometres, empty return, tolls, hours, waits and fixed costs.',
        action: 'Read in Italian',
        href: '/it/guide/tariffe-trazionisti/',
      },
      {
        kind: 'International guide · Italian',
        title: 'Truck tolls in Switzerland',
        text: 'Calculate TTPCP from distance, weight and emissions, then prepare NMTS before the border.',
        action: 'Read in Italian',
        href: '/it/guide/pedaggio-camion-svizzera/',
      },
      {
        kind: 'Germany 2026 guide · Italian',
        title: 'LKW-Maut truck tolls',
        text: 'Verify weight, axles, EURO, 2026 CO₂ class and Toll Collect kilometres before pricing.',
        action: 'Read in Italian',
        href: '/it/guide/pedaggio-camion-germania/',
      },
    ],
    hubAction: 'Explore all Italian operating guides',
  },
  support: {
    heading: 'Support, without detours.',
    body:
      'No account to recover. For assistance, privacy or subscription questions, write directly to the independent developer.',
    emailCta: 'Email support',
    faqs: [
      {
        question: 'How is the toll calculated?',
        answer:
          'RouteBudget uses an operational estimate based on vehicle class, axle count and route. Where needed, the app tells you to verify or enter an amount manually using official tariffs.',
      },
      {
        question: 'Does it work offline?',
        answer:
          'Core calculations and the local Archive work without internet. Real-distance lookup, purchase, restore and subscription synchronization require a connection.',
      },
      {
        question: 'Do I need an account?',
        answer:
          'No. Free includes three calculations. Pro unlocks unlimited calculations and your company logo on PDF quotes.',
      },
      {
        question: 'Does Android include Trip tracking or a map?',
        answer:
          'No. Android focuses on calculation, pricing scenarios, PDFs, Archive and subscriptions. Optional Trip tracking remains an iOS feature.',
      },
    ],
  },
  closing: {
    heading: 'Before you say yes to the next route, run the numbers.',
    body:
      'RouteBudget EU turns scattered costs into a price you can explain, defend and send.',
    appStoreCta: 'Download RouteBudget EU',
    googlePlayCta: 'Get it on Google Play',
    availability: 'Free on the App Store and Google Play · In-App Purchases',
  },
  footer: {
    guides: 'Guides',
    calculators: 'Calculators',
    support: 'Support',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 RouteBudget EU · Eng. Mostafa',
  },
};

export const siteCopy: Record<Locale, SiteCopy> = {
  it: italian,
  en: english,
};
