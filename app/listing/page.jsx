'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const listing_id = useSearchParams().get("id");
  const [listingData, setListingData] = useState(null)
  const fetchListingData = async()=>{
    if(listing_id){
    const endpoint =  '/api/listing/view/'+listing_id
    console.log(endpoint)
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
    return <div className="font-bold text-xl">Loading...</div>;
  }
  return <div>
    Listing Data : 
    <br></br>
    <pre>{JSON.stringify(listingData, null, 2)}</pre>
  </div>;
};

export default page;
