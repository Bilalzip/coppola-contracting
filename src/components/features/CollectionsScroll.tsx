import { useState, useEffect, useRef } from 'react';

const collections = [
  {
    id: 'all',
    title: 'All',
    subtitle: 'Complete mirror collection',
    color: 'bg-gradient-to-br from-neutral-50 to-neutral-100',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'concept-studio',
    title: 'Concept Studio™',
    subtitle: 'Modern design concepts',
    color: 'bg-gradient-to-br from-stone-50 to-stone-100',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'elegance',
    title: 'Elegance Collection™',
    subtitle: 'Sophisticated elegance',
    color: 'bg-gradient-to-br from-gray-50 to-gray-100',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'harmonia',
    title: 'Harmonia Collection™',
    subtitle: 'Harmonious designs',
    color: 'bg-gradient-to-br from-zinc-50 to-zinc-100',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'media',
    title: 'Media Collection™',
    subtitle: 'Smart mirror technology',
    color: 'bg-gradient-to-br from-slate-50 to-slate-100',
    image: 'https://images.pexels.com/photos/1090644/pexels-photo-1090644.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'origin',
    title: 'Origin Collection™',
    subtitle: 'Classic origins',
    color: 'bg-gradient-to-br from-neutral-100 to-neutral-200',
    image: 'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'radiance',
    title: 'Radiance Collection™',
    subtitle: 'Illuminated beauty',
    color: 'bg-gradient-to-br from-stone-100 to-stone-200',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'terra',
    title: 'Terra Collection™',
    subtitle: 'Natural earth tones',
    color: 'bg-gradient-to-br from-gray-100 to-gray-200',
    image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const CollectionsScroll = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const cards = document.querySelectorAll('.reveal-card');
    cards.forEach(card => observerRef.current?.observe(card));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="relative bg-white dark:bg-neutral-900 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-serif text-neutral-900 dark:text-neutral-50 mb-4 transition-colors duration-300"
            style={{ fontFamily: 'EB Garamond, serif' }}
          >
            Our Collections
          </h2>
          <p
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto transition-colors duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Discover our curated selection of premium mirror collections, each designed to elevate your space
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {collections.map((collection) => {
            const isFlipped = flippedCards.has(collection.id);

            return (
              <div
                key={collection.id}
                data-card-id={collection.id}
                className={`reveal-card flip-card-container group cursor-pointer transition-all duration-700 ${
                  visibleCards.has(collection.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                onClick={() => toggleFlip(collection.id)}
                style={{
                  perspective: '1000px',
                  height: '320px',
                  transitionDelay: `${collections.findIndex(c => c.id === collection.id) * 100}ms`
                }}
              >
                <div
                  className={`flip-card-inner relative w-full h-full transition-transform duration-500 ease-out`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div
                    className={`flip-card-face absolute w-full h-full rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 transition-all duration-500 overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="relative h-full flex flex-col">
                      <div className="relative h-2/3 overflow-hidden">
                        <img
                          src={collection.image}
                          alt={collection.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-black/80 dark:via-black/40"></div>
                      </div>

                      <div className="h-1/3 p-4 flex flex-col justify-center">
                        <h3
                          className="text-xl font-serif text-neutral-900 dark:text-neutral-50 mb-1 line-clamp-1 transition-colors duration-300"
                          style={{ fontFamily: 'EB Garamond, serif' }}
                        >
                          {collection.title}
                        </h3>
                        <p
                          className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 transition-colors duration-300"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {collection.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flip-card-face absolute w-full h-full rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-md dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col justify-center items-center text-center transition-all duration-300`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="mb-4">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        loading="lazy"
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 ring-4 ring-white dark:ring-neutral-700 shadow-lg dark:opacity-90 transition-all duration-300"
                      />
                    </div>
                    <h3
                      className="text-2xl font-serif text-neutral-900 dark:text-neutral-50 mb-3 transition-colors duration-300"
                      style={{ fontFamily: 'EB Garamond, serif' }}
                    >
                      {collection.title}
                    </h3>
                    <p
                      className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 transition-colors duration-300"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {collection.subtitle}
                    </p>
                    <button
                      className="px-5 py-2 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 text-xs font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-105 shadow-md"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-12 md:p-16 shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-neutral-700 dark:border-neutral-600 transition-all duration-300">
            <h3
              className="text-4xl md:text-5xl font-serif text-white dark:text-neutral-50 mb-6 transition-colors duration-300"
              style={{ fontFamily: 'EB Garamond, serif' }}
            >
              Ready to Transform Your Space?
            </h3>
            <p
              className="text-lg text-neutral-300 dark:text-neutral-400 mb-8 max-w-2xl mx-auto transition-colors duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Explore our complete collection of premium mirrors or get in touch with our design experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-white dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900 text-base font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Browse All Collections
              </button>
              <button
                className="px-8 py-4 bg-transparent border-2 border-white dark:border-neutral-300 text-white dark:text-neutral-50 text-base font-semibold rounded-lg hover:bg-white hover:text-neutral-900 dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsScroll;




