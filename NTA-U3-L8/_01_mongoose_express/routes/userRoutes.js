import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Find all users
    res.json(users);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  };
});

// Create a new user
router.post('/users', async (req, res) => {
  try{
    const user = new User(req.body); 
    await user.save();
    res.status(201).json(user);
  }
  catch(err){
    res.status(400).json({ message: err.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try{
  
    const user = await User.findByIdAndUpdate(req.params.id, req.body, 
                                     { new: true , runValidators: true }); 

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }  
});

export default router;