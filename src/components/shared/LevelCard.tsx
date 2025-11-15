'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Play, Check, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Level } from '@/types';

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  isCompleted: boolean;
  onPlay: () => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

const gameIcons: Record<string, string> = {
  memory: '🎴',
  'spot-difference': '🔍',
  'hidden-objects': '🕵️',
  'word-search': '📝',
  puzzle: '🧩',
};

export default function LevelCard({ level, isUnlocked, isCompleted, onPlay }: LevelCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
    >
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          mounted && isCompleted
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-400'
            : isUnlocked
            ? 'bg-gradient-to-br from-birthday-lavender to-white border-birthday-skyBlue hover:shadow-xl'
            : 'bg-gray-100 border-gray-300 opacity-60'
        )}
      >
        {/* Completed Badge */}
        {mounted && isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg z-10"
          >
            <Check size={20} className="text-white" />
          </motion.div>
        )}

        {/* Locked Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 backdrop-blur-[1px] z-10">
            <div className="text-center">
              <Lock size={40} className="text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Complete Previous Level</p>
            </div>
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{gameIcons[level.gameType]}</span>
                <span
                  className={cn(
                    'text-xs px-2 py-1 rounded-full font-medium',
                    difficultyColors[level.difficulty]
                  )}
                >
                  {level.difficulty.toUpperCase()}
                </span>
              </div>
              <CardTitle className="text-xl font-heading text-primary">
                Level {level.id}: {level.title}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-sm text-gray-600 mt-2">
            {level.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            onClick={onPlay}
            disabled={!isUnlocked}
            className={cn(
              'w-full',
              mounted && isCompleted
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue hover:from-birthday-skyBlue hover:to-birthday-deepBlue'
            )}
            size="lg"
          >
            {mounted && isCompleted ? (
              <>
                <Check className="mr-2" size={20} />
                Play Again
              </>
            ) : isUnlocked ? (
              <>
                <Play className="mr-2" size={20} />
                Start Game
              </>
            ) : (
              <>
                <Lock className="mr-2" size={20} />
                Locked
              </>
            )}
          </Button>

          {/* Progress Indicator */}
          <div className="mt-3 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all',
                  i <= level.id
                    ? mounted && isCompleted
                      ? 'bg-green-500'
                      : isUnlocked
                      ? 'bg-birthday-skyBlue'
                      : 'bg-gray-300'
                    : 'bg-gray-200'
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
