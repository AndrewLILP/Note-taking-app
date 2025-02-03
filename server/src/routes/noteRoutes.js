const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { auth, validateRequest } = require('../middleware/auth');
const { noteSchema } = require('../validation/noteSchema');

router.use(auth); // Protect all note routes

router.get('/', noteController.getAllNotes);
router.post('/', validateRequest(noteSchema), noteController.createNote);
router.put('/:id', validateRequest(noteSchema), noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;