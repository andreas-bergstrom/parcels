module.exports = {
  development: {
    username: "parcels",
    password: "parcels",
    database: "parcels",
    host: "parcels_postgres_1",
    dialect: "postgres",
  },
  test: {
    username: "parcels",
    password: "parcels",
    database: "parcels_test",
    host: "parcels_postgres_1",
    dialect: "postgres",
    app_port: 3001,
  },
};
