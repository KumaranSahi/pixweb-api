const mongoose=require('mongoose');

const videoSchema=new mongoose.Schema({         //need to add notes and likes
    name:{
        type:String,
        required:true
    },link:{
        type:String,
        required:true
    },catagory:{
        type:String,
        required:true
    },catagoryId:{
        type:Number,
        required:true
    },author:{
        type:String,
        required:true
    },description:{
        type:String
    },recomended:{
        type:Boolean
    }

},{
    timestamps:true
})

const video=mongoose.model("video",videoSchema);
module.exports=video;