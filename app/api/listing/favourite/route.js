import PropertyListing from "@models/property_listing";
import Favourites from "@models/favourites";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@app/api/auth/[...nextauth]/route";

//POST API end point to change the status of enquiry to accepted or rejected
export async  function GET(req){
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      return Response.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }
    console.log('Received favourite request')
    const user_id = session?.user.id;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    //get the listing id from search params
    const property_listing_id = searchParams.get("id");

    //checking if already an entry of current property listing with user exists in favourites collection

    const favourite_entry = await Favourites.findOne({user : user_id, property_listing: property_listing_id}).exec()
    if(favourite_entry  && favourite_entry !== []){
        await Favourites.deleteOne({ _id: favourite_entry._id }); 
        console.log("Removed from favourites")
        return Response.json(
            { message: "Removed from favourites." },
            { status: 200 }
          );
    }else{
       const newEntry =  await Favourites.create({user : user_id, property_listing: property_listing_id})
       console.log(newEntry, 'Added to favourites')
       return Response.json(
            { message: "Added to favourites." },
            { status: 200 }
          );
    }
}
