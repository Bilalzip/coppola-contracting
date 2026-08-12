import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import IconPill from './components/layout/IconPill';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import CoppolaPreloader from './components/ui/CoppolaPreloader';
import AuroraBackground from './components/ui/AuroraBackground';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if preloader has been shown
    const hasShownPreloader = sessionStorage.getItem('preloaderShown');
    
    if (hasShownPreloader) {
      setShowPreloader(false);
      setShowContent(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloaderShown', 'true');
    setShowPreloader(false);
    // Delay showing content slightly to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <AuroraBackground />
      {showPreloader && <CoppolaPreloader onComplete={handlePreloaderComplete} />}
      
      {/* Only show content when preloader is done */}
      {!showPreloader && (
        <>
          <ScrollToTop />
          <Navbar />
          <IconPill />
        </>
      )}
      
      <main className={`motion-safe:animate-fadeIn transition-opacity duration-500 ${showContent ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <Outlet />
      </main>
      
      {!showPreloader && <Footer />}
    </div>
  );
}

export default App;