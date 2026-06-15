import { Activity, Database, FileCheck, Search } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiBaseUrl } from "@/lib/api";

type DashboardData = {
  pendingArticles: number;
  publishedTracks: number;
  certificatesIssued: number;
  premiumUsers: number;
  atlasTopics: number;
  articlesBySource: Array<{ source: string; count: number }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    articleCount: number;
    trackCount: number;
    atlasTopicCount: number;
  }>;
  imports: Array<{
    id: string;
    source: string;
    status: string;
    importedCount: number;
    skippedCount: number;
    startedAt: string;
  }>;
};

async function getDashboard() {
  const response = await fetch(`${apiBaseUrl}/admin/dashboard`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Nao foi possivel carregar o dashboard.");
  }

  return response.json() as Promise<DashboardData>;
}

export default async function AdminDashboard() {
  const dashboard = await getDashboard().catch(() => null);

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Operacao</h1>
          <p className="text-sm text-muted">Curadoria cientifica, trilhas e certificados.</p>
        </div>
        <Button>
          <Search className="h-4 w-4" />
          Nova importacao
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Artigos em curadoria"
          value={String(dashboard?.pendingArticles ?? 0)}
          detail="Aguardando revisao"
        />
        <StatCard
          label="Trilhas publicadas"
          value={String(dashboard?.publishedTracks ?? 0)}
          detail="Disponiveis no app"
        />
        <StatCard
          label="Certificados emitidos"
          value={String(dashboard?.certificatesIssued ?? 0)}
          detail="Validacao publica ativa"
        />
        <StatCard
          label="Usuarios premium"
          value={String(dashboard?.premiumUsers ?? 0)}
          detail="Assinaturas premium"
        />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <Database className="h-4 w-4" />
            Importadores cientificos
          </div>
          <div className="divide-y divide-border">
            {(dashboard?.articlesBySource ?? []).map((queue) => (
              <div key={queue.source} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{queue.source}</div>
                  <div className="text-muted">{queue.count} registros vinculados</div>
                </div>
                <Button variant="secondary">Executar</Button>
              </div>
            ))}
            {(dashboard?.articlesBySource ?? []).length === 0 ? (
              <div className="py-3 text-sm text-muted">Sem dados de importacao disponiveis.</div>
            ) : null}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <Activity className="h-4 w-4" />
            Proximas acoes
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              Revisar licencas, DOI/PMID/PMCID e status de curadoria dos artigos importados.
            </div>
            <div className="flex gap-2">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              Manter trilhas, Atlas e certificados sincronizados com a biblioteca cientifica.
            </div>
            <div className="flex gap-2">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              Configurar chaves de Google, Apple e RevenueCat para concluir o fluxo premium.
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 font-medium">Cobertura por categoria</div>
          <div className="space-y-3 text-sm">
            {(dashboard?.categories ?? []).map((item) => (
              <div key={item.id} className="grid grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] gap-2">
                <div className="font-medium">{item.name}</div>
                <div>{item.articleCount} artigos</div>
                <div>{item.trackCount} trilhas</div>
                <div>{item.atlasTopicCount} atlas</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="mb-4 font-medium">Ultimas importacoes</div>
          <div className="space-y-3 text-sm">
            {(dashboard?.imports ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-md border border-border p-3">
                <div>
                  <div className="font-medium">{item.source}</div>
                  <div className="text-muted">{item.status}</div>
                </div>
                <div className="text-right text-muted">
                  <div>{item.importedCount} importados</div>
                  <div>{item.skippedCount} ignorados</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AdminShell>
  );
}
