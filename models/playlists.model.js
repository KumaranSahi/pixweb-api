const { Schema, model } = require("mongoose");

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Playlist = model("Playlist", playlistSchema);
module.exports = Playlist;
