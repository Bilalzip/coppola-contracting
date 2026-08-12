import { Navigate, useParams } from 'react-router-dom';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';
import { quartzProducts } from '../../../data/quartzProducts';

const QuartzDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/quartz-countertops" replace />;
  }

  const product = quartzProducts.find((item) => item.slug === slug);

  if (!product) {
    return <Navigate to="/quartz-countertops" replace />;
  }

  const specs = (product.specs ?? []).reduce<Record<string, string>>((acc, spec) => {
    acc[spec.label] = spec.value;
    return acc;
  }, {});

  const relatedProducts = quartzProducts
    .filter((item) => item.slug !== product.slug && item.collection === product.collection)
    .slice(0, 4)
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
      brand={product.brand ?? 'COPPOLA QUARTZ'}
      category={product.category}
      images={product.images}
      shortDescription={product.shortDescription ?? ''}
      description={product.description}
      specs={specs}
      currentProductId={product.id}
      collection={product.collection}
      relatedProducts={relatedProducts}
      seoTags={['Quartz Countertops', 'Engineered Stone', 'Luxury Surfaces']}
    />
  );
};

export default QuartzDetailPage;
