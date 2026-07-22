import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const languageCopy = z.object({
  code: z.string(),
  nativeName: z.string(),
  locale: z.string(),
  pageTitle: z.string(),
  metaDescription: z.string(),
  siteLabel: z.string(),
  eyebrow: z.string(),
  role: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(1),
  linkedin: z.string(),
  contactJump: z.string(),
  basedIn: z.string(),
  locationHtml: z.string(),
  contactEyebrow: z.string(),
  contactTitle: z.string(),
  contactText: z.string(),
  nameLabel: z.string(),
  emailLabel: z.string(),
  messageLabel: z.string(),
  namePlaceholder: z.string(),
  emailPlaceholder: z.string(),
  messagePlaceholder: z.string(),
  secureNote: z.string(),
  setupNote: z.string(),
  send: z.string(),
  sending: z.string(),
  success: z.string(),
  error: z.string(),
});

const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '**/*.yaml' }),
  schema: z.object({
    name: z.string(),
    photo: z.string(),
    linkedinUrl: z.string().url(),
    siteUrl: z.string().url(),
    languages: z.object({
      en: languageCopy,
      es: languageCopy,
      de: languageCopy,
    }),
  }),
});

export const collections = { profile };
