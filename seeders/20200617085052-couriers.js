"use strict";
const faker = require("faker");
const R = require("rambda");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Couriers",
      R.map((index) => ({
        name: faker.company.companyName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))(R.range(3, 6)),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Couriers", null, {});
  },
};
