//this is the end-point where we fetch all th listings in the bound
import PropertyListing from "@models/property_listing";
import { connectToDB } from "@utils/database";

export async function GET(req) {
  const { minLat, minLng, maxLat, maxLng } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  try {
    const db = await connectToDB();
    const query = {
      "location.coordinates": {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [minLat, minLng],
                [minLat, maxLng],
                [maxLat, maxLng],
                [maxLat, minLng],
                [minLat, minLng],
              ],
            ],
          },
        },
      },
    };

    const result = await PropertyListing.find(query)
      .select("location.coordinates")
      .lean();
    const coordinateArray = result.map((entry) => entry.location.coordinates);
    return Response.json(coordinateArray, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return Response.json([], { status: 200 });
  }
}
