const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    histories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
