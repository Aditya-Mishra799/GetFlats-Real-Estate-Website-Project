//POST API endpoint to add panorama image to media object of the property listings
import PropertyListing from "@models/property_listing";
import { connectToDB } from "@utils/database";
export async function POST(req) {
  try {
    const inputData = await req.json();
    const { creator, property_listing_id, panorama } = inputData;
    const db = await connectToDB()
    const listing = await PropertyListing.findById(property_listing_id);
    if (listing.creator.toString() !== creator) {
      return Response.json({ message: "Unauthorized access!" }, {status: 401});
    }
    //check if the listing already contains panorama url
    if (listing.media?.panorama) {
      return Response
        .json({ message: "Panorama image already exists!" },{status: 400});
    }
    listing.set("media.panorama", panorama)
    const updated_listing = await listing.save();
    console.log("Panorama image added successfully!");
    return Response
      .json({ message: "Panorama image added successfully!" }, {status: 202});
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error!" }, {status: 500});
  }
}
