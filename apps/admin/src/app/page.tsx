import { Activity, Database, FileCheck, Search } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const queues = [
  { source: "PubMed", status: "Pronto", count: 0 },
  { source: "Europe PMC", status: "Pronto", count: 0 },
  { source: "SciELO", status: "Pronto", count: 0 },
  { source: "LILACS", status: "Pronto", count: 0 }
];

export default function AdminDashboard() {
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
        <StatCard label="Artigos em curadoria" value="0" detail="Aguardando revisao" />
        <StatCard label="Trilhas publicadas" value="0" detail="Disponiveis no app" />
        <StatCard label="Certificados emitidos" value="0" detail="Validacao publica ativa" />
        <StatCard label="Usuarios premium" value="0" detail="RevenueCat pendente" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-4 flex items-center gap-2 font-medium">
            <Database className="h-4 w-4" />
            Importadores cientificos
          </div>
          <div className="divide-y divide-border">
            {queues.map((queue) => (
              <div key={queue.source} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{queue.source}</div>
                  <div className="text-muted">{queue.status}</div>
                </div>
                <Button variant="secondary">Executar</Button>
              </div>
            ))}
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
              Revisar politicas de licenca por fonte.
            </div>
            <div className="flex gap-2">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              Criar primeira trilha de Ortopedia.
            </div>
            <div className="flex gap-2">
              <FileCheck className="mt-0.5 h-4 w-4 text-primary" />
              Configurar chaves de Google, Apple e RevenueCat.
            </div>
          </div>
        </Card>
      </section>
    </AdminShell>
  );
}
