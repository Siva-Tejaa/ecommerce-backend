const { customErrorResponse } = require("../config/customGlobalResponse");

module.exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;

  if (!checker) {
    //Modifying ERR Response
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "Access Denied";
    customErrorResponse.statusCode = 400;
    customErrorResponse.statusText = "Bad Request";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  next();
};
