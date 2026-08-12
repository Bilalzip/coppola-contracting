import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

const socials = [
  { label: 'Facebook', Icon: Facebook },
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
];

const businessHours = [
  { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-['Poppins',sans-serif]";

const fieldClass =
  "w-full rounded-lg bg-gray-50 dark:bg-white/[0.04] border border-transparent dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-oxford-blue/30 focus:bg-white dark:focus:bg-white/[0.07] transition-colors duration-200 font-['Poppins',sans-serif]";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('leads').insert({
      type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      message: formData.message,
    });

    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-page-title font-semibold text-gray-900 dark:text-white mb-6 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get In <span style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #001f54 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Touch</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Have a question or ready to start your project? We're here to help bring your vision to life.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Panel */}
        <motion.div
          className="rounded-[2rem] bg-gray-100/70 dark:bg-white/[0.03] border border-oxford-blue/5 dark:border-white/10 p-5 sm:p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16">
            {/* Left: heading, hours, contact details */}
            <div className="flex flex-col lg:py-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white leading-[1.15] max-w-sm">
                Send us a message
              </h2>

              <div className="mt-10 lg:mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-4 font-['Poppins',sans-serif]">
                  Business Hours
                </p>
                <dl className="space-y-2 max-w-xs">
                  {businessHours.map(({ day, time }) => (
                    <div key={day} className="flex justify-between gap-4">
                      <dt className="text-sm text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">{day}</dt>
                      <dd className="text-sm text-gray-900 dark:text-white font-['Poppins',sans-serif]">{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Details anchor to the bottom of the column, as in the layout */}
              <div className="mt-12 lg:mt-auto lg:pt-12">
                <div className="space-y-1.5 font-['Poppins',sans-serif]">
                  <a
                    href="mailto:info@coppolacontracting.net"
                    className="block text-sm text-gray-900 dark:text-white hover:text-oxford-blue dark:hover:text-gray-300 transition-colors"
                  >
                    info@coppolacontracting.net
                  </a>
                  <a
                    href="tel:+18073459989"
                    className="block text-sm text-gray-900 dark:text-white hover:text-oxford-blue dark:hover:text-gray-300 transition-colors"
                  >
                    +1 (807) 345 9989
                  </a>
                  <p className="text-sm text-gray-900 dark:text-white">
                    269 Red River Rd, Suite 116 #1040<br />
                    Thunder Bay ON, P7B 1A9, Canada
                  </p>
                </div>

                <div className="flex items-center gap-2.5 mt-6">
                  {socials.map(({ label, Icon }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-white/[0.06] border border-oxford-blue/10 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[#1a1d2e] hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <Link to="/quote" className="inline-block mt-6">
                  <Button variant="primary" size="sm">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: form card */}
            <div className="rounded-3xl bg-white dark:bg-[#0F0F0F] border border-oxford-blue/5 dark:border-white/10 p-5 sm:p-8">
              {submitStatus === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-sm text-green-800 dark:text-green-200 font-['Poppins',sans-serif]">
                    ✓ Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="rounded-[2rem] bg-gray-100/70 dark:bg-white/[0.03] border border-oxford-blue/5 dark:border-white/10 p-2">
            <div className="w-full h-[420px] rounded-[1.6rem] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.892!2d-89.24341!3d48.38476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d592b1c9f6f6f6f%3A0x1a2b3c4d5e6f7a8b!2s269%20Red%20River%20Rd%2C%20Thunder%20Bay%2C%20ON%20P7B%201A9%2C%20Canada!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coppola Home Location - 269 Red River Rd, Thunder Bay, ON"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
