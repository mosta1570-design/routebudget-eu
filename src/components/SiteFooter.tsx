import appIcon from '../assets/app-icon-ui.png';
import type { SiteCopy } from '../content/siteCopy';

type SiteFooterProps = {
  copy: SiteCopy['footer'];
};

export function SiteFooter({ copy }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <a className="brand-lockup" href="#top" aria-label="RouteBudget EU, home">
          <img src={appIcon} alt="" width="38" height="38" loading="lazy" />
          <span>RouteBudget</span>
          <small>EU</small>
        </a>

        <nav aria-label="Legal">
          <a href="/it/guide/">{copy.guides}</a>
          <a href="/it/calcolatori/">{copy.calculators}</a>
          <a href="#supporto">{copy.support}</a>
          <a href="privacy.html">{copy.privacy}</a>
          <a href="terms.html">{copy.terms}</a>
        </nav>

        <p>{copy.copyright}</p>
      </div>
    </footer>
  );
}
