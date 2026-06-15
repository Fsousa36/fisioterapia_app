import Link from "next/link";
import { ArrowLeft, BookOpenCheck, ExternalLink, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type ArticleDetail = {
  id: string;
  title: string;
  abstract: string | null;
  editorialSummaryPt: string | null;
  authors: string[];
  journal: string | null;
  publicationDate: string | null;
  language: string | null;
  source: string;
  sourceUrl: string;
  doi: string | null;
  pmid: string | null;
  pmcid: string | null;
  license: string | null;
  openAccess: boolean;
  status: string;
  category: { name: string; slug: string } | null;
  atlasLinks: Array<{
    atlasTopic: {
      id: string;
      slug: string;
      title: string;
      summary: string;
      clinicalArea: string;
      coverImageUrl: string | null;
    };
  }>;
};

function formatDate(value: string | null) {
  if (!value) return "Nao informada";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await apiGet<ArticleDetail | null>(`/articles/${id}`).catch(() => null);

  if (!article) {
    return (
      <AppShell>
        <Card>Artigo nao encontrado.</Card>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-5">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Voltar para a biblioteca
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="space-y-5">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <BookOpenCheck className="h-4 w-4" />
            Detalhe do artigo
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-teal-50 px-2 py-1 text-primary">{article.source}</span>
              {article.category ? <span className="rounded-md bg-slate-100 px-2 py-1">{article.category.name}</span> : null}
              <span className="rounded-md bg-slate-100 px-2 py-1">{article.status}</span>
              <span className="rounded-md bg-slate-100 px-2 py-1">{article.openAccess ? "Open access" : "Acesso restrito"}</span>
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-normal">{article.title}</h1>
            <p className="text-sm text-muted">
              {article.journal ?? "Periodico nao informado"} · {formatDate(article.publicationDate)} · {article.language ?? "Idioma nao informado"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Autores" value={article.authors.length > 0 ? article.authors.join(", ") : "Nao informados"} />
            <Info label="Licenca" value={article.license ?? "Nao informada"} />
            <Info label="DOI" value={article.doi ?? "Nao informado"} />
            <Info label="PMID / PMCID" value={`${article.pmid ?? "—"} / ${article.pmcid ?? "—"}`} />
          </div>

          <div className="rounded-md border border-border bg-teal-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Leitura editorial em portugues
            </div>
            <p className="text-sm leading-6 text-slate-800">
              {article.editorialSummaryPt ??
                "Resumo editorial indisponivel. O artigo pode ser avaliado a partir dos metadados, da fonte original e do link oficial abaixo."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-800">Resumo original</div>
            <p className="text-sm leading-6 text-slate-700">
              {article.abstract ?? "Resumo indisponivel para este registro."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir fonte original
            </a>
            {article.category ? (
              <Link
                href={`/?category=${encodeURIComponent(article.category.slug)}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium"
              >
                Ver mais da categoria
              </Link>
            ) : null}
          </div>
        </Card>

        <aside className="space-y-4">
          <Card>
            <div className="mb-3 text-lg font-semibold">Curadoria</div>
            <div className="space-y-2 text-sm text-slate-700">
              <p>Fonte original preservada.</p>
              <p>Resumo em portugues para leitura rapida e estudo.</p>
              <p>Identificadores e licenca mantidos no registro.</p>
            </div>
          </Card>

          <Card>
            <div className="mb-3 text-lg font-semibold">Atlas vinculado</div>
            <div className="space-y-3">
              {article.atlasLinks.map((item) => (
                <Link
                  key={item.atlasTopic.id}
                  href={`/atlas/${item.atlasTopic.slug}`}
                  className="block overflow-hidden rounded-md border border-border transition-colors hover:border-primary"
                >
                  <div className="grid gap-0 sm:grid-cols-[120px_1fr]">
                    <div className="min-h-28 bg-slate-100">
                      <img
                        alt={item.atlasTopic.title}
                        className="h-full w-full object-cover"
                        src={item.atlasTopic.coverImageUrl ?? `https://picsum.photos/seed/${item.atlasTopic.slug}/800/600`}
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-medium">{item.atlasTopic.title}</div>
                      <div className="mt-1 text-xs text-muted">{item.atlasTopic.clinicalArea}</div>
                      <p className="mt-2 text-sm text-slate-700">{item.atlasTopic.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {article.atlasLinks.length === 0 ? <p className="text-sm text-muted">Sem vinculo com Atlas.</p> : null}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-slate-50 p-3">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="mt-1 text-sm text-slate-800">{value}</div>
    </div>
  );
}
