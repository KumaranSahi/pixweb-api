const playlistsdb=require('../Models/playlists.model');
const usersdb=require('../Models/users.model')

module.exports.sendAllPlaylists=async (req,res)=>{
    const {id}=req.params
    try{
        const {playlists}=await (await usersdb.findById(id)).execPopulate({path:'playlists',populate:({path:'videos'})});
        const newPlaylists=playlists.filter(({active})=>active)
        return res.status(200).json({
            ok:true,
            data:newPlaylists,
            message:"Full playlist list sent successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports.addNewPlaylist=async (req,res)=>{
    const {name}=req.body;
    const {id}=req.params;
    if(name){
        const data=await playlistsdb.create({
            name:name,
            by:id,
            active:true
        })
        const userReference=await usersdb.findById(id);
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
    try{
        const playlist=await playlistsdb.findById(playlistid);
        if(!playlist.videos.includes(videoid)){
            playlist.videos.push(videoid);
            playlist.save();
        }
        return res.status(201).json({
            ok:true,
            data:playlist,
            message:"Full playlist updated successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"internal error please try again later"
        })
    }
}

module.exports.removeVideoFromPlaylist=async (req,res)=>{
    const {playlistid,videoid}=req.params;
    try{
        await playlistsdb.findByIdAndUpdate(playlistid,{$pull:{videos:videoid}});
        const newPlaylist=await playlistsdb.findById(playlistid)
        return res.status(201).json({
            ok:true,
            data:newPlaylist,
            message:"video removed successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"internal error please try again later"
        })
    }
}

module.exports.deletePlaylist=async (req,res)=>{
    const {playlistid}=req.params;
    try{
        const playlist=await playlistsdb.findById(playlistid)
        const data=await playlist.update({active:false});
        return res.status(201).json({
            ok:true,
            data:data,
            message:"playlist deleted successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"internal error please try again later"
        })
    }
}