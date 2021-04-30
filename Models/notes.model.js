const mongoose =require('mongoose');

const noteSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video'
    }
},{
    timestamps:true
})

const note=mongoose.model("note",noteSchema);
module.exports=note;