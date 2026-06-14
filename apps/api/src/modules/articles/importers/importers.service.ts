import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

const allowedSources = new Set([
  "PUBMED",
  "EUROPE_PMC",
  "PUBMED_CENTRAL",
  "PEDRO",
  "COCHRANE",
  "SCIELO",
  "LILACS",
  "CLINICAL_TRIALS",
  "WHO"
]);

@Injectable()
export class ImportersService {
  constructor(@InjectQueue("article-imports") private readonly importsQueue: Queue) {}

  async enqueueImport(source: string, query = "physiotherapy") {
    const normalizedSource = source.toUpperCase().replaceAll("-", "_");

    if (!allowedSources.has(normalizedSource)) {
      throw new Error(`Unsupported scientific source: ${source}`);
    }

    const job = await this.importsQueue.add("import-articles", {
      source: normalizedSource,
      query
    });

    return {
      jobId: job.id,
      source: normalizedSource,
      query
    };
  }
}
