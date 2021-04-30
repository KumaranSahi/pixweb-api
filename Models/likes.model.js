const mongoose =require('mongoose');

const likeSchema=new mongoose.Schema({
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video'
    }
},{
    timestamps:true
})

const like=mongoose.model("like",likeSchema);
module.exports=like;