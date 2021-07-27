const { Playlist } = require("../models");

const sendAllPlaylists = async (req, res) => {
  const user = req.user;
  try {
    const { playlists } = await user.execPopulate({
      path: "playlists",
      populate: { path: "videos" },
    });
    const newPlaylists = playlists.filter(({ active }) => active);
    return res.status(200).json({
      ok: true,
      data: newPlaylists,
      message: "Full playlist list sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to load Playlist list",
    });
  }
};

const addNewPlaylist = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      ok: false,
      message: "Invalid request",
    });
  }
  const user = req.user;
  try {
    const data = await Playlist.create({
      name: name,
      by: user._id,
      active: true,
    });
    user.playlists.push(data._id);
    await user.save();
    return res.status(201).json({
      ok: true,
      data: data,
      message: "Playlist added successfully",
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      message: "Unable to add new playlist, please try again later",
    });
  }
};

const addVideoToPlaylist = async (req, res) => {
  const playlist = req.playlist;
  const { videoid } = req.params;
  try {
    if (!playlist.videos.includes(videoid)) {
      playlist.videos.push(videoid);
      await playlist.save();
    }
    let populatedPlaylist = await playlist.execPopulate("videos");
    return res.status(201).json({
      ok: true,
      data: populatedPlaylist,
      message: "Full playlist updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to update playlist please try again later",
    });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  const playlist = req.playlist;
  const { playlistid, videoid } = req.params;
  try {
    await playlist.update({
      $pull: { videos: videoid },
    });
    const newPlaylist = await Playlist.findById(playlistid);
    return res.status(201).json({
      ok: true,
      data: newPlaylist,
      message: "video removed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "internal error please try again later",
    });
  }
};

const deletePlaylist = async (req, res) => {
  const playlist = req.playlist;
  try {
    await playlist.updateOne({ active: false });
    return res.status(201).json({
      ok: true,
      message: "playlist deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to delete playlist please try again later",
    });
  }
};

module.exports = {
  sendAllPlaylists,
  addNewPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
};
