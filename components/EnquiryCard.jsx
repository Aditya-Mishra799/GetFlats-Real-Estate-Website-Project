import Image from "next/image";
import React, { useState } from "react";
import { useSnackBar } from "./SnackBar/SnackBarService";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const EnquiryCard = ({ data, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const profileImage =
    type === "received" ? data?.creator.image : data?.owner.image;
  const userData = type === "received" ? data?.creator : data?.owner;
  const snackBar = useSnackBar();

  const handleStatusChange = async (status) => {
    const snackBarId = snackBar.open(
      "loading",
      {
        label: "Changing status..",
        message: "Please wait until the action is completed",
      },
      Infinity
    );

    try {
      const result = await fetch("/api/enquiry/change-status", {
        method: "POST",
        body: JSON.stringify({
          enquiry_id: data._id,
          status,
        }),
      });
      if (!result.ok) {
        throw new Error(JSON.stringify((await result.json())?.message));
      }
      snackBar.open(
        "success",
        {
          label: status + " enquiry",
          link: {
            href: "/profile",
            label: "view",
          },
        },
        7000
      );
    } catch (error) {
      snackBar.open(
        "alert",
        {
          label: "Action Failed",
          message: `Error: ${error?.message}`,
        },
        7000
      );
    } finally {
      snackBar.close(snackBarId);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[350px] md:w-[380px]"
    >
      {/* Header with Status */}
      <div className="bg-gradient-to-r from-active-orange to-smooth-orange p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            height={48}
            width={48}
            src={profileImage}
            className="rounded-full border-2 border-white"
            alt="profile image"
          />
          <div className="text-white">
            <h3 className="font-semibold truncate max-w-[150px]">
              {userData?.username}
            </h3>
            <p className="text-sm opacity-90 truncate max-w-[150px]">
              {userData?.email}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center ${
            statusColors[data.status]
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* Enquiry Content */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fa-solid fa-phone w-5"></i>
            <span className="truncate">{data.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fa-solid fa-envelope w-5"></i>
            <span className="truncate">{data.email}</span>
          </div>
        </div>
        {data.property_listing && (
          <div className="border-t border-gray-200 pt-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-active-orange" />
            <Link
              className="text-active-orange hover:text-dark-orange text-base tracking-wide font-medium transition-colors duration-200"
              href={`/listing?id=${data.property_listing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Listing
            </Link>
          </div>
        )}
        <div className="relative">
          <p
            className={`text-gray-700 bg-gray-50 p-4 rounded-lg ${!isExpanded &&
              "line-clamp-3"}`}
          >
            {data.description}
          </p>
          {data.description?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-active-orange hover:text-dark-orange text-sm mt-1 font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Action Buttons for Received Enquiries */}
        {type === "received" && data?.status === "pending" && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => handleStatusChange("accepted")}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Accept</span>
              <i className="fa-solid fa-check sm:hidden"></i>
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Reject</span>
              <i className="fa-solid fa-times sm:hidden"></i>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EnquiryCard;
