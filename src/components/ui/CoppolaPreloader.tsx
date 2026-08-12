import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoppolaPreloaderProps {
  onComplete?: () => void;
}

const CoppolaPreloader = ({ onComplete }: CoppolaPreloaderProps) => {
  const icons = [
    '/assets/icons/bath.svg',
    '/assets/icons/faucet.svg',
    '/assets/icons/mirror.svg',
    '/assets/icons/sink.svg',
  ];

  const words = ['PREMIUM', 'QUALITY', 'ELEGANCE', 'CRAFTSMANSHIP'];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [curtainReveal, setCurtainReveal] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (words.length * 1200 / 50)); // Complete in total duration
      });
    }, 50);

    // Sync icon and word changes together
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= words.length) {
          clearInterval(wordInterval);
          clearInterval(progressInterval);
          setProgress(100);
          
          // Start curtain reveal
          setTimeout(() => {
            setCurtainReveal(true);
          }, 600);

          // Complete preloader
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 2000);
          
          return prev;
        }
        return nextIndex;
      });
    }, prefersReducedMotion ? 900 : 1200);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, [words.length, onComplete]);

  if (isComplete) return null;

  return (
    <>
      {/* Black Background Base */}
      <motion.div
        className="fixed inset-0 bg-black z-[10000]"
        initial={{ opacity: 1 }}
        animate={{ opacity: curtainReveal ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.33, 0.1, 0.33, 1] }}
      />

      {/* Main Content */}
      <motion.div
        className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none px-4 sm:px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: curtainReveal ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.33, 0.1, 0.33, 1] }}
      >
        <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-4xl">
          {/* Icon and Text Container */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full">
            {/* Flipping Text - Left side */}
            <div 
              className="relative overflow-hidden flex items-center justify-center"
              style={{ 
                height: 'clamp(40px, 12vw, 60px)', 
                minHeight: '40px'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.h6
                  key={currentWordIndex}
                  initial={{ 
                    opacity: 0, 
                    rotateX: -90,
                    y: 20 
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateX: 0,
                    y: 0 
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateX: 90,
                    y: -20 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.33, 0.1, 0.33, 1] 
                  }}
                  style={{
                    fontSize: 'clamp(20px, 6vw, 32px)',
                    letterSpacing: '0.15em',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    lineHeight: 'clamp(40px, 12vw, 60px)'
                  }}
                  className="text-white font-light tracking-[0.15em] uppercase whitespace-nowrap"
                >
                  {words[currentWordIndex]}
                </motion.h6>
              </AnimatePresence>
            </div>

            {/* Icon Switcher - Right side */}
            <div 
              className="relative flex items-center justify-center shrink-0" 
              style={{ 
                width: 'clamp(40px, 12vw, 60px)', 
                height: 'clamp(40px, 12vw, 60px)', 
                minWidth: '40px', 
                minHeight: '40px' 
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentWordIndex}
                  src={icons[currentWordIndex]}
                  alt="Product icon"
                  initial={{ opacity: 0, scale: 0.3, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.3, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="w-full h-full brightness-0 invert"
                  style={{ objectFit: 'contain' }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm mt-2 sm:mt-4"
          >
            {/* Progress Bar Container */}
            <div className="relative h-[2px] bg-white/10 overflow-hidden rounded-full">
              {/* Progress Fill */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/60 via-white to-white/60"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute top-0 h-full w-16 sm:w-20 bg-white/40 blur-md"
                style={{ left: `${Math.max(0, progress - 10)}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            
            {/* Percentage Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex justify-between items-center mt-2 sm:mt-3"
            >
              <span className="text-white/30 text-xs tracking-widest font-light uppercase">Curating Excellence</span>
              <span className="text-white/40 text-xs tracking-wider font-light tabular-nums">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Curtain Reveal - Moves Up */}
      <motion.div
        className="fixed bottom-0 left-0 w-full h-full bg-black z-[10002]"
        initial={{ y: '100%' }}
        animate={{ y: curtainReveal ? 0 : '100%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Second layer for smooth reveal effect */}
      <motion.div
        className="fixed bottom-0 left-0 w-full h-full bg-black z-[10003]"
        initial={{ y: '100%' }}
        animate={{ y: curtainReveal ? '-100%' : '100%' }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
};

export default CoppolaPreloader;

