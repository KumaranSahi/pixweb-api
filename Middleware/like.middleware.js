const Like = require("../Models/likes.model");

const likeCheck = async (req, res, next) => {
  const { likeid } = req.params;
  try {
    const like = await Like.findById(likeid);
    if (like) {
      req.like=like;
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

module.exports = likeCheck;
