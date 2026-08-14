import { useState } from 'react';
import { ArrowRight, Upload, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { usePageSections } from '../lib/usePageSections';

const GetQuote = () => {
  const { section } = usePageSections('get-quote');
  const hero = section('hero', {
    heading: 'Request your personalized quote',
    body: 'Share a few project details below and our team will prepare a tailored estimate and next steps for your home transformation.',
    heading_color: '#2C3539',
    body_color: '#5D6D74',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectAddress: '',
    projectType: '',
    timeline: '',
    projectScope: '',
    projectDescription: '',
    contactMethod: 'email'
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024;
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 10 * 1024 * 1024;
        return validTypes.includes(file.type) && file.size <= maxSize;
      });

      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Files:', files);
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
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 md:space-y-8">
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

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 sm:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Upload photos, plans, or inspiration (optional)
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed ${
                  isDragging ? 'border-[#2C3539] dark:border-[#F9FAFB] bg-[#F3F4F6] dark:bg-[#1a1a1a]' : 'border-[#E5E7EB] dark:border-[#2a2a2a] hover:border-[#2C3539] dark:hover:border-[#F9FAFB]'
                } rounded-lg p-6 sm:p-8 text-center transition-all duration-300 cursor-pointer group`}
              >
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-[#9CA3AF] dark:text-[#6B7280] mb-3 group-hover:text-[#2C3539] dark:group-hover:text-[#F9FAFB] transition-colors" />
                  <p className="text-sm sm:text-base text-[#2C3539] dark:text-[#F9FAFB] mb-2 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Drag and drop files here, or browse
                  </p>
                  <p className="text-xs sm:text-sm text-[#5D6D74] dark:text-[#D1D5DB] max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Attach photos, floor plans, or inspiration images
                    <br className="hidden sm:block" />
                    <span className="text-[#9CA3AF] dark:text-[#6B7280]">JPG, PNG, PDF (max 10MB each)</span>
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-3 sm:mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#F3F4F6] dark:bg-[#0a0a0a] rounded-lg border border-[#E5E7EB] dark:border-[#1a1a1a] group hover:border-[#2C3539] dark:hover:border-[#F9FAFB] transition-colors"
                    >
                      <span className="text-xs sm:text-sm text-[#2C3539] dark:text-[#F9FAFB] truncate flex-1 mr-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="flex items-center gap-1 text-xs sm:text-sm text-[#EF4444] hover:text-[#DC2626] dark:text-[#F87171] dark:hover:text-[#EF4444] transition-colors flex-shrink-0"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 sm:pt-6 border-t border-[#E5E7EB] dark:border-[#2a2a2a]">
              <p className="text-xs text-[#5D6D74] dark:text-[#D1D5DB] mb-5 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                * Required fields. We typically respond within one business day with next steps.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Send quote request
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuote;

