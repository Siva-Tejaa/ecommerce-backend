const { expressjwt } = require("express-jwt");

module.exports.isValidToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
