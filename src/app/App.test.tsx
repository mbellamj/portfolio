import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { AppProviders } from './AppProviders';
import { createPortfolioRepository } from '@/features/portfolio/data/repository';

const config = { dataSource: 'bundled', apiBaseUrl: '', portfolioEndpoint: '/portfolio', siteUrl: '' } as const;
function renderApp() { return render(<AppProviders><App repository={createPortfolioRepository(config)} /></AppProviders>); }

describe('portfolio interactions', () => {
  it('renders preserved sections and switches the complete page to English', () => {
    const { container } = renderApp();
    expect(container.querySelectorAll('.profile-strip svg')).toHaveLength(4);
    expect(screen.getByText('4 ans')).toBeInTheDocument();
    expect(screen.getByText('Norauto International')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Télécharger mon CV/ })).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByText('4 years')).toBeInTheDocument();
    expect(screen.getByText('2 years')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('heading', { name: /Engineering.*Business sense/ })).toBeInTheDocument();
  });
  it('filters experience without altering the source records', () => {
    const { container } = renderApp();
    const filters = screen.getByRole('group', { name: 'Filtrer les expériences' });
    expect(container.querySelectorAll('.experience')).toHaveLength(5);
    fireEvent.click(within(filters).getByRole('button', { name: 'Finance' }));
    expect(container.querySelectorAll('.experience')).toHaveLength(1);
    expect(screen.getByText('Smart Engine Advisory')).toBeInTheDocument();
    fireEvent.click(within(filters).getByRole('button', { name: 'Ingénierie' }));
    expect(container.querySelectorAll('.experience')).toHaveLength(4);
    fireEvent.click(within(filters).getByRole('button', { name: 'Tout' }));
    expect(container.querySelectorAll('.experience')).toHaveLength(5);
  });
  it('preselects services, composes an email draft, and preserves inputs when editing', () => {
    renderApp();
    fireEvent.click(screen.getByRole('link', { name: /Échanger sur vos objectifs/ }));
    expect(screen.getByLabelText('Le sujet')).toHaveValue('finance');
    fireEvent.change(screen.getByLabelText('Votre nom'), { target: { value: 'Céline' } });
    fireEvent.change(screen.getByLabelText('Votre idée ou votre besoin'), { target: { value: 'Une idée & un objectif.' } });
    fireEvent.click(screen.getByRole('button', { name: /Préparer l’email/ }));
    const link = screen.getByRole('link', { name: /Ouvrir la messagerie/ });
    const href = new URL(link.getAttribute('href') ?? '');
    expect(href.pathname).toBe('marcombella.pro@gmail.com');
    expect(href.searchParams.get('body')).toContain('Une idée & un objectif.');
    expect(href.searchParams.get('subject')).toContain('Accompagnement financier');
    fireEvent.click(screen.getByRole('button', { name: 'Modifier' }));
    expect(screen.getByLabelText('Votre nom')).toHaveValue('Céline');
    expect(screen.getByLabelText('Votre idée ou votre besoin')).toHaveValue('Une idée & un objectif.');
  });
  it('exposes a retry action when the repository fails', async () => {
    render(<AppProviders><App repository={{ initialData: undefined, read: async () => { throw new ApiErrorForTest(); } }} /></AppProviders>);
    expect(await screen.findByRole('button', { name: 'Réessayer' }, { timeout: 5000 })).toBeInTheDocument();
  });
});
class ApiErrorForTest extends Error { }
