const express = require("express");
const router = express.Router();

//Controllers
const { signup, signin, signout } = require("../controllers/authController");
const { validateSignup } = require("../middlewares/signupMiddleware");
const { validateSignin } = require("../middlewares/signinMiddleware");
const { isValidToken } = require("../middlewares/restrictedMiddleware");

//SIGNUP || POST
router.post("/signup", validateSignup, signup);

//SIGNIN || POST
router.post("/signin", validateSignin, signin);

//SIGNOUT || GET
router.get("/signout", signout);

//TEST ROUTE || POST
router.get("/testroute", isValidToken, (req, res) => {
  return res.json(req.auth);
});

module.exports = router;
