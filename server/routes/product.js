const express = require('express');
const db = require('../models/index');
const productInit = require('../models/product');
const productCategoryInit = require('../models/product_category');
const categoryInit = require('../models/category');
const { validationResult } = require('express-validator');
const productValidation = require('../helpers/product_requests/productValidation');

const router = express.Router();

// Make new instances
const newProduct = () => {
  const { sequelize, Sequelize } = db;
  return productInit(sequelize, Sequelize.DataTypes);
};

const newCategory = () => {
  const { sequelize, Sequelize } = db;
  return categoryInit(sequelize, Sequelize.DataTypes);
};

const newProductCategory = () => {
  const { sequelize, Sequelize } = db;
  return productCategoryInit(sequelize, Sequelize.DataTypes);
};

// ENDPOINTS
// @GET /products
router.get('/', async (req, res) => {
  const Product = newProduct();
  const ProductCategory = newProductCategory();
  const Category = newCategory();

  ProductCategory.belongsTo(Category);

  try {
    let products = await Product.findAll();
    let productsToView = products.map(async (product) => {
      let prodCategories = await ProductCategory.findAll({
        where: { productId: product.id },
        include: [
          {
            model: Category,
            attributes: ['title'],
          },
        ],
        attributes: ['productId', 'categoryId'],
      });
      return { product: product, cateogries: prodCategories };
    });

    productsToView = await Promise.all(productsToView);
    return res.json(productsToView);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// @GET /products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ errors: [{ msg: 'No products found' }] });
  }

  const Product = newProduct();
  const ProductCategory = newProductCategory();
  const Category = newCategory();

  ProductCategory.belongsTo(Category);

  try {
    let product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'No products found' }] });
    }
    let productCategory = await ProductCategory.findAll({
      where: { productId: product.id },
      include: [
        {
          model: Category,
          attributes: ['title'],
        },
      ],
      attributes: ['productId', 'categoryId'],
    });
    return res.json({ product, categories: productCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// @POST /products/add
router.post('/add', productValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product, categories } = req.body;
  if (!product.userId) {
    return res.status(401).json({ errors: [{ msg: 'Unauthorized Attempt' }] });
  }
  const Product = newProduct();
  const ProductCategory = newProductCategory();
  try {
    let product = await Product.create(req.body.product);
    if (product) {
      categories.map(async (cat) => {
        await ProductCategory.create({
          productId: product.id,
          categoryId: cat,
        });
      });
    }
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// @PUT /products/:id
router.put('/:id', productValidation, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ errors: [{ msg: 'No products found' }] });
  }

  const { product, categories } = req.body;
  if (!product.userId) {
    return res.status(401).json({ errors: [{ msg: 'Unauthorized Attempt' }] });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const Product = newProduct();
  const ProductCategory = newProductCategory();

  try {
    let product = await Product.update(req.body.product, { where: { id } });
    if (product[0] === 0) {
      return res.status(404).json({ errors: [{ msg: 'No products found' }] });
    }
    await ProductCategory.destroy({ where: { productId: id } });
    categories.map(async (cat) => {
      await ProductCategory.create({ productId: id, categoryId: cat });
    });
    return res.json(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// @DELETE /products/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ errors: [{ msg: 'No products found' }] });
  }

  const Product = newProduct();

  try {
    let product = await Product.destroy({ where: { id } });
    if (product === 0) {
      return res.status(404).json({ errors: [{ msg: 'No products found' }] });
    }
    return res.json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// @POST /products/buy/:id
router.post('/buy/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ errors: [{ msg: 'No products found' }] });
  }

  
})

module.exports = router;
