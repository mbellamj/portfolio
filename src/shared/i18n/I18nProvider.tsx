import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { z } from 'zod';
import french from './fr.json';
import english from './en.json';
import type { Locale } from './types';

const tokenSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), value: z.string() }),
  z.object({ type: z.literal('emphasis'), value: z.string() }),
  z.object({ type: z.literal('break') }),
]);
const dictionarySchema = z.record(z.string(), z.array(tokenSchema));
const dictionaries = { fr: dictionarySchema.parse(french), en: dictionarySchema.parse(english) };
export type CopyKey = keyof typeof french;
export type CopyToken = z.infer<typeof tokenSchema>;
interface I18nValue {
  locale: Locale;
  toggleLocale: () => void;
  text: (key: CopyKey) => string;
  tokens: (key: CopyKey) => CopyToken[];
}
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const toggleLocale = useCallback(() => setLocale(current => current === 'fr' ? 'en' : 'fr'), []);
  const tokens = useCallback((key: CopyKey) => {
    const value = dictionaries[locale][key];
    if (!value) throw new Error(`Missing translation: ${locale}.${key}`);
    return value;
  }, [locale]);
  const text = useCallback((key: CopyKey) => tokens(key).map(token => token.type === 'break' ? '\n' : token.value).join(''), [tokens]);
  const value = useMemo(() => ({ locale, toggleLocale, text, tokens }), [locale, toggleLocale, text, tokens]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used within I18nProvider');
  return value;
}
