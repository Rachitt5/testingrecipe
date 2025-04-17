import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Clock, ChefHat, Users, Utensils, 
  ChevronDown, ChevronUp, ArrowRight, 
  Play, Pause, Printer, Share2, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Header Component with clean, minimalist design inspired by the reference image
const Header = () => {
  return (
    <header className="py-6 px-8 flex items-center justify-between bg-terracotta text-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair">
          Rachit's Recipe Blog
        </h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-white hover:text-cream transition-colors duration-300 font-medium">Home</a>
        <a href="#" className="text-white hover:text-cream transition-colors duration-300 font-medium">Recipes</a>
        <a href="#" className="text-white hover:text-cream transition-colors duration-300 font-medium">About</a>
        <a href="#" className="text-white hover:text-cream transition-colors duration-300 font-medium">Contact</a>
      </nav>
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-4 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </Button>
      </div>
    </header>
  );
};

// Animated elegant particles effect
const ElegantParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cream rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: 0.3 + Math.random() * 0.7
          }}
          animate={{
            y: [Math.random() * 10, -Math.random() * 10],
            x: [Math.random() * 10, -Math.random() * 10],
            opacity: [0.3, 0.1, 0.3],
            scale: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Recipe ingredient component with elegant hover effect
const Ingredient = ({ name, amount, image, index }) => {
  return (
    <motion.div 
      className="bg-cream rounded-xl overflow-hidden shadow-lg mb-4 relative group ingredient-card border border-terracotta/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
        transition: { duration: 0.4 }
      }}
    >
      <div className="h-44 overflow-hidden bg-white">
        <motion.div 
          className="w-full h-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "public/placeholder.svg";
            }}
          />
        </motion.div>
      </div>
      <div className="p-4 bg-cream">
        <h3 className="text-navy font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{amount}</p>
      </div>
      <div className="absolute inset-0 bg-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

