
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-cream pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-playfair font-bold text-navy">
              Seasonal <span className="text-terracotta">Plates</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-xs">
              Discover recipes that celebrate each season's best ingredients through immersive culinary experiences.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-terracotta hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-terracotta hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-terracotta hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-terracotta hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipes" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/seasonal" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Seasonal Ingredients
                </Link>
              </li>
              <li>
                <Link to="/techniques" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Cooking Techniques
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kitchen-tips" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Kitchen Tips
                </Link>
              </li>
              <li>
                <Link to="/substitutions" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Ingredient Substitutions
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  Essential Equipment
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-terracotta transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4">Stay Inspired</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get seasonal recipes and cooking inspiration.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-white"
              />
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Seasonal Plates. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-terracotta">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-terracotta">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-xs text-gray-500 hover:text-terracotta">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            Made with <Heart className="inline-block h-3 w-3 text-terracotta" /> for seasonal cooking
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
