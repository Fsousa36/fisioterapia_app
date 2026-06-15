import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AtlasService } from "./atlas.service";

@Controller("atlas")
export class AtlasController {
  constructor(private readonly atlasService: AtlasService) {}

  @Get()
  list(@Query("q") query?: string, @Query("area") area?: string, @Query("category") category?: string) {
    return this.atlasService.list(query, area, category);
  }

  @Get("facets")
  facets() {
    return this.atlasService.facets();
  }

  @Get(":slug")
  detail(@Param("slug") slug: string) {
    return this.atlasService.detail(slug);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.atlasService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.atlasService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.atlasService.remove(id);
  }
}
