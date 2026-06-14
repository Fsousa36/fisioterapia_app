import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  ["Ortopedia", "ortopedia"],
  ["Neurologia", "neurologia"],
  ["Cardiorrespiratoria", "cardiorrespiratoria"],
  ["Pediatria", "pediatria"],
  ["Geriatria", "geriatria"],
  ["Esportiva", "esportiva"],
  ["Saude da Mulher", "saude-da-mulher"],
  ["Terapia Manual", "terapia-manual"]
];

async function main() {
  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      create: { name, slug },
      update: { name }
    });
  }

  const ortopedia = await prisma.category.findUnique({ where: { slug: "ortopedia" } });
  const neurologia = await prisma.category.findUnique({ where: { slug: "neurologia" } });
  const cardiorrespiratoria = await prisma.category.findUnique({ where: { slug: "cardiorrespiratoria" } });

  const topics = [
    {
      title: "Dor lombar inespecifica",
      slug: "dor-lombar-inespecifica",
      summary:
        "Atlas de avaliacao, prognostico e intervencoes para dor lombar inespecifica com foco em educacao, exercicio terapeutico, terapia manual como adjuvante e rastreio de bandeiras vermelhas.",
      clinicalArea: "Ortopedia",
      bodyRegion: "Coluna lombar",
      population: "Adultos com dor lombar aguda, subaguda ou cronica sem causa especifica identificada.",
      tags: ["dor lombar", "exercicio", "educacao", "terapia manual", "bandeiras vermelhas"],
      evidenceLevel: "HIGH" as const,
      recommendation: "STRONG_FOR" as const,
      categoryId: ortopedia?.id,
      questions: [
        {
          question: "Exercicio terapeutico melhora dor e funcao em dor lombar cronica inespecifica?",
          population: "Adultos com dor lombar cronica inespecifica",
          intervention: "Exercicio terapeutico progressivo",
          comparison: "Cuidado usual ou minima intervencao",
          outcome: "Dor, incapacidade e retorno a atividade",
          answerSummary:
            "Exercicio terapeutico e recomendado como componente central, com escolha guiada por preferencia, aderencia, capacidade fisica e progressao."
        }
      ],
      outcomes: [
        {
          name: "Incapacidade funcional",
          description: "Impacto da dor nas atividades diarias.",
          measure: "Oswestry Disability Index ou Roland-Morris",
          minimalImportantDifference: "Interpretar conforme escala e contexto clinico."
        }
      ],
      interventions: [
        {
          name: "Educacao e autogerenciamento",
          description: "Explicacao de prognostico, manutencao de atividade e estrategias para reduzir medo-evitacao.",
          dosage: "Reforco ao longo do plano de cuidado.",
          indication: "Primeira linha para maioria dos pacientes.",
          recommendation: "STRONG_FOR" as const
        }
      ]
    },
    {
      title: "Reabilitacao pos-AVC",
      slug: "reabilitacao-pos-avc",
      summary:
        "Mapa de evidencias para recuperacao motora, treino orientado a tarefa, marcha, equilibrio, espasticidade e independencia funcional apos acidente vascular cerebral.",
      clinicalArea: "Neurologia",
      bodyRegion: "Sistema nervoso central",
      population: "Adultos em fase subaguda ou cronica apos AVC.",
      tags: ["avc", "neuroreabilitacao", "marcha", "equilibrio", "treino orientado a tarefa"],
      evidenceLevel: "HIGH" as const,
      recommendation: "STRONG_FOR" as const,
      categoryId: neurologia?.id
    },
    {
      title: "Reabilitacao pulmonar na DPOC",
      slug: "reabilitacao-pulmonar-dpoc",
      summary:
        "Atlas para prescricao de exercicio, educacao, dispneia, capacidade funcional e qualidade de vida em pessoas com doenca pulmonar obstrutiva cronica.",
      clinicalArea: "Cardiorrespiratoria",
      bodyRegion: "Sistema respiratorio",
      population: "Adultos com DPOC estavel ou pos-exacerbacao, conforme criterios de seguranca.",
      tags: ["dpoc", "reabilitacao pulmonar", "dispneia", "exercicio aerobico", "forca"],
      evidenceLevel: "HIGH" as const,
      recommendation: "STRONG_FOR" as const,
      categoryId: cardiorrespiratoria?.id
    }
  ];

  for (const topic of topics) {
    await prisma.atlasTopic.upsert({
      where: { slug: topic.slug },
      create: {
        title: topic.title,
        slug: topic.slug,
        summary: topic.summary,
        clinicalArea: topic.clinicalArea,
        bodyRegion: topic.bodyRegion,
        population: topic.population,
        tags: topic.tags,
        evidenceLevel: topic.evidenceLevel,
        recommendation: topic.recommendation,
        categoryId: topic.categoryId,
        clinicalQuestions: {
          create:
            "questions" in topic
              ? topic.questions.map((question) => ({ ...question, evidenceLevel: topic.evidenceLevel }))
              : []
        },
        outcomes: {
          create:
            "outcomes" in topic
              ? topic.outcomes.map((outcome) => ({ ...outcome, evidenceLevel: topic.evidenceLevel }))
              : []
        },
        interventions: {
          create:
            "interventions" in topic
              ? topic.interventions.map((intervention) => ({ ...intervention, evidenceLevel: topic.evidenceLevel }))
              : []
        }
      },
      update: {
        title: topic.title,
        summary: topic.summary,
        clinicalArea: topic.clinicalArea,
        bodyRegion: topic.bodyRegion,
        population: topic.population,
        tags: topic.tags,
        evidenceLevel: topic.evidenceLevel,
        recommendation: topic.recommendation,
        categoryId: topic.categoryId
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
