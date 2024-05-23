import mongoose from "mongoose"

// await mongoose.connect("mongodb://localhost:27017")

// console.log("mongo db connected");


interface utube{
    title:string;
    description:string;
    thumbnailUrl?:string;
    watched:boolean
    name:string
}

const Video = new mongoose.Schema<utube>({
    title:{
        type:String,
        required:true
    },
    description:String,
    thumbnailUrl:{
        type:String,
        required:false,
        default:"https://i.ibb.co/Pz23V6G/Screenshot-126.png"
    }
    ,
    watched:Boolean,
    name:String


})

const Youtube = mongoose.model<utube>("video",Video)

export default Youtube;