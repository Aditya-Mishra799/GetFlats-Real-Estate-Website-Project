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

  //get user location
  const updateAndGetLocation = async () => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error white fetching Location", error);
        }
      );
    }
  };
  useEffect(() => {
    updateAndGetLocation();
  }, []);
  const sliderImages = [
    {
      src: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/941195/pexels-photo-941195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/347141/pexels-photo-347141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/273204/pexels-photo-273204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
    {
      src: "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "display-image",
    },
  ];
  return (
    <>
      <div >
        <ul className="flex gap-4 overflow-scroll hidden-scrollbar my-4 px-2">
          <li
            className="flex gap-1 items-center bg-active-orange px-2 py-1 flex-none justify-stretch w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap "
            onClick={() =>
              router.push(
                '/search?page=1&query={"listing_type":["For%20Sale"]}'
              )
            }
          >
            <i class="fa-solid fa-house-circle-check text-white"></i>Buy
          </li>
          <li
            className="flex gap-1 items-center bg-active-orange px-2 py-1 flex-none justify-stretch w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap "
            onClick={() =>
              router.push(
                '/search?page=1&query={"listing_type":["For%20Rent"]}'
              )
            }
          >
            <i class="fa-solid fa-truck-moving text-white"></i>Rent
          </li>
          <li
            className="flex gap-1 items-center bg-active-orange px-2 py-1 flex-none justify-stretch w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap "
            onClick={() =>
              router.push(
                '/search?page=1&query={"property_type":["Independent","Residential%20Land"]}'
              )
            }
          >
            <i class="fa-solid fa-table-cells text-white"></i>Plot/Land
          </li>
          <li
            className="flex gap-1 items-center bg-active-orange px-2 py-1 flex-none justify-stretch w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap "
            onClick={() => router.push("/profile/add-listing")}
          >
            <i class="fa-solid fa-house-user text-white"></i>
            <span>Add a listing</span>
          </li>
        </ul>
      </div>
      <div className="w-full h-80 m-2 rounded-md lg:h-[400px]">
        <Carousel slides={sliderImages} autoSlide={true} />
      </div>
      <div className="home">
        <div className="text">
          <div className="bg-opacity-50 bg-black px-4 py-4 mt-4 rounded-md font-inter z-0">
            <h1>
              Buying <span className="head-and">&</span> Selling
            </h1>
            <p className="text-para">
              Unlock Your Dream Home: Where Flats Find Their Perfect Match!
            </p>
            <button className="bg-white px-4 py-4 rounded-md text-active-orange uppercase text-xl mt-2  shadow-md">
              {" "}
              More About
            </button>
          </div>
          <ul>
            <li>
              <i className="fa-brands fa-facebook-f"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin-in"></i>
            </li>
            <li>
              <i className="fa-brands fa-whatsapp"></i>
            </li>
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
          </ul>
        </div>
      </div>
      <div className="home-middle">
        <div>
          <span className="input-sec px-1.5 py-2 rounded-lg shadow-lg border">
            <input
              className="local-input"
              type="text"
              placeholder="Search by locality or landmark"
              value = {searchInput}
              onChange = {(e)=>setSearchInput(e.target.value)}
              onSubmit = {()=>router.push('/search')}
            />
            <i class="fa-solid fa-location-crosshairs"></i>
            <i class="fa-solid fa-magnifying-glass cursor-pointer"  onClick = {()=>router.push(`/search?page=1&query={"keywords":"${searchInput}"}`)}></i>
          </span>
        </div>
        <div className="highlights">
          <h2>Apartments, Villas and more</h2>
          <div className="flex gap-6 overflow-scroll hidden-scrollbar">
            <div className="flex flex-col w-64  border rounded-lg shadow-lg overflow-hidden flex-none">
              <div className="high-image">
                <img
                  src="https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg"
                  alt=""
                  className="w-full h-64 object-cover transition-transform rounded-t-lg hover:scale-x-110"
                />
              </div>
              <div className="high-card-desp mt-2.5">
                <h3>Residential Apartments</h3>
                <p>10,000+ Properties</p>
              </div>
            </div>
            <div className="flex flex-col w-64  border rounded-lg shadow-lg overflow-hidden flex-none ">
              <div className="high-image">
                <img
                  src="https://tjh.com/wp-content/uploads/2023/04/denver-new-home-Meade2.webp"
                  alt=""
                  className="w-full h-64 object-cover transition-transform rounded-t-lg hover:scale-x-110"
                />
              </div>
              <div className="high-card-desp mt-2.5">
                <h3>Independent House/ Villa</h3>
                <p>900+ Properties</p>
              </div>
            </div>
            <div className="flex flex-col w-64  border rounded-lg shadow-lg overflow-hidden flex-none ">
              <div className="high-image">
                <img
                  src="https://5.imimg.com/data5/FD/BL/MY-11964470/residential-plots-500x500.jpg"
                  alt=""
                  className="w-full h-64 object-cover transition-transform rounded-t-lg hover:scale-x-110"
                />
              </div>
              <div className="high-card-desp mt-2.5">
                <h3>Residential Land</h3>
                <p>60+ Properties</p>
              </div>
            </div>
            <div className="flex flex-col w-64  border rounded-lg shadow-lg overflow-hidden flex-none ">
              <div className="high-image">
                <img
                  src="https://www.redfin.com/blog/wp-content/uploads/2022/11/farmhouse-1.jpg"
                  alt=""
                  className="w-full h-64 object-cover transition-transform rounded-t-lg hover:scale-x-110"
                />
              </div>
              <div className="high-card-desp mt-2.5">
                <h3>Farm House</h3>
                <p>12+ Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-lower-middle">
        <h2>
          <i class="fa-solid fa-map-location"></i> New Launch Property in Your
          area for Sale/Rent
        </h2>
        <div className="w-full h-full px-12 py-6">
          <FetchAndDisplayCards
            apiEndpoint={getApiEndPoint()}
            CardComponet={PropertyListingsCard}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
