'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function GameLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="mb-4"
        >
          <Sparkles className="w-16 h-16 text-primary-500 mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-primary-700 font-semibold"
        >
          Loading game...
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-1 bg-primary-500 rounded-full mt-4 max-w-xs mx-auto"
        />
      </motion.div>
    </div>
  );
}
