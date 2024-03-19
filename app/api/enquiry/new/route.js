import { connectToDB } from "@utils/database"
import Enquiry from "@models/enquiry";

export async function POST(req, res){
    const data = await req.json()
    console.log(data)
    try {
        console.log('try')
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({message: "Failed to add Enquiry!"}), {status: 500} )
    }
}