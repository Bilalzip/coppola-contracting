import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Sun, Moon, Home, ArrowUp } from 'lucide-react';
import Search from '../features/Search';

const IconPill = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSearch = () => {
    setIsSearchOpen(true);
  };

  const handleHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[9999]">
      <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 dark:border-gray-700/20 px-4 py-2.5 flex flex-row items-center gap-3 transition-all duration-300">
        <button
          onClick={handleHome}
          className="text-gray-800 dark:text-gray-200 hover:text-[#0a1128] dark:hover:text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0a1128]/50 focus:ring-offset-2 rounded-full p-1.5"
          aria-label="Go to home"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={handleSearch}
          className="text-gray-800 dark:text-gray-200 hover:text-[#0a1128] dark:hover:text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0a1128]/50 focus:ring-offset-2 rounded-full p-1.5"
          aria-label="Search"
          title="Search"
        >
          <SearchIcon className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTheme}
          className="text-gray-800 dark:text-gray-200 hover:text-[#0a1128] dark:hover:text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0a1128]/50 focus:ring-offset-2 rounded-full p-1.5"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>

        {/* Back to Top Button - appears on scroll */}
        {showBackToTop && (
          <div className="animate-[fadeInScale_0.3s_ease-out]">
            <button
              onClick={handleBackToTop}
              className="text-gray-800 dark:text-gray-200 hover:text-[#0a1128] dark:hover:text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0a1128]/50 focus:ring-offset-2 rounded-full p-1.5"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default IconPill;
