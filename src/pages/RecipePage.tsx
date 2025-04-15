
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

// Header Component with Japanese-inspired design
const Header = () => {
  return (
    <header className="py-6 px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="mr-2"
        >
          <img src="public/lovable-uploads/5ee877b9-f3e0-4d4e-b4a3-05ea756162c5.png" alt="Logo" className="w-10 h-10" />
        </motion.div>
        <h1 className="text-xl md:text-2xl font-bold font-playfair text-navy">Oishi Recipe</h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-navy hover:text-terracotta transition-colors duration-300">Home</a>
        <a href="#" className="text-navy hover:text-terracotta transition-colors duration-300">Recipes</a>
        <a href="#" className="text-navy hover:text-terracotta transition-colors duration-300">About</a>
        <a href="#" className="text-navy hover:text-terracotta transition-colors duration-300">Contact</a>
      </nav>
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon">
          <div className="w-6 h-0.5 bg-navy mb-1"></div>
          <div className="w-4 h-0.5 bg-navy mb-1"></div>
          <div className="w-6 h-0.5 bg-navy"></div>
        </Button>
      </div>
    </header>
  );
};

// Animated cherry blossom petals
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

// Recipe ingredient component with 3D-like hover effect
const Ingredient = ({ name, amount, image }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md mb-4 relative group ingredient-card"
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        z: 20,
        transition: { duration: 0.4 }
      }}
    >
      <div className="h-40 overflow-hidden bg-cream">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-navy font-medium text-lg">{name}</h3>
        <p className="text-gray-600">{amount}</p>
      </div>
      <div className="absolute inset-0 bg-terracotta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

