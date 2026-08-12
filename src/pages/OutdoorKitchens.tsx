import React, { useEffect } from 'react';

const OutdoorKitchens: React.FC = () => {
  useEffect(() => {
    // Open Q-Boo outdoor kitchen page in new tab immediately
    window.open('https://q-boo.com/', '_blank');
    // Redirect back to home page after opening new tab
    window.location.href = '/';
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center fixed inset-0 z-50">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {/* Large Spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-blue-200 border-2 rounded-full"></div>
            <div className="w-20 h-20 border-blue-600 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>

          {/* Medium Spinner */}
          <div className="relative">
            <div className="w-10 h-10 border-blue-200 border-2 rounded-full"></div>
            <div className="w-10 h-10 border-blue-600 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>

          {/* Small Spinner */}
          <div className="relative">
            <div className="w-5 h-5 border-blue-200 border-2 rounded-full"></div>
            <div className="w-5 h-5 border-blue-600 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Opening Q-Boo Outdoor Kitchens</h2>
        <p className="text-gray-600">Opening our outdoor kitchen specialists in a new tab.</p>
      </div>
    </div>
  );
};

export default OutdoorKitchens;

