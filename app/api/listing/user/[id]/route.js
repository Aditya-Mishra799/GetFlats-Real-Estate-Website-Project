//GET API ROUTE TO FETCH ALL PROPERTY LISTINGS ADDED BY A USER --------------
import { connectToDB } from "@utils/database";
import PropertyListing from "@models/property_listing";
import User from "@models/user";
import { NextResponse } from "next/server";
// import { getSession } from "next-auth/client"

//GET to read request
// fetch posts
export const GET = async (req, {params})=>{
    try {
      await connectToDB();
      console.log(params.id)
      //later add functionality to check if listing is liked by user and also append that to data
      let listings = await PropertyListing.find({
        creator: params.id
      }).populate("creator").exec();

      if(!listings){
         listings = []
      } 
      //send response
      console.log('Fetched listing and sent to user')

      return new Response(JSON.stringify(listings), {status : 200})
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}