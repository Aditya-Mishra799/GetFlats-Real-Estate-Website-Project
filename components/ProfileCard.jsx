import Image from "next/image";
import React from "react";

const ProfileCard = ({ user, handleLogOut,control = false }) => {
  return (
    <div className="border p-4 rounded-md  max-w-max  shadow-md flex flex-col max-h-max">
      <h1 className="text-2xl font-semibold">Profile</h1>
      {user && (
        <div>
          <Image
            height={120}
            width={120}
            src={user.image}
            alt="profile"
            title="profile"
            className="mx-auto my-3 rounded-md shadow-sm"
          />
          <div className="flex flex-col gap-2 mt-5">
            <p>
              <span className="font-medium ">Name: </span>{" "}
              <span>{user.name}</span>
            </p>
            <p>
              <span className="font-medium ">Email:</span>{" "}
              <span>{user.email}</span>
            </p>
          </div>
        </div>
      )}
      {control && (
        <div className="flex justify-between items-center mt-4 gap-3">
          <button className="primary_btn" onClick={handleLogOut}>
            Log Out
          </button>
          <button className="outline_btn">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
