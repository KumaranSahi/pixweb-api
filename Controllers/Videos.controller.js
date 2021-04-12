const videosdb=require('../Models/videos.model')
const usersdb=require('../Models/users.model');
const likesdb=require('../Models/likes.model')
const notesdb=require('../Models/notes.model');

module.exports.sendAllVideos=async (req,res)=>{
    try{    
        const data=await videosdb.find();
        return res.status(200).json({
            ok:true,
            data:data,
            message:"Full videolist sent successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.sendSelectedVideo=async (req,res)=>{
    const {videoid}=req.params;
    try{
        const data=await videosdb.findById(videoid)
        return res.status(200).json({
            ok:true,
            data:data,
            message:"Video sent successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.addToHistory=async (req,res)=>{
    const {videoid,id}=req.params;
    try{
        const user=await usersdb.findById(id);
        if(!user.history.includes(videoid))
            await user.history.push(videoid)
        user.save();
        return res.status(201).json({
            ok:true,
            message:"Video added to history"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.getUserHistory=async (req,res)=>{
    const {id}=req.params
    try{
        const user=await usersdb.findById(id);
        const {history}=await user.execPopulate('history')
        return res.status(200).json({
            ok:true,
            data:history,
            message:"History sent successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.addLikes=async (req,res)=>{
    const {videoid,id}=req.params;
    try{
        const like=await likesdb.create({
            by:id,
            video:videoid
        })
        const video=await videosdb.findById(videoid)
        await video.likes.push(like.id)
        video.save();
        const user=await usersdb.findById(id)
        await user.likes.push(like.id)
        user.save() 
        return res.status(200).json({
            ok:true,
            message:"Like added successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.addNotes=async (req,res)=>{
    const {videoid,id}=req.params;
    const {note:content}=req.body;
    try{
        const note=await notesdb.create({
            content:content,
            by:id,
            video:videoid
        })
        const video=await videosdb.findById(videoid)
        await video.notes.push(note.id)
        video.save();
        const user=await usersdb.findById(id)
        await user.notes.push(note.id)
        user.save() 
        return res.status(200).json({
            ok:true,
            message:"Note added successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
    res.send("Under construction");
}