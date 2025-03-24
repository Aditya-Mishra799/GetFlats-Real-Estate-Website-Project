import React from 'react';
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import contactImage from "../../public/contact.png";
import { motion } from "framer-motion";

const Contact = () => {
  const socialLinks = [
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: "LinkedIn",
      url: "https://in.linkedin.com/in/aaditya-mishr",
      username: "Aditya Mishra"
    },
    {
      icon: <MdEmail className="text-2xl" />,
      label: "Email",
      url: "mailto:adityamishra9124@gmail.com",
      username: "adityamishra9124@gmail.com"
    },
    {
      icon: <SiLeetcode className="text-2xl" />,
      label: "LeetCode",
      url: "https://leetcode.com/u/aditya-mishr/",
      username: "aditya-mishr"
    },
    {
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub",
      url: "https://github.com/Aditya-Mishra799",
      username: "Aditya-Mishra799"
    },
    {
      icon: <FaHackerrank className="text-2xl" />,
      label: "HackerRank",
      url: "https://www.hackerrank.com/profile/adityamishra9124",
      username: "adityamishra9124"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={contactImage.src}
          alt="Contact GetFlats"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl">Get in touch with our developer</p>
          </div>
        </div>
      </div>

      {/* Developer Info Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Developer</h2>
            <h3 className="text-2xl font-semibold text-active-orange mb-2">Aditya Shyamanand Mishra</h3>
            <p className="text-gray-600">Full Stack Developer | GetFlats Creator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Connect Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-active-orange hover:shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-active-orange">{link.icon}</div>
                    <div>
                      <p className="font-medium text-gray-800">{link.label}</p>
                      <p className="text-sm text-gray-600">{link.username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-active-orange"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-active-orange"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-active-orange"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-active-orange text-white py-2 px-4 rounded-lg hover:bg-dark-orange transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;