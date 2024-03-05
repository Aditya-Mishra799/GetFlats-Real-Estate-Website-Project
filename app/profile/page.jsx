"use client";
import React from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
const page = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col justify-center items-center p-3 lg:flex-row w-full gap-4 lg:justify-between lg:m-5">
      <div className="border p-4 rounded-md border-orange-400 max-w-max  shadow-2xl flex flex-col">
        <h1 className="text-2xl font-semibold">Profile</h1>
        {session?.user && (
          <div>
            <Image
              height={120}
              width={120}
              src={session.user.image}
              alt="profile"
              title='profile'
              className="mx-auto my-3 rounded-md shadow-sm"
            />
            <div className="flex flex-col gap-2 mt-5">
                <p><span className="font-medium ">Name: </span> <span>{session.user.name}</span></p>
                <p><span className="font-medium ">Email:</span> <span>{session.user.email}</span></p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-4 gap-3">
        <button className="primary_btn" onClick={signOut}>Log Out</button>
        <button className="outline_btn" onClick={signOut}>Edit Profile</button>
        </div>
      </div>
      <div>
        <button className="border p-2 rounded-lg  bg-orange-400 text-white">
          Your Listings
        </button>
        <button>Wishlist</button>
        <button>Enquiries</button>
      </div>
    </div>
  );
};

export default page;
