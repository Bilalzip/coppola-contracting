-- Run this after add_brands.sql to seed the 15 brand logos that are
-- currently hardcoded on the site (public/assets/brands/brand1.png..15.png).
-- Optional: the home page carousel already falls back to these same files
-- if the brands table is empty, so this just makes them editable/reorderable
-- from Admin -> Partnered Brands instead of requiring a code change.
--
-- The logo_url values below point at the existing files served from
-- public/assets/brands/ — replace with real brand names once seeded (the
-- current "Brand 1".."Brand 15" labels are placeholders, not real names).

insert into public.brands (name, logo_url, sort_order, active) values
  ('Brand 1', '/assets/brands/brand1.png', 0, true),
  ('Brand 2', '/assets/brands/brand2.png', 1, true),
  ('Brand 3', '/assets/brands/brand3.png', 2, true),
  ('Brand 4', '/assets/brands/brand4.png', 3, true),
  ('Brand 5', '/assets/brands/brand5.png', 4, true),
  ('Brand 6', '/assets/brands/brand6.png', 5, true),
  ('Brand 7', '/assets/brands/brand7.png', 6, true),
  ('Brand 8', '/assets/brands/brand8.png', 7, true),
  ('Brand 9', '/assets/brands/brand9.png', 8, true),
  ('Brand 10', '/assets/brands/brand10.png', 9, true),
  ('Brand 11', '/assets/brands/brand11.png', 10, true),
  ('Brand 12', '/assets/brands/brand12.png', 11, true),
  ('Brand 13', '/assets/brands/brand13.png', 12, true),
  ('Brand 14', '/assets/brands/brand14.png', 13, true),
  ('Brand 15', '/assets/brands/brand15.png', 14, true);
