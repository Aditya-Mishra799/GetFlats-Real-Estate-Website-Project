'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchListingData } from "@utils/fetchListingData";
const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const listing_id = useSearchParams().get("id");
  const [listingData, setListingData] = useState()
  
  useEffect(()=>{
    fetchListingData(setListingData, listing_id)
  },[])
  return <div>
    Listing Data : 
    <br></br>
    {`\n\n${JSON.stringify(listingData)}`}
  </div>;
};

export default page;
