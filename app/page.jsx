"use client";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Carousel from "@components/Carousel";
import FetchAndDisplayCards from "@components/FetchAndDisplayCards";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import PropertyCardLoadingSkeleton from "@components/PropertyCardLoadingSkeleton";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const snackBar = useSnackBar();
  const [userLocation, setUserLocation] = useState([19.4714447, 72.8868084]);
  const [searchInput, setSearchInput] = useState("");
  const { data: session } = useSession();
  const snackBarSucessdata = {
    message: "Login Successfull",
    label: "Logged In",
    link: {
      href: "/profile",
      label: "view profile",
    },
  };

  useEffect(() => {
    const hasRunOnce = sessionStorage.getItem("hasRunOnce");
    if (!hasRunOnce && session?.user) {
      sessionStorage.setItem("hasRunOnce", "true");
      snackBar.open(
        "success",
        {
          ...snackBarSucessdata,
          message: (
            <div className="flex gap-1 w-full">
              Login Successfull{" "}
              <div className="max-w-16 lg:max-w-24 truncate ... font-bold">{`${session?.user.name}`}</div>
            </div>
          ),
        },
        7000
      );
    }
  }, [session]);

  const getApiEndPoint = () => {
    const url = `api/listing/fetch-coords?lat=${userLocation[0]}&lng=${userLocation[1]}&radius=10`;
    return url;
  };

  const updateAndGetLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error while fetching Location", error);
        }
      );
    }
  };

  useEffect(() => {
    updateAndGetLocation();
  }, []);

  const sliderImages = [
    {
      src: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Modern Apartment",
    },
    {
      src: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Luxury Villa",
    },
    {
      src: "https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Contemporary Home",
    },
    {
      src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Urban Living",
    },
    {
      src: "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Dream Home",
    }
  ];

  const quickActions = [
    {
      icon: "fa-house-circle-check",
      label: "Buy Property",
      query: '{"listing_type":["For%20Sale"]}'
    },
    {
      icon: "fa-truck-moving",
      label: "Rent Property",
      query: '{"listing_type":["For%20Rent"]}'
    },
    {
      icon: "fa-table-cells",
      label: "Plot/Land",
      query: '{"property_type":["Independent","Residential%20Land"]}'
    },
    {
      icon: "fa-house-user",
      label: "List Property",
      path: "/profile/add-listing"
    }
  ];

  const features = [
    {
      icon: "fa-solid fa-map-location-dot",
      title: "Location-Based Search",
      description: "Find properties in your preferred neighborhoods"
    },
    {
      icon: "fa-solid fa-robot",
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your preferences"
    },
    {
      icon: "fa-solid fa-check",
      title: "Verified Listings",
      description: "All properties are verified for authenticity"
    },
    {
      icon: "fa-solid fa-handshake",
      title: "Direct Contact",
      description: "Connect directly with property owners"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gray-900">
        <Carousel slides={sliderImages} autoSlide={true} />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover the perfect property with GetFlats
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex gap-2">
                <input
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-active-orange"
                  type="text"
                  placeholder="Search by locality, landmark, or project"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="bg-active-orange text-white px-8 py-3 rounded-lg hover:bg-dark-orange transition-all duration-300"
                  onClick={() => router.push(`/search?page=1&query={"keywords":"${searchInput}"}`)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href = {action.path || `/search?page=1&query=${action.query}`}
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-active-orange/10 rounded-full flex items-center justify-center">
                  <i className={`fa-solid ${action.icon} text-active-orange text-xl`}></i>
                </div>
                <span className="text-gray-700 font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Why Choose GetFlats?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-active-orange/10 rounded-full flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-active-orange text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Properties Near You
          </h2>
          <FetchAndDisplayCards
            apiEndpoint={getApiEndPoint()}
            CardComponet={PropertyListingsCard}
            CardSkeleton = {PropertyCardLoadingSkeleton}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-active-orange to-dark-orange py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of satisfied customers who found their dream property with GetFlats
          </p>
          <button
            onClick={() => router.push("/search?page=1&query={}")}
            className="bg-white text-active-orange px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300"
          >
            Start Searching
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;