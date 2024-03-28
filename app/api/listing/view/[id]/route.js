import { connectToDB } from "@utils/database"
import PropertyListing from "@models/property_listing";
import User from "@models/user";
import Feedbacks from "@models/feedbacks";
//GET to read request
// fetch listings
export const GET = async (req, {params})=>{
    try {
      await connectToDB();
      let listings = await PropertyListing.findById(params.id);

      if(!listings){
        return new Response("listing not found", {status: 404})
      }
      const user = await User.findById(listings?.creator);
      const feedbacks = await  Feedbacks.find({property_listing: listings._id}).populate('user').exec();
      listings = {...listings?._doc, user: user, feedbacks}
      if( !listings.location.address || Object.keys(listings.location.address).length === 0 || listings.location.address === ''){
        const lat = listings.location.coordinates[0]
        const long = listings.location.coordinates[1]
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
        const response = await fetch(url)
        if(response.ok){
          const result = await response.json()
          listings.location['address'] = result.address
        }
      }
      return new Response(JSON.stringify(listings), {status : 200})
    } catch (error) {
        console.error(error)
        return new Response("Failed to Load lsiting data!", {status: 500} )
    }
}

//Patch (update)
// export const PATCH = async (req, {params})=>{
//     const {quote, tag}  = await req.json();
//     console.log(`${quote}, ${tag}`)
//     try {
//         await connectToDB()
//         const existingPost = await Post.findById(params.id);
//         if(!existingPost){
//             return new Response("Post not found", {status: 404})
//         }
//         // update the data
//         existingPost.quote = quote;
//         existingPost.tag = tag;
//         // save the data to mono DB
//         await existingPost.save();

//         return new Response(JSON.stringify(existingPost), {status: 200})

//     } catch (error) {
//         return new Response("Failed to Update Quotes!" + error + 'Patch', {status: 500} )
//     }
// }

// //Delete (delete)
// export const DELETE = async (req, {params})=>{
//     let post = {}
//     try {
//         await connectToDB();
//         await Post.findByIdAndDelete(params.id);
//         return new Response("Post Deleted", {status: 200})
//     } catch (error) {
//         return new Response('Failed to Delete Post!', {status: 500})
//     }
// }