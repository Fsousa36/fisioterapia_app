import Link from "next/link";
import { BookOpenCheck, Compass, GraduationCap, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  _count: {
    articles: number;
    tracks: number;
    atlasTopics: number;
  };
};

type ArticleItem = {
  id: string;
  title: string;
  source: string;
  doi: string | null;
  pmid: string | null;
  editorialSummaryPt: string | null;
  category: { name: string } | null;
};

type TrackItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  isPremium: boolean;
  category: { name: string; slug: string };
  _count: {
    modules: number;
    certificates: number;
  };
};

type AtlasItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  clinicalArea: string;
  coverImageUrl: string | null;
  evidenceLevel: string;
  recommendation: string;
  tags: string[];
  _count: {
    clinicalQuestions: number;
    outcomes: number;
    interventions: number;
    articles: number;
    guidelines: number;
  };
};

const sourceFilters = [
  { label: "PubMed", value: "PUBMED" },
  { label: "Europe PMC", value: "EUROPE_PMC" },
  { label: "SciELO", value: "SCIELO" },
  { label: "LILACS", value: "LILACS" },
  { label: "Cochrane", value: "COCHRANE" },
  { label: "WHO", value: "WHO" }
];

function buildQueryPath(path: string, params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  return search.toString() ? `${path}?${search.toString()}` : path;
}

function buildHomeHref(params: { q?: string; category?: string; source?: string }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.source) search.set("source", params.source);
  return search.toString() ? `/?${search.toString()}` : "/";
}

async function getData(q: string, category: string, source: string) {
  const [categories, articles, tracks, atlas] = await Promise.all([
    apiGet<CategoryItem[]>("/learning/categories").catch(() => []),
    apiGet<ArticleItem[]>(buildQueryPath("/articles", { q, category, source })).catch(() => []),
    apiGet<TrackItem[]>("/learning/tracks").catch(() => []),
    apiGet<AtlasItem[]>(buildQueryPath("/atlas", { q, category })).catch(() => [])
  ]);

  return { categories, articles, tracks, atlas };
}

