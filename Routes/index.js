const express=require('express')
const router=express.Router();

const videosController=require('../Controllers/VideosController')

router.get("/",videosController.SendAllVideos)

module.exports=router;