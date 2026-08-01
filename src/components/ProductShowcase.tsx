import appArchive from '../assets/app-archive-it.png';
import appCosts from '../assets/app-costs-it.png';
import appHome from '../assets/app-home-it.png';
import appScenarios from '../assets/app-scenarios-it.png';
import type { SiteCopy } from '../content/siteCopy';

type ProductShowcaseProps = {
  copy: SiteCopy['showcase'];
};

const screenshots = [appHome, appCosts, appScenarios, appArchive];

export function ProductShowcase({ copy }: ProductShowcaseProps) {
  return (
    <section className="showcase section" id="prodotto" aria-labelledby="showcase-title">
      <div className="shell showcase__intro">
        <h2 id="showcase-title">{copy.heading}</h2>
        <p>{copy.body}</p>
      </div>

      <div className="showcase__stage shell">
        {screenshots.map((screenshot, index) => (
          <figure className={'device-shot device-shot--' + (index + 1)} key={copy.screens[index]}>
            <div className="device-shot__frame">
              <span className="device-shot__speaker" aria-hidden="true" />
              <img
                src={screenshot}
                alt={copy.captions[index]}
                loading={index === 0 ? 'eager' : 'lazy'}
                width="900"
                height="2000"
              />
            </div>
            <figcaption>
              <span>{copy.screens[index]}</span>
              <p>{copy.captions[index]}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
