import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './app/AppProviders';
import { ErrorBoundary } from './app/ErrorBoundary';
import { App } from './app/App';
import './styles/portfolio.css';
import './styles/theme.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element is missing.');
createRoot(root).render(<StrictMode><ErrorBoundary><AppProviders><App /></AppProviders></ErrorBoundary></StrictMode>);
