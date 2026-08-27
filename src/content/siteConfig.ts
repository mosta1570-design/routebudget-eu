import type { Locale } from './siteCopy';

// Keep client runtime configuration independent from editorial inventory.
// Content-only releases update content/site.json and must not invalidate the
// homepage bundle hash while crawlers can still hold cached HTML.
export const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';
export const SUPPORT_EMAIL = 'mailto:mosta1570@gmail.com';

export const STORE_BADGES = {
  it: {
    appStore: '/store-badges/app-store-it.svg',
    googlePlay: '/store-badges/google-play-it.png',
    appStoreAlt: 'Scarica RouteBudget su App Store',
    googlePlayAlt: 'Scarica RouteBudget su Google Play',
  },
  en: {
    appStore: '/store-badges/app-store-en.svg',
    googlePlay: '/store-badges/google-play-en.png',
    appStoreAlt: 'Download RouteBudget on the App Store',
    googlePlayAlt: 'Get RouteBudget on Google Play',
  },
} satisfies Record<
  Locale,
  {
    appStore: string;
    googlePlay: string;
    appStoreAlt: string;
    googlePlayAlt: string;
  }
>;
