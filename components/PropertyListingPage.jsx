import formatAddress from "@common_functions/formatAddress";
import Image from "next/image";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBath, FaBed, FaWhatsapp } from "react-icons/fa6";
import { TbHexagon3D, TbRulerMeasure } from "react-icons/tb";
import Button from "./Button";
import UserDataDisplay from "./UserDataDisplay";
import dynamic from "next/dynamic";
import Modal from "./Modal";
import EnquiryForm from "./EnquiryForm";
import { useSession } from "next-auth/react";
import FeedBackPanel from "./FeedBackPanel";
import FetchAndDisplayRecommendation from "./FetchAndDisplayRecommendation";
import Link from "next/link";

const DynamicDisplayMap = dynamic(() => import("@components/DisplayMap"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500 font-bold text-xl w-full h-full flex justify-center items-center">
      Loading Map...
    </p>
  ),
});

const PropertyListingPage = ({ listingData }) => {
  const { data: session } = useSession();
  const constructionDate = new Date(listingData?.construction_date);
  const formattedDate = constructionDate.toLocaleDateString("en-GB");
  const images = [listingData?.media.thumbnail, ...listingData?.media.images];
  const [openMapModal, setOpenMapModal] = useState(false);
  const [open3DViewModal, setOpen3DViewModal] = useState(false);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [feedbacks, setFeedBacks] = useState(listingData?.feedbacks);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const modals = {
    map: (
      <Modal
        isOpen={openMapModal}
        title="Property Location"
        onClose={() => setOpenMapModal(false)}
      >
        <DynamicDisplayMap mainMarkerCoords={listingData?.location?.coordinates} />
      </Modal>
    ),
    enquiry: (
      <Modal
        isOpen={openEnquiryModal}
        title="Make an Enquiry"
        onClose={() => setOpenEnquiryModal(false)}
      >
        <EnquiryForm listing_id={listingData?._id} session={session} />
      </Modal>
    ),
    threeDView: (
      <Modal
        isOpen={open3DViewModal}
        title="3D Property View"
        onClose={() => setOpen3DViewModal(false)}
      >
        {listingData?.media?.panorama ? (
          <iframe height="100%" width="100%" allowFullScreen src={listingData?.media?.panorama} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-xl text-gray-500 font-semibold">3D View Not Available</p>
          </div>
        )}
      </Modal>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title and Address Section */}
      <div className="bg-white shadow-md py-6 px-4 md:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
            {listingData?.property_title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <CiLocationOn className="text-active-orange text-xl" />
            <p className="text-sm md:text-base">
              {formatAddress(listingData?.location?.address)}
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1  gap-4">
          {/* Main Image */}
          <div className="lg:col-span-2 aspect-[4/3] lg:aspect-[5/2] relative rounded-lg overflow-hidden">
            <Image
              src={images[selectedImage]}
              layout="fill"
              objectFit="cover"
              alt="Property"
              className="hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>



          {/*Thumbnails */}
          <div className="flex gap-2 overflow-x-auto  pb-2  w-full justify-center">
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-none w-20 h-20 relative rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-active-orange" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  alt={`Property ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Price and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {formatter.format(listingData?.price)}
              </h2>
              <p className="text-gray-600">{listingData?.listing_type?.label}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                className="flex-1 md:flex-initial py-3 px-6 text-base md:text-lg rounded-lg flex items-center justify-center gap-2"
                clickHandler={() => setOpenEnquiryModal(true)}
              >
                <i className="fa-solid fa-envelope text-white"></i>
                Make Enquiry
              </Button>
              <Link
                href={`https://wa.me/+91${listingData?.phone}`}
                target="_blank"
                className="flex-1 md:flex-initial"
              >
                <Button className="w-full py-3 px-6 text-base md:text-lg rounded-lg flex items-center justify-center gap-2">
                  <FaWhatsapp size={20} />
                  WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBed className="text-active-orange text-xl" />
                  <span>{listingData?.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBath className="text-active-orange text-xl" />
                  <span>{listingData?.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <TbRulerMeasure className="text-active-orange text-xl" />
                  <span>{listingData?.area} sq.ft</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <i className="fa-solid fa-home text-active-orange"></i>
                  <span>{listingData?.property_type.label}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                clickHandler={() => setOpenMapModal(true)}
              >
                <CiLocationOn size={20} />
                View on Map
              </Button>
              <Button
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                clickHandler={() => setOpen3DViewModal(true)}
              >
                <TbHexagon3D size={20} />
                3D View
              </Button>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listingData?.amenities.map((amenity) => (
                  <div
                    key={amenity.value}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <i className="fa-solid fa-check text-active-orange"></i>
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {listingData?.property_description}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Listed By</h2>
              <UserDataDisplay user={listingData?.user} />
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Property Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Listed For</span>
                  <span className="font-medium">{listingData?.listing_type?.label}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Furnishing</span>
                  <span className="font-medium">{listingData?.furnished_status?.label}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Built Date</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Contact</span>
                  <span className="font-medium">{listingData?.phone}</span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <FeedBackPanel
                feedbacks={feedbacks}
                setFeedBacks={setFeedBacks}
                property_listing={listingData._id}
              />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Properties</h2>
          <FetchAndDisplayRecommendation id={listingData._id} />
        </div>
      </div>

      {/* Modals */}
      {modals.map}
      {modals.enquiry}
      {modals.threeDView}
    </div>
  );
};

export default PropertyListingPage;