'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ScrollAnimation, ParallaxLayer, FadeInSection } from './ScrollAnimation';
import { Sparkles, Heart, Gift, Star, Flower2, ArrowLeft } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gifts } from '@/data/gifts';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

/**
 * Make Me Pulse "Nomadic Tribe" Inspired Greeting Card
 *
 * Inspired by 2019.makemepulse.com - Award-winning Site of the Year (FWA & AWWWARDS)
 * Features:
 * - 4-chapter scroll-based narrative
 * - Parallax effects and smooth scroll animations
 * - Comic book-inspired aesthetic
 * - Poetic, meditative journey
 * - Scroll progress indicator
 */
export default function NomadicTribeInspired() {
  const router = useRouter();
  const { progress } = useGameProgress();
  const [currentChapter, setCurrentChapter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const collectedGifts = gifts.filter((gift) =>
    progress.collectedGifts.includes(gift.id)
  );

  // Map scroll progress to chapters (0-3)
  const chapterProgress = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4]);

  useEffect(() => {
    const unsubscribe = chapterProgress.on('change', (latest) => {
      setCurrentChapter(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [chapterProgress]);

  useEffect(() => {
    // Trigger confetti on final chapter
    if (currentChapter === 4) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3d52a0', '#7091e6', '#8697c4', '#adbbda', '#ede8f5']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3d52a0', '#7091e6', '#8697c4', '#adbbda', '#ede8f5']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [currentChapter]);

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-[#3d52a0] via-[#7091e6] to-[#ede8f5] overflow-hidden"
    >
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-white/50 backdrop-blur-sm z-50"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="ghost"
          onClick={handleBackToDashboard}
          className="text-white hover:text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </Button>
      </div>

      {/* Chapter indicator */}
      <motion.div
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md rounded-full px-6 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-white font-medium">
          Chapter {Math.min(currentChapter + 1, 4)} / 4
        </p>
      </motion.div>

      {/* Chapter 1: The Beginning */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ParallaxLayer speed={-0.3} className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        <ScrollAnimation className="text-center px-4 max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-8"
          >
            <Sparkles className="w-24 h-24 mx-auto text-white" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-heading">
            Happy Birthday
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-5xl text-white/90 font-heading mb-8"
          >
            Mila
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-2xl text-white/80 mb-12"
          >
            A journey through treasures, riddles, and love
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-white/70"
          >
            <p className="text-lg">Scroll to begin your journey...</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-4 text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </ScrollAnimation>
      </section>

      {/* Chapter 2: The Quest */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ParallaxLayer speed={0.2} className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Gift className="w-96 h-96 text-white" />
          </motion.div>
        </ParallaxLayer>

        <FadeInSection className="relative z-10 text-center px-4 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 font-heading leading-tight">
            You Embarked on an Adventure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <FadeInSection delay={0.1} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-3">Five Challenges</h3>
              <p className="text-white/80 text-lg">
                From memory games to puzzles,<br />
                each test brought you closer to your treasures
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">Mysterious Riddles</h3>
              <p className="text-white/80 text-lg">
                Cryptic clues hidden in poetry,<br />
                leading to secret locations
              </p>
            </FadeInSection>

            <FadeInSection delay={0.3} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-white mb-3">Hidden Treasures</h3>
              <p className="text-white/80 text-lg">
                Gifts waiting in special places,<br />
                each chosen with love and care
              </p>
            </FadeInSection>

            <FadeInSection delay={0.4} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-white mb-3">Sweet Victory</h3>
              <p className="text-white/80 text-lg">
                You conquered every challenge<br />
                and found all your gifts!
              </p>
            </FadeInSection>
          </div>
        </FadeInSection>
      </section>

      {/* Chapter 3: The Treasures */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <ParallaxLayer speed={-0.4}>
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + Math.random() * 2,
                  delay: Math.random() * 2,
                }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </div>
        </ParallaxLayer>

        <FadeInSection className="relative z-10 text-center px-4 max-w-6xl">
          <Heart className="w-20 h-20 mx-auto mb-8 text-white animate-pulse" />

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 font-heading">
            Your Birthday Treasures
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {collectedGifts.map((gift, i) => (
              <FadeInSection
                key={gift.id}
                delay={i * 0.15}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-32 object-contain rounded-2xl mb-4"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center text-6xl mb-4">
                      🎁
                    </div>
                  )}
                  <h3 className="text-white font-bold text-xl mb-2">{gift.name}</h3>
                  <div className="bg-green-500/20 border border-green-400 rounded-full px-4 py-1 inline-block">
                    <p className="text-green-400 text-sm font-semibold">✓ Collected</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.8} className="mt-16">
            <p className="text-2xl md:text-3xl text-white/90 italic">
              Each gift, a token of love and appreciation
            </p>
          </FadeInSection>
        </FadeInSection>
      </section>

      {/* Chapter 4: The Celebration */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ParallaxLayer speed={0.3}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Flower2 className="w-[600px] h-[600px] text-white/10" />
            </motion.div>
          </div>
        </ParallaxLayer>

        <FadeInSection className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-12"
          >
            <h2 className="text-7xl md:text-9xl font-bold text-white font-heading">
              ✨ 28 ✨
            </h2>
          </motion.div>

          <p className="text-3xl md:text-5xl text-white mb-16 font-heading">
            Wishing you a year filled with...
          </p>

          <div className="space-y-8 mb-16">
            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <p className="text-2xl md:text-4xl text-white">✨ Joy & Laughter</p>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <p className="text-2xl md:text-4xl text-white">💝 Love & Happiness</p>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.6}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <p className="text-2xl md:text-4xl text-white">🌟 Dreams Come True</p>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.8}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <p className="text-2xl md:text-4xl text-white">🎊 Beautiful Memories</p>
              </motion.div>
            </FadeInSection>
          </div>

          <FadeInSection delay={1.2}>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/30 mb-12"
            >
              <p className="text-4xl md:text-6xl text-white font-heading">
                Happy Birthday, Mila! 🎂
              </p>
            </motion.div>
          </FadeInSection>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-white/80 text-xl mb-8"
          >
            Made with love, just for you ❤️
          </motion.p>

          <FadeInSection delay={2.2}>
            <Button
              onClick={handleBackToDashboard}
              size="lg"
              className="bg-white text-[#3d52a0] hover:bg-white/90 text-lg px-12 py-6 rounded-full font-bold"
            >
              Return to Dashboard
            </Button>
          </FadeInSection>
        </FadeInSection>
      </section>
    </div>
  );
}
