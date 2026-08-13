# RouteBudget EU — Template articolo SEO

Template operativo per una pagina in `content/it/<sezione>/<slug>/`. Non pubblicare valori tra `<...>`.

## 1. `meta.json`

```json
{
  "slug": "<slug-minuscolo>",
  "kind": "guide",
  "locale": "it",
  "status": "drafting",
  "title": "<H1 unico, massimo 75 caratteri>",
  "mobileH1": "<opzionale, 10–75 caratteri>",
  "description": "<sintesi specifica, 70–180 caratteri>",
  "eyebrow": "<contesto breve>",
  "published": "<YYYY-MM-DD della prima pubblicazione reale>",
  "modified": "<YYYY-MM-DD dell'ultima modifica sostanziale>",
  "reviewed": "<YYYY-MM-DD dell'ultima review fattuale>",
  "author": "Eng. Mostafa",
  "reviewer": "Eng. Mostafa",
  "primaryKeyword": "<query proprietaria dell'intento>",
  "secondaryKeywords": [
    "<variante 1>",
    "<variante 2>"
  ],
  "searchIntent": "informational",
  "cluster": "<cluster-approvato>",
  "topics": [
    "<tema vicino 1>",
    "<tema vicino 2>"
  ],
  "related": [
    "guide:<slug-correlato>",
    "calcolatori:<slug-calcolatore>"
  ],
  "relatedCalculator": "calcolatori:<slug-calcolatore>",
  "pillar": "guide:<slug-pillar>",
  "calculatorId": null,
  "conversionIntent": "complete-trip",
  "appFeature": "complete-route-calculation",
  "translationGroup": "<identità-stabile-non-localizzata>",
  "canonical": "/it/guide/<slug-minuscolo>/",
  "ogImage": "/og-cover.jpg",
  "noindex": true,
  "sources": [
    {
      "label": "<Ente — titolo fonte>",
      "url": "https://<url-ufficiale>"
    }
  ],
  "changeSummary": "<cosa cambia e perché>"
}
```

Valori `kind`: `pillar`, `guide`, `calculator`, `comparison`. Pillar usa `pillar: null`. Calcolatori usano sezione `calcolatori`, `kind: "calculator"` e `calculatorId: "cost-per-km"`, `"fuel-trip"` o `"fuel-surcharge"`. Intenti CTA attualmente validi: `complete-trip`, `pdf-quote`, `add-trip-costs`, `protect-margin`, `unlimited`.

`published` non è data bozza/build. `modified` cambia solo con modifica visibile sostanziale. `reviewed` richiede controllo reale. Una bozza usa `status: "drafting"` e `noindex: true`; una pagina pubblicata usa `status: "published"` e `noindex: false`. `relatedCalculator` deve comparire anche in `related`. I dati completi delle fonti possono essere registrati una volta in `content/sources.json` e completati durante il build.

## 2. `body.md`

```markdown
<Risposta diretta in 2–4 frasi. Definire risultato, pubblico e limite principale.>

> Stima operativa: <spiegare perché valori e risultato non sono tariffa ufficiale né preventivo vincolante.>

## Cosa serve per <compito>

<Elenco input, unità, provenienza e cosa non va confuso.>

- **<Input 1>:** <definizione e unità>
- **<Input 2>:** <definizione e unità>
- **<Input 3>:** <definizione e unità>

## Metodo di calcolo

<Formula leggibile. Definire ogni variabile, inclusioni, esclusioni e arrotondamento.>

```text
<formula>
```

## Esempio illustrativo

<Dichiarare che numeri sono ipotesi modificabili, non medie di mercato.>

| Voce | Ipotesi | Calcolo | Risultato |
| --- | ---: | ---: | ---: |
| <voce> | <valore e unità> | <operazione> | <stima> |

## Come leggere il risultato

<Spiegare decisione supportata, limiti e controlli prima di usarlo.>

## Costi o rischi spesso esclusi

- <voce e motivo>
- <voce e motivo>
- <voce e motivo>

## Errori da evitare

### <Errore concreto>

<Conseguenza e correzione.>

### <Errore concreto>

<Conseguenza e correzione.>

## Checklist operativa

- [ ] <controllo>
- [ ] <controllo>
- [ ] <controllo>

## Approfondimenti utili

<Link contestuale al pillar, 2–5 pagine correlate e calcolatore pertinente con anchor descrittivi.>

## Fonti e metodo

<Spiegare quali fonti supportano quali affermazioni, geografia e data di consultazione. Evitare lunghe citazioni.>
```

Il file inizia con testo o `##`, mai con `#`: H1 arriva da `title`. Raw HTML vietato. Corpo deve superare validatore di utilità, ma lunghezza non è obiettivo editoriale.

## 3. Blocco interno di supporto — non pubblicare

```text
Content ID:
Stato:
Intent owner:
Persona/lettore:
SERP verificata il:
Autore reale:
Revisore fatti/data:
Revisore prodotto/data:
Revisore SEO/data:
Revisore design/data:
Fatti volatili e trigger:
Claim RouteBudget verificati contro:
Link in ingresso pianificati:
Build SHA:
seo:all:
```

## 4. Gate prima di `approved`

- [ ] nessun placeholder;
- [ ] risposta originale e utile, non riscrittura della SERP;
- [ ] formule/unità/esempio ricalcolati;
- [ ] fonti primarie registrate e vive;
- [ ] variabilità e geografia dichiarate;
- [ ] claim RouteBudget verificati, nessuna funzione Android inesistente;
- [ ] primary keyword non appartiene a un'altra URL;
- [ ] title, description e H1 unici;
- [ ] pillar e related validi, 2–5 link contestuali;
- [ ] CTA store reale e non intrusiva;
- [ ] mobile, tabelle, focus e contrasto verificati;
- [ ] schema corrisponde al contenuto visibile;
- [ ] build e `npm run seo:all` passano;
- [ ] pubblicazione/deploy approvati separatamente.
