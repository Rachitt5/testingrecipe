
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
      <section className="py-20 relative overflow-hidden bg-cream">
        <CherryBlossoms />
        
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="h-0.5 w-16 bg-terracotta"></div>
            <div className="mx-4 text-terracotta">❀</div>
            <div className="h-0.5 w-16 bg-terracotta"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-navy mb-12">
            Featured Japanese Recipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src="public/lovable-uploads/e4b25889-3afa-4b69-ad31-0b51a860ff5c.png" 
                alt="Cucumber Wrapped Sushi" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Seasonal Recipe
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Cucumber Wrapped Sushi
                  </h3>
                  <p className="text-white/80 mt-2">
                    A refreshing twist on traditional maki
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6 px-4 md:px-8">
              <div className="inline-block bg-sage/20 px-3 py-1 rounded-full text-sage font-medium">
                Japanese Cuisine
              </div>
              
              <h3 className="text-3xl font-playfair font-bold text-navy">
                Cucumber Wrapped Sushi (Kappa Maki)
              </h3>
              
              <p className="text-gray-700">
                Discover our beautiful cucumber wrapped sushi rolls, a perfect light meal for summer. This healthier alternative uses fresh cucumber instead of nori for a crisp, refreshing taste that pairs perfectly with salmon and avocado.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-terracotta rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Prep Time: 30 mins</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-sage rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Difficulty: Medium</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-navy rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Servings: 4</span>
                </div>
              </div>
              
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white" asChild>
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <JapaneseHighlight />
      <FeaturedRecipes />
      <SeasonalCategories />
      <IngredientSpotlight />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
