const request = require("supertest");
const app = require("../server");

test("no token → unauthorized", async () => {
  const res = await request(app).get("/api/favorites");
  expect(res.statusCode).toBe(401);
});