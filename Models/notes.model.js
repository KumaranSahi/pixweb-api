const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
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

const note = model("note", noteSchema);
module.exports = note;
