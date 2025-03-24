import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProfileCard = ({ user, handleLogOut, control = false }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-32 bg-gradient-to-r from-active-orange to-smooth-orange">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Image
            height={96}
            width={96}
            src={user.image}
            alt="profile"
            title="profile"
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="pt-16 pb-6 px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>

        {control && (
          <div className="flex gap-3">
            <button
              onClick={handleLogOut}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              <i className="fa-solid fa-sign-out-alt mr-2"></i>
              Log Out
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300">
              <i className="fa-solid fa-edit mr-2"></i>
              Edit
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;