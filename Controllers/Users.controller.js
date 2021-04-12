const usersdb=require('../Models/users.model');

module.exports.addUser=async (req,res)=>{
    const {name,email,password}=req.body;
    let data=null;
    if(await usersdb.findOne({email:email})){
        return res.status(409).json({
            ok:false,
            message:"User Already exists in the system"
        })
    }
    if(name && (email && new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)) && password){
        data=await usersdb.create({
            name:name,
            email:email,
            password:password
        })
    }
    else{
        return res.status(400).json({
            ok:false,
            message:"Invalid Request"
        })
    }
    if(data){
        return res.status(201).json({
            ok:true,
            message:"User Added Successfully"
        })
    }else{
        return res.status(503).json({
            ok:false,
            message:"Internal error please try again later"
        })
    }
}

module.exports.changePassword=async (req,res)=>{
    const {id}=req.params;
    const {password,confirmPassword}=req.body;
    if(!(password)||!(confirmPassword)||(password!==confirmPassword)){
        return res.status(405).json({
            ok:false,
            message:"Passwords are invalid"
        })
    }
    await usersdb.findById(id).update({password:password});
    return res.status(200).json({
        ok:true,
        message:"Password Updated Successfully"
    })
}