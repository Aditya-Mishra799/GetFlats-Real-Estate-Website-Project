"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useSnackBar } from "@components/SnackBar/SnackBarService";

const page = () => {
  //destructure the data from useSession return object and rename it as sessio
  const [providers, setProviders] = useState(null);
  const snackBar = useSnackBar();
  const snackBarLoggingData = {
    message: "Trying to login...",
    label: "Logging in",
  };
  const snackBarErrorData = {
    label: 'Login Failed!',
    message:'Login failed, please try again',
    link : {
      href: "/auth",
      label: "login",
    }
  }

  // set providers
  useEffect(() => {
    const setUpProviders = async () => {
      const result = await getProviders();
      console.log(result);
      setProviders(result);
    };
    setUpProviders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen pb-20">
      <div className="border border-orange-400 p-10 rounded-md bg-slate-100 text-left">
        <h1 className="text-3xl font-bold">Get Started with us</h1>
        <h2 className="text-xl font-semibold mb-4">
          Sign in with one of the providers
        </h2>
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={async () => {
                  snackBar.open("loading", snackBarLoggingData, Infinity);
                  try {
                    const success = await signIn(provider.id, {
                      callbackUrl: "/",
                    });
                  } catch (error) {
                    snackBar.open("alert", snackBarErrorData, 7000);
                  }
                }}
                className="mt-3 w-full primary_btn active:ring-2 active:ring-slate-900"
              >
                {provider.name} Login
              </button>
            ))}
        </>
      </div>
    </div>
  );
};

export default page;
