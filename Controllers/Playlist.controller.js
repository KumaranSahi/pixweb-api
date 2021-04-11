const playlistdb=require('../Models/playlists.model');
const userdb=require('../Models/user.model')
const videodb=require('../Models/videos.model')

module.exports.sendAllPlaylists=async (req,res)=>{
    const {id}=req.params
    if(await userdb.findById(id)){
        const {playlists}=await (await userdb.findById(id)).execPopulate({path:'playlists',populate:({path:'videos'})});
        if(playlists){
            return res.status(200).json({
                ok:true,
                data:playlists,
                message:"Full playlist list sent successfully"
            })
        }else{
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
        }
    }
    return res.status(404).json({
        ok:false,
        message:"User not found"
    })
}

module.exports.addNewPlaylist=async (req,res)=>{
    const {name}=req.body;
    const {id}=req.params;
    if(name){
        const data=await playlistdb.create({
            name:name,
            by:id
        })
        const userReference=await userdb.findById(id);
        await userReference.playlists.push(data.id);
        userReference.save();
        if(data){
            return res.status(201).json({
                ok:true,
                data:data,
                message:"Playlist added successfully"
            })
        }else{
            return res.status(503).json({
                ok:false,
                message:"Internal error please try again later"
            })
        }
    }
    return res.status(400).json({
        ok:false,
        message:"Invalid request"
    })

}

module.exports.addVideoToPlaylist=async (req,res)=>{
    const {playlistid,videoid}=req.params;
    if(await playlistdb.findById(playlistid)&&await videodb.findById(videoid))
    {
        const playlist=await playlistdb.findById(playlistid);
        playlist.videos.push(videoid);
        playlist.save();
        if(playlist){
            return res.status(201).json({
                ok:true,
                data:playlist,
                message:"Full playlist updated successfully"
            })
        }else{
            return res.status(503).json({
                ok:false,
                message:"internal error please try again later"
            })
        }
    }
    return res.status(400).json({
        ok:false,
        message:"Bad video or playlist id"
    })
}

module.exports.removeVideoFromPlaylist=async (req,res)=>{
    const {playlistid,videoid}=req.params;
    if(await playlistdb.findById(playlistid)&&await videodb.findById(videoid))
    {
        const playlist=await playlistdb.findByIdAndUpdate(playlistid,{$pull:{videos:videoid}});
        const newPlaylist=await playlistdb.findById(playlistid)
        if(playlist){
            return res.status(201).json({
                ok:true,
                data:newPlaylist,
                message:"video removed successfully"
            })
        }else{
            return res.status(503).json({
                ok:false,
                message:"internal error please try again later"
            })
        }
    }
    return res.status(400).json({
        ok:false,
        message:"Bad video or playlist id"
    })
}