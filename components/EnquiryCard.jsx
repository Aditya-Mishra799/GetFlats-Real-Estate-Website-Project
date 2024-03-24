import Image from "next/image";
import React from "react";
import { useSnackBar } from "./SnackBar/SnackBarService";

const EnquiryCard = ({ data, type }) => {
  let profileImage = null;
  let userData = null;
  const snackBar = useSnackBar();
  if (type === "received") {
    profileImage = data?.creator.image;
    userData = data?.creator;
  } else {
    profileImage = data?.owner.image;
    userData = data?.owner;
  }
  const handleStatusChange = async (status) => {
    const snackBarId = snackBar.open(
      "loading",
      {
        label: "Changing status..",
        message: "Please wait until the action is completed",
      },
      Infinity
    );

    try {
      const result = await fetch("/api/enquiry/change-status", {
        method: "POST",
        body: JSON.stringify({
          enquiry_id: data._id,
          status,
        }),
      });
      if (!result.ok) {
        throw new Error(JSON.stringify((await result.json())?.message));
      }
      snackBar.open(
        "success",
        {
          label: status + " enquiry",
          link: {
            href: "/profile",
            label: "view",
          },
        },
        7000
      );
    } catch (error) {
      snackBar.open(
        "alert",
        {
          label: "Submission Failed",
          message: (
            <div className="max-w-64 truncate ...">{`Error : ${error?.message}`}</div>
          ),
        },
        7000
      );
    } finally {
      snackBar.close(snackBarId);
    }
  };
  return (
    <div className="rounded-md shadow-md bg-slate-50 w-80 transition-all">
      {/* Controls */}
      {type === "received" && data?.status === "pending" && (
        <div className="flex justify-between items-center px-2 py-1 border-b-2 rounded-t-md">
          <button
            className=" text-red-500 px-2 py-1 "
            onClick={(e) => handleStatusChange("rejected")}
          >
            Reject
          </button>
          <button
            className="text-green-500 px-2 py-1"
            onClick={(e) => handleStatusChange("accepted")}
          >
            Accept
          </button>
        </div>
      )}
      <div className="px-4 py-2 flex flex-col gap-1">
        <p>
          <span className="font-semibold">Phone:</span> {data.phone}
        </p>
        <p className="truncate   hover:text-black hover:whitespace-normal">
          <span className="font-semibold"> Contact Email:</span> {data.email}
        </p>
        <p>
          <span className="font-semibold">Status: </span> {data?.status}
        </p>
        <p className="line-clamp-4">{data?.description}</p>
      </div>
      <div className="bg-highlight-orange px-2 py-2 rounded-b-md">
        <div className="flex gap-2">
          <Image
            height={60}
            width={60}
            src={profileImage}
            className="rounded-full border-2 border-dashed border-active-orange border-spacing-2 p-1"
            alt="profile image"
          />
          <div className="flex flex-col gap-1 truncate ...">
            <p>{userData?.username}</p>
            <p>{userData?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryCard;
