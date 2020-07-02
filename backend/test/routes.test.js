const request = require("supertest");
const app = require("../index");

describe("GET data/all", function () {
  it("should respond with json", function () {
    request(app)
      .get("data/all")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
