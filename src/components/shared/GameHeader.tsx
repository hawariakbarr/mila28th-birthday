'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

interface GameHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

/**
 * Reusable header for game pages
 * Includes title, description, and back button
 */
export function GameHeader({
  title,
  description,
  showBackButton = true,
}: GameHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      {showBackButton && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-primary-700">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}
