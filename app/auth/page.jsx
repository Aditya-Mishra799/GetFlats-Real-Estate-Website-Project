"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const page = () => {
  //destructure the data from useSession return object and rename it as sessio
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

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
        <h2 className="text-xl font-semibold mb-4">Sign in with one of the providers</h2>
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
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
