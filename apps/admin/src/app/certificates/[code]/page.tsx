import { Card } from "@/components/ui/card";

export default async function PublicCertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center p-4">
      <Card className="w-full">
        <div className="text-sm text-muted">Validacao publica</div>
        <h1 className="mt-2 text-2xl font-semibold">Certificado FisioBase Academy</h1>
        <p className="mt-4 text-sm">Codigo: {code}</p>
        <p className="mt-2 text-sm text-muted">
          A API confirmara titular, trilha, status e data de emissao nesta pagina.
        </p>
      </Card>
    </main>
  );
}
