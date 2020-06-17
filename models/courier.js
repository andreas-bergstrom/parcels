"use strict";

module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define(
    "Courier",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Courier.associate = function (models) {
    Courier.hasMany(models.Parcel);
  };
  return Courier;
};
