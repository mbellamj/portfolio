import { describe, expect, it } from 'vitest';
import { buildContactEmail } from './contact';

describe('email draft composition', () => {
  it.each(['fr', 'en'] as const)('preserves multiline UTF-8 input and prevents query injection (%s)', locale => {
    const result = buildContactEmail(locale, { name: 'Céline & Marco?bcc=other@example.com', type: 'software', message: 'Une API & un écran.\nDeuxième ligne <b>utile</b>.' }, 'marcombella.pro@gmail.com');
    const parsed = new URL(result.href);
    expect(parsed.searchParams.get('subject')).toBe(result.subject);
    expect(parsed.searchParams.get('body')).toBe(result.body);
    expect([...parsed.searchParams.keys()]).toEqual(['subject', 'body']);
    expect(result.body).toContain('\nDeuxième ligne <b>utile</b>.');
    expect(result.body).toMatch(locale === 'fr' ? /Bonjour Marco,\n\n/ : /Hi Marco,\n\n/);
  });
  it('rejects whitespace-only input', () => {
    expect(() => buildContactEmail('en', { name: ' ', type: 'finance', message: 'Message' }, 'marcombella.pro@gmail.com')).toThrow();
  });
});