// Step component with clean, minimalist design
const RecipeStep = ({ number, title, description, image, isActive, onClick }) => {
  return (
    <motion.div 
      className={`p-5 rounded-xl mb-8 cursor-pointer transition-all duration-300 ${isActive ? "bg-cream shadow-md" : "bg-white"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`flex-shrink-0 ${isActive ? "bg-terracotta" : "bg-gray-200"} text-white rounded-full w-12 h-12 flex items-center justify-center mt-1 transition-colors duration-300`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl ${isActive ? "font-bold text-navy" : "text-gray-700"} mb-3 transition-colors duration-300`}>{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          {image && (
            <motion.div 
              className="mt-4 overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={image}
                alt={`Step ${number}`}
                className="w-full"
                onError={(e) => {
                  e.currentTarget.src = "public/placeholder.svg";
                }}
              />
            </motion.div>
          )}
          
          {isActive && (
            <motion.div 
              className="mt-4 p-3 bg-cream rounded-lg border border-terracotta/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm italic text-navy">Chef's tip: Take your time with this step to ensure the best results!</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Custom timer component with clean design
const RecipeTimer = ({ seconds, isRunning, onToggle, onReset }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return (
    <motion.div 
      className="bg-white p-5 rounded-xl shadow-lg mb-8 border border-sage/20"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-terracotta flex items-center justify-center mr-4">
            <Clock className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-xs text-navy uppercase tracking-wider font-semibold">Cooking Timer</p>
            <p className="text-3xl font-playfair font-bold text-navy">
              {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-terracotta text-terracotta hover:bg-cream"
            onClick={onToggle}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-navy text-navy hover:bg-cream"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Recipe Page Component
const RecipePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { toast } = useToast();
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  // Recipe data with detailed instructions and images
  const recipe = {
    title: "Japanese Sushi",
    subtitle: "Cucumber Wrapped Elegance",
    description: "A refreshing twist on traditional maki sushi, using thin cucumber slices as the wrapper instead of nori. This elegant appetizer is perfect for summer gatherings or as a light meal.",
    heroImage: "public/lovable-uploads/e3a85ed1-3911-44c7-b5a0-77f780931944.png", 
    prepTime: "25 mins",
    cookTime: "15 mins",
    restTime: "30 mins",
    servings: 4,
    difficulty: "Intermediate",
    ingredients: [
      {
        name: "English Cucumbers",
        amount: "2 medium",
        image: "public/lovable-uploads/05d1dfb9-c962-419b-9e03-602196ee4648.png"
      },
      {
        name: "Cream Cheese",
        amount: "½ cup spreadable",
        image: "public/lovable-uploads/17af3645-66cf-4133-8eb6-2c885ba1c338.png"
      },
      {
        name: "Japanese Rice",
        amount: "½ cup uncooked",
        image: "public/lovable-uploads/2c691feb-d2c6-4a9d-ab6e-53ad1a27a810.png"
      },
      {
        name: "Rice Vinegar",
        amount: "2 tbsp",
        image: "public/lovable-uploads/a3d688bc-708b-4d35-bb1c-2fea31d8186b.png"
      },
      {
        name: "Sugar",
        amount: "1 tsp",
        image: "public/lovable-uploads/d1e82b30-3eb1-4298-b020-6b4a13512bba.png"
      },
      {
        name: "Salt",
        amount: "1 tsp",
        image: "public/lovable-uploads/9c1c112e-eddf-4bbf-9d50-c2539ef6df2b.png"
      },
      {
        name: "Smoked Salmon",
        amount: "8-10 pieces (150g)",
        image: "public/lovable-uploads/5211885e-fcac-45aa-8247-8b60e613ef89.png"
      },
      {
        name: "Avocado",
        amount: "½, thinly sliced",
        image: "public/lovable-uploads/3c74466f-d8a5-4966-b3a5-ccd702527151.png"
      },
      {
        name: "Sesame Seeds",
        amount: "For garnish",
        image: "public/lovable-uploads/413b37fb-4855-4e89-b541-eff3883bd185.png"
      }
    ],
    steps: [
      {
        number: 1,
        title: "Prepare the Rice",
        description: "Wash and cook rice according to your usual method (stove top, rice cooker, pressure cooker). Fluff and let it cool slightly while whisking rice vinegar, sugar, and salt in a small bowl until fully dissolved. While rice is still warm, drizzle mixture over rice, stirring gently but thoroughly to coat rice grains.",
        image: "public/lovable-uploads/081cc584-f098-4581-a40a-10c40cabf206.png"
      },
      {
        number: 2,
        title: "Slice the Cucumbers",
        description: "Place cucumber vertical on cutting board in front of you. Using a vegetable y-peeler, press firmly and slice along the full length to get a thin, long strip of cucumber. Repeat until you reach the core where the channel of seeds are and you can no longer get full-width slices. You can still use the small strips on either side, or just cut the centre for snacking.",
        image: "public/lovable-uploads/a5043f61-ff9e-486e-8f0e-ddaf8eb37ea2.png"
      },
      {
        number: 3,
        title: "Arrange Cucumber Strips",
        description: "Arrange sliced cucumbers on a bamboo sushi mat or large piece of plastic food wrap, vertically next to each other and overlapping to create one large square \"sheet\" of cucumber slices. Pat very dry with a paper towel.",
        image: "public/lovable-uploads/094551bb-a534-4604-b435-7c2bfb5bdbe9.png"
      },
      {
        number: 4,
        title: "Add Fillings",
        description: "Spread a thin layer of cream cheese all over. Arrange smoked salmon slices in a row about 1\" up from the bottom border. Spread seasoned rice above and slightly overlapping the row of smoked salmon, followed by avocado slices above and slightly overlapping the rice.",
        image: "public/lovable-uploads/5d9a49bf-88bf-41e9-9277-a1f2fd14500f.png"
      },
      {
        number: 5,
        title: "Roll and Shape",
        description: "Using the bamboo mat (or plastic wrap) to aid, roll up snugly, pulling the bamboo mat or wrap back and away as you roll so it does not get rolled up into the cucumber roll. Watch for a visual demo of this step to perfect your technique!",
        image: "public/lovable-uploads/7a7705a4-89f3-4ad9-ba4a-de505901e1ab.png"
      },
      {
        number: 6,
        title: "Slice into Pieces",
        description: "Cut cucumber sushi roll crosswise into 8 pieces using a sharp knife. Arrange on serving plate and garnish with black/white sesame seeds.",
        image: "public/lovable-uploads/8211f525-25ce-40f6-b119-93c63250ddd5.png"
      }
    ],
    finalImage: "public/lovable-uploads/f19b950a-5a87-4648-be41-94416d57778e.png"
  };

  // Timer hooks
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
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

  // Loading animation
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

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

  // Show loading animation
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-rotate-slow w-16 h-16 border-4 border-terracotta border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-navy font-playfair">Preparing recipe magic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream relative">
      <ElegantParticles />
      <Header />
      
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ae2.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center z-10 relative">
              <motion.p 
                className="text-lg font-medium mb-4 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                What's Trending
              </motion.p>
              
              <motion.h1
                className="text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-white via-cream to-white bg-clip-text text-transparent drop-shadow-lg tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {recipe.title}
              </motion.h1>
              
              <motion.p
                className="text-xl mb-8 text-white font-medium italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Come see my recipe of sushi and fall in love with every bite
              </motion.p>
              
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  className="bg-black hover:bg-black/80 text-white rounded-full px-8 py-6"
                  onClick={scrollToSteps}
                >
                  Explore Food
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-black text-white border-none hover:bg-black/80 shadow-lg"
          >
            DISCOVER
          </Button>
        </motion.div>
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-24 relative z-10">
        {/* Recipe Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Clock className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Prep Time</p>
            <p className="font-medium text-lg text-navy">{recipe.prepTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <ChefHat className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Cook Time</p>
            <p className="font-medium text-lg text-navy">{recipe.cookTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Users className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium text-lg text-navy">{recipe.servings}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Utensils className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium text-lg text-navy">{recipe.difficulty}</p>
          </motion.div>
        </div>
        
        {/* Recipe Content with Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger 
              value="ingredients" 
              className="text-lg font-playfair bg-white data-[state=active]:bg-terracotta data-[state=active]:text-white"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger 
              value="instructions" 
              className="text-lg font-playfair bg-white data-[state=active]:bg-terracotta data-[state=active]:text-white"
            >
              Instructions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-6">
            <div className="relative p-1">
              <div className="p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8 font-playfair text-navy">
                  Recipe Ingredients
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <Ingredient 
                      key={index} 
                      name={ingredient.name} 
                      amount={ingredient.amount}
                      image={ingredient.image}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6 font-playfair text-terracotta">
                Kitchen Tools
              </h3>
              
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
                    className="bg-white p-4 rounded-lg shadow-md flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, backgroundColor: "#FFFAF0" }}
                  >
                    <span className="inline-block w-3 h-3 bg-terracotta rounded-full mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructions" ref={stepsRef}>
            {/* Timer Component */}
            <RecipeTimer 
              seconds={timer} 
              isRunning={isTimerRunning} 
              onToggle={handleTimerToggle} 
              onReset={handleTimerReset}
            />
            
            {/* Instruction Steps */}
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8 font-playfair text-navy">
                Step-by-Step Instructions
              </h2>
              
              <div className="space-y-6">
                {recipe.steps.map((step) => (
                  <RecipeStep
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    image={step.image}
                    isActive={activeStep === step.number}
                    onClick={() => setActiveStep(step.number)}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Final Result */}
            <motion.div 
              className="mt-12 p-6 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-center mb-6 font-playfair text-terracotta">
                Final Result
              </h3>
              
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src={recipe.finalImage} 
                  alt="Final Sushi" 
                  className="w-full"
                  onError={(e) => {
                    e.currentTarget.src = "public/placeholder.svg";
                  }}
                />
              </div>
              
              <div className="mt-8 bg-cream p-5 rounded-lg">
                <p className="italic text-navy text-center">
                  "The cucumber wrapper adds a refreshing crunch while the cream cheese, smoked salmon and avocado create a perfect harmony of flavors. Enjoy this healthier alternative to traditional sushi!"
                </p>
              </div>
            </motion.div>
            
            {/* Actions */}
            <motion.div
              className="mt-12 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button variant="outline" className="flex items-center gap-2 border-terracotta text-terracotta">
                <Printer size={18} />
                Print Recipe
              </Button>
              <Button variant="outline" className="flex items-center gap-2 border-navy text-navy">
                <Share2 size={18} />
                Share Recipe
              </Button>
              <Button variant="outline" className="flex items-center gap-2 border-sage text-sage">
                <Bookmark size={18} />
                Save Recipe
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="bg-terracotta hover:bg-terracotta/90 text-white shadow-md"
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            Back to Top
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-bold mb-2 text-cream">Rachit's Recipe Blog</h3>
              <p className="text-white/70">Culinary Journeys</p>
            </div>
            
            <div className="flex space-x-6">
              {['Home', 'Recipes', 'About', 'Contact'].map((item, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-white/80 hover:text-cream transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p> {new Date().getFullYear()} Rachit's Recipe Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipePage;
