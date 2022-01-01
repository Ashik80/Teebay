'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          title: 'ELECTRONICS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'FURNITURE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'HOME APPLIANCES',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'SPORTING GOODS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'OUTDOOR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'TOYS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
