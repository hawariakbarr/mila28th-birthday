'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Gift, Trophy } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  showDetails?: boolean;
}

export default function ProgressBar({ current, total, showDetails = true }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  const isComplete = current === total;

  return (
    <div className="space-y-3">
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="text-birthday-deepBlue" size={24} />
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary">
                Gift Collection Progress
              </h3>
              <p className="text-sm text-gray-600">
                {current} of {total} gifts found
              </p>
            </div>
          </div>

          {isComplete && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-3 shadow-lg"
            >
              <Trophy className="text-white" size={28} />
            </motion.div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <Progress
          value={percentage}
          className="h-4 bg-birthday-lavender"
        />

        {/* Percentage Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-xs font-bold text-white drop-shadow-md">
            {Math.round(percentage)}%
          </span>
        </motion.div>
      </div>

      {/* Gift Icons */}
      <div className="flex justify-between items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex-1 h-12 rounded-lg flex items-center justify-center transition-all ${
              index < current
                ? 'bg-gradient-to-br from-birthday-skyBlue to-birthday-periwinkle shadow-md'
                : 'bg-gray-200'
            }`}
          >
            <Gift
              size={24}
              className={index < current ? 'text-white' : 'text-gray-400'}
            />
          </motion.div>
        ))}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4 text-center"
        >
          <p className="text-green-700 font-heading font-semibold text-lg">
            🎉 All Gifts Collected! 🎉
          </p>
          <p className="text-green-600 text-sm mt-1">
            Your special birthday surprise awaits...
          </p>
        </motion.div>
      )}
    </div>
  );
}
