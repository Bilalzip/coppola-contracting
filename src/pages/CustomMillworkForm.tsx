import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Ruler, Palette, Calendar } from 'lucide-react';

// Icon paths (moved to public folder)
const phoneCallIcon = '/icons/phone-call.svg';
const emailIcon = '/icons/email.svg';
const gpsIcon = '/icons/gps.svg';

// Add PT Serif font import
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
`;

interface FormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Project Details
  projectType: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  
  // Measurements
  roomDimensions: string;
  cabinetDimensions: string;
  specialRequirements: string;
  
  // Materials & Style
  preferredWood: string;
  finish: string;
  hardwareStyle: string;
  colorScheme: string;
  
  // Additional Services
  installation: boolean;
  designConsultation: boolean;
  projectManagement: boolean;
  
  // Timeline & Communication
  preferredContact: string;
  bestTimeToCall: string;
  additionalNotes: string;
}

const CustomMillworkForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    projectType: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    roomDimensions: '',
    cabinetDimensions: '',
    specialRequirements: '',
    preferredWood: '',
    finish: '',
    hardwareStyle: '',
    colorScheme: '',
    installation: false,
    designConsultation: false,
    projectManagement: false,
    preferredContact: '',
    bestTimeToCall: '',
    additionalNotes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create email content
      const emailSubject = `Custom Millwork Quote Request - ${formData.firstName} ${formData.lastName}`;
      const emailBody = `
Custom Millwork Quote Request

CONTACT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}

PROJECT DETAILS:
Project Type: ${formData.projectType}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Description: ${formData.projectDescription}

SPECIFICATIONS:
Room Dimensions: ${formData.roomDimensions || 'Not specified'}
Cabinet Dimensions: ${formData.cabinetDimensions || 'Not specified'}
Preferred Wood: ${formData.preferredWood || 'Not specified'}
Finish: ${formData.finish || 'Not specified'}
Hardware Style: ${formData.hardwareStyle || 'Not specified'}
Color Scheme: ${formData.colorScheme || 'Not specified'}
Special Requirements: ${formData.specialRequirements || 'None'}

ADDITIONAL SERVICES:
Installation: ${formData.installation ? 'Yes' : 'No'}
Design Consultation: ${formData.designConsultation ? 'Yes' : 'No'}
Project Management: ${formData.projectManagement ? 'Yes' : 'No'}

COMMUNICATION PREFERENCES:
Preferred Contact: ${formData.preferredContact || 'Not specified'}
Best Time to Call: ${formData.bestTimeToCall || 'Not specified'}
Additional Notes: ${formData.additionalNotes || 'None'}

