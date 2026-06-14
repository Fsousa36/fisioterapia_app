"use client";

import { AdminShell } from "@/components/admin-shell";
import { AdminCrud, type CrudField } from "@/components/admin-crud";

const fields: CrudField[] = [
  { name: "name", label: "Nome", required: true },
  { name: "slug", label: "Slug" }
];

export default function CategoriesPage() {
  return (
    <AdminShell>
      <AdminCrud
        title="Categorias"
        description="Especialidades e areas usadas por artigos, trilhas e Atlas."
        endpoint="/admin/categories"
        fields={fields}
        createLabel="Criar categoria"
        columns={[
          { key: "name", label: "Nome" },
          { key: "slug", label: "Slug" },
          { key: "_count.articles", label: "Artigos" },
          { key: "_count.tracks", label: "Trilhas" }
        ]}
      />
    </AdminShell>
  );
}