// Step component with animation and interaction
const RecipeStep = ({ number, title, description, isActive, onClick }) => {
  return (
    <motion.div 
      className={`p-4 rounded-xl mb-6 cursor-pointer transition-all duration-300 ${isActive ? "bg-cream shadow-md" : "bg-white"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${isActive ? "bg-terracotta" : "bg-gray-200"} text-white rounded-full w-10 h-10 flex items-center justify-center mt-1 mr-4 transition-colors duration-300`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl ${isActive ? "font-semibold text-terracotta" : "text-navy"} mb-2 transition-colors duration-300`}>{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          {isActive && (
            <motion.div 
              className="mt-4 p-3 bg-white/80 rounded-lg border border-sage/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm italic text-gray-500">Pro tip: Take your time with this step to ensure the best results!</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Custom timer component with Japanese aesthetic
const RecipeTimer = ({ seconds, isRunning, onToggle, onReset }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return (
    <motion.div 
      className="bg-white p-4 rounded-xl shadow-lg mb-8 border border-sage/20"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center mr-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Timer</p>
            <p className="text-3xl font-playfair font-bold">
              {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-terracotta text-terracotta hover:bg-terracotta/10"
            onClick={onToggle}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-navy text-navy hover:bg-navy/10"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// 3D Sushi component
const SushiModel = () => {
  return (
    <div className="w-full h-[300px] mb-8 rounded-xl overflow-hidden bg-gray-50">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
          <meshStandardMaterial color="#f4f1de" />
        </mesh>
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.2, 32]} />
          <meshStandardMaterial color="#81B29A" />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

// Japanese styled decorative frame
const JapaneseFrame = ({ children }) => (
  <div className="relative p-1">
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-terracotta"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-terracotta"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-terracotta"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-terracotta"></div>
    <div className="p-6 md:p-8">{children}</div>
  </div>
);

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
  
  // Recipe data with Japanese aesthetics
  const recipe = {
    title: "Cucumber Wrapped Sushi",
    subtitle: "キュウリ巻き寿司",
    description: "A refreshing twist on traditional maki sushi, using thin cucumber slices as the wrapper instead of nori. This elegant appetizer is perfect for summer gatherings or as a light meal.",
    heroImage: "public/lovable-uploads/f4eea429-3c13-447c-b362-ccaf919b78f7.png", 
    prepTime: "25 mins",
    cookTime: "15 mins",
    restTime: "30 mins",
    servings: 4,
    difficulty: "Intermediate",
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
        name: "Japanese Rice",
        amount: "½ cup uncooked",
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
        amount: "8-10 pieces (150g)",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Avocado",
        amount: "½, thinly sliced",
        image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Furikake",
        amount: "For garnish",
        image: "https://images.unsplash.com/photo-1602162599782-6fef2edac6e8?auto=format&fit=crop&q=80&w=500"
      },
      {
        name: "Sesame Seeds",
        amount: "For garnish",
        image: "https://images.unsplash.com/photo-1638173555671-611c25c0e191?auto=format&fit=crop&q=80&w=500"
      }
    ],
    steps: [
      {
        number: 1,
        title: "Prepare the Rice",
        description: "Wash and cook rice according to your usual method (stove top, rice cooker, pressure cooker). Fluff and let it cool slightly while whisking rice vinegar, sugar, salt and mirin in a small bowl until granules are fully dissolved. While rice is still warm, drizzle vinegar mixture over rice, stirring gently but thoroughly to coat rice grains."
      },
      {
        number: 2,
        title: "Slice the Cucumbers",
        description: "Place cucumber vertical on cutting board in front of you. Using a vegetable y-peeler, press firmly and slice along the full length to get a thin, long strip of cucumber. Repeat until you reach the core where the channel of seeds are and you can no longer get full-width slices. You can still use the small strips on either side, or just cut the centre for snacking rather than using in the recipe."
      },
      {
        number: 3,
        title: "Arrange Cucumber Strips",
        description: "Arrange sliced cucumbers on a bamboo sushi mat or large piece of plastic food wrap, vertically next to each other and overlapping to create one large square \"sheet\" of cucumber slices. Pat very dry with a paper towel."
      },
      {
        number: 4,
        title: "Add Fillings",
        description: "Spread a thin layer of cream cheese all over. Arrange smoked salmon slices in a row about 1\" up from the bottom border. Spread seasoned rice above and slightly overlapping the row of smoked salmon, followed by avocado slices above and slightly overlapping the rice. Sprinkle furikake over the rice, if using."
      },
      {
        number: 5,
        title: "Roll and Slice",
        description: "Using the bamboo mat (or plastic wrap) to aid, roll up snugly, pulling the bamboo mat or wrap back and away as you roll so it does not get rolled up into the cucumber roll. Cut cucumber sushi roll crosswise into 8 pieces. Arrange on serving plate and garnish with black/white sesame seeds."
      }
    ]
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
          <p className="text-lg text-navy font-montserrat">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/95 relative">
      <CherryBlossoms />
      <Header />
      
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={recipe.heroImage} 
            alt={recipe.title}
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
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
              className="inline-block bg-terracotta/90 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6"
            >
              日本の伝統料理 • Traditional Japanese Recipe
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
                className="bg-sage hover:bg-sage/90 text-white font-bold rounded-full px-8 py-6"
                onClick={scrollToSteps}
              >
                View Recipe
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Japanese wave decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path 
              fill="#F4F1DE" 
              fillOpacity="1" 
              d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content with Japanese Aesthetic */}
      <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
        {/* Recipe Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Clock className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Prep Time</p>
            <p className="font-medium text-lg">{recipe.prepTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <ChefHat className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Cook Time</p>
            <p className="font-medium text-lg">{recipe.cookTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Users className="h-8 w-8 text-terracotta mx-auto mb-2" />
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium text-lg">{recipe.servings}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
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
            <Bookmark className="h-4 w-4 mr-2" />
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
            Print
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
        
        {/* 3D Sushi Visualization */}
        <SushiModel />
        
        {/* Recipe Content with Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="ingredients" className="text-lg">材料<br/><span className="text-sm">Ingredients</span></TabsTrigger>
            <TabsTrigger value="instructions" className="text-lg">手順<br/><span className="text-sm">Instructions</span></TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-6">
            <JapaneseFrame>
              <h2 className="text-2xl font-bold text-navy mb-6 font-playfair text-center">
                <span className="border-b-2 border-terracotta pb-1">Recipe Ingredients</span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <Ingredient 
                    key={index} 
                    name={ingredient.name} 
                    amount={ingredient.amount}
                    image={ingredient.image} 
                  />
                ))}
              </div>
            </JapaneseFrame>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold text-navy mb-6 font-playfair text-center">
                <span className="border-b-2 border-terracotta pb-1">Kitchen Tools</span>
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
                    className="bg-white p-3 rounded-lg shadow-sm flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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
            <RecipeTimer 
              seconds={timer} 
              isRunning={isTimerRunning} 
              onToggle={handleTimerToggle} 
              onReset={handleTimerReset}
            />
            
            {/* Instruction Steps */}
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-navy mb-8 font-playfair text-center">
                <span className="border-b-2 border-terracotta pb-1">Step-by-Step Instructions</span>
              </h2>
              
              <div className="space-y-6">
                {recipe.steps.map((step) => (
                  <RecipeStep
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    isActive={activeStep === step.number}
                    onClick={() => setActiveStep(step.number)}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Chef's Tips */}
            <motion.div 
              className="mt-12 p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <JapaneseFrame>
                <h3 className="text-xl font-bold text-navy mb-4 font-playfair text-center">Chef's Tips</h3>
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
              </JapaneseFrame>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action - Back to top */}
        <div className="mt-16 text-center">
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="bg-terracotta hover:bg-terracotta/90 text-white"
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            Back to Top
          </Button>
        </div>
      </div>
      
      {/* Footer with Japanese theme */}
      <footer className="bg-navy text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-bold mb-2">料理ブログ</h3>
              <p className="text-white/70">Japanese Culinary Journey</p>
            </div>
            
            <div className="flex space-x-6">
              {['Home', 'Recipes', 'About', 'Contact'].map((item, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
            <p>© 2025 Japanese Recipe Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipePage;
