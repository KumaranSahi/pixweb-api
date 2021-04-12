const mongoose =require('mongoose');

const likeSchema=new mongoose.Schema({
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video',
        required:true
    }
},{
    timestamps:true
})

const like=mongoose.model("like",likeSchema);
module.exports=like;