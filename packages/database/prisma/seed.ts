import prismaModule from "@prisma/client";

const { PrismaClient } = prismaModule;

const prisma = new PrismaClient();

const categories = [
  {
    name: "Ortopedia",
    slug: "ortopedia",
    learningFocus: "Dor musculoesqueletica, retorno funcional, carga e exercicio terapeutico."
  },
  {
    name: "Neurologia",
    slug: "neurologia",
    learningFocus: "Neuroplasticidade, treino orientado a tarefa, marcha e equilibrio."
  },
  {
    name: "Cardiorrespiratoria",
    slug: "cardiorrespiratoria",
    learningFocus: "Reabilitacao pulmonar, exercicio aerobico, dispneia e tolerancia ao esforco."
  },
  {
    name: "Pediatria",
    slug: "pediatria",
    learningFocus: "Desenvolvimento motor, funcionalidade e intervencoes centradas na familia."
  },
  {
    name: "Geriatria",
    slug: "geriatria",
    learningFocus: "Fragilidade, prevencao de quedas, sarcopenia e autonomia."
  },
  {
    name: "Esportiva",
    slug: "esportiva",
    learningFocus: "Retorno ao esporte, monitoramento de carga e prevencao de lesoes."
  },
  {
    name: "Saude da Mulher",
    slug: "saude-da-mulher",
    learningFocus: "Assoalho pelvico, dor pelvica, gestacao e pos-parto."
  },
  {
    name: "Terapia Manual",
    slug: "terapia-manual",
    learningFocus: "Raciocinio clinico, modulacao de sintomas e combinacao com exercicio."
  }
];

const users = [
  {
    email: "admin@fisiobase.academy",
    name: "Admin FisioBase",
    role: "ADMIN" as const,
    provider: "EMAIL" as const,
    subscription: "PREMIUM" as const,
    passwordHash: "$2b$10$7QJp4Zx3hM7oR8bFq0m0OOwGxWvF8BqIrQ4JYz8I3FzXw9d5nHf0G"
  },
  {
    email: "curadoria@fisiobase.academy",
    name: "Curadoria Cientifica",
    role: "CURATOR" as const,
    provider: "EMAIL" as const,
    subscription: "PREMIUM" as const,
    passwordHash: "$2b$10$7QJp4Zx3hM7oR8bFq0m0OOwGxWvF8BqIrQ4JYz8I3FzXw9d5nHf0G"
  },
  {
    email: "aluna.demo@fisiobase.academy",
    name: "Ana Paula Demo",
    role: "STUDENT" as const,
    provider: "EMAIL" as const,
    subscription: "FREE" as const,
    passwordHash: "$2b$10$7QJp4Zx3hM7oR8bFq0m0OOwGxWvF8BqIrQ4JYz8I3FzXw9d5nHf0G"
  },
  {
    email: "fisio.premium@fisiobase.academy",
    name: "Lucas Fisioterapeuta",
    role: "PROFESSIONAL" as const,
    provider: "GOOGLE" as const,
    subscription: "PREMIUM" as const
  }
];

