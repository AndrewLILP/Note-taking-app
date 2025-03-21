const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// Welcome Page - accessible to all
router.get('/', forwardAuthenticated, (req, res) => {
  res.render('welcome', {
    title: 'Welcome to March Note App'
  });
});

// Dashboard - protected route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    name: req.user.name
  });
});

module.exports = router;