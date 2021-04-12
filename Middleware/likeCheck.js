const likesdb=require('../Models/likes.model')

const likeCheck=async (req,res,next)=>{
    const {likeid}=req.params;
    try{
        if(await likesdb.findById(likeid)){
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

module.exports=likeCheck;