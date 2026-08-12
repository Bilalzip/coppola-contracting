import { useParams, Navigate } from 'react-router-dom';
import { toiletProducts } from '../../../data/toiletProducts';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';

const ToiletDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the product by slug
  const product = toiletProducts.find(p => p.slug === slug);
  
  // If product not found, redirect to toilets listing
  if (!product) {
    return <Navigate to="/products/toilets" replace />;
  }
  
  // Render the product using the reusable layout
  return (
    <ProductDetailLayout
      name={product.name}
      brand={product.brand}
      category={product.category}
      images={product.images}
      shortDescription={product.shortDescription}
      description={product.description}
      specs={product.specs}
      tags={product.tags}
      seoTags={['Smart Toilets', 'Water Saving', 'Premium Ceramic']}
    />
  );
};

export default ToiletDetailPage;

