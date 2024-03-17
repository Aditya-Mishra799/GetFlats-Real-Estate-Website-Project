'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const listing_id = useSearchParams().get("id");
  const [listingData, setListingData] = useState()
  const fetchListingData = async()=>{
    const response = await fetch(`/api/listing/view/${listing_id}`);
    const data = await response.json()
    setListingData(data)
  }
  useEffect(()=>{
    fetchListingData()
  },[])
  return <div>
    Listing Data : 
    <br></br>
    {`\n\n${JSON.stringify(listingData)}`}
  </div>;
};

export default page;
