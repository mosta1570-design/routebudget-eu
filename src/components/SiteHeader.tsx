import { useEffect, useId, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import appIcon from '../assets/app-icon-ui.png';
import type { Locale, SiteCopy } from '../content/siteCopy';

type SiteHeaderProps = {
  locale: Locale;
  copy: SiteCopy;
  onLocaleChange: (locale: Locale) => void;
};

const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';

export function SiteHeader({ locale, copy, onLocaleChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-lockup" href="#top" aria-label="RouteBudget EU, home">
          <img src={appIcon} alt="" width="42" height="42" />
          <span>RouteBudget</span>
          <small>EU</small>
        </a>

        <nav className="desktop-nav" aria-label={copy.navigationLabel}>
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label={copy.languageLabel}>
            <button
              type="button"
              lang="it"
              aria-pressed={locale === 'it'}
              onClick={() => onLocaleChange('it')}
            >
              IT
            </button>
            <button
              type="button"
              lang="en"
              aria-pressed={locale === 'en'}
              onClick={() => onLocaleChange('en')}
            >
              EN
            </button>
          </div>

          <a
            className="header-store-link"
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            App Store
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? copy.closeLabel : copy.menuLabel}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className="mobile-menu"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu__route" aria-hidden="true" />
        <nav aria-label={copy.navigationLabel}>
          {copy.nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <div className="mobile-menu__stores">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              App Store
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Google Play
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="language-switch" aria-label={copy.languageLabel}>
            <button
              type="button"
              lang="it"
              aria-pressed={locale === 'it'}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => onLocaleChange('it')}
            >
              IT
            </button>
            <button
              type="button"
              lang="en"
              aria-pressed={locale === 'en'}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => onLocaleChange('en')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
