/**
 * Product Categories
 * Note: Hardware and Lighting are excluded as they don't have product data
 */
export type ProductCategory = 
  | "quartz" 
  | "vanity" 
  | "mirror" 
  | "flooring" 
  | "faucet" 
  | "toilet"
  | "sink";

export interface ProductSpec {
  label: string;
  value: string;
}

/**
 * Shared fields used everywhere.
 */
export interface BaseProduct {
  id: string;
  slug: string; // used in URL
  name: string;
  brand?: string;
  category: ProductCategory;
  images: string[];
  shortDescription?: string;
  description: string;

  /**
   * Keep this even with advanced typing.
   * It gives you flexible display specs (great for simple UI).
   */
  specs?: ProductSpec[];

  tags?: string[];
  inStock?: boolean;
}

/**
 * Category-specific fields
 */
export interface QuartzProduct extends BaseProduct {
  category: "quartz";
  collection?: string;
  subcategory?: string;
  thickness?: "2cm" | "3cm" | string[];
  finish?: "polished" | "honed" | "leathered" | string;
  slabSize?: string; // e.g. "126\" x 63\""
  features?: string[];
}

export interface VanityProduct extends BaseProduct {
  category: "vanity";
  size?: string; // e.g. "36\"", "48\"", "60\""
  sizeInches?: number; // e.g. 36, 48, 60
  sinkCount?: 1 | 2 | number;
  mountingType?: "freestanding" | "wall-mounted" | string;
  material?: string; // e.g. "MDF", "Solid wood"
  finish?: string;
  hasSoftClose?: boolean;
  color?: string;
}

export interface MirrorProduct extends BaseProduct {
  category: "mirror";
  collection?: string;
  shape?: "round" | "rectangular" | "oval" | "arch" | string;
  widthInches?: number;
  heightInches?: number;
  size?: string;
  hasLed?: boolean;
  hasAntiFog?: boolean;
  frameFinish?: string; // e.g. "matte black"
  finish?: string;
  vanityType?: ('single' | 'double')[];
}

export interface FlooringProduct extends BaseProduct {
  category: "flooring";
  flooringType?: "vinyl" | "laminate" | "hardwood" | "tile" | string;
  colorTone?: "light" | "medium" | "dark" | string;
  plankSize?: string; // e.g. "7\" x 48\""
  size?: string;
  thickness?: string;
  waterproof?: boolean;
  finish?: string;
}

export interface FaucetProduct extends BaseProduct {
  category: "faucet";
  faucetCategory?: "kitchen" | "bathroom" | "shower" | string;
  finish?: string; // e.g. "Chrome", "Matte Black", "Brushed Nickel"
  spoutHeight?: string;
  spoutReach?: string;
  handleType?: "single" | "double" | string;
  mountingType?: "deck-mount" | "wall-mount" | string;
  flowRate?: string; // e.g. "1.8 GPM"
}

export interface ToiletProduct extends BaseProduct {
  category: "toilet";
  toiletType?: "one-piece" | "two-piece" | "wall-mounted" | "smart" | string;
  flushType?: "dual-flush" | "single-flush" | "touchless" | string;
  bowlHeight?: "standard" | "comfort" | "ADA" | string;
  roughIn?: "10\"" | "12\"" | "14\"" | string;
  waterUsage?: string; // e.g. "1.28 GPF"
  seatIncluded?: boolean;
  features?: string[];
}

export interface SinkProduct extends BaseProduct {
  category: "sink";
  sinkType?: "kitchen" | "bathroom" | "vessel" | "undermount" | "drop-in" | string;
  material?: "stainless-steel" | "ceramic" | "granite" | "composite" | string;
  bowlCount?: 1 | 2 | 3 | number;
  mountingType?: "undermount" | "drop-in" | "vessel" | "wall-mount" | string;
  size?: string;
  finish?: string;
  drainSize?: string; // e.g. "3.5\""
  color?: string;
}

/**
 * One union type for your app.
 * TypeScript will narrow this based on the category discriminant.
 */
export type Product =
  | QuartzProduct
  | VanityProduct
  | MirrorProduct
  | FlooringProduct
  | FaucetProduct
  | ToiletProduct
  | SinkProduct;

