const { body } = require('express-validator');

module.exports = [
  body('product.title').notEmpty().withMessage('Title is required'),
  body('product.description').notEmpty().withMessage('Description is required'),
  body('product.price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be numeric'),
  body('product.rent_price')
    .notEmpty()
    .withMessage('Rent price is required')
    .isNumeric()
    .withMessage('Rent price must be numeric'),
  body('product.rent_option').notEmpty().withMessage('Rent option is required'),
];
