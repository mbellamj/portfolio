import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Copy } from '@/shared/i18n/Copy';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { assetUrl } from '@/shared/lib/assets';
import { copyText } from '@/shared/lib/clipboard';
import type { Portfolio, ServiceId } from '../portfolio/data/schema';
import { buildContactEmail } from './contact';
import type { ContactDraftInput, ContactType } from './contact';

export interface ContactSelection { type: ServiceId; revision: number }
interface Props { profile: Portfolio['profile']; selection: ContactSelection | null }
export function ContactSection({ profile, selection }: Props) {
  const { locale, text } = useI18n();
  const [name, setName] = useState(''), [type, setType] = useState<ContactType>('software'), [message, setMessage] = useState('');
  const [draftInput, setDraftInput] = useState<ContactDraftInput | null>(null), [notice, setNotice] = useState('');
  const previewRef = useRef<HTMLDivElement>(null), messageRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (selection) { setType(selection.type); setDraftInput(null); } }, [selection]);
  useEffect(() => { if (draftInput) previewRef.current?.focus({ preventScroll: true }); }, [draftInput]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(timer); }, [notice]);
  const draft = draftInput ? buildContactEmail(locale, draftInput, profile.email, profile.name) : null;
  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = { name, type, message };
    if (!name.trim() || !message.trim()) { setNotice(locale === 'fr' ? 'Indiquez votre nom et votre besoin.' : 'Please add your name and your idea.'); return; }
    setDraftInput(input);
  }
  async function copyDraft() {
    if (!draft) return;
    try { await copyText(`${draft.subject}\n\n${draft.body}`); setNotice(locale === 'fr' ? 'Brouillon copié.' : 'Draft copied.'); }
    catch { setNotice(locale === 'fr' ? 'Vous pouvez sélectionner et copier le texte du brouillon.' : 'You can select and copy the draft text.'); }
  }
  return <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap contact-grid">
    <div className="contact-intro"><p className="eyebrow"><Copy message="contactEyebrow" /></p><h2 id="contact-title"><Copy message="contactTitle" /></h2><p><Copy message="contactIntro" /></p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a><div className="contact-links"><span>{profile.location[locale]}</span><a className="text-link" href={assetUrl(profile.cvAsset)} download><span><Copy message="downloadCv" /></span><span aria-hidden="true">↓</span></a></div></div>
    <div className="contact-tool">
      {!draft ? <form onSubmit={compose}>
        <div className="form-row"><div><label htmlFor="name"><Copy message="nameLabel" /></label><input id="name" name="name" autoComplete="name" maxLength={100} required value={name} onChange={event => setName(event.target.value)} placeholder={text('namePlaceholder')} /></div><div><label htmlFor="project-type"><Copy message="typeLabel" /></label><select id="project-type" name="type" value={type} onChange={event => setType(event.target.value as ContactType)}><option value="software"><Copy message="typeSoftware" /></option><option value="design"><Copy message="typeDesign" /></option><option value="finance"><Copy message="typeFinance" /></option><option value="other"><Copy message="typeOther" /></option></select></div></div>
        <label htmlFor="message"><Copy message="messageLabel" /></label><textarea ref={messageRef} id="message" name="message" rows={4} maxLength={1800} required value={message} onChange={event => setMessage(event.target.value)} placeholder={text('messagePlaceholder')} />
        <div className="form-bottom"><p><Copy message="draftHint" /></p><button className="button" type="submit"><span><Copy message="prepareEmail" /></span><span aria-hidden="true">↗</span></button></div>
      </form> : <div ref={previewRef} id="email-preview" tabIndex={-1}>
        <p className="field-label"><Copy message="draftReady" /></p><p className="email-subject">{draft.subject}</p><pre id="email-body" tabIndex={0}>{draft.body}</pre><div className="preview-actions"><a className="button" href={draft.href}><span><Copy message="openEmail" /></span><span aria-hidden="true">↗</span></a><button className="text-link" type="button" onClick={copyDraft}><Copy message="copyEmail" /></button><button className="text-link" type="button" onClick={() => { setDraftInput(null); requestAnimationFrame(() => messageRef.current?.focus({ preventScroll: true })); }}><Copy message="editEmail" /></button></div><p className="preview-note"><Copy message="emailNote" /></p>
      </div>}
    </div>
  </div><div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div></section>;
}
