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
        ref: "playlist",
      },
    ],
    histories: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
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
  { timestamps: true }
);

const user = model("user", userSchema);
module.exports = user;
