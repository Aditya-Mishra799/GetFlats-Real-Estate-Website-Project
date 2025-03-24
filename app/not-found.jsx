import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-active-orange mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="inline-block bg-active-orange text-white px-6 py-3 rounded-lg hover:bg-dark-orange transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;