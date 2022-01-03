const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const db = require('./models/index');
const user = require('./models/user');
const product = require('./models/product');
const category = require('./models/category');
const boughtBy = require('./models/bought_by');
const rentedBy = require('./models/rent_by');
const prod_cat = require('./models/product_category');
const AUTH_TOKEN = require('./auth/tokenGenerator');
const GraphQLDate = require('graphql-date');

const UserModel = user(db.sequelize, db.Sequelize.DataTypes);
const ProductModel = product(db.sequelize, db.Sequelize.DataTypes);
const CategoryModel = category(db.sequelize, db.Sequelize.DataTypes);
const ProductCategoryModel = prod_cat(db.sequelize, db.Sequelize.DataTypes);
const BoughtByModel = boughtBy(db.sequelize, db.Sequelize.DataTypes);
const RentedByModel = rentedBy(db.sequelize, db.Sequelize.DataTypes);

UserModel.hasMany(ProductModel);
ProductModel.belongsTo(UserModel);
ProductModel.hasMany(ProductCategoryModel);
ProductCategoryModel.belongsTo(ProductModel);
CategoryModel.hasMany(ProductCategoryModel);
ProductCategoryModel.belongsTo(CategoryModel);
UserModel.hasMany(BoughtByModel);
BoughtByModel.belongsTo(UserModel);
BoughtByModel.belongsTo(ProductModel);
// ProductModel.hasMany(BoughtByModel);
UserModel.hasMany(RentedByModel);
RentedByModel.belongsTo(UserModel);
RentedByModel.belongsTo(ProductModel);

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        },
      },
      first_name: {
        type: GraphQLString,
        resolve(user) {
          return user.first_name;
        },
      },
      last_name: {
        type: GraphQLString,
        resolve(user) {
          return user.last_name;
        },
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        },
      },
      address: {
        type: GraphQLString,
        resolve(user) {
          return user.address;
        },
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password;
        },
      },
      phone_number: {
        type: GraphQLString,
        resolve(user) {
          return user.phone_number;
        },
      },
      products: {
        type: GraphQLList(Product),
        resolve(user) {
          return user.getProducts();
        },
      },
    };
  },
});

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'Represents a product',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (product) => {
          return product.id;
        },
      },
      title: {
        type: GraphQLString,
        resolve: (product) => {
          return product.title;
        },
      },
      description: {
        type: GraphQLString,
        resolve: (product) => {
          return product.description;
        },
      },
      price: {
        type: GraphQLFloat,
        resolve: (product) => {
          return product.price;
        },
      },
      rent_price: {
        type: GraphQLFloat,
        resolve: (product) => {
          return product.rent_price;
        },
      },
      rent_option: {
        type: GraphQLString,
        resolve: (product) => {
          return product.rent_option;
        },
      },
      isBought: {
        type: GraphQLBoolean,
        resolve: (product) => {
          return product.isBought;
        },
      },
      isRented: {
        type: GraphQLBoolean,
        resolve: (product) => {
          return product.isRented;
        },
      },
      userId: {
        type: GraphQLInt,
        resolve: (product) => {
          return product.userId;
        },
      },
      user: {
        type: User,
        resolve: (product) => {
          return product.getUser();
        },
      },
      productCategories: {
        type: GraphQLList(ProductCategory),
        resolve: async (product) => {
          let categories = await product.product_categories;
          return categories;
        },
      },
      createdAt: {
        type: GraphQLDate,
        resolve: (product) => {
          return product.createdAt;
        },
      },
    };
  },
});

const Category = new GraphQLObjectType({
  name: 'Category',
  description: 'Represents a Category instance',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(category) {
          return category.id;
        },
      },
      title: {
        type: GraphQLString,
        resolve(category) {
          return category.title.toLowerCase();
        },
      },
    };
  },
});

const ProductCategory = new GraphQLObjectType({
  name: 'ProductCategory',
  description: 'Relational table between Product and Category',
  fields: () => {
    return {
      product: {
        type: Product,
        resolve(prod_cat) {
          return prod_cat.getProduct();
        },
      },
      category: {
        type: Category,
        resolve(prod_cat) {
          return prod_cat.getCategory();
        },
      },
    };
  },
});

