const Playlist = require("../models/playlists.model");

const playlistCheck = async (req, res, next) => {
  const { playlistid } = req.params;
  try {
    const playlist = await Playlist.findById(playlistid);
    if (playlist) {
      req.playlist = playlist;
      next();
    }else{
      return res.status(404).json({
        ok: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Unable to load data",
    });
  }
};

module.exports = playlistCheck;
