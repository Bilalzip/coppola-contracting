import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { usePageSections } from '../lib/usePageSections';
import { supabase } from '../lib/supabase';

const GENERIC_ERROR_MESSAGE =
  'Something went wrong sending your request. Please try again, or contact us directly.';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  kitchen: 'Kitchen renovation',
  bathroom: 'Bathroom renovation',
  cabinetry: 'Custom cabinetry',
  millwork: 'Millwork & feature walls',
  quartz: 'Quartz countertops',
  multiple: 'Multiple areas in the home',
  other: 'Other / Not listed',
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: 'As soon as possible',
  '1-3': 'Within 1–3 months',
  '3-6': 'Within 3–6 months',
  '6-12': 'Within 6–12 months',
  planning: "I'm just planning and gathering quotes",
};

const SCOPE_LABELS: Record<string, string> = {
  small: 'Small project (single room or feature)',
  medium: 'Medium project (a few rooms or areas)',
  large: 'Large project (full-home or major renovation)',
  custom: 'Fully custom project',
  consultation: 'Design consultation only',
};

const emptyFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  projectAddress: '',
  projectType: '',
  timeline: '',
  projectScope: '',
  projectDescription: '',
  contactMethod: 'email',
};

const GetQuote = () => {
  const { section } = usePageSections('get-quote');
  const hero = section('hero', {
    heading: 'Request your personalized quote',
    body: 'Share a few project details below and our team will prepare a tailored estimate and next steps for your home transformation.',
    heading_color: '#2C3539',
    body_color: '#5D6D74',
  });

  const [formData, setFormData] = useState(emptyFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('leads').insert({
        type: 'quote',
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone || null,
        address: formData.projectAddress || null,
        project_type: (PROJECT_TYPE_LABELS[formData.projectType] ?? formData.projectType) || null,
        timeline: (TIMELINE_LABELS[formData.timeline] ?? formData.timeline) || null,
        budget: (SCOPE_LABELS[formData.projectScope] ?? formData.projectScope) || null,
        message: formData.projectDescription,
        preferred_contact: formData.contactMethod,
      });

      if (error) {
        setErrorMessage(error.message || GENERIC_ERROR_MESSAGE);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData(emptyFormData);
      }
    } catch {
      setErrorMessage('Network error — please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] dark:bg-[#000000] pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1
            className="text-page-title font-medium mb-4 sm:mb-5 md:mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif', color: hero.heading_color }}
          >
            {hero.heading}
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto px-4"
            style={{ fontFamily: 'Poppins, sans-serif', color: hero.body_color }}
          >
            {hero.body}
          </p>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-sm border border-[#E5E7EB] dark:border-[#1a1a1a] p-6 sm:p-8 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {submitStatus === 'success' && (
              <motion.div
                key="success"
                className="mb-6 sm:mb-7 flex items-start gap-2.5 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800 dark:text-green-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Thank you — your quote request has been received. Our team will review the details and follow up soon.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                key="error"
                className="mb-6 sm:mb-7 flex items-start gap-2.5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {errorMessage || GENERIC_ERROR_MESSAGE}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 md:space-y-8">
            <fieldset disabled={isSubmitting} className="space-y-6 sm:space-y-7 md:space-y-8 disabled:opacity-60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="projectAddress"
                className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Project Address
              </label>
              <input
                type="text"
                id="projectAddress"
                name="projectAddress"
                placeholder="Street address, City, Province, Postal Code"
                value={formData.projectAddress}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div>
              <label
                htmlFor="projectType"
                className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
              <option value="">Select project type</option>
              <option value="kitchen">Kitchen renovation</option>
              <option value="bathroom">Bathroom renovation</option>
              <option value="cabinetry">Custom cabinetry</option>
              <option value="millwork">Millwork & feature walls</option>
              <option value="quartz">Quartz countertops</option>
              <option value="multiple">Multiple areas in the home</option>
              <option value="other">Other / Not listed</option>
            </select>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div>
                <label
                  htmlFor="timeline"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Desired Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                <option value="">Select timeline</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3">Within 1–3 months</option>
                <option value="3-6">Within 3–6 months</option>
                <option value="6-12">Within 6–12 months</option>
                <option value="planning">I'm just planning and gathering quotes</option>
              </select>
            </div>

              <div>
                <label
                  htmlFor="projectScope"
                  className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Project Scope
                </label>
                <select
                  id="projectScope"
                  name="projectScope"
                  value={formData.projectScope}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                <option value="">Select project scope</option>
                <option value="small">Small project (single room or feature)</option>
                <option value="medium">Medium project (a few rooms or areas)</option>
                <option value="large">Large project (full-home or major renovation)</option>
                <option value="custom">Fully custom project</option>
                <option value="consultation">Design consultation only</option>
              </select>
            </div>
          </div>

            <div>
              <label
                htmlFor="projectDescription"
                className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Project Description *
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                required
                rows={5}
                placeholder="Please describe your project in detail, including the spaces involved, style preferences, measurements if available, and any special requirements or inspiration you'd like us to consider."
                value={formData.projectDescription}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#2C3539] dark:text-[#F9FAFB] text-sm sm:text-base placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] focus:border-transparent transition-all duration-300 resize-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-2 sm:mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Preferred contact method
              </label>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={() => handleRadioChange('email')}
                    className="w-4 h-4 text-[#2C3539] dark:text-[#F9FAFB] border-[#E5E7EB] dark:border-[#2a2a2a] focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] cursor-pointer"
                  />
                  <span className="ml-2 text-xs sm:text-sm text-[#2C3539] dark:text-[#F9FAFB] group-hover:text-[#000000] dark:group-hover:text-[#FFFFFF] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Email
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={() => handleRadioChange('phone')}
                    className="w-4 h-4 text-[#2C3539] dark:text-[#F9FAFB] border-[#E5E7EB] dark:border-[#2a2a2a] focus:ring-[#2C3539] dark:focus:ring-[#F9FAFB] cursor-pointer"
                  />
                  <span className="ml-2 text-xs sm:text-sm text-[#2C3539] dark:text-[#F9FAFB] group-hover:text-[#000000] dark:group-hover:text-[#FFFFFF] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Phone call
                  </span>
                </label>
              </div>
            </div>

            </fieldset>

            <div className="pt-4 sm:pt-6 border-t border-[#E5E7EB] dark:border-[#2a2a2a]">
              <p className="text-xs text-[#5D6D74] dark:text-[#D1D5DB] mb-5 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                * Required fields. We typically respond within one business day with next steps.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending request...
                  </>
                ) : (
                  <>
                    Send quote request
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuote;

