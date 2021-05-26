const Note = require("../Models/notes.model");

const noteCheck = async (req, res, next) => {
  const { noteid } = req.params;
  try {
    const note=await Note.findById(noteid)
    if (note) {
      req.note = note;
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

module.exports = noteCheck;
