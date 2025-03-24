import React, { useState, useEffect } from "react";
import PropertyListingsCard from "./PropertyLisingsCard";
import { motion } from "framer-motion";

const FetchAndDisplayRecommendation = ({ id }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/listing/fetch-recommendation?id=" + id);
        if (response.ok) {
          const data = await response.json();
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <div className="loading-circle mx-auto"></div>
        <p className="text-gray-600 mt-4">Finding similar properties...</p>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="w-full py-8 text-center bg-gray-50 rounded-xl">
        <i className="fa-solid fa-house-circle-xmark text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600">No similar properties found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <motion.div
            key={listing._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PropertyListingsCard data={listing} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FetchAndDisplayRecommendation;