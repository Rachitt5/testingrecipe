import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import SeasonalCategories from '@/components/SeasonalCategories';
import IngredientSpotlight from '@/components/IngredientSpotlight';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    });
  }, [controls]);
  
  // Cherry blossom animation
  const CherryBlossoms = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-200 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              scale: 0.5 + Math.random() * 0.5
            }}
            animate={{
              y: `${window.innerHeight + 20}px`,
              x: `${(Math.random() - 0.5) * 200}px`,
              rotate: Math.random() * 360,
              opacity: [0.7, 0.5, 0.3, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 20
            }}
          />
        ))}
      </div>
    );
  };

  const JapaneseHighlight = () => {
    return (
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-cream to-pink-50">
        <CherryBlossoms />
        
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="h-0.5 w-16 bg-terracotta"></div>
            <div className="mx-4 text-terracotta">❀</div>
            <div className="h-0.5 w-16 bg-terracotta"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-navy mb-12 animate-fade-in-up">
            Featured Japanese Recipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
            >
              <img 
                src="public/lovable-uploads/e4b25889-3afa-4b69-ad31-0b51a860ff5c.png" 
                alt="Cucumber Wrapped Sushi" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block shadow-lg">
                    Seasonal Recipe
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    Cucumber Wrapped Sushi
                  </h3>
                  <p className="text-white/80 mt-2 drop-shadow-md">
                    A refreshing twist on traditional maki
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6 px-4 md:px-8 animate-fade-in-up">
              <div className="inline-block bg-sage/20 px-3 py-1 rounded-full text-sage font-medium shadow-sm backdrop-blur-sm">
                Japanese Cuisine
              </div>
              
              <h3 className="text-3xl font-playfair font-bold text-navy">
                Cucumber Wrapped Sushi (Kappa Maki)
              </h3>
              
              <p className="text-gray-700 backdrop-blur-sm bg-white/30 p-4 rounded-lg shadow-sm">
                Discover our beautiful cucumber wrapped sushi rolls, a perfect light meal for summer. This healthier alternative uses fresh cucumber instead of nori for a crisp, refreshing taste that pairs perfectly with salmon and avocado.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-terracotta rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Prep Time: 30 mins</span>
                </div>
                <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-sage rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Difficulty: Medium</span>
                </div>
                <div className="flex items-center bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-navy rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Servings: 4</span>
                </div>
              </div>
              
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105" asChild>
                <Link to="/cucumber-sushi">
                  View Complete Recipe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-pink-50">
      <Navbar />
      <Hero />
      <div className="relative z-10">
        <JapaneseHighlight />
      </div>
      <div className="relative z-10 animate-fade-in-up">
        <FeaturedRecipes />
      </div>
      <div className="relative z-10 animate-fade-in-up">
        <SeasonalCategories />
      </div>
      <div className="relative z-10 animate-fade-in-up">
        <IngredientSpotlight />
      </div>
      <div className="relative z-10 animate-fade-in-up">
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
