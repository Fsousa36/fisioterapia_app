import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  listPublished(query?: string, source?: string, categorySlug?: string, status?: string) {
    return this.prisma.article.findMany({
      where: {
        status: (status ?? "PUBLISHED") as never,
        ...(source ? { source: source as never } : {}),
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { abstract: { contains: query, mode: "insensitive" } },
                { doi: { contains: query, mode: "insensitive" } },
                { pmid: { contains: query, mode: "insensitive" } },
                { pmcid: { contains: query, mode: "insensitive" } },
                { authors: { has: query } }
              ]
            }
          : {})
      },
      include: { category: true },
      orderBy: { publicationDate: "desc" },
      take: 100
    });
  }

  detail(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  async summary() {
    const [publishedArticles, draftArticles, openAccessArticles, bySource, byCategory] = await Promise.all([
      this.prisma.article.count({ where: { status: "PUBLISHED" } }),
      this.prisma.article.count({ where: { status: { in: ["DRAFT", "IN_REVIEW"] } } }),
      this.prisma.article.count({ where: { status: "PUBLISHED", openAccess: true } }),
      this.prisma.article.groupBy({
        by: ["source"],
        _count: { _all: true },
        where: { status: "PUBLISHED" },
        orderBy: { _count: { source: "desc" } }
      }),
      this.prisma.category.findMany({
        select: { id: true, name: true, slug: true, _count: { select: { articles: true } } },
        orderBy: { name: "asc" }
      })
    ]);

    return {
      publishedArticles,
      draftArticles,
      openAccessArticles,
      bySource: bySource.map((item) => ({ source: item.source, count: item._count._all })),
      byCategory: byCategory.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        articleCount: item._count.articles
      }))
    };
  }
}
