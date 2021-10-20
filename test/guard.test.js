const guard = require("../helpers/guard");
const passport = require("passport");
const { HttpCode } = require("../config/constants");

describe("Unit test guard helper", () => {
  const user = { token: "111222333" };
  let req, res, next;

  beforeEach(() => {
    req = { get: jest.fn((header) => `Bearer ${user.token}`), user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });
  it("User exist", async () => {});
});
