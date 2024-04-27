const router = require("express").Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/userController");
const { isValidToken } = require("../middlewares/restrictedMiddleware");
const { isAuthenticated } = require("../middlewares/isAuthenticatedMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");

router.param("userId", getUserById);

router.get("/user/:userId", isValidToken, isAuthenticated, getUser);

router.put("/user/:userId", isValidToken, isAuthenticated, updateUser);

router.get(
  "/user/orders/:userId",
  isValidToken,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
