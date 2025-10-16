import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BubbleGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export default function BubbleGame({ isOpen, onClose }: BubbleGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    'from-cyan-400 to-blue-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500',
  ];

  useEffect(() => {
    if (!isOpen) {
      setGameStarted(false);
      setGameEnded(false);
      setScore(0);
      setTimeLeft(300);
      setBubbles([]);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const spawnBubble = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.random() * 40 + 40;

      const newBubble: Bubble = {
        id: Date.now() + Math.random(),
        x: Math.random() * (rect.width - size),
        y: rect.height,
        size,
        speed: Math.random() * 1 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setBubbles((prev) => [...prev, newBubble]);
    };

    const spawnInterval = setInterval(spawnBubble, 800);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const animate = () => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y - bubble.speed,
          }))
          .filter((bubble) => bubble.y > -bubble.size)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameEnded]);

  const handleBubbleClick = (id: number) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setTimeLeft(300);
    setBubbles([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full h-[80vh] border border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Jogo Calmante</h2>
            {gameStarted && !gameEnded && (
              <div className="flex gap-6 text-lg">
                <span className="text-cyan-400">
                  Tempo: {formatTime(timeLeft)}
                </span>
                <span className="text-green-400">
                  Bolhas: {score}
                </span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black"
        >
          {!gameStarted && !gameEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-gray-300 text-xl mb-8 text-center max-w-md">
                Jogue por 5 minutos para aliviar a mente. Clique nas bolhas que sobem para estourá-las!
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
              >
                Começar Jogo
              </button>
            </div>
          )}

          {gameEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-gray-800 p-8 rounded-xl text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Parabéns!</h3>
                <p className="text-xl text-cyan-400 mb-6">
                  Você estourou {score} bolhas
                </p>
                <p className="text-gray-300 mb-8 max-w-md">
                  Respire fundo. Você está recomeçando.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Jogar Novamente
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {bubbles.map((bubble) => (
            <button
              key={bubble.id}
              onClick={() => handleBubbleClick(bubble.id)}
              className={`absolute rounded-full bg-gradient-to-br ${bubble.color} opacity-80 hover:opacity-100 transition-opacity cursor-pointer animate-float`}
              style={{
                left: `${bubble.x}px`,
                top: `${bubble.y}px`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
