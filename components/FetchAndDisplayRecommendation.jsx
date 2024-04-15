import React, {useState, useEffect} from "react";
import PropertyListingsCard from "./PropertyLisingsCard";
//this is a component to fetch and display the the similar property listings
//via making a get request to the mentioned endpoint url
const FetchAndDisplayRecommendation = ({ id }) => {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchRecommendations = async ()=>{
      setListings([])
      try {
        const response =  await fetch("/api/listing/fetch-recommendation?id=" + id)
        if(response.ok){
          const data = await response.json()
          setListings(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecommendations()
  
  }, [id]);
  return (
    <div className="flex flex-col gap-2 mx-1 my-4 shadow-md p-2 border rounded-sm border-dashed">
      <h3 className="text-md font-bold text-slate-900 md:text-xl">
        Rcommended Similar Property Listings{" "}
      </h3>
      {/* Diplay the fetched listings */}
      <div className="flex gap-x-4 gap-y-6 overflow-scroll hidden-scrollbar  mx-2 my-4">
        {listings.length === 0 && (
          <div className="text-center text-xl font-bold text-slate-700">
            Loading ...
          </div>
        )}
        {listings && listings.map((listing, index) => (
          <PropertyListingsCard key={listing._id} data={listing} />
        ))}
      </div>
    </div>
  );
};

export default FetchAndDisplayRecommendation;
