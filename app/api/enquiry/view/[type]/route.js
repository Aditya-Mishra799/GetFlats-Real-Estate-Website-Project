//GET API endpoint to show all the enquiries made by or received to a user
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import Enquiry from "@models/enquiry";
import { connectToDB } from "@utils/database";
export async function GET(req, { params }) {
  //check if user is loged in or not
  try {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      return Response.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    //get the type of enquiry to be fetched
    const { type } = params;
    const { page = 1, limit = 10 } = Object.fromEntries(searchParams);
    const skip = (page - 1) * limit;
    const db = await connectToDB();
    let enquiries = [];
    let filter = {};
    if (type === "received") {
      //get all the enquiries received by the user
      filter = { owner: session.user.id };
    } else if (type === "sent") {
      //get all the queries made by the user
      filter = { creator: session.user.id };
    } else {
      return Response.json({ message: "Invalid request." }, { status: 400 });
    }
    enquiries = await Enquiry.find(filter)
      .populate(type === "received" ? "creator" : "owner")
      .lean()
      .skip(skip)
      .limit(limit)
      .exec();
      const totalDocuments = await Enquiry.countDocuments(filter);
      const totalPages = Math.ceil(totalDocuments / limit);
    return Response.json({
      items: enquiries,
      page,
      limit,
      totalDocuments,
      totalPages,
    }, { status: 200 });
  } catch (error) {
    console.error(error)
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
