
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Clock, Utensils, Users, ChefHat, Printer, BookmarkPlus, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Animated ingredient component
const AnimatedIngredient = ({ name, image }: { name: string, image: string }) => {
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
      </div>
    </motion.div>
  );
};

// Step component with animation
const RecipeStep = ({ number, text }: { number: number, text: string }) => {
  return (
    <motion.div 
      className="flex mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
    >
      <div className="bg-terracotta text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
        {number}
      </div>
      <div className="pb-6 border-b border-gray-200">
        <p className="text-lg">{text}</p>
      </div>
    </motion.div>
  );
};

const CucumberSushiPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading images
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  }, []);

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
    <div className="min-h-screen bg-cream relative">
      <CherryBlossoms />
      <Navbar />
      
      {/* Recipe Header */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="inline-block px-3 py-1 bg-sage/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
              {recipe.season} Recipe
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              {recipe.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-montserrat">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Japanese-style decorative element */}
        <div className="flex justify-center mb-8">
          <div className="h-0.5 w-20 bg-terracotta"></div>
          <div className="mx-4 text-terracotta">❀</div>
          <div className="h-0.5 w-20 bg-terracotta"></div>
        </div>

        <div className="flex flex-col md:flex-row mb-12">
          {/* Recipe Info */}
          <div className="bg-cream border border-gray-200 p-6 rounded-xl shadow-sm flex flex-wrap gap-8 justify-between w-full md:w-auto md:mr-8 mb-8 md:mb-0">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-terracotta mr-2" />
              <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium">{recipe.prepTime}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ChefHat className="h-5 w-5 text-terracotta mr-2" />
              <div>
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-medium">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-terracotta mr-2" />
              <div>
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-terracotta mr-2" />
              <div>
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-medium">{recipe.difficulty}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" size="sm">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-cream/60 backdrop-blur-sm p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-navy mb-6 font-playfair border-b-2 border-terracotta pb-2 inline-block">Ingredients</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {recipe.ingredients.map((ingredient, index) => (
                  <AnimatedIngredient 
                    key={index} 
                    name={ingredient.name} 
                    image={ingredient.image} 
                  />
                ))}
              </div>
              
              <h3 className="text-lg font-bold text-navy mb-3 mt-8 font-playfair">Equipment Needed:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                  <span>Rice cooker or pot</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                  <span>Vegetable peeler or mandolin</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                  <span>Sharp knife</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                  <span>Cutting board</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                  <span>Toothpicks</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy mb-6 font-playfair border-b-2 border-terracotta pb-2 inline-block">Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions.map((instruction) => (
                <RecipeStep
                  key={instruction.step}
                  number={instruction.step}
                  text={instruction.text}
                />
              ))}
            </div>
            
            {/* Chef's Notes */}
            <div className="mt-12 p-6 bg-cream border border-gray-200 rounded-xl shadow-sm">
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
            </div>
            
            {/* Serving Suggestions */}
            <div className="mt-8 p-6 bg-cream border border-gray-200 rounded-xl shadow-sm">
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
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CucumberSushiPage;
