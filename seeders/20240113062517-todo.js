// demo-todo-seeder.js
const faker = require('faker');
faker.locale = 'en';
const { User } = require('../models');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();

    const fakeTodos = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      fakeTodos.push({
        title: faker.name.findName(),
        description: faker.random.words(),
        user_id: randomUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Todos', fakeTodos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
