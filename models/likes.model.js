const { Schema, model } = require("mongoose");

const likeSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  {
    timestamps: true,
  }
);

const Like = model("Like", likeSchema);
module.exports = Like;
