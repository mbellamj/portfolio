import { useI18n } from '@/shared/i18n/I18nProvider';
import { Icon } from '@/shared/ui/Icon';
import { Lines } from '@/shared/ui/Lines';
import type { Portfolio } from '../data/schema';
export function Highlights({ items }: { items: Portfolio['highlights'] }) {
  const { locale } = useI18n();
  return <div className="profile-strip wrap">{items.map(item => <div key={item.id}>
    <div className="stat-heading"><Icon name={item.icon} />{item.value && <strong className="stat-value">{item.value[locale]}</strong>}</div>
    <span><Lines values={item.description[locale]} /></span>
  </div>)}</div>;
}
