import { getServerSession } from "next-auth/next";
import Feedbacks from "@models/feedbacks";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import { connectToDB } from "@utils/database";

//Get API endpoint to fetch all favourite lsiting i.e wishlist of an user
export async function POST(req) {
  const session = await getServerSession(nextAuthOptions);
  console.log("Feedback request");
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    const user_id = session?.user?.id;
    const data = await req.json()
    const { feedback, property_listing } =  data;
    const db = await connectToDB()
    const createdfeedback = await Feedbacks.create({
      user: user_id,
      feedback : feedback,
      property_listing : property_listing,
    });
    const feedBackDataComplete = await Feedbacks.findById(createdfeedback?._id).populate('user').lean().exec()
    console.log("Feedback created successfully");
    return Response.json(feedBackDataComplete, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
