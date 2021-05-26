const videosdb = require("../Models/videos.model");

const videoCheck = async (req, res, next) => {
  const { videoid } = req.params;
  try {
    if (await videosdb.findById(videoid)) {
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
