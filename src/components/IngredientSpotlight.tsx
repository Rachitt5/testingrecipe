
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  description: string;
  image: string;
  season: string;
  nutrition: string;
}

const IngredientSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const featuredIngredients: Ingredient[] = [
    {
      id: '1',
      name: 'Heirloom Tomatoes',
      description: 'Vibrant, flavorful tomato varieties passed down through generations, each with unique colors and tastes.',
      image: 'https://images.unsplash.com/photo-1597068598822-4819737cacd9?auto=format&w=400&h=400&q=80',
      season: 'Summer',
      nutrition: 'Rich in vitamins A & C, potassium, and antioxidants'
    },
    {
      id: '2',
      name: 'Butternut Squash',
      description: 'Sweet winter squash with a nutty flavor, perfect for roasting, soups, and hearty fall dishes.',
      image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&w=400&h=400&q=80',
      season: 'Fall',
      nutrition: 'High in fiber, vitamin A, potassium, and magnesium'
    },
    {
      id: '3',
      name: 'Wild Ramps',
      description: 'Delicate wild onions with garlicky flavor that are foraged in early spring, beloved by chefs.',
      image: 'https://images.unsplash.com/photo-1558818446-c2a1fd768afb?auto=format&w=400&h=400&q=80',
      season: 'Spring',
      nutrition: 'Contains vitamins A & C, selenium, and chromium'
    }
  ];
  
  // Handle the 3D rotation effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setRotation({ x: y * -10, y: x * 10 });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-navy mb-4">Ingredient Spotlight</h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Discover the finest seasonal ingredients and learn how to incorporate them into your cooking.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-navy text-navy hover:bg-navy/5"
            asChild
          >
            <a href="/ingredients">
              View All Ingredients
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredIngredients.map((ingredient) => (
            <div 
              key={ingredient.id} 
              ref={containerRef}
              className="ingredient-3d perspective-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Card className="overflow-hidden h-full border-none shadow-lg">
                <div 
                  className="parallax-item transition-transform duration-200 ease-out"
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative">
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-navy">
                      {ingredient.season}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy mb-2">{ingredient.name}</h3>
                    <p className="text-gray-600 mb-4">{ingredient.description}</p>
                    <div className="bg-sage/10 p-3 rounded-lg text-sm text-sage font-medium">
                      {ingredient.nutrition}
                    </div>
                    
                    <Button 
                      className="mt-4 bg-terracotta hover:bg-terracotta/90 text-white w-full"
                      asChild
                    >
                      <a href={`/ingredients/${ingredient.id}`}>
                        Explore This Ingredient
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientSpotlight;
