const videosdb=require('../Models/videos.model')
const usersdb=require('../Models/users.model');
const likesdb=require('../Models/likes.model')
const notesdb=require('../Models/notes.model');

module.exports.sendAllVideos=async (req,res)=>{
    const data=await videosdb.find();
    if(data){
        return res.status(200).json({
            ok:true,
            data:data,
            message:"Full videolist sent successfully"
        })
    }else{
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.sendSelectedVideo=async (req,res)=>{
    const {id}=req.params;
    const data=await videosdb.findById(id)
    if(data){
        return res.status(200).json({
            ok:true,
            data:data,
            message:"Video sent successfully"
        })
    }else{
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.addToHistory=async (req,res)=>{
    const {videoid,id}=req.params;
    const user=await usersdb.findById(id);
    const video=await videosdb.findById(videoid)
    if(video && user){
        if(!user.history.includes(videoid))
            await user.history.push(videoid)
        user.save();
        return res.status(201).json({
            ok:true,
            message:"Video added to history"
        })
    }

    return res.status(400).json({
        ok:false,
        message:"Bad video id or user id"
    })
}

module.exports.getUserHistory=async (req,res)=>{
    const {id}=req.params
    const user=await usersdb.findById(id);
    if(user){
        const {history}=await user.execPopulate('history')
        if(history){
            return res.status(200).json({
                ok:true,
                data:history,
                message:"History sent successfully"
            })
        }else{
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
        }
    }

    return res.status(400).json({
        ok:false,
        message:"Bad user id"
    })
    
}

module.exports.addLikes=async (req,res)=>{
    const {videoid,id}=req.body;
    const video=await videosdb.findById(videoid)
    await video.likes.push(id)
    video.save();

    res.send("Under construction");
}

module.exports.addNotes=async (req,res)=>{

    res.send("Under construction");
}