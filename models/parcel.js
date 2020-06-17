"use strict";
module.exports = (sequelize, DataTypes) => {
  const Parcel = sequelize.define(
    "Parcel",
    {
      length: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      CourierId: DataTypes.INTEGER,
    },
    {}
  );
  Parcel.associate = (models) => {
    Parcel.belongsTo(models.Courier);
  };
  return Parcel;
};
