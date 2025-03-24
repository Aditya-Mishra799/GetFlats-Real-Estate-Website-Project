"use client";
import React, { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const page = () => {
  const [providers, setProviders] = useState(null);
  const snackBar = useSnackBar();
  const snackBarLoggingData = {
    message: "Trying to login...",
    label: "Logging in",
  };
  const snackBarErrorData = {
    label: 'Login Failed!',
    message: 'Login failed, please try again',
    link: {
      href: "/auth",
      label: "login",
    }
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const result = await getProviders();
      setProviders(result);
    };
    setUpProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to GetFlats</p>
        </div>

        <div className="mt-8 space-y-6">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={async () => {
                  snackBar.open("loading", snackBarLoggingData, Infinity);
                  try {
                    await signIn(provider.id, { callbackUrl: "/" });
                  } catch (error) {
                    snackBar.open("alert", snackBarErrorData, 7000);
                  }
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white text-gray-700 font-medium"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
            ))}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          By continuing, you agree to GetFlats's Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default page;