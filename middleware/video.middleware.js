const Video = require("../models/videos.model");

const videoCheck = async (req, res, next) => {
  const { videoid } = req.params;
  try {
    const video = await Video.findById(videoid);
    if (video) {
      req.video = video;
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

module.exports = videoCheck;
