import { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle, BookOpen, ShoppingCart } from 'lucide-react';
import { enviarLead, type LeadData } from '../utils/googleSheets';
import { quizQuestions, calculateResult, type QuizResult } from '../data/quizData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'lead' | 'quiz' | 'result';

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [step, setStep] = useState<Step>('lead');
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ nome: '', email: '', telefone: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  if (!isOpen) return null;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await enviarLead(leadData);

      if (response.status === 'success') {
        setStep('quiz');
      } else {
        alert('Não conseguimos salvar seus dados, mas você pode continuar o teste.');
        setStep('quiz');
      }
    } catch (error) {
      alert('Não conseguimos salvar seus dados, mas você pode continuar o teste.');
      setStep('quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      const quizResult = calculateResult(totalScore);
      setResult(quizResult);
      setStep('result');
    }
  };

  const resetQuiz = () => {
    setStep('lead');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setLeadData({ nome: '', email: '', telefone: '' });
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const renderLeadForm = () => (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Iniciar Autoavaliação</h2>
        <button onClick={handleClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-300 mb-6">
        Adicione seus dados para iniciar o teste confidencial.
      </p>

      <form onSubmit={handleLeadSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Nome *</label>
          <input
            type="text"
            required
            value={leadData.nome}
            onChange={(e) => setLeadData({ ...leadData, nome: e.target.value })}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">E-mail *</label>
          <input
            type="email"
            required
            value={leadData.email}
            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Telefone (opcional)</label>
          <input
            type="tel"
            value={leadData.telefone}
            onChange={(e) => setLeadData({ ...leadData, telefone: e.target.value })}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
            placeholder="(00) 00000-0000"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !leadData.nome || !leadData.email}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Salvando...
            </>
          ) : (
            'Iniciar Autoavaliação'
          )}
        </button>
      </form>
    </div>
  );

  const renderQuiz = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Questão {currentQuestion + 1} de {quizQuestions.length}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl text-white mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.points)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg text-left transition-all border border-gray-700 hover:border-cyan-500"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    const colorMap = {
      baixo: 'from-green-500 to-emerald-500',
      moderado: 'from-yellow-500 to-orange-500',
      alto: 'from-orange-500 to-red-500',
      severo: 'from-red-500 to-pink-500',
    };

    return (
      <div className="p-8">
        <div className="flex justify-end mb-4">
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${colorMap[result.level]} flex items-center justify-center mb-6`}>
            {result.level === 'baixo' ? (
              <CheckCircle className="w-12 h-12 text-white" />
            ) : (
              <AlertCircle className="w-12 h-12 text-white" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
          <p className="text-lg text-gray-300 mb-2">Pontuação: {result.score} de 21</p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
          <p className="text-gray-200 leading-relaxed">{result.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Recomendações:</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <a
            href="https://schenkel94.github.io/meu_livro/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gray-800 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all inline-flex items-center justify-center gap-2 border border-gray-700"
          >
            <BookOpen className="w-5 h-5" />
            Baixar Capítulo Gratuito
          </a>

          <a
            href="https://pay.hotmart.com/K99480183N?off=1pvjm7kd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all inline-flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Comprar Ebook Completo
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {step === 'lead' && renderLeadForm()}
        {step === 'quiz' && renderQuiz()}
        {step === 'result' && renderResult()}
      </div>
    </div>
  );
}
