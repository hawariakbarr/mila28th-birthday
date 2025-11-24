'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GamepadIcon, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

export default function GameError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Game Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
      >
        <div className="mb-6">
          <GamepadIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Game Failed to Load
          </h1>
          <p className="text-gray-600">
            We couldn't load this game. Please try again or return to the dashboard.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-gray-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={reset} variant="default" className="flex-1 gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
          <Button
            onClick={() => window.location.href = ROUTES.DASHBOARD}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
