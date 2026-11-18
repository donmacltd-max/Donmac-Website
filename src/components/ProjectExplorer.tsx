'use client';
import { useMemo, useState } from 'react';
import { ProjectCard } from './Cards';
import type { Project } from '@/lib/types';

type Opt = { value: string; label: string };
export default function ProjectExplorer({ projects, units, industries, types, showSearch = true }: { projects: Project[]; units: Opt[]; industries: Opt[]; types: string[]; showSearch?: boolean }) {
  const [unit, setUnit] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState('');
  const [q, setQ] = useState('');
  const label = (opts: Opt[], v: string) => opts.find((o) => o.value === v)?.label ?? v;
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) =>
      (!unit || p.unit === unit) && (!industry || p.industry === industry) && (!type || p.type === type) &&
      (!needle || [p.title, p.client, p.location, p.summary, p.type].join(' ').toLowerCase().includes(needle)));
  }, [projects, unit, industry, type, q]);
  const sel = 'field h-12 py-0 pr-10 text-sm font-semibold';
  return (
    <div>
      <div className="grid gap-3 rounded-3xl border border-mist-line bg-mist p-4 sm:grid-cols-2 lg:grid-cols-4" role="search" aria-label="Filter projects">
        {showSearch && (
          <label className="sm:col-span-2 lg:col-span-1"><span className="sr-only">Search projects</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, clients, places" className="field h-12 py-0 text-sm" />
          </label>
        )}
        <label><span className="sr-only">Business division</span>
          <select className={sel} value={unit} onChange={(e) => setUnit(e.target.value)}><option value="">All business divisions</option>{units.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}</select>
        </label>
        <label><span className="sr-only">Industry</span>
          <select className={sel} value={industry} onChange={(e) => setIndustry(e.target.value)}><option value="">All industries</option>{industries.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}</select>
        </label>
        <label><span className="sr-only">Project type</span>
          <select className={sel} value={type} onChange={(e) => setType(e.target.value)}><option value="">All project types</option>{types.map((t) => <option key={t} value={t}>{t}</option>)}</select>
        </label>
      </div>
      <p className="mt-5 text-sm text-ink-mute" aria-live="polite">{list.length} {list.length === 1 ? 'project' : 'projects'} shown</p>
      <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (<li key={p.slug}><ProjectCard p={p} unitLabel={label(units, p.unit)} industryLabel={label(industries, p.industry)} /></li>))}
      </ul>
      {list.length === 0 && <p className="mt-8 rounded-2xl border border-dashed border-mist-line p-8 text-center text-ink-soft">No projects match these filters yet. Try clearing a filter.</p>}
    </div>
  );
}
