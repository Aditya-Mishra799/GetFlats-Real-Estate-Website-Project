"use server";
import React from "react";
import { connectToDB } from "@utils/database";
import { Db } from "mongodb";
import PropertyListing from "@models/property_listing";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import Link from "next/link";
import FilterPanel from "@components/FilterPanel";
import { redirect } from "next/navigation";
import User from "@models/user";
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
      } else if (key === "amenities" && value.length >= 1 ) {
        queryArrayAndPart.push({
          'amenities.label' :  { $all: value } ,
        });
      } else if (key === "coordinates" && value.length === 2) {
        console.log(value)
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
async function getData(perPage, page, filterQuery) {
 
  const query = buildMongoDBSearchQuery(JSON.parse(filterQuery));
  console.log(query);
  try {
    const client = await connectToDB();
    console.log(filterQuery);
    const listings = await PropertyListing.find(query)
    .populate('creator')
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean()
      .exec();
    const listingCount = await PropertyListing.countDocuments(query);
    const response = { listings: JSON.stringify(listings), listingCount };
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data. Please try again..");
  }
}
const page = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);
  const query = searchParams.query;

  //set url if loaded incorrectly
  if (page < 1 || !page || !query) {
    redirect("?page=1&query={}");
  }

  const perPage = 8;

  //fetch the data based on page and our filter query
  const data = await getData(perPage, page, query);

  //user navigation between pages
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const totalPages = Math.ceil(data.listingCount / perPage);
  const pageNumbers = [];
  const offsetNumbers = 3;

  //surrounding page number generator
  for (let i = page - offsetNumbers; i <= page + offsetNumbers; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="container  mt-8 w-full">
      <div className="flex  gap-1">
        <div className="lg:w-80 lg:min-w-80 lg:max-w-80">
          <FilterPanel query={query} />
        </div>
        <div className="grow w-full">
          <h3 className="text-xl font-semibold mx-8 lg:mx-14 mb-4">
            Showing {data.listingCount === 0 ? 0 : (page - 1) * perPage + 1} -{" "}
            {page === totalPages || data.listingCount === 0 ? data.listingCount : page * perPage} listings
            out of {data.listingCount} ...
          </h3>
          <div className="flex  gap-4  flex-wrap  mx-8 lg:mx-14 ">

            {
              data.listingCount === 0 && <div className="my-6 text-xl font-bold w-full text-center text-slate-600">No listings found matching with the configured filter : (</div>
            }
            {JSON.parse(data.listings).map((listing) => (
              <PropertyListingsCard data={listing} key={listing._id} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-10 mb-5">
            <div className="flex border gap-1 rounded-lg border-faded-orange px-2.5 py-1.5 text-md font-semibold">
              {page === 1 ? (
                <div className="opacity-65 text-slate-400 ">Previous</div>
              ) : (
                <Link href={`?page=${prevPage}&query=${query}`}>Previous</Link>
              )}

              {pageNumbers.map((pageNumber, index) => (
                <Link
                  href={`?page=${pageNumber}&query=${query}`}
                  className={`${
                    pageNumber === page
                      ? "text-white bg-active-orange  "
                      : "hover:bg-faded-orange"
                  } px-2 rounded-sm transition-all`}
                  key={index}
                >
                  {pageNumber}
                </Link>
              ))}
              {page === totalPages ? (
                <div className="opacity-65  text-slate-400">Next</div>
              ) : (
                <Link href={`?page=${nextPage}&query=${query}`}>Next</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
