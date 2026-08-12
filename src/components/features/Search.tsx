import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search = ({ isOpen, onClose }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleClose = () => {
    onClose();
    setSearchQuery('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[101] pt-24 md:pt-32"
            >
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="bg-white dark:bg-[#0a0a0a] rounded-lg shadow-2xl border border-[#E5E3DF] dark:border-[#1a1a1a] overflow-hidden">
                  <form onSubmit={handleSearch} className="relative">
                    <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5D6D74] dark:text-[#D1D5DB]" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, collections, or categories..."
                      className="w-full pl-14 pr-14 py-5 text-[#2C3539] dark:text-[#F9FAFB] bg-transparent border-none outline-none text-lg placeholder-[#5D6D74] dark:placeholder-[#D1D5DB]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={handleClose}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 p-1 text-[#5D6D74] dark:text-[#D1D5DB] hover:text-[#2C3539] dark:hover:text-[#F9FAFB] transition-colors duration-200"
                      aria-label="Close search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </form>

                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#E5E3DF] dark:border-[#1a1a1a] px-6 py-4 max-h-[400px] overflow-y-auto"
                    >
                      <p
                        className="text-sm text-[#5D6D74] dark:text-[#D1D5DB]"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Searching for "{searchQuery}"...
                      </p>
                    </motion.div>
                  )}

                  {!searchQuery && (
                    <div className="border-t border-[#E5E3DF] dark:border-[#1a1a1a] px-6 py-4">
                      <h3
                        className="text-xs font-semibold text-[#5D6D74] dark:text-[#D1D5DB] mb-3 uppercase tracking-wider"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Vanities', 'Mirrors', 'Faucets', 'Lighting', 'Hardware', 'Custom Cabinetry'].map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 text-sm text-[#2C3539] dark:text-[#F9FAFB] bg-[#F7F7F8] dark:bg-[#1a1a1a] hover:bg-[#E5E3DF] dark:hover:bg-[#2a2a2a] rounded-full transition-colors duration-200"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p
                    className="text-sm text-white/70"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd> to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;




