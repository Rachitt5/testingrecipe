import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, User, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setShowShadow(true);
      } else {
        setIsScrolled(false);
        setShowShadow(false);
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

  // Create ripple effect on click
  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'zen-ripple';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1500);
  };

  return (
    <nav 
      className={`fixed w-full py-4 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-card backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
      style={{ boxShadow: showShadow ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : 'none' }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group relative overflow-hidden">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-terracotta to-yellow-400 shadow-lg mr-2 group-hover:scale-110 transition-all duration-300">
            <Leaf className="w-6 h-6 text-white" />
          </span>
          <h1 className="text-2xl font-playfair font-bold text-white tracking-tight brush-stroke">
            Seasonal <span className="golden-accent">Plates</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navCategories.map((category) => (
            <Link 
              key={category.name}
              to={category.path} 
              className="text-white hover:golden-accent transition-colors duration-300 font-medium relative group brush-stroke"
              onClick={createRipple}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/10 transition-colors duration-300 text-white relative overflow-hidden"
            onClick={createRipple}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/10 transition-colors duration-300 text-white relative overflow-hidden"
            onClick={createRipple}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/10 transition-colors duration-300 text-white relative overflow-hidden"
            onClick={createRipple}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full hover:bg-white/10 text-white relative overflow-hidden"
          onClick={(e) => {
            setMobileMenuOpen(!mobileMenuOpen);
            createRipple(e);
          }}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card shadow-lg border-b border-white/10 animate-fade-in-down">
          <div className="flex flex-col items-center py-6 gap-4">
            {navCategories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="text-white hover:golden-accent py-2 transition-colors duration-300 font-medium text-lg w-full text-center hover:bg-white/5 rounded-lg relative overflow-hidden"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  createRipple(e);
                }}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-white/10 text-white relative overflow-hidden"
                onClick={createRipple}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-white/10 text-white relative overflow-hidden"
                onClick={createRipple}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-white/10 text-white relative overflow-hidden"
                onClick={createRipple}
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
