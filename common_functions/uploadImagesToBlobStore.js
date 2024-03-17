import {put} from "@vercel/blob";

export const uploadImage =  async (file)=>{
    if(file instanceof File){
        const blob = await(put(file.name, file , {
            access: "public",
        }))
    return  blob.url
    }
}
export async function uploadImagesToBlobStore(file){
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