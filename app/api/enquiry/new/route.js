import { connectToDB } from "@utils/database";
import Enquiry from "@models/enquiry";
import PropertyListing from "@models/property_listing";
export async function POST(req) {
  const data = await req.json();
  console.log("Received data: ", data);
  try {
    const db = await connectToDB();

    //check if enquiry is made by user for same listing previously
    const existingEnquiry = await Enquiry.findOne({
      creator: data.creator,
      property_listing: data.property_listing,
    }).exec();
    if (existingEnquiry) {
      console.log("Already maid and enquiry exists!");
      return new Response(
        JSON.stringify({
          message: "You have already made an enquiry for this listing!",
        }),
        { status: 400 }
      );
    }
    //check if user is making and enquiry to it's own listed property and don't allow
    const property = await PropertyListing.findById(data.property_listing).exec();
    console.log("Property Found : ", property)
    if (property && property?.creator == data?.creator) {
      console.log(
        "User is trying to make an enquiry to their own listed property!"
      );
      return new Response(
        JSON.stringify({
          message: "You cannot make an enquiry to your own listed property!",
        }),
        { status: 400 }
      );
    }
    //create new enquiry if not made previously
    const enquiry = new Enquiry({...data, owner: property?.creator});
    await enquiry.save();
    console.log("Enquiry added successfully!");
    return new Response(
      JSON.stringify({ message: "Enquiry added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to add Enquiry!" }), {
      status: 500,
    });
  }
}
