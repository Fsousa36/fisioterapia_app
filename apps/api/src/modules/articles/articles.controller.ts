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
  list(
    @Query("q") query?: string,
    @Query("source") source?: string,
    @Query("category") category?: string,
    @Query("status") status?: string
  ) {
    return this.articlesService.listPublished(query, source, category, status);
  }

  @Get("meta/summary")
  summary() {
    return this.articlesService.summary();
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
