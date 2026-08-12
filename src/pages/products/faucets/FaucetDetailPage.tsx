import { useParams, Navigate } from 'react-router-dom';
import { faucetProducts } from '../../../data/faucetProducts';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';

const FaucetDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/products/faucets" replace />;
  }

  const product = faucetProducts.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products/faucets" replace />;
  }

  // Get related products from same category, excluding current product
  const relatedProducts = faucetProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      images: p.images,
      category: 'faucet',
    }));

  return (
    <ProductDetailLayout
      name={product.name}
      brand={product.brand || 'Styluxe'}
      category="faucet"
      images={product.images}
      description={product.description}
      shortDescription={product.shortDescription || product.description.substring(0, 150)}
      specs={product.specifications}
      currentProductId={product.id}
      relatedProducts={relatedProducts}
      seoTags={['Designer Faucets', 'Luxury Kitchen & Bath', 'Premium Quality']}
    />
  );
};

export default FaucetDetailPage;

