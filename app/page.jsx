"use client";
import React, { useEffect } from "react";
import "../styles/globals.css";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
import { useSession } from "next-auth/react";

const Page = () => {
  const snackBar = useSnackBar();
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
  return <div className="border px-3 py-3 border-black">Home
  </div>;
};

export default Page;
