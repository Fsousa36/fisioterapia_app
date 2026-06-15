import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/card";
import { apiGet } from "@/lib/api";

type Track = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  isPremium: boolean;
  category: {
    name: string;
  };
  modules: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      quizzes: Array<{ id: string }>;
      articles: Array<{ lessonId: string; articleId: string }>;
    }>;
  }>;
  _count: {
    modules: number;
    certificates: number;
  };
};

async function getTracks() {
  return apiGet<Track[]>("/learning/tracks").catch(() => []);
}

export default async function TrilhasPage() {
  const tracks = await getTracks();

  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-semibold">Trilhas de aprendizagem</h1>
      <p className="mb-6 text-sm text-muted">Modulos, licoes, artigos, quiz e avaliacao final.</p>
      <div className="grid gap-4">
        {tracks.map((track) => {
          const lessonCount = track.modules.reduce((total, module) => total + module.lessons.length, 0);
          const quizCount = track.modules.reduce(
            (total, module) => total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.quizzes.length, 0),
            0
          );
          return (
            <Card key={track.id}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-md bg-slate-100 px-2 py-1">{track.category.name}</span>
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-accent">{track.estimatedMinutes} min</span>
                    <span className="rounded-md bg-teal-50 px-2 py-1 text-primary">
                      {track.isPremium ? "Premium" : "Livre"}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{track.title}</h2>
                  <p className="mt-2 text-sm text-slate-700">{track.description}</p>
                </div>
                <div className="grid min-w-56 grid-cols-2 gap-2 text-sm">
                  <Metric label="Modulos" value={track._count.modules} />
                  <Metric label="Licoes" value={lessonCount} />
                  <Metric label="Quizzes" value={quizCount} />
                  <Metric label="Certificados" value={track._count.certificates} />
                </div>
              </div>
            </Card>
          );
        })}
        {tracks.length === 0 ? (
          <Card>
            <div className="py-6 text-sm text-muted">Nenhuma trilha publicada ainda.</div>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-slate-50 p-2">
      <div className="text-xs text-muted">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
