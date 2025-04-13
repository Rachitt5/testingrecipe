
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Ingredient {
  name: string;
  src: string;
  x: number;
  y: number;
  z: number;
  delay: number;
  rotation: number;
}

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Floating ingredients for the hero section
  const ingredients: Ingredient[] = [
    { 
      name: 'Tomato', 
      src: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&w=500&h=500&q=80', 
      x: -20, 
      y: 10, 
      z: 10, 
      delay: 0, 
      rotation: 5 
    },
    { 
      name: 'Herbs', 
      src: 'https://images.unsplash.com/photo-1550411294-56c7b7eaea3f?auto=format&w=500&h=500&q=80', 
      x: 20, 
      y: -15, 
      z: 5, 
      delay: 0.2, 
      rotation: -3 
    },
    { 
      name: 'Lemon', 
      src: 'https://images.unsplash.com/photo-1582287014914-1db836dfbe1f?auto=format&w=500&h=500&q=80', 
      x: -25, 
      y: -10, 
      z: 15, 
      delay: 0.4, 
      rotation: 10 
    },
  ];

  useEffect(() => {
    if (!parallaxRef.current) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const container = parallaxRef.current;
      if (!container) return;
      
      const { clientX, clientY } = event;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = container.querySelectorAll('.ingredient-item');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speedX = parseFloat(element.dataset.speedx || '0');
        const speedY = parseFloat(element.dataset.speedy || '0');
        const speedZ = parseFloat(element.dataset.speedz || '0');
        const rotation = parseFloat(element.dataset.rotation || '0');
        
        const moveX = x * speedX;
        const moveY = y * speedY;
        const moveZ = 20 + speedZ;
        const rotateY = x * rotation;
        
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, ${moveZ}px) rotateY(${rotateY}deg)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="min-h-screen relative flex items-center bg-cream">
      <div 
        ref={parallaxRef}
        className="container mx-auto px-4 pt-24 pb-16 parallax-container relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left z-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-navy leading-tight">
              Seasonal <span className="text-terracotta">Ingredients</span>, Extraordinary <span className="text-sage">Recipes</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-md mx-auto lg:mx-0">
              Discover the art of cooking with nature's finest seasonal offerings, brought to life through immersive culinary experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-6 text-lg">
                Explore Recipes
              </Button>
              <Button variant="outline" className="border-navy text-navy hover:bg-navy/5 px-8 py-6 text-lg">
                Seasonal Ingredients
              </Button>
            </div>
          </div>
          
          <div className="relative h-[40vh] lg:h-[60vh] overflow-visible">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="ingredient-item absolute rounded-full overflow-hidden shadow-xl"
                style={{
                  width: '180px',
                  height: '180px',
                  left: `calc(50% + ${ingredient.x}px)`,
                  top: `calc(50% + ${ingredient.y}px)`,
                  transform: `translateZ(${ingredient.z}px) rotateZ(${ingredient.rotation}deg)`,
                  transitionDelay: `${ingredient.delay}s`,
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: `${ingredient.delay}s`
                }}
                data-speedx={ingredient.x * 0.05}
                data-speedy={ingredient.y * 0.05}
                data-speedz={ingredient.z}
                data-rotation={ingredient.rotation}
              >
                <img
                  src={ingredient.src}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
        <ChevronDown className="h-6 w-6 text-terracotta" />
      </div>
    </section>
  );
};

export default Hero;
