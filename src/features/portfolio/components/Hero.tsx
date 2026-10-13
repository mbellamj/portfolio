import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { assetUrl } from '@/shared/lib/assets';
import type { Portfolio } from '../data/schema';

export function Hero({ profile }: { profile: Portfolio['profile'] }) {
  const { locale } = useI18n();
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" aria-hidden="true" /><span>{profile.eyebrow[locale]}</span></p>
      <h1 id="hero-title"><Copy message="heroTitle1" /><br /><em><Copy message="heroTitle2" /></em></h1>
      <p className="hero-description">{profile.bio[locale]}</p>
      <div className="hero-actions"><a className="button" href="#contact"><span><Copy message="heroCta" /></span><span aria-hidden="true">↗</span></a><a className="text-link" href={assetUrl(profile.cvAsset)} download><span><Copy message="downloadCv" /></span><span aria-hidden="true">↓</span></a></div>
      <div className="hero-location"><span aria-hidden="true">⌁</span><span>{profile.location[locale]} · <Copy message="spokenLanguages" /></span></div>
    </div>
    <figure className="system-figure">
      <div className="system-board">
        <div className="board-top"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>architecture.map</span><span className="board-indicator" aria-hidden="true">↗</span></div>
        <div className="board-heading"><p><Copy message="boardEyebrow" /></p><strong><Copy message="boardTitle" /></strong></div>
        <div className="architecture">
          <div className="system-node node-api"><span className="node-icon" aria-hidden="true">{'{ }'}</span><div><strong>API</strong><small><Copy message="apiSub" /></small></div><span className="node-status" aria-hidden="true" /></div>
          <div className="connector" aria-hidden="true" />
          <div className="system-node node-service"><span className="node-icon" aria-hidden="true">⎔</span><div><strong><Copy message="serviceNode" /></strong><small>NestJS · Clean Architecture</small></div><span className="node-status" aria-hidden="true" /></div>
          <div className="split-connector" aria-hidden="true" />
          <div className="node-pair"><div className="system-node"><div><strong><Copy message="eventsNode" /></strong><small>RabbitMQ · Kafka</small></div></div><div className="system-node"><div><strong><Copy message="dataNode" /></strong><small>PostgreSQL · MongoDB</small></div></div></div>
        </div>
        <div className="board-bottom"><span>test</span><b aria-hidden="true">→</b><span>containerize</span><b aria-hidden="true">→</b><span>deploy</span><b aria-hidden="true">→</b><span>observe</span></div>
      </div>
      <figcaption><span><Copy message="boardCaption" /></span><span>01 / SYSTEMS</span></figcaption>
    </figure>
  </section>;
}
