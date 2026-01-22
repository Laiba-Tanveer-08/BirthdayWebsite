import { motion } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";

export function FloatingElements() {
  const elements = [
    { icon: Heart, color: "text-pink-400", size: "w-6 h-6", delay: 0, x: "5%", duration: 15 },
    { icon: Star, color: "text-amber-400", size: "w-5 h-5", delay: 2, x: "15%", duration: 18 },
    { icon: Sparkles, color: "text-purple-400", size: "w-4 h-4", delay: 4, x: "25%", duration: 20 },
    { icon: Heart, color: "text-red-400", size: "w-5 h-5", delay: 1, x: "75%", duration: 16 },
    { icon: Star, color: "text-yellow-400", size: "w-6 h-6", delay: 3, x: "85%", duration: 14 },
    { icon: Sparkles, color: "text-pink-300", size: "w-5 h-5", delay: 5, x: "95%", duration: 17 },
    { icon: Heart, color: "text-rose-400", size: "w-4 h-4", delay: 6, x: "35%", duration: 19 },
    { icon: Star, color: "text-amber-300", size: "w-5 h-5", delay: 7, x: "55%", duration: 21 },
    { icon: Heart, color: "text-pink-500", size: "w-3 h-3", delay: 8, x: "65%", duration: 13 },
    { icon: Sparkles, color: "text-violet-400", size: "w-4 h-4", delay: 9, x: "45%", duration: 22 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => {
        const Icon = el.icon;
        return (
          <motion.div
            key={index}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh",
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
              x: [0, 20, -20, 0]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{ left: el.x }}
          >
            <Icon className={`${el.size} ${el.color} fill-current opacity-60`} />
          </motion.div>
        );
      })}

      {/* Balloon decorations */}
      {[
        { color: "#ec4899", x: "8%", delay: 0 },
        { color: "#a855f7", x: "92%", delay: 1 },
        { color: "#fbbf24", x: "12%", delay: 2 },
        { color: "#22d3ee", x: "88%", delay: 3 },
      ].map((balloon, i) => (
        <motion.div
          key={`balloon-${i}`}
          initial={{ y: "120vh" }}
          animate={{ 
            y: "-20vh",
            x: [0, 15, -15, 0]
          }}
          transition={{
            duration: 25,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ left: balloon.x }}
        >
          <div className="relative">
            {/* Balloon body */}
            <div 
              className="w-12 h-16 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${balloon.color}aa, ${balloon.color})`,
                boxShadow: `inset -4px -4px 12px rgba(0,0,0,0.2), inset 4px 4px 12px rgba(255,255,255,0.3)`
              }}
            />
            {/* Balloon knot */}
            <div 
              className="w-2 h-2 mx-auto -mt-0.5"
              style={{ 
                background: balloon.color,
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
              }}
            />
            {/* String */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-20 mx-auto bg-gray-400"
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
