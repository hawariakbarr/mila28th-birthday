'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInVariants } from '@/lib/animations';

interface GameContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for all games
 * Provides consistent styling and animation
 */
export function GameContainer({ children, className = '' }: GameContainerProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 p-4 md:p-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </motion.div>
  );
}
