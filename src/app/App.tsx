import { useEffect, useState } from 'react';
import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { appConfig } from '@/shared/config/env';
import { usePortfolio } from '@/features/portfolio/data/queries';
import type { PortfolioRepository } from '@/features/portfolio/data/repository';
import type { ServiceId } from '@/features/portfolio/data/schema';
import { Header } from '@/features/portfolio/components/Header';
import { Hero } from '@/features/portfolio/components/Hero';
import { Highlights } from '@/features/portfolio/components/Highlights';
import { Expertise } from '@/features/portfolio/components/Expertise';
import { ExperienceSection } from '@/features/portfolio/components/ExperienceSection';
import { FreelanceSection } from '@/features/portfolio/components/FreelanceSection';
import { ServicesSection } from '@/features/portfolio/components/ServicesSection';
import { EducationSection } from '@/features/portfolio/components/EducationSection';
import { Footer } from '@/features/portfolio/components/Footer';
import { ContactSection } from '@/features/contact/ContactSection';
import type { ContactSelection } from '@/features/contact/ContactSection';

export function App({ repository }: { repository?: PortfolioRepository }) {
  const { locale, toggleLocale } = useI18n();
  const query = usePortfolio(repository);
  const [selection, setSelection] = useState<ContactSelection | null>(null);
  const name = query.data?.profile.name ?? 'Marco Mbella';
  useEffect(() => {
    document.title = `${name} — ${locale === 'fr' ? 'Ingénieur logiciel & conseiller financier' : 'Software Engineer & Financial Advisor'}`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta && query.data) meta.content = query.data.profile.bio[locale];
    if (appConfig.siteUrl) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = appConfig.siteUrl;
    }
  }, [locale, name, query.data]);
  if (query.isPending || !query.data) return <main className="async-state">
    <button className="language" type="button" onClick={toggleLocale}>{locale === 'fr' ? 'EN' : 'FR'}</button>
    {query.isError ? <div role="alert"><h1>{locale === 'fr' ? 'Le contenu est indisponible.' : 'The content is unavailable.'}</h1><p>{locale === 'fr' ? 'Vérifiez la connexion ou réessayez.' : 'Check your connection or try again.'}</p><button className="button" type="button" onClick={() => void query.refetch()}>{locale === 'fr' ? 'Réessayer' : 'Try again'}</button></div> : <p role="status">{locale === 'fr' ? 'Chargement du portfolio…' : 'Loading the portfolio…'}</p>}
  </main>;
  const data = query.data;
  function selectService(type: ServiceId) { setSelection(current => ({ type, revision: (current?.revision ?? 0) + 1 })); }
  return <>
    <a className="skip" href="#main"><Copy message="skip" /></a><Header name={data.profile.name} />
    {query.isError && <p className="refresh-warning" role="status">{locale === 'fr' ? 'La dernière version enregistrée du contenu est affichée.' : 'The last cached content is being displayed.'}</p>}
    <main id="main"><Hero profile={data.profile} /><Highlights items={data.highlights} /><Expertise items={data.skills} /><ExperienceSection items={data.experiences} /><FreelanceSection items={data.freelance} /><ServicesSection items={data.services} onSelect={selectService} /><EducationSection items={data.education} /><ContactSection profile={data.profile} selection={selection} /></main>
    <Footer profile={data.profile} />
  </>;
}
