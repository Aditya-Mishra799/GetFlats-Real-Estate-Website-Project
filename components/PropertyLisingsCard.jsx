"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBath, FaBed, FaHeart } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DropDownMenu from "./DropDownMenu";
import Modal from "./Modal";
import Add3DImagePage from "./Add3DImagePage";
import { useSnackBar } from "./SnackBar/SnackBarService";
import Link from "next/link";

const PropertyListingsCard = ({ data, setCards, index }) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const { data: session } = useSession();
  const [isFavourite, setIsFavourite] = useState(data?.isFavourite);
  const snackBar = useSnackBar();
  const displayAddress = `${data?.location?.address?.suburb ?? ""}
    ${data?.location?.address?.city ?? ""} 
    ${data?.location?.address?.state ?? ""}`;

  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [openAdd3DImageModel, setOpenAdd3DImageModel] = useState(false);

  const handleClick = () => {
    router.push(`/listing?id=${data?._id}`);
  };

  const toggleListingFavourites = async () => {
    try {
      const result = await fetch(`api/listing/favourite?id=${data._id}`);
      if (result.ok) {
        snackBar.open(
          "success",
          {
            label: "Success!",
            message: isFavourite
              ? "Removed from wish list"
              : "Added to wish list",
          },
          7000
        );
      }
      setCards && setCards((prevState) => {
        const updatedCards = [...prevState];
        updatedCards[index] = {
          ...updatedCards[index],
          isFavourite: !updatedCards[index].isFavourite,
        };
        return updatedCards;
      });
      setIsFavourite(previous => !previous);
    } catch (error) {
      console.log(error);
    }
  };

  const menuDropDownButton = (
    <div className="absolute top-3 right-3 z-10">
      <button
        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300"
        onClick={() => setOpenMenu(!openMenu)}
        title="Menu"
      >
        <BsThreeDotsVertical className="text-gray-700" />
      </button>
      <DropDownMenu
        menuOptions={[
          {
            label: "Add 3D view",
            onClick: () => setOpenAdd3DImageModel(true),
          },
          { label: "Delete" },
          { label: "Update" },
        ]}
        open={openMenu}
      />
    </div>
  );

  const Add3DImageModal = (
    <Modal
      title="Add 3D Image"
      isOpen={openAdd3DImageModel}
      onClose={() => setOpenAdd3DImageModel(false)}
    >
      <Add3DImagePage listing_id={data._id} />
    </Modal>
  );

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-72">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={data?.media?.thumbnail}
          alt={data?.property_title}
          width={300}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay with listing type and property type */}
        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs bg-active-orange text-white rounded-full">
              {data?.listing_type?.label}
            </span>
            <span className="px-2 py-1 text-xs bg-white/90 text-active-orange rounded-full">
              {data?.property_type?.label}
            </span>
          </div>
        </div>

        {/* Favorite Button */}
        {session?.user && (
          <button
            onClick={toggleListingFavourites}
            className={`absolute top-3 right-14 p-2 rounded-full transition-all duration-300 ${
              isFavourite 
                ? "bg-active-orange text-white" 
                : "bg-white/90 text-gray-600 hover:bg-active-orange hover:text-white"
            }`}
            title={isFavourite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <FaHeart />
          </button>
        )}

        {/* Menu Button */}
        {data?.creator?._id === session?.user?.id && menuDropDownButton}

        {/* Address Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-white text-sm truncate">{displayAddress}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Price */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">
            {formatter.format(data?.price)}
          </p>
        </div>

        {/* Property Features */}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-1 text-gray-600">
            <FaBed className="text-active-orange" />
            <span>{data?.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FaBath className="text-active-orange" />
            <span>{data?.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <TbRulerMeasure className="text-active-orange" />
            <span>{data?.area} sqft</span>
          </div>
        </div>

        {/* View Button */}
        <Link
          href = {`/listing?id=${data?._id}`}
          className="w-full bg-active-orange text-white py-2 rounded-lg hover:bg-dark-orange transition-all duration-300 font-medium block text-center"
        >
          View Details
        </Link>
      </div>

      {Add3DImageModal}
    </div>
  );
};

export default PropertyListingsCard;