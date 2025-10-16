import { Shield } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">Stop Bet Brasil</span>
          </div>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Início
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('recursos')}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Recursos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('sinais')}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Sinais de Alerta
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('comecar')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Começar
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
