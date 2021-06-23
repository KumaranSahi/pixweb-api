const express = require("express");
const router = express.Router();
const passport = require("passport");

//middlewares

const {
  likeCheck,
  noteCheck,
  playlistCheck,
  videoCheck,
} = require("../middleware");

//controllers

const {
  playlistController,
  userController,
  videosController,
} = require("../controllers");

// Video routes

router.get("/videos", videosController.sendAllVideos);
router.get("/videos/:videoid", videoCheck, videosController.sendSelectedVideo);

//User routes

router.post("/users/signin", userController.signinUser);
router.post("/users/signup", userController.signupUser);
router.post("/users/password", userController.changePassword);

//Playlist routes

router.get(
  "/playlists",
  passport.authenticate("jwt", { session: false }),
  playlistController.sendAllPlaylists
);
router.post(
  "/playlists",
  passport.authenticate("jwt", { session: false }),
  playlistController.addNewPlaylist
);
router.put(
  "/playlists/:playlistid/video/:videoid",
  passport.authenticate("jwt", { session: false }),
  playlistCheck,
  videoCheck,
  playlistController.addVideoToPlaylist
);
router.delete(
  "/playlists/:playlistid/video/:videoid",
  passport.authenticate("jwt", { session: false }),
  playlistCheck,
  videoCheck,
  playlistController.removeVideoFromPlaylist
);
router.delete(
  "/playlists/:playlistid",
  passport.authenticate("jwt", { session: false }),
  playlistCheck,
  playlistController.deletePlaylist
);

//History routes

router.get(
  "/histories",
  passport.authenticate("jwt", { session: false }),
  videosController.getUserHistory
);
router.put(
  "/histories/:videoid",
  passport.authenticate("jwt", { session: false }),
  videoCheck,
  videosController.addToHistory
);

//likes and notes routes

router.put(
  "/likes/:videoid",
  passport.authenticate("jwt", { session: false }),
  videoCheck,
  videosController.addLikes
);
router.delete(
  "/likes/:likeid",
  passport.authenticate("jwt", { session: false }),
  likeCheck,
  videosController.removeLike
);
router.post(
  "/notes/:videoid",
  passport.authenticate("jwt", { session: false }),
  videoCheck,
  videosController.addNotes
);
router.delete(
  "/notes/:noteid",
  passport.authenticate("jwt", { session: false }),
  noteCheck,
  videosController.removeNote
);

module.exports = router;
