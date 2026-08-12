import { Navigate, useParams } from 'react-router-dom';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';
import { flooringProducts } from '../../../data/flooringProducts';

const FlooringDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/products/flooring" replace />;
  }

  const product = flooringProducts.find((item) => item.slug === slug);

  if (!product) {
    return <Navigate to="/products/flooring" replace />;
  }

  return <ProductDetailLayout {...product} />;
};

export default FlooringDetailPage;

