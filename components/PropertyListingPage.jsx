import formatAddress from "@common_functions/formatAddress";
import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBath, FaBed } from "react-icons/fa6";
import { TbHexagon3D, TbRulerMeasure } from "react-icons/tb";
import Button from "./Button";
import UserDataDisplay from "./UserDataDisplay";
const IconButton = ({ Icon }) => (
  <Button className={"p-1 rounded-full"}>{Icon}</Button>
);
const PropertyListingPage = ({ listingData }) => {
  console.log(listingData)
  const images = [listingData?.media.thumbnail, ...listingData?.media.images];
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const otherDetails = ['construction_date', 'furnished_status', 'phone', 'property_type']
  return (
    <div className="w-full h-full m-0 border">
      {/* Image Display */}
      <div className="w-full h-[45vh] lg:40vh overflow-x-scroll flex gap-2 min-w-0  scroll-m-5 hidden-scrollbar">
        {images.map((imageURL) => (
          <Image
            key={imageURL}
            src={imageURL}
            height={100}
            width={100}
            className="object-cover w-full border"
            alt="property Images"
          />
        ))}
      </div>
      {/* Details */}
      <div className="my-2 flex flex-col gap-2 p-1 lg:flex-row ">
        {/* Col 1 */}
        <div className="p-3 space-y-3 lg:w-1/2">
          <div className="flex gap-3 flex-wrap">
            <Button
              className={
                "outline_btn font-medium flex  items-center rounded-lg gap-2"
              }
            >
              <CiLocationOn size={20} /> Map
            </Button>
            <Button
              className={
                "outline_btn font-medium flex  items-center rounded-lg gap-2"
              }
            >
              <TbHexagon3D size={20} /> 3D View
            </Button>
            <Button
              className={
                "outline_btn font-medium flex  items-center rounded-lg gap-2"
              }
            >
              <FaBed size={20} /> {listingData?.bedrooms}
            </Button>

            <Button
              className={
                "outline_btn font-medium flex  items-center rounded-lg gap-2"
              }
            >
              <FaBath size={20} /> {listingData?.bathrooms}
            </Button>
            <Button
              className={
                "outline_btn font-medium flex  items-center rounded-lg gap-2"
              }
            >
              <TbRulerMeasure size={20} /> {listingData?.area} sqft
            </Button>
          </div>
          <div className="px-2">
            <h3 className="font-bold text-xl">Address:</h3>
            <p className="tracking-wide">
              {formatAddress(listingData?.location?.address) ||
                " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, neque aut doloremque a laborum perspiciatis atque nostrum autem temporibus vel."}
            </p>
          </div>
          <div className="text-slate-800 px-10 py-2">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">Sale Price: </h3>
              <span className="font-bold text-xl">
                {formatter.format(listingData?.price)}
              </span>
            </div>
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">Listing type</h3>
              <span className="font-bold text-xl">
                {listingData?.listing_type?.label}
              </span>
            </div>
          </div>
          {/* Main Action Buttons */}
          <div className="w-full px-10 space-y-4 p-3 lg:px-20">
            <Button className="uppercase w-full p-2 text-lg tracking-wider rounded-lg">
              Schedule Visit
            </Button>
            <Button className="uppercase w-full p-2 text-lg tracking-wider rounded-lg">
              Talk on whatsapp
            </Button>
          </div>
          {/* Amenities */}
          <div className="space-y-3 px-4">
            <h3 className="font-bold text-xl tracking-wider text-slate-800">
                Amenities Available
                </h3>
            <div className="flex gap-2 flex-wrap">
              {listingData?.amenities.map((amenity) => (
                <span className="border border-active-orange text-active-orange p-3 rounded-md font-bold  tracking-wide">
                  {amenity.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Col 2 */}
        <div className="px-2 w-full lg:w-1/2">
            {/* Other Details */}
          <div className="px-4 py-4 border border-active-orange rounded-xl mx-2 my-2 ">
            <h3 className="font-bold text-xl tracking-wider text-slate-800">Other Details</h3>
            <div className="flex flex-col gap-2 text-lg">

            <div className="flex justify-between  text-dark-orange ">
              <h3 className="font-semibold">Contruction Date</h3>
              <span className="">
                {Date(listingData?.construction_date).substring(0, 15)}
              </span>
            </div>

            <div className="flex justify-between  text-dark-orange ">
              <h3 className="font-semibold">Furnishing Status</h3>
              <span className="">
                {listingData?.furnished_status.label}
              </span>
            </div>
            {/* Description */}
            <div className="flex justify-between  text-dark-orange ">
              <h3 className="font-semibold">Property Type</h3>
              <span className="">
                {listingData?.property_type.label}
              </span>
            </div>

            <div className="flex justify-between  text-dark-orange ">
              <h3 className="font-semibold">Contact Number</h3>
              <span className="">
                {listingData?.phone}
              </span>
            </div>
            </div>
          </div>

          <div className="border border-active-orange p-3 m-2 rounded-lg text-slate-600 max-h-max transition-all duration-1000">
            <h3 className="font-bold text-xl">Description:</h3>
            <p className=" text-pretty tracking-wide line-clamp-10 hover:line-clamp-none transition-all duration-1000">
              {listingData?.property_description}
            </p>
          </div>
          <div className="w-full mx-auto px-2 py-1 space-y-3 lg:px-5">
            <h3 className="self-start text-xl font-bold">Added By:</h3>
            <UserDataDisplay user={listingData?.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;