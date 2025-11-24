import confetti from 'canvas-confetti';

/**
 * Animation utilities for celebrations and effects
 */

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
}

/**
 * Standard celebration confetti
 * Used when completing games/collecting gifts
 */
export function celebrationConfetti(options: ConfettiOptions = {}) {
  const defaults = {
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#3d52a0', '#7091e6', '#8697c4', '#adbbda', '#ede8f5'],
  };

  confetti({
    ...defaults,
    ...options,
  });
}

/**
 * Continuous confetti burst
 * Used for major achievements (completing all games)
 */
export function continuousConfetti(duration: number = 3000) {
  const end = Date.now() + duration;

  const colors = ['#3d52a0', '#7091e6', '#8697c4', '#adbbda', '#ede8f5'];

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

/**
 * Fireworks effect
 * Used for special moments
 */
export function fireworksConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

/**
 * Simple fade-in animation helper
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

/**
 * Slide-up animation helper
 */
export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Stagger children animation helper
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
