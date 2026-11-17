import { Copy } from '@/shared/i18n/Copy';

export function FreelanceSection() {
  return <section className="section freelance wrap" aria-labelledby="freelance-title">
    <div className="freelance-heading">
      <div><p className="eyebrow"><Copy message="freelanceEyebrow" /></p><h2 id="freelance-title"><Copy message="freelanceTitle" /></h2></div>
      <p><Copy message="freelanceIntro" /></p>
    </div>
  </section>;
}
