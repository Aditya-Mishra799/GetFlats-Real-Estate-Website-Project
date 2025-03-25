import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">GetFlats</h3>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect property. Zero brokerage, 
              maximum convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/search?page=1&query={}" className="text-gray-400 hover:text-white transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link href="/map-search" className="text-gray-400 hover:text-white transition-colors">
                  Map Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Developer</h4>
            <p className="text-gray-400 mb-2">Aditya Shyamanand Mishra</p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/Aditya-Mishra799" 
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </Link>
              <Link 
                href="https://linkedin.com/in/aditya-mishra-b4050a291" 
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </Link>
              <Link 
                href="mailto:adityamishra9124@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GetFlats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;