import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductDetailLayout from '../../../components/features/ProductDetailLayout';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';

const FaucetDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('products')
      .select('*')
      .eq('category', 'faucet')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        if (!data) {
          setNotFound(true);
        } else {
          setProduct(data);
          supabase
            .from('products')
            .select('*')
            .eq('category', 'faucet')
            .neq('id', data.id)
            .limit(4)
            .then(({ data: rel }) => setRelated(rel ?? []));
        }
        setLoading(false);
      });
  }, [slug]);

  if (!slug || notFound) return <Navigate to="/products/faucets" replace />;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#001f54]" />
      </div>
    );
  }

  if (!product) return <Navigate to="/products/faucets" replace />;

  const specsRecord: Record<string, string> = {};
  (product.specs ?? []).forEach(s => { specsRecord[s.label] = s.value; });

  return (
    <ProductDetailLayout
      name={product.name}
      brand={product.brand ?? 'Styluxe'}
      category={product.category}
      images={product.images}
      description={product.description ?? ''}
      shortDescription={product.short_description ?? product.description?.substring(0, 150) ?? ''}
      specs={specsRecord}
      currentProductId={product.id}
      relatedProducts={related.map(r => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        images: r.images,
        category: r.category,
      }))}
      seoTags={['Designer Faucets', 'Luxury Kitchen & Bath', 'Premium Quality']}
    />
  );
};

export default FaucetDetailPage;
