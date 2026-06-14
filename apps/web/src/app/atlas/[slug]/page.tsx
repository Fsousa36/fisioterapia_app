import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type AtlasDetail = {
  title: string;
  summary: string;
  clinicalArea: string;
  bodyRegion: string | null;
  population: string | null;
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
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md bg-teal-50 px-2 py-1 text-primary">{topic.clinicalArea}</span>
          <span className="rounded-md bg-blue-50 px-2 py-1 text-accent">{topic.evidenceLevel}</span>
          <span className="rounded-md bg-slate-100 px-2 py-1">{topic.recommendation}</span>
        </div>
        <h1 className="text-3xl font-semibold">{topic.title}</h1>
        <p className="mt-3 max-w-4xl text-slate-700">{topic.summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="space-y-4">
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
                </div>
              ))}
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
