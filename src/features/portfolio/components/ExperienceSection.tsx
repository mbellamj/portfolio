import { useState } from 'react';
import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import type { CopyKey } from '@/shared/i18n/I18nProvider';
import type { Portfolio } from '../data/schema';
import { SectionHeading } from './SectionHeading';
type Filter = 'all' | 'engineering' | 'finance';
const filters: readonly { value: Filter; label: CopyKey }[] = [{ value: 'all', label: 'filterAll' }, { value: 'engineering', label: 'filterEngineering' }, { value: 'finance', label: 'filterFinance' }];
export function ExperienceSection({ items }: { items: Portfolio['experiences'] }) {
  const { locale, text } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const visible = items.filter(item => filter === 'all' || item.category === filter);
  return <section className="section experience-section" id="parcours" aria-labelledby="experience-title"><div className="wrap">
    <SectionHeading id="experience-title" eyebrow="experienceEyebrow" title="experienceTitle">
      <div className="filters" role="group" aria-label={text('filterLabel')}>{filters.map(item => <button type="button" key={item.value} className={filter === item.value ? 'active' : undefined} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}><Copy message={item.label} /></button>)}</div>
    </SectionHeading>
    <p className="sr-only" role="status" aria-live="polite">{locale === 'fr' ? `${visible.length} expérience(s) affichée(s).` : `${visible.length} experience(s) shown.`}</p>
    <div className="timeline">{visible.map(item => <article className="experience" key={item.id}>
      <div className="experience-date">{item.current && <span className="current-tag"><Copy message="current" /></span>}<span>{item.dates[locale]}</span><small>{item.location}</small></div>
      <div className="experience-body"><div className="experience-heading"><div><p className="company">{item.company}</p><h3>{item.role[locale]}</h3></div><span className="experience-arrow" aria-hidden="true">↗</span></div>
        <p>{item.summary[locale]}</p><details open={item.id === 'saegus' ? true : undefined}><summary><Copy message="missionDetails" /></summary><ul>{item.contributions[locale].map((line, index) => <li key={index}>{line}</li>)}</ul></details>
        <div className="tags">{item.technologies.map((tag, index) => <span key={index}>{tag[locale]}</span>)}</div>
      </div>
    </article>)}</div>
  </div></section>;
}
