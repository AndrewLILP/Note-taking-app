const express = require('express');
const Note = require('../models/note');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

// Create a new note
router.post('/', requiresAuth(), async (req, res) => {
  try {
    const newNote = new Note({
      ...req.body,
      owner: req.oidc.user.sub
    });
    await newNote.save();
    res.status(201).send(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all notes
router.get('/', requiresAuth(), async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.oidc.user.sub });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
