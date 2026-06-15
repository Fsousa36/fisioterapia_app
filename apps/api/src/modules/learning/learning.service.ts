import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  categories() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            articles: true,
            tracks: true,
            atlasTopics: true
          }
        }
      },
      orderBy: { name: "asc" }
    });
  }

  tracks() {
    return this.prisma.learningTrack.findMany({
      where: { publishedAt: { not: null } },
      include: {
        category: true,
        modules: {
          include: {
            lessons: {
              include: {
                quizzes: true,
                articles: true
              }
            }
          }
        },
        _count: {
          select: {
            modules: true,
            certificates: true
          }
        }
      },
      orderBy: [{ isPremium: "asc" }, { createdAt: "desc" }]
    });
  }

  track(slug: string) {
    return this.prisma.learningTrack.findUnique({
      where: { slug },
      include: {
        category: true,
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              include: { articles: { include: { article: true } }, quizzes: true }
            }
          }
        }
      }
    });
  }
}
