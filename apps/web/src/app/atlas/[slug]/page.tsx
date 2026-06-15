import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type AtlasDetail = {
  title: string;
  summary: string;
  clinicalArea: string;
  bodyRegion: string | null;
  population: string | null;
  coverImageUrl: string | null;
  illustrationUrls: string[];
  tags: string[];
  evidenceLevel: string;
  recommendation: string;
  clinicalQuestions: Array<{
    id: string;
    question: string;
    population: string;
    intervention: string;
    comparison: string | null;
    outcome: string;
    answerSummary: string | null;
    evidenceLevel: string;
  }>;
  outcomes: Array<{ id: string; name: string; description: string | null; measure: string | null }>;
  interventions: Array<{
    id: string;
    name: string;
    description: string | null;
    dosage: string | null;
    indication: string | null;
    contraindication: string | null;
    recommendation: string;
  }>;
  guidelines: Array<{ id: string; title: string; organization: string; url: string; year: number | null }>;
  articles: Array<{
    article: {
      id: string;
      title: string;
      source: string;
      sourceUrl: string;
      doi: string | null;
      pmid: string | null;
      pmcid: string | null;
      license: string | null;
    };
  }>;
};

export default async function AtlasDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await apiGet<AtlasDetail | null>(`/atlas/${slug}`).catch(() => null);

  if (!topic) {
    return (
      <AppShell>
        <Card>Topico nao encontrado.</Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-5">
        <Link href="/atlas" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao atlas
        </Link>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
          <div className="relative min-h-72">
            <img
              alt={topic.title}
              className="h-full w-full object-cover"
              src={topic.coverImageUrl ?? `https://picsum.photos/seed/${slug}/1200/720`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="mb-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-white/15 px-2 py-1">{topic.clinicalArea}</span>
                <span className="rounded-md bg-white/15 px-2 py-1">{topic.evidenceLevel}</span>
                <span className="rounded-md bg-white/15 px-2 py-1">{topic.recommendation}</span>
              </div>
              <h1 className="text-3xl font-semibold">{topic.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-white/85">{topic.summary}</p>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <BookOpenCheck className="h-4 w-4" />
                Resumo do topico
              </div>
              <p className="text-sm text-slate-700">{topic.summary}</p>
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <Info label="Regiao" value={topic.bodyRegion ?? "Nao definida"} />
              <Info label="Populacao" value={topic.population ?? "Nao definida"} />
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <span key={tag} className="rounded-md border border-border px-2 py-1 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="space-y-4">
          <Card>
            <h2 className="mb-4 text-lg font-semibold">Espaco para ilustracoes</h2>
            {topic.illustrationUrls.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {topic.illustrationUrls.map((imageUrl, index) => (
                  <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-md border border-border">
                    <img alt={`${topic.title} - ilustracao ${index + 1}`} className="h-52 w-full object-cover" src={imageUrl} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Sem imagens de apoio cadastradas para este topico.</p>
            )}
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">Perguntas PICO</h2>
            <div className="space-y-4">
              {topic.clinicalQuestions.map((item) => (
                <div key={item.id} className="rounded-md border border-border p-3">
                  <h3 className="font-medium">{item.question}</h3>
                  <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                    <Info label="P" value={item.population} />
                    <Info label="I" value={item.intervention} />
                    <Info label="C" value={item.comparison ?? "Nao definido"} />
                    <Info label="O" value={item.outcome} />
                  </dl>
                  {item.answerSummary ? <p className="mt-3 text-sm text-slate-700">{item.answerSummary}</p> : null}
                </div>
              ))}
              {topic.clinicalQuestions.length === 0 ? <p className="text-sm text-muted">Sem PICO cadastrado.</p> : null}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">Intervencoes</h2>
            <div className="space-y-3">
              {topic.interventions.map((item) => (
                <div key={item.id} className="rounded-md border border-border p-3 text-sm">
                  <div className="font-medium">{item.name}</div>
                  <p className="mt-1 text-slate-700">{item.description}</p>
                  <div className="mt-2 text-muted">Dose: {item.dosage ?? "Nao definida"}</div>
                  <div className="mt-1 text-muted">Indicacao: {item.indication ?? "Nao definida"}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold">Fontes vinculadas</h2>
            <div className="space-y-3">
              {topic.articles.map((item) => (
                <Link
                  key={item.article.id}
                  href={`/artigos/${item.article.id}`}
                  className="block rounded-md border border-border p-3 transition-colors hover:border-primary"
                >
                  <div className="text-sm font-medium">{item.article.title}</div>
                  <div className="mt-1 text-xs text-muted">
                    {item.article.source}
                    {item.article.doi ? ` · DOI ${item.article.doi}` : ""}
                    {item.article.pmid ? ` · PMID ${item.article.pmid}` : ""}
                    {item.article.pmcid ? ` · PMCID ${item.article.pmcid}` : ""}
                  </div>
                  {item.article.license ? <div className="mt-1 text-xs text-muted">{item.article.license}</div> : null}
                </Link>
              ))}
              {topic.articles.length === 0 ? <p className="text-sm text-muted">Sem artigos vinculados.</p> : null}
            </div>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Contexto clinico</h2>
            <div className="space-y-2 text-sm">
              <Info label="Regiao" value={topic.bodyRegion ?? "Nao definida"} />
              <Info label="Populacao" value={topic.population ?? "Nao definida"} />
            </div>
          </Card>
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Desfechos</h2>
            <div className="space-y-2 text-sm">
              {topic.outcomes.map((item) => (
                <Info key={item.id} label={item.name} value={item.measure ?? item.description ?? ""} />
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Diretrizes</h2>
            <div className="space-y-2 text-sm">
              {topic.guidelines.map((item) => (
                <a key={item.id} className="block text-primary underline" href={item.url}>
                  {item.title} - {item.organization}
                </a>
              ))}
              {topic.guidelines.length === 0 ? <p className="text-muted">Sem diretrizes vinculadas.</p> : null}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
