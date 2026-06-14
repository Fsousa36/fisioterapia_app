import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { ImportersService } from "./importers/importers.service";

@Module({
  imports: [BullModule.registerQueue({ name: "article-imports" })],
  controllers: [ArticlesController],
  providers: [ArticlesService, ImportersService]
})
export class ArticlesModule {}
