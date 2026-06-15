import Link from "next/link";
import { BookOpenCheck, GraduationCap, Search, ShieldCheck } from "lucide-react";
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
  category: { name: string } | null;
};

type TrackItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  isPremium: boolean;
  category: { name: string };
  _count: {
    modules: number;
    certificates: number;
  };
};

async function getData() {
  const [categories, articles, tracks] = await Promise.all([
    apiGet<CategoryItem[]>("/learning/categories").catch(() => []),
    apiGet<ArticleItem[]>("/articles").catch(() => []),
    apiGet<TrackItem[]>("/learning/tracks").catch(() => [])
  ]);

  return { categories, articles, tracks };
}

export default async function WebHome() {
  const { categories, articles, tracks } = await getData();
  const totalStudyHours = Math.round(tracks.reduce((total, track) => total + track.estimatedMinutes, 0) / 60);

  return (
    <AppShell>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="min-h-[280px]">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Search className="h-4 w-4" />
            Biblioteca cientifica
          </div>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-normal">
            Pesquise artigos, diretrizes e trilhas de fisioterapia.
          </h1>
          <div className="mt-6 flex max-w-2xl gap-2">
            <input
              className="h-11 flex-1 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
              placeholder="Buscar por tema, DOI, PMID ou especialidade"
            />
            <button className="h-11 rounded-md bg-primary px-4 text-sm font-medium text-white">
              Buscar
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category.id} className="rounded-md border border-border bg-slate-50 px-3 py-2 text-sm">
                {category.name}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Curadoria
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>Fontes oficiais, metadados completos e licenca registrada.</p>
            <p>Conteudo publicado somente apos revisao.</p>
            <p>Certificados com QR Code e codigo unico.</p>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-muted">Progresso</div>
          <div className="mt-2 text-2xl font-semibold">Biblioteca ativa</div>
          <div className="mt-3 h-2 rounded-full bg-slate-200">
            <div className="h-2 w-3/4 rounded-full bg-primary" />
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted">Trilhas ativas</div>
          <div className="mt-2 text-2xl font-semibold">{tracks.length}</div>
          <p className="mt-2 text-sm text-slate-600">Ja publicadas para estudo no navegador.</p>
        </Card>
        <Card>
          <div className="text-sm text-muted">Tempo estudado</div>
          <div className="mt-2 text-2xl font-semibold">{totalStudyHours}h</div>
          <p className="mt-2 text-sm text-slate-600">Carga estimada das trilhas publicadas.</p>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <BookOpenCheck className="h-4 w-4 text-primary" />
            Artigos recentes publicados
          </div>
          <div className="space-y-3">
            {articles.slice(0, 6).map((article) => (
              <div key={article.id} className="rounded-md border border-border p-3">
                <div className="text-sm font-medium">{article.title}</div>
                <div className="mt-1 text-xs text-muted">
                  {article.source} · {article.category?.name ?? "Sem categoria"} · {article.doi ?? article.pmid ?? "Sem identificador"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <GraduationCap className="h-4 w-4 text-primary" />
            Trilhas em destaque
          </div>
          <div className="space-y-3">
            {tracks.slice(0, 5).map((track) => (
              <Link key={track.id} href="/trilhas" className="block rounded-md border border-border p-3">
                <div className="text-sm font-medium">{track.title}</div>
                <div className="mt-1 text-xs text-muted">
                  {track.category.name} · {track.estimatedMinutes} min · {track.isPremium ? "Premium" : "Livre"}
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
