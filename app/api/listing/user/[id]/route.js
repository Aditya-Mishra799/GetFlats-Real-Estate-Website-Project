//GET API ROUTE TO FETCH ALL PROPERTY LISTINGS ADDED BY A USER --------------
import { connectToDB } from "@utils/database";
import PropertyListing from "@models/property_listing";
import User from "@models/user";
import Favourites from "@models/favourites";
import { NextResponse } from "next/server";

//GET to read request
// fetch posts
export const checkForFavourites = async (listings, user_id) => {
  return await Promise.all(
    listings.map(async (listing) => {
      const isFavourite = await Favourites.findOne({
        user: user_id,
        property_listing: listing._id,
      }).exec();
      if (isFavourite) return { ...listing, isFavourite: true };
      else return { ...listing, isFavourite: false };
    })
  );
};
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id} = params;
    const requestURL = new URL(req.url)
    const {page = 1, limit = 10 } = Object.fromEntries(requestURL.searchParams)
    const skip = (page - 1) * limit;
    //later add functionality to check if listing is liked by user and also append that to data
    let listings = await PropertyListing.find({
      creator: id,
    })
      .populate("creator")
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
    const totalDocuments = await PropertyListing.countDocuments({
      creator: id,
    });
    const totalPages = Math.ceil(totalDocuments / limit);

    if (!listings) {
      listings = [];
    }
    //send response
    console.log("Fetched listing and sent to user");
    const listings_with_favourites = await checkForFavourites(
      listings,
      params.id
    );
    return new Response(
      JSON.stringify({
        items: listings_with_favourites,
        page,
        limit,
        totalDocuments,
        totalPages,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
