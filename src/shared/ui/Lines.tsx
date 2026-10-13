import { Fragment } from 'react';
export function Lines({ values }: { values: readonly string[] }) {
  return <>{values.map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>)}</>;
}
