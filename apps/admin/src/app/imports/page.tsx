import { AdminShell } from "@/components/admin-shell";
import { apiBaseUrl } from "@/lib/api";
import { Card } from "@/components/ui/card";

type ImportLog = {
  id: string;
  source: string;
  status: string;
  query: string | null;
  importedCount: number;
  skippedCount: number;
  errorMessage: string | null;
  startedAt: string;
  finishedAt: string | null;
};

async function getImportLogs() {
  const response = await fetch(`${apiBaseUrl}/admin/import-logs`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os logs de importacao.");
  }

  return response.json() as Promise<ImportLog[]>;
}

export default async function ImportsPage() {
  const logs = await getImportLogs().catch(() => []);

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Importacoes cientificas</h1>
        <p className="text-sm text-muted">Execucoes por fonte, consulta, status, volumes e erros de curadoria.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-2 py-3 font-medium">Fonte</th>
                <th className="px-2 py-3 font-medium">Consulta</th>
                <th className="px-2 py-3 font-medium">Status</th>
                <th className="px-2 py-3 font-medium">Importados</th>
                <th className="px-2 py-3 font-medium">Ignorados</th>
                <th className="px-2 py-3 font-medium">Inicio</th>
                <th className="px-2 py-3 font-medium">Erro</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100">
                  <td className="px-2 py-3">{log.source}</td>
                  <td className="px-2 py-3">{log.query ?? "-"}</td>
                  <td className="px-2 py-3">{log.status}</td>
                  <td className="px-2 py-3">{log.importedCount}</td>
                  <td className="px-2 py-3">{log.skippedCount}</td>
                  <td className="px-2 py-3">{new Date(log.startedAt).toLocaleString("pt-BR")}</td>
                  <td className="px-2 py-3 text-xs text-muted">{log.errorMessage ?? "-"}</td>
                </tr>
              ))}
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-2 py-8 text-center text-muted">
                    Nenhum log de importacao encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
