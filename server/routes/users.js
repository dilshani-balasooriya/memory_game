const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // check name, email, and password valid
  [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password must be 1 or more characters').isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    // declare errors array
    const errors = validationResult(req);
    // if errors, return error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // declare variables from request
    const { name, email, password } = req.body;

    // check if email already exists
    try {
      let user = await User.findOne({ email });

      // alert user if email exists
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' });
      }

      // declare user model with user input
      user = User({
        name: name,
        email: email,
        password: password,
      });

      // password hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user model to database
      await user.save();

      // declare payload object with user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign user in with user input, sign out after 3600 seconds
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status('500').send('Server Error');
    }
  }
);

module.exports = router;

const User = require('../models/Users');
