import React from 'react';
import { motion } from 'framer-motion';

// Loading component
const LoadingCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-center h-48 bg-gray-200 rounded-lg mb-4">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

const FaucetsKitchen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Image - Banner style */}
      <section className="relative">
        <motion.div
          className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative will-change-transform bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-800/60"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8 }
          }}
        >
          {/* Minimalistic Banner Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="text-center">
              <motion.div
                className="will-change-transform"
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  scale: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-['EB_Garamond',_serif] tracking-wide will-change-transform"
                  initial={{ scale: 0.8, opacity: 0, y: 5 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    scale: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  style={{ transformOrigin: 'center center' }}
                >
                  Kitchen Faucets
                </motion.h1>
                <motion.p
                  className="text-sm md:text-base lg:text-lg text-white/90 mt-3 max-w-2xl mx-auto leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  Professional-grade kitchen faucets designed for durability, style, and modern functionality.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Demo Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }, (_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaucetsKitchen;