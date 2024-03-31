import Enquiry from "@models/enquiry";
import PropertyListing from "@models/property_listing";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";
import { connectToDB } from "@utils/database";

//POST API end point to change the status of enquiry to accepted or rejected
export async  function POST(req){
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      return Response.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }
    const data = await req.json();
    const  {enquiry_id, status} = data;
    const user_id = session?.user.id;
    const db = await connectToDB()
    const enquiry = await Enquiry.findById(enquiry_id).exec()
    if(enquiry.status !== 'pending'){
        return Response.json({message: `Enquiry is already ${enquiry.status}`}, {status: 400})
    }
    const property_listing = await PropertyListing.findById(enquiry.property_listing).exec()
    if(property_listing?.creator.toString() !== user_id){
        return Response.json({message: `You are not authorized to change the status of this enquiry`}, {status: 401})
    }
    enquiry.status = status;
    await enquiry.save();
    return Response.json({message: `Enquiry status changed to ${status}`}, {status: 200})
}
