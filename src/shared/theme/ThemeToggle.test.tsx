import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nProvider } from '@/shared/i18n/I18nProvider';
import { Header } from '@/features/portfolio/components/Header';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';
import { THEME_STORAGE_KEY } from './theme';

let matches = false;
let listeners: Set<() => void>;
beforeEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
  matches = false;
  listeners = new Set();
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return matches; },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  })));
});
afterEach(() => { vi.unstubAllGlobals(); window.localStorage.clear(); });
function renderToggle() { return render(<I18nProvider><ThemeProvider><ThemeToggle /></ThemeProvider></I18nProvider>); }

describe('theme preference', () => {
  it('follows the system until the user makes an explicit choice', () => {
    matches = true;
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    act(() => { matches = false; listeners.forEach(listener => listener()); });
    expect(document.documentElement.dataset.theme).toBe('light');
    fireEvent.click(screen.getByRole('button', { name: 'Mode sombre' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    act(() => { matches = false; listeners.forEach(listener => listener()); });
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
  it('restores a saved choice instead of overriding it with the system setting', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light'); matches = true;
    renderToggle();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: 'Mode sombre' })).toHaveAttribute('aria-pressed', 'false');
  });
  it('persists a toggle and restores it after remount', () => {
    const view = renderToggle();
    fireEvent.click(screen.getByRole('button', { name: 'Mode sombre' }));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Mode sombre' })).toHaveAttribute('title', 'Activer le mode clair');
    view.unmount(); renderToggle();
    expect(screen.getByRole('button', { name: 'Mode sombre' })).toHaveAttribute('aria-pressed', 'true');
  });
  it('remains usable when browser storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    renderToggle();
    fireEvent.click(screen.getByRole('button', { name: 'Mode sombre' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    fireEvent.click(screen.getByRole('button', { name: 'Mode sombre' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });
  it('localizes the button without resetting the chosen theme', () => {
    render(<I18nProvider><ThemeProvider><Header name="Marco Mbella" /></ThemeProvider></I18nProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mode sombre' }));
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('title', 'Switch to light mode');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
