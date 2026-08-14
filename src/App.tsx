import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import IconPill from './components/layout/IconPill';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import AuroraBackground from './components/ui/AuroraBackground';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <AuroraBackground />
      <ScrollToTop />
      <Navbar />
      <IconPill />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;