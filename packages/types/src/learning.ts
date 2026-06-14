import { z } from "zod";

export const categorySlugSchema = z.enum([
  "ortopedia",
  "neurologia",
  "cardiorrespiratoria",
  "pediatria",
  "geriatria",
  "esportiva",
  "saude-da-mulher",
  "terapia-manual"
]);

export const learningTrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  categorySlug: categorySlugSchema,
  moduleCount: z.number().int().nonnegative(),
  estimatedMinutes: z.number().int().nonnegative(),
  progressPercent: z.number().min(0).max(100).optional()
});

export type CategorySlug = z.infer<typeof categorySlugSchema>;
export type LearningTrack = z.infer<typeof learningTrackSchema>;
