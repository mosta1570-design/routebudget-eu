import { ArrowUpRight } from 'lucide-react';

import type { SiteCopy } from '../content/siteCopy';

type AudienceSectionProps = {
  copy: SiteCopy['audience'];
};

export function AudienceSection({ copy }: AudienceSectionProps) {
  return (
    <section className="audience section" id="per-chi" aria-labelledby="audience-title">
      <div className="shell audience__intro">
        <h2 id="audience-title">{copy.heading}</h2>
        <p>{copy.body}</p>
      </div>

      <div className="audience__rows shell">
        {copy.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <ArrowUpRight aria-hidden="true" size={32} strokeWidth={1.4} />
          </article>
        ))}
      </div>
    </section>
  );
}