---
This request was submitted through the Coppola Contracting website.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:info@coppolacontracting.net?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Thank you for your request! Your default email client should open with a pre-filled message. Please send the email to complete your submission.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepTitle = () => {
    const titles = {
      1: 'Contact Information',
      2: 'Project Details',
      3: 'Specifications',
      4: 'Review & Submit'
    };
    return titles[currentStep as keyof typeof titles];
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div className="min-h-screen bg-gray-50 py-8 font-['PT_Serif']">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/custom-cabinetry" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Custom Cabinetry
          </Link>
          <h1 className="text-page-title font-bold text-gray-900 mb-2">Custom Millwork Quote Request</h1>
          <p className="text-gray-600">
            Tell us about your project and we'll provide you with a detailed quote and timeline
          </p>
        </div>

        {/* Progress Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step {currentStep}: {renderStepTitle()}
            </h2>
          </div>

          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  <option value="kitchen-cabinets">Kitchen Cabinets</option>
                  <option value="bathroom-vanities">Bathroom Vanities</option>
                  <option value="built-in-storage">Built-in Storage</option>
                  <option value="entertainment-center">Entertainment Center</option>
                  <option value="office-furniture">Office Furniture</option>
                  <option value="custom-closets">Custom Closets</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Please describe your project in detail, including your vision, requirements, and any specific features you'd like..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="over-50k">Over $50,000</option>
                    <option value="to-be-determined">To be determined</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Specifications */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Dimensions
                  </label>
                  <textarea
                    name="roomDimensions"
                    value={formData.roomDimensions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Length x Width x Height (e.g., 12' x 15' x 8')"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cabinet Dimensions
                  </label>
                  <textarea
                    name="cabinetDimensions"
                    value={formData.cabinetDimensions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Specific cabinet sizes if known"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Wood Type
                  </label>
                  <select
                    name="preferredWood"
                    value={formData.preferredWood}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select wood type</option>
                    <option value="oak">Oak</option>
                    <option value="maple">Maple</option>
                    <option value="cherry">Cherry</option>
                    <option value="walnut">Walnut</option>
                    <option value="mahogany">Mahogany</option>
                    <option value="pine">Pine</option>
                    <option value="birch">Birch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finish Preference
                  </label>
                  <select
                    name="finish"
                    value={formData.finish}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select finish</option>
                    <option value="natural">Natural</option>
                    <option value="stained">Stained</option>
                    <option value="painted">Painted</option>
                    <option value="distressed">Distressed</option>
                    <option value="glazed">Glazed</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hardware Style
                  </label>
                  <select
                    name="hardwareStyle"
                    value={formData.hardwareStyle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select hardware style</option>
                    <option value="traditional">Traditional</option>
                    <option value="modern">Modern</option>
                    <option value="rustic">Rustic</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="vintage">Vintage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Scheme
                  </label>
                  <input
                    type="text"
                    name="colorScheme"
                    value={formData.colorScheme}
                    onChange={handleInputChange}
                    placeholder="e.g., White, Natural wood, Dark espresso"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special features, accessibility requirements, or unique specifications..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Services
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="installation"
                      checked={formData.installation}
                      onChange={handleInputChange}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    Installation Services
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="designConsultation"
                      checked={formData.designConsultation}
                      onChange={handleInputChange}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    Design Consultation
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="projectManagement"
                      checked={formData.projectManagement}
                      onChange={handleInputChange}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    Project Management
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
                  <div><span className="font-medium">Email:</span> {formData.email}</div>
                  <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                  <div><span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Project Type:</span> {formData.projectType}</div>
                  <div><span className="font-medium">Timeline:</span> {formData.timeline}</div>
                  <div><span className="font-medium">Budget:</span> {formData.budget}</div>
                  <div><span className="font-medium">Description:</span> {formData.projectDescription}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Wood Type:</span> {formData.preferredWood || 'Not specified'}</div>
                  <div><span className="font-medium">Finish:</span> {formData.finish || 'Not specified'}</div>
                  <div><span className="font-medium">Hardware Style:</span> {formData.hardwareStyle || 'Not specified'}</div>
                  <div><span className="font-medium">Color Scheme:</span> {formData.colorScheme || 'Not specified'}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Room Dimensions:</span> {formData.roomDimensions || 'Not specified'}</div>
                  <div><span className="font-medium">Special Requirements:</span> {formData.specialRequirements || 'None'}</div>
                  <div><span className="font-medium">Additional Services:</span> {
                    [formData.installation && 'Installation', formData.designConsultation && 'Design Consultation', formData.projectManagement && 'Project Management']
                      .filter(Boolean).join(', ') || 'None'
                  }</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select contact method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Call
                  </label>
                  <select
                    name="bestTimeToCall"
                    value={formData.bestTimeToCall}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any additional information you'd like us to know..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Immediate Assistance?</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-4">
                  <img src={phoneCallIcon} alt="Phone" className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
               <p className="text-gray-600">+1 (807) 345-9989</p>
               <p className="text-sm text-gray-500">Mon-Fri 9AM-5PM</p>
             </div>
                         <div className="text-center">
              <div className="flex items-center justify-center mx-auto mb-4">
                <img src={emailIcon} alt="Email" className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
               <p className="text-gray-600">info@coppolacontracting.net</p>
               <p className="text-sm text-gray-500">24/7 Response</p>
             </div>
                         <div className="text-center">
              <div className="flex items-center justify-center mx-auto mb-4">
                <img src={gpsIcon} alt="Location" className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
               <p className="text-gray-600">269 RED RIVER RD</p>
               <p className="text-sm text-gray-500">THUNDER BAY ON, P7B 1A9</p>
               <p className="text-sm text-gray-500">By appointment</p>
             </div>
           </div>
                 </div>
       </div>
     </div>
     </>
   );
 };

export default CustomMillworkForm;

