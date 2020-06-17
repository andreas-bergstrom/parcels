const express = require("express");
const finale = require("finale-rest");
const bodyParser = require("body-parser");
const db = require("./models");
const { Parcel, Courier } = db;
const env = process.env.NODE_ENV || "development";
const config = require("./config/database.js")[env];

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = config.app_port || 3000;

finale.initialize({
  app: app,
  sequelize: db.sequelize,
});

var parcelResource = finale.resource({
  model: Parcel,
  endpoints: ["/parcels", "/parcels/:id"],
});

var courierResource = finale.resource({
  model: Courier,
  endpoints: ["/couriers", "/couriers/:id"],
});

app.get("/", (req, res) => res.send("Welcome to Parcels!"));

module.exports = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