const BoughtBy = new GraphQLObjectType({
  name: 'BoughtBy',
  description: 'Relational table between Product and User',
  fields: () => {
    return {
      product: {
        type: Product,
        resolve(bought_by) {
          return bought_by.getProduct();
        },
      },
      user: {
        type: User,
        resolve(bought_by) {
          return bought_by.getUser();
        },
      },
    };
  },
});

const Auth = new GraphQLObjectType({
  name: 'Auth',
  description: 'Returs user info',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (auth) => {
          return auth.id;
        },
      },
      token: {
        type: GraphQLString,
        resolve: (auth) => {
          return auth.token;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      // get products
      products: {
        type: GraphQLList(Product),
        args: {
          id: {
            type: GraphQLInt,
          },
          userId: {
            type: GraphQLInt,
          },
        },
        resolve(root, args) {
          return ProductModel.findAll({
            where: args,
            include: ProductCategoryModel,
          });
        },
      },
      product: {
        type: Product,
        args: {
          id: {
            type: GraphQLInt,
          },
          userId: {
            type: GraphQLInt,
          },
        },
        resolve(_, args) {
          return ProductModel.findOne({
            where: args,
            include: ProductCategoryModel,
          });
        },
      },
      productCategories: {
        type: GraphQLList(ProductCategory),
        args: {
          productId: {
            type: GraphQLInt,
          },
        },
        resolve(root, args) {
          return ProductCategoryModel.findAll({
            where: args,
            include: CategoryModel,
          });
        },
      },
      boughtProducts: {
        type: GraphQLList(Product),
        args: {
          userId: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          let boughtBies = await BoughtByModel.findAll({
            where: args,
          });
          let bought_bies = boughtBies.map(async (b) => {
            let products = await ProductModel.findOne({
              where: { id: b.productId },
              include: ProductCategoryModel,
            });
            return products;
          });
          let result = await Promise.all(bought_bies);
          return result;
        },
      },
      soldProducts: {
        type: GraphQLList(Product),
        args: {
          userId: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          return await ProductModel.findAll({
            where: { userId: args.userId, isBought: true },
            include: ProductCategoryModel,
          });
        },
      },
      borrowedProducts: {
        type: GraphQLList(Product),
        args: {
          userId: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          let rentedBies = await RentedByModel.findAll({
            where: args,
          });
          let rented_bies = rentedBies.map(async (r) => {
            let products = await ProductModel.findOne({
              where: { id: r.productId },
              include: ProductCategoryModel,
            });
            return products;
          });
          let result = await Promise.all(rented_bies);
          return result;
        },
      },
      lentProducts: {
        type: GraphQLList(Product),
        args: {
          userId: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          return await ProductModel.findAll({
            where: { userId: args.userId, isRented: true },
            include: ProductCategoryModel,
          });
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to mutate data',
  fields: () => {
    return {
      // user
      login: {
        type: Auth,
        args: {
          email: {
            type: GraphQLNonNull(GraphQLString),
          },
          password: {
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (root, args) => {
          let user = await UserModel.findOne({ where: { email: args.email } });
          if (!user) throw new Error('User does not exist');
          if (user.password !== args.password)
            throw new Error('Invalid Credentials');
          let token = AUTH_TOKEN;
          return { id: user.id, token };
        },
      },
      register: {
        type: Auth,
        args: {
          first_name: {
            type: GraphQLNonNull(GraphQLString),
          },
          last_name: {
            type: GraphQLNonNull(GraphQLString),
          },
          email: {
            type: GraphQLNonNull(GraphQLString),
          },
          address: {
            type: GraphQLNonNull(GraphQLString),
          },
          phone_number: {
            type: GraphQLNonNull(GraphQLString),
          },
          password: {
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (_, args) => {
          console.log(args);
          let user = await UserModel.findOne({ where: { email: args.email } });
          if (user) throw new Error('User with email already exists');
          user = await UserModel.create(args);
          let token = AUTH_TOKEN;
          return { id: user.id, token };
        },
      },
      // products
      addProduct: {
        type: Product,
        args: {
          title: {
            type: GraphQLNonNull(GraphQLString),
          },
          description: {
            type: GraphQLNonNull(GraphQLString),
          },
          price: {
            type: GraphQLNonNull(GraphQLFloat),
          },
          rent_price: {
            type: GraphQLNonNull(GraphQLFloat),
          },
          rent_option: {
            type: GraphQLNonNull(GraphQLString),
          },
          userId: {
            type: GraphQLInt,
          },
          categories: {
            type: GraphQLList(GraphQLInt),
          },
        },
        resolve: async (_, args) => {
          if (!args.userId) throw new Error('Unauthorized attempt');
          const product = await ProductModel.create(args, {
            include: ProductCategoryModel,
          });
          if (product) {
            let productCategories = args.categories.map(async (cat) => {
              return await ProductCategoryModel.create(
                {
                  productId: product.id,
                  categoryId: cat,
                },
                {
                  include: CategoryModel,
                }
              );
            });
            product.product_categories = await Promise.all(productCategories);
            return product;
          }
        },
      },
      editProduct: {
        type: Product,
        args: {
          id: {
            type: GraphQLInt,
          },
          title: {
            type: GraphQLNonNull(GraphQLString),
          },
          description: {
            type: GraphQLNonNull(GraphQLString),
          },
          price: {
            type: GraphQLNonNull(GraphQLFloat),
          },
          rent_price: {
            type: GraphQLNonNull(GraphQLFloat),
          },
          rent_option: {
            type: GraphQLNonNull(GraphQLString),
          },
          userId: {
            type: GraphQLNonNull(GraphQLInt),
          },
          categories: {
            type: GraphQLList(GraphQLInt),
          },
        },
        resolve: async (_, args) => {
          if (!args.userId) throw new Error('Unauthorized attempt');
          console.log(args.id);
          const product = await ProductModel.update(
            {
              title: args.title,
              description: args.description,
              price: args.price,
              rent_price: args.rent_price,
              rent_option: args.rent_option,
            },
            {
              where: { id: args.id },
              include: ProductCategoryModel,
            }
          );
          if (product[0] === 0) throw new Error('No products found');
          await ProductCategoryModel.destroy({ where: { productId: args.id } });
          let productCategories = args.categories.map(async (cat) => {
            return await ProductCategoryModel.create(
              {
                productId: args.id,
                categoryId: cat,
              },
              { include: CategoryModel }
            );
          });
          let updatedProduct = {
            id: args.id,
            title: args.title,
            description: args.description,
            price: args.price,
            rent_price: args.rent_price,
            rent_option: args.rent_option,
            product_categories: await Promise.all(productCategories),
          };
          return updatedProduct;
        },
      },
      deleteProduct: {
        type: GraphQLString,
        args: {
          id: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          if (!args.id) throw new Error('No products found');
          let product = await ProductModel.destroy({ where: args });
          if (product === 0) throw new Error('No products found');
          return 'Product deleted successfully';
        },
      },
      buyProduct: {
        type: GraphQLString,
        args: {
          productId: {
            type: GraphQLInt,
          },
          userId: {
            type: GraphQLInt,
          },
        },
        resolve: async (_, args) => {
          if (!args.userId) throw new Error('Unauthorized attempt');
          if (!args.productId) throw new Error('No products found');
          let boughtBy = await BoughtByModel.create(args);
          let product = await ProductModel.update(
            { isBought: true },
            { where: { id: args.productId } }
          );
          if (product === 0) throw new Error('No products found');
          if (!boughtBy)
            throw new Error('A problem occurred while buying the product');
          return 'Purchase confirmed';
        },
      },
      rentProduct: {
        type: GraphQLString,
        args: {
          productId: {
            type: GraphQLInt,
          },
          userId: {
            type: GraphQLInt,
          },
          start_date: {
            type: GraphQLDate,
          },
          end_date: {
            type: GraphQLDate,
          },
        },
        resolve: async (_, args) => {
          if (!args.userId) throw new Error('Unauthorized attempt');
          if (!args.productId) throw new Error('No products found');
          let rentedBy = await RentedByModel.create(args);
          let product = await ProductModel.update(
            { isRented: true },
            { where: { id: args.productId } }
          );
          if (product === 0) throw new Error('No products found');
          if (!rentedBy)
            throw new Error('A problem occurred while renting the product');
          return 'Product Renting successful';
        },
      },
    };
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = schema;
