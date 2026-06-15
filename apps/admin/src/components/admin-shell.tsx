import Link from "next/link";
import { BookOpen, Compass, Database, GraduationCap, LayoutDashboard, ScrollText, Tags, Users } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/atlas", label: "Atlas", icon: Compass },
  { href: "/articles", label: "Artigos", icon: BookOpen },
  { href: "/imports", label: "Importacoes", icon: Database },
  { href: "/tracks", label: "Trilhas", icon: GraduationCap },
  { href: "/categories", label: "Categorias", icon: Tags },
  { href: "/users", label: "Usuarios", icon: Users },
  { href: "/certificates", label: "Certificados", icon: ScrollText }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white p-4 md:block">
        <div className="mb-6 text-lg font-semibold">FisioBase Admin</div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded-md px-3 text-sm text-slate-700 hover:bg-slate-100"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="md:pl-64">
        <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
