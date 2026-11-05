import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string() });

/* Case study: satu file Markdown per project di src/content/work */
const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/work' }),
  schema: z.object({
    order: z.number(),
    status: z.enum(['featured', 'upnext']).default('featured'),
    title: z.string(),
    tags: z.array(z.string()),
    meta: z.string(),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string(), before: z.string().optional() }))
      .optional(),
    problem: z.string().optional(),
    action: z.string().optional(),
    outcome: z.string().optional(),
    summary: z.string().optional(),
    phase: z.string().optional(),
    tools: z.array(z.string()).default([]),
    links: z.array(link).default([]),
  }),
});

const reports = defineCollection({
  loader: file('src/data/reports.json'),
  schema: z.object({
    id: z.string(),
    file: z.string(),
    role: z.string(),
    date: z.string(),
    href: z.string(),
  }),
});

const credentials = defineCollection({
  loader: file('src/data/credentials.json'),
  schema: z.object({
    id: z.string(),
    issuer: z.string(),
    name: z.string(),
    status: z.string(),
    inProgress: z.boolean().default(false),
  }),
});

const rooms = defineCollection({
  loader: file('src/data/rooms.json'),
  schema: z.object({ id: z.string(), topic: z.string(), rooms: z.string() }),
});

const log = defineCollection({
  loader: file('src/data/log.json'),
  schema: z.object({ id: z.string(), date: z.string(), text: z.string() }),
});

const toolkit = defineCollection({
  loader: file('src/data/toolkit.json'),
  schema: z.object({ id: z.string(), group: z.string(), items: z.array(z.string()) }),
});

const roles = defineCollection({
  loader: file('src/data/roles.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    badge: z.string().optional(),
    primary: z.boolean().default(false),
    skills: z.string(),
    proof: z.string(),
  }),
});

export const collections = { work, reports, credentials, rooms, log, toolkit, roles };
