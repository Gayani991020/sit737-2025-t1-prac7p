const express = require('express');
const router = express.Router();
const Note = require('./models/Note');

router.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

router.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.put('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.delete('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json({ message: 'Note deleted' });
});

module.exports = router;
