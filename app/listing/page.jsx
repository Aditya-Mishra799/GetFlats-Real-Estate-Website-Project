'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PropertyListingPage from "@components/PropertyListingPage";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const listing_id = useSearchParams().get("id");
  const [listingData, setListingData] = useState(null)
  const fetchListingData = async()=>{
    if(listing_id){
    const endpoint =  '/api/listing/view/'+listing_id
    const response = await fetch(endpoint);
    const data = await response.json()
    setListingData(data)
    }
  }
  useEffect(()=>{
    const setData = async ()=>{
        if(listing_id){
            await fetchListingData()
        }
    }
    setData()
  },[listing_id])
  if (!listingData) {
    return <div className="font-bold text-xl flex w-screen h-screen items-center justify-center"><div>Loading...</div></div>;
  }
  return (
    <PropertyListingPage listingData = {listingData}/>
  )
};
                   
export default page;