const articles = [
  {
    title: "Exercise therapy for chronic non-specific low back pain",
    abstract:
      "Systematic review demonstrating clinically relevant improvements in pain and disability with progressive exercise programs tailored to patient tolerance and goals.",
    authors: ["Hayden JA", "Ellis J", "Ogilvie R"],
    journal: "Cochrane Database of Systematic Reviews",
    publicationDate: new Date("2021-03-09"),
    language: "en",
    source: "COCHRANE" as const,
    sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009790.pub2/full",
    doi: "10.1002/14651858.CD009790.pub2",
    pmid: "33759398",
    pmcid: null,
    externalId: "cochrane-lbp-exercise-2021",
    license: "Cochrane abstract and metadata",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "ortopedia"
  },
  {
    title: "Clinical practice guideline interventions for acute and chronic low back pain",
    abstract:
      "Guideline synthesis supporting exercise, education, and psychologically informed care while de-emphasizing passive care in isolation.",
    authors: ["Qaseem A", "Wilt TJ", "McLean RM"],
    journal: "Annals of Internal Medicine",
    publicationDate: new Date("2017-04-04"),
    language: "en",
    source: "PUBMED" as const,
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28192789/",
    doi: "10.7326/M16-2367",
    pmid: "28192789",
    pmcid: null,
    externalId: "28192789",
    license: "Publisher metadata via PubMed",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "ortopedia"
  },
  {
    title: "Task-oriented circuit class training after stroke",
    abstract:
      "Meta-analysis indicating improvements in walking distance, mobility, and community participation with structured task-oriented circuit training.",
    authors: ["English C", "Hillier SL", "Lynch EA"],
    journal: "Stroke",
    publicationDate: new Date("2017-05-01"),
    language: "en",
    source: "PUBMED" as const,
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28386042/",
    doi: "10.1161/STROKEAHA.116.016131",
    pmid: "28386042",
    pmcid: null,
    externalId: "28386042",
    license: "Publisher metadata via PubMed",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "neurologia"
  },
  {
    title: "Physical rehabilitation approaches for people with stroke",
    abstract:
      "Overview of evidence favoring high-intensity, repetitive, task-specific rehabilitation with contextualized progression and outcome monitoring.",
    authors: ["Pollock A", "Farid S", "Brady MC"],
    journal: "Cochrane Database of Systematic Reviews",
    publicationDate: new Date("2020-04-22"),
    language: "en",
    source: "COCHRANE" as const,
    sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001920.pub3/full",
    doi: "10.1002/14651858.CD001920.pub3",
    pmid: "32324955",
    pmcid: null,
    externalId: "cochrane-stroke-rehab-2020",
    license: "Cochrane abstract and metadata",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "neurologia"
  },
  {
    title: "Pulmonary rehabilitation for chronic obstructive pulmonary disease",
    abstract:
      "Rehabilitation improves functional capacity, dyspnea and quality of life, especially when delivered with exercise training and self-management education.",
    authors: ["McCarthy B", "Casey D", "Devane D"],
    journal: "Cochrane Database of Systematic Reviews",
    publicationDate: new Date("2015-02-23"),
    language: "en",
    source: "COCHRANE" as const,
    sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003793.pub3/full",
    doi: "10.1002/14651858.CD003793.pub3",
    pmid: "25705944",
    pmcid: null,
    externalId: "cochrane-copd-pr-2015",
    license: "Cochrane abstract and metadata",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "cardiorrespiratoria"
  },
  {
    title: "World Health Organization rehabilitation considerations for post-COVID-19 condition",
    abstract:
      "Public WHO guidance emphasizing symptom-limited progression, monitoring, and interdisciplinary rehabilitation for persistent functional limitations.",
    authors: ["World Health Organization"],
    journal: "WHO Guidance",
    publicationDate: new Date("2023-09-01"),
    language: "en",
    source: "WHO" as const,
    sourceUrl: "https://www.who.int/publications/i/item/WHO-2019-nCoV-Clinical-2023.2",
    doi: null,
    pmid: null,
    pmcid: null,
    externalId: "who-post-covid-rehab-2023",
    license: "WHO public guidance",
    openAccess: true,
    status: "PUBLISHED" as const,
    categorySlug: "cardiorrespiratoria"
  },
  {
    title: "Interventions to improve gross motor performance in children with cerebral palsy",
    abstract:
      "Evidence map favoring goal-directed and task-specific interventions with contextualized family-centered care.",
    authors: ["Novak I", "Morgan C", "Fahey M"],
    journal: "Pediatrics",
    publicationDate: new Date("2020-02-01"),
    language: "en",
    source: "EUROPE_PMC" as const,
    sourceUrl: "https://europepmc.org/article/MED/32005759",
    doi: "10.1542/peds.2019-3455",
    pmid: "32005759",
    pmcid: "PMC7005391",
    externalId: "32005759",
    license: "Europe PMC / PMC metadata",
    openAccess: true,
    status: "PUBLISHED" as const,
    categorySlug: "pediatria"
  },
  {
    title: "Exercise interventions for preventing falls in older people living in the community",
    abstract:
      "Strong evidence for balance-challenging exercise and multimodal training to reduce falls in community-dwelling older adults.",
    authors: ["Sherrington C", "Fairhall N", "Wallbank G"],
    journal: "British Journal of Sports Medicine",
    publicationDate: new Date("2020-08-01"),
    language: "en",
    source: "PUBMED_CENTRAL" as const,
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8092551/",
    doi: "10.1136/bjsports-2019-101512",
    pmid: "32546524",
    pmcid: "PMC8092551",
    externalId: "PMC8092551",
    license: "CC BY-NC 4.0",
    openAccess: true,
    status: "PUBLISHED" as const,
    categorySlug: "geriatria"
  },
  {
    title: "Consensus statement on return to sport after anterior cruciate ligament reconstruction",
    abstract:
      "Return-to-sport requires criteria-based progression across strength, hop tests, movement quality, and psychological readiness.",
    authors: ["Ardern CL", "Glasgow P", "Schneider A"],
    journal: "British Journal of Sports Medicine",
    publicationDate: new Date("2016-07-01"),
    language: "en",
    source: "PUBMED" as const,
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27162233/",
    doi: "10.1136/bjsports-2016-096278",
    pmid: "27162233",
    pmcid: null,
    externalId: "27162233",
    license: "Publisher metadata via PubMed",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "esportiva"
  },
  {
    title: "Pelvic floor muscle training for women with stress urinary incontinence",
    abstract:
      "Pelvic floor muscle training is first-line conservative management with benefits in symptoms, quality of life and patient-reported improvement.",
    authors: ["Dumoulin C", "Cacciari LP", "Hay-Smith EJC"],
    journal: "Cochrane Database of Systematic Reviews",
    publicationDate: new Date("2018-10-04"),
    language: "en",
    source: "COCHRANE" as const,
    sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD005654.pub4/full",
    doi: "10.1002/14651858.CD005654.pub4",
    pmid: "30288727",
    pmcid: null,
    externalId: "cochrane-pfmt-sui-2018",
    license: "Cochrane abstract and metadata",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "saude-da-mulher"
  },
  {
    title: "Manual therapy and exercise for neck pain",
    abstract:
      "Combining manual therapy with active exercise improves short-term pain and disability more consistently than passive care alone.",
    authors: ["Gross A", "Paquin JP", "Dupont G"],
    journal: "The Journal of Orthopaedic and Sports Physical Therapy",
    publicationDate: new Date("2016-07-01"),
    language: "en",
    source: "PUBMED" as const,
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27374025/",
    doi: "10.2519/jospt.2016.0302",
    pmid: "27374025",
    pmcid: null,
    externalId: "27374025",
    license: "Publisher metadata via PubMed",
    openAccess: false,
    status: "PUBLISHED" as const,
    categorySlug: "terapia-manual"
  },
  {
    title: "PEDro evidence summary for rotator cuff related shoulder pain exercise therapy",
    abstract:
      "Exercise-focused care shows consistent benefit for pain and function, especially when dosage and progression are individualized.",
    authors: ["PEDro"],
    journal: "PEDro Database",
    publicationDate: new Date("2023-06-01"),
    language: "en",
    source: "PEDRO" as const,
    sourceUrl: "https://pedro.org.au/english/resources/evidence-in-your-inbox/rotator-cuff-related-shoulder-pain/",
    doi: null,
    pmid: null,
    pmcid: null,
    externalId: "pedro-shoulder-2023",
    license: "PEDro summary",
    openAccess: true,
    status: "IN_REVIEW" as const,
    categorySlug: "ortopedia"
  },
  {
    title: "SciELO review on exercise and pelvic pain in women",
    abstract:
      "Portuguese-language review summarizing non-pharmacological strategies for pain modulation, pelvic floor function and education.",
    authors: ["Silva DF", "Costa R"],
    journal: "Revista Brasileira de Fisioterapia",
    publicationDate: new Date("2022-05-01"),
    language: "pt-BR",
    source: "SCIELO" as const,
    sourceUrl: "https://www.scielo.br/j/rbfis/a/pelvic-pain-review/",
    doi: "10.1590/rbfis.2022.0101",
    pmid: null,
    pmcid: null,
    externalId: "scielo-pelvic-pain-2022",
    license: "SciELO open access",
    openAccess: true,
    status: "PUBLISHED" as const,
    categorySlug: "saude-da-mulher"
  },
  {
    title: "LILACS scoping review of fall-prevention education for older adults",
    abstract:
      "Latin-American literature emphasizing multi-component fall-prevention programs with exercise, home adaptation and adherence counseling.",
    authors: ["Oliveira M", "Santos AC"],
    journal: "LILACS",
    publicationDate: new Date("2021-11-01"),
    language: "pt-BR",
    source: "LILACS" as const,
    sourceUrl: "https://pesquisa.bvsalud.org/portal/resource/pt/lil-fall-prevention-2021",
    doi: null,
    pmid: null,
    pmcid: null,
    externalId: "lilacs-falls-2021",
    license: "BVS/LILACS metadata",
    openAccess: true,
    status: "PUBLISHED" as const,
    categorySlug: "geriatria"
  },
  {
    title: "ClinicalTrials.gov trial of high-intensity gait training after stroke",
    abstract:
      "Registered trial investigating dosage, intensity and functional outcomes of progressive gait training in chronic stroke.",
    authors: ["National Rehabilitation Research Team"],
    journal: "ClinicalTrials.gov",
    publicationDate: new Date("2024-01-10"),
    language: "en",
    source: "CLINICAL_TRIALS" as const,
    sourceUrl: "https://clinicaltrials.gov/study/NCT05912345",
    doi: null,
    pmid: null,
    pmcid: null,
    externalId: "NCT05912345",
    license: "ClinicalTrials.gov public registry",
    openAccess: true,
    status: "IN_REVIEW" as const,
    categorySlug: "neurologia"
  }
];

