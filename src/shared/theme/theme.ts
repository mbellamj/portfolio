export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'portfolio-theme';
export function readStoredTheme(): Theme | null {
  try { const value = window.localStorage.getItem(THEME_STORAGE_KEY); return value === 'light' || value === 'dark' ? value : null; }
  catch { return null; }
}
export function systemTheme(): Theme {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function saveTheme(theme: Theme): void {
  try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* The toggle still works when storage is unavailable. */ }
}
