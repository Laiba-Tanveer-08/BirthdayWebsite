import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface BirthdayCakeProps {
  onCandlesBlown: () => void;
  candlesBlown: boolean;
}

export function BirthdayCake({ onCandlesBlown, candlesBlown }: BirthdayCakeProps) {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isBlowing, setIsBlowing] = useState(false);

  const blowCandle = useCallback((index: number) => {
    if (candlesBlown) return;
    
    setIsBlowing(true);
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    setTimeout(() => setIsBlowing(false), 300);

    if (newCandles.every(c => !c)) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f472b6', '#fbbf24', '#a855f7', '#22d3ee']
        });
        onCandlesBlown();
      }, 500);
    }
  }, [candles, candlesBlown, onCandlesBlown]);

  const blowAllCandles = useCallback(() => {
    if (candlesBlown) return;
    
    setIsBlowing(true);
    setCandles([false, false, false, false, false]);
    
    setTimeout(() => {
      setIsBlowing(false);
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f472b6', '#fbbf24', '#a855f7', '#22d3ee']
      });
      onCandlesBlown();
    }, 500);
  }, [candlesBlown, onCandlesBlown]);

  return (
    <div className="flex flex-col items-center" data-testid="birthday-cake-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Candles */}
        <div className="flex justify-center gap-6 mb-2 relative z-10">
          {candles.map((isLit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => blowCandle(index)}
              data-testid={`candle-${index}`}
            >
              {/* Candle stick */}
              <div className="relative">
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                    >
                      {/* Flame */}
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            scaleY: [1, 1.2, 0.9, 1.1, 1],
                            scaleX: [1, 0.9, 1.1, 0.95, 1]
                          }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-400 via-orange-400 to-yellow-200"
                          style={{
                            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                          }}
                        />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                          className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full bg-gradient-to-t from-orange-300 to-yellow-100"
                        />
                      </div>
                      {/* Glow effect */}
                      <div 
                        className="absolute -inset-4 rounded-full opacity-30"
                        style={{
                          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%)'
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Candle body */}
                <div 
                  className="w-3 h-12 rounded-sm"
                  style={{
                    background: index % 2 === 0 
                      ? 'linear-gradient(180deg, #ec4899 0%, #db2777 100%)' 
                      : 'linear-gradient(180deg, #a855f7 0%, #9333ea 100%)'
                  }}
                />
                {/* Wick */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-700 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cake layers */}
        <div className="relative">
          {/* Top frosting decorations */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-4">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-3 h-3 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#ec4899' : '#a855f7'
                }}
              />
            ))}
          </div>
          
          {/* Top layer */}
          <motion.div 
            className="relative z-20"
            animate={isBlowing ? { rotate: [-1, 1, -1] } : {}}
            transition={{ duration: 0.2, repeat: isBlowing ? 3 : 0 }}
          >
            <div 
              className="w-48 h-16 rounded-t-3xl mx-auto"
              style={{
                background: 'linear-gradient(180deg, #fbcfe8 0%, #f9a8d4 50%, #f472b6 100%)',
                boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.1)'
              }}
            />
            {/* Frosting drips */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-around px-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-b-full"
                  style={{
                    width: `${10 + Math.random() * 8}px`,
                    height: `${12 + Math.random() * 10}px`,
                    background: 'linear-gradient(180deg, #f9a8d4 0%, #f472b6 100%)'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Middle layer */}
          <div 
            className="w-56 h-14 mx-auto -mt-1 relative z-10"
            style={{
              background: 'linear-gradient(180deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
              boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.1)'
            }}
          />

          {/* Bottom layer */}
          <div 
            className="w-64 h-16 mx-auto -mt-1 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, #c4b5fd 0%, #a78bfa 50%, #8b5cf6 100%)',
              boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.1), 0 8px 24px rgba(139, 92, 246, 0.3)'
            }}
          />

          {/* Cake plate */}
          <div 
            className="w-72 h-4 mx-auto -mt-1 rounded-b-xl"
            style={{
              background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        </div>
      </motion.div>

      {/* Instructions */}
      <AnimatePresence>
        {!candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground mb-4" data-testid="text-blow-instruction">
              Click on each candle to blow it out, or...
            </p>
            <Button
              onClick={blowAllCandles}
              className="px-8 bg-gradient-to-r from-pink-500 to-purple-500 border-primary-border"
              data-testid="button-blow-all"
            >
              Make a Wish & Blow!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.p 
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-serif text-primary font-bold"
              data-testid="text-wish-granted"
            >
              Your wish is on its way!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
