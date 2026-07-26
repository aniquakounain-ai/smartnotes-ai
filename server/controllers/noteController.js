import Note from "../models/Note.js";

export const saveNote = async (req, res) => {
  try {

    const {
      topic,
      notes,
      style,
      length,
    } = req.body;

    const newNote = await Note.create({
      topic,
      notes,
      style,
      length,
    });

    res.status(201).json({
      success: true,
      note: newNote,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
