import { useParams, Navigate } from 'react-router-dom';
import { sinkProducts } from '../../../data/sinkProducts';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';

const SinkDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/products/sinks" replace />;
  }

  const product = sinkProducts.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products/sinks" replace />;
  }

  return (
    <ProductDetailLayout
      {...product}
      seoTags={['Designer Sinks', 'Luxury Bathroom', 'Artisan Quality']}
    />
  );
};

export default SinkDetailPage;

