const { body } = require('express-validator');

module.exports = [
  body('email')
    .isEmail()
    .withMessage('Email should be a valid email id')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Please enter a password with 6 or more charachters'),
];
