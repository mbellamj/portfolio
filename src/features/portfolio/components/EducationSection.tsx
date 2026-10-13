import { useI18n } from '@/shared/i18n/I18nProvider';
import { Lines } from '@/shared/ui/Lines';
import type { Portfolio } from '../data/schema';
import { SectionHeading } from './SectionHeading';
export function EducationSection({ items }: { items: Portfolio['education'] }) {
  const { locale } = useI18n();
  return <section className="section education wrap" aria-labelledby="education-title"><SectionHeading id="education-title" eyebrow="educationEyebrow" title="educationTitle" /><div className="education-grid">{items.map(item => <article key={item.id}><span className="education-date">{item.dates[locale]}</span><h3>{item.title[locale]}</h3><p><Lines values={item.description[locale]} /></p></article>)}</div></section>;
}
