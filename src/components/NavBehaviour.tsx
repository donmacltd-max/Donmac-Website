'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Closes the mobile <details> menu and any focus-held dropdown after client-side navigation. */
export default function NavBehaviour() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>('details[data-nav]').forEach((d) => (d.open = false));
    const el = document.activeElement as HTMLElement | null;
    if (el && el.closest('[data-dropdown]')) el.blur();
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll<HTMLDetailsElement>('details[data-nav][open]').forEach((d) => (d.open = false));
      const el = document.activeElement as HTMLElement | null;
      if (el && el.closest('[data-dropdown]')) el.blur();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return null;
}
