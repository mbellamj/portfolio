import { Fragment } from 'react';
import { useI18n } from './I18nProvider';
import type { CopyKey } from './I18nProvider';

/** A small, explicit rich-text vocabulary. Remote HTML is never inserted. */
export function Copy({ message }: { message: CopyKey }) {
  const { tokens } = useI18n();
  return <>{tokens(message).map((token, index) => (
    <Fragment key={index}>
      {token.type === 'break' ? <br /> : token.type === 'emphasis' ? <em>{token.value}</em> : token.value}
    </Fragment>
  ))}</>;
}
