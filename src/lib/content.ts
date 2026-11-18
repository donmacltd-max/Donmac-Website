import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Article, Industry, Leader, Project, Unit, Vehicle } from './types';

const ROOT = path.join(process.cwd(), 'content');
const readJson = <T,>(rel: string): T => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) as T;
const readDir = <T,>(dir: string): T[] =>
  fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith('.json')).map((f) => readJson<T>(`${dir}/${f}`));

export const site = () => readJson<any>('settings/site.json');
export const company = () => readJson<any>('settings/company.json');
export const partners = () => readJson<any>('settings/partners.json');
export const industries = (): Industry[] => readJson<{ items: Industry[] }>('settings/industries.json').items;

export const units = (): Unit[] => readDir<Unit>('units').sort((a, b) => a.order - b.order);
export const principalUnits = () => units().filter((u) => !u.capability);
export const unit = (slug: string) => units().find((u) => u.slug === slug);

export const projects = (): Project[] => readDir<Project>('projects').sort((a, b) => a.order - b.order);
export const project = (slug: string) => projects().find((p) => p.slug === slug);

export const vehicles = (): Vehicle[] => readDir<Vehicle>('vehicles').sort((a, b) => a.order - b.order);
export const leaders = (): Leader[] => readDir<Leader>('leadership').sort((a, b) => a.order - b.order);

export const articles = (): Article[] =>
  fs.readdirSync(path.join(ROOT, 'insights'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(ROOT, 'insights', f), 'utf8'));
      return { slug: f.replace(/\.md$/, ''), ...(data as any), date: String(data.date), html: marked.parse(content) as string } as Article;
    })
    .filter((a) => !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
export const article = (slug: string) => articles().find((a) => a.slug === slug);

export const unitName = (slug: string) => units().find((u) => u.slug === slug)?.name ?? slug;
export const industryName = (slug: string) => industries().find((i) => i.slug === slug)?.short ?? slug;
