const mongoose =require('mongoose');

const noteSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },by:{
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

const note=mongoose.model("note",noteSchema);
module.exports=note;