const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
 try {
   console.log('Request body:', req.body);
   const { email, password } = req.body;

   if (!email || !password) {
     return res.status(400).json({
       success: false,
       error: 'Email and password are required'
     });
   }

   const user = await User.create({
     email,
     password
   });

   const token = user.getSignedJwtToken();

   res.status(201).json({
     success: true, 
     token
   });
 } catch (error) {
   res.status(400).json({
     success: false,
     error: error.message
   });
 }
};

exports.login = async (req, res) => {
 try {
   const { email, password } = req.body;

   if (!email || !password) {
     return res.status(400).json({
       success: false,
       error: 'Please provide an email and password'
     });
   }

   const user = await User.findOne({ email }).select('+password');

   if (!user) {
     return res.status(401).json({
       success: false,
       error: 'Invalid credentials'
     });
   }

   const isMatch = await user.matchPassword(password);

   if (!isMatch) {
     return res.status(401).json({
       success: false,
       error: 'Invalid credentials' 
     });
   }

   const token = user.getSignedJwtToken();

   res.status(200).json({
     success: true,
     token
   });
 } catch (error) {
   res.status(400).json({
     success: false,
     error: error.message
   });
 }
};