process.env.NODE_ENV = "test";
import supertest from "supertest";

import { app, server } from "../../app";
import { disconnectDb } from "../../models/db";

const request = supertest(app);

console.error = jest.fn(); // silence log during test
console.log = jest.fn(); // silence log during test

describe("API Test", () => {
  afterAll(async () => {
    await disconnectDb();
    server.close();
  });

  it("GET Todo: Get all todos from db", async () => {
    const res = await request.get("/todo");
    expect(res.status).toBe(200);
    expect(res.body.result).toEqual([]);
  });

  it("POST Todo: Add new todo to db", async () => {
    const res = await request.post("/todo");
    expect(res.status).toBe(200);
  });
});
