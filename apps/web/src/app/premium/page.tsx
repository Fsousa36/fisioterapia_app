import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";

const items = ["IA academica", "Flashcards", "Simulados", "Download offline"];

export default function PremiumPage() {
  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-semibold">Premium</h1>
      <p className="mb-6 text-sm text-muted">Recursos avancados para estudo e pratica baseada em evidencias.</p>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <Card key={item}>
            <div className="font-medium">{item}</div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
