export const UNSUPPORTED_PRODUCT_CLAIMS = [
  /Google Maps/i,
  /navigazione (?:GPS|turn-by-turn)/i,
  /pedaggi (?:live|in tempo reale)/i,
  /tracciamento (?:live|in tempo reale)/i,
  /RouteBudget[^.]{0,80}(?:ottimizza|sceglie) il percorso/i,
  /RouteBudget (?:gestisce|offre|include) (?:la |un |una )?(?:fatturazione|TMS|ERP|flotta|database clienti)/i,
  /RouteBudget (?:genera|crea|emette) (?:fatture|contratti|documenti fiscali)/i,
  /RouteBudget (?:salva|sincronizza|archivia)[^.]{0,50}(?:nel cloud|i PDF|documenti)/i,
  /RouteBudget (?:garantisce|assicura)[^.]{0,60}(?:profitto|margine|risparmio|conformit[aà]|precisione)/i,
];
