
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Clock, Utensils, Users, ChefHat, Printer, BookmarkPlus, Share2 } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: { step: number; text: string }[];
  season: string;
}

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  
  // This would typically come from an API call
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      const mockRecipe: Recipe = {
        id: id || '1',
        title: 'Heirloom Tomato & Burrata Salad',
        description: 'A simple yet elegant summer salad that showcases the vibrant flavors of heirloom tomatoes paired with creamy burrata cheese and fresh basil. Perfect as an appetizer or light lunch.',
        image: 'https://images.unsplash.com/photo-1592417817038-d13fd7342605?auto=format&w=1200&h=600&q=80',
        prepTime: '15 mins',
        cookTime: 'No cooking required',
        servings: 4,
        difficulty: 'Easy',
        ingredients: [
          '4 medium heirloom tomatoes, different colors',
          '2 balls of fresh burrata cheese',
          '1/4 cup extra virgin olive oil',
          '2 tablespoons aged balsamic vinegar',
          'Fresh basil leaves',
          'Flaky sea salt',
          'Freshly ground black pepper',
          'Optional: 1 clove garlic, minced',
          'Optional: crusty bread for serving'
        ],
        instructions: [
          {
            step: 1,
            text: 'Slice the heirloom tomatoes into 1/4 inch thick slices, or cut into wedges if preferred.'
          },
          {
            step: 2,
            text: 'Arrange tomato slices on a serving platter, overlapping them slightly.'
          },
          {
            step: 3,
            text: 'Place the burrata balls in the center of the platter, and gently tear them open to reveal the creamy interior.'
          },
          {
            step: 4,
            text: 'Drizzle the olive oil and balsamic vinegar over the tomatoes and cheese.'
          },
          {
            step: 5,
            text: 'Scatter fresh basil leaves over the salad.'
          },
          {
            step: 6,
            text: 'Season generously with flaky sea salt and freshly ground black pepper.'
          },
          {
            step: 7,
            text: 'If using, sprinkle minced garlic over the dish.'
          },
          {
            step: 8,
            text: 'Allow the salad to sit for 5-10 minutes before serving to let the flavors meld.'
          },
          {
            step: 9,
            text: 'Serve with crusty bread to soak up the delicious juices.'
          }
        ],
        season: 'Summer'
      };
      
      setRecipe(mockRecipe);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-rotate-slow w-16 h-16 border-4 border-terracotta border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading recipe...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-4">Recipe not found</h1>
          <p>Sorry, we couldn't find the recipe you're looking for.</p>
          <Button className="mt-4" asChild>
            <a href="/">Return to home</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {recipe.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row mb-12">
          {/* Recipe Info */}
          <div className="bg-cream p-6 rounded-xl shadow-sm flex flex-wrap gap-8 justify-between w-full md:w-auto md:mr-8 mb-8 md:mb-0">
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
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-navy mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index}
                    className="flex items-start ingredient-3d"
                  >
                    <span className="inline-block w-3 h-3 bg-terracotta rounded-full mt-1.5 mr-3"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-navy mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions.map((instruction) => (
                <div 
                  key={instruction.step}
                  className="flex"
                >
                  <div className="bg-terracotta text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    {instruction.step}
                  </div>
                  <div className="pb-6 border-b border-gray-200">
                    <p className="text-lg">{instruction.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RecipePage;
