import { Navigate, useParams } from 'react-router-dom';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';
import { mirrorsProducts } from '../../../data/mirrorsProducts';

const MirrorsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/products/mirrors" replace />;
  }

  const product = mirrorsProducts.find((item) => item.slug === slug);

  if (!product) {
    return <Navigate to="/products/mirrors" replace />;
  }

  // Transform specs array to object format for ProductDetailLayout
  const specsObject = product.specs?.reduce((acc, spec) => {
    acc[spec.label] = spec.value;
    return acc;
  }, {} as Record<string, string>) || {};

  // Get related products from same collection or similar products
  const relatedProducts = mirrorsProducts
    .filter((item) => {
      // Exclude current product
      if (item.id === product.id) return false;
      
      // Prioritize same collection
      if (product.collection && item.collection === product.collection) {
        return true;
      }
      
      // Or same vanity type (ensure both are arrays)
      if (
        product.vanityType && 
        Array.isArray(product.vanityType) && 
        item.vanityType && 
        Array.isArray(item.vanityType)
      ) {
        return product.vanityType.some((type) => item.vanityType?.includes(type));
      }
      
      return false;
    })
    .slice(0, 4) // Limit to 4 products
    .map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      images: item.images,
      collection: item.collection,
      category: item.category,
    }));

  return (
    <ProductDetailLayout
      name={product.name}
      brand={product.brand || ''}
      category={product.category}
      images={product.images}
      description={product.description}
      shortDescription={product.shortDescription || product.description.substring(0, 150)}
      specs={specsObject}
      currentProductId={product.id}
      collection={product.collection}
      relatedProducts={relatedProducts}
      seoTags={['LED Mirrors', 'Modern Design', 'Premium Quality']}
    />
  );
};

export default MirrorsDetailPage;
