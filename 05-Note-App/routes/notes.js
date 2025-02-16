const express = require('express');
const Note = require('../models/note');
const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    });
    await newNote.save();
    res.status(201).send(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note by ID
router.patch('/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content', 'tags'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }

    updates.forEach(update => note[update] = req.body[update]);
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
