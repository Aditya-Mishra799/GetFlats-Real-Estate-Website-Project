import mongoose from "mongoose";

let isConnected = false //track the connection status

export const connectToDB = async () =>{
    mongoose.set('strict', true)

    if(isConnected){
        console.log('already connected to DB !')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            "dbName": 'getFlats_app',
            useNewUrlParser: true,
            useUnifiedTopology : true,
        })
        console.log("Mongo DB connected")
        isConnected = true;
    } catch (error) {
        console.log(error)
    }
}
