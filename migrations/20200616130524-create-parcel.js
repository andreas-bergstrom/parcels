"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Parcels", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        CourierId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        length: {
          type: Sequelize.INTEGER,
        },
        width: {
          type: Sequelize.INTEGER,
        },
        height: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("Parcels", ["CourierId"], {
          type: "foreign key",
          references: {
            table: "Couriers",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Parcels");
  },
};
