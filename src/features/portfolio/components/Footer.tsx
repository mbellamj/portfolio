import { useI18n } from '@/shared/i18n/I18nProvider';
import type { Portfolio } from '../data/schema';
import { Copy } from '@/shared/i18n/Copy';
export function Footer({ profile }: { profile: Portfolio['profile'] }) {
  const { locale } = useI18n();
  const name = profile.name;
  return <footer className="wrap"><a className="brand" href="#"><span className="brand-mark" aria-hidden="true">m.</span><span>{name}<small><Copy message="brandSub" /></small></span></a><p><Copy message="footerNote" /></p><a className="text-link" href="#"><span><Copy message="backTop" /></span><span aria-hidden="true">↑</span></a><div className="footer-bottom"><span>© 2026 {name}</span><span><Copy message="footerStatus" /> · {profile.location[locale]}</span></div></footer>;
}
