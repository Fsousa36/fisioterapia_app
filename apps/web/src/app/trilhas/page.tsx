import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";

export default function TrilhasPage() {
  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-semibold">Trilhas de aprendizagem</h1>
      <p className="mb-6 text-sm text-muted">Modulos, licoes, artigos, quiz e avaliacao final.</p>
      <Card>
        <div className="py-6 text-sm text-muted">As trilhas publicadas aparecerao aqui.</div>
      </Card>
    </AppShell>
  );
}
