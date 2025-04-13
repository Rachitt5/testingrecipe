
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/20"></div>
        <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-white/15"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-white/10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cook with the <span className="text-terracotta">Seasons</span>, Taste the <span className="text-sage">Difference</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Join our community of seasonal cooks and discover a new way to connect with your food and the natural world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="bg-terracotta hover:bg-terracotta/90 text-white text-lg h-12 px-8">
              Browse Seasonal Recipes
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg h-12 px-8">
              Explore Ingredients
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
