import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  userProgress(userId: string) {
    return this.prisma.progress.findMany({
      where: { userId },
      include: { lesson: { include: { module: { include: { track: true } } } } }
    });
  }

  updateLesson(
    userId: string,
    lessonId: string,
    data: { studiedSeconds?: number; completed?: boolean; grade?: number }
  ) {
    return this.prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        studiedSeconds: data.studiedSeconds ?? 0,
        completed: data.completed ?? false,
        grade: data.grade,
        completedAt: data.completed ? new Date() : undefined
      },
      update: {
        studiedSeconds: data.studiedSeconds,
        completed: data.completed,
        grade: data.grade,
        completedAt: data.completed ? new Date() : undefined
      }
    });
  }
}
