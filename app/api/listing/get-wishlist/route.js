import Favourites from "@models/favourites";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import { connectToDB } from "@utils/database";

//Get API endpoint to fetch all favourite lsiting i.e wishlist of an user
export async function GET(req) {
  const session = await getServerSession(nextAuthOptions);
  console.log("Fetching wish list");
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    const db = await connectToDB();
    const user_id = session?.user?.id;
    const requestURL = new URL(req.url);
    const { page = 1, limit = 10 } = Object.fromEntries(
      requestURL.searchParams
    );
    const skip = (page - 1) * limit;
    const wishlist = await Favourites.find({ user: user_id })
      .populate("property_listing")
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
    const totalDocuments = await Favourites.countDocuments({ user: user_id });
    const totalPages = Math.ceil(totalDocuments / limit);
    //extract the property listings
    const listings_in_wishlist = wishlist.map((listing) => ({
      ...listing.property_listing,
      isFavourite: true,
    }));
    return Response.json(
      {
        items: listings_in_wishlist,
        page,
        limit,
        totalDocuments,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
