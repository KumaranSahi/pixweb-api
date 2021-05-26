const { Schema, model } = require("mongoose");

const likeSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
  },
  {
    timestamps: true,
  }
);

const like = model("like", likeSchema);
module.exports = like;
