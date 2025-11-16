'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Lightbulb, MapPin, Gift, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { gifts } from '@/data/gifts';
import { celebrationConfetti, giftCollectedConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';

interface RiddleDisplayProps {
  level: number;
}

export default function RiddleDisplay({ level }: RiddleDisplayProps) {
  const router = useRouter();
  const { collectGift, isGiftCollected } = useGameProgress();
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showError, setShowError] = useState(false);

  const gift = gifts.find((g) => g.level === level);
  const maxAttempts = 3;

  if (!gift) {
    return <div>Gift not found</div>;
  }

  const alreadyCollected = isGiftCollected(gift.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedAnswer = answer.toLowerCase().trim();
    const correctAnswer = gift.answer.toLowerCase().trim();

    if (normalizedAnswer === correctAnswer) {
      setIsCorrect(true);
      celebrationConfetti();
    } else {
      setShowError(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setShowError(false), 2000);

      // Auto-show hint after max attempts
      if (attempts + 1 >= maxAttempts) {
        setShowHint(true);
      }
    }
  };

  const handleCollectGift = () => {
    collectGift(gift.id);
    giftCollectedConfetti();
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue p-4">
      <div className="container mx-auto max-w-3xl">
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
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isCorrect ? (
            <motion.div
              key="riddle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-white shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-3">
                      <Gift size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-heading">
                        Solve the Riddle
                      </CardTitle>
                      <p className="text-birthday-lavender text-sm mt-1">
                        Level {level} • {gift.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {/* Riddle Text */}
                  <div className="bg-gradient-to-br from-birthday-lavender to-birthday-lightBlue rounded-xl p-6 mb-6">
                    <p className="text-lg text-gray-800 leading-relaxed text-center italic">
                      "{gift.riddleClue}"
                    </p>
                  </div>

                  {/* Answer Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Where is the gift hidden?
                      </label>
                      <Input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter your answer..."
                        className="text-lg"
                        disabled={alreadyCollected}
                      />
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                        >
                          <p className="text-sm">
                            ❌ Not quite right. Try again! ({maxAttempts - attempts} attempts left)
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hint Button */}
                    {!showHint && attempts < maxAttempts && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowHint(true)}
                        className="w-full border-birthday-skyBlue text-birthday-deepBlue"
                      >
                        <Lightbulb className="mr-2" size={20} />
                        Need a Hint?
                      </Button>
                    )}

                    {/* Hint Display */}
                    <AnimatePresence>
                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                        >
                          <div className="flex items-start gap-2">
                            <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                            <div>
                              <p className="text-sm font-medium text-yellow-800 mb-1">
                                Hint:
                              </p>
                              <p className="text-sm text-yellow-700">
                                Think about where you typically keep "{gift.name.toLowerCase()}"...
                                The answer is one or two words.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    {!alreadyCollected && (
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-lg py-6"
                        disabled={!answer.trim()}
                      >
                        Submit Answer
                      </Button>
                    )}

                    {alreadyCollected && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-700 font-medium">
                          ✅ You've already collected this gift!
                        </p>
                      </div>
                    )}
                  </form>

                  {/* Attempts Counter */}
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Attempts: {attempts}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="location"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="bg-white shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-block bg-white/20 rounded-full p-4 mb-3"
                    >
                      <Sparkles size={40} />
                    </motion.div>
                    <CardTitle className="text-3xl font-heading">
                      🎉 Correct! 🎉
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-8 text-center">
                  <p className="text-xl text-gray-700 mb-6">
                    You solved it in <span className="font-bold text-birthday-deepBlue">{attempts + 1}</span> attempt{attempts === 0 ? '' : 's'}!
                  </p>

                  {/* Gift Location */}
                  <div className="bg-gradient-to-br from-birthday-lavender to-birthday-lightBlue rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <MapPin className="text-birthday-deepBlue" size={32} />
                      <h3 className="text-2xl font-bold font-heading text-primary">
                        Gift Location
                      </h3>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">
                      {gift.houseLocation}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      💡 Go find your <span className="font-bold"> Gift </span> and come back to mark it as collected!
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {!alreadyCollected ? (
                      <Button
                        onClick={handleCollectGift}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg py-6"
                      >
                        <Gift className="mr-2" size={24} />
                        I Found It! Mark as Collected
                      </Button>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-700 font-medium">
                          ✅ Gift Already Collected!
                        </p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      onClick={handleBackToDashboard}
                      className="w-full"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
