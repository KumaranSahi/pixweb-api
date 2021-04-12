const express=require('express')
const router=express.Router();

//middlewares

const playlistCheck=require('../Middleware/playlistCheck');
const videoCheck=require('../Middleware/videoCheck');
const userCheck=require('../Middleware/userCheck')

//controllers

const videosController=require('../Controllers/Videos.controller');
const userController=require('../Controllers/Users.controller');
const playlistController=require('../Controllers/Playlist.controller');

// Video routes

router.get("/videos",videosController.sendAllVideos)
router.get('/videos/:id',videosController.sendSelectedVideo)

//User routes

router.post('/users',userController.addUser)
router.post('/users/:id/update-password',userCheck,userController.changePassword)

//Playlist routes

router.get('/playlists/:id',userCheck,playlistController.sendAllPlaylists)
router.post('/playlists/:id',userCheck,playlistController.addNewPlaylist)
router.put('/playlists/:playlistid/video/:videoid',playlistCheck,videoCheck,playlistController.addVideoToPlaylist)
router.delete('/playlists/:playlistid/video/:videoid',playlistCheck,videoCheck,playlistController.removeVideoFromPlaylist)
router.delete('/playlists/:playlistid',playlistCheck,playlistController.deletePlaylist)

//History routes

router.get('/histories/:id',videosController.getUserHistory)
router.put('/histories/:videoid/users/:id',videosController.addToHistory)

//likes and notes routes

router.get('/likes/:videoid/users/:id')
router.post('/notes/:videoid/users/:id')

module.exports=router;