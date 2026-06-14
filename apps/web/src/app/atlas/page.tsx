import Link from "next/link";
import { Activity, BadgeCheck, BookOpenCheck, Filter, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type AtlasTopic = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  clinicalArea: string;
  bodyRegion: string | null;
  population: string | null;
  tags: string[];
  evidenceLevel: string;
  recommendation: string;
  _count: {
    clinicalQuestions: number;
    outcomes: number;
    interventions: number;
    articles: number;
    guidelines: number;
  };
};

async function getTopics() {
  try {
    return await apiGet<AtlasTopic[]>("/atlas");
  } catch {
    return [];
  }
}

export default async function AtlasPage() {
  const topics = await getTopics();

  return (
    <AppShell>
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
            <BookOpenCheck className="h-4 w-4" />
            Atlas de Pesquisa em Fisioterapia
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold">
            Mapas clinicos com perguntas PICO, desfechos, intervencoes e evidencias rastreaveis.
          </h1>
          <div className="mt-5 grid gap-2 md:grid-cols-[1fr_180px_120px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <input
                className="h-10 w-full rounded-md border border-border pl-9 pr-3 text-sm outline-none focus:border-primary"
                placeholder="Buscar condicao, intervencao, desfecho ou tag"
              />
            </div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-white text-sm">
              <Filter className="h-4 w-4" />
              Filtros
            </button>
            <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-white">Buscar</button>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Padrao de referencia
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>PICO estruturado para cada pergunta clinica.</p>
            <p>Nivel de evidencia e forca de recomendacao explicitos.</p>
            <p>Fonte original, DOI/PMID/PMCID/licenca preservados nos artigos vinculados.</p>
          </div>
        </Card>
      </div>

      <section className="grid gap-4">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/atlas/${topic.slug}`}>
            <Card className="transition-colors hover:border-primary">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-md bg-teal-50 px-2 py-1 text-primary">{topic.clinicalArea}</span>
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-accent">{topic.evidenceLevel}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-1">{topic.recommendation}</span>
                  </div>
                  <h2 className="text-xl font-semibold">{topic.title}</h2>
                  <p className="mt-2 max-w-4xl text-sm text-slate-700">{topic.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topic.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-border px-2 py-1 text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid min-w-56 grid-cols-2 gap-2 text-sm">
                  <Metric label="PICO" value={topic._count.clinicalQuestions} />
                  <Metric label="Desfechos" value={topic._count.outcomes} />
                  <Metric label="Interv." value={topic._count.interventions} />
                  <Metric label="Refs." value={topic._count.articles + topic._count.guidelines} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {topics.length === 0 ? (
          <Card>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Activity className="h-4 w-4" />
              Sem topicos no Atlas ainda. Rode a API, migre o banco e execute o seed.
            </div>
          </Card>
        ) : null}
      </section>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-slate-50 p-2">
      <div className="text-xs text-muted">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
