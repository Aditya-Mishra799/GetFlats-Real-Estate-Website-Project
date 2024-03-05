import { Schema, model, models } from "mongoose";

const UserSchema = new  Schema({
    email :{
        type : String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username:{
        type: String,
        required: [true, 'username is required!'],
        match : [/(?=.{8,30})[A-Za-z0-9_.\s]+/, "User name is invalid it hould contain 8-20 alphanumeric characters and be unique!"],
    },
    image:{
        type: String,
    }
})


//as the next js routes are created only when it is called
//so we check if the model is already created if created then assidn it to previous value
//if not then create new user model

const User = models.User || model("User", UserSchema);

export  default User