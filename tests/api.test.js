const request = require("supertest");
const app = require("../server");
const db = require("../models");

describe("Courier", () => {
  it("should create a new courier", async () => {
    const couriers_before = await request(app).get("/couriers").send();
    expect(couriers_before.body).toHaveLength(0);

    const res = await request(app).post("/couriers").send({
      name: "UPS",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "UPS");

    const couriers_after = await request(app).get("/couriers").send();
    expect(couriers_after.body).toHaveLength(1);
  });
  it("should retrieve the courier by name", async () => {
    await request(app).post("/couriers").send({
      name: "PostNord",
    });
    const res = await request(app).get("/couriers?name=UPS").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("name", "UPS");
  });
  it("should delete the courier", async () => {
    const couriers_before = await request(app).get("/couriers").send();
    expect(couriers_before.body).toHaveLength(2);

    const res = await request(app).delete(`/couriers/${couriers_before.body[0].id}`);
    expect(res.statusCode).toEqual(200);

    const couriers_after = await request(app).get("/couriers").send();
    expect(couriers_after.body).toHaveLength(1);
  });
});

describe("Parcel", () => {
  it("should create a new parcel", async () => {
    await request(app).post("/couriers").send({
      name: "PostNord",
    });

    const parcels_before = await request(app).get("/parcels").send();
    expect(parcels_before.body).toHaveLength(0);

    const res = await request(app).post("/parcels").send({
      CourierId: 2,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("CourierId", 2);

    const parcels_after = await request(app).get("/parcels").send();
    expect(parcels_after.body).toHaveLength(1);
  });
  it("should retrieve all parcels", async () => {
    const res = await request(app).get("/parcels").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("CourierId", 2);
  });
  it("should delete the parcel", async () => {
    const parcels_before = await request(app).get("/parcels").send();
    expect(parcels_before.body).toHaveLength(1);

    const res = await request(app).delete(`/parcels/${parcels_before.body[0].id}`);
    expect(res.statusCode).toEqual(200);

    const parcels_after = await request(app).get("/parcels").send();
    expect(parcels_after.body).toHaveLength(0);
  });
});

afterAll(async (done) => {
  app.close();
  db.sequelize.close();
  done();
});
