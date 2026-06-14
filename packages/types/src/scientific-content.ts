import { z } from "zod";

export const scientificSourceSchema = z.enum([
  "PUBMED",
  "EUROPE_PMC",
  "PUBMED_CENTRAL",
  "PEDRO",
  "COCHRANE",
  "SCIELO",
  "LILACS",
  "CLINICAL_TRIALS",
  "WHO"
]);

export const articleStatusSchema = z.enum([
  "DRAFT",
  "IN_REVIEW",
  "PUBLISHED",
  "REJECTED",
  "ARCHIVED"
]);

export const articleSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  abstract: z.string().nullable(),
  source: scientificSourceSchema,
  sourceUrl: z.string().url(),
  doi: z.string().nullable(),
  pmid: z.string().nullable(),
  pmcid: z.string().nullable(),
  license: z.string().nullable(),
  status: articleStatusSchema
});

export type ScientificSource = z.infer<typeof scientificSourceSchema>;
export type ArticleStatus = z.infer<typeof articleStatusSchema>;
export type ArticleSummary = z.infer<typeof articleSummarySchema>;
