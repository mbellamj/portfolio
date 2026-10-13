import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { I18nProvider } from '@/shared/i18n/I18nProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }));
  return <QueryClientProvider client={client}><I18nProvider><ThemeProvider>{children}</ThemeProvider></I18nProvider></QueryClientProvider>;
}
