
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { name: 'Seasonal', path: '/seasonal' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Ingredients', path: '/ingredients' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed w-full py-4 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-playfair font-bold text-navy">
            Seasonal <span className="text-terracotta">Plates</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navCategories.map((category) => (
            <Link 
              key={category.name}
              to={category.path} 
              className="text-navy hover:text-terracotta transition-colors duration-300 font-medium"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm px-4 pb-4 animate-fade-in">
          <div className="flex flex-col space-y-3 pt-2">
            {navCategories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="text-navy hover:text-terracotta py-2 transition-colors duration-300 border-b border-gray-100 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" className="rounded-full">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <User className="h-5 w-5 mr-2" />
                Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
