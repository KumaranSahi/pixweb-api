const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    catagoryId: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    recomended: {
      type: Boolean,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const video = model("video", videoSchema);
module.exports = video;
