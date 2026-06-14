import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  listPublished(query?: string) {
    return this.prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { abstract: { contains: query, mode: "insensitive" } }
              ]
            }
          : {})
      },
      include: { category: true },
      orderBy: { publicationDate: "desc" },
      take: 50
    });
  }

  detail(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { category: true }
    });
  }
}
