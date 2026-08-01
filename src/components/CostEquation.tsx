import { Clock3, Fuel, Landmark, Wrench } from 'lucide-react';

import type { SiteCopy } from '../content/siteCopy';

type CostEquationProps = {
  copy: SiteCopy['equation'];
};

const icons = [Fuel, Landmark, Clock3, Wrench];

export function CostEquation({ copy }: CostEquationProps) {
  return (
    <section className="equation-section section" id="metodo" aria-labelledby="equation-title">
      <div className="shell equation-section__intro">
        <h2 id="equation-title">{copy.heading}</h2>
        <p>{copy.body}</p>
      </div>

      <div className="shell equation" aria-label={copy.exampleLabel}>
        <div className="equation__label">{copy.exampleLabel}</div>
        <div className="equation__factors">
          {copy.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article className="equation__factor" key={item.label}>
                <div className="equation__icon">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </div>
                <strong>{item.value}</strong>
              </article>
            );
          })}
        </div>

        <div className="equation__operator" aria-hidden="true">
          <span>+</span>
          <span>=</span>
        </div>

        <div className="equation__result">
          <p>{copy.resultLabel}</p>
          <strong>{copy.resultValue}</strong>
          <span>{copy.resultNote}</span>
        </div>
      </div>
    </section>
  );
}
