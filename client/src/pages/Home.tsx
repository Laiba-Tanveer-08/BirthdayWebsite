import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake, Scissors, Mail, PartyPopper } from "lucide-react";
import { BirthdayCake } from "@/components/BirthdayCake";
import { CakeCutting } from "@/components/CakeCutting";
import { LoveLetter } from "@/components/LoveLetter";
import { FloatingElements } from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";


type Section = "intro" | "cake" | "cutting" | "letter";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (currentSection !== "intro") {
      setShowNav(true);
    }
  }, [currentSection]);

  const handleStart = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f472b6', '#fbbf24', '#a855f7']
    });
    setCurrentSection("cake");
  };

  const sections = [
    { id: "cake" as Section, label: "Blow Candles", icon: Cake },
    { id: "cutting" as Section, label: "Cut Cake", icon: Scissors },
    { id: "letter" as Section, label: "Love Letter", icon: Mail },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      {/* Gradient background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(340 60% 95%) 0%, hsl(350 100% 98%) 50%, hsl(45 60% 95%) 100%)'
        }}
      />

      {/* Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-40 p-4"
          >
            <div className="max-w-lg mx-auto flex justify-center gap-2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = currentSection === section.id;
                return (
                  <Button
                    key={section.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentSection(section.id)}
                    className={`flex items-center gap-2 ${isActive ? '' : 'text-muted-foreground'}`}
                    data-testid={`nav-${section.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{section.label}</span>
                  </Button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
        <AnimatePresence mode="wait">
          {currentSection === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              {/* Decorative party popper */}
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <PartyPopper className="w-20 h-20 mx-auto text-primary" />
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 30px rgba(236, 72, 153, 0.3)'
                }}
                data-testid="text-main-title"
              >
                Happy Birthday!
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif"
                data-testid="text-subtitle"
              >
                Let us celebrate it together mi amore!
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 }}
                className="w-48 h-1 mx-auto mb-8 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, #fbbf24, transparent)'
                }}
              />

              {/* Start button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 border-primary-border"
                  data-testid="button-start-celebration"
                >
                  Start the Celebration
                </Button>
              </motion.div>

              {/* Hint text */}
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 text-sm text-muted-foreground"
                data-testid="text-start-hint"
              >
                Click to begin your birthday experience
              </motion.p>
            </motion.div>
          )}

          {currentSection === "cake" && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center w-full max-w-xl mx-auto"
            >
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2"
                data-testid="text-section-title-cake"
              >
                Make a Wish!
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mb-8"
                data-testid="text-cake-description"
              >
                Close your eyes, think of something wonderful, and blow out the candles
              </motion.p>
              
              <BirthdayCake 
                onCandlesBlown={() => setCandlesBlown(true)}
                candlesBlown={candlesBlown}
              />

              {candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setCurrentSection("cutting")}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 border-primary-border"
                    data-testid="button-next-cutting"
                  >
                    Continue to Cake Cutting
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentSection === "cutting" && (
            <motion.div
              key="cutting"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center w-full max-w-xl mx-auto"
            >
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2"
                data-testid="text-section-title-cutting"
              >
                Time to Cut the Cake!
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mb-8"
                data-testid="text-cutting-description"
              >
                Click the knife to slice up some delicious birthday cake
              </motion.p>
              
              <CakeCutting
                onCakeCut={() => setCakeCut(true)}
                cakeCut={cakeCut}
              />

              {cakeCut && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => setCurrentSection("letter")}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 border-primary-border"
                    data-testid="button-next-letter"
                  >
                    Read Your Special Letter
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentSection === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center w-full max-w-2xl mx-auto"
            >
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2"
                data-testid="text-section-title-letter"
              >
                A Special Message For You
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mb-8"
                data-testid="text-letter-description"
              >
                Open the envelope my love
              </motion.p>
              
              <LoveLetter />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-12 pb-8"
              >
                <motion.p
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-2xl font-serif font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  data-testid="text-final-message"
                >
                  Have the most wonderful birthday ever!
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer decoration */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(45 60% 95%) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
