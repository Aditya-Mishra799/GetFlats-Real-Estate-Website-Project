import dynamic from "next/dynamic";
import React from 'react'
const DynamicMapSearchPage = dynamic(() => import("@components/MapSearchPage"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500 font-bold text-xl w-full h-screen flex justify-center items-center">
      Loading Map...
    </p>
  ),
});
const page = () => {
  return (
    <>
      <DynamicMapSearchPage/>
    </>
  )
}

export default page

