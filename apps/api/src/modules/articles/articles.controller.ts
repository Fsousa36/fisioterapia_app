import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ImportersService } from "./importers/importers.service";

@Controller("articles")
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly importersService: ImportersService
  ) {}

  @Get()
  list(@Query("q") query?: string) {
    return this.articlesService.listPublished(query);
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.articlesService.detail(id);
  }

  @Post("imports/:source")
  importFromSource(@Param("source") source: string, @Query("q") query?: string) {
    return this.importersService.enqueueImport(source, query);
  }
}
