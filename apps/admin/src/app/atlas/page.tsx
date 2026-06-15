"use client";

import { AdminShell } from "@/components/admin-shell";
import { AdminCrud, type CrudField } from "@/components/admin-crud";

const evidenceOptions = [
  "VERY_LOW",
  "LOW",
  "MODERATE",
  "HIGH"
].map((value) => ({ label: value, value }));

const recommendationOptions = [
  "AGAINST",
  "WEAK_AGAINST",
  "UNCERTAIN",
  "WEAK_FOR",
  "STRONG_FOR"
].map((value) => ({ label: value, value }));

const fields: CrudField[] = [
  { name: "title", label: "Titulo", required: true },
  { name: "slug", label: "Slug" },
  { name: "clinicalArea", label: "Area clinica", required: true },
  { name: "bodyRegion", label: "Regiao corporal" },
  { name: "population", label: "Populacao" },
  { name: "tags", label: "Tags separadas por virgula" },
  { name: "evidenceLevel", label: "Nivel de evidencia", type: "select", options: evidenceOptions },
  { name: "recommendation", label: "Recomendacao", type: "select", options: recommendationOptions },
  { name: "summary", label: "Resumo clinico", type: "textarea", required: true },
  { name: "coverImageUrl", label: "Imagem de capa" },
  { name: "illustrationUrls", label: "Imagens separadas por virgula" }
];

export default function AtlasAdminPage() {
  return (
    <AdminShell>
      <AdminCrud
        title="Atlas de Pesquisa"
        description="Topicos estruturados com PICO, evidencia, recomendacao, intervencoes e fontes."
        endpoint="/atlas"
        fields={fields}
        createLabel="Criar topico"
        columns={[
          { key: "title", label: "Topico" },
          { key: "clinicalArea", label: "Area" },
          { key: "evidenceLevel", label: "Evidencia" },
          { key: "recommendation", label: "Recomendacao" },
          { key: "coverImageUrl", label: "Imagem", render: (row) => (row.coverImageUrl ? "Sim" : "Nao") },
          {
            key: "_count",
            label: "Conteudo",
            render: (row) =>
              `${row._count?.clinicalQuestions ?? 0} PICO / ${row._count?.interventions ?? 0} interv. / ${
                row._count?.articles ?? 0
              } refs.`
          }
        ]}
      />
    </AdminShell>
  );
}
