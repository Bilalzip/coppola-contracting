-- Run this once in Supabase SQL Editor to add the page_sections table.
-- (schema.sql has also been updated so future fresh setups include this automatically.)
--
-- One row per editable section of a page. `items` holds repeating card/bullet
-- data (values vary by section — see seed data below for shape per section).

create table public.page_sections (
  id uuid default gen_random_uuid() primary key,
  page_key text not null,
  section_key text not null,
  sort_order integer not null default 0,
  label text not null,
  heading text,
  subheading text,
  body text,
  image_url text,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  unique (page_key, section_key)
);

create trigger page_sections_updated_at before update on public.page_sections
  for each row execute function update_updated_at();

alter table public.page_sections enable row level security;

create policy "Public read page sections" on public.page_sections for select using (true);
create policy "Admin update page sections" on public.page_sections for all using (auth.role() = 'authenticated');

-- Seed with the current hardcoded copy, so nothing on the live site changes
-- until the client edits something in Admin → Appearance.

insert into public.page_sections (page_key, section_key, sort_order, label, heading, subheading, body, image_url, items) values

-- ===== HOME =====
('home', 'hero', 1, 'Hero', 'Custom Kitchens & Bathrooms', 'Crafted with precision',
  'Transform your living spaces with elegant millwork and bespoke design solutions. Premium materials, refined finishes, and a timeless sense of style that reflects who you are.',
  null, '[]'::jsonb),
('home', 'collections_intro', 2, 'Signature Collections Intro', 'Our signature collections', null,
  'Thoughtfully curated collections crafted to elevate every room with timeless style and exceptional craftsmanship.',
  null, '[]'::jsonb),
('home', 'why_choose_intro', 3, 'Why Choose Intro', 'Why choose Coppola', 'Excellence',
  'Uncompromising quality meets innovative design.',
  null, '[]'::jsonb),

-- ===== ABOUT US =====
('about', 'hero', 1, 'Hero', 'Coppola Home', 'Premium Kitchen & Bathroom Showroom',
  'We are a trusted destination for discerning homeowners, designers, and builders seeking thoughtfully selected products that elevate the everyday.',
  '/assets/site/coppola-about-banner-image .jpg', '[]'::jsonb),
('about', 'story', 2, 'Our Story', 'A Legacy of Excellence', 'Our Story',
  'At Coppola Home, we bring over two decades of expertise in transforming kitchens and bathrooms into spaces of unparalleled elegance and functionality. Founded on principles of meticulous craftsmanship and unwavering dedication to quality, we''ve established ourselves as Thunder Bay''s premier destination for luxury home interiors.

Our showroom showcases an extensive collection of premium products from the world''s most respected manufacturers. From custom cabinetry and millwork to designer fixtures and hardware, every piece is carefully selected to meet our exacting standards.',
  '/assets/site/coppola-about-banner-image .jpg', '[]'::jsonb),
('about', 'values', 3, 'Our Values', 'What We Stand For', 'Our Values',
  'Our core values guide everything we do', null,
  '[
    {"title": "Passion", "description": "We love what we do and it shows in every project"},
    {"title": "Excellence", "description": "Commitment to the highest standards of quality"},
    {"title": "Partnership", "description": "Building lasting relationships with our clients"},
    {"title": "Integrity", "description": "Honest, transparent, and reliable service"}
  ]'::jsonb),
('about', 'why_choose', 4, 'Why Choose Us', 'Why Choose Coppola Home', 'Why Choose Us', null, null,
  '[
    {"title": "Extensive Showroom", "description": "Explore our 10,000+ sq ft showroom featuring the latest in kitchen and bathroom design"},
    {"title": "Expert Consultation", "description": "Our knowledgeable team provides personalized guidance for your project"},
    {"title": "Premium Brands", "description": "We partner with industry-leading manufacturers to bring you the best products"},
    {"title": "Timely Service", "description": "Efficient project management ensuring your timeline is met"},
    {"title": "Quality Assured", "description": "Every product meets our rigorous standards for durability and beauty"},
    {"title": "Ongoing Support", "description": "We are here for you from initial consultation through installation and beyond"}
  ]'::jsonb),