export default async function WebHome({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; category?: string; source?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const category = typeof params.category === "string" ? params.category.trim() : "";
  const source = typeof params.source === "string" ? params.source.trim() : "";
  const { categories, articles, tracks, atlas } = await getData(q, category, source);
  const totalStudyHours = Math.round(tracks.reduce((total, track) => total + track.estimatedMinutes, 0) / 60);
  const featuredAtlas = atlas[0] ?? null;

  const filteredTracks = q
    ? tracks.filter((track) =>
        [track.title, track.description, track.category.name, track.category.slug, track.slug]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    : tracks;
  const filteredTracksByCategory = category
    ? filteredTracks.filter((track) => track.category.slug === category)
    : filteredTracks;
  const featuredTrack = filteredTracksByCategory[0] ?? null;
  const categoryLabel = categories.find((item) => item.slug === category)?.name ?? "";

  return (
    <AppShell>
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Search className="h-4 w-4" />
                Biblioteca cientifica
              </div>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-semibold tracking-normal">
                  Pesquise artigos, diretrizes, atlas e trilhas de fisioterapia.
                </h1>
                <p className="max-w-2xl text-sm text-slate-700">
                  O banco traz fontes oficiais, curadoria e conteudo estruturado para estudo, consulta e navegacao
                  rapida no mobile e no web.
                </p>
              </div>
              <form className="flex max-w-2xl gap-2" method="get" action="/">
                {category ? <input type="hidden" name="category" value={category} /> : null}
                {source ? <input type="hidden" name="source" value={source} /> : null}
                <input
                  className="h-11 flex-1 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
                  placeholder="Buscar por tema, DOI, PMID, especialidade ou tag"
                  name="q"
                  defaultValue={q}
                />
                <button className="h-11 rounded-md bg-primary px-4 text-sm font-medium text-white" type="submit">
                  Buscar
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={buildHomeHref({ q, category: category.slug, source })}
                    className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                      params.category === category.slug
                        ? "border-primary bg-teal-50 text-primary"
                        : "border-border bg-slate-50"
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-wide text-muted">Fontes</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={buildHomeHref({ q, category })}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      source ? "border-border bg-white" : "border-primary bg-teal-50 text-primary"
                    }`}
                  >
                    Todas
                  </Link>
                  {sourceFilters.map((item) => (
                    <Link
                      key={item.value}
                      href={buildHomeHref({ q, category, source: item.value })}
                      className={`rounded-md border px-3 py-2 text-sm ${
                        source === item.value ? "border-primary bg-teal-50 text-primary" : "border-border bg-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="overflow-hidden p-0">
                <div className="relative min-h-52">
                  <img
                    alt={featuredAtlas?.title ?? "Atlas de fisioterapia"}
                    className="h-full w-full object-cover"
                    src={featuredAtlas?.coverImageUrl ?? "https://picsum.photos/seed/fisiobase-home/1200/720"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-white/80">
                      <Compass className="h-4 w-4" />
                      Atlas em destaque
                    </div>
                    <div className="text-lg font-semibold">{featuredAtlas?.title ?? "Sem atlas cadastrado"}</div>
                    <div className="mt-1 text-sm text-white/80">
                      {featuredAtlas?.clinicalArea ?? "Carregue o seed para ver os mapas clinicos"}
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="mb-3 flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Curadoria
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>Fontes oficiais, metadados completos e licenca registrada.</p>
                  <p>Conteudo publicado somente apos revisao.</p>
                  <p>Certificados com QR Code, codigo unico e pagina publica de validacao.</p>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-muted">Artigos carregados</div>
          <div className="mt-2 text-2xl font-semibold">{articles.length}</div>
          <p className="mt-2 text-sm text-slate-600">Metadados, fontes e identificadores no banco.</p>
        </Card>
        <Card>
          <div className="text-sm text-muted">Atlas clinicos</div>
          <div className="mt-2 text-2xl font-semibold">{atlas.length}</div>
          <p className="mt-2 text-sm text-slate-600">Topicos estruturados com PICO e evidencia.</p>
        </Card>
        <Card>
          <div className="text-sm text-muted">Tempo estudado</div>
          <div className="mt-2 text-2xl font-semibold">{totalStudyHours}h</div>
          <p className="mt-2 text-sm text-slate-600">Carga estimada das trilhas publicadas.</p>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <BookOpenCheck className="h-4 w-4 text-primary" />
            Artigos recentes publicados
          </div>
          <div className="space-y-3">
            {articles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                href={`/artigos/${article.id}`}
                className="block rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="text-sm font-medium">{article.title}</div>
                <div className="mt-1 text-xs text-muted">
                  {article.source} · {article.category?.name ?? "Sem categoria"} · {article.doi ?? article.pmid ?? "Sem identificador"}
                </div>
                {article.editorialSummaryPt ? <p className="mt-2 text-sm text-slate-700">{article.editorialSummaryPt}</p> : null}
              </Link>
            ))}
            {articles.length === 0 ? <div className="py-4 text-sm text-muted">Nenhum artigo encontrado para este filtro.</div> : null}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <GraduationCap className="h-4 w-4 text-primary" />
            Trilhas em destaque
          </div>
          <div className="space-y-3">
            {filteredTracksByCategory.slice(0, 5).map((track) => (
              <Link key={track.id} href="/trilhas" className="block rounded-md border border-border p-3">
                <div className="text-sm font-medium">{track.title}</div>
                <div className="mt-1 text-xs text-muted">
                  {track.category.name} · {track.estimatedMinutes} min · {track.isPremium ? "Premium" : "Livre"}
                </div>
              </Link>
            ))}
            {filteredTracksByCategory.length === 0 ? <div className="py-4 text-sm text-muted">Nenhuma trilha encontrada.</div> : null}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <Compass className="h-4 w-4 text-primary" />
            Atlas com imagens
          </div>
          <div className="grid gap-3">
            {atlas.slice(0, 4).map((topic) => (
              <Link key={topic.id} href={`/atlas/${topic.slug}`} className="overflow-hidden rounded-md border border-border">
                <div className="grid gap-0 md:grid-cols-[160px_1fr]">
                  <div className="min-h-36 bg-slate-100">
                    <img
                      alt={topic.title}
                      className="h-full w-full object-cover"
                      src={topic.coverImageUrl ?? `https://picsum.photos/seed/${topic.slug}/800/600`}
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold">{topic.title}</div>
                    <div className="mt-1 text-xs text-muted">{topic.clinicalArea}</div>
                    <p className="mt-2 text-sm text-slate-700">{topic.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
            {atlas.length === 0 ? <div className="py-4 text-sm text-muted">Nenhum atlas publicado ainda.</div> : null}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Panorama do banco
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="rounded-md border border-border bg-slate-50 p-3">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="mt-2 text-xs text-muted">
                  {category._count.articles} artigos · {category._count.tracks} trilhas · {category._count.atlasTopics} atlas
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {q ? (
        <div className="mt-6 text-sm text-muted">
          Resultados filtrados para <span className="font-medium text-slate-700">{q}</span>.
        </div>
      ) : null}
      {category ? (
        <div className="mt-2 text-sm text-muted">
          Categoria ativa: <span className="font-medium text-slate-700">{categoryLabel || category}</span>.
        </div>
      ) : null}
      {source ? (
        <div className="mt-2 text-sm text-muted">
          Fonte ativa: <span className="font-medium text-slate-700">{source}</span>.
        </div>
      ) : null}
      {featuredTrack ? (
        <div className="mt-4 text-sm text-muted">
          Trilha em foco: <span className="font-medium text-slate-700">{featuredTrack.title}</span>.
        </div>
      ) : null}
    </AppShell>
  );
}
