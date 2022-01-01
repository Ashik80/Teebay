const db = require('../models/index');

const connect = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to database:', error);
  }
};

module.exports = { connect };
