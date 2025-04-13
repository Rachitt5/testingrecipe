
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, Utensils, Users, ChefHat, Printer, 
  BookmarkPlus, Share2, ChevronDown, ChevronUp, Play, Pause
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Animated ingredient component
const AnimatedIngredient = ({ name, amount, image }: { name: string; amount: string; image: string }) => {
  return (
    <motion.div 
      className="relative bg-cream rounded-xl overflow-hidden shadow-md mb-4 ingredient-3d"
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        transition: { duration: 0.4 }
      }}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 bg-cream">
        <h3 className="text-navy font-medium text-center">{name}</h3>
        <p className="text-sm text-center text-gray-600">{amount}</p>
      </div>
    </motion.div>
  );
};

// Step component with animation
const RecipeStep = ({ 
  number, 
  text, 
  isActive, 
  onClick 
}: { 
  number: number; 
  text: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.div 
      className={`flex mb-8 cursor-pointer ${isActive ? 'bg-sage/10 p-4 rounded-lg' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      onClick={onClick}
    >
      <div className={`${isActive ? 'bg-terracotta' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mt-1 mr-4 flex-shrink-0 transition-colors duration-300`}>
        {number}
      </div>
      <div className="pb-6 border-b border-gray-200">
        <p className={`text-lg ${isActive ? 'font-medium' : ''}`}>{text}</p>
      </div>
    </motion.div>
  );
};

// Timer component
const Timer = ({ seconds, isRunning, onToggle, onReset }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center mr-4">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Timer</p>
          <p className="text-2xl font-bold font-playfair">
            {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-terracotta text-terracotta hover:bg-terracotta/5"
          onClick={onToggle}
        >
          {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-navy text-navy hover:bg-navy/5"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

// Cherry blossom animation
const CherryBlossoms = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
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

// Japanese art frame
const JapaneseFrame = ({ children }) => (
  <div className="relative">
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-terracotta"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-terracotta"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-terracotta"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-terracotta"></div>
    <div className="p-8">{children}</div>
  </div>
);

const CucumberSushiPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();

  // Ref for scrolling to steps
  const stepsRef = useRef(null);

  useEffect(() => {
    // Simulate loading images
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      toast({
        title: "Timer Complete!",
        description: "Your cooking timer has finished.",
      });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, toast]);

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTimerReset = () => {
    setTimer(30 * 60);
    setIsTimerRunning(false);
  };

  const scrollToSteps = () => {
    stepsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax effects
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  const recipe = {
    title: "Cucumber Wrapped Sushi (Kappa Maki)",
    description: "A refreshing and healthy twist on traditional sushi, using cucumber as the wrapper instead of nori. This light and delicious dish is perfect for summer gatherings or as an elegant appetizer.",
    image: "public/lovable-uploads/e4b25889-3afa-4b69-ad31-0b51a860ff5c.png",
    prepTime: "30 mins",
    cookTime: "15 mins (for rice)",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      {
        name: "English Cucumbers",
        amount: "2 medium",
        image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Cream Cheese",
        amount: "½ cup spreadable",
        image: "public/lovable-uploads/ff1f8e46-3689-4f33-a19d-49a015652c02.png"
      },
      {
        name: "Japanese Short-grain Rice",
        amount: "½ cup uncooked (1 cup cooked)",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Rice Vinegar",
        amount: "2 tbsp",
        image: "https://images.unsplash.com/photo-1526048598645-62b31f82b8f5?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Sugar",
        amount: "1 tsp",
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Salt",
        amount: "1 tsp",
        image: "https://images.unsplash.com/photo-1518110925495-7d5c898c3f0b?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Mirin",
        amount: "1 tbsp",
        image: "https://images.unsplash.com/photo-1589551514595-8f0ea408d50e?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Smoked Salmon",
        amount: "8-10 pieces (about 150g)",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Avocado",
        amount: "½, peeled, pitted and thinly sliced",
        image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Japanese Furikake",
        amount: "Optional, for garnish",
        image: "https://images.unsplash.com/photo-1602162599782-6fef2edac6e8?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Sesame Seeds",
        amount: "Toasted black and/or white, for garnish",
        image: "https://images.unsplash.com/photo-1638173555671-611c25c0e191?auto=format&fit=crop&q=80&w=500"
      }
    ],
    instructions: [
      {
        step: 1,
        text: "Rinse the rice several times until the water runs clear. Cook according to package instructions, typically 1:1.25 ratio of rice to water."
      },
      {
        step: 2,
        text: "In a small bowl, mix rice vinegar, sugar, salt, and mirin. Once the rice is cooked, transfer to a wide bowl and gently fold in the vinegar mixture. Let cool to room temperature."
      },
      {
        step: 3,
        text: "Using a vegetable peeler or mandolin, slice the cucumbers lengthwise into thin strips. Pat dry with paper towels to remove excess moisture."
      },
      {
        step: 4,
        text: "Lay out cucumber strips on a clean work surface. Spread a thin layer of cream cheese along each strip."
      },
      {
        step: 5,
        text: "Add a layer of prepared sushi rice (about 2 tablespoons) on top of the cream cheese, leaving about 1 inch at the end of each strip."
      },
      {
        step: 6,
        text: "Place a piece of smoked salmon and a slice of avocado along the center of the rice."
      },
      {
        step: 7,
        text: "Carefully roll the cucumber strip, starting from the end with ingredients, tucking in as you roll to make a tight cylinder."
      },
      {
        step: 8,
        text: "Secure each roll with a toothpick if necessary. Chill for at least 30 minutes before serving to help the rolls hold their shape."
      },
      {
        step: 9,
        text: "Just before serving, sprinkle with furikake and sesame seeds for an authentic Japanese flavor and presentation."
      }
    ],
    season: "Spring/Summer"
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-rotate-slow w-16 h-16 border-4 border-terracotta border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-montserrat">Loading recipe...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/95 relative">
      <CherryBlossoms />
      <Navbar />
      
      {/* Hero Header with Parallax */}
      <div className="relative h-[60vh] lg:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-6 py-2 bg-terracotta/90 backdrop-blur-sm text-white rounded-full text-lg font-medium mb-6"
            >
              {recipe.season} Recipe
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-playfair leading-tight max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {recipe.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-montserrat mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {recipe.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="bg-sage hover:bg-sage/90 text-white font-medium rounded-full px-8"
                onClick={scrollToSteps}
              >
                View Recipe Steps
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </div>
      
      {/* Japanese-style decorative element */}
      <div className="relative z-10 -mt-16 pb-12">
        <div className="container mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 relative z-10">
            <div className="flex justify-center mb-8">
              <div className="h-0.5 w-20 bg-terracotta"></div>
              <div className="mx-4 text-terracotta">❀</div>
              <div className="h-0.5 w-20 bg-terracotta"></div>
            </div>

            {/* Recipe Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <motion.div 
                className="bg-cream/60 backdrop-blur-sm p-4 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="h-8 w-8 text-terracotta mx-auto mb-2" />
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium text-lg">{recipe.prepTime}</p>
              </motion.div>
              
              <motion.div 
                className="bg-cream/60 backdrop-blur-sm p-4 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <ChefHat className="h-8 w-8 text-terracotta mx-auto mb-2" />
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-medium text-lg">{recipe.cookTime}</p>
              </motion.div>
              
              <motion.div 
                className="bg-cream/60 backdrop-blur-sm p-4 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Users className="h-8 w-8 text-terracotta mx-auto mb-2" />
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium text-lg">{recipe.servings}</p>
              </motion.div>
              
              <motion.div 
                className="bg-cream/60 backdrop-blur-sm p-4 rounded-lg text-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Utensils className="h-8 w-8 text-terracotta mx-auto mb-2" />
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-medium text-lg">{recipe.difficulty}</p>
              </motion.div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy/5"
                onClick={() => {
                  toast({
                    title: "Recipe Saved",
                    description: "This recipe has been saved to your collection.",
                  });
                }}
              >
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save Recipe
              </Button>
              
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy/5"
                onClick={() => {
                  toast({
                    title: "Print Dialog",
                    description: "Opening print dialog for this recipe.",
                  });
                }}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Recipe
              </Button>
              
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy/5"
                onClick={() => {
                  toast({
                    title: "Share Recipe",
                    description: "Sharing options opened for this recipe.",
                  });
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Recipe Content */}
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="ingredients" className="font-playfair text-lg">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions" className="font-playfair text-lg">Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="space-y-4">
                <JapaneseFrame>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <AnimatedIngredient 
                        key={index} 
                        name={ingredient.name} 
                        amount={ingredient.amount}
                        image={ingredient.image} 
                      />
                    ))}
                  </div>
                </JapaneseFrame>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-navy mb-4 font-playfair border-b border-terracotta pb-2 inline-block">Equipment Needed:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Rice cooker or pot",
                      "Vegetable peeler or mandolin",
                      "Sharp knife",
                      "Cutting board",
                      "Bamboo sushi mat",
                      "Toothpicks"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white p-3 rounded-lg shadow-sm flex items-center"
                        whileHover={{ scale: 1.03 }}
                      >
                        <span className="inline-block w-3 h-3 bg-terracotta rounded-full mr-3"></span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructions" ref={stepsRef}>
                {/* Timer Component */}
                <Timer 
                  seconds={timer} 
                  isRunning={isTimerRunning} 
                  onToggle={handleTimerToggle} 
                  onReset={handleTimerReset}
                />
                
                {/* Instructions */}
                <motion.div 
                  className="bg-white p-6 md:p-8 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-navy mb-8 font-playfair border-b-2 border-terracotta pb-2 inline-block">Step-by-Step Instructions</h2>
                  
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction) => (
                      <RecipeStep
                        key={instruction.step}
                        number={instruction.step}
                        text={instruction.text}
                        isActive={activeStep === instruction.step}
                        onClick={() => setActiveStep(instruction.step)}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Chef's Notes */}
                <motion.div 
                  className="mt-12 p-6 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-navy mb-4 font-playfair">Chef's Notes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>For the best texture, make sure the cucumber strips are not too thick or too thin - about 1-2mm is ideal.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>The rolls can be made a few hours in advance, but are best enjoyed the same day.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>If you don't have mirin, you can substitute with 1 tablespoon of rice vinegar mixed with 1/2 teaspoon of sugar.</span>
                    </li>
                  </ul>
                </motion.div>
                
                {/* Serving Suggestions */}
                <motion.div 
                  className="mt-8 p-6 bg-white rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-navy mb-4 font-playfair">Serving Suggestions</h3>
                  <p className="mb-4">Serve these refreshing cucumber rolls with:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>Soy sauce for dipping</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>Pickled ginger</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>Wasabi paste</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                      <span>A cup of warm green tea</span>
                    </li>
                  </ul>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Call to Action - Back to top */}
      <div className="container mx-auto py-12 px-4">
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="bg-terracotta hover:bg-terracotta/90 text-white"
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            Back to Top
          </Button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CucumberSushiPage;
