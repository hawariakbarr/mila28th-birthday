'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ProgressBar from '@/components/shared/ProgressBar';
import LevelCard from '@/components/shared/LevelCard';
import GiftCard from '@/components/shared/GiftCard';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gifts } from '@/data/gifts';
import { levels } from '@/data/levels';
import { celebrationConfetti } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function GameDashboard() {
  const router = useRouter();
  const {
    progress,
    isLevelUnlocked,
    isLevelCompleted,
    isGiftCollected,
  } = useGameProgress();

  const handlePlayGame = (levelId: number) => {
    router.push(`/game/${levelId}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleViewGreeting = () => {
    celebrationConfetti();
    router.push('/greeting');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue">
      {/* Header */}
      <div className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back
            </Button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold font-heading text-center"
            >
              Birthday Adventure 🎂
            </motion.h1>

            <div className="w-24" /> {/* Spacer for centering */}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-birthday-lavender text-sm md:text-base"
          >
            Complete games, solve riddles, and find your gifts!
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <ProgressBar
            current={progress.collectedGifts.length}
            total={progress.totalGifts}
          />

          {/* View Greeting Card Button */}
          {progress.isGameComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Button
                onClick={handleViewGreeting}
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-600 text-white font-heading text-lg py-6"
              >
                <Sparkles className="mr-2" size={24} />
                View Your Birthday Surprise!
                <Sparkles className="ml-2" size={24} />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Gift Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold font-heading text-primary mb-4 flex items-center gap-2">
            🎁 Your Gifts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                name={gift.name}
                image={gift.image}
                isCollected={isGiftCollected(gift.id)}
                level={gift.level}
              />
            ))}
          </div>
        </motion.div>

        {/* Game Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold font-heading text-primary mb-4 flex items-center gap-2">
            🎮 Game Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                isUnlocked={isLevelUnlocked(level.id)}
                isCompleted={isLevelCompleted(level.id)}
                onPlay={() => handlePlayGame(level.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>💡 Tip: Complete each game to unlock a riddle and find your gift!</p>
        </motion.div>
      </div>
    </div>
  );
}
