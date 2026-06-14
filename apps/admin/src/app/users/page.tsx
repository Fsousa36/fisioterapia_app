"use client";

import { AdminShell } from "@/components/admin-shell";
import { AdminCrud, type CrudField } from "@/components/admin-crud";

const roleOptions = ["STUDENT", "PROFESSIONAL", "CURATOR", "ADMIN"].map((value) => ({ label: value, value }));
const subscriptionOptions = ["FREE", "PREMIUM"].map((value) => ({ label: value, value }));

const fields: CrudField[] = [
  { name: "name", label: "Nome" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Senha", type: "password" },
  { name: "role", label: "Perfil", type: "select", options: roleOptions },
  { name: "subscription", label: "Assinatura", type: "select", options: subscriptionOptions }
];

export default function UsersPage() {
  return (
    <AdminShell>
      <AdminCrud
        title="Usuarios"
        description="Estudantes, profissionais, curadores e administradores."
        endpoint="/admin/users"
        fields={fields}
        createLabel="Criar usuario"
        columns={[
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" },
          { key: "role", label: "Perfil" },
          { key: "subscription", label: "Assinatura" }
        ]}
      />
    </AdminShell>
  );
}
