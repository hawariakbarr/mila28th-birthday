'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { celebrationConfetti } from '@/lib/utils';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    // Trigger confetti on page load
    const timer = setTimeout(() => {
      celebrationConfetti();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    celebrationConfetti();
    // TODO: Navigate to dashboard
    console.log('Starting adventure...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-birthday-lightBlue to-birthday-periwinkle flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 text-birthday-skyBlue opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Gift size={60} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-birthday-deepBlue opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Sparkles size={50} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-40 text-birthday-skyBlue opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Heart size={55} />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="text-center px-4 z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* Birthday emoji with animation */}
          <motion.div
            className="text-8xl mb-6"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            🎂
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="text-7xl md:text-8xl font-bold font-heading text-primary mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Happy Birthday
          </motion.h1>

          <motion.h2
            className="text-6xl md:text-7xl font-bold font-heading bg-gradient-to-r from-birthday-deepBlue via-birthday-skyBlue to-birthday-periwinkle bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Mila!
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-primary-500 mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Your birthday adventure awaits...
          </motion.p>

          <motion.p
            className="text-lg text-primary-400 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Complete 5 fun games, solve riddles, and find hidden gifts around the house!
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={handleStart}
              className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue hover:from-birthday-skyBlue hover:to-birthday-deepBlue text-white font-heading text-xl px-12 py-6 h-auto rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Gift className="mr-2" size={24} />
              Start Your Adventure
              <Sparkles className="ml-2" size={24} />
            </Button>
          </motion.div>

          {/* Floating decorations */}
          <motion.div
            className="mt-16 text-4xl space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            {['🎉', '🎁', '🎈', '✨', '🎊'].map((emoji, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
