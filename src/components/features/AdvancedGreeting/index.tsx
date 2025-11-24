'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gifts } from '@/data/gifts';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AdvancedGreeting() {
  const router = useRouter();
  const { progress } = useGameProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const collectedGifts = gifts.filter((gift) =>
    progress.collectedGifts.includes(gift.id)
  );

  useEffect(() => {
    setMounted(true);

    // Custom Cursor
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', moveCursor);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Section Animation
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      });

      // Parallax Background Elements
      gsap.to('.parallax-slow', {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.parallax-fast', {
        y: -400,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Message Section Reveal
      gsap.from('.message-content', {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: '.message-section',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      // Gifts Grid Stagger Animation
      gsap.from('.gift-card', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.gifts-section',
          start: 'top 70%',
        },
      });

      // Horizontal Scroll Effect for Gifts
      const giftsContainer = document.querySelector('.gifts-scroll');
      if (giftsContainer) {
        gsap.to(giftsContainer, {
          x: () => -(giftsContainer.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.gifts-section',
            start: 'top top',
            end: () => `+=${giftsContainer.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, containerRef);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      ctx.revert();
    };
  }, [mounted]);

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 border-2 border-pink-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="ghost"
          onClick={handleBackToDashboard}
          className="text-white hover:text-pink-400 bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0">
          <div className="parallax-slow absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="parallax-fast absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
          <div className="parallax-slow absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-8xl md:text-9xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            Happy Birthday
          </h1>
          <h2 className="hero-subtitle text-6xl md:text-7xl font-bold font-heading text-white mb-8">
            Mila 💝
          </h2>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            A magical journey through love and celebration
          </p>
        </div>

        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['✨', '💕', '🎂', '🎈', '🎊'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </section>

      {/* Message Section */}
      <section className="message-section relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="message-content max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-6 mb-8">
            <Sparkles size={64} className="text-white" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8">
            My Dearest Mila
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              On this special day, I wanted to make your birthday unforgettable.
              You completed all the challenges and found every gift I hid for you!
            </p>

            <p>
              Each gift represents something special about you and how much you mean to me.
              Your smile lights up my world, and your love makes every day brighter.
            </p>

            <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Happy Birthday, my love! Here's to another amazing year together! 🎉
            </p>
          </div>
        </div>
      </section>

      {/* Gifts Section with Horizontal Scroll */}
      <section className="gifts-section relative h-screen">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="gifts-scroll flex gap-8 px-8">
            <div className="min-w-screen flex items-center justify-center">
              <h2 className="text-6xl md:text-7xl font-bold font-heading text-center">
                Your Birthday Gifts
              </h2>
            </div>

            {collectedGifts.map((gift, index) => (
              <div
                key={gift.id}
                className="gift-card min-w-[400px] h-[600px] bg-gradient-to-br from-pink-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center justify-center border border-pink-500/20"
              >
                <div className="mb-6">
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-48 h-48 object-contain rounded-2xl"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-8xl">
                      🎁
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-bold font-heading text-white mb-4">
                  {gift.name}
                </h3>

                <div className="bg-green-500/20 border border-green-400 rounded-full px-6 py-2">
                  <p className="text-green-400 font-semibold">✓ Collected</p>
                </div>
              </div>
            ))}

            <div className="min-w-screen flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="inline-block bg-green-500/20 border-2 border-green-400 rounded-full px-12 py-6">
                  <p className="text-green-400 font-bold text-2xl flex items-center gap-3">
                    <Sparkles size={32} />
                    All {collectedGifts.length} Gifts Collected!
                    <Sparkles size={32} />
                  </p>
                </div>

                <div className="space-y-4 text-xl text-gray-300">
                  <p className="text-4xl font-heading text-white mb-4">
                    With all my love ❤️
                  </p>
                  <p className="text-2xl italic">
                    - Your [Name]
                  </p>
                </div>

                <Button
                  onClick={handleBackToDashboard}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-12 py-6 rounded-full"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
