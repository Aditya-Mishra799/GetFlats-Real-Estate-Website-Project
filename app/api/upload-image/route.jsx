import { NextResponse } from "next/server";
import {put} from "@vercel/blob";
const uploadImage =  async (file)=>{
    if(file instanceof File){
        const blob = await(put(file.name, file , {
            access: "public",
        }))
    return  blob.url
    }
}
export  async function POST(file){
    if(file instanceof File){
        const url = await uploadImage(file)
        return NextResponse.json({url})
    }
    else if(Array.isArray(file) && file.length > 0 && file[0] instanceof File){
        const urls = []
        const files = file
        files.map(async (file)=>{
            const url = await uploadImage(file)
            urls.push(url)
        }
        )
        return NextResponse.json({url : urls},  { status: 201 })
    }
    else{
        return NextResponse.status(400).json({error: "Invalid file type"}, { status: 500 })
    }
}