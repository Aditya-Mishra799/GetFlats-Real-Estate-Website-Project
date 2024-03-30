"use server";
import User from "@models/user";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import { checkForFavourites } from "@app/api/listing/user/[id]/route";
import { connectToDB } from "@utils/database";
import PropertyListing from "@models/property_listing";

const buildMongoDBSearchQuery = (filterQuery) => {
    const queryArrayAndPart = [];
    const labelFilter = new Set([
      "property_type",
      "furnished_status",
      "listing_type",
    ]);
    const numericFilter = new Set([
      "area",
      "price",
      "halls",
      "bedrooms",
      "bathrooms",
    ]);
    Object.entries(filterQuery).forEach(([key, value]) => {
      if (value) {
        if (key === "keywords") {
          const keywordRegex = filterQuery.keywords
            .split(" ")
            .map((keyword) => new RegExp(keyword, "i"));
          queryArrayAndPart.push({
            $or: [
              { property_title: { $in: keywordRegex } },
              { property_description: { $in: keywordRegex } },
            ],
          });
        } else if (labelFilter.has(key) && value.length >= 1) {
          queryArrayAndPart.push({ [`${key}.label`]: { $in: value } });
        } else if (numericFilter.has(key) && value.length === 2) {
          queryArrayAndPart.push({ [key]: { $gte: value[0], $lte: value[1] } });
        } else if (key === "amenities" && value.length >= 1) {
          queryArrayAndPart.push({
            "amenities.label": { $all: value },
          });
        } else if (key === "coordinates" && value.length === 2) {
          queryArrayAndPart.push({
            "location.coordinates": {
              $geoWithin: {
                $centerSphere: [
                  value, //center thr sphere around passed coordinates
                  10 / 6378.1, // 10km radius in radians (6378.1 is approximate radius of earth in km)
                ],
              },
            },
          });
        } else if (key === "construction_date") {
          queryArrayAndPart.push({
            construction_date: { $lt: filterQuery.constructionDate },
          });
        }
      }
    });
  
    if (queryArrayAndPart.length === 0) return {};
  
    return { $and: queryArrayAndPart };
  };
  export async function getData(perPage, page, filterQuery) {
    console.log('Received search request')
    const session = await getServerSession(nextAuthOptions);
    const query = buildMongoDBSearchQuery(JSON.parse(filterQuery));
    try {
      const client = await connectToDB();
      let listings = await PropertyListing.find(query)
        .populate("creator")
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean()
        .exec();
      if (session?.user?.id) {
        listings = await checkForFavourites(listings, session.user.id);
      }
      const listingCount = await PropertyListing.countDocuments(query);
      const response = { listings: JSON.stringify(listings), listingCount };
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch data. Please try again..");
    }
  }