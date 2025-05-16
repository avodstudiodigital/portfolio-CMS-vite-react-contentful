
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="font-heading font-bold text-xl md:text-2xl">
          Portfolio
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            Home
          </Link>
          <Link to="/projects" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith('/projects') ? 'text-primary' : 'text-muted-foreground'}`}>
            Projects
          </Link>
          <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
            About
          </Link>
          <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            <Link to="/projects" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith('/projects') ? 'text-primary' : 'text-muted-foreground'}`}>
              Projects
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
              About
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
