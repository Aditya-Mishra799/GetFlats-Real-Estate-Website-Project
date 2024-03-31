//GET API endpoint to show all the enquiries made by or received to a user
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import Enquiry from "@models/enquiry";
import { connectToDB } from "@utils/database";
export async function GET(req) {
  //check if user is looged in oor not
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
  const type = searchParams.get("type");
  const db = await connectToDB()
  if(type === 'received'){
    //get all the enquiries received by the user
    const enquiries =  await Enquiry.find({owner: session.user.id}).populate('creator').exec()
    return Response.json(enquiries, { status: 200 });
  }else if(type === 'sent'){
    //get all the queries made by the user
    const enquiries = await Enquiry.find({creator: session.user.id}).populate('owner').exec()
    return Response.json(enquiries, { status: 200 });
  }
  return Response.json(
    { message: "Invalid request." },
    { status: 400 }
  );
}
