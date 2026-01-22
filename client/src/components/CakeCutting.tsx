import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface CakeCuttingProps {
  onCakeCut: () => void;
  cakeCut: boolean;
}

export function CakeCutting({ onCakeCut, cakeCut }: CakeCuttingProps) {
  const [knifePosition, setKnifePosition] = useState({ x: 120, cutting: false });
  const [slices, setSlices] = useState<number[]>([]);

  const handleCut = () => {
    if (cakeCut) return;
    
    setKnifePosition(prev => ({ ...prev, cutting: true }));
    
    setTimeout(() => {
      setSlices(prev => [...prev, prev.length]);
      setKnifePosition(prev => ({ x: prev.x + 40, cutting: false }));
      
      if (slices.length >= 2) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ec4899', '#fbbf24', '#a855f7']
        });
        onCakeCut();
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center" data-testid="cake-cutting-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Cake for cutting */}
        <div className="relative w-80 h-40">
          {/* Cake body */}
          <div 
            className="absolute bottom-0 w-full h-32 rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 30%, #d4a853 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
          >
            {/* Frosting top */}
            <div 
              className="absolute top-0 left-0 right-0 h-8"
              style={{
                background: 'linear-gradient(180deg, #fbcfe8 0%, #f9a8d4 100%)'
              }}
            />
            
            {/* Strawberry decorations */}
            <div className="absolute top-2 left-0 right-0 flex justify-around px-4">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="w-4 h-5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  }}
                />
              ))}
            </div>

            {/* Cream layers */}
            <div className="absolute top-12 left-0 right-0 h-2 bg-white/60" />
            <div className="absolute top-20 left-0 right-0 h-2 bg-white/60" />

            {/* Cut lines */}
            {slices.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="absolute top-0 bottom-0 w-0.5 bg-amber-800/30"
                style={{ left: `${(index + 1) * 25}%` }}
              />
            ))}
          </div>

          {/* Cake plate */}
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[340px] h-6 rounded-xl"
            style={{
              background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        </div>

        {/* Knife - wrapped in Button for proper interaction */}
        <AnimatePresence>
          {!cakeCut && (
            <motion.div
              initial={{ opacity: 0, rotate: -30, y: -50 }}
              animate={{ 
                opacity: 1, 
                rotate: knifePosition.cutting ? 0 : -20,
                y: knifePosition.cutting ? 20 : -30,
                x: knifePosition.x
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-8"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCut}
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
                data-testid="button-cut-cake"
              >
                <div className="relative">
                  {/* Knife handle */}
                  <div 
                    className="w-6 h-16 rounded-lg"
                    style={{
                      background: 'linear-gradient(90deg, #78350f 0%, #92400e 50%, #78350f 100%)'
                    }}
                  />
                  {/* Knife blade */}
                  <div 
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-2 h-20"
                    style={{
                      background: 'linear-gradient(90deg, #9ca3af 0%, #e5e7eb 50%, #9ca3af 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                    }}
                  />
                </div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instructions */}
      <AnimatePresence>
        {!cakeCut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground" data-testid="text-cut-instruction">
              Click the knife to cut the cake! ({3 - slices.length} cuts remaining)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cut slices display */}
      <AnimatePresence>
        {cakeCut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex gap-4"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: i * 5 - 5 }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                {/* Slice */}
                <div 
                  className="w-16 h-20 rounded-t-lg"
                  style={{
                    background: 'linear-gradient(180deg, #fbcfe8 0%, #fde68a 30%, #d4a853 100%)',
                    clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                />
                {/* Plate */}
                <div 
                  className="w-20 h-3 -mt-1 rounded-full mx-auto"
                  style={{
                    background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {cakeCut && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xl font-serif text-primary font-semibold"
          data-testid="text-cake-ready"
        >
          Time to enjoy some delicious cake!
        </motion.p>
      )}
    </div>
  );
}
