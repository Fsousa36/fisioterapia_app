import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { ProgressService } from "./progress.service";

@Controller("progress")
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get(":userId")
  userProgress(@Param("userId") userId: string) {
    return this.progressService.userProgress(userId);
  }

  @Patch(":userId/lessons/:lessonId")
  updateLesson(
    @Param("userId") userId: string,
    @Param("lessonId") lessonId: string,
    @Body() body: { studiedSeconds?: number; completed?: boolean; grade?: number }
  ) {
    return this.progressService.updateLesson(userId, lessonId, body);
  }
}
