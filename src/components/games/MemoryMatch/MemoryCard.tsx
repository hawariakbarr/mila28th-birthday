'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MemoryCardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function MemoryCard({
  id,
  image,
  isFlipped,
  isMatched,
  onClick,
}: MemoryCardProps) {
  return (
    <motion.div
      className="relative w-full aspect-square cursor-pointer perspective-1000"
      onClick={onClick}
      whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        {/* Card Back */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden rounded-xl shadow-lg',
            'bg-gradient-to-br from-birthday-deepBlue to-birthday-skyBlue',
            'flex items-center justify-center'
          )}
        >
          <div className="text-6xl">🎂</div>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden rounded-xl shadow-lg rotate-y-180',
            'bg-white flex items-center justify-center',
            isMatched && 'ring-4 ring-green-400'
          )}
        >
          <div className="text-6xl">{image}</div>
        </div>
      </motion.div>

      {/* Matched Overlay */}
      {isMatched && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-green-400/20 rounded-xl flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="bg-green-500 rounded-full p-2"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
