import { ArrowRight, BookOpen, ShoppingCart } from 'lucide-react';

interface CTASectionProps {
  onStartAssessment: () => void;
}

export default function CTASection({ onStartAssessment }: CTASectionProps) {
  return (
    <section id="comecar" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Pronto para Começar?
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          A recuperação é uma jornada. Dê o primeiro passo hoje.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            onClick={onStartAssessment}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2 w-full md:w-auto"
          >
            <ArrowRight className="w-5 h-5" />
            Iniciar Autoavaliação
          </button>

          <a
            href="https://schenkel94.github.io/meu_livro/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all transform hover:scale-105 inline-flex items-center gap-2 border border-gray-700 w-full md:w-auto"
          >
            <BookOpen className="w-5 h-5" />
            Capítulo Gratuito
          </a>

          <a
            href="https://pay.hotmart.com/K99480183N?off=1pvjm7kd"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2 w-full md:w-auto"
          >
            <ShoppingCart className="w-5 h-5" />
            Comprar Ebook
          </a>
        </div>
      </div>
    </section>
  );
}
