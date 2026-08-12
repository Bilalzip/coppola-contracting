import { Product, ProductSpec } from '../types/product';

// Helper function to convert specifications array to ProductSpec array
const specsArrayToArray = (specs: Array<{ label: string; value: string }>): ProductSpec[] => {
  return specs.map((spec) => ({ label: spec.label, value: spec.value }));
};

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to create a Product from raw data
const createProduct = (
  id: string,
  name: string,
  brand: string,
  images: string[],
  description: string,
  specs?: Array<{ label: string; value: string }>,
  shortDescription?: string,
  tags?: string[]
): Product => {
  return {
    id,
    slug: generateSlug(name),
    name,
    brand,
    category: 'Flooring',
    images,
    description,
    shortDescription,
    specs: specs ? specsArrayToArray(specs) : undefined,
    tags
  };
};

// Flooring Products Data
export const flooringProducts: Product[] = [
  createProduct(
    'flooring-1',
    'TFSPC201-F | Nickel Grey',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png'
    ],
    'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
    [
      { label: 'Color Shade', value: 'Dark' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'SPC2 6.5mm luxury vinyl plank with dark grey finish',
    ['flooring', 'luxury-vinyl', 'waterproof', 'spc']
  ),
  createProduct(
    'flooring-2',
    'TFSPC202-F | Everest Grey',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png'
    ],
    'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
    [
      { label: 'Color Shade', value: 'Medium' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' }
    ],
    'SPC2 6.5mm luxury vinyl plank with medium grey finish',
    ['flooring', 'luxury-vinyl', 'waterproof', 'spc']
  ),
  createProduct(
    'flooring-3',
    'TFSPC203-F | Cobalt Grey',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png'
    ],
    'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
    [
      { label: 'Color Shade', value: 'Dark' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' }
    ],
    'SPC2 6.5mm luxury vinyl plank with cobalt grey finish',
    ['flooring', 'luxury-vinyl', 'waterproof', 'spc']
  ),
  createProduct(
    'flooring-4',
    'TFSPC206-F | Grey Walnut',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png',
      '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png'
    ],
    'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
    [
      { label: 'Color Shade', value: 'Light' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' }
    ],
    'SPC2 6.5mm luxury vinyl plank with grey walnut finish',
    ['flooring', 'luxury-vinyl', 'waterproof', 'spc', 'walnut']
  ),
  createProduct(
    'flooring-5',
    'TCN103 | Sable',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png'
    ],
    'Premium engineered hardwood flooring with elegant sable finish, perfect for creating a sophisticated and timeless look in any space.',
    [
      { label: 'Type', value: 'Engineered Hardwood' },
      { label: 'Thickness', value: '2mm' },
      { label: 'Finish', value: 'Sable' },
      { label: 'Installation', value: 'Click Lock' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Engineered hardwood with elegant sable finish',
    ['flooring', 'hardwood', 'engineered', 'sable']
  ),
  createProduct(
    'flooring-6',
    'TCN102 | Tusk',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png'
    ],
    'Premium engineered hardwood flooring with elegant tusk finish, perfect for creating a sophisticated and timeless look in any space.',
    [
      { label: 'Type', value: 'Engineered Hardwood' },
      { label: 'Thickness', value: '2mm' },
      { label: 'Finish', value: 'Tusk' },
      { label: 'Installation', value: 'Click Lock' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Engineered hardwood with elegant tusk finish',
    ['flooring', 'hardwood', 'engineered', 'tusk']
  ),
  createProduct(
    'flooring-7',
    'TCN101 | Oyster',
    'TriForest Floors',
    [
      '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png',
      '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png'
    ],
    'Premium engineered hardwood flooring with elegant oyster finish, perfect for creating a sophisticated and timeless look in any space.',
    [
      { label: 'Type', value: 'Engineered Hardwood' },
      { label: 'Thickness', value: '2mm' },
      { label: 'Finish', value: 'Oyster' },
      { label: 'Installation', value: 'Click Lock' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Engineered hardwood with elegant oyster finish',
    ['flooring', 'hardwood', 'engineered', 'oyster']
  ),
  createProduct(
    'flooring-8',
    'FLL6010 | Urban Maple',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg'
    ],
    'Luxury LooseLay Vinyl flooring with urban maple finish, offering easy installation and premium durability.',
    [
      { label: 'Type', value: 'Luxury LooseLay Vinyl' },
      { label: 'Finish', value: 'Urban Maple' },
      { label: 'Installation', value: 'LooseLay' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Luxury LooseLay Vinyl with urban maple finish',
    ['flooring', 'luxury-vinyl', 'looselay', 'maple']
  ),
  createProduct(
    'flooring-9',
    'FLL6009 | Cava',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg'
    ],
    'Luxury LooseLay Vinyl flooring with cava finish, offering easy installation and premium durability.',
    [
      { label: 'Type', value: 'Luxury LooseLay Vinyl' },
      { label: 'Finish', value: 'Cava' },
      { label: 'Installation', value: 'LooseLay' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Luxury LooseLay Vinyl with cava finish',
    ['flooring', 'luxury-vinyl', 'looselay', 'cava']
  ),
  createProduct(
    'flooring-10',
    'FLS1012 | Ranch',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg',
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg'
    ],
    'Home Luxury Vinyl 55 flooring with ranch finish, perfect for residential applications with premium durability and style.',
    [
      { label: 'Type', value: 'Home Luxury Vinyl 55' },
      { label: 'Finish', value: 'Ranch' },
      { label: 'Installation', value: 'Click Lock' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Home Luxury Vinyl 55 with ranch finish',
    ['flooring', 'luxury-vinyl', 'ranch']
  )
  // Note: Additional flooring products can be added here following the same pattern
  // This includes all other flooring variants (TCN series, TFL series, TFSPC series, etc.)
,
createProduct(
    'flooring-11',
    'FLS1003 | Bandsawn Grey',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1003 | Bandsawn Grey',
    [
      { label: 'Product Code', value: 'FLS1003' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1003 | Bandsawn Grey',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-12',
    'FLS1001 | Blizzard',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1001 | Blizzard',
    [
      { label: 'Product Code', value: 'FLS1001' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1001 | Blizzard',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-13',
    'FLL6003 | Bolero',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6003 | Bolero',
    [
      { label: 'Product Code', value: 'FLL6003' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6003 | Bolero',
    ['flooring']
  ),
  createProduct(
    'flooring-14',
    'FLL6009 | Cava',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6009 | Cava',
    [
      { label: 'Product Code', value: 'FLL6009' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6009 | Cava',
    ['flooring']
  ),
  createProduct(
    'flooring-15',
    'SK-16x16x9 | Compact Square Sink',
    'TriForest Floors',
    [
      '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg'
    ],
    'Premium flooring solution featuring SK-16x16x9 | Compact Square Sink',
    undefined,
    'Premium flooring solution featuring SK-16x16x9 | Compact Square Sink',
    ['flooring']
  ),
  createProduct(
    'flooring-16',
    'FLL6004 | Corral',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6004 | Corral',
    [
      { label: 'Product Code', value: 'FLL6004' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6004 | Corral',
    ['flooring']
  ),
  createProduct(
    'flooring-17',
    'FLS1004 | Eclectic',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1004 | Eclectic',
    [
      { label: 'Product Code', value: 'FLS1004' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1004 | Eclectic',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-18',
    'FLL6001 | Eclipse',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6001 | Eclipse',
    [
      { label: 'Product Code', value: 'FLL6001' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6001 | Eclipse',
    ['flooring']
  ),
  createProduct(
    'flooring-19',
    'FLS2009 | Bone Grey',
    'TriForest Floors',
    [
      '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg'
    ],
    'Premium flooring solution featuring FLS2009 | Bone Grey',
    undefined,
    'Premium flooring solution featuring FLS2009 | Bone Grey',
    ['flooring', 'luxury-vinyl']
  ),
  createProduct(
    'flooring-20',
    'FLL6005 | Hewn',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6005 | Hewn',
    [
      { label: 'Product Code', value: 'FLL6005' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6005 | Hewn',
    ['flooring']
  ),
  createProduct(
    'flooring-21',
    'FLS1006 | Iceberg',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1006 | Iceberg',
    [
      { label: 'Product Code', value: 'FLS1006' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1006 | Iceberg',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-22',
    'FLS1011 | Ivory',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1011 | Ivory',
    [
      { label: 'Product Code', value: 'FLS1011' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1011 | Ivory',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-23',
    'FLL6002 | Leather',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6002 | Leather',
    [
      { label: 'Product Code', value: 'FLL6002' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6002 | Leather',
    ['flooring']
  ),
  createProduct(
    'flooring-24',
    'FLS1007 | Midnight',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1007 | Midnight',
    [
      { label: 'Product Code', value: 'FLS1007' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1007 | Midnight',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-25',
    'FLS1008 | Milk Chocolate',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1008 | Milk Chocolate',
    [
      { label: 'Product Code', value: 'FLS1008' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1008 | Milk Chocolate',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-26',
    'FLS1010 | Nutmeg',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1010 | Nutmeg',
    [
      { label: 'Product Code', value: 'FLS1010' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1010 | Nutmeg',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-27',
    'FLL6007 | Pale Rider',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6007 | Pale Rider',
    [
      { label: 'Product Code', value: 'FLL6007' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6007 | Pale Rider',
    ['flooring']
  ),
  createProduct(
    'flooring-28',
    'FLS1012 | Ranch',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1012 | Ranch',
    [
      { label: 'Product Code', value: 'FLS1012' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1012 | Ranch',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-29',
    'FLS1009 | Shade of Grey',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1009 | Shade of Grey',
    [
      { label: 'Product Code', value: 'FLS1009' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1009 | Shade of Grey',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-30',
    'FLS1002 | Slate',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1002 | Slate',
    [
      { label: 'Product Code', value: 'FLS1002' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1002 | Slate',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-31',
    'FLL6006 | Smoke',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6006 | Smoke',
    [
      { label: 'Product Code', value: 'FLL6006' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6006 | Smoke',
    ['flooring']
  ),
  createProduct(
    'flooring-32',
    'FLL6008 | Snow White',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6008 | Snow White',
    [
      { label: 'Product Code', value: 'FLL6008' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Enhanced Stability' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6008 | Snow White',
    ['flooring']
  ),
  createProduct(
    'flooring-33',
    'TCN101 | Oyster',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102629.png',
    '/Flooring-images/Screenshot 2025-09-02 102629.png',
    '/Flooring-images/Screenshot 2025-09-02 102629.png'
    ],
    'Premium flooring solution featuring TCN101 | Oyster',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN101 | Oyster',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-34',
    'TCN102 | Tusk',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102624.png',
    '/Flooring-images/Screenshot 2025-09-02 102624.png',
    '/Flooring-images/Screenshot 2025-09-02 102624.png'
    ],
    'Premium flooring solution featuring TCN102 | Tusk',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN102 | Tusk',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-35',
    'TCN103 | Sable',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102611.png',
    '/Flooring-images/Screenshot 2025-09-02 102611.png',
    '/Flooring-images/Screenshot 2025-09-02 102611.png'
    ],
    'Premium flooring solution featuring TCN103 | Sable',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN103 | Sable',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-36',
    'TCN104 | Woodland',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102651.png',
    '/Flooring-images/Screenshot 2025-09-02 102651.png',
    '/Flooring-images/Screenshot 2025-09-02 102651.png'
    ],
    'Premium flooring solution featuring TCN104 | Woodland',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN104 | Woodland',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-37',
    'TCN105 | Sky',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102643.png',
    '/Flooring-images/Screenshot 2025-09-02 102643.png',
    '/Flooring-images/Screenshot 2025-09-02 102643.png'
    ],
    'Premium flooring solution featuring TCN105 | Sky',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN105 | Sky',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-38',
    'TCN106 | Shadow',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 102637.png',
    '/Flooring-images/Screenshot 2025-09-02 102637.png',
    '/Flooring-images/Screenshot 2025-09-02 102637.png'
    ],
    'Premium flooring solution featuring TCN106 | Shadow',
    [
      { label: 'Species', value: 'American Oak' },
      { label: 'Wear Layer', value: '2mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '165mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN106 | Shadow',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-39',
    'TCN201 | Silk',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103207.png',
    '/Flooring-images/Screenshot 2025-09-02 103207.png',
    '/Flooring-images/Screenshot 2025-09-02 103207.png'
    ],
    'Premium flooring solution featuring TCN201 | Silk',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN201 | Silk',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-40',
    'TCN202 | Shell',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103303.png',
    '/Flooring-images/Screenshot 2025-09-02 103303.png',
    '/Flooring-images/Screenshot 2025-09-02 103303.png'
    ],
    'Premium flooring solution featuring TCN202 | Shell',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN202 | Shell',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-41',
    'TCN203 | Satin',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103000.png',
    '/Flooring-images/Screenshot 2025-09-02 103000.png',
    '/Flooring-images/Screenshot 2025-09-02 103000.png'
    ],
    'Premium flooring solution featuring TCN203 | Satin',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN203 | Satin',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-42',
    'TCN204 | Hazelnut',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103315.png',
    '/Flooring-images/Screenshot 2025-09-02 103315.png',
    '/Flooring-images/Screenshot 2025-09-02 103315.png'
    ],
    'Premium flooring solution featuring TCN204 | Hazelnut',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN204 | Hazelnut',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-43',
    'TCN205 | Cashmere',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103309.png',
    '/Flooring-images/Screenshot 2025-09-02 103309.png',
    '/Flooring-images/Screenshot 2025-09-02 103309.png'
    ],
    'Premium flooring solution featuring TCN205 | Cashmere',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN205 | Cashmere',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-44',
    'TCN206 | Solitude',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-02 103309.png',
    '/Flooring-images/Screenshot 2025-09-02 103309.png',
    '/Flooring-images/Screenshot 2025-09-02 103309.png'
    ],
    'Premium flooring solution featuring TCN206 | Solitude',
    [
      { label: 'Species', value: 'European Oak' },
      { label: 'Wear Layer', value: '3mm' },
      { label: 'Total Thickness', value: '18mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: 'RL up to 1900mm' },
      { label: 'Finish', value: 'Light Wire Brushed, UV Protected' },
      { label: 'Warranty', value: '30 Years Residential' },
      { label: 'Bevel', value: '4 Sided Micro-Bevel' }
    ],
    'Premium flooring solution featuring TCN206 | Solitude',
    ['flooring', 'engineered-hardwood']
  ),
  createProduct(
    'flooring-45',
    'TFL602 | New York',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021056.png',
    '/Flooring-images/Screenshot 2025-09-16 021056.png',
    '/Flooring-images/Screenshot 2025-09-16 021056.png'
    ],
    'Premium flooring solution featuring TFL602 | New York',
    [
      { label: 'Product Code', value: 'TFL602' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Black' },
      { label: 'Shade', value: 'Dark' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL602 | New York',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-46',
    'TFL604 | Chicago',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021425.png',
    '/Flooring-images/Screenshot 2025-09-16 021425.png',
    '/Flooring-images/Screenshot 2025-09-16 021425.png'
    ],
    'Premium flooring solution featuring TFL604 | Chicago',
    [
      { label: 'Product Code', value: 'TFL604' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Grey' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL604 | Chicago',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-47',
    'TFL605 | Stone Wood',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021233.png',
    '/Flooring-images/Screenshot 2025-09-16 021233.png',
    '/Flooring-images/Screenshot 2025-09-16 021233.png'
    ],
    'Premium flooring solution featuring TFL605 | Stone Wood',
    [
      { label: 'Product Code', value: 'TFL605' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Grey' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL605 | Stone Wood',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-48',
    'TFL607 | Dynamic Grey',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021852.png',
    '/Flooring-images/Screenshot 2025-09-16 021852.png',
    '/Flooring-images/Screenshot 2025-09-16 021852.png'
    ],
    'Premium flooring solution featuring TFL607 | Dynamic Grey',
    [
      { label: 'Product Code', value: 'TFL607' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Grey' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL607 | Dynamic Grey',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-49',
    'TFL608 | Sea Horizon',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 022956.png',
    '/Flooring-images/Screenshot 2025-09-16 022956.png',
    '/Flooring-images/Screenshot 2025-09-16 022956.png'
    ],
    'Premium flooring solution featuring TFL608 | Sea Horizon',
    [
      { label: 'Product Code', value: 'TFL608' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Grey' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL608 | Sea Horizon',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-50',
    'TFL609 | Modern Grey',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 023014.png',
    '/Flooring-images/Screenshot 2025-09-16 023014.png',
    '/Flooring-images/Screenshot 2025-09-16 023014.png'
    ],
    'Premium flooring solution featuring TFL609 | Modern Grey',
    [
      { label: 'Product Code', value: 'TFL609' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Grey' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL609 | Modern Grey',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-51',
    'TFL610 | City Loft',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021807.png',
    '/Flooring-images/Screenshot 2025-09-16 021807.png',
    '/Flooring-images/Screenshot 2025-09-16 021807.png'
    ],
    'Premium flooring solution featuring TFL610 | City Loft',
    [
      { label: 'Product Code', value: 'TFL610' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Color', value: 'Nature' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL610 | City Loft',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-52',
    'TFL621 | Espresso Cedar',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 023004.png',
    '/Flooring-images/Screenshot 2025-09-16 023004.png',
    '/Flooring-images/Screenshot 2025-09-16 023004.png'
    ],
    'Premium flooring solution featuring TFL621 | Espresso Cedar',
    [
      { label: 'Product Code', value: 'TFL621' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'Brown' },
      { label: 'Shade', value: 'Dark' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL621 | Espresso Cedar',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-53',
    'TFL622 | Chestnut Canyon',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 022921.png',
    '/Flooring-images/Screenshot 2025-09-16 022921.png',
    '/Flooring-images/Screenshot 2025-09-16 022921.png'
    ],
    'Premium flooring solution featuring TFL622 | Chestnut Canyon',
    [
      { label: 'Product Code', value: 'TFL622' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'TFSPC261' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL622 | Chestnut Canyon',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-54',
    'TFL623 | Northern Fog',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 022947.png',
    '/Flooring-images/Screenshot 2025-09-16 022947.png',
    '/Flooring-images/Screenshot 2025-09-16 022947.png'
    ],
    'Premium flooring solution featuring TFL623 | Northern Fog',
    [
      { label: 'Product Code', value: 'TFL623' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'TFSPC605' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL623 | Northern Fog',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-55',
    'TFL624 | Autumn Glow',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 022938.png',
    '/Flooring-images/Screenshot 2025-09-16 022938.png',
    '/Flooring-images/Screenshot 2025-09-16 022938.png'
    ],
    'Premium flooring solution featuring TFL624 | Autumn Glow',
    [
      { label: 'Product Code', value: 'TFL624' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'TFSPC607' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL624 | Autumn Glow',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-56',
    'TFL625 | Whistler Pine',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 020612.png',
    '/Flooring-images/Screenshot 2025-09-16 020612.png',
    '/Flooring-images/Screenshot 2025-09-16 020612.png'
    ],
    'Premium flooring solution featuring TFL625 | Whistler Pine',
    [
      { label: 'Product Code', value: 'TFL625' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'TFSPC608' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL625 | Whistler Pine',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-57',
    'TFL626 | Prairie Wheat',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 022931.png',
    '/Flooring-images/Screenshot 2025-09-16 022931.png',
    '/Flooring-images/Screenshot 2025-09-16 022931.png'
    ],
    'Premium flooring solution featuring TFL626 | Prairie Wheat',
    [
      { label: 'Product Code', value: 'TFL626' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'Nature' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL626 | Prairie Wheat',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-58',
    'TFL627 | Honey Birch',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021525.png',
    '/Flooring-images/Screenshot 2025-09-16 021525.png',
    '/Flooring-images/Screenshot 2025-09-16 021525.png'
    ],
    'Premium flooring solution featuring TFL627 | Honey Birch',
    [
      { label: 'Product Code', value: 'TFL627' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'TFSPC610' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL627 | Honey Birch',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-59',
    'TFL628 | Hudson Sand',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-16 021625.png',
    '/Flooring-images/Screenshot 2025-09-16 021625.png',
    '/Flooring-images/Screenshot 2025-09-16 021625.png'
    ],
    'Premium flooring solution featuring TFL628 | Hudson Sand',
    [
      { label: 'Product Code', value: 'TFL628' },
      { label: 'Collection', value: 'Luxury Vinyl' },
      { label: 'Species', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '188mm' },
      { label: 'Length', value: '1228mm' },
      { label: 'Color', value: 'Beige & Tan' },
      { label: 'Shade', value: 'Light' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Water Resistance', value: '100%' },
      { label: 'Locking System', value: 'No Lock (Loose Lay)' },
      { label: 'Underpad Attached', value: 'No Pad' },
      { label: 'Warranty (Residential)', value: '30 Years' },
      { label: 'Warranty (Commercial)', value: '10 Years' },
      { label: 'Recommended Room Type', value: 'LBKD use' }
    ],
    'Premium flooring solution featuring TFL628 | Hudson Sand',
    ['flooring', 'luxury-loose-lay']
  ),
  createProduct(
    'flooring-60',
    'TFSPC201-F | Nickel Grey',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024534.png',
    '/Flooring-images/Screenshot 2025-09-17 024534.png',
    '/Flooring-images/Screenshot 2025-09-17 024534.png'
    ],
    'Premium flooring solution featuring TFSPC201-F | Nickel Grey',
    [
      { label: 'Color Shade', value: 'Dark' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC201-F | Nickel Grey',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-61',
    'TFSPC202-F | Everest Grey',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024527.png',
    '/Flooring-images/Screenshot 2025-09-17 024527.png',
    '/Flooring-images/Screenshot 2025-09-17 024527.png'
    ],
    'Premium flooring solution featuring TFSPC202-F | Everest Grey',
    [
      { label: 'Color Shade', value: 'Medium' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC202-F | Everest Grey',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-62',
    'TFSPC203-F | Cobalt Grey',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024521.png',
    '/Flooring-images/Screenshot 2025-09-17 024521.png',
    '/Flooring-images/Screenshot 2025-09-17 024521.png'
    ],
    'Premium flooring solution featuring TFSPC203-F | Cobalt Grey',
    [
      { label: 'Color Shade', value: 'Dark' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC203-F | Cobalt Grey',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-63',
    'TFSPC205-F | Copper',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024512.png',
    '/Flooring-images/Screenshot 2025-09-17 024512.png',
    '/Flooring-images/Screenshot 2025-09-17 024512.png'
    ],
    'Premium flooring solution featuring TFSPC205-F | Copper',
    [
      { label: 'Color Shade', value: 'Medium' },
      { label: 'Color', value: 'Brown' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC205-F | Copper',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-64',
    'TFSPC206-F | Grey Walnut',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024504.png',
    '/Flooring-images/Screenshot 2025-09-17 024504.png',
    '/Flooring-images/Screenshot 2025-09-17 024504.png'
    ],
    'Premium flooring solution featuring TFSPC206-F | Grey Walnut',
    [
      { label: 'Color Shade', value: 'Light' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC206-F | Grey Walnut',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-65',
    'TFSPC210-F | French Walnut',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024457.png',
    '/Flooring-images/Screenshot 2025-09-17 024457.png',
    '/Flooring-images/Screenshot 2025-09-17 024457.png'
    ],
    'Premium flooring solution featuring TFSPC210-F | French Walnut',
    [
      { label: 'Color Shade', value: 'Dark' },
      { label: 'Color', value: 'Grey' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC210-F | French Walnut',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-66',
    'TFSPC211-F | London Fog',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024441.png',
    '/Flooring-images/Screenshot 2025-09-17 024441.png',
    '/Flooring-images/Screenshot 2025-09-17 024441.png'
    ],
    'Premium flooring solution featuring TFSPC211-F | London Fog',
    [
      { label: 'Color Shade', value: 'Medium' },
      { label: 'Color', value: 'Brown' },
      { label: 'Tone', value: 'Cool' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC211-F | London Fog',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-67',
    'TFSPC212-F | Rosewood',
    'TriForest Floors',
    [
      '/Flooring-images/Screenshot 2025-09-17 024434.png',
    '/Flooring-images/Screenshot 2025-09-17 024434.png',
    '/Flooring-images/Screenshot 2025-09-17 024434.png'
    ],
    'Premium flooring solution featuring TFSPC212-F | Rosewood',
    [
      { label: 'Color Shade', value: 'Medium' },
      { label: 'Color', value: 'Brown' },
      { label: 'Tone', value: 'Warm' },
      { label: 'Length(mm)', value: '1220' },
      { label: 'Width(mm)', value: '183' },
      { label: 'Thickness(mm)', value: '6.5' },
      { label: 'Size(mm)', value: '1220 x 183 x 6.5 mm' },
      { label: 'Length(in.)', value: '48.04' },
      { label: 'Width(in.)', value: '7.21' },
      { label: 'Thickness(in.)', value: '0.3' },
      { label: 'Size(in.)', value: '48.04 x 7.21 x 0.3 in' },
      { label: 'Surface', value: 'Real Antique Wood Texture' },
      { label: 'Wear Layer', value: '20mil' },
      { label: 'Water Resistance Level', value: '100% Waterproof' },
      { label: 'Locking System', value: 'Drop Lock' },
      { label: 'Underpad attached', value: '1.5 mm Pad Attached' },
      { label: 'Warranty(Residential)', value: '30yrs' },
      { label: 'Warranty(Commercial)', value: '10yrs' },
      { label: 'Recommended room type', value: 'LBKD' }
    ],
    'Premium flooring solution featuring TFSPC212-F | Rosewood',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-68',
    'FLS1005 | Tempest',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLS1005 | Tempest',
    [
      { label: 'Product Code', value: 'FLS1005' },
      { label: 'Collection', value: 'Home Luxury Vinyl 55' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '12 mil' },
      { label: 'Total Thickness', value: '5.5mm (4.0 +1.5 IXPE)' },
      { label: 'Width', value: '183mm' },
      { label: 'Length', value: '1220mm' },
      { label: 'Finish', value: 'Upgraded IXPE Pad Attached' },
      { label: 'Features', value: '100% Waterproof, Enhanced Stability' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLS1005 | Tempest',
    ['flooring', 'luxury-vinyl', 'waterproof']
  ),
  createProduct(
    'flooring-69',
    'FLL6010 | Urban Maple',
    'TriForest Floors',
    [
      'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg',
    'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg'
    ],
    'Premium flooring solution featuring FLL6010 | Urban Maple',
    [
      { label: 'Product Code', value: 'FLL6010' },
      { label: 'Collection', value: 'Luxury LooseLay Vinyl' },
      { label: 'Species', value: 'Vinyl Composite' },
      { label: 'Wear Layer', value: '20 mil / 0.5mm' },
      { label: 'Total Thickness', value: '5.0mm' },
      { label: 'Width', value: '190mm' },
      { label: 'Length', value: '1224mm' },
      { label: 'Finish', value: 'Wood Grain Embossed' },
      { label: 'Locking System', value: 'I4F' },
      { label: 'Warranty', value: 'Lifetime Residential' }
    ],
    'Premium flooring solution featuring FLL6010 | Urban Maple',
    ['flooring']
  ),
];
