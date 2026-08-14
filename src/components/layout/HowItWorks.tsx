import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import { usePageSections } from '../../lib/usePageSections';
import type { HowItWorksStep } from '../../types/database';

interface CtaItem {
  label: string;
  link: string;
}

const HowItWorks = () => {
  const navigate = useNavigate();
  const { section } = usePageSections('home');
  const intro = section('how_it_works', {
    heading: 'A clear path from start to finish',
    subheading: 'How It Works',
    body: 'Clear steps, one dedicated team, and a transparent plan before anything goes into production.',
    heading_color: '#111827',
    subheading_color: '#111827',
    body_color: '#4B5563',
    items: [
      { label: 'Get Your Estimate', link: '/contact' },
      { label: 'See The Full Process', link: '/custom-cabinetry' },
    ],
  });
  const ctas = intro.items as CtaItem[];

  const [steps, setSteps] = useState<HowItWorksStep[]>([]);

  useEffect(() => {
    supabase
      .from('how_it_works_steps')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setSteps(data ?? []));
  }, []);

  if (steps.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-gray-400" />
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em] font-secondary"
                style={{ color: intro.subheading_color }}
              >
                {intro.subheading}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight"
              style={{ color: intro.heading_color }}
            >
              {intro.heading}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed" style={{ color: intro.body_color }}>
            {intro.body}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 sm:p-7 ${
                index < steps.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-800' : ''
              } ${index % 2 === 1 ? 'sm:border-b-0' : ''}`}
            >
              <p className="text-3xl sm:text-4xl font-serif font-normal text-gray-300 dark:text-gray-700 mb-3">
                {String(step.step_number).padStart(2, '0')}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 font-secondary mb-3">
                {step.phase_label}
              </p>
              <h3 className="text-lg font-serif font-normal text-gray-900 dark:text-white mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {ctas.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10">
            {ctas.map((cta, index) => (
              <Button
                key={cta.label}
                variant={index === 0 ? 'primary' : 'outline'}
                size="md"
                className="flex items-center gap-2 group"
                onClick={() => navigate(cta.link)}
              >
                {cta.label}
                {index === 0 && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
