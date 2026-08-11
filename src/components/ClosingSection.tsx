import { ArrowUpRight } from 'lucide-react';

import appIcon from '../assets/app-icon-ui.png';
import type { SiteCopy } from '../content/siteCopy';

const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';

type ClosingSectionProps = {
  copy: SiteCopy['closing'];
};

export function ClosingSection({ copy }: ClosingSectionProps) {
  return (
    <section className="closing section" aria-labelledby="closing-title">
      <div className="closing__glow" aria-hidden="true" />
      <div className="shell closing__inner">
        <img src={appIcon} alt="" width="88" height="88" loading="lazy" />
        <h2 id="closing-title">{copy.heading}</h2>
        <p>{copy.body}</p>
        <div className="closing__actions">
          <a
            className="button button--primary"
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
          >
            {copy.appStoreCta}
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            className="button button--quiet"
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noreferrer"
          >
            {copy.googlePlayCta}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <span>{copy.availability}</span>
      </div>
    </section>
  );
}
