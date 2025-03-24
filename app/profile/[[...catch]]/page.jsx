"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useCheckLoginAndRedirect } from "@common_functions/check_login_and_redirect";
import ProfileCard from "@components/ProfileCard";
import FetchAndDisplayCards from "@components/FetchAndDisplayCards";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import EnquiryPanel from "@components/EnquiryPanel";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const page = () => {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState(0);
  useCheckLoginAndRedirect(session, status);

  const handleLogOut = async () => {
    await signOut();
    sessionStorage.removeItem("hasRunOnce");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loading-circle"></div>
      </div>
    );
  }

  const tabs = [
    {
      label: "Your Listings",
      icon: "fa-solid fa-list",
      component: (
        <FetchAndDisplayCards
          apiEndpoint={`api/listing/user/${session?.user.id}`}
          CardComponet={PropertyListingsCard}
        />
      ),
    },
    {
      label: "Wishlist",
      icon: "fa-solid fa-heart",
      component: (
        <FetchAndDisplayCards
          apiEndpoint={`api/listing/get-wishlist`}
          CardComponet={PropertyListingsCard}
        />
      ),
    },
    {
      label: "Enquiries",
      icon: "fa-solid fa-message",
      component: <EnquiryPanel />,
    },
  ];

  return (
    <>
      {session?.user && (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-20">
                  <ProfileCard
                    user={session?.user}
                    control={true}
                    handleLogOut={handleLogOut}
                  />
                </div>
              </motion.div>

              {/* Main Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3 space-y-6"
              >
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex flex-wrap gap-4">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.label}
                        onClick={() => setSelectedTab(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          selectedTab === index
                            ? "bg-active-orange text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        <i className={tab.icon}></i>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  {tabs[selectedTab].component}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;