import React, { useState } from "react";
import EnquiryCard from "./EnquiryCard";
import FetchAndDisplayCards from "./FetchAndDisplayCards";
import { motion, AnimatePresence } from "framer-motion";
import EnquiresCardSkeleton from "./EnquiresCardSkeleton";

const EnquiryPanel = () => {
  const [type, setType] = useState("sent");

  const handleChange = (newType) => {
    setType(newType);
  };

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleChange("sent")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            type === "sent"
              ? "bg-active-orange text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <i className="fa-solid fa-paper-plane"></i>
          Sent Enquiries
        </button>
        <button
          onClick={() => handleChange("received")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            type === "received"
              ? "bg-active-orange text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <i className="fa-solid fa-inbox"></i>
          Received Enquiries
        </button>
      </div>

      {/* Enquiries Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FetchAndDisplayCards
            type={type}
            apiEndpoint={`api/enquiry/view/${type}`}
            CardComponet={EnquiryCard}
            CardSkeleton={EnquiresCardSkeleton}
            currentPage={1}
            paginate
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EnquiryPanel;
