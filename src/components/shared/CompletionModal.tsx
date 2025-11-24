'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { celebrationConfetti } from '@/lib/animations';

interface CompletionModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick: () => void;
  showConfetti?: boolean;
}

/**
 * Reusable completion modal for all games
 * Shows celebration animation and next step button
 */
export function CompletionModal({
  isOpen,
  title = 'Congratulations!',
  message = "You've completed this challenge!",
  buttonText = 'Continue',
  onButtonClick,
  showConfetti = true,
}: CompletionModalProps) {
  useEffect(() => {
    if (isOpen && showConfetti) {
      celebrationConfetti();
    }
  }, [isOpen, showConfetti]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onButtonClick}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  <Trophy className="w-20 h-20 text-primary-500" />
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-8 h-8 text-primary-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-primary-900 mb-4">
                  {title}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {message}
                </p>

                <Button
                  onClick={onButtonClick}
                  size="lg"
                  className="w-full text-lg"
                >
                  {buttonText}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
