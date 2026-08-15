import type { Locale } from './siteCopy';
import site from '../../content/site.json';

export const APP_STORE_URL = site.appStoreUrl;
export const GOOGLE_PLAY_URL = site.googlePlayUrl;
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