const atlasTopics = [
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
    categorySlug: "ortopedia",
    articleRefs: [
      { sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009790.pub2/full", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "core-review" },
      { sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28192789/", studyDesign: "GUIDELINE" as const, evidenceRole: "guideline-summary" }
    ],
    clinicalQuestions: [
      {
        question: "Exercicio terapeutico melhora dor e funcao em dor lombar cronica inespecifica?",
        population: "Adultos com dor lombar cronica inespecifica",
        intervention: "Exercicio terapeutico progressivo",
        comparison: "Cuidado usual ou minima intervencao",
        outcome: "Dor, incapacidade e retorno a atividade",
        answerSummary:
          "Exercicio terapeutico e recomendado como componente central, com escolha guiada por preferencia, aderencia, capacidade fisica e progressao.",
        evidenceLevel: "HIGH" as const
      }
    ],
    outcomes: [
      {
        name: "Incapacidade funcional",
        description: "Impacto da dor nas atividades diarias.",
        measure: "Oswestry Disability Index ou Roland-Morris",
        minimalImportantDifference: "Interpretar conforme escala e contexto clinico.",
        evidenceLevel: "MODERATE" as const
      }
    ],
    interventions: [
      {
        name: "Educacao e autogerenciamento",
        description: "Explicacao de prognostico, manutencao de atividade e estrategias para reduzir medo-evitacao.",
        dosage: "Reforco ao longo do plano de cuidado.",
        indication: "Primeira linha para maioria dos pacientes.",
        contraindication: "Nao aplicavel em termos absolutos; adaptar a comunicacao.",
        recommendation: "STRONG_FOR" as const,
        evidenceLevel: "HIGH" as const
      }
    ],
    guidelines: [
      {
        title: "ACP guideline for low back pain",
        organization: "American College of Physicians",
        url: "https://pubmed.ncbi.nlm.nih.gov/28192789/",
        year: 2017,
        country: "USA",
        license: "Publisher metadata",
        summary: "Prioriza exercicio, educacao e abordagens nao farmacologicas."
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
    categorySlug: "neurologia",
    articleRefs: [
      { sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28386042/", studyDesign: "META_ANALYSIS" as const, evidenceRole: "mobility" },
      { sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001920.pub3/full", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "core-review" }
    ],
    clinicalQuestions: [
      {
        question: "Treino orientado a tarefa de alta repeticao melhora marcha e participacao apos AVC?",
        population: "Adultos em fase subaguda ou cronica apos AVC",
        intervention: "Treino orientado a tarefa e circuit class training",
        comparison: "Reabilitacao convencional de menor intensidade",
        outcome: "Marcha, distancia, participacao e independencia",
        answerSummary: "A dose e a especificidade da tarefa importam. Programas com volume maior tendem a melhorar mobilidade funcional.",
        evidenceLevel: "HIGH" as const
      }
    ],
    outcomes: [
      {
        name: "Velocidade de marcha",
        description: "Capacidade de locomocao em ambiente domiciliar e comunitario.",
        measure: "10 Meter Walk Test",
        minimalImportantDifference: "Interpretar pelo estagio de recuperacao.",
        evidenceLevel: "MODERATE" as const
      }
    ],
    interventions: [
      {
        name: "Treino orientado a tarefa",
        description: "Pratica repetida de transicoes, marcha, alcance e tarefas funcionais.",
        dosage: "3 a 5 sessoes por semana com alta repeticao.",
        indication: "Limites de mobilidade, transferencias e marcha apos AVC.",
        contraindication: "Instabilidade clinica sem monitoramento adequado.",
        recommendation: "STRONG_FOR" as const,
        evidenceLevel: "HIGH" as const
      }
    ],
    guidelines: [
      {
        title: "Stroke rehabilitation guideline",
        organization: "Cochrane / international rehabilitation consensus",
        url: "https://pubmed.ncbi.nlm.nih.gov/28386042/",
        year: 2020,
        country: "International",
        license: "Metadata only",
        summary: "Favorece pratica intensiva, relevante e progressiva."
      }
    ]
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
    categorySlug: "cardiorrespiratoria",
    articleRefs: [
      { sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003793.pub3/full", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "core-review" },
      { sourceUrl: "https://www.who.int/publications/i/item/WHO-2019-nCoV-Clinical-2023.2", studyDesign: "GUIDELINE" as const, evidenceRole: "public-guidance" }
    ],
    clinicalQuestions: [
      {
        question: "Reabilitacao pulmonar melhora dispneia e capacidade funcional em DPOC?",
        population: "Adultos com DPOC",
        intervention: "Programa estruturado de reabilitacao pulmonar",
        comparison: "Cuidado habitual",
        outcome: "Dispneia, distancia no teste de caminhada, qualidade de vida",
        answerSummary: "Programas com exercicio supervisionado e educacao apresentam ganhos consistentes e clinicamente relevantes.",
        evidenceLevel: "HIGH" as const
      }
    ],
    outcomes: [
      {
        name: "Capacidade funcional",
        description: "Resposta ao exercicio submaximo.",
        measure: "6 Minute Walk Test",
        minimalImportantDifference: "Usar interpretacao clinica contextualizada.",
        evidenceLevel: "MODERATE" as const
      }
    ],
    interventions: [
      {
        name: "Treino aerobico + fortalecimento",
        description: "Treino combinado com progressao de intensidade e educacao para autogerenciamento.",
        dosage: "2 a 3 vezes por semana, por 6 a 12 semanas ou mais.",
        indication: "DPOC estavel e pos-exacerbacao elegivel.",
        contraindication: "Instabilidade hemodinamica ou respiratoria sem monitoramento.",
        recommendation: "STRONG_FOR" as const,
        evidenceLevel: "HIGH" as const
      }
    ],
    guidelines: [
      {
        title: "WHO rehabilitation guidance for chronic respiratory limitation",
        organization: "WHO",
        url: "https://www.who.int/publications/i/item/WHO-2019-nCoV-Clinical-2023.2",
        year: 2023,
        country: "International",
        license: "WHO public guidance",
        summary: "Monitorar sintomas, fadiga, saturacao e progressao funcional."
      }
    ]
  },
  {
    title: "Paralisia cerebral e funcao motora grossa",
    slug: "paralisia-cerebral-funcao-motora",
    summary:
      "Revisao aplicada de intervencoes para funcao motora grossa, metas centradas na familia e pratica intensiva para criancas com paralisia cerebral.",
    clinicalArea: "Pediatria",
    bodyRegion: "Desenvolvimento motor",
    population: "Criancas com paralisia cerebral e alteracoes de mobilidade funcional.",
    tags: ["paralisia cerebral", "funcao motora", "pediatria", "familia", "meta funcional"],
    evidenceLevel: "MODERATE" as const,
    recommendation: "STRONG_FOR" as const,
    categorySlug: "pediatria",
    articleRefs: [
      { sourceUrl: "https://europepmc.org/article/MED/32005759", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "core-review" }
    ],
    clinicalQuestions: [
      {
        question: "Intervencoes orientadas a metas funcionais melhoram desempenho motor em criancas com paralisia cerebral?",
        population: "Criancas com paralisia cerebral",
        intervention: "Pratica orientada a metas e tarefas",
        comparison: "Intervencao nao estruturada ou menor dose",
        outcome: "Funcao motora grossa e participacao",
        answerSummary: "A especificidade das metas e a repeticao com envolvimento da familia aumentam transferencia funcional.",
        evidenceLevel: "MODERATE" as const
      }
    ],
    outcomes: [],
    interventions: [],
    guidelines: []
  },
  {
    title: "Prevencao de quedas em idosos da comunidade",
    slug: "prevencao-de-quedas-em-idosos",
    summary:
      "Atlas sobre risco de quedas, equilibrio, exposicao a dupla tarefa, exercicios multicomponentes e educacao para ambientes mais seguros.",
    clinicalArea: "Geriatria",
    bodyRegion: "Mobilidade funcional",
    population: "Idosos da comunidade com risco aumentado de quedas.",
    tags: ["quedas", "idosos", "equilibrio", "forca", "dupla tarefa"],
    evidenceLevel: "HIGH" as const,
    recommendation: "STRONG_FOR" as const,
    categorySlug: "geriatria",
    articleRefs: [
      { sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8092551/", studyDesign: "META_ANALYSIS" as const, evidenceRole: "core-review" },
      { sourceUrl: "https://pesquisa.bvsalud.org/portal/resource/pt/lil-fall-prevention-2021", studyDesign: "OTHER" as const, evidenceRole: "regional-context" }
    ],
    clinicalQuestions: [],
    outcomes: [],
    interventions: [],
    guidelines: []
  },
  {
    title: "Retorno ao esporte pos-LCA",
    slug: "retorno-ao-esporte-pos-lca",
    summary:
      "Mapa clinico para progressao de carga, criterios de retorno ao esporte, testes funcionais e comunicacao de risco apos reconstrucao do LCA.",
    clinicalArea: "Esportiva",
    bodyRegion: "Joelho",
    population: "Atletas em reabilitacao apos reconstrucao do LCA.",
    tags: ["lca", "retorno ao esporte", "hop tests", "forca", "carga"],
    evidenceLevel: "MODERATE" as const,
    recommendation: "STRONG_FOR" as const,
    categorySlug: "esportiva",
    articleRefs: [
      { sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27162233/", studyDesign: "CONSENSUS" as const, evidenceRole: "consensus" }
    ],
    clinicalQuestions: [],
    outcomes: [],
    interventions: [],
    guidelines: []
  },
  {
    title: "Treino do assoalho pelvico para incontinencia urinaria",
    slug: "assoalho-pelvico-incontinencia-urinaria",
    summary:
      "Atlas para avaliacao, prescricao e progressao do treino do assoalho pelvico em mulheres com incontinencia urinaria de esforco.",
    clinicalArea: "Saude da Mulher",
    bodyRegion: "Assoalho pelvico",
    population: "Mulheres com incontinencia urinaria de esforco ou mista com predominio de esforco.",
    tags: ["assoalho pelvico", "incontinencia urinaria", "pfmt", "saude da mulher"],
    evidenceLevel: "HIGH" as const,
    recommendation: "STRONG_FOR" as const,
    categorySlug: "saude-da-mulher",
    articleRefs: [
      { sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD005654.pub4/full", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "core-review" },
      { sourceUrl: "https://www.scielo.br/j/rbfis/a/pelvic-pain-review/", studyDesign: "OTHER" as const, evidenceRole: "regional-review" }
    ],
    clinicalQuestions: [],
    outcomes: [],
    interventions: [],
    guidelines: []
  },
  {
    title: "Terapia manual para dor cervical",
    slug: "terapia-manual-dor-cervical",
    summary:
      "Raciocinio clinico para uso de terapia manual em combinacao com exercicio e educacao no manejo da dor cervical mecanica.",
    clinicalArea: "Terapia Manual",
    bodyRegion: "Coluna cervical",
    population: "Adultos com dor cervical mecanica sem sinais de gravidade.",
    tags: ["dor cervical", "terapia manual", "mobilizacao", "exercicio"],
    evidenceLevel: "MODERATE" as const,
    recommendation: "WEAK_FOR" as const,
    categorySlug: "terapia-manual",
    articleRefs: [
      { sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/27374025/", studyDesign: "SYSTEMATIC_REVIEW" as const, evidenceRole: "manual-therapy" }
    ],
    clinicalQuestions: [],
    outcomes: [],
    interventions: [],
    guidelines: []
  }
];

const tracks = [
  {
    title: "Dor lombar baseada em evidencias",
    slug: "dor-lombar-baseada-em-evidencias",
    description: "Triagem, educacao, exercicio terapeutico e tomada de decisao para dor lombar inespecifica.",
    categorySlug: "ortopedia",
    estimatedMinutes: 180,
    isPremium: false,
    published: true,
    modules: [
      {
        title: "Avaliacao e estratificacao inicial",
        order: 1,
        lessons: [
          {
            title: "Bandeiras vermelhas e diagnostico diferencial",
            order: 1,
            estimatedMinutes: 25,
            content: "Checklist clinico para exclusao de causas especificas, sinais neurologicos e criterios de encaminhamento.",
            articleSourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/28192789/"],
            quizzes: [
              {
                title: "Quiz de triagem clinica",
                isFinal: false,
                questions: [
                  {
                    statement: "Qual estrategia e mais alinhada a diretriz para dor lombar sem sinais de gravidade?",
                    options: ["Repouso absoluto", "Educacao e manutencao de atividade", "Imobilizacao prolongada", "Cirurgia precoce"],
                    correctOption: 1,
                    explanation: "Educacao e manutencao de atividade sao pilares na maioria dos quadros sem red flags."
                  }
                ]
              }
            ]
          },
          {
            title: "Definicao de metas e monitoramento",
            order: 2,
            estimatedMinutes: 20,
            content: "Uso de dor, incapacidade, tolerancia a carga e autoeficacia para acompanhar resposta ao plano.",
            articleSourceUrls: ["https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009790.pub2/full"],
            quizzes: []
          }
        ]
      },
      {
        title: "Intervencoes centrais",
        order: 2,
        lessons: [
          {
            title: "Educacao, exercicio e progressao",
            order: 1,
            estimatedMinutes: 35,
            content: "Selecao de exercicios, progressao por tolerancia e comunicacao centrada em funcao.",
            articleSourceUrls: [
              "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009790.pub2/full",
              "https://pubmed.ncbi.nlm.nih.gov/28192789/"
            ],
            quizzes: []
          }
        ]
      }
    ]
  },
  {
    title: "Reabilitacao pos-AVC funcional",
    slug: "reabilitacao-pos-avc-funcional",
    description: "Treino orientado a tarefa, marcha, equilibrio e autonomia apos AVC.",
    categorySlug: "neurologia",
    estimatedMinutes: 210,
    isPremium: true,
    published: true,
    modules: [
      {
        title: "Bases da neuroreabilitacao",
        order: 1,
        lessons: [
          {
            title: "Dose, repeticao e especificidade",
            order: 1,
            estimatedMinutes: 30,
            content: "Principios de intensidade e repeticao relevantes para neuroplasticidade clinicamente aplicavel.",
            articleSourceUrls: ["https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001920.pub3/full"],
            quizzes: []
          }
        ]
      },
      {
        title: "Marcha e participacao",
        order: 2,
        lessons: [
          {
            title: "Circuit class training e marcha",
            order: 1,
            estimatedMinutes: 30,
            content: "Progressao de marcha, obstaculos, endurance e objetivos de comunidade.",
            articleSourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/28386042/"],
            quizzes: [
              {
                title: "Avaliacao final da trilha",
                isFinal: true,
                questions: [
                  {
                    statement: "Qual variavel melhor traduz intensidade especifica de treino em marcha apos AVC?",
                    options: ["Numero de folders impressos", "Volume e repeticao da tarefa", "Tempo sentado em reuniao", "Uso de crioterapia isolada"],
                    correctOption: 1,
                    explanation: "A pratica repetida e orientada a tarefa e um marcador direto da exposicao util."
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Reabilitacao pulmonar na pratica",
    slug: "reabilitacao-pulmonar-na-pratica",
    description: "Avaliacao, prescricao e monitoramento em DPOC e limitacoes respiratorias cronicas.",
    categorySlug: "cardiorrespiratoria",
    estimatedMinutes: 160,
    isPremium: false,
    published: true,
    modules: [
      {
        title: "Avaliacao funcional",
        order: 1,
        lessons: [
          {
            title: "Dispneia, 6MWT e criterios de seguranca",
            order: 1,
            estimatedMinutes: 25,
            content: "Interpretacao de sintomas, monitoramento clinico e parametros de seguranca.",
            articleSourceUrls: ["https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003793.pub3/full"],
            quizzes: []
          }
        ]
      }
    ]
  },
  {
    title: "Paralisia cerebral e metas funcionais",
    slug: "paralisia-cerebral-e-metas-funcionais",
    description: "Planejamento centrado na familia para mobilidade, participacao e funcao motora grossa.",
    categorySlug: "pediatria",
    estimatedMinutes: 140,
    isPremium: true,
    published: true,
    modules: []
  },
  {
    title: "Prevencao de quedas baseada em evidencias",
    slug: "prevencao-de-quedas-baseada-em-evidencias",
    description: "Estratificacao de risco, exercicio multicomponente e educacao para idosos.",
    categorySlug: "geriatria",
    estimatedMinutes: 150,
    isPremium: false,
    published: true,
    modules: []
  },
  {
    title: "Retorno ao esporte pos-LCA",
    slug: "retorno-ao-esporte-pos-lca",
    description: "Criterios de progressao, testes e decisao compartilhada no retorno ao esporte.",
    categorySlug: "esportiva",
    estimatedMinutes: 155,
    isPremium: true,
    published: true,
    modules: []
  },
  {
    title: "Assoalho pelvico e incontinencia urinaria",
    slug: "assoalho-pelvico-e-incontinencia-urinaria",
    description: "Avaliacao, educacao e progressao de treino do assoalho pelvico.",
    categorySlug: "saude-da-mulher",
    estimatedMinutes: 145,
    isPremium: true,
    published: true,
    modules: []
  },
  {
    title: "Terapia manual integrada ao exercicio",
    slug: "terapia-manual-integrada-ao-exercicio",
    description: "Uso responsavel da terapia manual dentro de um plano ativo e mensuravel.",
    categorySlug: "terapia-manual",
    estimatedMinutes: 130,
    isPremium: false,
    published: true,
    modules: []
  }
];

const importLogs = [
  {
    source: "PUBMED" as const,
    status: "SUCCESS" as const,
    query: "low back pain exercise therapy",
    importedCount: 24,
    skippedCount: 6,
    errorMessage: null,
    metadata: { mode: "metadata-only", curatorQueue: true },
    startedAt: new Date("2026-06-10T10:00:00Z"),
    finishedAt: new Date("2026-06-10T10:03:00Z")
  },
  {
    source: "EUROPE_PMC" as const,
    status: "SUCCESS" as const,
    query: "stroke rehabilitation task oriented training",
    importedCount: 18,
    skippedCount: 2,
    errorMessage: null,
    metadata: { openAccessOnly: true },
    startedAt: new Date("2026-06-10T11:00:00Z"),
    finishedAt: new Date("2026-06-10T11:02:00Z")
  },
  {
    source: "SCIELO" as const,
    status: "PARTIAL" as const,
    query: "dor pelvica fisioterapia",
    importedCount: 7,
    skippedCount: 4,
    errorMessage: "Alguns registros sem DOI ou licenca explicita exigem curadoria manual.",
    metadata: { locale: "pt-BR" },
    startedAt: new Date("2026-06-11T09:00:00Z"),
    finishedAt: new Date("2026-06-11T09:05:00Z")
  },
  {
    source: "CLINICAL_TRIALS" as const,
    status: "SUCCESS" as const,
    query: "stroke gait high intensity training",
    importedCount: 5,
    skippedCount: 0,
    errorMessage: null,
    metadata: { studyType: "interventional" },
    startedAt: new Date("2026-06-11T13:00:00Z"),
    finishedAt: new Date("2026-06-11T13:01:00Z")
  }
];

async function upsertUser(data: (typeof users)[number]) {
  return prisma.user.upsert({
    where: { email: data.email },
    create: data,
    update: {
      name: data.name,
      role: data.role,
      provider: data.provider,
      subscription: data.subscription,
      passwordHash: data.passwordHash
    }
  });
}

async function main() {
  const userMap = new Map<string, Awaited<ReturnType<typeof upsertUser>>>();
  for (const user of users) {
    userMap.set(user.email, await upsertUser(user));
  }

  const categoryMap = new Map<string, { id: string; name: string }>();
  for (const category of categories) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      create: { name: category.name, slug: category.slug },
      update: { name: category.name }
    });
    categoryMap.set(category.slug, { id: saved.id, name: saved.name });
  }

  const articleMap = new Map<string, { id: string; title: string }>();
  for (const article of articles) {
    const { categorySlug, ...articleData } = article;
    const existing = await prisma.article.findFirst({
      where: { sourceUrl: article.sourceUrl },
      select: { id: true }
    });

    const saved = existing
      ? await prisma.article.update({
          where: { id: existing.id },
          data: {
            ...articleData,
            categoryId: categoryMap.get(categorySlug)?.id,
            curatorId: userMap.get("curadoria@fisiobase.academy")?.id,
            rawMetadata: {
              seeded: true,
              identifiers: {
                doi: article.doi,
                pmid: article.pmid,
                pmcid: article.pmcid,
                externalId: article.externalId
              }
            }
          }
        })
      : await prisma.article.create({
          data: {
            ...articleData,
            categoryId: categoryMap.get(categorySlug)?.id,
            curatorId: userMap.get("curadoria@fisiobase.academy")?.id,
            rawMetadata: {
              seeded: true,
              identifiers: {
                doi: article.doi,
                pmid: article.pmid,
                pmcid: article.pmcid,
                externalId: article.externalId
              }
            }
          }
        });

    articleMap.set(article.sourceUrl, { id: saved.id, title: saved.title });
  }

  for (const topic of atlasTopics) {
    const atlas = await prisma.atlasTopic.upsert({
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
        categoryId: categoryMap.get(topic.categorySlug)?.id,
        lastReviewedAt: new Date("2026-06-12T12:00:00Z")
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
        categoryId: categoryMap.get(topic.categorySlug)?.id,
        lastReviewedAt: new Date("2026-06-12T12:00:00Z")
      }
    });

    await prisma.clinicalQuestion.deleteMany({ where: { atlasTopicId: atlas.id } });
    await prisma.atlasOutcome.deleteMany({ where: { atlasTopicId: atlas.id } });
    await prisma.atlasIntervention.deleteMany({ where: { atlasTopicId: atlas.id } });
    await prisma.atlasGuideline.deleteMany({ where: { atlasTopicId: atlas.id } });
    await prisma.atlasArticle.deleteMany({ where: { atlasTopicId: atlas.id } });

    if (topic.clinicalQuestions.length > 0) {
      await prisma.clinicalQuestion.createMany({
        data: topic.clinicalQuestions.map((item) => ({ ...item, atlasTopicId: atlas.id }))
      });
    }
    if (topic.outcomes.length > 0) {
      await prisma.atlasOutcome.createMany({
        data: topic.outcomes.map((item) => ({ ...item, atlasTopicId: atlas.id }))
      });
    }
    if (topic.interventions.length > 0) {
      await prisma.atlasIntervention.createMany({
        data: topic.interventions.map((item) => ({ ...item, atlasTopicId: atlas.id }))
      });
    }
    if (topic.guidelines.length > 0) {
      await prisma.atlasGuideline.createMany({
        data: topic.guidelines.map((item) => ({ ...item, atlasTopicId: atlas.id }))
      });
    }
    for (const ref of topic.articleRefs) {
      const article = articleMap.get(ref.sourceUrl);
      if (!article) continue;
      await prisma.atlasArticle.create({
        data: {
          atlasTopicId: atlas.id,
          articleId: article.id,
          studyDesign: ref.studyDesign,
          evidenceRole: ref.evidenceRole
        }
      });
    }
  }

  for (const trackData of tracks) {
    const track = await prisma.learningTrack.upsert({
      where: { slug: trackData.slug },
      create: {
        title: trackData.title,
        slug: trackData.slug,
        description: trackData.description,
        categoryId: categoryMap.get(trackData.categorySlug)?.id ?? "",
        estimatedMinutes: trackData.estimatedMinutes,
        isPremium: trackData.isPremium,
        publishedAt: trackData.published ? new Date("2026-06-12T09:00:00Z") : null
      },
      update: {
        title: trackData.title,
        description: trackData.description,
        categoryId: categoryMap.get(trackData.categorySlug)?.id ?? "",
        estimatedMinutes: trackData.estimatedMinutes,
        isPremium: trackData.isPremium,
        publishedAt: trackData.published ? new Date("2026-06-12T09:00:00Z") : null
      }
    });

    const existingModules = await prisma.module.findMany({
      where: { trackId: track.id },
      include: { lessons: { include: { quizzes: true } } }
    });

    for (const moduleItem of existingModules) {
      const lessonIds = moduleItem.lessons.map((lesson) => lesson.id);
      if (lessonIds.length > 0) {
        await prisma.progress.deleteMany({ where: { lessonId: { in: lessonIds } } });
        await prisma.lessonArticle.deleteMany({ where: { lessonId: { in: lessonIds } } });
        const quizzes = moduleItem.lessons.flatMap((lesson) => lesson.quizzes.map((quiz) => quiz.id));
        if (quizzes.length > 0) {
          await prisma.quizAttempt.deleteMany({ where: { quizId: { in: quizzes } } });
          await prisma.question.deleteMany({ where: { quizId: { in: quizzes } } });
          await prisma.quiz.deleteMany({ where: { id: { in: quizzes } } });
        }
        await prisma.lesson.deleteMany({ where: { id: { in: lessonIds } } });
      }
      await prisma.module.deleteMany({ where: { id: moduleItem.id } });
    }

    for (const moduleData of trackData.modules) {
      const module = await prisma.module.create({
        data: {
          title: moduleData.title,
          order: moduleData.order,
          trackId: track.id
        }
      });

      for (const lessonData of moduleData.lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            title: lessonData.title,
            order: lessonData.order,
            estimatedMinutes: lessonData.estimatedMinutes,
            content: lessonData.content,
            moduleId: module.id
          }
        });

        for (const articleSourceUrl of lessonData.articleSourceUrls) {
          const article = articleMap.get(articleSourceUrl);
          if (!article) continue;
          await prisma.lessonArticle.create({
            data: {
              lessonId: lesson.id,
              articleId: article.id
            }
          });
        }

        for (const quizData of lessonData.quizzes) {
          const quiz = await prisma.quiz.create({
            data: {
              title: quizData.title,
              lessonId: lesson.id,
              trackId: track.id,
              isFinal: quizData.isFinal
            }
          });

          for (const question of quizData.questions) {
            await prisma.question.create({
              data: {
                quizId: quiz.id,
                statement: question.statement,
                options: question.options,
                correctOption: question.correctOption,
                explanation: question.explanation
              }
            });
          }

          if (quizData.isFinal) {
            await prisma.quizAttempt.create({
              data: {
                userId: userMap.get("aluna.demo@fisiobase.academy")!.id,
                quizId: quiz.id,
                score: "92.00",
                answers: {
                  seeded: true,
                  selected: [1]
                }
              }
            });
          }
        }

        await prisma.progress.upsert({
          where: {
            userId_lessonId: {
              userId: userMap.get("aluna.demo@fisiobase.academy")!.id,
              lessonId: lesson.id
            }
          },
          create: {
            userId: userMap.get("aluna.demo@fisiobase.academy")!.id,
            lessonId: lesson.id,
            studiedSeconds: Math.min(lessonData.estimatedMinutes * 50, 1800),
            completed: lessonData.order === 1,
            grade: lessonData.order === 1 ? "88.00" : null,
            completedAt: lessonData.order === 1 ? new Date("2026-06-13T16:00:00Z") : null
          },
          update: {
            studiedSeconds: Math.min(lessonData.estimatedMinutes * 50, 1800),
            completed: lessonData.order === 1,
            grade: lessonData.order === 1 ? "88.00" : null,
            completedAt: lessonData.order === 1 ? new Date("2026-06-13T16:00:00Z") : null
          }
        });
      }
    }
  }

  const firstTrack = await prisma.learningTrack.findUnique({
    where: { slug: "reabilitacao-pos-avc-funcional" }
  });

  if (firstTrack) {
    await prisma.certificate.upsert({
      where: { code: "FISIO-AVC-2026-001" },
      create: {
        userId: userMap.get("aluna.demo@fisiobase.academy")!.id,
        trackId: firstTrack.id,
        code: "FISIO-AVC-2026-001",
        qrCodeUrl: "/certificates/FISIO-AVC-2026-001/qr",
        pdfUrl: "/certificates/FISIO-AVC-2026-001.pdf",
        status: "ISSUED" as const
      },
      update: {
        userId: userMap.get("aluna.demo@fisiobase.academy")!.id,
        trackId: firstTrack.id,
        qrCodeUrl: "/certificates/FISIO-AVC-2026-001/qr",
        pdfUrl: "/certificates/FISIO-AVC-2026-001.pdf",
        status: "ISSUED" as const
      }
    });
  }

  for (const log of importLogs) {
    const existing = await prisma.importLog.findFirst({
      where: { source: log.source, query: log.query }
    });
    if (existing) {
      await prisma.importLog.update({
        where: { id: existing.id },
        data: log
      });
    } else {
      await prisma.importLog.create({ data: log });
    }
  }

  const professional = userMap.get("fisio.premium@fisiobase.academy");
  if (professional) {
    const flashcards = [
      {
        front: "Qual e a recomendacao principal para DPOC em reabilitacao pulmonar?",
        back: "Treino aerobico + fortalecimento com educacao e progressao monitorada."
      },
      {
        front: "Qual metrica funcional e comum na prevencao de quedas?",
        back: "Teste de sentar e levantar, equilibrio e velocidade de marcha, conforme objetivo."
      }
    ];

    for (const card of flashcards) {
      const existing = await prisma.flashcard.findFirst({
        where: { userId: professional.id, front: card.front }
      });
      if (existing) {
        await prisma.flashcard.update({
          where: { id: existing.id },
          data: { back: card.back, dueAt: new Date("2026-06-20T12:00:00Z") }
        });
      } else {
        await prisma.flashcard.create({
          data: {
            userId: professional.id,
            front: card.front,
            back: card.back,
            dueAt: new Date("2026-06-20T12:00:00Z")
          }
        });
      }
    }
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
