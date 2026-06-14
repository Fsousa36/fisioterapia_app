import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  categories() {
    return this.prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  tracks() {
    return this.prisma.learningTrack.findMany({
      include: { category: true, modules: true },
      orderBy: { createdAt: "desc" }
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
