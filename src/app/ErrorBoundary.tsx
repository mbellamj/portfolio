import { Component } from 'react';
import type { ReactNode } from 'react';
interface Props { children: ReactNode }
interface State { failed: boolean }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="async-state" role="alert"><h1>Impossible d’afficher le portfolio / Unable to display this portfolio</h1><p>Rechargez la page / Reload the page.</p><button className="button" onClick={() => window.location.reload()}>Recharger / Reload</button></main>;
    return this.props.children;
  }
}
