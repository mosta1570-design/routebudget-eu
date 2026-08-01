import type { SiteCopy } from '../content/siteCopy';

type WorkflowSectionProps = {
  copy: SiteCopy['flow'];
};

export function WorkflowSection({ copy }: WorkflowSectionProps) {
  return (
    <section className="workflow section" aria-labelledby="workflow-title">
      <div className="shell workflow__layout">
        <div className="workflow__intro">
          <h2 id="workflow-title">{copy.heading}</h2>
          <p>{copy.body}</p>
        </div>

        <ol className="workflow__steps">
          {copy.items.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
