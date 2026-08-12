import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#2C2C2C] dark:bg-[#111111] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-[#F8F9FA] mb-4">
          Stay Updated
        </h3>
        <p className="text-[#CCCCCC] mb-6 text-sm md:text-base">
          Subscribe to our newsletter for the latest updates on products, design tips, and exclusive offers.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-400 font-medium"
          >
            Thank you for subscribing!
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded bg-[#F8F9FA] dark:bg-[#1a1a1a] text-[#2C2C2C] dark:text-[#F8F9FA] placeholder-[#666666] dark:placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#666666]"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-[#F8F9FA] dark:bg-[#F8F9FA] text-[#2C2C2C] hover:opacity-90"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default NewsletterBanner;

