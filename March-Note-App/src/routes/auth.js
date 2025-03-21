const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { forwardAuthenticated } = require('../middleware/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('auth/login', {
    title: 'Login'
  });
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
  res.render('auth/register', {
    title: 'Register'
  });
});

// Register Handle
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      title: 'Register',
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        errors.push({ msg: 'Email is already registered' });
        return res.render('auth/register', {
          title: 'Register',
          errors,
          name,
          email,
          password,
          password2
        });
      }

      // Create new user
      const newUser = new User({
        name,
        email,
        password
      });

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      
      // Save user
      await newUser.save();
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/auth/login');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Registration error');
      res.redirect('/auth/register');
    }
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;