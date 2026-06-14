import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { BullModule } from "@nestjs/bullmq";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminModule } from "./modules/admin/admin.module";
import { ArticlesModule } from "./modules/articles/articles.module";
import { AtlasModule } from "./modules/atlas/atlas.module";
import { CertificatesModule } from "./modules/certificates/certificates.module";
import { HealthModule } from "./modules/health/health.module";
import { LearningModule } from "./modules/learning/learning.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ProgressModule } from "./modules/progress/progress.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    BullModule.forRoot({
      connection: {
        url: process.env.REDIS_URL ?? "redis://localhost:6379"
      }
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    AdminModule,
    ArticlesModule,
    AtlasModule,
    LearningModule,
    ProgressModule,
    CertificatesModule
  ]
})
export class AppModule {}
