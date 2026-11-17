import type { Locale } from '@/shared/i18n/types';
export type ContactType = 'software' | 'fintech' | 'automation' | 'other';
export interface ContactDraftInput { name: string; type: ContactType; message: string }
const labels = {
  fr: { software: 'Projet logiciel', fintech: 'Intégration FinTech', automation: 'Automatisation des processus', other: 'Recrutement & collaboration' },
  en: { software: 'Software engineering', fintech: 'FinTech integration', automation: 'Business process automation', other: 'Recruitment & collaboration' },
};
export function buildContactEmail(locale: Locale, input: ContactDraftInput, recipient: string, recipientName = 'Marco') {
  const name = input.name.trim(), message = input.message.trim();
  const owner = recipientName.trim().split(/\s+/)[0] || recipientName;
  if (!name || !message) throw new Error('Name and message are required.');
  const subject = `${labels[locale][input.type]} — ${name}`;
  const body = locale === 'fr'
    ? `Bonjour ${owner},\n\nJe m’appelle ${name}.\n\n${message}\n\nBien à vous,\n${name}`
    : `Hi ${owner},\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}`;
  return { subject, body, href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
