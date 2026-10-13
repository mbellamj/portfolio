import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { readStoredTheme, saveTheme, systemTheme, THEME_STORAGE_KEY } from './theme';
import type { Theme } from './theme';
interface Preference { theme: Theme; explicit: boolean }
interface ThemeValue { theme: Theme; toggleTheme: () => void }
const ThemeContext = createContext<ThemeValue | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Preference>(() => {
    const saved = readStoredTheme();
    return { theme: saved ?? systemTheme(), explicit: saved !== null };
  });
  useEffect(() => {
    document.documentElement.dataset.theme = preference.theme;
    document.documentElement.style.colorScheme = preference.theme;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = preference.theme === 'dark' ? '#111813' : '#f5f3ec';
  }, [preference.theme]);
  useEffect(() => {
    if (preference.explicit || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setPreference({ theme: media.matches ? 'dark' : 'light', explicit: false });
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [preference.explicit]);
  useEffect(() => {
    const update = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      const saved = readStoredTheme();
      setPreference({ theme: saved ?? systemTheme(), explicit: saved !== null });
    };
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);
  const toggleTheme = useCallback(() => {
    const next = preference.theme === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    setPreference({ theme: next, explicit: true });
  }, [preference.theme]);
  const value = useMemo(() => ({ theme: preference.theme, toggleTheme }), [preference.theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme(): ThemeValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
