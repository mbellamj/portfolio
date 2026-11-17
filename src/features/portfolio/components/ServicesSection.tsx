import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import type { Portfolio, ServiceId } from '../data/schema';
import { SectionHeading } from './SectionHeading';
export function ServicesSection({ items, onSelect }: { items: Portfolio['services']; onSelect: (id: ServiceId) => void }) {
  const { locale } = useI18n();
  return <section className="section services-section" id="services" aria-labelledby="services-title"><div className="wrap">
    <SectionHeading id="services-title" eyebrow="servicesEyebrow" title="servicesTitle" intro="servicesIntro" />
    <div className="services-grid">{items.map(item => <article className="service-card" key={item.id}><span className="card-index">{item.eyebrow}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p><a className="text-link" href="#contact" onClick={() => onSelect(item.id)}><span>{item.cta[locale]}</span><span aria-hidden="true">↗</span></a></article>)}</div>
    <div className="fintech-note"><span className="fintech-symbol" aria-hidden="true">✳</span><div><h3><Copy message="fintechTitle" /></h3><p><Copy message="fintechCopy" /></p></div></div>
  </div></section>;
}
