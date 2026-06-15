"use client";

import { AdminShell } from "@/components/admin-shell";
import { AdminCrud, type CrudField } from "@/components/admin-crud";

const sourceOptions = [
  "PUBMED",
  "EUROPE_PMC",
  "PUBMED_CENTRAL",
  "PEDRO",
  "COCHRANE",
  "SCIELO",
  "LILACS",
  "CLINICAL_TRIALS",
  "WHO"
].map((value) => ({ label: value, value }));

const statusOptions = ["DRAFT", "IN_REVIEW", "PUBLISHED", "REJECTED", "ARCHIVED"].map((value) => ({
  label: value,
  value
}));

const fields: CrudField[] = [
  { name: "title", label: "Titulo", required: true },
  { name: "source", label: "Fonte", type: "select", options: sourceOptions, required: true },
  { name: "status", label: "Status", type: "select", options: statusOptions },
  { name: "sourceUrl", label: "URL original", required: true },
  { name: "doi", label: "DOI" },
  { name: "pmid", label: "PMID" },
  { name: "pmcid", label: "PMCID" },
  { name: "license", label: "Licenca" },
  { name: "authors", label: "Autores separados por virgula" },
  { name: "journal", label: "Periodico" },
  { name: "language", label: "Idioma" },
  { name: "categoryId", label: "ID da categoria" },
  { name: "openAccess", label: "Open access", type: "checkbox" },
  { name: "editorialSummaryPt", label: "Resumo editorial em portugues", type: "textarea" },
  { name: "abstract", label: "Abstract", type: "textarea" }
];

export default function ArticlesPage() {
  return (
    <AdminShell>
      <AdminCrud
        title="Artigos"
        description="Metadados, licencas, identificadores e curadoria antes da publicacao."
        endpoint="/admin/articles"
        fields={fields}
        createLabel="Criar artigo"
        columns={[
          { key: "title", label: "Titulo" },
          { key: "source", label: "Fonte" },
          { key: "status", label: "Status" },
          { key: "doi", label: "DOI" },
          { key: "category.name", label: "Categoria" }
        ]}
      />
    </AdminShell>
  );
}
