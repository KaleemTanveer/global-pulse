const request = require("supertest");
const app = require("../server");
const sequelize = require("../config/db");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Auth API", () => {

  test("register success", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test1@test.com",  
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toBeDefined();
  });

  test("duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      email: "dup@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/register").send({
      email: "dup@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(409);
  });

  test("login success", async () => {
    await request(app).post("/api/auth/register").send({
      email: "login@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("token"); 
  });

  test("wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "wrong",
    });

    expect(res.statusCode).toBe(401);
  });

});