-- ===== CUSTOM CABINETRY =====
('custom-cabinetry', 'hero', 1, 'Hero', 'Custom cabinetry masterpieces', null,
  'Precision engineering meets artisan craftsmanship in every cabinet we design and build.',
  '/gallery/24-1-2.jpg', '[]'::jsonb),
('custom-cabinetry', 'section_1', 2, 'Bespoke Cabinetry Design', 'Bespoke Cabinetry Design', null,
  'Transform your space with custom cabinetry that perfectly fits your style and requirements. Our expert craftsmen create beautiful, functional pieces using premium materials and innovative design solutions.',
  '/gallery/Copy-of-1-1.jpg',
  '["Custom sizing for perfect fit", "Premium wood selection", "Professional installation", "Lifetime warranty"]'::jsonb),
('custom-cabinetry', 'section_2', 3, 'Premium Materials & Craftsmanship', 'Premium Materials & Craftsmanship', null,
  'Our cabinetry combines elegant design with practical functionality, crafted to your exact specifications. We use only the finest materials and traditional techniques to ensure lasting beauty and durability.',
  '/gallery/Copy-of-1a-1500x1000.jpg',
  '["Personalized design consultation", "Quality craftsmanship guarantee", "Custom finishes and hardware", "Expert project management"]'::jsonb),
('custom-cabinetry', 'section_3', 4, 'Innovative Storage Solutions', 'Innovative Storage Solutions', null,
  'Maximize your space with intelligent storage solutions designed specifically for your needs. From hidden compartments to specialized organizers, we create cabinetry that works as hard as you do.',
  '/gallery/Copy-of-6-1-1500x1001.jpg',
  '["Smart storage integration", "Space optimization", "Custom organization systems", "Accessibility considerations"]'::jsonb),
('custom-cabinetry', 'section_4', 5, 'Commercial & Residential Excellence', 'Commercial & Residential Excellence', null,
  'Whether for your home or business, our cabinetry solutions deliver exceptional quality and performance. We handle projects of all sizes with the same attention to detail and commitment to excellence.',
  '/gallery/Copy-of-Image-28.jpg',
  '["Commercial-grade materials", "Large-scale project expertise", "On-time delivery guarantee", "Professional installation team"]'::jsonb),
('custom-cabinetry', 'cta', 6, 'Closing CTA', 'Start your cabinetry journey', null,
  'Tell us about your vision. We will bring it to life.', null, '[]'::jsonb),

-- ===== OUR EXPERTISE =====
('our-expertise', 'hero', 1, 'Hero', 'Our works', null,
  'A testament to precision, craftsmanship, and elegant design in every project we touch',
  null, '["Luxury", "Bespoke", "Refined"]'::jsonb),

-- ===== OUR WORKS =====
('our-works', 'hero', 1, 'Hero', 'Our Work', null,
  'Explore our portfolio of exceptional projects that showcase our commitment to quality craftsmanship, innovative design, and attention to detail.',
  null, '[]'::jsonb),
('our-works', 'empty_state', 2, 'Empty State (shown until projects are added)', 'Portfolio Coming Soon', null,
  'We''re currently curating our portfolio to showcase our finest residential and commercial projects. Each project represents our dedication to exceptional craftsmanship and innovative design solutions.',
  null, '[]'::jsonb),

-- ===== CONTACT =====
('contact', 'hero', 1, 'Hero', 'Get In Touch', null,
  'Have a question or ready to start your project? We''re here to help bring your vision to life.',
  null, '[]'::jsonb),

-- ===== GET QUOTE =====
('get-quote', 'hero', 1, 'Hero', 'Request your personalized quote', null,
  'Share a few project details below and our team will prepare a tailored estimate and next steps for your home transformation.',
  null, '[]'::jsonb),

-- ===== PRODUCTS (top-level grid page) =====
('products', 'hero', 1, 'Hero', 'Our Products', null,
  'Discover our complete collection of premium kitchen and bathroom products',
  '/assets/gallery/landing-header-carousel-image-10.jpg', '[]'::jsonb),
('products', 'cta', 2, 'Closing CTA', 'Need Help Choosing?', null,
  'Our experts are here to help you find the perfect products for your project', null, '[]'::jsonb);
