import { Navigate, useParams } from 'react-router-dom';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';
import { vanityProducts } from '../../../data/vanityProducts';

const VanityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/products/vanities" replace />;
  }

  const product = vanityProducts.find((item) => item.slug === slug);

  if (!product) {
    return <Navigate to="/products/vanities" replace />;
  }

  return (
    <ProductDetailLayout
      {...product}
      seoTags={['Bathroom Vanities', 'Modern Storage', 'Custom Design']}
    />
  );
};

export default VanityDetailPage;

