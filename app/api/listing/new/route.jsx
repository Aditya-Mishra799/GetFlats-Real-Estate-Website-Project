import { NextResponse } from "next/server";
import {put} from "@vercel/blob";
import { connectToDB } from "@utils/database"
import PropertyListing from "@models/property_listing";
const uploadImage =  async (file)=>{
    if(file instanceof File){
        const blob = await(put(file.name, file , {
            access: "public",
        }))
    console.log(file.name, blob.url)
    return  blob.url
    }
}
async function postImages(file){
    if(file instanceof File){
        const url = await uploadImage(file)
        return url
    }
    else if(Array.isArray(file) && file.length > 0 && file[0] instanceof File){
        const urls = []
        const files = file
        await Promise.all(files.map(async (file)=>{
            const url = await uploadImage(file)
            urls.push(url)
        }
        ));
        return urls
    }
    else{
        return null
    }
}
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
        const thumbnailURL = await postImages(thumbnail)
        const imageURLs = await postImages(images)
        console.log('Images urls', imageURLs)
        listingData['media'] ={ thumbnail: thumbnailURL, images : imageURLs}
        console.log(listingData)
        await connectToDB()
        const newListing = new PropertyListing({...listingData})
        await newListing.save()

        //Response is a fetch Api Class and it sends a response to clien
        //it contains message and status and other meta data 
        return new Response(JSON.stringify(newListing), {status: 201})

    } catch (error) {
        console.error(error)
        return new Response("Failed to create a new prompt!", {status: 500} )
    }
}