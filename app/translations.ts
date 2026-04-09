import { Lang } from '@/types'

export const STANDARD_BENEFIT_IDS = ['economic_income', 'sense_energy', 'future_positioning'] as const
export const STANDARD_COST_IDS = ['frustration', 'lost_time', 'dispersion'] as const

export type StandardBenefitId = (typeof STANDARD_BENEFIT_IDS)[number]
export type StandardCostId = (typeof STANDARD_COST_IDS)[number]

interface ItemDef { label: string; tooltip: string }

const translations = {
  en: {
    // Header
    headerMono: 'Laplace Calculator',
    headerItalic: 'Calculate your',
    headerHope: 'hope',
    switchLang: 'Español',

    // Tabs
    tabCalc: 'Calculate',
    tabCompare: 'Compare',
    tabWhy: 'Why?',

    // Sidebar
    sidebarLabel: 'Projects',
    sidebarNew: '+ new',

    // Calc tab
    sectionBenefits: 'Benefits',
    sectionCosts: 'Costs & Risks',
    sectionLevers: 'Levers',
    leversSubtitle: '· sorted by impact',
    addBenefit: 'add benefit',
    addCost: 'add cost / risk',
    labelProbability: 'probability',
    labelValue: 'value',
    labelCost: 'cost',
    newBenefitLabel: 'New benefit',
    newCostLabel: 'New cost',
    projectPlaceholder: 'Project name',
    defaultProjectName: 'Example Project',
    tooltipEditHint: 'Add a note or context for this item...',

    // E interpretation
    eVeryGood: 'Very worth playing this game.',
    eGood: 'Worth trying.',
    eFragile: 'Fragile hope. Review the levers.',
    eBad: 'Negative hope. What can you change?',

    // Compare tab
    rankingTitle: 'Ranking',
    bestBadge: 'best',

    // Standard items — labels and real explanatory tooltips
    standardBenefits: {
      economic_income: {
        label: 'Economic income',
        tooltip:
          'The concrete money this project can generate for you. Could it cover expenses, give you financial independence, or become a real source of income in the coming months? Rate how significant the potential financial upside is (0 = negligible, 100 = life-changing).',
      },
      sense_energy: {
        label: 'Sense / energy',
        tooltip:
          'The motivation and vital energy this project awakens in you. Does it make you feel alive and purposeful? Projects with high intrinsic meaning sustain effort even when results are slow. Rate how much this project energizes you (0 = draining, 100 = deeply fulfilling).',
      },
      future_positioning: {
        label: 'Future positioning',
        tooltip:
          'The doors this project can open for you even if it generates no money today: reputation, valuable contacts, transferable learning, market presence. Rate the long-term strategic value of attempting this project (0 = no spillover, 100 = major career or life leverage).',
      },
    } as Record<string, ItemDef>,

    standardCosts: {
      frustration: {
        label: 'Frustration',
        tooltip:
          'The emotional cost if the project fails or disappoints you. Some people bounce back quickly; others carry failure hard. Rate how much this specific project could hurt you emotionally if it doesn\'t work out (0 = I\'d shrug it off, 100 = deeply devastating).',
      },
      lost_time: {
        label: 'Lost time',
        tooltip:
          'The hours, weeks, or months you would invest that you cannot recover if the project doesn\'t succeed. Time is finite — this cost reflects the opportunity cost of your attention. Rate how significant the time investment is relative to your current life situation (0 = minimal, 100 = a major chunk of your year).',
      },
      dispersion: {
        label: 'Dispersion / loss of focus',
        tooltip:
          'The focus and energy you would divert from other projects, relationships, or priorities by committing to this one. Every bet has an attention cost. Rate how much this project would fragment your focus at this moment in your life (0 = I can do it alongside everything, 100 = it demands full dedication).',
      },
    } as Record<string, ItemDef>,

    // Why tab
    whyTitle1: 'Why calculate',
    whyHope: 'hope',
    whyTitle2: '?',
    whyStory: [
      'I spent days lost. Unmotivated, without seeing the future clearly. But I noticed something: every time a promising idea appeared, the energy came back. Suddenly I wanted to wake up, talk, create.',
      'I asked myself what that was. And I realized: it was hope. Not naive optimism or blind faith, but something more precise — the perception that the future could be better if I acted well.',
      'I happened to be reading Laplace. I found it beautiful that something so human, so intimate, had a formula. I decided to mathematize my own hope. Not to predict the future, but to understand what moves me — and to design it.',
    ],
    whyLaplaceTitle: "What is hope according to Laplace?",
    whyLaplaceBody:
      '"The advantage of one who expects any good thing within assumptions that are only probable." Not optimism. Not faith. A rational measure of how worthwhile it is to embark on something, given the probabilities and values at play.',
    whyEquationTitle: 'The equation',
    whyEquationNote:
      'The values are subjective. And that doesn\'t invalidate them — it makes them yours. No one but you knows how much something is worth to you, or how much a failure costs you.',
    whyLeversTitle: 'The 4 levers to raise E',
    whyLevers: [
      {
        sym: '↑ P(i)',
        title: 'More information, better teams',
        desc: 'They increase the probability of success. The more you know and the better surrounded you are, the higher P(i).',
      },
      {
        sym: '↑ V(i)',
        title: 'Choose projects that truly matter',
        desc: 'A project that genuinely moves you has a high V(i). Subjective value counts.',
      },
      {
        sym: '↓ C(j)',
        title: 'Reduce the cost of trying',
        desc: 'Fast MVP over long commitment. The less the attempt costs, the freer you are to bet.',
      },
      {
        sym: '↑ n',
        title: 'More parallel bets',
        desc: 'The law of large numbers works in your favor. Diversifying is a hope strategy.',
      },
    ],
    whyClosing: 'Hope is not just calculated. It is also designed.',
    whyCTA: 'Calculate your first hope →',
    whyVarTitle: 'Variables',
    whyVarItems: [
      { sym: 'P(i)', desc: 'Probability that benefit i occurs (between 0 and 1).' },
      { sym: 'V(i)', desc: 'Subjective value of that benefit (scale 0–100).' },
      { sym: 'P(j)', desc: 'Probability that cost j occurs (between 0 and 1).' },
      { sym: 'C(j)', desc: 'Magnitude of cost j (scale 0–100).' },
    ],

    // Footer
    footer: 'E = Σ P(i)·V(i) − Σ P(j)·C(j) · Laplace, Théorie analytique des probabilités',
  },

  es: {
    headerMono: 'Calculadora Laplace',
    headerItalic: 'Calculá tu',
    headerHope: 'esperanza',
    switchLang: 'English',

    tabCalc: 'Calculá',
    tabCompare: 'Comparar',
    tabWhy: '¿Por qué?',

    sidebarLabel: 'Proyectos',
    sidebarNew: '+ nuevo',

    sectionBenefits: 'Beneficios',
    sectionCosts: 'Costos y Riesgos',
    sectionLevers: 'Palancas',
    leversSubtitle: '· ordenadas por impacto',
    addBenefit: 'agregar beneficio',
    addCost: 'agregar costo / riesgo',
    labelProbability: 'probabilidad',
    labelValue: 'valor',
    labelCost: 'costo',
    newBenefitLabel: 'Nuevo beneficio',
    newCostLabel: 'Nuevo costo',
    projectPlaceholder: 'Nombre del proyecto',
    defaultProjectName: 'Proyecto Ejemplo',
    tooltipEditHint: 'Agregá una nota o contexto para este ítem...',

    eVeryGood: 'Vale mucho la pena jugar este juego.',
    eGood: 'Vale la pena intentarlo.',
    eFragile: 'Esperanza frágil. Revisá las palancas.',
    eBad: 'Esperanza negativa. ¿Qué podés cambiar?',

    rankingTitle: 'Ranking',
    bestBadge: 'mejor',

    standardBenefits: {
      economic_income: {
        label: 'Ingreso económico',
        tooltip:
          'El dinero concreto que este proyecto puede generarte. ¿Podría cubrir gastos, darte independencia económica o ser una fuente de ingresos real en los próximos meses? Valorá qué tan significativo es el potencial económico (0 = irrelevante, 100 = transformador).',
      },
      sense_energy: {
        label: 'Sentido / energía',
        tooltip:
          'La motivación y energía vital que el proyecto despierta en vos. ¿Te hace sentir vivo y con propósito? Los proyectos con alto sentido intrínseco sostienen el esfuerzo incluso cuando los resultados tardan. Valorá cuánto te energiza este proyecto (0 = te drena, 100 = te llena profundamente).',
      },
      future_positioning: {
        label: 'Posicionamiento futuro',
        tooltip:
          'Las puertas que este proyecto puede abrirte aunque hoy no genere dinero: reputación, contactos valiosos, aprendizaje transferible, presencia en el mercado. Valorá el impacto estratégico de largo plazo (0 = sin impacto colateral, 100 = gran apalancamiento vital o profesional).',
      },
    } as Record<string, ItemDef>,

    standardCosts: {
      frustration: {
        label: 'Frustración',
        tooltip:
          'El costo emocional si el proyecto falla o te decepciona. Algunas personas se recuperan rápido; otras cargan el fracaso con fuerza. Valorá cuánto te podría dañar emocionalmente este proyecto si no funciona (0 = lo sacudo y sigo, 100 = devastador).',
      },
      lost_time: {
        label: 'Tiempo perdido',
        tooltip:
          'Las horas, semanas o meses que invertirías y que no podrías recuperar si el proyecto no prospera. El tiempo es finito — este costo refleja el costo de oportunidad de tu atención. Valorá qué tan significativa es la inversión de tiempo en tu vida actual (0 = mínima, 100 = una parte grande de tu año).',
      },
      dispersion: {
        label: 'Dispersión / desenfoque',
        tooltip:
          'El foco y energía que desviarías de otros proyectos, relaciones o prioridades al comprometerte con este. Cada apuesta tiene un costo de atención. Valorá cuánto fragmentaría tu foco este proyecto en este momento de tu vida (0 = puedo hacerlo junto a todo lo demás, 100 = exige dedicación total).',
      },
    } as Record<string, ItemDef>,

    whyTitle1: '¿Por qué calcular la',
    whyHope: 'esperanza',
    whyTitle2: '?',
    whyStory: [
      'Pasé días perdido. Desganado, sin ver el futuro con claridad. Pero noté algo: cada vez que aparecía una idea prometedora, volvía la energía. De repente tenía ganas de levantarme, de hablar, de crear.',
      'Me pregunté qué era eso. Y me di cuenta: era la esperanza. No el optimismo ingenuo ni la fe ciega, sino algo más preciso: la percepción de que el futuro podía ser mejor si actuaba bien.',
      'Justo estaba leyendo a Laplace. Me pareció hermoso que algo tan humano, tan íntimo, tuviera una fórmula. Decidí matematizar mi propia esperanza. No para predecir el futuro, sino para entender qué me mueve y para diseñarla.',
    ],
    whyLaplaceTitle: '¿Qué es la esperanza según Laplace?',
    whyLaplaceBody:
      '"La ventaja del que espera un bien cualquiera dentro de suposiciones que son solo probables." No es optimismo. No es fe. Es una medida racional de cuánto vale la pena embarcarse en algo, dadas las probabilidades y los valores en juego.',
    whyEquationTitle: 'La ecuación',
    whyEquationNote:
      'Los valores son subjetivos. Y eso no los invalida, los hace propios. Nadie más que vos sabe cuánto vale para vos algo o cuánto te cuesta un fracaso.',
    whyLeversTitle: 'Las 4 palancas para subir E',
    whyLevers: [
      {
        sym: '↑ P(i)',
        title: 'Más información, mejores equipos',
        desc: 'Aumentan la probabilidad de éxito. Cuanto más sabés y mejor te rodeás, más alta es P(i).',
      },
      {
        sym: '↑ V(i)',
        title: 'Elegí proyectos que realmente importen',
        desc: 'Un proyecto que te mueve de verdad tiene un V(i) alto. El valor subjetivo importa.',
      },
      {
        sym: '↓ C(j)',
        title: 'Reducí el costo de intentar',
        desc: 'MVP rápido antes que compromiso largo. Cuanto menos cuesta el intento, más libre sos para apostar.',
      },
      {
        sym: '↑ n',
        title: 'Más apuestas en paralelo',
        desc: 'La ley de los grandes números trabaja a tu favor. Diversificar es una estrategia de esperanza.',
      },
    ],
    whyClosing: 'La esperanza no solo se calcula. También se diseña.',
    whyCTA: 'Calculá tu primera esperanza →',
    whyVarTitle: 'Variables',
    whyVarItems: [
      { sym: 'P(i)', desc: 'Probabilidad de que ocurra el beneficio i (entre 0 y 1).' },
      { sym: 'V(i)', desc: 'Valor subjetivo de ese beneficio (escala 0–100).' },
      { sym: 'P(j)', desc: 'Probabilidad de que ocurra el costo j (entre 0 y 1).' },
      { sym: 'C(j)', desc: 'Magnitud del costo j (escala 0–100).' },
    ],

    footer: 'E = Σ P(i)·V(i) − Σ P(j)·C(j) · Laplace, Théorie analytique des probabilités',
  },
} as const

export type Translations = (typeof translations)['en']

export function tr(lang: Lang): Translations {
  return translations[lang] as unknown as Translations
}

export function eLabel(E: number, lang: Lang): string {
  const t = tr(lang)
  if (E > 40) return t.eVeryGood
  if (E > 0) return t.eGood
  if (E > -40) return t.eFragile
  return t.eBad
}
