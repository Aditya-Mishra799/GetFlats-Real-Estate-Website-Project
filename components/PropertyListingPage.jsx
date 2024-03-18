import formatAddress from "@common_functions/formatAddress";
import Image from "next/image";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBath, FaBed } from "react-icons/fa6";
import { TbHexagon3D, TbRulerMeasure } from "react-icons/tb";
import Button from "./Button";
import UserDataDisplay from "./UserDataDisplay";
import dynamic from "next/dynamic";
import Modal from "./Modal";
const DynamicDisplayMap = dynamic(() => import("@components/DisplayMap"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500 font-bold text-xl w-full h-full flex justify-center items-center">
      Loading Map...
    </p>
  ),
});

const IconButton = ({ Icon }) => (
  <Button className={"p-1 rounded-full"}>{Icon}</Button>
);
const PropertyListingPage = ({ listingData }) => {
  const images = [listingData?.media.thumbnail, ...listingData?.media.images];
  const [openModal, setOpenModal] = useState(false);
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const Map = (
    <Modal
      isOpen={openModal}
      title={"Map View of Property Listing"}
      onClose={() => setOpenModal(false)}
    >
      <DynamicDisplayMap
        mainMarkerCoords={listingData?.location?.coordinates}
      />
    </Modal>
  );
  return (
    <div className="w-full h-full m-0">
      {/* Image Display */}
      <div className="w-full h-[45vh] lg:40vh overflow-x-scroll flex gap-2 min-w-0  scroll-m-5 hidden-scrollbar relative">
        <h3 className="absolute top-2 left-2 text-xl bg-active-orange px-2 py-1 text-white font-bold rounded-lg">
          {listingData?.property_title}
        </h3>
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
              clickHandler={() => {
                console.log("clicked");
                console.log(openModal);
                setOpenModal(true);
              }}
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
            <h3 className="font-bold text-xl tracking-wider text-slate-800">
              Other Details
            </h3>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex justify-between  text-dark-orange ">
                <h3 className="font-semibold">Contruction Date</h3>
                <span className="">
                  {Date(listingData?.construction_date).substring(0, 15)}
                </span>
              </div>

              <div className="flex justify-between  text-dark-orange ">
                <h3 className="font-semibold">Furnishing Status</h3>
                <span className="">{listingData?.furnished_status.label}</span>
              </div>
              {/* Description */}
              <div className="flex justify-between  text-dark-orange ">
                <h3 className="font-semibold">Property Type</h3>
                <span className="">{listingData?.property_type.label}</span>
              </div>

              <div className="flex justify-between  text-dark-orange ">
                <h3 className="font-semibold">Contact Number</h3>
                <span className="">{listingData?.phone}</span>
              </div>
            </div>
          </div>

          <div className="border border-active-orange p-3 m-2 rounded-lg text-slate-600 max-h-max transition-all duration-1000">
            <h3 className="font-bold text-xl">Description:</h3>
            <p className=" text-pretty tracking-wide line-clamp-6 hover:line-clamp-none">
              {listingData?.property_description}
            </p>
          </div>
          <div className="w-full mx-auto px-2 py-1 space-y-3 lg:px-5">
            <h3 className="self-start text-xl font-bold">Added By:</h3>
            <UserDataDisplay user={listingData?.user} />
          </div>
        </div>
      </div>
      {/* Diplay the Map */}
      {Map}
    </div>
  );
};

export default PropertyListingPage;
