const express = require('express');
const db = require('../models/index');
const userInit = require('../models/user');
const { validationResult } = require('express-validator');
const regValidation = require('../helpers/user_requests/regValidation');
const loginValidation = require('../helpers/user_requests/loginValidation');

const router = express.Router();

// Make new user instance
const newUser = () => {
  const { sequelize, Sequelize } = db;
  return userInit(sequelize, Sequelize.DataTypes);
};

// ENDPOINTS
// @POST /user/register
router.post('/register', regValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const User = newUser();

  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User with email already exists' }] });
    }
    user = await User.create(req.body);
    return res.status(201).json({ id: user.id, token: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
});

// @POST /user/login
router.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const User = newUser();

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'User does not exist' }] });
    }
    if (user.password === password) {
      return res.json({ id: user.id, token: user.email });
    } else {
      return res.status(401).json({ errors: [{ msg: 'Wrong credentials' }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
  // match password
});

module.exports = router;
