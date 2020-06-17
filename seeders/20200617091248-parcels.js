"use strict";
const R = require("rambda");
const faker = require("faker");
const db = require("../models");
const { Courier } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ids = await Courier.findAll().then((couriers) => {
      return couriers.map((courier) => courier.id);
    });

    return queryInterface.bulkInsert(
      "Parcels",
      R.map((index) => ({
        width: (Math.random() * 100) | 0,
        length: (Math.random() * 100) | 0,
        height: (Math.random() * 100) | 0,
        CourierId: faker.random.arrayElement(ids),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))(R.range(20, 40)),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Parcels", null, {});
  },
};
