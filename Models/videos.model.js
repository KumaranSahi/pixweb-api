const mongoose=require('mongoose');

const videoSchema=new mongoose.Schema({         //need to add notes and likes
    name:{
        type:String,
        required:true,
        unique:true
    },link:{
        type:String,
        required:true,
        unique:true
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
    },likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }],notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'note'
    }]

},{
    timestamps:true
})

const video=mongoose.model("video",videoSchema);
module.exports=video;