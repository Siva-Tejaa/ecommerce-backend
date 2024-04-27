const User = require("../models/userModel");
const { Order } = require("../models/orderModel");

const {
  customSuccessResponse,
  customErrorResponse,
} = require("../config/customGlobalResponse");

module.exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports.getUser = (req, res) => {
  //TODO

  const {
    _id,
    firstName,
    lastName,
    email,
    role,
    purchases,
    createdAt,
    updatedAt,
  } = req.profile;

  customSuccessResponse.success = true;
  customSuccessResponse.data = {
    data: {
      id: _id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      purchases: purchases,
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  };
  customSuccessResponse.message = "User details fetched Successfully";
  customSuccessResponse.statusCode = 200;
  customSuccessResponse.statusText = "OK";

  //Sending Response
  return res.status(200).json(customSuccessResponse);
};

module.exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  );

  if (!user) {
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "User not found to update details";
    customErrorResponse.statusCode = 400;
    customErrorResponse.statusText = "Bad request";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  customSuccessResponse.success = true;
  customSuccessResponse.data = {
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      purchases: user.purchases,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
  customSuccessResponse.message = "User details updated Successfully";
  customSuccessResponse.statusCode = 200;
  customSuccessResponse.statusText = "OK";

  //Sending Response
  return res.status(200).json(customSuccessResponse);
};

module.exports.userPurchaseList = async (req, res) => {
  const orders = await Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec();

  if (!orders || orders.length === 0) {
    customErrorResponse.success = false;
    customErrorResponse.error = orders;
    customErrorResponse.message = "No Orders found";
    customErrorResponse.statusCode = 400;
    customErrorResponse.statusText = "Bad Request";

    return res.status(400).json(customErrorResponse);
  }

  customSuccessResponse.success = true;
  customSuccessResponse.error = orders;
  customSuccessResponse.message =
    "Orders of particular User successfully fetched";
  customSuccessResponse.statusCode = 200;
  customSuccessResponse.statusText = "OK";

  return res.status(200).json(customSuccessResponse);
};
