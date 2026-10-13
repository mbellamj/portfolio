import { useI18n } from '@/shared/i18n/I18nProvider';
import { useTheme } from './ThemeProvider';
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { text } = useI18n();
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={text('themeLabel')} aria-pressed={theme === 'dark'} title={text(theme === 'dark' ? 'themeEnableLight' : 'themeEnableDark')}><svg className="theme-glyph theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M20.2 14.1A8.4 8.4 0 0 1 9.9 3.8a8.4 8.4 0 1 0 10.3 10.3Z"/><path d="M17.5 3.5v3M16 5h3"/><circle cx="21" cy="8" r=".6" fill="currentColor" stroke="none"/></svg><svg className="theme-glyph theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>;
}
