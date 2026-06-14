import Link from "next/link";
import { BookOpen, Compass, GraduationCap, Library, Sparkles } from "lucide-react";

const nav = [
  { href: "/", label: "Biblioteca", icon: Library },
  { href: "/atlas", label: "Atlas", icon: Compass },
  { href: "/trilhas", label: "Trilhas", icon: GraduationCap },
  { href: "/premium", label: "Premium", icon: Sparkles },
  { href: "/login", label: "Login", icon: BookOpen }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="font-semibold text-primary">
            FisioBase Academy
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm text-slate-700 hover:bg-slate-100"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
