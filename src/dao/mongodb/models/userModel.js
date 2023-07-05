import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    name: String,
    email:String,
    role:{
        type:String,
        default:"User"
    },
    password:String
},{timestamps: { createdAt: "created_at", updatedAt: "updated_at" }});

const userModel = mongoose.model(collection, schema);

export default userModel;