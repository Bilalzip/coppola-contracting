import React, { useEffect } from 'react';

const Hardware: React.FC = () => {
  useEffect(() => {
    // Open external hardware products page in new tab
    window.open('https://marathonhardware.com/cat/Decorative-Hardware/302590', '_blank');
    // Redirect back to home page after opening new tab
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Opening Hardware Products...</h2>
        <p className="text-gray-600">Opening our hardware collection in a new tab.</p>
      </div>
    </div>
  );
};

export default Hardware;
