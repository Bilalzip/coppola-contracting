/**
 * Product helper utilities
 * Examples of how to use the discriminated union types
 */
import type { Product } from "./products";
import { isQuartz, isVanity, isMirror, isFlooring, isFaucet, isToilet, isSink } from "./productGuards";

/**
 * Example: Get category-specific info with type safety
 */
export const getProductDetailInfo = (product: Product): string => {
  if (isQuartz(product)) {
    // TypeScript knows this is QuartzProduct
    return `Thickness: ${product.thickness || 'N/A'}, Finish: ${product.finish || 'N/A'}`;
  }
  
  if (isVanity(product)) {
    // TypeScript knows this is VanityProduct
    return `Size: ${product.size || 'N/A'}, Sink Count: ${product.sinkCount || 1}`;
  }
  
  if (isMirror(product)) {
    // TypeScript knows this is MirrorProduct
    return `Shape: ${product.shape || 'N/A'}, LED: ${product.hasLed ? 'Yes' : 'No'}`;
  }
  
  if (isFlooring(product)) {
    // TypeScript knows this is FlooringProduct
    return `Type: ${product.flooringType || 'N/A'}, Waterproof: ${product.waterproof ? 'Yes' : 'No'}`;
  }
  
  if (isFaucet(product)) {
    // TypeScript knows this is FaucetProduct
    return `Type: ${product.faucetCategory || 'N/A'}, Finish: ${product.finish || 'N/A'}`;
  }
  
  if (isToilet(product)) {
    // TypeScript knows this is ToiletProduct
    return `Type: ${product.toiletType || 'N/A'}, Flush: ${product.flushType || 'N/A'}`;
  }
  
  if (isSink(product)) {
    // TypeScript knows this is SinkProduct
    return `Type: ${product.sinkType || 'N/A'}, Material: ${product.material || 'N/A'}`;
  }
  
  return 'Product details not available';
};

/**
 * Example: Filter products by type-specific criteria
 */
export const filterProductsByFeature = (products: Product[], feature: string): Product[] => {
  return products.filter(product => {
    // TypeScript will narrow the type in each branch
    switch (product.category) {
      case "quartz":
        return product.finish?.toLowerCase().includes(feature.toLowerCase());
      case "vanity":
        return product.color?.toLowerCase().includes(feature.toLowerCase());
      case "mirror":
        return feature === "led" ? product.hasLed : false;
      case "flooring":
        return feature === "waterproof" ? product.waterproof : false;
      case "faucet":
        return product.finish?.toLowerCase().includes(feature.toLowerCase());
      case "toilet":
        return product.features?.some(f => f.toLowerCase().includes(feature.toLowerCase()));
      case "sink":
        return product.material?.toLowerCase().includes(feature.toLowerCase());
      default:
        return false;
    }
  });
};

