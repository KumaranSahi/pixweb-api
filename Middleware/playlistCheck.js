const playlistdb=require('../Models/playlists.model');

const playlistCheck=async (req,res,next)=>{
    const {playlistid}=req.params;
    try{
        if(await playlistdb.findById(playlistid)){
            next()
        }
    }catch(error){
        console.log(error);
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports=playlistCheck;