import { z } from 'zod';

const localizedText = z.object({ fr: z.string(), en: z.string() });
const localizedLines = z.object({ fr: z.array(z.string()), en: z.array(z.string()) });
const id = z.string().min(1);
const publicAsset = z.union([
  z.string().regex(/^assets\/[a-zA-Z0-9_./-]+$/),
  z.url({ protocol: /^https?$/ }),
]);

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string().min(1), email: z.email(), location: localizedText,
    eyebrow: localizedText, bio: localizedText, cvAsset: publicAsset,
  }),
  highlights: z.array(z.object({
    id, icon: z.enum(['code', 'cash', 'graduation', 'certificate']),
    value: localizedText.nullable(), description: localizedLines,
  })).min(1),
  skills: z.array(z.object({
    id, eyebrow: z.string(), title: localizedText, description: localizedText,
    technologies: z.array(z.string()),
  })),
  experiences: z.array(z.object({
    id, category: z.enum(['engineering', 'finance']), current: z.boolean(),
    dates: localizedText, location: z.string(), company: z.string(), role: localizedText,
    summary: localizedText, contributions: localizedLines, technologies: z.array(localizedText),
  })),
  freelance: z.array(z.object({
    id, icon: z.enum(['design', 'mobile', 'spark']), eyebrow: z.string(),
    title: localizedText, description: localizedText,
  })),
  services: z.array(z.object({
    id: z.enum(['software', 'design', 'finance']), eyebrow: z.string(),
    title: localizedText, description: localizedText, cta: localizedText,
  })),
  education: z.array(z.object({ id, dates: localizedText, title: localizedText, description: localizedLines })),
});
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Experience = Portfolio['experiences'][number];
export type ServiceId = Portfolio['services'][number]['id'];
