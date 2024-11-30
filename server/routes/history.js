const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Game = require('../models/Games');

// @route   GET api/history
// @desc    Retrieve user history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/history
// @desc    Add user history
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('gameLevel', 'Game level is required').not().isEmpty(),
      check('numOfMoves', 'Number of moves must be a number').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameLevel, numOfMoves } = req.body;

    try {
      const newGame = new Game({
        gameLevel,
        numOfMoves,
        user: req.user.id,
      });

      const game = await newGame.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
