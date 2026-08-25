# Diagnosi Google Search Console — 25 agosto 2026

## Verdetto

Il calo è reale. Non dipende da giorni in cui è stata richiesta indicizzazione. Search Console mostra dati Web completi fino al 23 agosto; 24 e 25 agosto sono assenti per normale ritardo del report, non perché Google conta solo i giorni di richiesta.

Meccanismo più probabile: contrazione algoritmica della copertura query durante l'aggiornamento spam Google iniziato il 18 agosto e chiuso il 21 agosto 2026. È allineamento temporale forte, non notifica di penalità specifica. Fattori amplificanti: dominio nuovo, lancio con 14 pagine seguito da cadenza quasi meccanica di tre pagine al giorno, zero link esterni rilevati da GSC e una coppia con vicinanza semantica moderata.

## Numeri completati

Proprietà `sc-domain:routebudget.eu`, Web, snapshot autenticato 25 agosto. Totale ultimi tre mesi: 25 clic, 1.801 impressioni, CTR 1,4%, posizione media 15,7. Ultimo giorno completo: 23 agosto. Aggiornamento interfaccia: circa 6,5 ore prima della lettura.

### Ultimi 3 giorni completi contro 3 precedenti

| Metrica | 21–23 agosto | 18–20 agosto | Variazione |
| --- | ---: | ---: | ---: |
| Clic | 1 | 3 | −66,7% |
| Impressioni | 34 | 166 | −79,5% |
| CTR | 2,9% | 1,8% | +1,1 punti |
| Posizione media | 17,7 | 13,5 | −4,2 posizioni |

La finestra 18–20 include ancora 141 impressioni e 3 clic del 18 agosto, giorno iniziale del rollout. Per isolare il salto, confronto più pulito:

| Metrica | 21–23 agosto | 15–17 agosto | Variazione |
| --- | ---: | ---: | ---: |
| Clic | 1 | 4 | −75,0% |
| Impressioni | 34 | 543 | −93,7% |
| CTR | 2,9% | 0,7% | +2,2 punti |
| Posizione media | 17,7 | 18,5 | migliora 0,8 |

Posizione media trattenuta migliora leggermente mentre impressioni crollano. Segnale importante: Google ha smesso di testare il sito su molte query e pagine; non ha semplicemente spinto ogni ranking più in basso.

## Dove è sparita la copertura

- Italia: 31 impressioni contro 468, −93,4%;
- mobile: 24 contro 330, −92,7%;
- desktop: 10 contro 210, −95,2%;
- `quanto consuma un camion`: 0 contro 20;
- `consumo medio camion`: 0 contro 18;
- `quanto consuma un camion al km`: 0 contro 16;
- `calcolatore dei tempi di guida`: 0 contro 14;
- query Belgio: perdite aggregate su più formulazioni;
- `tariffe trazionisti`: 0 contro 9 impressioni e 0 contro 2 clic.

الخسارة عريضة حسب الدولة والجهاز والاستعلام. لذلك ليست عطل قالب موبايل، صفحة واحدة أو canonical منفردة.

## ما تم نفيه

| فرضية | الدليل |
| --- | --- |
| إجراء يدوي | `No issues detected` |
| مشكلة أمنية | `No issues detected` |
| عطل sitemap | جميع الخرائط الفرعية `Success` ومقروءة 23 أغسطس |
| حجب robots أو canonical شامل | اختبارات SEO والبناء ناجحة؛ صفحات رئيسية مفهرسة وcanonical صحيحة |
| عطل crawl/serving من Google | لوحة الحالة تصنف تحديث أغسطس `Ranking` فقط، دون حادث crawl/index/serving |
| نقص بسبب عدم طلب الفهرسة | التقرير الزمني مستقل عن طلب URL Inspection؛ الأيام الناقصة غير مكتملة |
| انهيار فهرسة شامل | 48 URL مفهرسة من 51 في تقرير 21 أغسطس |

حالتا `Discovered – currently not indexed`: `/it/guide/costo-autostrada-furgone/` و`/it/guide/preventivo-trasporto-pdf/`، دون last crawl. لديهما روابط داخلية واختبار live سابق ناجح. هذا اختيار crawl/authority ثانوي، لا سبب هبوط 93,7% على صفحات كانت تظهر.

## علاج هذه الدفعة

1. ثلاث صفحات إيطالية بوظائف مختلفة، لا نسخ بلد أو مرادفات.
2. كل صفحة تبدأ بقرار عملي، معادلات، مثال قابل لإعادة الحساب وحدود تطبيق صريحة.
3. أدلة MIT/INPS/ARERA/IRU/Normattiva وتاريخ وصول، دون تحويل benchmark إلى سعر.
4. الروابط الجديدة تشكل مسارات موضوعية، لا حشو anchor.
5. لا اعتماد مستقبلي على حصة ثابتة `3/day`; النشر يبقى evidence-led حتى لو خرجت ثلاث صفحات في batch واحد.
6. بناء سلطة خارجية مطلوب: GSC يسجل 0 روابط خارجية. لا شراء روابط ولا نشر آلي في مجتمعات.

## قياس التعافي

- نافذة أولى: 24–30 أغسطس بعد اكتمال البيانات؛ لا تفسير أرقام اليوم الناقص.
- نافذة ثابتة: 7 أيام كاملة مقابل 7 سابقة، ثم 28 مقابل 28.
- راقب عودة breadth للاستعلامات، لا impression total فقط.
- راقب Italy وmobile/desktop والصفحات الثلاث الأساسية.
- طلب فهرسة فقط لصفحة جديدة أو تغير جوهري، لا كزر ranking يومي.

مصادر رسمية: [Google Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history)، [سياسات spam](https://developers.google.com/search/docs/essentials/spam-policies)، [محتوى الذكاء الاصطناعي](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)، [تشخيص انخفاض الزيارات](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops). بيانات الأداء والفهرسة والروابط مقروءة من جلسة GSC الموثقة؛ لا بيانات اعتماد محفوظة.
