import { connectToDB } from "@utils/database";
import PropertyListing from "@models/property_listing";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("query");

    if (!query) {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    await connectToDB();

    const results = await PropertyListing.aggregate([
      {
        $search: {
          index: "property_text_index",
          autocomplete: {
            query: query,
            path: "property_title",
            fuzzy: { maxEdits: 2 },
          },
        },
      },
      { $limit: 10 }, 
      { $project: { property_title: 1, _id: 0 } },
    ]);

    return Response.json(results.map((item) => item.property_title), { status: 200 });
  } catch (error) {
    console.error("Autocomplete error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
