const express=require('express')
const router=express.Router();

const videosController=require('../Controllers/Videos.controller');
const userController=require('../Controllers/Users.controller');

// Video routes

router.get("/videos",videosController.sendAllVideos)
router.get('/videos/:id',videosController.sendSelectedVideo)

//User routes

router.post('/users',userController.addUser)

module.exports=router;