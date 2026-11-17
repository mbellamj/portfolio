import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Icon } from '@/shared/ui/Icon';
import type { Portfolio } from '../data/schema';
export function FreelanceSection({ items }: { items: Portfolio['freelance'] }) {
  const { locale } = useI18n();
  return <section className="section freelance wrap" aria-labelledby="freelance-title">
    <div className="freelance-heading"><div><p className="eyebrow"><Copy message="freelanceEyebrow" /></p><h2 id="freelance-title"><Copy message="freelanceTitle" /></h2></div><p><Copy message="freelanceIntro" /></p></div>
    <div className="freelance-grid">{items.map(item => <article key={item.id}><Icon name={item.icon} className="design-mark" /><span className="card-index">{item.eyebrow}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p></article>)}</div>
  </section>;
}
