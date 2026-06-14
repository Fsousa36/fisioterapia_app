"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, Pencil, Plus, RotateCcw, Trash2, X } from "lucide-react";
import { apiBaseUrl } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FieldOption = {
  label: string;
  value: string;
};

export type CrudField = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: FieldOption[];
};

type AdminCrudProps = {
  title: string;
  description: string;
  endpoint: string;
  fields: CrudField[];
  columns: Array<{ key: string; label: string; render?: (row: any) => string }>;
  createLabel: string;
  deleteLabel?: string;
  refreshKey?: number;
};

function readPath(row: any, path: string) {
  return path.split(".").reduce((value, key) => value?.[key], row);
}

function emptyForm(fields: CrudField[]) {
  return fields.reduce<Record<string, string | boolean>>((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
}

export function AdminCrud({
  title,
  description,
  endpoint,
  fields,
  columns,
  createLabel,
  deleteLabel = "Excluir",
  refreshKey = 0
}: AdminCrudProps) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string | boolean>>(() => emptyForm(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialForm = useMemo(() => emptyForm(fields), [fields]);

  async function loadItems() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, { cache: "no-store" });
      if (!response.ok) throw new Error(await response.text());
      setItems(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, [endpoint, refreshKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const url = editingId ? `${apiBaseUrl}${endpoint}/${editingId}` : `${apiBaseUrl}${endpoint}`;
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error(await response.text());
      setForm(initialForm);
      setEditingId(null);
      await loadItems();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(await response.text());
      await loadItems();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Erro ao remover.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(row: any) {
    setEditingId(row.id);
    setForm(
      fields.reduce<Record<string, string | boolean>>((acc, field) => {
        const value = readPath(row, field.name);
        acc[field.name] = field.type === "checkbox" ? Boolean(value) : value?.toString() ?? "";
        return acc;
      }, {})
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <Button variant="secondary" onClick={loadItems} disabled={loading}>
          <RotateCcw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>

      <Card className="mb-4">
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {fields.map((field) => (
            <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
              <span className="mb-1 block text-xs font-medium text-slate-600">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  className="min-h-24 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  required={field.required}
                  value={String(form[field.name] ?? "")}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                />
              ) : field.type === "select" ? (
                <select
                  className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary"
                  required={field.required}
                  value={String(form[field.name] ?? "")}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                >
                  <option value="">Selecione</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  className="h-5 w-5 rounded border-border"
                  type="checkbox"
                  checked={Boolean(form[field.name])}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
                />
              ) : (
                <input
                  className="h-10 w-full rounded-md border border-border px-3 text-sm outline-none focus:border-primary"
                  type={field.type ?? "text"}
                  required={field.required}
                  value={String(form[field.name] ?? "")}
                  onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                />
              )}
            </label>
          ))}

          <div className="flex items-end gap-2">
            <Button type="submit" disabled={loading}>
              {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {editingId ? "Salvar" : createLabel}
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
            ) : null}
          </div>
        </form>
        {error ? <pre className="mt-3 whitespace-pre-wrap rounded-md bg-red-50 p-3 text-xs text-red-700">{error}</pre> : null}
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {columns.map((column) => (
                  <th key={column.key} className="px-2 py-3 font-medium">
                    {column.label}
                  </th>
                ))}
                <th className="w-44 px-2 py-3 font-medium">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  {columns.map((column) => (
                    <td key={column.key} className="px-2 py-3 align-top">
                      {column.render ? column.render(item) : String(readPath(item, column.key) ?? "")}
                    </td>
                  ))}
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <Button type="button" variant="secondary" onClick={() => startEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => remove(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        {deleteLabel}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-2 py-8 text-center text-muted">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
