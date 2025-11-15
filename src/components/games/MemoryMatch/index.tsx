'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';
import MemoryCard from './MemoryCard';
import { generateCards } from '@/data/memoryCards';
import { giftCollectedConfetti, celebrationConfetti } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gifts } from '@/data/gifts';

interface Card {
  id: number;
  image: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const gift = gifts.find((g) => g.level === 1);
  const totalPairs = 8;

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Check for match
  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setFlippedCards([]);
          setCanFlip(true);
          giftCollectedConfetti();
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setCanFlip(true);
        }, 1200);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === totalPairs && matchedPairs > 0) {
      setTimeout(() => {
        setIsComplete(true);
        celebrationConfetti();
        completeLevel(1);
      }, 500);
    }
  }, [matchedPairs]);

  const resetGame = () => {
    const newCards = generateCards().map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsComplete(false);
    setCanFlip(true);
  };

  const handleCardClick = (id: number) => {
    if (!canFlip || flippedCards.length >= 2) return;

    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, id]);
  };

  const handleContinue = () => {
    router.push(`/riddle/1`);
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold font-heading text-primary mb-2">
                  🎴 Memory Match
                </h1>
                <p className="text-gray-600">Match all pairs to unlock your first clue!</p>
              </div>

              <div className="flex gap-4">
                <Card className="bg-birthday-lavender border-birthday-skyBlue">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600">Moves</p>
                    <p className="text-2xl font-bold text-primary">{moves}</p>
                  </CardContent>
                </Card>

                <Card className="bg-birthday-lavender border-birthday-skyBlue">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600">Pairs</p>
                    <p className="text-2xl font-bold text-primary">
                      {matchedPairs}/{totalPairs}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              id={card.id}
              image={card.image}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>

        {/* Reset Button */}
        <div className="text-center mb-6">
          <Button
            onClick={resetGame}
            variant="outline"
            className="border-birthday-deepBlue text-birthday-deepBlue hover:bg-birthday-lavender"
          >
            <RotateCcw className="mr-2" size={20} />
            Restart Game
          </Button>
        </div>

        {/* Completion Modal */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={(e) => e.target === e.currentTarget && null}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-6 mb-6"
                  >
                    <Trophy size={48} className="text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold font-heading text-primary mb-4">
                    🎉 Congratulations! 🎉
                  </h2>

                  <p className="text-gray-600 mb-2">You completed the game in</p>
                  <p className="text-4xl font-bold text-birthday-deepBlue mb-6">
                    {moves} moves
                  </p>

                  <div className="bg-birthday-lavender rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-2">
                      You've unlocked a clue for:
                    </p>
                    <p className="text-xl font-bold text-primary">
                      🎁 {gift?.name}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="mr-2" size={20} />
                      Play Again
                    </Button>
                    <Button
                      onClick={handleContinue}
                      className="flex-1 bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue"
                    >
                      Solve Riddle →
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
