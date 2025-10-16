import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">Stop Bet Brasil</span>
          </div>

          <div className="text-gray-400 text-center md:text-right">
            <p className="flex items-center gap-2 justify-center md:justify-end">
              Feito com <Heart className="w-4 h-4 text-red-500" /> para ajudar pessoas
            </p>
            <p className="text-sm mt-2">
              © 2025 Stop Bet Brasil. Todos os direitos reservados.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Este site não substitui ajuda profissional. Se você está enfrentando problemas com apostas, procure um psicólogo ou grupo de apoio especializado.
          </p>
        </div>
      </div>
    </footer>
  );
}
