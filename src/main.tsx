import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProductsList from './pages/admin/products/ProductsList';
import ProductForm from './pages/admin/products/ProductForm';
import LeadsPage from './pages/admin/LeadsPage';
import GalleryPage from './pages/admin/GalleryPage';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import Home from './pages/Home';
import Products from './pages/Products';
import InStock from './pages/inStock/instock.tsx';
import InStockVanities from './pages/inStock/instockvanities.tsx';
import InStockCabinets from './pages/inStock/instockcabinets.tsx';
import CustomCabinetry from './pages/CustomCabinetry';
import QuartzCountertops from './pages/products/quartz/QuartzCountertops';
import QuartzDetailPage from './pages/products/quartz/QuartzDetailPage';
import VanityDetailPage from './pages/products/vanities/VanityDetailPage';
import MirrorsDetailPage from './pages/products/mirrors/MirrorsDetailPage';
import FlooringDetailPage from './pages/products/flooring/FlooringDetailPage';
import Vanities from './pages/products/vanities/Vanities';
import Sinks from './pages/products/sinks/Sinks';
import ExploreSinks from './pages/products/sinks/ExploreSinks';
import KitchenSinks from './pages/products/sinks/KitchenSinks';
import BathroomSinks from './pages/products/sinks/BathroomSinks';
import UndermountSinks from './pages/products/sinks/UndermountSinks';
import VesselSinks from './pages/products/sinks/VesselSinks';
import SinkDetailPage from './pages/products/sinks/SinkDetailPage';
import Faucets from './pages/products/faucets/Faucets';
import FaucetDetailPage from './pages/products/faucets/FaucetDetailPage';
import KitchenFaucets from './pages/products/faucets/KitchenFaucets';
import BathroomFaucets from './pages/products/faucets/BathroomFaucets';
import ShowerSets from './pages/products/faucets/ShowerSets';
import Mirrors from './pages/products/mirrors/Mirrors';
import ExploreMirrors from './pages/products/mirrors/ExploreMirrors';
import ModernMirrors from './pages/products/mirrors/ModernMirrors';
import TimelessMirrors from './pages/products/mirrors/TimelessMirrors';
import ContemporaryMirrors from './pages/products/mirrors/ContemporaryMirrors';
import Toilets from './pages/products/toilets/Toilets';
import ToiletDetailPage from './pages/products/toilets/ToiletDetailPage';
import Lighting from './pages/products/lighting/Lighting';
import FlooringPage from './pages/products/flooring/Flooring';
// import ClosetSystems from './pages/products/ClosetSystems'; // TODO: Component missing
import AboutUs from './pages/explore/aboutUs.tsx';
import OurWorks from './pages/explore/ourworks.tsx';
import OutdoorKitchens from './pages/OutdoorKitchens';
import CommercialMillwork from './pages/Millwork/Millwork';
import ContactUs from './pages/explore/contactUs.tsx';
import GetQuote from './pages/GetQuote';
import Hardware from './pages/products/hardware/Hardware';
import OurExpertise from './pages/explore/OurExpertise';
import './index.css';

// Initialize fade-in animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Force a reflow to ensure initial styles are applied
  document.body.offsetHeight;
  
  // Add loaded class to trigger animations
  document.body.classList.add('page-loaded');
  
  // Clean up will-change properties after animations complete
  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.fade-in-element');
    animatedElements.forEach(element => {
      (element as HTMLElement).style.willChange = 'auto';
    });
  }, 1000);
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "in-stock",
        element: <InStock />
      },
      {
        path: "in-stock/vanities",
        element: <InStockVanities />
      },
      {
        path: "in-stock/cabinets",
        element: <InStockCabinets />
      },
      {
        path: "custom-cabinetry",
        element: <CustomCabinetry />
      },
      {
        path: "quartz-countertops",
        element: <QuartzCountertops />
      },
      {
        path: "quartz-countertops/:slug",
        element: <QuartzDetailPage />
      },
      {
        path: "outdoor-kitchens",
        element: <OutdoorKitchens />
      },
      {
        path: "commercial-millwork",
        element: <CommercialMillwork />
      },
      {
        path: "hardware",
        element: <Hardware />
      },
      {
        path: "our-expertise",
        element: <OurExpertise />
      },
      {
        path: "products/vanities",
        element: <Vanities />
      },
      {
        path: "products/vanities/:slug",
        element: <VanityDetailPage />
      },
      {
        path: "products/sinks",
        element: <Sinks />
      },
      {
        path: "products/sinks/explore",
        element: <ExploreSinks />
      },
      {
        path: "products/sinks/kitchen",
        element: <KitchenSinks />
      },
      {
        path: "products/sinks/bathroom",
        element: <BathroomSinks />
      },
      {
        path: "products/sinks/undermount",
        element: <UndermountSinks />
      },
      {
        path: "products/sinks/vessel",
        element: <VesselSinks />
      },
      {
        path: "products/sinks/:slug",
        element: <SinkDetailPage />
      },
      {
        path: "products/faucets",
        element: <Faucets />
      },
      {
        path: "products/faucets/kitchen",
        element: <KitchenFaucets />
      },
      {
        path: "products/faucets/bathroom",
        element: <BathroomFaucets />
      },
      {
        path: "products/faucets/shower",
        element: <ShowerSets />
      },
      {
        path: "products/faucets/:slug",
        element: <FaucetDetailPage />
      },
      {
        path: "products/mirrors",
        element: <Mirrors />
      },
      {
        path: "products/mirrors/explore",
        element: <ExploreMirrors />
      },
      {
        path: "products/mirrors/modern",
        element: <ModernMirrors />
      },
      {
        path: "products/mirrors/timeless",
        element: <TimelessMirrors />
      },
      {
        path: "products/mirrors/contemporary",
        element: <ContemporaryMirrors />
      },
      {
        path: "products/mirrors/:slug",
        element: <MirrorsDetailPage />
      },
      // Legacy mirror routes removed - now handled by dynamic route: products/mirrors/:slug
      {
        path: "products/toilets",
        element: <Toilets />
      },
      {
        path: "products/toilets/:slug",
        element: <ToiletDetailPage />
      },
      {
        path: "products/lighting",
        element: <Lighting />
      },
      {
        path: "products/flooring",
        element: <FlooringPage />
      },
      {
        path: "products/flooring/:slug",
        element: <FlooringDetailPage />
      },
      // Legacy flooring routes removed - now handled by dynamic route: products/flooring/:slug
      // {
      //   path: "products/closet-systems",
      //   element: <ClosetSystems /> // TODO: Component missing
      // },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "our-works",
        element: <OurWorks />
      },
      {
        path: "contact",
        element: <ContactUs />
      },
      {
        path: "quote",
        element: <GetQuote />
      }
    ]
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <ProductsList /> },
      { path: "products/new", element: <ProductForm /> },
      { path: "products/:id", element: <ProductForm /> },
      { path: "leads", element: <LeadsPage /> },
      { path: "gallery", element: <GalleryPage /> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
