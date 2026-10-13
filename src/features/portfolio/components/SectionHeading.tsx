import { Copy } from '@/shared/i18n/Copy';
import type { CopyKey } from '@/shared/i18n/I18nProvider';
import type { ReactNode } from 'react';
interface Props { id: string; eyebrow: CopyKey; title: CopyKey; intro?: CopyKey; children?: ReactNode }
export function SectionHeading({ id, eyebrow, title, intro, children }: Props) {
  return <div className="section-heading"><div><p className="eyebrow"><Copy message={eyebrow} /></p><h2 id={id}><Copy message={title} /></h2></div>{intro && <p className="section-intro"><Copy message={intro} /></p>}{children}</div>;
}
