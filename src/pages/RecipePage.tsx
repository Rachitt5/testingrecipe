
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Clock, ChefHat, Users, Utensils, 
  ChevronDown, ChevronUp, ArrowRight, 
  Play, Pause, Printer, Share2, Bookmark,
  Leaf, Cherry, Flower
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Header Component with Japanese-inspired design
const Header = () => {
  return (
    <header className="py-6 px-8 flex items-center justify-between bg-white/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-amber-100">
      <div className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          和食レシピ • Washoku Recipe
        </h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">ホーム</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">レシピ</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">ブログ</a>
        <a href="#" className="text-indigo-700 hover:text-pink-500 transition-colors duration-300 font-medium">お問い合わせ</a>
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

// Cherry blossom animation component
const CherryBlossoms = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-pink-200 rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            scale: 0.5 + Math.random() * 0.5
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0.7, 0.5, 0]
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

// Recipe ingredient component with wabi-sabi aesthetic
const Ingredient = ({ name, amount, image, index }) => {
  return (
    <motion.div 
      className="bg-amber-50 rounded-xl overflow-hidden shadow-lg mb-4 relative group ingredient-card border border-amber-100"
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
      <div className="h-44 overflow-hidden">
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

// Step component with Japanese-inspired design
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
              className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-white rounded-lg border border-amber-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm italic text-indigo-700">料理のポイント: Take your time with this step to ensure the best results!</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Custom timer component with Japanese-inspired aesthetics
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
            <p className="text-xs text-indigo-600 uppercase tracking-wider font-semibold">調理タイマー</p>
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
            {isRunning ? 'ポーズ' : 'スタート'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-indigo-600 text-indigo-700 hover:bg-indigo-50"
            onClick={onReset}
          >
            リセット
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
  
  // Recipe data with detailed instructions and images - updated with new image paths
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
        title: "タイマー完了!",
        description: "調理タイマーが終了しました。",
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
      <div className="min-h-screen japanese-paper flex items-center justify-center">
        <div className="text-center">
          <div className="animate-rotate-slow w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-indigo-700 font-playfair">準備中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen japanese-paper relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15" 
        style={{ backgroundImage: `url(${recipe.heroImage})` }} 
      />
      <CherryBlossoms />
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
                レシピを見る
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
            className="bg-amber-50 p-4 rounded-lg shadow-md text-center border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">準備時間</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.prepTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-amber-50 p-4 rounded-lg shadow-md text-center border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <ChefHat className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">調理時間</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.cookTime}</p>
          </motion.div>
          
          <motion.div 
            className="bg-amber-50 p-4 rounded-lg shadow-md text-center border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Users className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">何人前</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.servings}</p>
          </motion.div>
          
          <motion.div 
            className="bg-amber-50 p-4 rounded-lg shadow-md text-center border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <Utensils className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">難易度</p>
            <p className="font-medium text-lg text-indigo-700">{recipe.difficulty}</p>
          </motion.div>
        </div>
        
        {/* Recipe Content with Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger 
              value="ingredients" 
              className="text-lg font-playfair bg-amber-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              材料<br/><span className="text-sm">Ingredients</span>
            </TabsTrigger>
            <TabsTrigger 
              value="instructions" 
              className="text-lg font-playfair bg-amber-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              手順<br/><span className="text-sm">Instructions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="space-y-6">
            <div className="relative p-1">
              <div className="p-8 bg-amber-50 rounded-xl shadow-lg border border-amber-100">
                <h2 className="text-3xl font-bold text-center mb-8 font-playfair">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">レシピの材料</span>
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
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">キッチンツール</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "炊飯器または鍋",
                  "野菜ピーラーまたはマンドリン",
                  "包丁",
                  "まな板",
                  "巻きす",
                  "爪楊枝"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-amber-50 p-4 rounded-lg shadow-md flex items-center border border-amber-100"
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
              className="bg-amber-50 p-6 md:p-8 rounded-xl shadow-lg border border-amber-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8 font-playfair">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">調理手順</span>
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
              className="mt-12 p-6 bg-amber-50 rounded-xl shadow-lg border border-amber-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-center mb-6 font-playfair">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">完成品</span>
              </h3>
              
              <div className="overflow-hidden rounded-lg shadow-md">
                <img src={recipe.finalImage} alt="Final Sushi" className="w-full" />
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-amber-50 p-5 rounded-lg border border-amber-100">
                <p className="italic text-indigo-700 text-center">
                  "キュウリの包みはさわやかな食感を加え、クリームチーズ、スモークサーモン、アボカドは完璧な風味のハーモニーを作り出します。伝統的な寿司の健康的な代替品をお楽しみください！"
                </p>
              </div>
            </motion.div>
            
            {/* Final image */}
            <motion.div 
              className="mt-12 p-6 bg-amber-50 rounded-xl shadow-lg overflow-hidden border border-amber-100"
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
            トップに戻る
          </Button>
        </div>
      </div>
      
      {/* Footer with Japanese-inspired theme */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-playfair font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">料理ブログ</h3>
              <p className="text-white/70">和食の旅</p>
            </div>
            
            <div className="flex space-x-6">
              {['ホーム', 'レシピ', 'ブログ', 'お問い合わせ'].map((item, i) => (
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
            <p>© 2025 和食レシピブログ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipePage;
