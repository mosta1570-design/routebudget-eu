import { ArrowUpRight } from 'lucide-react';

import type { SiteCopy } from '../content/siteCopy';

type GrowthResourcesSectionProps = {
  copy: SiteCopy['resources'];
};

export function GrowthResourcesSection({ copy }: GrowthResourcesSectionProps) {
  const [feature, ...supporting] = copy.items;

  return (
    <section className="section growth-resources" id="guide">
      <div className="shell">
        <header className="growth-resources__intro">
          <div>
            <p className="growth-resources__eyebrow">{copy.eyebrow}</p>
            <h2>{copy.heading}</h2>
          </div>
          <p>{copy.body}</p>
        </header>

        <div className="growth-resources__layout">
          <article className="growth-resources__feature">
            <span>{feature.kind}</span>
            <h3>
              <a href={feature.href}>{feature.title}</a>
            </h3>
            <p>{feature.text}</p>
            <a className="text-link" href={feature.href}>
              {feature.action}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </article>

          <ol className="growth-resources__list">
            {supporting.map((item, index) => (
              <li key={item.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>{item.kind}</small>
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p>{item.text}</p>
                </div>
                <a href={item.href} aria-label={`${item.action}: ${item.title}`}>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>

        <a className="growth-resources__hub" href="/it/guide/">
          {copy.hubAction}
          <ArrowUpRight aria-hidden="true" size={19} />
        </a>
      </div>
    </section>
  );
}
