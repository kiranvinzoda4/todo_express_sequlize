'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: 'kiran', email: 'kiran@test.com', password: '1234567890', createdAt: new Date(), updatedAt: new Date() },
      { username: 'kevin', email: 'kevin@test.com', password: '1234567890', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
