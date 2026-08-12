/**
 * Type guards for Product discriminated union
 * These help TypeScript narrow types based on the category field
 */
import type { 
  Product, 
  QuartzProduct, 
  VanityProduct, 
  MirrorProduct, 
  FlooringProduct,
  FaucetProduct,
  ToiletProduct,
  SinkProduct
} from "./products";

export const isQuartz = (p: Product): p is QuartzProduct => 
  p.category === "quartz";

export const isVanity = (p: Product): p is VanityProduct => 
  p.category === "vanity";

export const isMirror = (p: Product): p is MirrorProduct => 
  p.category === "mirror";

export const isFlooring = (p: Product): p is FlooringProduct => 
  p.category === "flooring";

export const isFaucet = (p: Product): p is FaucetProduct => 
  p.category === "faucet";

export const isToilet = (p: Product): p is ToiletProduct => 
  p.category === "toilet";

export const isSink = (p: Product): p is SinkProduct => 
  p.category === "sink";

/**
 * Get human-readable category name
 */
export const getCategoryDisplayName = (category: Product["category"]): string => {
  const names: Record<Product["category"], string> = {
    quartz: "Quartz Countertops",
    vanity: "Bathroom Vanities",
    mirror: "Mirrors",
    flooring: "Flooring",
    faucet: "Faucets",
    toilet: "Toilets",
    sink: "Sinks"
  };
  return names[category];
};

