const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },playlists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'playlist'
    }],histories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video'
    }],likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }],notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'note'
    }]
},{timestamps:true})

const user=mongoose.model("user",userSchema);
module.exports=user;