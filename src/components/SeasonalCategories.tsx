
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Leaf, Snowflake, Sun } from 'lucide-react';

interface Category {
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  season: string;
}

const SeasonalCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const categories: Category[] = [
    {
      name: 'Spring Delights',
      description: 'Fresh greens and early harvests',
      image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&w=500&h=300&q=80',
      icon: <Leaf className="h-8 w-8" />,
      bgColor: 'bg-sage/10',
      iconColor: 'text-sage',
      season: 'spring'
    },
    {
      name: 'Summer Flavors',
      description: 'Vibrant berries and ripe produce',
      image: 'https://images.unsplash.com/photo-1563699600-9372eda71835?auto=format&w=500&h=300&q=80',
      icon: <Sun className="h-8 w-8" />,
      bgColor: 'bg-terracotta/10',
      iconColor: 'text-terracotta',
      season: 'summer'
    },
    {
      name: 'Autumn Harvest',
      description: 'Root vegetables and warming spices',
      image: 'https://images.unsplash.com/photo-1590423488192-648d403681ca?auto=format&w=500&h=300&q=80',
      icon: <ChefHat className="h-8 w-8" />,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      season: 'autumn'
    },
    {
      name: 'Winter Comfort',
      description: 'Hearty dishes and preserved goods',
      image: 'https://images.unsplash.com/photo-1578677521545-4f4844fe5661?auto=format&w=500&h=300&q=80',
      icon: <Snowflake className="h-8 w-8" />,
      bgColor: 'bg-navy/10',
      iconColor: 'text-navy',
      season: 'winter'
    }
  ];

  // Check if the section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-cream"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">Cook With The Seasons</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore recipes organized by season, featuring the freshest ingredients at their peak flavor and nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.name} 
              to={`/seasonal/${category.season}`}
              className={`${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="group recipe-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex items-center justify-between">
                  <div className={`${category.bgColor} p-3 rounded-full ${category.iconColor}`}>
                    {category.icon}
                  </div>
                  <span className="text-navy font-medium">Explore {category.season} recipes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalCategories;
