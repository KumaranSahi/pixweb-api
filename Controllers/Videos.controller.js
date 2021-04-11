const videosdb=require('../Models/videos.model')


module.exports.sendAllVideos=async (req,res)=>{
    const data=await videosdb.find();
    if(data){
        res.status(200).json({
            ok:true,
            data:data,
            message:"Full videolist sent successfully"
        })
    }else{
        res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.sendSelectedVideo=async (req,res)=>{
    const {id}=req.params;
    const data=await videosdb.findById(id)
    if(data){
        res.status(200).json({
            ok:true,
            data:data,
            message:"Video sent successfully"
        })
    }else{
        res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}