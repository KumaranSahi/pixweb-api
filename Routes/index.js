const express=require('express')
const router=express.Router();

const videosController=require('../Controllers/Videos.controller')

router.get("/videos",videosController.sendAllVideos)
router.get('/videos/:id',videosController.sendSelectedVideo)

module.exports=router;