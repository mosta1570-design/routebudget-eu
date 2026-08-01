import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

import heroBackground from '../assets/hero-night-truck.jpg';
import type { SiteCopy } from '../content/siteCopy';

const APP_STORE_URL = 'https://apps.apple.com/app/id6789717191';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=eu.routebudget.app';

type HeroProps = {
  copy: SiteCopy['hero'];
};

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img
        className="hero__background"
        src={heroBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="hero__veil" aria-hidden="true" />
      <svg className="hero__route" viewBox="0 0 900 520" aria-hidden="true">
        <path d="M-40 482 C 170 420, 226 488, 390 360 S 642 250, 955 48" />
      </svg>

      <div className="hero__content shell">
        <div className="hero__copy">
          <p className="hero__context">{copy.context}</p>
          <h1 id="hero-title">
            <span>{copy.titleLead}</span>
            <span>{copy.titleFocus}</span>
          </h1>
          <p className="hero__body">{copy.body}</p>

          <div className="hero__actions">
            <a
              className="button button--primary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {copy.appStoreCta}
              <ArrowUpRight aria-hidden="true" size={20} />
            </a>
            <a className="button button--quiet" href="#metodo">
              {copy.methodCta}
              <ArrowDown aria-hidden="true" size={19} />
            </a>
          </div>

          <div className="hero__availability">
            <span>{copy.availability}</span>
            <a
              className="hero__android-status"
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noreferrer"
            >
              {copy.androidStatus}
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>

        <aside className="decision-proof" aria-label={copy.decisionLabel}>
          <div className="decision-proof__status">
            <span><Check aria-hidden="true" size={14} /></span>
            {copy.decisionLabel}
          </div>
          <strong>{copy.decisionValue}</strong>
          <p>{copy.decisionMeta}</p>
          <div className="decision-proof__meter" aria-hidden="true">
            <span />
          </div>
        </aside>

        <ul className="hero__trust" aria-label="RouteBudget highlights">
          {copy.trust.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={15} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
