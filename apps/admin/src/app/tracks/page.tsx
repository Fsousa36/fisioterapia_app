"use client";

import { AdminShell } from "@/components/admin-shell";
import { AdminCrud, type CrudField } from "@/components/admin-crud";

const fields: CrudField[] = [
  { name: "title", label: "Titulo", required: true },
  { name: "slug", label: "Slug" },
  { name: "categoryId", label: "ID da categoria", required: true },
  { name: "estimatedMinutes", label: "Minutos estimados", type: "number" },
  { name: "isPremium", label: "Premium", type: "checkbox" },
  { name: "published", label: "Publicado", type: "checkbox" },
  { name: "description", label: "Descricao", type: "textarea", required: true }
];

export default function TracksPage() {
  return (
    <AdminShell>
      <AdminCrud
        title="Trilhas"
        description="Modulos, licoes, artigos, quiz e avaliacao final."
        endpoint="/admin/tracks"
        fields={fields}
        createLabel="Criar trilha"
        columns={[
          { key: "title", label: "Titulo" },
          { key: "category.name", label: "Categoria" },
          { key: "estimatedMinutes", label: "Minutos" },
          { key: "isPremium", label: "Premium", render: (row) => (row.isPremium ? "Sim" : "Nao") },
          { key: "publishedAt", label: "Publicado", render: (row) => (row.publishedAt ? "Sim" : "Nao") }
        ]}
      />
    </AdminShell>
  );
}
