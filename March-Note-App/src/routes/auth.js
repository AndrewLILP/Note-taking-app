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

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push({ msg: 'Please enter a valid email address' });
  }

  if (errors.length > 0) {
    res.render('auth/register', {
      title: 'Register',
      errors,
      name,
      email,
      password: '',
      password2: ''
    });
  } else {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      
      if (existingUser) {
        errors.push({ msg: 'Email is already registered' });
        return res.render('auth/register', {
          title: 'Register',
          errors,
          name,
          email,
          password: '',
          password2: ''
        });
      }

      // Create new user
      const newUser = new User({
        name,
        email: email.toLowerCase(),
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

// Password Reset Request Page
router.get('/forgot-password', forwardAuthenticated, (req, res) => {
  res.render('auth/forgot-password', {
    title: 'Forgot Password'
  });
});

// Password Reset Request Handle
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    req.flash('error_msg', 'Please enter your email address');
    return res.redirect('/auth/forgot-password');
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Don't reveal user existence, but show success message anyway
      req.flash('success_msg', 'If an account with that email exists, password reset instructions have been sent');
      return res.redirect('/auth/login');
    }

    // In a real application, generate a secure token and send password reset email
    // For this example, we'll just simulate the process
    
    req.flash('success_msg', 'If an account with that email exists, password reset instructions have been sent');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred');
    res.redirect('/auth/forgot-password');
  }
});

module.exports = router;