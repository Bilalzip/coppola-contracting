# Project Context

> Generated: 2026-08-12  
> Branch: `assets-ui-refactor`  
> Live domain: `https://coppolahome.ca` (Hostinger shared hosting)

---

## 1. Overview

**Coppola Home** is a kitchen and vanity cabinet showroom/retailer based in Thunder Bay, Ontario. The site is a React 18 + TypeScript single-page application serving as an online product catalogue and lead-generation tool. There is **no backend**: all product data is hardcoded in TypeScript files, all forms submit nowhere (or fake a delay), and there is no database, CMS, or auth system. It is built with Vite and deployed by uploading a static `dist/` folder to Hostinger with an `.htaccess` file for SPA routing.

| Item | Value |
|---|---|
| Framework | React 18.3.1 |
| Language | TypeScript 5.9 |
| Build tool | Vite 7.1 |
| Styling | Tailwind CSS 3.4 (primary) + styled-components 6.1 (partially used) |
| Routing | React Router v7.8 |
| Animation | Framer Motion 12 + GSAP 3.14 |
| Deployment | Hostinger static hosting, `.htaccess` SPA routing |
| Dev command | `npm run dev` |
| Build command | `npm run build` |

---

## 2. Folder Structure

```
project/
├── public/                        # Static assets served at root
│   ├── Images/products/           # Product images (vanities, quartz, faucets, etc.)
│   ├── assets/gallery/            # Gallery / hero images
│   ├── hero-images/               # Hero section images (incl. Lighting coming-soon)
│   ├── Toilets-images/            # Toilet product images
│   ├── logo.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx                   # Entry point; router config lives here
│   ├── App.tsx                    # Shell layout (Navbar, Footer, preloader, Outlet)
│   ├── index.css                  # Global styles, CSS variables, fluid type scale
│   ├── vite-env.d.ts
│   ├── config/
│   │   └── recaptcha.ts           # reCAPTCHA keys (hardcoded — SECURITY ISSUE)
│   ├── data/                      # ALL product data — hardcoded TS arrays
│   │   ├── vanityProducts.ts      # 56 vanity products
│   │   ├── quartzProducts.ts      # ~100 quartz products
│   │   ├── faucetProducts.ts      # ~50 faucet products
│   │   ├── mirrorsProducts.ts     # 50+ mirror products (via helper fns)
│   │   ├── sinkProducts.ts        # ~20 sink products
│   │   ├── toiletProducts.ts      # 13 toilet products
│   │   ├── flooringProducts.ts    # 50+ flooring products (via helper fns)
│   │   └── index.ts               # Barrel export
│   ├── types/
│   │   ├── products.ts            # Discriminated union types for all categories
│   │   ├── productGuards.ts       # Type guard functions (isVanity, isQuartz, etc.)
│   │   ├── productHelpers.ts      # Utility: getProductDetailInfo, filterProductsByFeature
│   │   ├── sink-products.d.ts     # Ambient declaration (duplicate of products.ts content)
│   │   └── index.ts               # Barrel export
│   ├── components/
│   │   ├── layout/                # Site-wide layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BrandCarousel.tsx
│   │   │   ├── FeaturedCollections.tsx
│   │   │   ├── CallToAction.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── IconPill.tsx        # Floating contact/chat pill
│   │   │   ├── NewsletterBanner.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── StaggeredMenu.tsx   # Mobile hamburger menu
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SplitText.tsx       # GSAP character-split animation
│   │   │   ├── AnimatedContent.tsx # Framer Motion wrapper
│   │   │   ├── AuroraBackground.tsx
│   │   │   ├── CoppolaPreloader.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── NotFound.tsx
│   │   ├── features/
│   │   │   ├── ProductCard.tsx     # Generic card (used by InStock pages only)
│   │   │   ├── ProductManager.tsx  # Admin-style CRUD UI (orphaned — not routed)
│   │   │   ├── ProductDetailLayout.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── FilterPanel.tsx     # Used by InStock pages
│   │   │   ├── FilterSidebar.tsx   # Alternate filter widget (unused in routes)
│   │   │   ├── OurWorkManager.tsx
│   │   │   └── CollectionsScroll.tsx
│   │   └── forms/
│   │       └── QuoteForm.tsx       # Quote form (submission does nothing)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Products.tsx            # Top-level category grid
│   │   ├── GetQuote.tsx
│   │   ├── CustomCabinetry.tsx
│   │   ├── OutdoorKitchens.tsx
│   │   ├── CustomMillworkForm.tsx  # NOT routed — orphaned
│   │   ├── explore/
│   │   │   ├── aboutUs.tsx
│   │   │   ├── contactUs.tsx
│   │   │   ├── OurExpertise.tsx
│   │   │   ├── ourworks.tsx
│   │   │   └── index.ts
│   │   ├── inStock/
│   │   │   ├── instock.tsx
│   │   │   ├── instockvanities.tsx  # Hardcoded 2-item demo data + Pexels images
│   │   │   ├── instockcabinets.tsx  # Hardcoded 2-item demo data + Pexels images
│   │   │   └── index.ts
│   │   ├── Millwork/
│   │   │   └── Millwork.tsx
│   │   └── products/
│   │       ├── vanities/   faucets/   mirrors/   sinks/
│   │       ├── toilets/    quartz/    flooring/
│   │       ├── hardware/   lighting/
│   │       └── (each has Listing + DetailPage components, some have subcategory pages)
│   └── assets/icons/
│       └── add-user.svg
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── ADMIN_README.md             # Documents admin panel that doesn't exist in source
├── BARREL_FILES_USAGE.md
├── CONTACT_FORM_INTEGRATION.md
├── DEPLOYMENT_GUIDE.md
└── README.md
```

