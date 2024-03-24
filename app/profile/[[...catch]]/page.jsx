"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useCheckLoginAndRedirect } from "@common_functions/check_login_and_redirect";
import ProfileCard from "@components/ProfileCard";
import FetchAndDisplayCards from "@components/FetchAndDisplayCards";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import EnquiryPanel from "@components/EnquiryPanel";
import { usePathname } from "next/navigation";

const page = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState(0);
  useCheckLoginAndRedirect(session, status);
  const handleLogOut = async () => {
    await signOut();
    sessionStorage.removeItem("hasRunOnce");
  };
  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-2xl font-bold text-slate-800">
        Loading...
      </div>
    );
  }
  const tabs = [
    {
      label: "Your Listings",
      component: (
        <FetchAndDisplayCards
          apiEndpoint={`api/listing/user/${session?.user.id}`}
          CardComponet={PropertyListingsCard}
        />
      ),
    },
    {
      label: "Wish list",
      component: (
        <FetchAndDisplayCards
          apiEndpoint={`api/listing/get-wishlist`}
          CardComponet={PropertyListingsCard}
        />
      ),
    },
    {
      label: "Enquiries",
      component: <EnquiryPanel />,
    },
  ];
  return (
    <>
      {session?.user && (
        <div className="flex flex-col items-start p-3 lg:flex-row w-full gap-4 lg:justify-between lg:m-5 justify-evenly">
          <div className="lg:w-1/3 flex w-full justify-center max-h-min flex-grow-0 self-auto">
            <ProfileCard
              user={session?.user}
              control={true}
              handleLogOut={handleLogOut}
            />
          </div>
          <div className="w-full flex-col items-center  gap-4">
            {/* Tabs */}
            <div className="flex gap-1 lg:gap-4 w-full justify-center">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label + index}
                  className={
                    "border border-faded-orange uppercase tracking-wider px-4 py-2 shadow-md rounded-md " +
                    "hover:bg-smooth-orange hover:text-white hover:font-semibold transition-all " +
                    (index === selectedTab
                      ? " text-white font-semibold bg-active-orange"
                      : "")
                  }
                  onClick={() => setSelectedTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Display Component */}
            <div className="w-full p-4 m-y-1">
              {tabs[selectedTab]?.component}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
