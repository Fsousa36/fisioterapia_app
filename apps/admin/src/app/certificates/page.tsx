"use client";

import { useEffect, useState } from "react";
import { Ban, RotateCcw } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiBaseUrl } from "@/lib/api";

type Certificate = {
  id: string;
  code: string;
  status: string;
  issuedAt: string;
  user: { name: string | null; email: string };
  track: { title: string };
};

export default function CertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/admin/certificates`, { cache: "no-store" });
      if (!response.ok) throw new Error(await response.text());
      setItems(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Erro ao carregar certificados.");
    }
  }

  async function revoke(id: string) {
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/admin/certificates/${id}/revoke`, { method: "PATCH" });
      if (!response.ok) throw new Error(await response.text());
      await load();
    } catch (revokeError) {
      setError(revokeError instanceof Error ? revokeError.message : "Erro ao revogar certificado.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Certificados</h1>
          <p className="text-sm text-muted">PDF, QR Code, codigo unico e validacao publica.</p>
        </div>
        <Button variant="secondary" onClick={load}>
          <RotateCcw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>

      {error ? <pre className="mb-4 whitespace-pre-wrap rounded-md bg-red-50 p-3 text-xs text-red-700">{error}</pre> : null}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-2 py-3">Codigo</th>
                <th className="px-2 py-3">Usuario</th>
                <th className="px-2 py-3">Trilha</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Emissao</th>
                <th className="px-2 py-3">Acao</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="px-2 py-3">{item.code}</td>
                  <td className="px-2 py-3">{item.user.name ?? item.user.email}</td>
                  <td className="px-2 py-3">{item.track.title}</td>
                  <td className="px-2 py-3">{item.status}</td>
                  <td className="px-2 py-3">{new Date(item.issuedAt).toLocaleDateString("pt-BR")}</td>
                  <td className="px-2 py-3">
                    <Button variant="secondary" onClick={() => revoke(item.id)} disabled={item.status === "REVOKED"}>
                      <Ban className="h-4 w-4" />
                      Revogar
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-2 py-8 text-center text-muted">
                    Nenhum certificado emitido ainda.
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
