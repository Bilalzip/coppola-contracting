import { MirrorProduct, ProductSpec } from '../types';

const specsToArray = (specs: Record<string, string>): ProductSpec[] => {
  return Object.entries(specs).map(([label, value]) => ({ label, value }));
};

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const createMirrorProduct = (
  id: string,
  name: string,
  brand: string,
  collection: string,
  images: string[],
  description: string,
  dimensions: string,
  shape: string,
  specs?: Record<string, string>,
  features?: string[],
  shortDescription?: string,
  hasLed: boolean = true,
  hasAntiFog: boolean = false,
  frameFinish?: string,
  vanityType?: ('single' | 'double')[]
): MirrorProduct => {
  return {
    id,
    slug: generateSlug(name),
    name,
    brand,
    category: 'mirror',
    collection,
    images,
    description,
    shortDescription: shortDescription || description.substring(0, 150),
    specs: specs ? specsToArray(specs) : undefined,
    tags: [collection.toLowerCase().replace(/\s+/g, '-'), ...( features || []).map(f => f.toLowerCase())],
    shape,
    size: dimensions,
    hasLed,
    hasAntiFog,
    frameFinish,
    vanityType
  };
};

export const mirrorsProducts: MirrorProduct[] = [
  // CONCEPT STUDIO COLLECTION (21 products)
  createMirrorProduct(
    'mirror-cs-1',
    'Solenne',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/Solenne.png?v=1757098246&width=2000'
    ],
    'The Solenne Mirror pairs its elegant capsule form with front-facing LED lighting, offering both clarity and atmosphere. Frameless and crafted in Europe with ultra-clear glass, it reflects with precision and timeless style.',
    '28" x 36"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '40mm',
      'Power (Watt)': '30W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Front-Facing LED',
      'Main Light Switch': 'Soft Touch Sensor'
    },
    ['Elegant Capsule Form', 'Front-Facing LED Lighting', 'Ultra-Clear Glass', 'European Craftsmanship'],
    'Elegant capsule form with front-facing LED lighting'
  ),
  
  createMirrorProduct(
    'mirror-cs-2',
    'Elise',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/ModernBathroomwithCityView.png?v=1751746930&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/elkise.png?v=1751747218&width=2000'
    ],
    'A sculptural half-moon LED mirror brings gentle illumination to this serene bathroom, accentuating the veined marble and warm wood cabinetry. Minimalist yet visually striking, the mirror\'s curved light creates a sense of quiet luxury and balance, making it the perfect focal point for modern interiors.',
    '32" x 24"',
    'oval',
    undefined,
    ['Half-Moon Design', 'Gentle Illumination', 'Sculptural Form', 'Minimalist Style'],
    'Sculptural half-moon LED mirror with gentle illumination'
  ),
  
  createMirrorProduct(
    'mirror-cs-3',
    'MOON',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/moon3_ecca682f-8325-4391-8bc6-69720d84fa2c.png?v=1747253375&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/moon_8b5a93c8-9454-4349-8457-08b351bb1c6a.jpg?v=1747253375&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/moon2_14cd6abe-9ae7-4cec-bef4-4c7273b8fedb.jpg?v=1747253375&width=2000'
    ],
    'A composition of contrast and clarity, the MOON mirror balances soft geometry with refined detail.',
    '32" diameter',
    'round',
    undefined,
    ['Soft Geometry', 'Refined Detail', 'Circular Design', 'Contrast and Clarity'],
    'Circular mirror with soft geometry and refined detail'
  ),

  createMirrorProduct(
    'mirror-cs-4',
    'VICO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/vico2.png?v=1747254012&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/VICO.jpg?v=1747254008&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/vico3.png?v=1747254007&width=2000'
    ],
    'VICO is soft in shape but precise in design. Its rounded edges give it a gentle profile, while the slim inner frame of white LED light brings structure and clarity. The lighting is clean and consistent, ideal for both everyday use and thoughtful design.',
    '36" x 28"',
    'rectangular',
    undefined,
    ['Rounded Edges', 'Slim Inner Frame', 'White LED Light', 'Gentle Profile'],
    'Rounded rectangular mirror with slim LED inner frame'
  ),

  createMirrorProduct(
    'mirror-cs-5',
    'Valentino',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/VALENTINO.jpg?v=1747251077&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/valentino2.jpg?v=1747251116&width=2000'
    ],
    'Valentino is defined by its clean lines and glowing frame. A sharp inner border of white LED light outlines the mirror with precision, offering clear visibility and a bold presence. The rounded corners soften the structure, giving it a balanced and modern feel.',
    '28" x 40"',
    'rectangular',
    undefined,
    ['Clean Lines', 'Glowing Frame', 'Rounded Corners', 'Bold Presence'],
    'Modern rectangular mirror with glowing LED frame'
  ),

  createMirrorProduct(
    'mirror-cs-6',
    'ARIS',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/ARIS.jpg?v=1747237103&width=2000'
    ],
    'ARIS is defined by its clean circle and distinct inner glow. The LED light sits within the mirror surface, creating a quiet ring of clarity that doesn\'t overpower.',
    '30" diameter',
    'round',
    undefined,
    ['Clean Circle', 'Inner Glow', 'Quiet Ring', 'LED Light'],
    'Clean circular mirror with inner LED ring'
  ),

  createMirrorProduct(
    'mirror-cs-7',
    'BARDI',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/BARDI.png?v=1747232529&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/bardi5.png?v=1747232900&width=2000'
    ],
    'BARDI features a wide frosted frame that glows from within, casting clear, uniform light across the mirror surface. With rounded corners and a slim profile, it balances softness and precision.',
    '34" x 26"',
    'rectangular',
    undefined,
    ['Wide Frosted Frame', 'Uniform Light', 'Rounded Corners', 'Slim Profile'],
    'Frosted frame mirror with uniform backlighting'
  ),

  createMirrorProduct(
    'mirror-cs-8',
    'SOUL',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/SOUL.jpg?v=1747231716&width=2000'
    ],
    'SOUL features rounded corners and a soft frosted edge that gives off an even, white glow. The shape is gentle and balanced, offering a quiet elegance. Made with ultra-clear glass, the reflection is clean and sharp.',
    '32" x 24"',
    'rectangular',
    undefined,
    ['Rounded Corners', 'Soft Frosted Edge', 'Ultra-Clear Glass', 'Quiet Elegance'],
    'Rounded rectangular mirror with frosted edge glow'
  ),

  createMirrorProduct(
    'mirror-cs-9',
    'ANIMA',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/animA.jpg?v=1747231529&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/ANIMA_closeup_1738331645.jpg?v=1747231541&width=2000'
    ],
    'ANIMA features a frosted frame with soft white lighting that creates a clean and calm glow. The glass is ultra-clear, offering a sharp reflection without distortion. Simple, refined, and designed to bring light into the everyday.',
    '30" x 24"',
    'rectangular',
    undefined,
    ['Frosted Frame', 'Clean Glow', 'Ultra-Clear Glass', 'Simple Design'],
    'Simple frosted frame mirror with clean lighting'
  ),

  createMirrorProduct(
    'mirror-cs-10',
    'NANO DECOR',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/NanoDecor.jpg?v=1745880933&width=2000'
    ],
    'Simple, clean, and confident. The Nano Decor Mirror features a soft arch and a clean straight base, designed to work quietly in the background or stand out when needed. The backlit design adds a subtle layer of light, making it a natural fit for dressing rooms, boutiques, and modern interiors.',
    'Custom sizes available',
    'arch',
    undefined,
    ['Soft Arch Design', 'Clean Straight Base', 'Backlit Design', 'Modern Interiors'],
    'Arched mirror with clean straight base and backlighting'
  ),

  createMirrorProduct(
    'mirror-cs-11',
    'COSTA DECOR',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/CostaDecor.jpg?v=1745880893&width=2000'
    ],
    'Simple, clean, and confident. The Costa Decor Mirror features a soft arch and a clean straight base, designed to work quietly in the background or stand out when needed. The backlit design adds a subtle layer of light, making it a natural fit for dressing rooms, boutiques, and modern interiors.',
    'Custom sizes available',
    'arch',
    undefined,
    ['Soft Arch Design', 'Clean Straight Base', 'Backlit Design', 'Modern Interiors'],
    'Elegant arched mirror with backlit design'
  ),

  createMirrorProduct(
    'mirror-cs-12',
    'MARLOWE',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/Marlowe2.jpg?v=1745879944&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/Marlowe.jpg?v=1745879943&width=2000'
    ],
    'Simple, clean, and confident. The Marlowe Mirror features a soft arch and a clean straight base, designed to work quietly in the background or stand out when needed. The backlit design adds a subtle layer of light, making it a natural fit for dressing rooms, boutiques, and modern interiors.',
    'Custom sizes available',
    'arch',
    undefined,
    ['Soft Arch Design', 'Clean Straight Base', 'Backlit Design', 'Modern Interiors'],
    'Contemporary arched mirror with versatile design'
  ),

  createMirrorProduct(
    'mirror-cs-13',
    'SENSA',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/sensa.png?v=1747240718&width=2000'
    ],
    'Soft and elemental, the Sensa Mirror brings clarity and calm into any setting. A perfect circle framed by a subtle halo of light, it transforms reflection into an experience of warmth and simplicity. Crafted with ultra-clear glass and precision lighting, Sensa is designed to enhance both natural and ambient light — offering a pure, refined reflection.',
    'Custom sizes available',
    'round',
    undefined,
    ['Perfect Circle', 'Subtle Halo of Light', 'Ultra-Clear Glass', 'Precision Lighting'],
    'Circular mirror with subtle halo lighting'
  ),

  createMirrorProduct(
    'mirror-cs-14',
    'ACUTO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/acuto3.png?v=1747107534&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/acuto.png?v=1747107534&width=2000',
      'https://www.clariscompany.com/cdn/shop/files/ACUTOdouble.png?v=1747107534&width=2000'
    ],
    'This oval mirror features a gentle, curved design with the option of a soft bevel or a clean, flat edge—allowing you to choose the finish that best fits your space. Its warm backlight adds a subtle glow that enhances both the mirror and the surrounding material. A versatile piece with a refined presence.',
    'Custom sizes available',
    'oval',
    undefined,
    ['Gentle Curved Design', 'Soft Bevel Option', 'Clean Flat Edge', 'Warm Backlight'],
    'Versatile oval mirror with warm backlighting'
  ),

  createMirrorProduct(
    'mirror-cs-15',
    'NORMA',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/NORMADAY.png?v=1744221468&width=2000'
    ],
    'This design features clean, symmetrical lighting on both sides of the mirror, offering balanced front illumination. Its simplicity and clarity make it a versatile choice for modern bathrooms where function and subtle elegance go hand in hand.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Clean Symmetrical Lighting', 'Balanced Front Illumination', 'Simplicity and Clarity', 'Modern Bathroom Design'],
    'Rectangular mirror with symmetrical side lighting'
  ),

  createMirrorProduct(
    'mirror-cs-16',
    'NANO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/NANONIGHT.png?v=1744221359&width=2000'
    ],
    'A modern mirror with full-height vertical lighting along one edge, offering powerful and focused front illumination. Its asymmetrical layout gives a clean, contemporary feel while maintaining clarity and brightness where it\'s needed most.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Full-Height Vertical Lighting', 'Powerful Front Illumination', 'Asymmetrical Layout', 'Contemporary Feel'],
    'Modern asymmetrical mirror with vertical edge lighting'
  ),

  createMirrorProduct(
    'mirror-cs-17',
    'LUGO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/LUGODAY.png?v=1744221264&width=2000'
    ],
    'A clean, vertical lighting design that offers bright, even front light. This mirror is all about simplicity — straightforward, minimal, and designed to enhance clarity in modern bathrooms.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Clean Vertical Lighting', 'Bright Even Front Light', 'Simplicity Focus', 'Modern Bathroom Design'],
    'Minimal rectangular mirror with vertical lighting'
  ),

  createMirrorProduct(
    'mirror-cs-18',
    'LIVO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/LIVODOUBLENIGHT.png?v=1744220917&width=2000'
    ],
    'This mirror provides ample front light, framed in a clean, geometric outline that adds clarity and focus to the space.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Ample Front Light', 'Clean Geometric Outline', 'Clarity and Focus', 'Modern Design'],
    'Geometric rectangular mirror with front lighting'
  ),

  createMirrorProduct(
    'mirror-cs-19',
    'ACARI DECOR',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/ACARIDECOR.png?v=1744220641&width=2000'
    ],
    'This mirror concept plays with contrast and symmetry. A clean rectangular form is framed by crisp LED lighting, set against rich tones and soft textures. Designed to anchor a dressing room, closet, or entryway — it balances minimal design with bold atmosphere.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Contrast and Symmetry', 'Clean Rectangular Form', 'Crisp LED Lighting', 'Minimal Design'],
    'Contemporary rectangular mirror with contrast design'
  ),

  createMirrorProduct(
    'mirror-cs-20',
    'PULSE',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/PULSE.png?v=1744205704&width=2000'
    ],
    'This concept mirror is shaped to echo the softness of natural forms, with a U-shaped cut that draws the eye and centers the space. Backlit with integrated lighting, it creates a calm, sculptural glow that shifts with the time of day.',
    'Custom sizes available',
    'custom',
    undefined,
    ['Sculpted Light', 'U-Shaped Cut', 'Natural Forms', 'Integrated Lighting'],
    'Sculptural mirror with U-shaped design and backlighting'
  ),

  createMirrorProduct(
    'mirror-cs-21',
    'BENO',
    '',
    'Concept Studio',
    [
      'https://www.clariscompany.com/cdn/shop/files/BENONight.png?v=1744220454&width=2000'
    ],
    'A bold, modern mirror with lighting on the top and one side. The clean lines and off-center design make it stand out without overwhelming the space. Bright, functional, and easy to pair — whether used solo or as a set. Available in custom sizes through the Concept Studio.',
    'Custom sizes available',
    'rectangular',
    undefined,
    ['Bold Modern Design', 'Top and Side Lighting', 'Clean Lines', 'Off-Center Design'],
    'Bold modern mirror with top and side LED lighting'
  ),

  // ELEGANCE COLLECTION (5 products)
  createMirrorProduct(
    'mirror-el-1',
    'VIANO',
    '',
    'Elegance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/20250714_1727_LuxuryBathroomElegance_remix_01k05d5wpdfknamrg5m831gw02.png?v=1754169700',
      'https://www.clariscompany.com/cdn/shop/files/012_VIANO_33.5_WMT_001_2_dacb43ea-eb41-48c7-9a47-a8af25e5c81d.png?v=1754169700',
      'https://www.clariscompany.com/cdn/shop/files/viano-white-led-mirror-2000x2000_1.jpg?v=1754169700',
      'https://www.clariscompany.com/cdn/shop/files/012_VIANO_37.5_BMT_001_2_18df3a05-50aa-4edd-b2c0-766df20702de.png?v=1754169700'
    ],
    'The Viano Mirror features a sleek matte stainless steel frame, available in bold black or crisp white, offering timeless versatility. Its clean, minimalist lines and refined finish create a polished look that seamlessly enhances modern interiors.',
    '29.5" / 33.5" / 37.5"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '40mm',
      'Power (Watt)': '30W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Soft Touch Sensor',
      'Weight': '13 kg | 17 kg',
      'Mirror Mount': 'Round',
      'Frame': 'Stainless Steel',
      'Frame Color': 'White Matte / Black Matte'
    },
    ['Diamond Clear Vision', 'Matte Stainless Steel Frame', 'Black or White Options', 'Clean Minimalist Lines', 'Refined Finish', 'Soft Touch Sensor'],
    'Sleek stainless steel framed mirror in black or white',
    true,
    false,
    'Matte Stainless Steel',
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-el-2',
    'DUO R',
    '',
    'Elegance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/DUO_DG.png?v=1754233203',
      'https://www.clariscompany.com/cdn/shop/files/Duo_R_in_a_modern_bathroom.png?v=1754233279',
      'https://www.clariscompany.com/cdn/shop/files/006_DUO_R_D_G_001_64e498e3-0e8b-4a3d-bf4e-3d79242f11c5.png?v=1754233279'
    ],
    'The Duo Mirror features a unique dual design, pairing a larger mirror with a smaller one for striking visual appeal. Its 20mm beveled edge enhances the design\'s refinement, while integrated anti-fog technology ensures a clear reflection every time.',
    'Custom sizes',
    'custom',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Mirror Edge': '20mm bevel',
      'Power (Watt)': '35W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Soft Touch Multi Dimmer',
      'Anti Fog': 'Activated by button'
    },
    ['Diamond Clear Vision', 'Dual Design', '20mm Beveled Edge', 'Adjustable Dimmer', 'Anti-Fog Technology', 'Soft Touch Multi Dimmer'],
    'Unique dual mirror design with beveled edges',
    true,
    true,
    undefined,
    ['single']
  ),

  createMirrorProduct(
    'mirror-el-3',
    'DIANO WHITE',
    '',
    'Elegance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/004_DIANO_21.5x37.5_DWMT_001_ce86b34d-1d30-4281-a9f0-e02b4953e457.png?v=1739997978',
      'https://www.clariscompany.com/cdn/shop/files/004_DIANO_21.5x37.5_DWMT_002_675ec188-de03-4f93-a86e-d7c17163a9db.png?v=1739997978',
      'https://www.clariscompany.com/cdn/shop/files/dianowhiteframe.png?v=1754243164'
    ],
    'The Diano Mirror brings timeless sophistication to your space with its sleek oval design and premium stainless steel frame.',
    '21.5" x 37.5"',
    'oval',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '40mm',
      'Power (Watt)': '30W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Multi Touch Sensor',
      'Weight': '11kg',
      'Mirror Mount': 'Vertical',
      'Frame': 'Stainless Steel',
      'Frame Color': 'White Matte'
    },
    ['Diamond Clear Vision', 'Oval Design', 'Premium Stainless Steel Frame', 'White Matte Finish', 'Refined Craftsmanship', 'Multi Touch Sensor'],
    'Timeless oval mirror with white stainless steel frame',
    true,
    false,
    'White Matte Stainless Steel',
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-el-4',
    'ORO Light',
    '',
    'Elegance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/oro_light_white.jpg?v=1754315917',
      'https://www.clariscompany.com/cdn/shop/files/orolight_natural_light.jpg?v=1754315917',
      'https://www.clariscompany.com/cdn/shop/files/008_2_ORO_LIGHT_36x30_001_106c88ea-c863-444b-a955-1bf0387f338c.png?v=1754315917'
    ],
    'With its radiant gold frame, the Oro Light Mirror brings a sense of luxury and refinement to your space. Featuring an advanced wave motion sensor, it lets you control the lighting effortlessly without ever touching the mirror.',
    '24" x 32" / 36" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '37W | 40W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Wave Motion Sensor',
      'Weight': '12 kg | 16kg',
      'Mirror Mount': 'Vertical | Horizontal',
      'Frame': 'Aluminum',
      'Frame Color': 'Gold'
    },
    ['Diamond Clear Vision', 'Radiant Gold Frame', 'Wave Motion Sensor', 'Anti-Fog Technology', 'Luxury Design', 'Effortless Control'],
    'Luxury gold-framed mirror with wave motion sensor',
    true,
    true,
    'Radiant Gold',
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-el-5',
    'DIANO BLACK',
    '',
    'Elegance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/004_DIANO_23.5x39.5_DBMT_001_5afe3c17-5ff8-4807-9780-0a8b5476a94c.png?v=1739996162&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/004_DIANO_23.5x39.5_DBMT_002_03afaf08-17a9-4ab8-baf2-5e7784ac1938.png?v=1739996162&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/DIANODOUBLEBLACK.jpg?v=1754316120&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/diano_blue.png?v=1754316120&width=1000',
      'https://www.clariscompany.com/cdn/shop/files/DIANOBLACK.png?v=1754316084&width=1000'
    ],
    'The Diano Mirror brings timeless sophistication to your space with its sleek oval design and premium stainless steel frame. Available in bold Black Matte, it offers a refined aesthetic to suit a variety of styles.',
    '23.5" x 39.5"',
    'oval',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '40mm',
      'Power (Watt)': '30W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Wave Motion Sensor',
      'Anti Fog': 'Integrated',
      'Weight': '14kg',
      'Mirror Mount': 'Vertical',
      'Frame': 'Stainless Steel',
      'Frame Color': 'Black Matte'
    },
    ['Diamond Clear Vision', 'Oval Design', 'Premium Stainless Steel Frame', 'Black Matte Finish', 'Refined Craftsmanship', 'Wave Motion Sensor', 'Anti-Fog Technology'],
    'Sophisticated oval mirror with black stainless steel frame',
    true,
    true,
    'Black Matte Stainless Steel',
    ['single', 'double']
  ),

  // HARMONIA COLLECTION (1 product)
  createMirrorProduct(
    'mirror-ha-1',
    'SOLARA',
    '',
    'Harmonia Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/SOLARIS2048x2048.png?v=1741028902',
      'https://www.clariscompany.com/cdn/shop/files/SOLARIS32048x2048.png?v=1741028902',
      'https://www.clariscompany.com/cdn/shop/files/SOLARIS2048x2048_7cee1cc1-e1dc-4dcb-9bef-0fdd17f2c818.png?v=1741028902',
      'https://www.clariscompany.com/cdn/shop/files/SOLARISDARK2048x2048.png?v=1741028902'
    ],
    'The Solara Mirror is defined by its sleek, elongated form and soft, curved illumination. The black frame creates a bold contrast, while the gentle arc of light adds warmth and movement. Subtle yet striking, Solara makes an impact without being overstated.',
    '21.5" x 59" / 23.5" x 67" / 25.5" x 75"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '40mm',
      'Power (Watt)': '11W, 12W, 13W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Hardwire',
      'Frame': 'Aluminum',
      'Frame Color': 'Black Matte, Black Moir, Black Gloss'
    },
    ['Diamond Clear Vision', 'Elongated Form', 'Soft Curved Illumination', 'Black Frame', 'Bold Contrast', 'Refined Simplicity'],
    'Elongated mirror with soft curved LED illumination',
    true,
    false,
    'Black Aluminum'
  ),

  // MEDIA COLLECTION (1 product)
  createMirrorProduct(
    'mirror-me-1',
    'AKATO MEDIA',
    '',
    'Media Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/001_AKATO_MEDIA_48x30_001_bf68504a-c7a4-458f-ad57-aec372fa0367.png?v=1739997895&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/akato-led-mirror-2000x2000_4.jpg?v=1739997895&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/akato-led-mirror-2000x2000_3.jpg?v=1739997895&width=1400'
    ],
    'The Akato Media Mirror redefines your bathroom as a connected media space, blending cutting-edge technology with modern design. Featuring Bluetooth connectivity, premium speakers for high-quality sound, and both backlighting and front lighting, it creates the perfect ambiance while delivering an immersive multimedia experience.',
    '48" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '67',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Frontlit & Backlit',
      'Main Light Switch': 'Media Touch Sensor',
      'Weight': '14.14kg',
      'Mirror Mount': 'Horizontal',
      'Frame': 'Frosted Frame'
    },
    ['Bluetooth Connectivity', 'Premium Speakers for High-Quality Sound', 'Backlighting & Front Lighting', 'Diamond Clear Vision Glass', 'Media Touch Sensor Control', 'Frosted Frame Design', 'Energy Efficient LED Technology'],
    'Smart mirror with Bluetooth speakers and dual lighting',
    true,
    false,
    'Frosted Frame',
    ['single']
  ),

  // ORIGIN COLLECTION (5 products)
  createMirrorProduct(
    'mirror-or-1',
    'ANABO',
    '',
    'Origin Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/ANABO_24X32_cba67d5f-3ba2-4135-ba88-16cb6870c69f.png?v=1751301488',
      'https://www.clariscompany.com/cdn/shop/files/ANABO_30X36_a2a9a693-6fa2-4b76-88d9-ce587ebf29f3.png?v=1751301051',
      'https://www.clariscompany.com/cdn/shop/files/ANABO_48X30_b4e72b62-619c-4b00-84a7-4b9c368385e6.png?v=1751301051'
    ],
    'The ANABO mirror features a sleek design with rounded edges and a frosted glass frame. Its simple, sophisticated look fits easily with many interior styles. The frosted border offers a gentle contrast to the mirror, bringing a sense of depth and refinement to the piece.',
    '24" x 32" / 36" x 30" / 48" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Frame': 'Frosted Glass Frame',
      'Design': 'Rounded Edges',
      'Style': 'Sleek, Sophisticated',
      'Sizes Available': '24" x 32", 36" x 30", 48" x 30"'
    },
    ['Diamond Clear Vision', 'Rounded Edges', 'Frosted Glass Frame', 'Sleek Design', 'Sophisticated Look'],
    'Sleek mirror with frosted glass frame and rounded edges',
    false,
    false,
    'Frosted Glass'
  ),

  createMirrorProduct(
    'mirror-or-2',
    'MARI',
    '',
    'Origin Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/MARI_48X30_d9bf9099-88b2-44ae-8000-383fcaf27787.png?v=1751302535',
      'https://www.clariscompany.com/cdn/shop/files/MARI_36x30_402fd58e-be8e-45ed-8964-672d48456ad0.png?v=1751302535',
      'https://www.clariscompany.com/cdn/shop/files/MARI_24X32_1c65f57a-469c-4994-9b97-80a3bc64530b.png?v=1751302535'
    ],
    'A stylish mirror with a sleek rectangular shape, beveled edges, and a clear frame. The clean lines and polished finish bring a sense of sophistication and individuality to any bathroom or living space.',
    '24" x 32" / 36" x 30" / 48" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Frame': 'Clear Frame',
      'Design': 'Rectangular Shape, Beveled Edges',
      'Features': 'Pure Clarity, Ultra Thin, Sustainability',
      'Sizes Available': '24" x 32", 36" x 30", 48" x 30"'
    },
    ['Diamond Clear Vision', 'Rectangular Shape', 'Beveled Edges', 'Clear Frame', 'Polished Finish', 'Pure Clarity', 'Ultra Thin', 'Sustainability'],
    'Stylish rectangular mirror with beveled edges',
    false,
    false,
    'Clear Frame'
  ),

  createMirrorProduct(
    'mirror-or-3',
    'NERO',
    '',
    'Origin Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/NERO24X32.png?v=1751304412',
      'https://www.clariscompany.com/cdn/shop/files/NERO36x30.png?v=1751304412',
      'https://www.clariscompany.com/cdn/shop/files/NERO48X30.png?v=1751304412'
    ],
    'A modern and elegant mirror for any bathroom or living space. The classic design is highlighted by a sleek black aluminum frame, bringing a touch of sophistication to the room. Crafted with premium materials, the Nero mirror offers a timeless look with a subtle modern edge.',
    '24" x 32" / 36" x 30" / 48" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Frame': 'Black Aluminum Frame',
      'Design': 'Classic Design with Modern Edge',
      'Materials': 'Premium Materials',
      'Sizes Available': '24" x 32", 36" x 30", 48" x 30"'
    },
    ['Diamond Clear Vision', 'Black Aluminum Frame', 'Classic Design', 'Modern Edge', 'Premium Materials', 'Timeless Look'],
    'Classic mirror with sleek black aluminum frame',
    false,
    false,
    'Black Aluminum'
  ),

  createMirrorProduct(
    'mirror-or-4',
    'VARIO STEEL',
    '',
    'Origin Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/VARIOSTEEL.png?v=1751303925',
      'https://www.clariscompany.com/cdn/shop/files/NESSOSTEELV22048x2048.png?v=1751303925'
    ],
    'VARIO STEEL features a classic rectangular shape with a sturdy metal frame. The clean lines and solid construction give it a sense of presence, while the simple design makes it easy to pair with any decor. This mirror is a versatile choice for both bathrooms and living spaces.',
    '36" x 30" / 48" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Frame': 'Metal Frame',
      'Design': 'Classic Rectangular Shape',
      'Construction': 'Solid Construction',
      'Sizes Available': '36" x 30", 48" x 30"'
    },
    ['Diamond Clear Vision', 'Rectangular Shape', 'Metal Frame', 'Clean Lines', 'Solid Construction', 'Versatile Design'],
    'Sturdy metal-framed mirror with clean lines',
    false,
    false,
    'Metal Frame'
  ),

  createMirrorProduct(
    'mirror-or-5',
    'VELA',
    '',
    'Origin Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/VELA.png?v=1751303419',
      'https://www.clariscompany.com/cdn/shop/files/VELAWHITE.png?v=1751303890'
    ],
    'A stylish mirror with a sleek rectangular shape, beveled edges, and a clear frame. The clean lines and polished finish bring a sense of sophistication and individuality to any bathroom or living space.',
    '25.5" / 29.5"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Frame': 'Clear Frame',
      'Design': 'Rectangular Shape, Beveled Edges',
      'Finish': 'Polished Finish',
      'Sizes Available': '25.5", 29.5"'
    },
    ['Diamond Clear Vision', 'Rectangular Shape', 'Beveled Edges', 'Clear Frame', 'Polished Finish', 'Sophisticated Design'],
    'Sophisticated mirror with clear frame and beveled edges',
    false,
    false,
    'Clear Frame'
  ),

  // RADIANCE COLLECTION (5 products)
  createMirrorProduct(
    'mirror-ra-1',
    'ACARI',
    '',
    'Radiance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/ACARI-FrontFacing.jpg?v=1746111834',
      'https://www.clariscompany.com/cdn/shop/files/ACARISideView.jpg?v=1746111834'
    ],
    'ACARI brings clarity with purpose. Its edge-to-edge illumination and sharp profile reflect a focus on refinement. Subtle technology — like the integrated hand motion sensor — enhances everyday use without distraction.',
    '60" x 36"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Edge-to-Edge Illumination',
      'Main Light Switch': 'Hand Motion Sensor',
      'Mirror Mount': 'Universal'
    },
    ['Edge-to-Edge Illumination', 'Sharp Profile', 'Hand Motion Sensor', 'Diamond Clear Vision', 'Refined Design'],
    'Large mirror with edge-to-edge LED illumination',
    true,
    false,
    undefined,
    ['single']
  ),

  createMirrorProduct(
    'mirror-ra-2',
    'DIMO',
    '',
    'Radiance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/005_2_DIMO_24x32_002_4e0fe5e0-8cea-44ea-a0ce-cb0c13d73fef.png?v=1751835095',
      'https://www.clariscompany.com/cdn/shop/files/DIMO-led-mirror-2000x2000_2.jpg?v=1751835095',
      'https://www.clariscompany.com/cdn/shop/files/DIMO-led-mirror-2000x2000_4.jpg?v=1751835095',
      'https://www.clariscompany.com/cdn/shop/files/20250706_1420_LuxuriousBathroomDesign_remix_01jzgf8n01e0hsaskktk4nt8cc.png?v=1751835181'
    ],
    'The Dimo Mirror combines a modern rectangular shape with rounded corners for a smooth, contemporary look. Its front lighting delivers bright, even illumination, and the dimmable touch sensor makes adjusting the light effortless.',
    '24" x 32"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '26 / 31',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Frontlit',
      'Main Light Switch': 'Button on Mirror',
      'Weight': '8.5kg / 14.14kg',
      'Mirror Mount': 'Vertical / Horizontal'
    },
    ['Diamond Clear Vision', 'Modern Rectangular Shape', 'Rounded Corners', 'Dimmable Touch Sensor', 'Front Lighting'],
    'Modern rectangular mirror with dimmable front lighting',
    true,
    false,
    undefined,
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-ra-3',
    'ORSO',
    '',
    'Radiance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/009_ORSO_001_f585da76-c724-4e32-a4e9-8d1b3dda5150.png?v=1751835968',
      'https://www.clariscompany.com/cdn/shop/files/orso2.png?v=1751835968',
      'https://www.clariscompany.com/cdn/shop/files/009_ORSO_002_09e626d2-2063-4bc1-b369-282219549c11.png?v=1751835968'
    ],
    'The Orso Mirror draws inspiration from Italian design, with frosted lines that create a striking visual around its circular shape. Its meticulous craftsmanship sets it apart, combining aesthetic excellence with practical features like a wave motion sensor and integrated anti-fog technology.',
    '32"',
    'round',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '25W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Wave Motion Sensor',
      'Weight': '11 kg',
      'Mirror Mount': 'Round'
    },
    ['Diamond Clear Vision', 'Italian Design', 'Frosted Lines', 'Wave Motion Sensor', 'Anti-Fog Technology'],
    'Italian-inspired circular mirror with frosted lines',
    true,
    true,
    undefined,
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-ra-4',
    'EVOLUTION',
    '',
    'Radiance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/EVOLUTION.jpg?v=1754316275',
      'https://www.clariscompany.com/cdn/shop/files/eclipse2.png?v=1754316275',
      'https://www.clariscompany.com/cdn/shop/files/007_EVOLUTION_47x23.5_001_3c52adbb-35e9-48ee-b916-af9e59c81546.png?v=1754316275',
      'https://www.clariscompany.com/cdn/shop/files/eclipse5.png?v=1754316275',
      'https://www.clariscompany.com/cdn/shop/files/eclipse4.png?v=1754316275'
    ],
    'The Evolution Mirror combines modern features with a sleek frosted frame that enhances its elegant design. Its 5x magnifier brings precision to your daily routine, while the bright front lighting ensures excellent visibility. The unique LED flow activates when the mirror is turned on.',
    '47" x 23.5"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '44W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit, Front lit 5x magnifier',
      'Main Light Switch': 'Button on Mirror',
      'Weight': '11.6 kg',
      'Mirror Mount': 'Horizontal'
    },
    ['Diamond Clear Vision', '5x Magnifier', 'LED Flow', 'Frosted Frame', 'Front & Back Lighting'],
    'Horizontal mirror with 5x magnifier and dual lighting',
    true,
    false,
    'Frosted Frame',
    ['single']
  ),

  createMirrorProduct(
    'mirror-ra-5',
    'MORENO',
    '',
    'Radiance Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/moreno_24x32_bd4dba29-e986-4c5f-b81d-3f8a9c0f919c.jpg?v=1747147415',
      'https://www.clariscompany.com/cdn/shop/files/moreno_36_x_30.jpg?v=1747147437'
    ],
    'With its refined proportions and frosted LED frame, the Moreno mirror offers a balanced blend of clarity and contemporary design. The integrated perimeter lighting provides soft, even illumination that works for both daily routines and subtle ambient lighting.',
    '24" x 32" / 36" x 30"',
    'rectangular',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '26 / 31',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Frontlit',
      'Main Light Switch': 'Button on Mirror',
      'Weight': '8.5kg / 14.14kg',
      'Mirror Mount': 'Vertical / Horizontal'
    },
    ['Diamond Clear Vision', 'Frosted LED Frame', 'Perimeter Lighting', 'Frameless Design', 'Polished Edge'],
    'Contemporary mirror with frosted LED perimeter lighting',
    true,
    false,
    'Frosted Frame',
    ['single']
  ),

  // TERRA COLLECTION (4 products)
  createMirrorProduct(
    'mirror-te-1',
    'STONE',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/Stone_d229722e-925f-4035-94fe-e7c2a7c4a082.png?v=1754170103',
      'https://www.clariscompany.com/cdn/shop/files/011_STONE_Diamond_001_be53b42a-9a62-458e-a2de-bdec7f15124a.png?v=1754170103',
      'https://www.clariscompany.com/cdn/shop/files/StoneBlue.png?v=1754170103'
    ],
    'The Stone Mirror is a bold and sculptural design inspired by the raw beauty of natural elements. Its asymmetrical shape brings artistry and modern elegance to life. Featuring an integrated dimmable touch sensor and anti-fog technology, it delivers both style and clarity.',
    '25.5" x 40.5"',
    'custom',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '126W',
      'Current': '1.05A',
      'Voltage': '120V',
      'Frequency': '60 HZ',
      'LED Color': 'White - 5000 - 5500K',
      'Lighting': 'Backlight',
      'Main Light Switch': 'Button on Mirror',
      'Mirror Mount': 'Universal'
    },
    ['Diamond Clear Vision', 'Dimmable Touch Sensor', 'Anti-Fog Technology', 'Asymmetrical Design', 'Integrated Ambient Lighting'],
    'Sculptural asymmetrical mirror inspired by natural stone',
    true,
    true,
    undefined,
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-te-2',
    'BUTTERFLY',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/002_BUTTERFLY_L_R_-_26_X_43.5_2_MIRRORS_001_d8f46adc-a044-40f8-8441-9846dc9650e1.png?v=1739995883',
      'https://www.clariscompany.com/cdn/shop/files/butterfly.png?v=1751840323',
      'https://www.clariscompany.com/cdn/shop/files/002_BUTTERFLY_L_R_-_26_X_43.5_2_MIRRORS_002_1b6b5767-03a3-430e-be4d-e55e4deaa5a3.png?v=1751840323',
      'https://www.clariscompany.com/cdn/shop/files/Butterfly_at_night.png?v=1754241666',
      'https://www.clariscompany.com/cdn/shop/files/002_BUTTERFLY_L_-_26_X_43.5_002_2a3699bb-511f-4189-9aff-11b325f71fe7.png?v=1751840323'
    ],
    'The Butterfly Mirror captures modern artistry with its unique, asymmetrical design inspired by butterfly wings. Its illuminated edges highlight the dynamic shape, creating a bold and sophisticated presence. Perfect for double vanities, the mirrors work beautifully together.',
    '26" x 43.5"',
    'custom',
    {
      'Size': '26" x 43.5"',
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '37W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Hardwire',
      'Weight': '20 kgs',
      'Mirror Mount': 'Vertical'
    },
    ['Diamond Clear Vision', 'Asymmetrical Design', 'Illuminated Edges', 'Single/Double Options', 'Hardwire Installation'],
    'Unique butterfly-wing shaped mirror with illuminated edges',
    true,
    false,
    undefined,
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-te-3',
    'PEBBLE',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/20250708_1535_ElegantBathroomMirror_remix_01jznrc2c6exhb3tthey1w9hgg.png?v=1754170596',
      'https://www.clariscompany.com/cdn/shop/files/010_PEBBLE_25.5x41_002_ff059098-7fe8-4e3a-9f71-a7f03d4727c5.png?v=1754170596',
      'https://www.clariscompany.com/cdn/shop/files/pebble2Untitled_design_2-gigapixel-highfidelityv2-2x.jpg?v=1754170596'
    ],
    'The Pebble Mirror features an organic, freeform design inspired by the smooth, natural contours of river stones. Its asymmetrical shape adds a touch of modern artistry, while its illuminated edges create a soft and ambient glow. Designed with universal mounting, it can be hung in four positions.',
    '25.5" x 41"',
    'custom',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '30W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Hardwire',
      'Weight': '11 kg',
      'Mirror Mount': 'Universal'
    },
    ['Diamond Clear Vision', 'Organic Freeform Design', 'Universal Mounting', 'Illuminated Edges', 'Four Position Hanging'],
    'Organic pebble-shaped mirror with soft ambient glow',
    true,
    false,
    undefined,
    ['single', 'double']
  ),

  createMirrorProduct(
    'mirror-te-4',
    'COMO',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/COMO_light.jpg?v=1754316175',
      'https://www.clariscompany.com/cdn/shop/files/003_COMO_39.5_x_33.5_001_0255bba0-7868-40dc-b3d8-98ae9e3c1a97.png?v=1754316175',
      'https://www.clariscompany.com/cdn/shop/files/COMO_nightime.png?v=1754316175',
      'https://www.clariscompany.com/cdn/shop/files/COMO.png?v=1754316175',
      'https://www.clariscompany.com/cdn/shop/files/comowide.png?v=1754316175'
    ],
    'The COMO Mirror is a striking design inspired by the phases of the moon. Its unique, slightly offset round shape offers a creative and dynamic aesthetic, enhanced by its ability to rotate to three distinct positions. With softly illuminated edges, it creates an atmospheric glow.',
    '39.5" x 33.5"',
    'custom',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '37W',
      'Frequency': '60',
      'LED Color': 'White',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Hardwire',
      'Weight': '13 kg',
      'Mirror Mount': 'Left Mount, Centre Mount, Right Mount'
    },
    ['Diamond Clear Vision', 'Moon Phase Design', 'Three Position Rotation', 'Illuminated Edges', 'Versatile Mounting'],
    'Moon-phase inspired mirror with three mounting positions',
    true,
    false,
    undefined,
    ['single']
  ),

  createMirrorProduct(
    'mirror-te-5',
    'VITA',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/VICO1.jpg?v=1759006768&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/VICO_MIRROR.webp?v=1759006768&width=1000',
      'https://www.clariscompany.com/cdn/shop/files/20250723_1910_EveningBathroomGlow_remix_01k0wrmn46egabrmpag2p6cfjr.png?v=1759006768&width=1000',
      'https://www.clariscompany.com/cdn/shop/files/assets_task_01k66cq08yeyarw7aza4q48js2_1759004000_img_1.webp?v=1759006768&width=1000'
    ],
    'VITA is soft in shape but precise in design. Its rounded edges give it a gentle profile, while the slim inner frame of white LED light brings structure and clarity. The lighting is clean and consistent, ideal for both everyday use and thoughtful design.',
    '32" x 24"',
    'oval',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'LED Color': 'White',
      'Lighting': 'Inner Frame LED',
      'Main Light Switch': 'Touch Sensor'
    },
    ['Diamond Clear Vision', 'Rounded Edges', 'Slim Inner Frame LED', 'Gentle Profile', 'Clean Consistent Lighting'],
    'Soft-shaped mirror with slim inner frame LED lighting',
    true,
    false,
    undefined,
    ['single']
  ),

  createMirrorProduct(
    'mirror-te-6',
    'STONE Sensor',
    '',
    'Terra Collection',
    [
      'https://www.clariscompany.com/cdn/shop/files/mirrorStone3.jpg?v=1760624141&width=1400',
      'https://www.clariscompany.com/cdn/shop/files/mirrorStone3warm.jpg?v=1760624166&width=1400'
    ],
    'The Stone Mirror is a bold and sculptural design inspired by the raw beauty of natural elements. Its asymmetrical shape brings artistry and modern elegance to life. Featuring an integrated dimmable touch sensor and anti-fog technology, it delivers both style and clarity. Carefully crafted with precision, the Stone Mirror embodies a perfect balance of innovation and design.',
    '48" x 36"',
    'custom',
    {
      'Mirror Glass': 'Diamond Clear Vision',
      'Mirror Glass Thickness': '4mm',
      'Total Mirror Thickness': '24mm',
      'Power (Watt)': '126W',
      'Current': '1.05A',
      'Voltage': '120V',
      'Frequency': '60 HZ',
      'LED Color': 'White, Natural, Warm',
      'Lighting': 'Backlit',
      'Main Light Switch': 'Wave Motion Sensor',
      'Anti Fog': 'Integrated'
    },
    ['Diamond Clear Vision', 'Asymmetrical Shape', 'Sculptural Design', 'Dimmable Touch Sensor', 'Anti-Fog Technology', 'Wave Motion Sensor', 'Natural Elements Inspired'],
    'Bold sculptural mirror with dimmable sensor and anti-fog',
    true,
    true,
    undefined,
    ['single', 'double']
  )
];

// NOTE: Double Vanity Collection and Single Vanity Collection products use local image paths.
// These will be added once the user provides the downloaded images and specifies the correct paths.
// Collections to add later:
// - Double Vanity Collection (11 products) - uses /src/assets/mirrors/double-vanity/ paths
// - Single Vanity Collection (12 products) - uses /src/assets/mirrors/single-vanity/ paths
