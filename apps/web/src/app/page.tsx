import { Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";

const categories = [
  "Ortopedia",
  "Neurologia",
  "Cardiorrespiratoria",
  "Pediatria",
  "Geriatria",
  "Esportiva",
  "Saude da Mulher",
  "Terapia Manual"
];

export default function WebHome() {
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
              <span key={category} className="rounded-md border border-border bg-slate-50 px-3 py-2 text-sm">
                {category}
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
          <div className="mt-2 text-2xl font-semibold">0%</div>
          <div className="mt-3 h-2 rounded-full bg-slate-200">
            <div className="h-2 w-0 rounded-full bg-primary" />
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted">Trilhas ativas</div>
          <div className="mt-2 text-2xl font-semibold">0</div>
          <p className="mt-2 text-sm text-slate-600">Comece por uma especialidade.</p>
        </Card>
        <Card>
          <div className="text-sm text-muted">Tempo estudado</div>
          <div className="mt-2 text-2xl font-semibold">0h</div>
          <p className="mt-2 text-sm text-slate-600">Sincronizado com o app mobile.</p>
        </Card>
      </section>
    </AppShell>
  );
}
