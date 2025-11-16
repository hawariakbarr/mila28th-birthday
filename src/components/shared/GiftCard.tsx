'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GiftCardProps {
  name: string;
  image?: string;
  isCollected: boolean;
  level: number;
}

export default function GiftCard({ name, image, isCollected, level }: GiftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          isCollected
            ? 'bg-gradient-to-br from-birthday-skyBlue to-birthday-periwinkle border-birthday-deepBlue shadow-lg'
            : 'bg-white/50 border-gray-300 grayscale'
        )}
      >
        <CardContent className="p-4">
          {/* Gift Icon or Image */}
          <div className="flex items-center justify-center h-24 mb-3 relative">
            {isCollected ? (
              // Show actual gift when collected
              <>
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <Gift size={60} className="text-birthday-deepBlue" />
                )}
                {/* Collected Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="absolute top-0 right-0 bg-green-500 rounded-full p-1.5"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              </>
            ) : (
              // Show mystery/locked state when not collected
              <div className="text-6xl">
                🎁
              </div>
            )}
          </div>

          {/* Gift Name */}
          <div className="text-center">
            <h3
              className={cn(
                'font-heading font-semibold text-sm',
                isCollected ? 'text-primary' : 'text-gray-500'
              )}
            >
              {isCollected ? name : '???'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">Level {level}</p>
          </div>

          {/* Status Badge */}
          <div className="mt-3 text-center">
            <span
              className={cn(
                'text-xs px-3 py-1 rounded-full font-medium',
                isCollected
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              {isCollected ? '✓ Collected' : 'Not Found'}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
