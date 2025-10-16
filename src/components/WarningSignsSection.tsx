import { Brain, TrendingUp, RotateCcw, MessageCircle, Frown, Briefcase, DollarSign } from 'lucide-react';

export default function WarningSignsSection() {
  const signs = [
    {
      icon: Brain,
      text: 'Pensar constantemente em apostas',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      text: 'Apostar quantias cada vez maiores',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: RotateCcw,
      text: 'Tentar recuperar perdas apostando mais',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: MessageCircle,
      text: 'Mentir sobre apostas para amigos e família',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Frown,
      text: 'Sentir ansiedade ou irritabilidade ao não apostar',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: Briefcase,
      text: 'Negligenciar trabalho, estudos ou relacionamentos',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: DollarSign,
      text: 'Pedir dinheiro emprestado para apostar',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="sinais" className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sinais de Alerta
          </h2>
          <p className="text-xl text-gray-300">
            Reconhecer os sinais é o primeiro passo para buscar ajuda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {signs.map((sign, index) => {
            const Icon = sign.icon;
            return (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-all animate-fade-in-up flex items-start gap-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sign.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-200 text-lg pt-2">{sign.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">
            Se você identificou 3 ou mais desses sinais, considere buscar ajuda profissional.
          </p>
        </div>
      </div>
    </section>
  );
}
