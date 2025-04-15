
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
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";

// Header Component with colorful design
const Header = () => {
  return (
    <header className="py-6 px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Rachit Recipe
        </h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">Home</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">Recipes</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">About</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">Contact</a>
      </nav>
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon">
          <div className="w-6 h-0.5 bg-indigo-700 mb-1"></div>
          <div className="w-4 h-0.5 bg-indigo-700 mb-1"></div>
          <div className="w-6 h-0.5 bg-indigo-700"></div>
        </Button>
      </div>
    </header>
  );
};

// Animated mystical particles/stars effect
const MysticalParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: 0.3 + Math.random() * 0.7
          }}
          animate={{
            y: [Math.random() * 10, -Math.random() * 10],
            x: [Math.random() * 10, -Math.random() * 10],
            opacity: [0.7, 0.3, 0.7],
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

// Recipe ingredient component with fun hover effect
const Ingredient = ({ name, amount, image, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-lg mb-4 relative group ingredient-card border border-purple-100"
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
      <div className="h-44 overflow-hidden bg-amber-50">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-4 bg-gradient-to-r from-amber-50 to-white">
        <h3 className="text-indigo-800 font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{amount}</p>
      </div>
      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

// Step component with animation and interactive elements
const RecipeStep = ({ number, title, description, image, isActive, onClick }) => {
  return (
    <motion.div 
      className={`p-5 rounded-xl mb-8 cursor-pointer transition-all duration-300 ${isActive ? "bg-gradient-to-r from-amber-50 to-white shadow-md" : "bg-white"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`flex-shrink-0 ${isActive ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gray-200"} text-white rounded-full w-12 h-12 flex items-center justify-center mt-1 transition-colors duration-300`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl ${isActive ? "font-bold text-indigo-800" : "text-gray-700"} mb-3 transition-colors duration-300`}>{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          {image && (
            <motion.div 
              className="mt-4 overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <img src={image} alt={`Step ${number}`} className="w-full" />
            </motion.div>
          )}
          
          {isActive && (
            <motion.div 
              className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-indigo-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm italic text-indigo-700">Chef's tip: Take your time with this step to ensure the best results!</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Custom timer component with colorful design
const RecipeTimer = ({ seconds, isRunning, onToggle, onReset }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-white to-amber-50 p-5 rounded-xl shadow-lg mb-8 border border-amber-100"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-4">
            <Clock className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">Cooking Timer</p>
            <p className="text-3xl font-playfair font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={onToggle}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-indigo-600 text-indigo-700 hover:bg-indigo-50"
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
    title: "Cucumber Wrapped Sushi",
    subtitle: "キュウリ巻き寿司",
    description: "A refreshing twist on traditional maki sushi, using thin cucumber slices as the wrapper instead of nori. This elegant appetizer is perfect for summer gatherings or as a light meal.",
    heroImage: "public/lovable-uploads/fb00897b-6bfd-4fe3-92ed-7a92cf9ed78d.png", 
    prepTime: "25 mins",
    cookTime: "15 mins",
    restTime: "30 mins",
    servings: 4,
    difficulty: "Intermediate",
    ingredients: [
      {
        name: "English Cucumbers",
        amount: "2 medium",
        image: "public/lovable-uploads/00c36de8-fb31-4e61-b0fc-2e3c3f02bf02.png"
      },
      {
        name: "Cream Cheese",
        amount: "½ cup spreadable",
        image: "public/lovable-uploads/6f73975e-1b84-42b2-bdb4-345fb2076674.png"
      },
      {
        name: "Japanese Rice",
        amount: "½ cup uncooked",
        image: "public/lovable-uploads/f73573fd-faa6-4fd1-b264-ca1f42832037.png"
      },
      {
        name: "Rice Vinegar",
        amount: "2 tbsp",
        image: "public/lovable-uploads/f8315545-8e86-4011-8bad-ff379ee026a2.png"
      },
      {
        name: "Sugar",
        amount: "1 tsp",
        image: "public/lovable-uploads/4ee67882-0ed4-42d0-be03-20ec093ebd38.png"
      },
      {
        name: "Salt",
        amount: "1 tsp",
        image: "public/lovable-uploads/aeca7ad2-25c9-4fb5-9cb6-b717c8890730.png"
      },
      {
        name: "Smoked Salmon",
        amount: "8-10 pieces (150g)",
        image: "public/lovable-uploads/2511b0b2-659a-497a-b373-3157d8548b59.png"
      },
      {
        name: "Avocado",
        amount: "½, thinly sliced",
        image: "public/lovable-uploads/0f00e809-aba4-45b7-908d-64a30981a5d7.png"
      },
      {
        name: "Sesame Seeds",
        amount: "For garnish",
        image: "public/lovable-uploads/4bc9ab7a-61d6-46e9-83e9-801a6fda4284.png"
      }
    ],
    steps: [
      {
        number: 1,
        title: "Prepare the Rice",
        description: "Wash and cook rice according to your usual method (stove top, rice cooker, pressure cooker). Fluff and let it cool slightly while whisking rice vinegar, sugar, and salt in a small bowl until fully dissolved. While rice is still warm, drizzle mixture over rice, stirring gently but thoroughly to coat rice grains.",
        image: "public/lovable-uploads/757c253b-6678-44a9-8b96-b6fea2d82f2a.png"
      },
      {
        number: 2,
        title: "Slice the Cucumbers",
        description: "Place cucumber vertical on cutting board in front of you. Using a vegetable y-peeler, press firmly and slice along the full length to get a thin, long strip of cucumber. Repeat until you reach the core where the channel of seeds are and you can no longer get full-width slices.",
        image: "public/lovable-uploads/b8101df5-8d3d-4adc-b91c-c7635b956fad.png"
      },
      {
        number: 3,
        title: "Arrange Cucumber Strips",
        description: "Arrange sliced cucumbers on a bamboo sushi mat or large piece of plastic food wrap, vertically next to each other and overlapping to create one large square \"sheet\" of cucumber slices. Pat very dry with a paper towel.",
        image: "public/lovable-uploads/c375daac-adb1-4aa4-9b00-1e6f282c8d28.png"
      },
      {
        number: 4,
        title: "Add Fillings",
        description: "Spread a thin layer of cream cheese all over. Arrange smoked salmon slices in a row about 1\" up from the bottom border. Spread seasoned rice above and slightly overlapping the row of smoked salmon, followed by avocado slices above and slightly overlapping the rice.",
        image: "public/lovable-uploads/d60d34cb-7f2d-47f1-8b0c-09b34950bb4f.png"
      },
      {
        number: 5,
        title: "Roll and Slice",
        description: "Using the bamboo mat (or plastic wrap) to aid, roll up snugly, pulling the bamboo mat or wrap back and away as you roll so it does not get rolled up into the cucumber roll. Cut cucumber sushi roll crosswise into 8 pieces. Arrange on serving plate and garnish with black/white sesame seeds.",
        image: "public/lovable-uploads/9ccf91c6-5df8-4cd2-9c67-812619d4e045.png"
      }
    ],
    finalImage: "public/lovable-uploads/a0fa9695-3ec8-4b18-bc49-ca77079b8dff.png"
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-rotate-slow w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-indigo-700 font-playfair">Preparing recipe magic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15" 
        style={{ backgroundImage: `url(${recipe.heroImage})` }} 
      />
      <MysticalParticles />
      <Header />
      
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="public/lovable-uploads/f977882f-7c7f-4937-a0fb-dda5670df3af.png" 
            alt="Magical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/50 to-transparent"></div>
        </div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="text-center px-4 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full mb-6 font-medium"
            >
              日本の伝統料理 • Japanese Inspired Recipe
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-4 font-playfair leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {recipe.title}
            </motion.h1>
            
            <motion.p
              className="text-white/80 text-xl md:text-2xl mb-2 font-playfair"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {recipe.subtitle}
            </motion.p>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto font-montserrat mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {recipe.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold rounded-full px-8 py-6 shadow-lg"
                onClick={scrollToSteps}
              >
                Explore Recipe
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Wave decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path 
              fill="#F9F7FF" 
              fillOpacity="1" 
              d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
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
            <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Prep Time</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.prepTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <ChefHat className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Cook Time</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.cookTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Users className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.servings}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Utensils className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.difficulty}</p>
          </motion.div>
        </div>
        
        {/* Recipe Content with Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger 
              value="ingredients" 
              className="text-lg font-playfair bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              材料<br/><span className="text-sm">Ingredients</span>
            </TabsTrigger>
            <TabsTrigger 
              value="instructions" 
              className="text-lg font-playfair bg-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              手順<br/><span className="text-sm">Instructions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-6">
            <div className="relative p-1">
              <div className="p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8 font-playfair">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recipe Ingredients</span>
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
              <h3 className="text-2xl font-bold text-center mb-6 font-playfair">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Kitchen Tools</span>
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
                    <span className="inline-block w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3"></span>
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
              <h2 className="text-3xl font-bold text-center mb-8 font-playfair">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Step-by-Step Instructions</span>
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
              <h3 className="text-2xl font-bold text-center mb-6 font-playfair">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Final Result</span>
              </h3>
              
              <div className="overflow-hidden rounded-lg shadow-md">
                <img src={recipe.finalImage} alt="Final Sushi" className="w-full" />
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg">
                <p className="italic text-indigo-700 text-center">
                  "The cucumber wrapper adds a refreshing crunch while the cream cheese, smoked salmon, and avocado create a perfect harmony of flavors. Enjoy this healthy alternative to traditional sushi!"
                </p>
              </div>
            </motion.div>
            
            {/* Final image */}
            <motion.div 
              className="mt-12 p-6 bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img src="public/lovable-uploads/b31e9e9f-ec09-4ed3-8f7c-ff06fe22fe1c.png" alt="Completed Dish" className="w-full rounded-lg" />
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action - Back to top */}
        <div className="mt-16 text-center">
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-md"
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            Back to Top
          </Button>
        </div>
      </div>
      
      {/* Footer with colorful theme */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">料理ブログ</h3>
              <p className="text-white/70">Rachit's Culinary Journey</p>
            </div>
            
            <div className="flex space-x-6">
              {['Home', 'Recipes', 'About', 'Contact'].map((item, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-white/80 hover:text-amber-300 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>© 2025 Rachit Recipe Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipePage;
