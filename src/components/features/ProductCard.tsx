import React from "react";

// Fallback image path (moved to public folder)
const fallbackImage = '/product-images/product-1.png';

interface ProductCardProps {
  title: string;
  image: string;
  ctaLabel?: string;
  alt?: string;
  className?: string;
}

function ProductCard({
  title,
  image,
  ctaLabel = "VIEW PRODUCT",
  alt = title,
  className = ""
}: ProductCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage; // fallback image
  };

  return (
    <div className={`product-card ${className}`}>
      <img
        src={image}
        alt={alt}
        onError={handleImageError}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <h3>{title}</h3>
      <p>{ctaLabel}</p>
    </div>
  );
}

export default ProductCard;