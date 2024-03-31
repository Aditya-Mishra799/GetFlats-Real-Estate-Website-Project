import PropertyListing from "@models/property_listing";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import { checkForFavourites } from "../user/[id]/route";
import { connectToDB } from "@utils/database";

//route to fetch the recommendations for  a property listing
export async function GET(req) {
  const session = await getServerSession(nextAuthOptions);
  console.log("Got recommendation request");
  const recommendationAPIUrl =
    process.env.NEXT_PUBLIC_RECOMMENDATION_API_ENDPOINT_BASE_URL;
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  //get the listing id from search params
  const property_listing_id = searchParams.get("id");
  try {
    const response = await fetch(
      recommendationAPIUrl + `/similar-listings?id=${property_listing_id}`
    );
    //return empty list if recommendation end point is not working
    if (!response.ok) {
        return Response.json([], { status: 200 });
      }
    const result = await response.json();
    const db = await connectToDB()
    let listings = await PropertyListing.find({
      _id: { $in: result.similar_listings },
    })
      .populate("creator")
      .lean()
      .exec();
    if (session?.user?.id) {
      listings = await checkForFavourites(listings, session.user.id);
    }
    return Response.json(listings, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
