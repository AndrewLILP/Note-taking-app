const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { ensureAuthenticated } = require('../middleware/auth');
const mongoose = require('mongoose');

// Get all notes for the logged in user
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.render('notes/index', {
      title: 'All Notes',
      notes
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error retrieving notes');
    res.redirect('/dashboard');
  }
});

// Display add note form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('notes/add', {
    title: 'Add Note'
  });
});

// Add a new note
router.post('/', ensureAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  let errors = [];

  if (!title || !content) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('notes/add', {
      title: 'Add Note',
      errors,
      noteTitle: title,
      content
    });
  } else {
    try {
      const newNote = new Note({
        title,
        content,
        user: req.user.id
      });

      await newNote.save();
      req.flash('success_msg', 'Note added successfully');
      res.redirect('/notes');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Error saving note');
      res.redirect('/notes/add');
    }
  }
});

// Display note to edit
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      req.flash('error_msg', 'Note not found or not authorized');
      return res.redirect('/notes');
    }

    res.render('notes/edit', {
      title: 'Edit Note',
      note
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error retrieving note');
    res.redirect('/notes');
  }
});

// Update note
router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!note) {
      req.flash('error_msg', 'Note not found or not authorized');
      return res.redirect('/notes');
    }

    note.title = req.body.title;
    note.content = req.body.content;
    note.updatedAt = Date.now();

    await note.save();
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating note');
    res.redirect('/notes');
  }
});

// Delete note - revised implementation
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Delete route accessed with ID:', req.params.id);
    console.log('User ID:', req.user.id);
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ObjectId format');
      req.flash('error_msg', 'Invalid note ID format');
      return res.redirect('/notes');
    }
    
    // First try to find the note to ensure it exists and belongs to the user
    const noteToDelete = await Note.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    console.log('Note to delete:', noteToDelete);
    
    if (!noteToDelete) {
      console.log('Note not found or user not authorized');
      req.flash('error_msg', 'Note not found or n