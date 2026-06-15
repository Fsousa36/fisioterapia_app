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
  coverImageUrl: string | null;
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

type AtlasFacets = {
  clinicalAreas: string[];
  bodyRegions: string[];
  evidenceLevels: string[];
  tags: string[];
};

function queryPath(path: string, params: { q?: string; area?: string }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.area) search.set("area", params.area);
  return search.toString() ? `${path}?${search.toString()}` : path;
}

async function getTopics(q: string, area: string) {
  try {
    return await apiGet<AtlasTopic[]>(queryPath("/atlas", { q, area }));
  } catch {
    return [];
  }
}

async function getFacets() {
  try {
    return await apiGet<AtlasFacets>("/atlas/facets");
  } catch {
    return { clinicalAreas: [], bodyRegions: [], evidenceLevels: [], tags: [] };
  }
}

export default async function AtlasPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; area?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const area = typeof params.area === "string" ? params.area.trim() : "";
  const [topics, facets] = await Promise.all([getTopics(q, area), getFacets()]);

  return (
    <AppShell>
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
            <BookOpenCheck className="h-4 w-4" />
            Atlas de Pesquisa em Fisioterapia
          </div>
          <h1 className="max-w-3xl text-3xl font-semibold">
            Mapas clinicos com perguntas PICO, desfechos, intervencoes, imagens e evidencias rastreaveis.
          </h1>
          <form className="mt-5 grid gap-2 md:grid-cols-[1fr_180px_120px]" method="get" action="/atlas">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <input
                className="h-10 w-full rounded-md border border-border pl-9 pr-3 text-sm outline-none focus:border-primary"
                placeholder="Buscar condicao, intervencao, desfecho ou tag"
                name="q"
                defaultValue={q}
              />
            </div>
            <select
              className="h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
              name="area"
              defaultValue={area}
            >
              <option value="">Todas as areas</option>
              {facets.clinicalAreas.map((clinicalArea) => (
                <option key={clinicalArea} value={clinicalArea}>
                  {clinicalArea}
                </option>
              ))}
            </select>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-white">
              <Filter className="h-4 w-4" />
              Buscar
            </button>
          </form>
          {q || area ? (
            <div className="mt-4 text-sm text-muted">
              Filtro ativo: {q ? <span className="font-medium text-slate-700">{q}</span> : null}
              {q && area ? " / " : null}
              {area ? <span className="font-medium text-slate-700">{area}</span> : null}
            </div>
          ) : null}
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Padrao de referencia
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>PICO estruturado para cada pergunta clinica.</p>
            <p>Nivel de evidencia e forca de recomendacao explicitos.</p>
            <p>Fonte original, DOI/PMID/PMCID e licenca preservados nos artigos vinculados.</p>
          </div>
        </Card>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {facets.clinicalAreas.slice(0, 8).map((facet) => (
          <Link
            key={facet}
            className={`rounded-md border px-3 py-2 text-sm ${
              area === facet ? "border-primary bg-teal-50 text-primary" : "border-border bg-white"
            }`}
            href={`/atlas?area=${encodeURIComponent(facet)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
          >
            {facet}
          </Link>
        ))}
      </div>

      <section className="grid gap-4">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/atlas/${topic.slug}`}>
            <Card className="overflow-hidden p-0 transition-colors hover:border-primary">
              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                <div className="min-h-48 bg-slate-100">
                  <img
                    alt={topic.title}
                    className="h-full w-full object-cover"
                    src={topic.coverImageUrl ?? `https://picsum.photos/seed/${topic.slug}/800/600`}
                  />
                </div>
                <div className="flex flex-col justify-between gap-4 p-4">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-md bg-teal-50 px-2 py-1 text-primary">{topic.clinicalArea}</span>
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-accent">{topic.evidenceLevel}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-1">{topic.recommendation}</span>
                    </div>
                    <h2 className="text-xl font-semibold">{topic.title}</h2>
                    <p className="mt-2 max-w-4xl text-sm text-slate-700">{topic.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-border px-2 py-1 text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid min-w-56 grid-cols-2 gap-2 text-sm md:max-w-lg">
                    <Metric label="PICO" value={topic._count.clinicalQuestions} />
                    <Metric label="Desfechos" value={topic._count.outcomes} />
                    <Metric label="Interv." value={topic._count.interventions} />
                    <Metric label="Refs." value={topic._count.articles + topic._count.guidelines} />
                  </div>
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
