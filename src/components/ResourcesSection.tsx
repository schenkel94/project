import { ClipboardList, Sparkles, AlertTriangle } from 'lucide-react';

interface ResourcesSectionProps {
  onStartAssessment: () => void;
  onStartGame: () => void;
}

export default function ResourcesSection({ onStartAssessment, onStartGame }: ResourcesSectionProps) {
  return (
    <section id="recursos" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Nossos Recursos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Autoavaliação</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Descubra seu nível de envolvimento com apostas através de um questionário confidencial e personalizado.
            </p>
            <button
              onClick={onStartAssessment}
              className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-2"
            >
              Iniciar Quiz
              <span>→</span>
            </button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-green-400 transition-all hover:shadow-lg hover:shadow-green-400/20 cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Jogo Calmante</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Mini-jogo relaxante de estourar bolhas para aliviar a ansiedade e encontrar momentos de paz.
            </p>
            <button
              onClick={onStartGame}
              className="text-green-400 hover:text-green-300 font-semibold inline-flex items-center gap-2"
            >
              Jogar Agora
              <span>→</span>
            </button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-yellow-400 transition-all hover:shadow-lg hover:shadow-yellow-400/20 cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Sinais de Alerta</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Identifique sinais precoces do vício em apostas e saiba quando buscar ajuda profissional.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('sinais');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-2"
            >
              Ver Sinais
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
