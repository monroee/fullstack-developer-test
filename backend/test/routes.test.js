const request = require("supertest");
const app = require("../index");

describe("GET data/all", function () {
  it("result should be an array of json objects", function () {
    request(app)
      .get("data/all")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });

  it("result should have a status of 200", function () {
    request(app)
      .get("data/all")
      .set("Accept", "application/json")
      .expect(200);
  });
});