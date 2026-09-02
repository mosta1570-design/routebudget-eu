# RouteBudget EU — GSC recovery audit

Data audit: 2 settembre 2026. Proprietà: `sc-domain:routebudget.eu`. Tipo ricerca: Web.

## Diagnosi

Il calo è una rivalutazione algoritmica site-wide sincronizzata con l’August 2026 spam update, non un guasto tecnico di sitemap e non una manual action.

| Confronto | 19 ago–1 set | 5–18 ago | Variazione |
|---|---:|---:|---:|
| Click | 1 | 19 | −94,7% |
| Impression | 105 | 1.570 | −93,3% |
| CTR | 1,0% | 1,2% | −0,2 punti |
| Posizione media | 27,7 | 14,6 | −13,1 posizioni |

La perdita inizia il 19 agosto. Google dichiara l’August 2026 spam update dal 18 agosto per 2 giorni e 16 ore. Query indipendenti — consumo camion, costo trasporto, calcolatori e pedaggi — perdono impression nello stesso intervallo.

## Cause escluse

- Manual Actions: nessun problema rilevato.
- Security Issues: nessun problema rilevato.
- Sitemap correnti: `Success`; root 65 URL prima di questo rilascio, articoli 53, calcolatori 6, core 4, legal 2.
- URL campione: crawl consentito, fetch riuscito, canonical scelto uguale al dichiarato.
- Build locale: zero link rotti, zero orfani, schema/canonical/hreflang/robots coerenti.

## Debolezze confermate

1. Dominio giovane con molte URL pubblicate in pochi giorni prima del calo.
2. Report Links GSC: 0 link esterni rilevati; fiducia esterna quasi assente.
3. Ridistribuzione ranking ampia: la posizione peggiora insieme alla copertura query.
4. Cinque URL nel report non indicizzate al 28 agosto; il report precede alcuni crawl del 31 agosto.
5. Segnali interni GSC ancora concentrati su poche URL e privacy; report può essere in ritardo, ma richiede percorsi contestuali più espliciti.

## Azioni di questo rilascio

- Tre owner di intento italiani nuovi, verificati con Google Suggest IT: assicurazione camion, leasing camion, consumo AdBlue camion.
- Ogni pagina contiene metodo originale, esempio ricalcolabile, limiti del prodotto e fonti primarie.
- Link contestuali bidirezionali dai pilastri e dai calcolatori, oltre a guide hub e related graph.
- Nessuna pagina fiscale opportunistica sul credito gasolio 2026: domanda reale ma fuori prodotto e ad alta volatilità.
- Nessuna modifica radicale alle URL già indicizzate; canonical preservati.

## Interpretazione corretta del risultato

Pubblicare, inviare sitemap o richiedere indicizzazione non ripristina ranking in modo immediato. Google indica che una rivalutazione site-wide può richiedere settimane o mesi. Misura dopo crawl usando finestre complete, non il dato parziale del giorno.
