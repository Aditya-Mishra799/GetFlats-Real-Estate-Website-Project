import { connectToDB } from "@utils/database"
import PropertyListing from "@models/property_listing";
import { uploadImagesToBlobStore } from "../../../../common_functions/uploadImagesToBlobStore";
export async function POST(req, res){
    const data = await req.formData()
    let thumbnail = null;
    let images = [];
    const listingData = {}
    for(const [name, value] of data.entries()){
        if(name === 'thumbnail'){
            thumbnail = value
        }
        else if(name === 'images'){
            images.push(value)
        }
        else{
            listingData[name] = JSON.parse(value)
        }
    }
   
    try {
        const thumbnailURL = await uploadImagesToBlobStore(thumbnail)
        const imageURLs = await uploadImagesToBlobStore(images)
        listingData['media'] ={ thumbnail: thumbnailURL, images : imageURLs}
        console.log('All Images Uploaded!')
        await connectToDB()
        const newListing = new PropertyListing({...listingData})
        await newListing.save()
        console.log('Added listing to mongo DB Atlas !')
        //Response is a fetch Api Class and it sends a response to client
        //it contains message and status and other meta data 
        return new Response(JSON.stringify(newListing), {status: 201})

    } catch (error) {
        console.error(error)
        return new Response("Failed to add property listing!", {status: 500} )
    }
}