import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function optionalText(value: unknown) {
  const normalized = text(value);
  return normalized.length > 0 ? normalized : undefined;
}

function tags(value: unknown) {
  return text(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function csvList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => text(item)).filter(Boolean);
  }

  return text(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

@Injectable()
export class AtlasService {
  constructor(private readonly prisma: PrismaService) {}

  list(query?: string, area?: string, categorySlug?: string) {
    return this.prisma.atlasTopic.findMany({
      where: {
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { summary: { contains: query, mode: "insensitive" } },
                { clinicalArea: { contains: query, mode: "insensitive" } },
                { bodyRegion: { contains: query, mode: "insensitive" } },
                { population: { contains: query, mode: "insensitive" } },
                { tags: { has: query } }
              ]
            }
          : {}),
        ...(area ? { clinicalArea: { equals: area, mode: "insensitive" } } : {}),
        ...(categorySlug ? { category: { slug: categorySlug } } : {})
      },
      include: {
        category: true,
        _count: {
          select: {
            clinicalQuestions: true,
            outcomes: true,
            interventions: true,
            articles: true,
            guidelines: true
          }
        }
      },
      orderBy: [{ evidenceLevel: "desc" }, { updatedAt: "desc" }]
    });
  }

  async facets() {
    const topics = await this.prisma.atlasTopic.findMany({
      select: { clinicalArea: true, bodyRegion: true, tags: true, evidenceLevel: true }
    });

    return {
      clinicalAreas: [...new Set(topics.map((topic) => topic.clinicalArea).filter(Boolean))],
      bodyRegions: [...new Set(topics.map((topic) => topic.bodyRegion).filter(Boolean))],
      evidenceLevels: [...new Set(topics.map((topic) => topic.evidenceLevel))],
      tags: [...new Set(topics.flatMap((topic) => topic.tags))]
    };
  }

  detail(slug: string) {
    return this.prisma.atlasTopic.findUnique({
      where: { slug },
      include: {
        category: true,
        clinicalQuestions: true,
        outcomes: true,
        interventions: true,
        guidelines: true,
        articles: {
          include: {
            article: true
          }
        }
      }
    });
  }

  create(body: Record<string, unknown>) {
    const title = text(body.title);
    const summary = text(body.summary);
    const clinicalArea = text(body.clinicalArea);

    if (!title || !summary || !clinicalArea) {
      throw new BadRequestException("Title, summary and clinicalArea are required");
    }

    return this.prisma.atlasTopic.create({
      data: {
        title,
        slug: optionalText(body.slug) ?? slugify(title),
        summary,
        coverImageUrl: optionalText(body.coverImageUrl),
        illustrationUrls: csvList(body.illustrationUrls),
        clinicalArea,
        bodyRegion: optionalText(body.bodyRegion),
        population: optionalText(body.population),
        tags: tags(body.tags),
        evidenceLevel: text(body.evidenceLevel, "LOW") as never,
        recommendation: text(body.recommendation, "UNCERTAIN") as never,
        categoryId: optionalText(body.categoryId)
      } as never
    });
  }

  update(id: string, body: Record<string, unknown>) {
    return this.prisma.atlasTopic.update({
      where: { id },
      data: {
        title: optionalText(body.title),
        slug: optionalText(body.slug),
        summary: optionalText(body.summary),
        coverImageUrl: optionalText(body.coverImageUrl),
        illustrationUrls: body.illustrationUrls === undefined ? undefined : csvList(body.illustrationUrls),
        clinicalArea: optionalText(body.clinicalArea),
        bodyRegion: optionalText(body.bodyRegion),
        population: optionalText(body.population),
        tags: body.tags === undefined ? undefined : tags(body.tags),
        evidenceLevel: optionalText(body.evidenceLevel) as never,
        recommendation: optionalText(body.recommendation) as never,
        categoryId: optionalText(body.categoryId),
        lastReviewedAt: body.lastReviewedAt ? new Date(text(body.lastReviewedAt)) : undefined
      } as never
    });
  }

  remove(id: string) {
    return this.prisma.atlasTopic.delete({ where: { id }, select: { id: true } });
  }
}
