import { VanityProduct, ProductSpec } from '../types';

// Helper function to convert specifications object to ProductSpec array
const specsToArray = (specs: Record<string, string>): ProductSpec[] => {
  return Object.entries(specs).map(([label, value]) => ({ label, value }));
};

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to create a VanityProduct from raw data
const createProduct = (
  id: string,
  name: string,
  brand: string,
  images: string[],
  description: string,
  specs?: Record<string, string>,
  shortDescription?: string,
  tags?: string[],
  size?: string,
  finish?: string,
  inStock?: boolean
): VanityProduct => {
  return {
    id,
    slug: generateSlug(name),
    name,
    brand,
    category: 'vanity',
    images,
    description,
    shortDescription,
    specs: specs ? specsToArray(specs) : undefined,
    tags,
    size,
    finish,
    inStock
  };
};

// Vanity Products Data
export const vanityProducts: VanityProduct[] = [
  createProduct(
    'vanity-1',
    'Boston 30 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_Warden-and-James_Digital-Assets_01_optimized_4000-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_Warden-and-James_Digital-Assets_01_optimized_4000-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_Warden-and-James_Digital-Assets_01_optimized_4000-1024x1024.jpg'
    ],
    'Introducing our exquisite bathroom vanity, designed to elevate your space with a perfect blend of timeless elegance and enduring quality. Crafted with meticulous attention to detail, this vanity features solid wood dovetail drawer construction, ensuring durability and strength that will stand the test of time.',
    {
      'Dimensions': '30" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Premium Finishes',
      'Sink Type': 'Rectangular Undermount Ceramic Sink',
      'Installation': 'Floor-mounted with included hardware',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 120 lbs',
      'Assembly': 'Professional installation recommended'
    },
    'Elegant bathroom vanity with solid wood construction and premium finishes',
    ['bathroom', 'vanity', 'storage', 'premium']
  ),
  createProduct(
    'vanity-2',
    'Boston 36 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_Warden-and-James_Digital-Assets_01_optimized_4000-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Warden-White-30_Warden-and-James_Digital-Assets_01_optimized_4000-1024x1024.jpg'
    ],
    'Introducing our exquisite bathroom vanity, designed to elevate your space with a perfect blend of timeless elegance and enduring quality. Crafted with meticulous attention to detail, this vanity features solid wood dovetail drawer construction, ensuring durability and strength that will stand the test of time.',
    {
      'Dimensions': '36" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Premium Finishes',
      'Sink Type': 'Rectangular Undermount Ceramic Sink',
      'Installation': 'Floor-mounted with included hardware',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 125 lbs',
      'Assembly': 'Professional installation recommended'
    },
    'Elegant bathroom vanity with solid wood construction and premium finishes',
    ['bathroom', 'vanity', 'storage', 'premium']
  ),
  createProduct(
    'vanity-3',
    'Brooklyn 48 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-48_Brooklyn_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-48_Brooklyn_01-1024x1024.jpg'
    ],
    'The Brooklyn vanity combines contemporary design with functional storage. Available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, and California beveled sink cut-out.',
    {
      'Dimensions': '48" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and beveled sink cut-out',
    ['bathroom', 'vanity', 'contemporary']
  ),
  createProduct(
    'vanity-4',
    'Brooklyn 60 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-60_Brooklyn_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-60_Brooklyn_01-1024x1024.jpg'
    ],
    'The Brooklyn vanity combines contemporary design with functional storage. Available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, and California beveled sink cut-out.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and beveled sink cut-out',
    ['bathroom', 'vanity', 'contemporary']
  ),
  createProduct(
    'vanity-5',
    'Brooklyn 72 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-72_Brooklyn_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Brooklyn-White-72_Brooklyn_01-1024x1024.jpg'
    ],
    'The Brooklyn vanity combines contemporary design with functional storage. Available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, and California beveled sink cut-out.',
    {
      'Dimensions': '72" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and beveled sink cut-out',
    ['bathroom', 'vanity', 'contemporary']
  ),
  createProduct(
    'vanity-6',
    'Calais 42-in Vanity with Engineered Stone Countertop',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-42_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-42_01-1024x1024.jpg'
    ],
    'The vanity fuses contemporary sensibilities with polished, transitional design to create a timeless focal point for your bath space. The countertop is crafted with natural and engineered materials to minimize maintenance and fragility yet emphasizing aesthetics and practicality.',
    {
      'Dimensions': '42" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 140 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Transitional vanity with engineered stone countertop and foldable kick plates',
    ['bathroom', 'vanity', 'transitional', 'stone']
  ),
  createProduct(
    'vanity-7',
    'Calais 48-in Vanity with Engineered Stone Countertop',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-48_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-48_01-1024x1024.jpg'
    ],
    'The vanity fuses contemporary sensibilities with polished, transitional design to create a timeless focal point for your bath space. The countertop is crafted with natural and engineered materials to minimize maintenance and fragility yet emphasizing aesthetics and practicality.',
    {
      'Dimensions': '48" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 150 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Transitional vanity with engineered stone countertop and foldable kick plates',
    ['bathroom', 'vanity', 'transitional', 'stone']
  ),
  createProduct(
    'vanity-8',
    'Calais 60-in Vanity with Engineered Stone Countertop',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-60_Calais_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-60_Calais_01-1024x1024.jpg'
    ],
    'The vanity fuses contemporary sensibilities with polished, transitional design to create a timeless focal point for your bath space. The countertop is crafted with natural and engineered materials to minimize maintenance and fragility yet emphasizing aesthetics and practicality.',
    {
      'Dimensions': '60" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 160 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Transitional vanity with engineered stone countertop and foldable kick plates',
    ['bathroom', 'vanity', 'transitional', 'stone']
  ),
  createProduct(
    'vanity-9',
    'Calais 75-in Vanity with Engineered Stone Countertop',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-75_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Calais-WHT-75_01-1024x1024.jpg'
    ],
    'The vanity fuses contemporary sensibilities with polished, transitional design to create a timeless focal point for your bath space. The countertop is crafted with natural and engineered materials to minimize maintenance and fragility yet emphasizing aesthetics and practicality.',
    {
      'Dimensions': '75" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 180 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Transitional vanity with engineered stone countertop and foldable kick plates',
    ['bathroom', 'vanity', 'transitional', 'stone']
  ),
  createProduct(
    'vanity-10',
    'Calais II 48 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-48_Calais_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-48_Calais_01-1024x1024.jpg'
    ],
    'The Calais II vanity features solid hardwood frame, soft-closing cabinet doors, premium paint exterior and interior finish, and pull-out and tip-out drawers. Includes innovative power bar with USB outlets.',
    {
      'Dimensions': '48" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium finishes',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-11',
    'Calais II 72 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-72_Calais_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Calais-White-72_Calais_01-1024x1024.jpg'
    ],
    'The Calais II vanity features solid hardwood frame, soft-closing cabinet doors, premium paint exterior and interior finish, and pull-out and tip-out drawers. Includes innovative power bar with USB outlets.',
    {
      'Dimensions': '72" width X 22" depth X 35.5" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium finishes',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-12',
    'Francis 42 Bathroom Vanity with Power Bar & Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Francis-WHT-42_01_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Francis-WHT-42_01_small-1024x1024.jpg'
    ],
    'The Francis vanity features solid birch hardwood frame with high quality plywood panel, Blum BluMotion soft-closing drawer glides, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '42" width X 22" depth X 35" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-13',
    'Francis 60 Bathroom Vanity with Power Bar & Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Francis-OG-60_01_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Francis-OG-60_01_small-1024x1024.jpg'
    ],
    'The Francis vanity features solid birch hardwood frame with high quality plywood panel, Blum BluMotion soft-closing drawer glides, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '60" width X 22" depth X 35" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-14',
    'Hayden 24 Bathroom Vanity with Engineered Stone Countertop',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Hayden-WHT-24_01_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Hayden-WHT-24_01_small-1024x1024.jpg'
    ],
    'Let this sleek vanity inspire your bathroom décor. The unconventional design of the freestanding vanity makes it a suitable piece for a full bathroom remodel or a powder room space. This statement piece is a sturdy vanity constructed from high quality hardwood and accented with gold and black metal inlay finish.',
    {
      'Dimensions': '24" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 85 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Sleek freestanding vanity with metal inlay finish',
    ['bathroom', 'vanity', 'freestanding', 'compact']
  ),
  createProduct(
    'vanity-15',
    'Hudson 42 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-42_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-42_01-1024x1024.jpg'
    ],
    'The Hudson vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing cabinet doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots with Ring Appliance holder.',
    {
      'Dimensions': '42" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and Ring appliance holder',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-16',
    'Hudson 60 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-60_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-60_01-1024x1024.jpg'
    ],
    'The Hudson vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing cabinet doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots with Ring Appliance holder.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and Ring appliance holder',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-17',
    'Hudson 72 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-72_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Hudson-White-72_01-1024x1024.jpg'
    ],
    'The Hudson vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing cabinet doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots with Ring Appliance holder.',
    {
      'Dimensions': '72" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and Ring appliance holder',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-18',
    'Jackie 48 Bathroom Vanity with Power Bar & Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-48_08_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-48_08_small-1024x1024.jpg'
    ],
    'The bathroom vanity is constructed from solid hardwood with plywood panel for a durable cabinet. The vanity is blend of both contemporary and classical pattern highlighting the Shaker style construction for an aesthetic finish.',
    {
      'Dimensions': '48" width X 22" depth X 35" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Shaker-style vanity with power bar and premium finishes',
    ['bathroom', 'vanity', 'shaker', 'power-bar']
  ),
  createProduct(
    'vanity-19',
    'Jackie 60 Bathroom Vanity with Power Bar & Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-60_08_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-60_08_small-1024x1024.jpg'
    ],
    'The bathroom vanity is constructed from solid hardwood with plywood panel for a durable cabinet. The vanity is blend of both contemporary and classical pattern highlighting the Shaker style construction for an aesthetic finish.',
    {
      'Dimensions': '60" width X 22" depth X 35" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Shaker-style vanity with power bar and premium finishes',
    ['bathroom', 'vanity', 'shaker', 'power-bar']
  ),
  createProduct(
    'vanity-20',
    'Jackie 75 Bathroom Vanity with Power Bar & Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-75_08_small-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Jackie-WHT-75_08_small-1024x1024.jpg'
    ],
    'The bathroom vanity is constructed from solid hardwood with plywood panel for a durable cabinet. The vanity is blend of both contemporary and classical pattern highlighting the Shaker style construction for an aesthetic finish.',
    {
      'Dimensions': '75" width X 22" depth X 35" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Shaker-style vanity with power bar and premium finishes',
    ['bathroom', 'vanity', 'shaker', 'power-bar']
  ),
  createProduct(
    'vanity-21',
    'James 30-in. Single Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-30_HD-Canada_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-30_HD-Canada_01-1024x1024.jpg'
    ],
    'Elevate your bathroom with timeless elegance and enduring quality, featuring solid wood dovetail drawer construction, soft-close doors, and a stunning engineered stone countertop.',
    {
      'Dimensions': '30" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 115 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Timeless vanity with dovetail drawer construction and engineered stone',
    ['bathroom', 'vanity', 'dovetail', 'stone']
  ),
  createProduct(
    'vanity-22',
    'James 36-in. Single Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-36_HD-Canada_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-36_HD-Canada_01-1024x1024.jpg'
    ],
    'Elevate your bathroom with timeless elegance and enduring quality, featuring solid wood dovetail drawer construction, soft-close doors, and a stunning engineered stone countertop.',
    {
      'Dimensions': '36" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 120 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Timeless vanity with dovetail drawer construction and engineered stone',
    ['bathroom', 'vanity', 'dovetail', 'stone']
  ),
  createProduct(
    'vanity-23',
    'James 42-in. Single Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-42_HD-Canada_01-1024x1024.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_James-White-42_HD-Canada_01-1024x1024.jpg'
    ],
    'Elevate your bathroom with timeless elegance and enduring quality, featuring solid wood dovetail drawer construction, soft-close doors, and a stunning engineered stone countertop.',
    {
      'Dimensions': '42" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Engineered Stone Countertop',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty',
      'Weight': 'Approximately 125 lbs',
      'Assembly': 'Pre-assembled (minimal setup required)'
    },
    'Timeless vanity with dovetail drawer construction and engineered stone',
    ['bathroom', 'vanity', 'dovetail', 'stone']
  ),
  createProduct(
    'vanity-24',
    'Katie 48 Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Katie-48_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Katie-48_01_small-640x640.jpg'
    ],
    'The Katie vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '48" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-25',
    'Katie 60-in Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-60_01_small-1-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-60_01_small-1-640x640.jpg'
    ],
    'The Katie vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-26',
    'Katie 72-in Bathroom Vanity with Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-72_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-72_01_small-640x640.jpg'
    ],
    'The Katie vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '72" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-27',
    'Katie 84 Bathroom Vanity w/Power Bar and Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-84_01-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Katie-WHT-84_01-640x640.jpg'
    ],
    'The Katie vanity features solid birch hardwood frame, Blum BluMotion soft-closing drawer glides, soft-closing cabinet doors, and a soft closing pull-out Power Bar shelf with 2 Power outlets & 2 USB slots.',
    {
      'Dimensions': '84" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Birch Hardwood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Vanity with power bar, USB outlets, and premium hardware',
    ['bathroom', 'vanity', 'power-bar', 'usb']
  ),
  createProduct(
    'vanity-28',
    'Kerrington 48 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-48_Kerrington_01-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-48_Kerrington_01-600x600.jpg'
    ],
    'The Kerrington vanity is available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, California beveled sink cut-out, and Diamond Quartz countertop.',
    {
      'Dimensions': '48" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and Diamond Quartz countertop',
    ['bathroom', 'vanity', 'contemporary', 'quartz']
  ),
  createProduct(
    'vanity-29',
    'Kerrington 60 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-60_Kerrington_01-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-60_Kerrington_01-600x600.jpg'
    ],
    'The Kerrington vanity is available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, California beveled sink cut-out, and Diamond Quartz countertop.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and Diamond Quartz countertop',
    ['bathroom', 'vanity', 'contemporary', 'quartz']
  ),
  createProduct(
    'vanity-30',
    'Kerrington 72 Bathroom Vanity with Drawer Organizer',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-72_Kerrington_01-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/IF_Kerrington-White-72_Kerrington_01-600x600.jpg'
    ],
    'The Kerrington vanity is available in White and Warm Grey, featuring solid hardwood frame, tip-out drawers, California beveled sink cut-out, and Diamond Quartz countertop.',
    {
      'Dimensions': '72" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Hardwood',
      'Available Colors': 'White, Warm Grey',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Contemporary vanity with tip-out drawers and Diamond Quartz countertop',
    ['bathroom', 'vanity', 'contemporary', 'quartz']
  ),
  createProduct(
    'vanity-31',
    'Ronaldo 36 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-36_01_crop_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-36_01_crop_small-640x640.jpg'
    ],
    'The Ronaldo vanity features elegant design with premium finishes and functional storage.',
    {
      'Dimensions': '36" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-32',
    'Ronaldo 48 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-48_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-48_01_small-640x640.jpg'
    ],
    'The Ronaldo vanity features elegant design with premium finishes and functional storage.',
    {
      'Dimensions': '48" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-33',
    'Ronaldo 60 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-60_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Ronaldo-WHT-60_01_small-640x640.jpg'
    ],
    'The Ronaldo vanity features elegant design with premium finishes and functional storage.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-34',
    'Thomson 36 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-36_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-36_01_small-640x640.jpg'
    ],
    'The Thomson vanity features modern design with premium finishes and functional storage.',
    {
      'Dimensions': '36" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Modern vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-35',
    'Thomson 48 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-OG-48_01_V2_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-OG-48_01_V2_small-640x640.jpg'
    ],
    'The Thomson vanity features modern design with premium finishes and functional storage.',
    {
      'Dimensions': '48" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Modern vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-36',
    'Thomson 60 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-60_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-60_01_small-640x640.jpg'
    ],
    'The Thomson vanity features modern design with premium finishes and functional storage.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Modern vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-37',
    'Thomson 72 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-72_01_small-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-72_01_small-640x640.jpg'
    ],
    'The Thomson vanity features modern design with premium finishes and functional storage.',
    {
      'Dimensions': '72" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Modern vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-38',
    'Thomson 84 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-84_01-640x640.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Thomson-WHT-84_01-640x640.jpg'
    ],
    'The Thomson vanity features modern design with premium finishes and functional storage.',
    {
      'Dimensions': '84" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Modern vanity with premium finishes',
    ['bathroom', 'vanity']
  ),
  createProduct(
    'vanity-39',
    'Vaughan 36 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-36_01-3-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-36_01-3-600x600.jpg'
    ],
    'The Vaughan vanity features elegant design with white oak finish and functional storage.',
    {
      'Dimensions': '36" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White Oak',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with white oak finish',
    ['bathroom', 'vanity', 'oak']
  ),
  createProduct(
    'vanity-40',
    'Vaughan 42 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-42_01-2-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-42_01-2-600x600.jpg'
    ],
    'The Vaughan vanity features elegant design with white oak finish and functional storage.',
    {
      'Dimensions': '42" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White Oak',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with white oak finish',
    ['bathroom', 'vanity', 'oak']
  ),
  createProduct(
    'vanity-41',
    'Vaughan 60 Bathroom Vanity',
    'Coppola Home',
    [
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-60_01-2-600x600.jpg',
      '/Images/products/vanities-images/coppolahome-vanity/Vaughan-White-oak-60_01-2-600x600.jpg'
    ],
    'The Vaughan vanity features elegant design with white oak finish and functional storage.',
    {
      'Dimensions': '60" width X 22" depth X 34.75" height',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood',
      'Available Colors': 'White Oak',
      'Installation': 'Pre-assembled for easy installation',
      'Warranty': '5-year limited warranty'
    },
    'Elegant vanity with white oak finish',
    ['bathroom', 'vanity', 'oak']
  ),
  
  // James Martin Vanities Collection
  createProduct(
    'vanity-42',
    'Addison 30" Single Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/addison-30-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-422752.webp',
      '/Images/products/vanities-images/james%26martin-vanity/addison-30-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-select-your-top-518218.webp'
    ],
    'The Addison 30" single vanity combines modern elegance with practical functionality. Its glossy white finish creates a bright, clean aesthetic perfect for contemporary bathrooms.',
    {
      'Dimensions': '30" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close drawers, modern hardware',
      'Installation': 'Freestanding'
    },
    'Modern single vanity with glossy white finish',
    ['bathroom', 'vanity', 'modern', 'white', 'single'],
    '30"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-43',
    'Addison 48" Single Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/addison-48-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-carrara-white-marble-390836.webp',
      '/Images/products/vanities-images/james%26martin-vanity/addison-48-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-select-your-top-399358.webp'
    ],
    'The Addison 48" single vanity offers sophisticated style with its glossy white finish and generous storage space. Perfect for medium-sized bathrooms.',
    {
      'Dimensions': '48" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close drawers, modern hardware',
      'Installation': 'Freestanding'
    },
    'Spacious single vanity with glossy white finish',
    ['bathroom', 'vanity', 'modern', 'white', 'single'],
    '48"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-44',
    'Addison 60" Double Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/addison-60-double-vanity-cabinet-in-glossy-white-double-bathroom-vanity-james-martin-vanities-995683.webp',
      '/Images/products/vanities-images/james%26martin-vanity/addison-60-double-vanity-cabinet-in-glossy-white-double-bathroom-vanity-james-martin-vanities-select-your-top-478500.webp'
    ],
    'The Addison 60" double vanity is perfect for master bathrooms, featuring dual sinks and ample storage with a stunning glossy white finish.',
    {
      'Dimensions': '60" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Double Bowl (sold separately)',
      'Features': 'Soft-close drawers, modern hardware',
      'Installation': 'Freestanding'
    },
    'Double vanity with glossy white finish',
    ['bathroom', 'vanity', 'modern', 'white', 'double'],
    '60"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-45',
    'Addison 72" Double Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/addison-72-double-vanity-cabinet-in-glossy-white-double-bathroom-vanity-james-martin-vanities-arctic-fall-solid-surface-250113.webp',
      '/Images/products/vanities-images/james%26martin-vanity/addison-72-double-vanity-cabinet-in-glossy-white-double-bathroom-vanity-james-martin-vanities-select-your-top-149253.webp'
    ],
    'The Addison 72" double vanity provides luxury and spaciousness for large master bathrooms with its elegant glossy white finish.',
    {
      'Dimensions': '72" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Double Bowl (sold separately)',
      'Features': 'Soft-close drawers, modern hardware',
      'Installation': 'Freestanding'
    },
    'Large double vanity with glossy white finish',
    ['bathroom', 'vanity', 'modern', 'white', 'double'],
    '72"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-46',
    'Athens 30" Single Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/athens-30-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-375344.webp',
      '/Images/products/vanities-images/james%26martin-vanity/athens-30-single-vanity-cabinet-in-glossy-white-single-bathroom-vanity-james-martin-vanities-select-your-top-454140.webp'
    ],
    'The Athens 30" single vanity features a timeless design with clean lines and a glossy white finish, perfect for smaller bathrooms.',
    {
      'Dimensions': '30" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close drawers, chrome hardware',
      'Installation': 'Freestanding'
    },
    'Compact single vanity with classic design',
    ['bathroom', 'vanity', 'classic', 'white', 'single'],
    '30"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-47',
    'Athens 36" Single Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/athens-36-single-vanity-cabinet-glossy-white-single-bathroom-vanity-james-martin-vanities-158688.webp',
      '/Images/products/vanities-images/james%26martin-vanity/athens-36-single-vanity-cabinet-glossy-white-single-bathroom-vanity-james-martin-vanities-select-your-top-286026.webp'
    ],
    'The Athens 36" single vanity offers versatile style with its glossy white finish and practical storage solutions.',
    {
      'Dimensions': '36" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close drawers, chrome hardware',
      'Installation': 'Freestanding'
    },
    'Versatile single vanity with classic design',
    ['bathroom', 'vanity', 'classic', 'white', 'single'],
    '36"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-48',
    'Athens 48" Single Vanity in Glossy White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/athens-48-single-vanity-cabinet-glossy-white-single-bathroom-vanity-james-martin-vanities-139691.webp',
      '/Images/products/vanities-images/james%26martin-vanity/athens-48-single-vanity-cabinet-glossy-white-single-bathroom-vanity-james-martin-vanities-select-your-top-679733.webp'
    ],
    'The Athens 48" single vanity combines functionality with elegant design, featuring a glossy white finish and ample storage.',
    {
      'Dimensions': '48" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Premium MDF with Glossy White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close drawers, chrome hardware',
      'Installation': 'Freestanding'
    },
    'Spacious single vanity with classic design',
    ['bathroom', 'vanity', 'classic', 'white', 'single'],
    '48"',
    'Glossy White',
    true
  ),
  createProduct(
    'vanity-49',
    'Breckenridge 36" Single Vanity in Bright White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-36-single-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-555010.webp',
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-36-single-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-787472.webp'
    ],
    'The Breckenridge 36" single vanity features a transitional design with bright white finish, perfect for both modern and traditional bathrooms.',
    {
      'Dimensions': '36" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Bright White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close doors, decorative hardware',
      'Installation': 'Freestanding'
    },
    'Transitional single vanity in bright white',
    ['bathroom', 'vanity', 'transitional', 'white', 'single'],
    '36"',
    'Bright White',
    true
  ),
  createProduct(
    'vanity-50',
    'Breckenridge 36" Single Vanity in Smokey Celadon',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-36-single-vanity-in-smokey-celadon-single-bathroom-vanity-james-martin-vanities-196168.webp',
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-36-single-vanity-in-smokey-celadon-single-bathroom-vanity-james-martin-vanities-849883.webp'
    ],
    'The Breckenridge 36" single vanity in smokey celadon offers a unique color option for those seeking something beyond traditional white.',
    {
      'Dimensions': '36" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Smokey Celadon Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close doors, decorative hardware',
      'Installation': 'Freestanding'
    },
    'Transitional single vanity in smokey celadon',
    ['bathroom', 'vanity', 'transitional', 'celadon', 'single'],
    '36"',
    'Smokey Celadon',
    true
  ),
  createProduct(
    'vanity-51',
    'Breckenridge 48" Single Vanity in Bright White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-48-single-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-405419.webp',
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-48-single-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-755926.webp'
    ],
    'The Breckenridge 48" single vanity provides generous storage space with transitional styling in bright white finish.',
    {
      'Dimensions': '48" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Bright White Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Soft-close doors, decorative hardware',
      'Installation': 'Freestanding'
    },
    'Spacious transitional vanity in bright white',
    ['bathroom', 'vanity', 'transitional', 'white', 'single'],
    '48"',
    'Bright White',
    true
  ),
  createProduct(
    'vanity-52',
    'Breckenridge 60" Double Vanity in Bright White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-60-double-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-274332.webp',
      '/Images/products/vanities-images/james%26martin-vanity/breckenridge-60-double-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-982251.webp'
    ],
    'The Breckenridge 60" double vanity is ideal for master bathrooms, featuring dual sinks and bright white finish.',
    {
      'Dimensions': '60" W x 22" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Bright White Finish',
      'Sink Type': 'Double Bowl (sold separately)',
      'Features': 'Soft-close doors, decorative hardware',
      'Installation': 'Freestanding'
    },
    'Double vanity with transitional design',
    ['bathroom', 'vanity', 'transitional', 'white', 'double'],
    '60"',
    'Bright White',
    true
  ),
  createProduct(
    'vanity-53',
    'Brittany 30" Single Vanity in Sage Green',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/brittany-30-single-vanity-in-sage-green-single-bathroom-vanity-james-martin-vanities-227945.webp',
      '/Images/products/vanities-images/james%26martin-vanity/brittany-30-single-vanity-in-sage-green-single-bathroom-vanity-james-martin-vanities-select-a-top-376869.webp'
    ],
    'The Brittany 30" single vanity features cottage-style design with a beautiful sage green finish, adding character to any bathroom.',
    {
      'Dimensions': '30" W x 23" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Sage Green Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Decorative legs, vintage hardware',
      'Installation': 'Freestanding'
    },
    'Cottage-style vanity in sage green',
    ['bathroom', 'vanity', 'cottage', 'green', 'single'],
    '30"',
    'Sage Green',
    true
  ),
  createProduct(
    'vanity-54',
    'Brittany 48" Single Vanity in Sage Green',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/brittany-48-single-vanity-in-sage-green-single-bathroom-vanity-james-martin-vanities-335076.webp',
      '/Images/products/vanities-images/james%26martin-vanity/brittany-48-single-vanity-in-sage-green-single-bathroom-vanity-james-martin-vanities-select-a-top-656031.webp'
    ],
    'The Brittany 48" single vanity offers charming cottage style with sage green finish and decorative details.',
    {
      'Dimensions': '48" W x 23" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Sage Green Finish',
      'Sink Type': 'Single Bowl (sold separately)',
      'Features': 'Decorative legs, vintage hardware',
      'Installation': 'Freestanding'
    },
    'Charming cottage-style vanity in sage green',
    ['bathroom', 'vanity', 'cottage', 'green', 'single'],
    '48"',
    'Sage Green',
    true
  ),
  createProduct(
    'vanity-55',
    'Brittany 60" Double Vanity in Cottage White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/brittany-60-double-vanity-in-cottage-white-double-bathroom-vanity-james-martin-vanities-107821.webp',
      '/Images/products/vanities-images/james%26martin-vanity/brittany-60-double-vanity-in-cottage-white-double-bathroom-vanity-james-martin-vanities-select-a-top-758558.webp'
    ],
    'The Brittany 60" double vanity features classic cottage styling with cottage white finish, perfect for traditional bathrooms.',
    {
      'Dimensions': '60" W x 23" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Cottage White Finish',
      'Sink Type': 'Double Bowl (sold separately)',
      'Features': 'Decorative legs, vintage hardware',
      'Installation': 'Freestanding'
    },
    'Classic cottage double vanity in white',
    ['bathroom', 'vanity', 'cottage', 'white', 'double'],
    '60"',
    'Cottage White',
    true
  ),
  createProduct(
    'vanity-56',
    'Brittany 72" Double Vanity in Bright White',
    'James Martin Vanities',
    [
      '/Images/products/vanities-images/james%26martin-vanity/brittany-72-double-vanity-in-bright-white-double-bathroom-vanity-james-martin-vanities-103696.webp',
      '/Images/products/vanities-images/james%26martin-vanity/brittany-72-double-vanity-in-bright-white-double-bathroom-vanity-james-martin-vanities-select-a-top-565481.webp'
    ],
    'The Brittany 72" double vanity provides luxury and elegance with its bright white finish and cottage-inspired design.',
    {
      'Dimensions': '72" W x 23" D x 34" H',
      'Category': 'Bathroom Vanities',
      'Material': 'Solid Wood with Bright White Finish',
      'Sink Type': 'Double Bowl (sold separately)',
      'Features': 'Decorative legs, vintage hardware',
      'Installation': 'Freestanding'
    },
    'Large cottage double vanity in bright white',
    ['bathroom', 'vanity', 'cottage', 'white', 'double'],
    '72"',
    'Bright White',
    true
  )
];

