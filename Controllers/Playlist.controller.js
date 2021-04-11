const playlistdb=require('../Models/playlists.model');
const userdb=require('../Models/user.model')

module.exports.sendAllPlaylists=async (req,res)=>{
    const {id}=req.params
    const {playlists}=await (await userdb.findById(id)).execPopulate('playlists');
    if(playlists){
        return res.status(200).json({
            ok:true,
            data:playlists,
            message:"Full playlist list sent successfully"
        })
    }else{
        res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
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