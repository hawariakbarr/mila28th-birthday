'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Sparkles, Gift, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { celebrationConfetti, giftCollectedConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gifts } from '@/data/gifts';

export default function GreetingCard() {
  const router = useRouter();
  const { progress } = useGameProgress();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Trigger initial celebration
    celebrationConfetti();

    // Auto-open card after a moment
    const timer = setTimeout(() => {
      setIsCardOpen(true);
      giftCollectedConfetti();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCardOpen) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isCardOpen]);

  const collectedGifts = gifts.filter((gift) =>
    progress.collectedGifts.includes(gift.id)
  );

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 overflow-hidden relative">
      {/* Floating celebration elements */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {['🎈', '🎉', '✨', '🎊', '💝'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="mb-4 bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Card */}
        <div className="perspective-1000 min-h-[600px] flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-4xl h-[600px] preserve-3d"
            animate={{ rotateY: isCardOpen ? 180 : 0 }}
            transition={{ duration: 1.2, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Front */}
            <motion.div
              className="absolute inset-0 w-full h-full backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Card className="bg-gradient-to-br from-birthday-deepBlue to-birthday-skyBlue text-white shadow-2xl h-[600px] flex items-center justify-center cursor-pointer"
                onClick={() => !isCardOpen && setIsCardOpen(true)}
              >
                <CardContent className="text-center p-12">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="text-9xl mb-6"
                  >
                    🎂
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-bold font-heading mb-4"
                  >
                    Happy Birthday
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-bold font-heading mb-8"
                  >
                    Mila! 💝
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-birthday-lavender"
                  >
                    {!isCardOpen && 'Click to open your special message...'}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card Back (Inside) */}
            <motion.div
              className="absolute inset-0 w-full h-full backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Card className="bg-white shadow-2xl h-[600px] overflow-y-auto">
                <CardContent className="p-8 md:p-12">
                  <AnimatePresence>
                    {showMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                      >
                        {/* Birthday Message */}
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="inline-block mb-6"
                          >
                            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4">
                              <Heart size={48} className="text-white" fill="white" />
                            </div>
                          </motion.div>

                          <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl font-bold font-heading text-primary mb-6"
                          >
                            My Dearest Mila 💕
                          </motion.h2>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="prose prose-lg max-w-2xl mx-auto text-gray-700 space-y-4"
                          >
                            <p className="text-lg leading-relaxed">
                              On this special day, I wanted to make your birthday unforgettable.
                              You completed all the challenges and found every gift I hid for you!
                            </p>

                            <p className="text-lg leading-relaxed">
                              Each gift represents something special about you and how much you mean to me.
                              Your smile lights up my world, and your love makes every day brighter.
                            </p>

                            <p className="text-lg leading-relaxed font-semibold text-primary">
                              Happy Birthday, my love! Here's to another amazing year together! 🎉
                            </p>
                          </motion.div>
                        </div>

                        {/* Gifts Showcase */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="bg-gradient-to-br from-birthday-lavender to-birthday-lightBlue rounded-2xl p-6"
                        >
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <Gift className="text-primary" size={32} />
                            <h3 className="text-2xl font-bold font-heading text-primary">
                              Your Birthday Gifts
                            </h3>
                            <Sparkles className="text-primary" size={32} />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {collectedGifts.map((gift, index) => (
                              <motion.div
                                key={gift.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                className="bg-white rounded-xl p-4 shadow-lg text-center"
                              >
                                <div className="text-4xl mb-2">
                                  {gift.image ? (
                                    <img
                                      src={gift.image}
                                      alt={gift.name}
                                      className="w-16 h-16 mx-auto object-contain"
                                    />
                                  ) : (
                                    <Gift size={48} className="mx-auto text-primary" />
                                  )}
                                </div>
                                <p className="font-semibold text-primary text-sm">
                                  {gift.name}
                                </p>
                                <p className="text-xs text-green-600 mt-1">✓ Collected</p>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-6 text-center"
                          >
                            <div className="inline-block bg-green-100 border border-green-300 rounded-full px-6 py-3">
                              <p className="text-green-700 font-bold flex items-center gap-2">
                                <PartyPopper size={20} />
                                All {collectedGifts.length} Gifts Collected!
                                <PartyPopper size={20} />
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Final Message */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                          className="text-center pt-4"
                        >
                          <p className="text-2xl font-heading text-primary mb-4">
                            With all my love ❤️
                          </p>
                          <p className="text-xl text-gray-600 italic">
                            - Forever Yours
                          </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.2 }}
                          className="flex gap-4 justify-center pt-4"
                        >
                          <Button
                            onClick={() => celebrationConfetti()}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          >
                            <Sparkles className="mr-2" size={20} />
                            Celebrate Again!
                          </Button>

                          <Button
                            variant="outline"
                            onClick={handleBackToDashboard}
                          >
                            Back to Dashboard
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Completion Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 text-center text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg p-4"
        >
          <p className="text-sm">
            🎮 Completed all {progress.completedLevels.length} levels •
            🎁 Collected all {progress.collectedGifts.length} gifts •
            🎉 Birthday Adventure Complete!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
