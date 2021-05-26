const Video = require("../Models/videos.model");

const videoCheck = async (req, res, next) => {
  const { videoid } = req.params;
  try {
    const video = await Video.findById(videoid);
    if (video) {
      req.video = video;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports = videoCheck;
