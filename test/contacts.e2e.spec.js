const request = require("supertest");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const app = require("../app");
const Contact = require("../model/contact");
const User = require("../model/user");
const { newContact, newUserForRouteContact } = require("./data/data");
require("dotenv").config();

describe("Test route contacts", () => {
  describe("GET request", () => {
    it("should return status 200 get all contacts", async () => {
      const response = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${user.token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contacts).toBeInstanceOf();
    });
    it("should return status 200 get by ID contacts", async () => {});
    it("should return status 404 if contact  not found", async () => {});
  });
});
