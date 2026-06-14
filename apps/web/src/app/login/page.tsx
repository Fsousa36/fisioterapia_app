import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";

export default function LoginPage() {
  return (
    <AppShell>
      <Card className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <div className="mt-4 space-y-3">
          <input className="h-10 w-full rounded-md border border-border px-3 text-sm" placeholder="Email" />
          <input className="h-10 w-full rounded-md border border-border px-3 text-sm" placeholder="Senha" type="password" />
          <button className="h-10 w-full rounded-md bg-primary text-sm font-medium text-white">Entrar</button>
          <button className="h-10 w-full rounded-md border border-border text-sm">Continuar com Google</button>
          <button className="h-10 w-full rounded-md border border-border text-sm">Continuar com Apple</button>
        </div>
      </Card>
    </AppShell>
  );
}
