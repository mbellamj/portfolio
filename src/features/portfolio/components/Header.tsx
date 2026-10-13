import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/shared/theme/ThemeToggle';
import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import type { CopyKey } from '@/shared/i18n/I18nProvider';

const links: readonly { href: string; copy: CopyKey }[] = [
  { href: '#expertise', copy: 'navExpertise' }, { href: '#parcours', copy: 'navExperience' },
  { href: '#services', copy: 'navServices' }, { href: '#contact', copy: 'navContact' },
];
export function Header({ name }: { name: string }) {
  const { locale, toggleLocale, text } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  return <header className="site-header wrap">
    <a className="brand" href="#" aria-label={text('home')}><span className="brand-mark" aria-hidden="true">m.</span><span>{name}<small><Copy message="brandSub" /></small></span></a>
    <nav id="navigation" aria-label={text('nav')} className={menuOpen ? 'is-open' : undefined}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}><Copy message={link.copy} /></a>)}
    </nav>
    <div className="header-actions">
      <ThemeToggle />
      <button className="language" type="button" onClick={toggleLocale} aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}>{locale === 'fr' ? 'EN' : 'FR'}</button>
      <button ref={menuRef} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(open => !open)}><Copy message="menu" /></button>
      <a className="button button-small header-cta" href="#contact"><span><Copy message="headerCta" /></span><span aria-hidden="true">↗</span></a>
    </div>
  </header>;
}
