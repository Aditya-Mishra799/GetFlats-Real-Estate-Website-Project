export const fetchListingData = async(setListingData, listing_id)=>{
    const endpoint = '/api/listing/view/'+listing_id
    const response = await fetch(endpoint);
    const data = await response.json()
    setListingData(data)
  }