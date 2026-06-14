import { Controller, Get, Param } from "@nestjs/common";
import { LearningService } from "./learning.service";

@Controller("learning")
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get("categories")
  categories() {
    return this.learningService.categories();
  }

  @Get("tracks")
  tracks() {
    return this.learningService.tracks();
  }

  @Get("tracks/:slug")
  track(@Param("slug") slug: string) {
    return this.learningService.track(slug);
  }
}
