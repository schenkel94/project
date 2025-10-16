import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartAssessment: () => void;
}

export default function HeroSection({ onStartAssessment }: HeroSectionProps) {
  return (
    <section id="inicio" className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Stop Bet Brasil
        </h1>

        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-8 animate-fade-in-delay-1">
          Reconheça, Relaxe e Reconstrua
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
          Um espaço seguro para identificar o vício em apostas e encontrar formas saudáveis de lidar com a ansiedade.
        </p>

        <button
          onClick={onStartAssessment}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2 animate-fade-in-delay-3"
        >
          Iniciar Autoavaliação
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
