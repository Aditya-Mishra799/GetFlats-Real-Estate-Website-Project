import PropertyListing from "@models/property_listing";

export const GET = async (req, {params})=>{
    try {
      await connectToDB();
      const similarListings = await findSimilarProperties(params?.id)
      return new Response(JSON.stringify(similarListings), {status : 200})
    } catch (error) {
        console.error(error)
        return new Response("Failed to find similar listings data", {status: 500} )
    }
}

async function findSimilarProperties(propertyId, maxDistanceKm = 5, maxPriceDifference = 20) {
  const property = await PropertyListing.findById(propertyId);
  if (!property) throw new Error("Property not found");

  return await PropertyListing.aggregate([
    {
      // Step 1: Text Search on Title & Description
      $search: {
        index: "property_text_index",
        text: {
          query: property.property_title + " " + property.property_description,
          path: ["property_title", "property_description"],
          fuzzy: { maxEdits: 2 }, // Handles typos & paraphrasing
        },
      },
    },
    {
      // Step 2: Geo-Spatial Filtering
      $geoNear: {
        near: { type: "Point", coordinates: property.location.coordinates },
        distanceField: "distance",
        maxDistance: maxDistanceKm * 1000, // Convert km to meters
        spherical: true,
      },
    },
    {
      // Step 3: Filter by price range
      $match: {
        price: { $gte: property.price * (1 - maxPriceDifference / 100), $lte: property.price * (1 + maxPriceDifference / 100) },
      },
    },
    {
      // Step 4: Compute Jaccard Similarity for Amenities
      $addFields: {
        commonAmenities: {
          $size: {
            $setIntersection: ["$amenities.value", property.amenities.map((a) => a.value)],
          },
        },
        totalAmenities: {
          $size: {
            $setUnion: ["$amenities.value", property.amenities.map((a) => a.value)],
          },
        },
      },
    },
    {
      $addFields: {
        amenitySimilarity: {
          $divide: ["$commonAmenities", "$totalAmenities"], // Jaccard similarity score
        },
      },
    },
    {
      // Step 5: Compute Weighted Similarity Score
      $addFields: {
        similarityScore: {
          $add: [
            { $multiply: [{ $divide: [{ $abs: { $subtract: ["$price", property.price] } }, property.price] }, -0.3] }, // Price similarity (-0.3 weight)
            { $multiply: [{ $divide: [{ $abs: { $subtract: ["$area", property.area] } }, property.area] }, -0.2] }, // Area similarity (-0.2 weight)
            { $multiply: ["$amenitySimilarity", 0.5] }, // Amenities similarity (0.5 weight)
            { $multiply: [{ $divide: [{ $abs: { $subtract: ["$bedrooms", property.bedrooms] } }, property.bedrooms] }, -0.1] }, // Bedroom similarity (-0.1 weight)
          ],
        },
      },
    },
    {
      // Step 6: Sort by Most Similar
      $sort: { similarityScore: -1 },
    },
    {
      // Step 7: Limit Results
      $limit: 10,
    },
  ]);
}
