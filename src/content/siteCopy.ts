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
    fieldNote: string;
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
    titleLead: 'Il costo stimato.',
    titleFocus: 'Prima di accettare la tratta.',
    body:
      'Per camion e furgoni N1, RouteBudget riunisce carburante o energia, pedaggi, tempo, usura e margine. Vedi quanto costa il viaggio e quale prezzo proporre.',
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
    heading: 'Ogni costo supportato entra nel prezzo.',
    body:
      'Un viaggio può sembrare redditizio finché non aggiungi tempo, pedaggi e chilometri a vuoto. RouteBudget ricompone le voci supportate prima della decisione e rende visibili i limiti della stima.',
    fieldNote:
      'Nota dalla ricerca sul campo: attese, carico, scarico e costi fissi continuano anche quando il mezzo non percorre chilometri. RouteBudget valorizza le voci oggi supportate; tempi o quote aziendali non modellati restano un controllo esterno da documentare, senza doppio conteggio.',
    exampleLabel: 'Esempio di calcolo',
    items: [
      { label: 'Carburante', value: '495,55 €', detail: 'Consumo e prezzo inseriti' },
      { label: 'Pedaggi', value: '295,80 €', detail: 'Stima sostituibile con il totale verificato' },
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
      { title: 'Inserisci', text: 'Tratta, camion o furgone N1, energia, costo autista e margine.' },
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
        kind: 'Guida PDF',
        title: 'Preventivo trasporto PDF',
        text: 'Controlla campi presenti, limiti del template e dati da gestire fuori dall’app prima dell’invio.',
        action: 'Controlla il PDF',
        href: '/it/guide/preventivo-trasporto-pdf/',
      },
      {
        kind: 'Metodo Excel',
        title: 'Costi trasporto camion in Excel',
        text: 'Struttura input, date e controlli del foglio; poi porta la singola tratta verso scenari e PDF.',
        action: 'Organizza il foglio',
        href: '/it/guide/calcolo-costi-trasporto-camion-excel/',
      },
      {
        kind: 'Input carburante Italia',
        title: 'Prezzo gasolio nel preventivo',
        text: 'Scegli tra fattura aziendale, dato MIMIT corrente e riferimento mensile senza mescolare periodi o imposte.',
        action: 'Scegli il dato',
        href: '/it/guide/prezzo-gasolio-autotrasporto-preventivo/',
      },
      {
        kind: 'Corridoio italiano 2026',
        title: 'Pedaggio camion A22',
        text: 'Verifica classe, caselli e importo Autobrennero prima di trasferire il costo nella tratta.',
        action: 'Prepara la A22',
        href: '/it/guide/pedaggio-a22-camion-2026/',
      },
      {
        kind: 'Decisione del padroncino',
        title: 'Quanto guadagna davvero un padroncino',
        text: 'Separa fatturato, costi fissi, tempo impegnato, ritorno a vuoto e utile reale prima di valutare una tratta.',
        action: 'Controlla il margine',
        href: '/it/guide/guadagno-padroncino-camion/',
      },
      {
        kind: 'Mercato spot',
        title: 'Trasporto spot: quando il prezzo regge',
        text: 'Confronta offerta urgente, chilometri completi, attese e rientro prima di accettare un viaggio una tantum.',
        action: 'Valuta la tratta spot',
        href: '/it/guide/trasporto-spot-significato/',
      },
      {
        kind: 'Furgone N1',
        title: 'Furgone elettrico: convenienza reale',
        text: 'Confronta energia, ricarica, percorrenza, carico utile e costo operativo senza fermarti al prezzo del kWh.',
        action: 'Confronta gli scenari',
        href: '/it/guide/conviene-comprare-furgone-elettrico/',
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
          'Per i mezzi pesanti RouteBudget usa una stima operativa basata su distanza, assi e massa, non una tariffa ufficiale di ogni strada. Per i profili N1 applica regole per Paese quando disponibili e può richiedere il totale manuale. Verifica sempre l’importo ufficiale e sostituisci la stima quando serve.',
      },
      {
        question: 'Posso calcolare una tratta con un furgone N1?',
        answer:
          'Sì. Il profilo N1 distingue alimentazione diesel, benzina, GPL, metano o elettrica, dati di massa e rimorchio. Consumi, prezzi, pedaggi e condizioni della missione restano input da verificare.',
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
      'For trucks and N1 vans, RouteBudget brings fuel or energy, tolls, time, wear and margin into one calculation. See what the trip costs and what price to quote.',
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
    heading: 'Every supported cost belongs in the price.',
    body:
      'A trip can look profitable until you add time, tolls and the empty return. RouteBudget rebuilds supported cost lines before the decision and keeps estimate limits visible.',
    fieldNote:
      'Field-research note: waiting, loading, unloading and fixed costs continue even when the vehicle is not moving. RouteBudget values the inputs it currently supports; unmodelled time or company overhead remains a documented external check, without double counting.',
    exampleLabel: 'Calculation example',
    items: [
      { label: 'Fuel', value: '€495.55', detail: 'Entered use and price' },
      { label: 'Tolls', value: '€295.80', detail: 'Estimate replaceable with a verified total' },
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
      { title: 'Enter', text: 'Route, truck or N1 van, energy, driver cost and margin.' },
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
        kind: 'PDF guide · Italian',
        title: 'Transport quote PDF',
        text: 'Check which fields the template includes and which commercial details stay outside the app.',
        action: 'Read in Italian',
        href: '/it/guide/preventivo-trasporto-pdf/',
      },
      {
        kind: 'Excel workflow · Italian',
        title: 'Truck transport costs in Excel',
        text: 'Structure inputs, dates and checks, then move the supported single-route estimate to scenarios and PDF.',
        action: 'Read in Italian',
        href: '/it/guide/calcolo-costi-trasporto-camion-excel/',
      },
      {
        kind: 'Italian fuel input',
        title: 'Diesel price for a transport quote',
        text: 'Choose a fleet invoice, current MIMIT value or monthly benchmark without mixing dates or tax treatments.',
        action: 'Read in Italian',
        href: '/it/guide/prezzo-gasolio-autotrasporto-preventivo/',
      },
      {
        kind: 'Italian corridor 2026',
        title: 'A22 truck toll',
        text: 'Verify class, entry and exit toll booths and Autobrennero amount before adding it to the route.',
        action: 'Read in Italian',
        href: '/it/guide/pedaggio-a22-camion-2026/',
      },
      {
        kind: 'Owner-operator decision · Italian',
        title: 'What an owner-operator really earns',
        text: 'Separate revenue, fixed costs, committed time, empty return and real profit before judging a route.',
        action: 'Read in Italian',
        href: '/it/guide/guadagno-padroncino-camion/',
      },
      {
        kind: 'Spot market · Italian',
        title: 'Spot transport: when the price works',
        text: 'Compare an urgent offer with full kilometres, waiting time and return conditions before accepting it.',
        action: 'Read in Italian',
        href: '/it/guide/trasporto-spot-significato/',
      },
      {
        kind: 'N1 van · Italian',
        title: 'Electric van: real-world economics',
        text: 'Compare energy, charging, mileage, payload and operating cost instead of stopping at the price per kWh.',
        action: 'Read in Italian',
        href: '/it/guide/conviene-comprare-furgone-elettrico/',
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
          'For heavy vehicles RouteBudget uses an operational estimate based on entered distance, axles and mass, not an official tariff for every road. N1 profiles use country rules where available and may require a manual total. Always verify the official amount and replace the estimate when needed.',
      },
      {
        question: 'Can I calculate a route for an N1 van?',
        answer:
          'Yes. The N1 profile distinguishes diesel, petrol, LPG, CNG or electric power, mass and trailer data. Consumption, prices, tolls and mission conditions remain inputs you must verify.',
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
