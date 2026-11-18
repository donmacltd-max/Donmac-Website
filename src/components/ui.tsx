import Link from 'next/link';
import Icon from './Icon';
import type { ReactNode } from 'react';

export function SectionHead({ eyebrow, title, text, align = 'left', dark = false, className = '' }: { eyebrow?: string; title: ReactNode; text?: ReactNode; align?: 'left' | 'center'; dark?: boolean; className?: string }) {
  return (
    <div className={`reveal ${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-4 text-h2 ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{text}</p>}
    </div>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow group ${className}`}>
      {children}
      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
    </Link>
  );
}

export function Circuit({ className = '' }: { className?: string }) {
  return (
    <svg className={`circuit pointer-events-none absolute ${className}`} viewBox="0 0 800 400" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M0 120h180l60 60h220l60-60h280" />
        <path d="M0 300h120l50-50h300l70 70h260" />
        <path d="M420 0v90l-40 40v160l40 40v70" />
      </g>
      <g fill="currentColor">
        <circle cx="240" cy="180" r="4" /><circle cx="520" cy="120" r="4" /><circle cx="170" cy="250" r="4" /><circle cx="540" cy="320" r="4" /><circle cx="380" cy="130" r="4" />
      </g>
    </svg>
  );
}

export function Breadcrumbs({ items, dark = true }: { items: { href?: string; label: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${dark ? 'text-white/60' : 'text-ink-mute'}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? <Link href={it.href} className={dark ? 'hover:text-white' : 'hover:text-brand-red'}>{it.label}</Link> : <span aria-current="page" className={dark ? 'text-white' : 'text-ink'}>{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
