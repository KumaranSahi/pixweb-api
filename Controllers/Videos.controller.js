const videosdb = require("../Models/videos.model");
const usersdb = require("../Models/users.model");
const likesdb = require("../Models/likes.model");
const notesdb = require("../Models/notes.model");

module.exports.sendAllVideos = async (req, res) => {
  try {
    const data = await videosdb.find();
    return res.status(200).json({
      ok: true,
      data: data,
      message: "Full videolist sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.sendSelectedVideo = async (req, res) => {
  const { videoid } = req.params;
  try {
    const data = await (
      await (await videosdb.findById(videoid)).execPopulate("likes")
    ).execPopulate({ path: "notes", populate: { path: "by" } });
    return res.status(200).json({
      ok: true,
      data: data,
      message: "Video sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.addToHistory = async (req, res) => {
  const { videoid, id } = req.params;
  try {
    const user = await usersdb.findById(id);
    if (!user.histories.includes(videoid)) {
      await user.histories.push(videoid);
      user.save();
    }
    const { histories } = await (
      await usersdb.findById(id)
    ).execPopulate("histories");
    return res.status(201).json({
      ok: true,
      data: histories,
      message: "Video added to history",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.getUserHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersdb.findById(id);
    const { histories } = await user.execPopulate("histories");
    return res.status(200).json({
      ok: true,
      data: histories,
      message: "History sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.addLikes = async (req, res) => {
  const { videoid, id } = req.params;
  try {
    const like = await likesdb.create({
      by: id,
      video: videoid,
    });
    const video = await videosdb.findById(videoid);
    await video.likes.push(like.id);
    video.save();
    const user = await usersdb.findById(id);
    await user.likes.push(like.id);
    user.save();
    return res.status(201).json({
      ok: true,
      message: "Like added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.removeLike = async (req, res) => {
  const { likeid } = req.params;
  try {
    const like = await likesdb.findById(likeid);
    await videosdb.findByIdAndUpdate(like.video, { $pull: { likes: likeid } });
    await usersdb.findByIdAndUpdate(like.by, { $pull: { likes: likeid } });
    await like.delete();
    return res.status(200).json({
      ok: true,
      message: "Like deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.addNotes = async (req, res) => {
  const { videoid, id } = req.params;
  const { note: content } = req.body;
  try {
    const note = await notesdb.create({
      content: content,
      by: id,
      video: videoid,
    });
    const video = await videosdb.findById(videoid);
    await video.notes.push(note.id);
    video.save();
    const user = await usersdb.findById(id);
    await user.notes.push(note.id);
    user.save();
    return res.status(200).json({
      ok: true,
      message: "Note added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};

module.exports.removeNote = async (req, res) => {
  const { noteid } = req.params;
  try {
    const note = await notesdb.findById(noteid);
    await videosdb.findByIdAndUpdate(note.video, { $pull: { notes: noteid } });
    await usersdb.findByIdAndUpdate(note.by, { $pull: { notes: noteid } });
    await note.delete();
    return res.status(200).json({
      ok: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      ok: false,
      message: "Data not found",
    });
  }
};
