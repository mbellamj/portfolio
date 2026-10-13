export type IconName = 'code' | 'cash' | 'graduation' | 'certificate' | 'design' | 'mobile' | 'spark';

export function Icon({ name, className = 'profile-icon' }: { name: IconName; className?: string }) {
  return <span className={className} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
    {name === 'code' && <path d="M8 3H7a2 2 0 0 0-2 2v4c0 2-1 3-3 3 2 0 3 1 3 3v4a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v4c0 2 1 3 3 3-2 0-3 1-3 3v4a2 2 0 0 1-2 2h-1" />}
    {name === 'cash' && <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M2 9h2a2 2 0 0 0 2-2V5M18 5v2a2 2 0 0 0 2 2h2M2 15h2a2 2 0 0 1 2 2v2M18 19v-2a2 2 0 0 1 2-2h2" /></>}
    {name === 'graduation' && <path d="m2 9 10-5 10 5-10 5L2 9ZM6 11v5c3 4 9 4 12 0v-5M22 9v7" />}
    {name === 'certificate' && <><path d="M19 8V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4M7 6h8M7 10h4" /><circle cx="17" cy="15" r="4" /><path d="m14.5 18-1 5 3.5-2 3.5 2-1-5" /></>}
    {name === 'design' && <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8h20M8 8v12" /></>}
    {name === 'mobile' && <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>}
    {name === 'spark' && <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />}
  </svg></span>;
}
