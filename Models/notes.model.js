const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
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

const Note = model("Note", noteSchema);
module.exports = Note;
