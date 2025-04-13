
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
  season: string;
}

const FeaturedRecipes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Heirloom Tomato & Burrata Salad',
      description: 'Vibrant heirloom tomatoes paired with creamy burrata cheese and fresh basil.',
      image: 'https://images.unsplash.com/photo-1592417817038-d13fd7342605?auto=format&w=600&h=400&q=80',
      prepTime: '15 mins',
      difficulty: 'Easy',
      season: 'Summer'
    },
    {
      id: '2',
      title: 'Roasted Root Vegetable Medley',
      description: 'A warming blend of seasonal root vegetables with herbs and maple glaze.',
      image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&w=600&h=400&q=80',
      prepTime: '45 mins',
      difficulty: 'Medium',
      season: 'Fall'
    },
    {
      id: '3',
      title: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice slowly cooked with foraged wild mushrooms and truffle oil.',
      image: 'https://images.unsplash.com/photo-1651451491583-3aa3e751e7b4?auto=format&w=600&h=400&q=80',
      prepTime: '40 mins',
      difficulty: 'Medium',
      season: 'Fall'
    },
    {
      id: '4',
      title: 'Citrus Glazed Salmon',
      description: 'Wild-caught salmon glazed with seasonal citrus, served with spring vegetables.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&w=600&h=400&q=80',
      prepTime: '25 mins',
      difficulty: 'Medium',
      season: 'Spring'
    },
    {
      id: '5',
      title: 'Winter Spiced Pear Galette',
      description: 'Rustic free-form tart featuring seasonal pears with warm winter spices.',
      image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a161?auto=format&w=600&h=400&q=80',
      prepTime: '60 mins',
      difficulty: 'Advanced',
      season: 'Winter'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (top < windowHeight && top > -height) {
        const scrollPosition = (windowHeight - top) / (windowHeight + height);
        const cards = container.querySelectorAll('.recipe-card');
        
        cards.forEach((card, index) => {
          const offset = (index - currentIndex) * 20;
          const element = card as HTMLElement;
          element.style.transform = `translateY(${scrollPosition * offset}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">Featured Seasonal Recipes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of recipes that highlight the best flavors each season has to offer.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {recipes.map((recipe, index) => (
                <div 
                  key={recipe.id} 
                  className="min-w-full px-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div 
                      className="recipe-card rounded-xl overflow-hidden shadow-lg"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-[300px] md:h-[400px] object-cover"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="inline-block px-3 py-1 bg-sage/20 text-sage rounded-full text-sm font-medium mb-2">
                        {recipe.season} Recipe
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-navy">{recipe.title}</h3>
                      
                      <p className="text-gray-600 text-lg">{recipe.description}</p>
                      
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-terracotta" />
                          {recipe.prepTime}
                        </div>
                        
                        <div className="flex items-center">
                          <Utensils className="h-4 w-4 mr-1 text-terracotta" />
                          {recipe.difficulty}
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-terracotta hover:bg-terracotta/90 text-white"
                        asChild
                      >
                        <Link to={`/recipes/${recipe.id}`}>
                          View Recipe
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {recipes.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-terracotta' : 'w-2 bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
