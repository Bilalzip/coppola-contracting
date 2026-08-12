import { Product } from '../types/product';

// Helper to normalize product name to URL slug
const normalizeSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// Helper to convert specs object to ProductSpec array
const toSpecs = (specs: Record<string, string>) => {
  return Object.entries(specs).map(([label, value]) => ({ label, value }));
};

export const toiletProducts: Product[] = [
  {
    id: 'SLI-5400',
    slug: normalizeSlug('SLi 5400'),
    name: 'SLi 5400',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/5200bluelightfront-1024x576.jpg',
      '/Images/products/toilets-images/left-view-green-dark-791x1024.png',
      '/Images/products/toilets-images/left-view-pink-dark-791x1024.png',
      '/Images/products/toilets-images/left-view-teal-dark-791x1024.png',
      '/Images/products/toilets-images/left-view-white-dark-791x1024.png',
      '/Images/products/toilets-images/left-view-yellow-dark-791x1024.png',
      '/Images/products/toilets-images/side-view-blue-dark-791x1024.png'
    ],
    shortDescription: 'AI-powered intelligent bidet toilet with multi-color LED lighting',
    description: 'Experience the pinnacle of bathroom technology with our SLi 5400 intelligent bidet toilet. Featuring advanced AI technology, multi-color LED lighting, and comprehensive smart features for an unparalleled cleansing experience.',
    specs: toSpecs({
      'Flush System': 'Dual flush (1.28/1.0 GPF)',
      'Seat Heating': '5 adjustable levels',
      'Water Heating': '5 adjustable levels',
      'Power': 'Electrical required',
      'Height': 'Comfort height',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet', 'AI Technology', 'LED Lighting', 'Heated Seat'],
    inStock: true
  },
  {
    id: 'SLI-5200',
    slug: normalizeSlug('SLi 5200'),
    name: 'SLi 5200',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/SLi 5200.png'
    ],
    shortDescription: 'Advanced intelligent bidet toilet with premium features',
    description: 'The SLi 5200 combines cutting-edge technology with elegant design, offering a comprehensive suite of smart features for ultimate comfort and hygiene.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': 'Multi-level adjustment',
      'Water Heating': 'Multi-level adjustment',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet', 'Heated Seat'],
    inStock: true
  },
  {
    id: 'SLI-4500',
    slug: normalizeSlug('SLi 4500'),
    name: 'SLi 4500',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/4500_5levelheatedseat-1024x576.jpg',
      '/Images/products/toilets-images/4500_45deg_right-1024x576.jpg',
      '/Images/products/toilets-images/4500_Pedestal-1024x576.jpg',
      '/Images/products/toilets-images/4500_remote_user_profiles-1024x576.jpg',
      '/Images/products/toilets-images/4500_solution_pour-1024x576.jpg',
      '/Images/products/toilets-images/4500RightLidopen-1024x576.jpg'
    ],
    shortDescription: '5-level heated seat with remote control and user profiles',
    description: 'The SLi 4500 offers personalized comfort with user profiles, 5-level heated seating, and convenient remote control operation.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': '5 adjustable levels',
      'Control': 'Remote control with user profiles',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet', 'Remote Control', 'User Profiles'],
    inStock: true
  },
  {
    id: 'SLI-4000',
    slug: normalizeSlug('SLi 4000'),
    name: 'SLi 4000',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/4Kleft_quarter-1024x621.png',
      '/Images/products/toilets-images/lux2-1024x683.png',
      '/Images/products/toilets-images/4K_top-1024x621.png',
      '/Images/products/toilets-images/4Kright_quarter-1024x621.png'
    ],
    shortDescription: 'Luxury smart toilet with premium features',
    description: 'The SLi 4000 delivers exceptional performance and comfort with its comprehensive smart features and elegant design.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': 'Adjustable levels',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet', 'Luxury'],
    inStock: true
  },
  {
    id: 'SLI-3000',
    slug: normalizeSlug('SLi 3000'),
    name: 'SLi 3000',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/4Kright_quarter-1024x621.png',
      '/Images/products/toilets-images/lux3-1024x768.jpg',
      '/Images/products/toilets-images/4K_top-1024x621.png'
    ],
    shortDescription: 'Mid-range smart toilet with essential features',
    description: 'The SLi 3000 provides essential smart toilet features with reliable performance and modern design.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': 'Adjustable',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet'],
    inStock: true
  },
  {
    id: 'SLI-2000',
    slug: normalizeSlug('SLi 2000'),
    name: 'SLi 2000',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/lux4-1024x683.jpg',
      '/Images/products/toilets-images/4Kleft_quarter-1024x621.png',
      '/Images/products/toilets-images/4Kright_quarter-1024x621.png'
    ],
    shortDescription: 'Entry-level smart toilet with core features',
    description: 'The SLi 2000 offers essential smart toilet functionality with quality construction and dependable performance.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': 'Yes',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Bidet'],
    inStock: true
  },
  {
    id: 'SLI-1010',
    slug: normalizeSlug('SLi 1010'),
    name: 'SLi 1010',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/1k-realistic-light-1024x576.png',
      '/Images/products/toilets-images/1k-glaze-seat-heat-1024x576.png',
      '/Images/products/toilets-images/1k-3k-front-right-view-1024x576.png',
      '/Images/products/toilets-images/1k-right-full-view-1024x576.png',
      '/Images/products/toilets-images/lifestyle-4-1024x632.png'
    ],
    shortDescription: 'Compact smart toilet with micro shield glaze',
    description: 'The SLi 1010 combines compact design with smart features, featuring micro shield glaze and heated seating.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Seat Heating': 'Yes',
      'Special Feature': 'Micro shield glaze',
      'Power': 'Electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Compact', 'Heated Seat'],
    inStock: true
  },
  {
    id: 'SLI-1000',
    slug: normalizeSlug('SLi 1000'),
    name: 'SLi 1000',
    brand: 'Premium Smart Collection',
    category: 'Smart Toilets',
    images: [
      '/Images/products/toilets-images/1K_battery_cartridge-1024x683.jpg',
      '/Images/products/toilets-images/1k_left-1024x683.jpg',
      '/Images/products/toilets-images/1k_right-1024x770.jpg',
      '/Images/products/toilets-images/lux5-1024x683.jpg'
    ],
    shortDescription: 'Battery-powered smart toilet for flexible installation',
    description: 'The SLi 1000 offers smart toilet features with battery-powered operation, perfect for locations without electrical outlets.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Power': 'Battery powered',
      'Special Feature': 'No electrical required',
      'Warranty': '3 years'
    }),
    tags: ['Smart Toilet', 'Battery Powered'],
    inStock: true
  },
  {
    id: 'SLT-700',
    slug: normalizeSlug('SLT 700'),
    name: 'SLT 700',
    brand: 'Traditional Collection',
    category: 'Traditional Toilets',
    images: [
      '/Images/products/toilets-images/slt_700_1-scaled.jpg'
    ],
    shortDescription: 'Premium traditional toilet with modern efficiency',
    description: 'The SLT 700 combines classic design with modern water-saving technology for efficient and reliable performance.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Type': 'Traditional',
      'Height': 'Standard',
      'Warranty': '1 year'
    }),
    tags: ['Traditional Toilet', 'Water Efficient'],
    inStock: true
  },
  {
    id: 'SLT-600',
    slug: normalizeSlug('SLT 600'),
    name: 'SLT 600',
    brand: 'Traditional Collection',
    category: 'Traditional Toilets',
    images: [
      '/Images/products/toilets-images/SLT600_tree.jpg'
    ],
    shortDescription: 'Eco-friendly traditional toilet',
    description: 'The SLT 600 offers dependable performance with eco-friendly features and timeless design.',
    specs: toSpecs({
      'Flush System': 'Dual flush',
      'Type': 'Traditional',
      'Height': 'Standard',
      'Warranty': '1 year'
    }),
    tags: ['Traditional Toilet', 'Eco-Friendly'],
    inStock: true
  },
  {
    id: 'SLT-500',
    slug: normalizeSlug('SLT 500'),
    name: 'SLT 500',
    brand: 'Traditional Collection',
    category: 'Traditional Toilets',
    images: [
      '/Images/products/toilets-images/SLT500-1-781x1024.png'
    ],
    shortDescription: 'Classic traditional toilet design',
    description: 'The SLT 500 provides reliable traditional toilet performance with quality construction and classic styling.',
    specs: toSpecs({
      'Flush System': 'Single flush',
      'Type': 'Traditional',
      'Height': 'Standard',
      'Warranty': '1 year'
    }),
    tags: ['Traditional Toilet'],
    inStock: true
  }
];








