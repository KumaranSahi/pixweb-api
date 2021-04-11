const mongoose=require('mongoose');

const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:('video')
    }],by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:('user'),
        required:true
    }
},{timestamps:true})

const playlist=mongoose.model('playlist',playlistSchema)
module.exports=playlist;