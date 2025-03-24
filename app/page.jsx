"use client";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Carousel from "@components/Carousel";
import FetchAndDisplayCards from "@components/FetchAndDisplayCards";
import PropertyListingsCard from "@components/PropertyLisingsCard";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quick Action Buttons */}
      <div className="px-4 py-6">
        <ul className="flex gap-4 overflow-x-auto hidden-scrollbar">
          <li
            className="flex gap-2 items-center bg-active-orange px-4 py-2 rounded-lg cursor-pointer text-white shadow-md hover:bg-dark-orange transition-all duration-300 flex-none"
            onClick={() => router.push('/search?page=1&query={"listing_type":["For%20Sale"]}')}
          >
            <i className="fa-solid fa-house-circle-check text-white"></i>
            <span className="whitespace-nowrap">Buy Property</span>
          </li>
          <li
            className="flex gap-2 items-center bg-active-orange px-4 py-2 rounded-lg cursor-pointer text-white shadow-md hover:bg-dark-orange transition-all duration-300 flex-none"
            onClick={() => router.push('/search?page=1&query={"listing_type":["For%20Rent"]}')}
          >
            <i className="fa-solid fa-truck-moving text-white"></i>
            <span className="whitespace-nowrap">Rent Property</span>
          </li>
          <li
            className="flex gap-2 items-center bg-active-orange px-4 py-2 rounded-lg cursor-pointer text-white shadow-md hover:bg-dark-orange transition-all duration-300 flex-none"
            onClick={() => router.push('/search?page=1&query={"property_type":["Independent","Residential%20Land"]}')}
          >
            <i className="fa-solid fa-table-cells text-white"></i>
            <span className="whitespace-nowrap">Plot/Land</span>
          </li>
          <li
            className="flex gap-2 items-center bg-active-orange px-4 py-2 rounded-lg cursor-pointer text-white shadow-md hover:bg-dark-orange transition-all duration-300 flex-none"
            onClick={() => router.push("/profile/add-listing")}
          >
            <i className="fa-solid fa-house-user text-white"></i>
            <span className="whitespace-nowrap">List Property</span>
          </li>
        </ul>
      </div>

      {/* Hero Section with Carousel */}
      <div className="w-full h-[500px] px-4 rounded-xl overflow-hidden shadow-lg">
        <Carousel slides={sliderImages} autoSlide={true} />
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Find Your Dream Home
          </h1>
          <div className="flex gap-2">
            <input
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-active-orange"
              type="text"
              placeholder="Search by locality, landmark, or project"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="bg-active-orange text-white px-6 py-3 rounded-lg hover:bg-dark-orange transition-all duration-300"
              onClick={() => router.push(`/search?page=1&query={"keywords":"${searchInput}"}`)}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Property Categories */}
      <div className="px-4 py-12 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Explore Properties by Category
        </h2>
        <div className="flex gap-6 overflow-x-auto hidden-scrollbar pb-4">
          <div className="flex-none w-72 bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Apartments"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Residential Apartments</h3>
              <p className="text-gray-600">10,000+ Properties</p>
            </div>
          </div>

          <div className="flex-none w-72 bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Villas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Independent Villas</h3>
              <p className="text-gray-600">900+ Properties</p>
            </div>
          </div>

          <div className="flex-none w-72 bg-white rounded-xl shadow-lg overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Plots"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">Residential Plots</h3>
              <p className="text-gray-600">60+ Properties</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <i className="fa-solid fa-map-location text-active-orange"></i>
            Featured Properties Near You
          </h2>
          <FetchAndDisplayCards
            apiEndpoint={getApiEndPoint()}
            CardComponet={PropertyListingsCard}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6 text-center">Connect With Us</h3>
          <ul className="flex justify-center gap-6">
            <li className="hover:text-active-orange transition-colors duration-300">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li className="hover:text-active-orange transition-colors duration-300">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li className="hover:text-active-orange transition-colors duration-300">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
            <li className="hover:text-active-orange transition-colors duration-300">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;