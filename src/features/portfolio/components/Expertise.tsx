import { useI18n } from '@/shared/i18n/I18nProvider';
import type { Portfolio } from '../data/schema';
import { SectionHeading } from './SectionHeading';
export function Expertise({ items }: { items: Portfolio['skills'] }) {
  const { locale } = useI18n();
  return <section className="section expertise wrap" id="expertise" aria-labelledby="expertise-title">
    <SectionHeading id="expertise-title" eyebrow="expertiseEyebrow" title="expertiseTitle" intro="expertiseIntro" />
    <div className="expertise-grid">{items.map(item => <article className="skill-card" key={item.id}><span className="card-index">{item.eyebrow}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p><div className="tags">{item.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
  </section>;
}