---

## 3. Routes / Pages

All routes are children of `App` (defined in `src/main.tsx`). `App` wraps every page with `Navbar`, `Footer`, aurora background, and preloader.

| Route | Component file | What it does | Notes |
|---|---|---|---|
| `/` | `pages/Home.tsx` | Homepage, hero, featured collections, carousels | |
| `/products` | `pages/Products.tsx` | Grid of category cards | |
| `/in-stock` | `pages/inStock/instock.tsx` | In-stock overview page | |
| `/in-stock/vanities` | `pages/inStock/instockvanities.tsx` | Lists in-stock vanities | **FAKE DATA** — 2 hardcoded items with Pexels images |
| `/in-stock/cabinets` | `pages/inStock/instockcabinets.tsx` | Lists in-stock cabinets | **FAKE DATA** — 2 hardcoded items with Pexels images |
| `/custom-cabinetry` | `pages/CustomCabinetry.tsx` | Custom cabinetry service page | |
| `/outdoor-kitchens` | `pages/OutdoorKitchens.tsx` | Outdoor kitchen products | |
| `/commercial-millwork` | `pages/Millwork/Millwork.tsx` | Commercial millwork services | |
| `/hardware` | `pages/products/hardware/Hardware.tsx` | Redirect to external site | **Opens marathonhardware.com then redirects home — jarring UX** |
| `/our-expertise` | `pages/explore/OurExpertise.tsx` | Expertise showcase | |
| `/about-us` | `pages/explore/aboutUs.tsx` | About page | |
| `/our-works` | `pages/explore/ourworks.tsx` | Portfolio / project gallery | |
| `/contact` | `pages/explore/contactUs.tsx` | Contact form | **Form does NOT submit anywhere** — fakes a 1.5s delay then shows success |
| `/quote` | `pages/GetQuote.tsx` | Quote request page (uses `QuoteForm`) | **Form does NOT submit anywhere** — `handleSubmit` only calls `console.log` |
| `/quartz-countertops` | `pages/products/quartz/QuartzCountertops.tsx` | Quartz listing | Real data from `quartzProducts.ts` |
| `/quartz-countertops/:slug` | `pages/products/quartz/QuartzDetailPage.tsx` | Quartz detail | |
| `/products/vanities` | `pages/products/vanities/Vanities.tsx` | Vanity listing | Real data from `vanityProducts.ts` |
| `/products/vanities/:slug` | `pages/products/vanities/VanityDetailPage.tsx` | Vanity detail | |
| `/products/faucets` | `pages/products/faucets/Faucets.tsx` | Faucet listing | Real data from `faucetProducts.ts` |
| `/products/faucets/kitchen` | `pages/products/faucets/KitchenFaucets.tsx` | Kitchen faucet sub-listing | Real — filters by `category === 'kitchen'`; has leftover `console.log` calls |
| `/products/faucets/bathroom` | `pages/products/faucets/BathroomFaucets.tsx` | Bathroom faucet sub-listing | **DEAD SHELL** — renders 10 placeholder `LoadingCard` skeletons, no real products |
| `/products/faucets/shower` | `pages/products/faucets/ShowerSets.tsx` | Shower sets sub-listing | **DEAD SHELL** — same skeleton-only pattern |
| `/products/faucets/:slug` | `pages/products/faucets/FaucetDetailPage.tsx` | Faucet detail | |
| `/products/mirrors` | `pages/products/mirrors/Mirrors.tsx` | Mirror listing | |
| `/products/mirrors/explore` | `pages/products/mirrors/ExploreMirrors.tsx` | Mirror sub-page | |
| `/products/mirrors/modern` | `pages/products/mirrors/ModernMirrors.tsx` | Modern mirrors | |
| `/products/mirrors/timeless` | `pages/products/mirrors/TimelessMirrors.tsx` | Timeless mirrors | |
| `/products/mirrors/contemporary` | `pages/products/mirrors/ContemporaryMirrors.tsx` | Contemporary mirrors | |
| `/products/mirrors/:slug` | `pages/products/mirrors/MirrorsDetailPage.tsx` | Mirror detail | |
| `/products/sinks` | `pages/products/sinks/Sinks.tsx` | Sink listing | |
| `/products/sinks/explore` | `pages/products/sinks/ExploreSinks.tsx` | Sink explore sub-page | |
| `/products/sinks/kitchen` | `pages/products/sinks/KitchenSinks.tsx` | Kitchen sinks | |
| `/products/sinks/bathroom` | `pages/products/sinks/BathroomSinks.tsx` | Bathroom sinks | |
| `/products/sinks/undermount` | `pages/products/sinks/UndermountSinks.tsx` | Undermount sinks | |
| `/products/sinks/vessel` | `pages/products/sinks/VesselSinks.tsx` | Vessel sinks | |
| `/products/sinks/:slug` | `pages/products/sinks/SinkDetailPage.tsx` | Sink detail | |
| `/products/toilets` | `pages/products/toilets/Toilets.tsx` | Toilet listing | |
| `/products/toilets/:slug` | `pages/products/toilets/ToiletDetailPage.tsx` | Toilet detail | |
| `/products/flooring` | `pages/products/flooring/Flooring.tsx` | Flooring listing | |
| `/products/flooring/:slug` | `pages/products/flooring/FlooringDetailPage.tsx` | Flooring detail | |
| `/products/lighting` | `pages/products/lighting/Lighting.tsx` | **Coming Soon** page | Static splash — no product data |
| **Missing** | — | ClosetSystems | Commented out in router — `// TODO: Component missing` |
| **Missing** | — | `/admin/*` routes | ADMIN_README.md documents them; they **do not exist in src/** |

---

## 4. Components Inventory

### Layout components

| Component | Location | Reused where | Notes |
|---|---|---|---|
| `Navbar` | `components/layout/Navbar.tsx` | App.tsx (all pages) | Dropdown state managed locally; mobile uses `StaggeredMenu` |
| `Footer` | `components/layout/Footer.tsx` | App.tsx (all pages) | |
| `StaggeredMenu` | `components/layout/StaggeredMenu.tsx` | Navbar | Mobile hamburger menu with sub-items |
| `BrandCarousel` | `components/layout/BrandCarousel.tsx` | Home, possibly others | |
| `FeaturedCollections` | `components/layout/FeaturedCollections.tsx` | Home | |
| `CallToAction` | `components/layout/CallToAction.tsx` | Multiple pages | |
| `Testimonials` | `components/layout/Testimonials.tsx` | Multiple pages | |
| `NewsletterBanner` | `components/layout/NewsletterBanner.tsx` | Product listing pages | **Newsletter signup goes nowhere — no backend endpoint** |
| `IconPill` | `components/layout/IconPill.tsx` | App.tsx (all pages) | Floating contact shortcut |
| `ScrollToTop` | `components/layout/ScrollToTop.tsx` | App.tsx | |

### UI components

| Component | Location | Reused where | Notes |
|---|---|---|---|
| `Button` | `components/ui/Button.tsx` | Contact, several pages | Well-structured reusable component |
| `SplitText` | `components/ui/SplitText.tsx` | Product listing headers | GSAP character animation |
| `AnimatedContent` | `components/ui/AnimatedContent.tsx` | Various | Framer Motion scroll-reveal wrapper |
| `AuroraBackground` | `components/ui/AuroraBackground.tsx` | App.tsx (all pages) | Continuous CSS animation; always rendered |
| `CoppolaPreloader` | `components/ui/CoppolaPreloader.tsx` | App.tsx | Shown once per session via sessionStorage |
| `ErrorBoundary` | `components/ui/ErrorBoundary.tsx` | Likely App.tsx | |
| `NotFound` | `components/ui/NotFound.tsx` | No dedicated 404 route configured | **No `path: "*"` catch-all route exists in router** |

### Feature components

| Component | Location | Reused where | Notes |
|---|---|---|---|
| `ProductCard` | `components/features/ProductCard.tsx` | `instockvanities`, `instockcabinets` | Generic card; only used by InStock pages — product listing pages each inline their own card UI |
| `ProductDetailLayout` | `components/features/ProductDetailLayout.tsx` | Detail pages | |
| `ProductManager` | `components/features/ProductManager.tsx` | **Nowhere** | Full CRUD modal UI with local state; **orphaned — not used in any routed page** |
| `FilterPanel` | `components/features/FilterPanel.tsx` | `instockvanities`, `instockcabinets` | |
| `FilterSidebar` | `components/features/FilterSidebar.tsx` | **Nowhere** | Alternate filter widget — **unused dead code** |
| `Search` | `components/features/Search.tsx` | Unknown | |
| `OurWorkManager` | `components/features/OurWorkManager.tsx` | `ourworks.tsx` | |
| `CollectionsScroll` | `components/features/CollectionsScroll.tsx` | Possibly Home | |

### Form components

| Component | Location | Reused where | Notes |
|---|---|---|---|
| `QuoteForm` | `components/forms/QuoteForm.tsx` | `GetQuote.tsx` | `handleSubmit` only runs `console.log` — **no submission** |

---

## 5. Product Data Model

All product data lives in `src/data/` as exported TypeScript arrays. There is no API, CMS, database, or JSON file — the data is compiled directly into the JS bundle at build time.

### Base shape (all categories share this)

```typescript
interface BaseProduct {
  id: string;           // e.g. "vanity-1", "quartz-001"
  slug: string;         // auto-generated: name → lowercase-hyphenated
  name: string;
  brand?: string;       // e.g. "Coppola Home", "James Martin Vanities", "Styluxe"
  category: "quartz" | "vanity" | "mirror" | "flooring" | "faucet" | "toilet" | "sink";
  images: string[];     // array of public/ paths or external CDN URLs
  shortDescription?: string;
  description: string;
  specs?: { label: string; value: string }[];  // flexible key-value display
  tags?: string[];
  inStock?: boolean;
}
```

### Category-specific extensions

```typescript
// Vanity
{ size?: string; sizeInches?: number; sinkCount?: 1|2|number;
  mountingType?: "freestanding"|"wall-mounted"|string;
  material?: string; finish?: string; hasSoftClose?: boolean; color?: string }

// Quartz
{ collection?: string; subcategory?: string;
  thickness?: "2cm"|"3cm"|string[]; finish?: "polished"|"honed"|"leathered"|string;
  slabSize?: string; features?: string[] }

// Mirror
{ shape?: "round"|"rectangular"|"oval"|"arch"|string;
  widthInches?: number; heightInches?: number; size?: string;
  hasLed?: boolean; hasAntiFog?: boolean; frameFinish?: string;
  vanityType?: ('single'|'double')[] }

// Faucet
{ faucetCategory?: "kitchen"|"bathroom"|"shower"|string;
  finish?: string; spoutHeight?: string; spoutReach?: string;
  handleType?: "single"|"double"|string;
  mountingType?: "deck-mount"|"wall-mount"|string; flowRate?: string }

// Toilet
{ toiletType?: "one-piece"|"two-piece"|"wall-mounted"|"smart"|string;
  flushType?: "dual-flush"|"single-flush"|"touchless"|string;
  bowlHeight?: "standard"|"comfort"|"ADA"|string;
  roughIn?: string; waterUsage?: string; seatIncluded?: boolean; features?: string[] }

// Sink
{ sinkType?: "kitchen"|"bathroom"|"vessel"|"undermount"|"drop-in"|string;
  material?: "stainless-steel"|"ceramic"|"granite"|"composite"|string;
  bowlCount?: 1|2|3|number; mountingType?: string;
  size?: string; finish?: string; drainSize?: string; color?: string }

// Flooring
{ flooringType?: "vinyl"|"laminate"|"hardwood"|"tile"|string;
  colorTone?: "light"|"medium"|"dark"|string;
  plankSize?: string; size?: string; thickness?: string; waterproof?: boolean; finish?: string }
```

### Sample product object (vanity)

```typescript
{
  id: "vanity-1",
  slug: "boston-30-bathroom-vanity-with-drawer-organizer",
  name: "Boston 30 Bathroom Vanity with Drawer Organizer",
  brand: "Coppola Home",
  category: "vanity",
  images: ["/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_...jpg"],
  description: "Introducing our exquisite bathroom vanity...",
  specs: [
    { label: "Dimensions", value: "30\" width X 22\" depth X 34.75\" height" },
    ...
  ],
  size: "30\"",
  finish: "White",
  inStock: true
}
```

### Product counts (approximate)

| Category | Count | Data file |
|---|---|---|
| Vanities | 56 | `src/data/vanityProducts.ts` |
| Quartz | ~100 | `src/data/quartzProducts.ts` |
| Faucets | ~50 | `src/data/faucetProducts.ts` |
| Mirrors | 50+ | `src/data/mirrorsProducts.ts` |
| Sinks | ~20 | `src/data/sinkProducts.ts` |
| Toilets | 13 | `src/data/toiletProducts.ts` |
| Flooring | 50+ | `src/data/flooringProducts.ts` |

**No pricing data exists anywhere in the codebase.** The `InStockProduct` interface in `ProductManager.tsx` has a `price` field, but that component is orphaned and its data is local state only.

---

## 6. State Management

There is **no global state manager** (no Redux, no Zustand, no React Context). All state is local `useState` hooks within individual components.

| Pattern | Where | Notes |
|---|---|---|
| `useState` (local) | Every page and form component | Exclusively used |
| `sessionStorage` | `App.tsx` | Tracks whether preloader has been shown this session |
| `localStorage` | `ADMIN_README.md` mentions it | Only referenced in docs; no actual `localStorage` calls found in source |
| React Context | Nowhere | Not implemented |
| Redux / Zustand | Nowhere | Not implemented |

This means there is no way to share state between pages (e.g., a cart, a filter selection, user preferences) without prop-drilling or a URL query param.

---

## 7. Styling System

The project uses **three styling approaches inconsistently**:

| System | Where used | Notes |
|---|---|---|
| **Tailwind CSS** | Everywhere — primary system | Utility classes throughout all components |
| **styled-components** | `package.json` dependency; types imported | Listed as a production dependency but **no `styled` calls found in src/** — appears unused or leftover |
| **Inline styles** | Multiple files (e.g. `contactUs.tsx` gradient text, `Lighting.tsx` image sizing) | Mixed with Tailwind; used for CSS properties Tailwind can't express |
| **Global CSS** | `src/index.css` | CSS custom properties, fluid type scale, `@layer` components, scrollbar hide, grid background |

### Specific inconsistencies

- `contactUs.tsx:76` — uses inline `style={{ background: 'linear-gradient(...)' }}` for gradient text (needed because Tailwind doesn't have built-in text-gradient; acceptable)
- `Lighting.tsx:22` — inline `style={{ filter: ..., maxHeight: '80vh' }}` mixed with Tailwind
- Font application is inconsistent: some files use `font-['EB_Garamond',_serif]` inline Tailwind arbitrary values, others use the `font-serif` utility defined in `tailwind.config.js`, and others use `style={{ fontFamily: ... }}`
- `FaucetsBathroom.tsx` and `FaucetsKitchen.tsx` (old versions) use plain `bg-white`, `bg-gray-50` backgrounds — inconsistent with the dark-mode aware `dark:bg-neutral-950` pattern in `KitchenFaucets.tsx` (the functional replacement)

---

## 8. Data Fetching / API Surface

**There is no API surface.** The site makes zero network requests for product data. Everything is compiled into the bundle.

| Item | Detail |
|---|---|
| Product data source | Hardcoded TypeScript arrays in `src/data/*.ts` |
| Contact form submission | `contactUs.tsx` — `handleSubmit` fakes a 1.5s delay (`await new Promise(resolve => setTimeout(...))`) then shows success — **nothing is sent** |
| Quote form submission | `QuoteForm.tsx` — `handleSubmit` calls `console.log('Form submitted:', formData)` — **nothing is sent** |
| Newsletter signup | `NewsletterBanner.tsx` — no submission handler found |
| Image hosting | Mix of local `public/Images/...` paths and one external CDN (`sinterage.ca`) for some quartz images |
| `axios` | Listed in `package.json` but **no `axios` import found anywhere in `src/`** — dead dependency |
| `cheerio` | Listed in `package.json` but **no `cheerio` import found in `src/`** — dead dependency |
| `.env` variables | None — no `.env` file exists; no `import.meta.env` references in source |
| reCAPTCHA | Keys hardcoded in `src/config/recaptcha.ts` — **secret key is exposed client-side** (critical issue); not actually wired to any form |
| External redirect | `Hardware.tsx` opens `marathonhardware.com` and redirects home — no API involved |

---

## 9. Forms & User Input

| Form | Location | Fields | Submission behaviour | Validation |
|---|---|---|---|---|
| Contact form | `pages/explore/contactUs.tsx` | Full Name, Email, Phone, Message | Fakes 1500ms delay, shows success toast, resets — **no data goes anywhere** | HTML `required` only |
| Quote request | `components/forms/QuoteForm.tsx` (used in `GetQuote.tsx`) | First/Last Name, Email, Phone, Address, Project Type, Timeline, Scope, Description, Preferred Contact, File upload | `console.log` only — **no data goes anywhere** | HTML `required` only; file input wired to DOM but no handler |
| Custom Millwork form | `pages/CustomMillworkForm.tsx` | Unknown | **Not routed** — orphaned page, never reachable | Unknown |
| Newsletter | `components/layout/NewsletterBanner.tsx` | Email | **No handler** | None |

No form uses any validation library (e.g. React Hook Form, Zod, Yup). All validation is browser-native `required` attributes only. No field-level error messages are shown.

---

## 10. Known Issues / Messy Areas

### Critical / Blocking

1. **reCAPTCHA secret key exposed client-side** — `src/config/recaptcha.ts:7` contains `SECRET_KEY: '6Lc9iro...'`. Secret keys must never be in frontend code; they are for server-side verification only. This key should be rotated and removed from the repo.

2. **All forms are non-functional** — `contactUs.tsx:40` (fake timeout), `QuoteForm.tsx:28` (console.log only). Leads submitted through the site are silently lost.

3. **Admin panel referenced in docs but does not exist in source** — `ADMIN_README.md` documents routes `/admin/login`, `/admin/dashboard`, `/admin/dashboard-pro` and components `AdminLayout.tsx`, `AdminLogin.tsx`, `AdminDashboard.tsx`, `AdminDashboardPro.tsx` — none of these files exist in `src/`. The router has no `/admin` routes.

### Dead / Orphaned Code

4. **`ProductManager.tsx`** (`src/components/features/ProductManager.tsx`) — Full CRUD UI with modal, image upload (creates object URLs, not persistent), and add/edit/delete callbacks. Receives its product list as a prop but is never rendered anywhere in the routed app.

5. **`FilterSidebar.tsx`** (`src/components/features/FilterSidebar.tsx`) — Not imported anywhere in routed pages.

6. **`CustomMillworkForm.tsx`** (`src/pages/CustomMillworkForm.tsx`) — Not in the router.

7. **`FaucetsBathroom.tsx`** and **`FaucetsKitchen.tsx` (old)** — `src/pages/products/faucets/FaucetsBathroom.tsx` and `FaucetsKitchen.tsx` render only skeleton `LoadingCard` placeholders (10 cards each) with no real products — they appear to be early stubs that were never finished. The router still points to them for `/products/faucets/bathroom` and `/products/faucets/shower`. Meanwhile `KitchenFaucets.tsx` is a fully functional replacement for kitchen faucets.

8. **`axios` and `cheerio`** in `package.json` — Neither is imported anywhere in `src/`. Dead production dependencies that bloat the bundle and mislead future developers.

9. **`sink-products.d.ts`** (`src/types/sink-products.d.ts`) — Ambient `.d.ts` file that partially duplicates what's already in `products.ts`. Unclear purpose.

10. **`@types/react-router-dom: ^5.3.3`** in devDependencies while the actual package is v7.8.2 — types version mismatch may cause incorrect IntelliSense.

### Inconsistent Patterns

11. **Duplicate faucet sub-pages** — The router maps:
    - `/products/faucets/kitchen` → `KitchenFaucets.tsx` (functional, real data)
    - `/products/faucets/bathroom` → `BathroomFaucets.tsx` (functional, real data)  
    — but `FaucetsBathroom.tsx` and `FaucetsKitchen.tsx` (skeleton-only stubs) also exist and are imported in `src/pages/products/faucets/index.ts`. Two different files with different names do the same conceptual job for each subcategory.

12. **InStock pages use Pexels placeholder images** — `instockvanities.tsx:19` and `instockcabinets.tsx:19` reference `https://images.pexels.com/...` URLs with "Add more vanities..." comments. These are demo stubs, not real inventory.

13. **`console.log` left in production code** — `KitchenFaucets.tsx:23-25` has three `console.log` calls logging all faucet products and filtered results.

14. **No 404 route** — The router has no `path: "*"` catch-all, so navigating to a nonexistent URL renders a blank `<main>` with no feedback.

15. **Mixed file naming convention** — Files use both PascalCase (`Vanities.tsx`, `QuartzCountertops.tsx`) and camelCase (`instockvanities.tsx`, `instockcabinets.tsx`, `ourworks.tsx`, `aboutUs.tsx`). Inside `pages/explore/` and `pages/inStock/` the convention is camelCase; everywhere else it's PascalCase.

16. **`styled-components` listed as production dependency but unused** — Adds ~90KB to bundle.

17. **`ProductManager` has its own `InStockProduct` interface** — It defines a local interface with `price: number`, `stockQuantity`, etc., completely separate from the `types/products.ts` type system used by the rest of the site.

18. **Image duplication in data files** — In `vanityProducts.ts` the first vanity uses the same image path three times in its `images` array (lines 52-56). Multiple products likely repeat this pattern.

---

## 11. Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| `react` | 18.3.1 | Core library |
| `react-dom` | 18.3.1 | DOM renderer |
| `react-router-dom` | 7.8.2 | Client-side routing |
| `framer-motion` | 12.23.26 | Component-level animations (page transitions, reveals) |
| `gsap` | 3.14.2 | Timeline and scroll-triggered animations |
| `@gsap/react` | 2.1.2 | React hook wrappers for GSAP |
| `lucide-react` | 0.344.0 | Icon set (used widely) |
| `react-icons` | 5.5.0 | Additional icon set (used alongside lucide — redundant) |
| `remixicon` | 4.6.0 | Third icon set (CSS font icons) — three icon libraries total |
| `styled-components` | 6.1.19 | CSS-in-JS — **appears unused; dead dependency** |
| `@types/styled-components` | 5.1.36 | Types for styled-components — also dead |
| `axios` | 1.11.0 | HTTP client — **not imported anywhere; dead dependency** |
| `cheerio` | 1.1.2 | Server-side HTML parsing — **not imported anywhere; dead dependency** |

### Dev

| Package | Version | Purpose |
|---|---|---|
| `vite` | 7.1.3 | Build tool and dev server |
| `@vitejs/plugin-react` | 4.3.1 | React Fast Refresh for Vite |
| `typescript` | 5.9.2 | Static typing |
| `typescript-eslint` | 8.3.0 | TypeScript ESLint integration |
| `eslint` | 9.9.1 | Linting |
| `eslint-plugin-react-hooks` | 5.1.0-rc.0 | Hook rule enforcement |
| `eslint-plugin-react-refresh` | 0.4.11 | HMR safety linting |
| `tailwindcss` | 3.4.1 | Utility CSS |
| `postcss` | 8.4.35 | CSS processing |
| `autoprefixer` | 10.4.18 | Vendor prefixing |
| `@types/react` | 18.3.24 | React types |
| `@types/react-dom` | 18.3.7 | React DOM types |
| `@types/react-router-dom` | 5.3.3 | **Wrong version** — v5 types for v7 package |
| `globals` | 15.9.0 | ESLint global definitions |

---

## 12. Gaps for Admin Panel

The following does not exist today and represents the full scope of work needed before an admin panel is functional:

### Backend / Infrastructure (nothing exists)
- [ ] **Backend server** — no API, no server-side code anywhere. Need to choose a backend (Node/Express, Next.js API routes, Supabase, Firebase, etc.)
- [ ] **Database** — no persistent storage. Product data, leads, and any admin changes exist only in the compiled JS bundle
- [ ] **Authentication** — no auth system. `ADMIN_README.md` mentions `admin` / `password123` but there is no login route or session handling in the actual source code
- [ ] **File/image upload handling** — `ProductManager.tsx` creates object URLs (`URL.createObjectURL`) which are in-memory only; nothing is ever stored. Need cloud storage (S3, Cloudinary, Supabase Storage, etc.)

### Product Management
- [ ] **Writable product data** — products are compiled into the bundle; changing them requires a code edit and redeploy. Need a database-backed product store
- [ ] **Price field** — no products currently have a price; the type system does not include it for catalogue products (only the orphaned `InStockProduct` interface has `price`)
- [ ] **SKU / inventory tracking** — `inStock: boolean` exists in types but is not populated consistently; no stock quantity, no SKU
- [ ] **Image management** — no upload pipeline; images are manually placed in `public/Images/`
- [ ] **Category management** — categories are hardcoded strings in types and data files

### Lead / Form Management
- [ ] **Form submission handling** — both the contact form and quote form currently go nowhere; need an email service (Resend, SendGrid, Nodemailer) or a form backend (Formspree, etc.)
- [ ] **Lead storage / CRM** — no way to view or manage submitted quotes or contact messages
- [ ] **File attachment handling** — `QuoteForm.tsx` has a file upload UI but no handler

### Content Management
- [ ] **Portfolio / Our Works management** — `ourworks.tsx` is currently static; no CMS
- [ ] **Testimonials management** — `Testimonials.tsx` is static hardcoded content
- [ ] **Home page content management** — hero, featured collections, brand carousel all hardcoded
- [ ] **Blog** — `ADMIN_README.md` mentions a blog post manager; no blog exists in the source

### Infrastructure / Deploy
- [ ] **Environment variable system** — no `.env` file, no `VITE_` prefixed variables; reCAPTCHA secret is hardcoded in source (must be fixed regardless of admin work)
- [ ] **SPA + API coexistence** — currently deployed as pure static files to Hostinger; adding a backend requires either a separate API host or a platform that supports both (Vercel, Render, Railway, etc.)
- [ ] **Admin route protection** — no protected routes, no JWT/session middleware
