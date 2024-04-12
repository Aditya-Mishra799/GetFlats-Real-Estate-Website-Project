//this is the end-point where we fetch all th listings in the bound
import PropertyListing from "@models/property_listing";
import { connectToDB } from "@utils/database";
import { checkForFavourites } from "../user/[id]/route";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
export async function GET(req) {
  const {lat, lng, radius} = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  try {
    const db = await connectToDB();
    const session = await getServerSession(nextAuthOptions);
    console.log(lat, lng, radius)
    const query = {
        "location.coordinates": {
            $geoWithin: {
              $centerSphere: [
                [lat, lng], //center thr sphere around passed coordinates
                radius / 6378.1, // 10km radius in radians (6378.1 is approximate radius of earth in km)
              ],
            },
          },
    };

    let listings = await PropertyListing.find(query).limit(10).lean();
    if (session?.user?.id) {
        listings = await checkForFavourites(listings, session.user.id);
      }
    return Response.json(listings, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return Response.json([], { status: 200 });
  }
}
