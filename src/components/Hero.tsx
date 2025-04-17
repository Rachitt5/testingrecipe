import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sun, Snowflake, Leaf, Flame } from 'lucide-react';

interface Ingredient {
  name: string;
  src: string;
  x: number;
  y: number;
  z: number;
  delay: number;
  rotation: number;
}

// Seasonal theme data for UI enhancement only
const seasonalThemes = [
  { name: 'Spring', icon: <Leaf className="inline w-5 h-5 text-green-500" />, bg: 'bg-gradient-to-br from-green-100 via-pink-100 to-yellow-100', accent: 'text-green-600' },
  { name: 'Summer', icon: <Sun className="inline w-5 h-5 text-yellow-400" />, bg: 'bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100', accent: 'text-yellow-600' },
  { name: 'Autumn', icon: <Flame className="inline w-5 h-5 text-orange-500" />, bg: 'bg-gradient-to-br from-orange-100 via-red-100 to-yellow-200', accent: 'text-orange-600' },
  { name: 'Winter', icon: <Snowflake className="inline w-5 h-5 text-blue-400" />, bg: 'bg-gradient-to-br from-blue-100 via-cyan-100 to-white', accent: 'text-blue-600' },
];

// Lotus petal animation component
const LotusPetals = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute lotus-petal"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 20}px`,
            height: `${30 + Math.random() * 20}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 192, 203, 0.8), rgba(255, 140, 140, 0.4))',
            boxShadow: '0 0 10px rgba(255, 192, 203, 0.5)',
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  throw new Error("TEST: This is the Hero component in src/components/Hero.tsx");
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(0); // For theme toggle UI enhancement
  
  // Floating ingredients for the hero section - UNCHANGED
  const ingredients: Ingredient[] = [
    { 
      name: 'Tomato', 
      src: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&w=500&h=500&q=80', 
      x: -20, 
      y: 10, 
      z: 10, 
      delay: 0, 
      rotation: 5 
    },
    { 
      name: 'Herbs', 
      src: 'https://images.unsplash.com/photo-1550411294-56c7b7eaea3f?auto=format&w=500&h=500&q=80', 
      x: 20, 
      y: -15, 
      z: 5, 
      delay: 0.2, 
      rotation: -3 
    },
    { 
      name: 'Lemon', 
      src: 'https://images.unsplash.com/photo-1582287014914-1db836dfbe1f?auto=format&w=500&h=500&q=80', 
      x: -25, 
      y: -10, 
      z: 15, 
      delay: 0.4, 
      rotation: 10 
    },
  ];

  useEffect(() => {
    const flecks = Array.from({ length: 10 });
    // No-op, just for rendering
  }, []);

  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-8 border-red-500 bg-gradient-to-br from-yellow-200 to-pink-400" style={{ minHeight: '100vh' }}>
      {/* DEBUG: If you see this, the NEW HERO is active! */}
      <div className="absolute top-4 left-4 bg-black text-yellow-300 px-4 py-2 z-50 rounded-xl shadow-lg">NEW HERO ACTIVE</div>
      {/* Washi paper animated background */}
      <div className="bg-washi" style={{ background: "url('/washi-texture.png'), repeating-linear-gradient(45deg, #fffbe9 0 40px, #f6e7cb 40px 80px)", opacity: 0.5 }}></div>
      {/* Gold flecks */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="gold-fleck" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${i*1.2}s` }} />
      ))}
      {/* Parallax floating ingredients (unchanged, but can add framer-motion for subtle float) */}
      <motion.div ref={parallaxRef} className="absolute inset-0 z-10 pointer-events-none">
        {ingredients.map((ingredient, i) => (
          <motion.img
            key={ingredient.name}
            src={ingredient.src}
            alt={ingredient.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [30, 0, 10, 0] }}
            transition={{ delay: ingredient.delay, duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute"
            style={{ left: `${ingredient.x}%`, top: `${ingredient.y}%`, zIndex: ingredient.z, transform: `rotate(${ingredient.rotation}deg)` }}
            width={80}
          />
        ))}
      </motion.div>
      {/* Animated Ink Title */}
      <motion.h1 className="ink-title z-20" initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.8, ease: [0.68,-0.55,0.27,1.55] }}>
        Culinary Canvas: The Art of Japanese Seasons
      </motion.h1>
      {/* Subtitle (unchanged, but with glass-card effect) */}
      <motion.p className="glass-card px-6 py-3 mt-6 text-xl text-center z-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }}>
        Experience the beauty of Japanese cuisine through the seasons.
      </motion.p>
      {/* Explore Button with glowing ripple effect */}
      <motion.button className="mt-10 px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-yellow-400 to-pink-500 shadow-lg ripple relative z-20"
        whileHover={{ scale: 1.08, boxShadow: '0 0 24px 6px #ffd70066' }}
        whileTap={{ scale: 0.96 }}>
        Explore the Seasons
      </motion.button>
      {/* Animated Lotus Petals (unchanged, or add more with framer-motion) */}
      <LotusPetals />
    </div>
  );
};

export default Hero;
