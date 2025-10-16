export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Com que frequência você pensa em apostas?',
    options: [
      { text: 'Raramente ou nunca', points: 0 },
      { text: 'Ocasionalmente', points: 1 },
      { text: 'Frequentemente', points: 2 },
      { text: 'O tempo todo', points: 3 },
    ],
  },
  {
    id: 2,
    question: 'Você já tentou parar ou reduzir as apostas sem sucesso?',
    options: [
      { text: 'Nunca tentei', points: 0 },
      { text: 'Sim, uma vez', points: 1 },
      { text: 'Sim, várias vezes', points: 2 },
      { text: 'Sim, muitas vezes sem sucesso', points: 3 },
    ],
  },
  {
    id: 3,
    question: 'Você aposta quantias cada vez maiores para sentir a mesma emoção?',
    options: [
      { text: 'Não', points: 0 },
      { text: 'Raramente', points: 1 },
      { text: 'Às vezes', points: 2 },
      { text: 'Frequentemente', points: 3 },
    ],
  },
  {
    id: 4,
    question: 'Você já mentiu para família ou amigos sobre quanto aposta?',
    options: [
      { text: 'Nunca', points: 0 },
      { text: 'Uma ou duas vezes', points: 1 },
      { text: 'Algumas vezes', points: 2 },
      { text: 'Frequentemente', points: 3 },
    ],
  },
  {
    id: 5,
    question: 'Você sente ansiedade ou irritação quando não pode apostar?',
    options: [
      { text: 'Não', points: 0 },
      { text: 'Às vezes', points: 1 },
      { text: 'Frequentemente', points: 2 },
      { text: 'Sempre', points: 3 },
    ],
  },
  {
    id: 6,
    question: 'As apostas já afetaram negativamente seu trabalho, estudos ou relacionamentos?',
    options: [
      { text: 'Não', points: 0 },
      { text: 'Levemente', points: 1 },
      { text: 'Moderadamente', points: 2 },
      { text: 'Severamente', points: 3 },
    ],
  },
  {
    id: 7,
    question: 'Você já pediu dinheiro emprestado para apostar ou pagar dívidas de apostas?',
    options: [
      { text: 'Nunca', points: 0 },
      { text: 'Uma vez', points: 1 },
      { text: 'Algumas vezes', points: 2 },
      { text: 'Frequentemente', points: 3 },
    ],
  },
];

export interface QuizResult {
  score: number;
  level: 'baixo' | 'moderado' | 'alto' | 'severo';
  title: string;
  description: string;
  recommendations: string[];
}

export function calculateResult(score: number): QuizResult {
  if (score <= 5) {
    return {
      score,
      level: 'baixo',
      title: 'Risco Baixo',
      description: 'Seu comportamento indica um envolvimento mínimo com apostas. Continue atento aos sinais e mantenha o controle.',
      recommendations: [
        'Estabeleça limites claros para apostas recreativas',
        'Monitore seus hábitos regularmente',
        'Leia o capítulo gratuito para se informar melhor',
      ],
    };
  } else if (score <= 10) {
    return {
      score,
      level: 'moderado',
      title: 'Risco Moderado',
      description: 'Seu comportamento indica alguns sinais de alerta. É importante prestar atenção e considerar mudanças.',
      recommendations: [
        'Reflita sobre seus hábitos de apostas',
        'Considere reduzir a frequência e valores',
        'Baixe o capítulo gratuito para entender melhor o vício',
        'Converse com alguém de confiança sobre suas preocupações',
      ],
    };
  } else if (score <= 15) {
    return {
      score,
      level: 'alto',
      title: 'Risco Alto',
      description: 'Seu comportamento indica risco significativo. É fundamental buscar ajuda e implementar mudanças imediatas.',
      recommendations: [
        'Procure apoio profissional especializado',
        'Adquira o eBook completo para um guia detalhado de recuperação',
        'Afaste-se de situações que estimulem as apostas',
        'Compartilhe sua situação com pessoas próximas',
        'Considere grupos de apoio',
      ],
    };
  } else {
    return {
      score,
      level: 'severo',
      title: 'Risco Severo',
      description: 'Seu comportamento indica dependência severa. Busque ajuda profissional imediatamente.',
      recommendations: [
        'Procure ajuda profissional urgentemente',
        'Entre em contato com grupos de apoio (Jogadores Anônimos)',
        'Adquira o eBook completo com estratégias de recuperação',
        'Afaste-se completamente de ambientes de apostas',
        'Busque apoio da família e amigos',
        'Considere tratamento especializado',
      ],
    };
  }
}
