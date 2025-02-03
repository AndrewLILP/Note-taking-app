const Note = require('../models/Note');

const noteController = {
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user._id })
        .sort({ updatedAt: -1 });
      
      res.json({
        success: true,
        data: notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching notes',
        error: error.message
      });
    }
  },

  createNote: async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      
      const note = new Note({
        title,
        content,
        tags,
        user: req.user._id
      });

      await note.save();

      res.status(201).json({
        success: true,
        data: note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating note',
        error: error.message
      });
    }
  },

  updateNote: async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      const note = await Note.findOne({ 
        _id: req.params.id,
        user: req.user._id 
      });

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      note.title = title;
      note.content = content;
      note.tags = tags;
      
      await note.save();

      res.json({
        success: true,
        data: note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating note',
        error: error.message
      });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const note = await Note.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting note',
        error: error.message
      });
    }
  }
};

module.exports = noteController;