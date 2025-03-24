import React from "react";
import AboutImage from "../../public/About.jpg";
import AboutSideImage from "../../public/About_side.jpg";
import { FaHome, FaSearch, FaHandshake, FaRobot } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaHome className="text-4xl text-active-orange" />,
      title: "Extensive Property Database",
      description: "Access thousands of listings across different property types and locations."
    },
    {
      icon: <FaSearch className="text-4xl text-active-orange" />,
      title: "Smart Search",
      description: "Advanced filters and map-based search to find your perfect property."
    },
    {
      icon: <FaHandshake className="text-4xl text-active-orange" />,
      title: "Direct Communication",
      description: "Connect directly with property owners and agents through our platform."
    },
    {
      icon: <FaRobot className="text-4xl text-active-orange" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized property suggestions based on your preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[45vh] md:h-[80vh] overflow-hidden">
        <img
          src={AboutImage.src}
          alt="About GetFlats"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About GetFlats</h1>
            <p className="text-xl md:text-2xl">Your Trusted Property Partner</p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600">
            At GetFlats, we're dedicated to revolutionizing the way you discover your next home or lucrative investment property. 
            Our platform combines innovative technology with personalized service to meet your unique needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <img
              src={AboutSideImage.src}
              alt="GetFlats Platform"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-active-orange mb-4">Why Choose GetFlats?</h3>
              <p className="text-gray-600 mb-4">
                With GetFlats, finding your ideal property is a breeze. Our extensive database features a diverse range of listings, 
                from cozy apartments to luxurious estates, ensuring that there's something for everyone. Utilize our intuitive interface 
                to explore properties tailored to your preferences, and save your favorites to your wishlist for easy reference later on.
              </p>
              <p className="text-gray-600">
                We understand the importance of seamless communication when it comes to property inquiries. That's why we've streamlined 
                the process with our intuitive "Make Enquiry" functionality. With just a few clicks, you can reach out to property owners 
                or agents directly, asking questions, scheduling viewings, or negotiating terms, all from the comfort of our platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-active-orange mb-4">Innovation at Heart</h3>
              <p className="text-gray-600">
                What truly sets GetFlats apart is our commitment to innovation. Our machine learning-powered recommendation system analyzes 
                your browsing behavior to deliver personalized property suggestions, making your search more efficient and enjoyable. Plus, 
                our chatbot is available 24/7 to assist you with any questions or inquiries you may have along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;