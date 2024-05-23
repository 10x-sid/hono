import mongoose from 'mongoose'

export default async function DBconnect(){
    await mongoose.connect("mongodb://localhost:27017")
    console.log("monngo db connected");
    
}