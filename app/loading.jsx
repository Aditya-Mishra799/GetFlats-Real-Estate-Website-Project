import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="loading-circle-container mb-4">
          <Loader2  className = "animate-spin text-smooth-orange" size={56}/>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">Loading content...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default Loading;