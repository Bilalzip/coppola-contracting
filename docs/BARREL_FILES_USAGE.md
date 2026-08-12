# Barrel Files Usage Guide

Barrel files (index.ts) have been created throughout the project to simplify imports. Instead of long messy import paths, you can now use clean, organized imports.

## ✅ What's Been Created

Barrel files have been added to the following directories:

- ✅ `src/components/index.ts`
- ✅ `src/pages/index.ts`
- ✅ `src/pages/explore/index.ts`
- ✅ `src/pages/InStock/index.ts`
- ✅ `src/pages/Millwork/index.ts`
- ✅ `src/pages/products/index.ts`
- ✅ `src/pages/products/Faucets/index.ts`
- ✅ `src/pages/products/Flooring/index.ts`
- ✅ `src/pages/products/Sinks-Products/index.ts`
- ✅ `src/pages/products/Vanities/index.ts`
- ✅ `src/data/index.ts`
- ✅ `src/types/index.ts`

## 📚 Usage Examples

### Before (Messy Imports):
```typescript
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import Layout from '../../components/Layout';
```

### After (Clean Barrel Imports):
```typescript
import { Footer, Navbar, Hero, ProductCard, Layout } from '@/components';
```

---

### Components Examples:

```typescript
// Instead of:
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import BackToTop from '../components/BackToTop';

// Use:
import { Footer, Navbar, BackToTop } from '@/components';
```

---

### Pages Examples:

```typescript
// Instead of:
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';

// Use:
import { Home, ContactUs, Products } from '@/pages';
```

---

### Explore Pages:

```typescript
// Instead of:
import AboutUs from './pages/explore/AboutUs';
import Blog from './pages/explore/Blog';
import OurWorks from './pages/explore/OurWorks';

// Use:
import { AboutUs, Blog, OurWorks } from '@/pages/explore';
```

---

### InStock Pages:

```typescript
// Instead of:
import InStock from './pages/InStock/InStock';
import InStockCabinets from './pages/InStock/InStockCabinets';

// Use:
import { InStock, InStockCabinets } from '@/pages/InStock';
```

---

### Products Examples:

```typescript
// Instead of:
import Acari from './pages/products/Acari';
import Mirrors from './pages/products/Mirrors';
import Lighting from './pages/products/Lighting';

// Use:
import { Acari, Mirrors, Lighting } from '@/pages/products';
```

---

### Faucets:

```typescript
// Instead of:
import Faucets from './pages/products/Faucets/Faucets';
import FaucetsKitchen from './pages/products/Faucets/FaucetsKitchen';

// Use:
import { Faucets, FaucetsKitchen, FaucetsBathroom } from '@/pages/products/Faucets';
```

---

### Vanities:

```typescript
// Instead of:
import Addison30GlossyWhiteVanity from './pages/products/Vanities/Addison30GlossyWhiteVanity';
import Athens36GlossyWhiteVanity from './pages/products/Vanities/Athens36GlossyWhiteVanity';

// Use:
import { 
  Addison30GlossyWhiteVanity, 
  Athens36GlossyWhiteVanity 
} from '@/pages/products/Vanities';
```

---

### Sinks:

```typescript
// Instead of:
import Sinks from './pages/products/Sinks-Products/Sinks';
import AgateS711XN from './pages/products/Sinks-Products/AgateS711XN';

// Use:
import { Sinks, AgateS711XN, AlteaS425T } from '@/pages/products/Sinks-Products';
```

---

### Flooring:

```typescript
// Instead of:
import Blizzard from './pages/products/Flooring/Blizzard';
import Bolero from './pages/products/Flooring/Bolero';

// Use:
import { Blizzard, Bolero, Cava } from '@/pages/products/Flooring';
```

---

### Data:

```typescript
// Instead of:
import { flooringProducts } from '../data/flooringProducts';
import { quartzProducts } from '../data/quartzProducts';

// Use:
import { flooringProducts, quartzProducts } from '@/data';
```

---

### Types:

```typescript
// Instead of:
import { Product } from '../types/product';
import { SinkProduct } from '../types/sink-products';

// Use:
import { Product, SinkProduct } from '@/types';
```

---

## 🎯 Benefits

1. **Cleaner Imports**: Single-line imports instead of multiple import statements
2. **Easier Refactoring**: Change internal file structure without updating every import
3. **Better Organization**: Clear module boundaries
4. **Reduced Path Hell**: No more `../../../` paths
5. **IntelliSense Support**: Better autocomplete in your IDE

## 📝 Notes

- The `@/` alias should be configured in your `tsconfig.json` paths
- All barrel files are TypeScript (`.ts`) for better compatibility
- Nested barrel files are re-exported in parent barrels for convenience
- Named exports allow tree-shaking for better bundle size

## 🔧 Path Alias Configuration

Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components": ["src/components"],
      "@/pages": ["src/pages"],
      "@/data": ["src/data"],
      "@/types": ["src/types"]
    }
  }
}
```

---

**Happy coding with cleaner imports! 🚀**

