import { ArrowUpRight, Mail } from 'lucide-react';

import type { SiteCopy } from '../content/siteCopy';

type SupportSectionProps = {
  copy: SiteCopy['support'];
};

export function SupportSection({ copy }: SupportSectionProps) {
  return (
    <section className="support section" id="supporto" aria-labelledby="support-title">
      <div className="shell support__layout">
        <div className="support__intro">
          <Mail aria-hidden="true" size={30} strokeWidth={1.6} />
          <h2 id="support-title">{copy.heading}</h2>
          <p>{copy.body}</p>
          <a className="text-link" href="mailto:mosta1570@gmail.com">
            {copy.emailCta}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="support__faq">
          {copy.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
