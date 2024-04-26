module.exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    //Modifying ERR Response
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "You are not Admin. Access Denied";
    customErrorResponse.statusCode = 403;
    customErrorResponse.statusText = "Bad Request";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  next();
};
