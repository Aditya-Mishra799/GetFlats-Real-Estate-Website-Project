"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

const PropertyListingsCard = ({ data, setCards, index }) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const { data: session } = useSession();
  const snackBar = useSnackBar();
  const diplayAddress = `${data?.location?.address?.suburb ?? ""}
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
            message: data.isFavourite
              ? "Removed from wish list"
              : "Added to wish list",
          },
          7000
        );
      }
      setCards((prevState) => {
        const updatedCards = [...prevState]; // Create a copy of the previous state array
        updatedCards[index] = {
          ...updatedCards[index],
          isFavourite: !updatedCards[index].isFavourite,
        };
        return updatedCards;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const menuDropDownButton = (
    <div
      className="absolute text-md tracking-wider font-semibold top-1 right-1 hover:bg-white p-1  rounded-full  hover:text-active-orange  cursor-pointer "
      title={"Menu"}
      onClick={() => setOpenMenu((prevstate) => !prevstate)}
      aria-label="Menu"
    >
      <div className="w-full h-full relative">
        <BsThreeDotsVertical />
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
    <div className="flex flex-col max-w-60 min-w-60 rounded-lg shadow-lg  hover:shadow-2xl">
      {/* Hero Iamge */}
      <div className="w-full relative mb-2">
        <Image
          src={data?.media?.thumbnail}
          width={100}
          height={100}
          alt={data?.property_title}
          className="w-full object-cover h-40 rounded-t-lg"
        />
        <div className="absolute text-sm tracking-wider font-semibold bottom-1 left-1 bg-white p-1 opacity-50 rounded-sm truncate ...">
          {diplayAddress}
        </div>
        {session?.user && (
          <button
            className={
              "absolute text-md tracking-wider font-semibold top-1 left-1 bg-white p-1  rounded-full  hover:text-red-600 hover:opacity-100 " +
              (data?.isFavourite ? "text-red-600 opacity-100" : "opacity-50")
            }
            title={"Add to Favorite"}
            onClick={toggleListingFavourites}
            aria-label="Add to Favorite"
          >
            <FaHeart />
          </button>
        )}
        {data?.creator?._id === session?.user?.id && menuDropDownButton}
      </div>
      <div className="p-2 space-y-1.5">
        <div className="flex gap-1">
          <h3 className="px-2 py-1 text-xs uppercase tracking-wider font-semibold border border-active-orange rounded-md text-active-orange">
            {data?.listing_type?.label}
          </h3>
          <h3 className="px-2 py-1 text-xs uppercase tracking-wider font-semibold   rounded-lg text-active-orange">
            {data?.property_type?.label}
          </h3>
          <Button
            className={"px-1.5 py-1 uppercase text-sm"}
            onClick={handleClick}
            title={"View Detail"}
            aria-label="View Detail"
          >
            View
          </Button>
        </div>
        <div className="text-center">
          <p>
            <span className="font-bold tracking-wide uppercase">
              Sale Price:{" "}
            </span>{" "}
            {formatter.format(data?.price)}
          </p>
        </div>
      </div>

      {/* Additional details */}
      <div className="flex gap-1 flex-wrap mb-2 px-2">
        <Button
          className={
            "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
          }
        >
          <FaBed size={20} /> {data?.bedrooms}
        </Button>

        <Button
          className={
            "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
          }
        >
          <FaBath size={20} /> {data?.bathrooms}
        </Button>
        <Button
          className={
            "outline_btn px-2 py-1 font-medium text-sm flex  items-center rounded-lg gap-2"
          }
        >
          <TbRulerMeasure size={20} /> {data?.area} sqft
        </Button>
      </div>
      {Add3DImageModal}
    </div>
  );
};

export default PropertyListingsCard;
