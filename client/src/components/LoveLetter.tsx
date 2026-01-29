import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center" data-testid="love-letter-container">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
          >
            {/* Envelope wrapped in Button */}
            <Button
              variant="ghost"
              onClick={() => setIsOpen(true)}
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              data-testid="button-open-letter"
            >
              <div className="relative w-72 h-48">
                {/* Back flap */}
                <div
                  className="absolute top-0 left-0 right-0 h-24"
                  style={{
                    background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    transformOrigin: 'top',
                  }}
                />

                {/* Envelope body */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 rounded-b-lg"
                  style={{
                    background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.2)'
                  }}
                />

                {/* Heart seal */}
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-10"
                >
                  <Heart
                    className="w-10 h-10 text-pink-500 fill-pink-500"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(236, 72, 153, 0.4))' }}
                  />
                </motion.div>

                {/* Decorative sparkles */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-8 left-4"
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
            </Button>

            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-center text-muted-foreground"
              data-testid="text-open-instruction"
            >
              Click to open your special letter
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-lg"
          >
            {/* Letter paper */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative p-8 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fff7ed 100%)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              {/* Decorative corner flourishes */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-pink-300 rounded-tl-lg opacity-50" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-pink-300 rounded-tr-lg opacity-50" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-pink-300 rounded-bl-lg opacity-50" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-pink-300 rounded-br-lg opacity-50" />

              {/* Letter content */}
              <div className="relative z-10 space-y-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-3xl font-serif text-pink-600 mb-2" data-testid="text-letter-title">
                    My Demon,
                  </h2>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4 text-amber-900 leading-relaxed font-serif"
                  data-testid="text-letter-content"
                >
                  <p className="text-lg">
                    First of all,
                    Happiest Birthday mi amore!
                    Mai yeh is liyai likh rhi hoon takay tjy bta sakon that how special you are to me.
                    Every moment with you feels like a precious gift of love. <br /> I love you demon.
                  </p>

                  <p className="text-lg">
                    Your smile lights up my world brighter than any birthday candle ever could.
                    Your laughter is the sweetest melody I've ever heard.
                    The thought alone that you are only mine makes me fly in clouds demon.
                    Demon, I care for you deeply — more than just friendship.
                    I love you, your eyes, your smile, your Dudaklar they make me addict and even your stubbornness.
                    You deserve love meri jaan more than iam providing you you deserve many more.
                    I know kai utna nhi dai paon gi jitnay ki tu haqdaar hai pr hamesha tjy apni aankhon pr bitha kr rakhoon gi.
                    And yes i  want you to know how special you are to me
                    and how much joy you bring to my life ka kitna deewana kr rkha hai apnai mjy apny husn kai jaal mai phansaya howa hai.

                    No matter what, I value you mi amore your friendship,
                    your heart and most of all you presence it make me feel alive, happiest and complete iris.
                  </p>

                  <p className="text-lg">
                    I made this demon takay tjy hamesha yaad rahay how special you are.
                    You worth every effort every ounce of love i have in me.
                    Let's spend another year of life together and let's keep on spending our lifes together demon.
                    Let's celebrate another year of being blessed
                    to have you by my side.
                    You make every day feel like a celebration Demon.
                  </p>

                  <p className="text-lg italic">
                    May this birthday bring you all the happiness you deserve and may all your
                    wishes come true just like you've made my wish come true by being in my life.

                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="pt-4"
                >
                  <p className="text-xl font-serif text-pink-600 mb-2">
                    With all my love,
                  </p>
                  <p className="text-2xl font-serif text-pink-700 font-semibold">
                    Forever and Only Yours
                  </p>
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-4 flex justify-center gap-2"
                  >
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating hearts decoration */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-20, -60, -100],
                  x: Math.sin(i) * 30
                }}
                transition={{
                  duration: 3,
                  delay: 1 + i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute"
                style={{
                  left: `${15 + i * 15}%`,
                  bottom: '100%'
                }}
              >
                <Heart
                  className={`${i % 2 === 0 ? 'w-4 h-4 text-pink-400' : 'w-3 h-3 text-red-400'} fill-current`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
