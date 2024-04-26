const {
  customSuccessResponse,
  customErrorResponse,
} = require("../config/customGlobalResponse");

//Importing Models
const User = require("../models/userModel");

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //Finding the User in Database
  const findUser = await User.findOne({ email: email });

  if (findUser) {
    //Modifying ERR Response
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "User Email already exists";
    customErrorResponse.statusCode = 400;
    customErrorResponse.statusText = "Bad Request";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  //Haashing Password
  const hashedPassword = await User().securePassword(password);

  //Passing and Saving the Signup Data to Database
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashedPassword: hashedPassword,
  });

  user
    .save()
    .then((savedUser) => {
      // Your success logic
      if (savedUser) {
        //Modifying Success Response
        customSuccessResponse.success = true;
        customSuccessResponse.data = {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
        };
        customSuccessResponse.message = "User Signed up Successfully";
        customSuccessResponse.statusCode = 200;
        customSuccessResponse.statusText = "OK";

        //Sending Response
        return res.status(200).json(customSuccessResponse);
      }
    })
    .catch((err) => {
      // Your error handling logic
      if (err) {
        //Modifying ERR Response
        customErrorResponse.success = false;
        customErrorResponse.error = err;
        customErrorResponse.message = "Not Able to Save User in Database";
        customErrorResponse.statusCode = 400;
        customErrorResponse.statusText = "Bad Request";

        //Sending Response
        return res.status(400).json(customErrorResponse);
      }
    });
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  //Finding the User in Database
  const user = await User.findOne({ email: email });

  if (!user) {
    //Modifying ERR Response
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "User Email Id not found";
    customErrorResponse.statusCode = 403;
    customErrorResponse.statusText = "Forbidden";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  //Compare User Passwordd and Hashed Password From database
  const isPasswordMatch = await User().comparePassword(
    password,
    user.hashedPassword
  );

  if (!isPasswordMatch) {
    //Modifying ERR Response
    customErrorResponse.success = false;
    customErrorResponse.error = [];
    customErrorResponse.message = "Password not matched";
    customErrorResponse.statusCode = 403;
    customErrorResponse.statusText = "Forbidden";

    //Sending Response
    return res.status(400).json(customErrorResponse);
  }

  return res.send(user);
};

module.exports.signout = (req, res) => {
  //Modifying Global Response
  customSuccessResponse.status = true;
  customSuccessResponse.data = {};
  customSuccessResponse.message = "SignOut";
  customSuccessResponse.statusCode = 200;
  customSuccessResponse.statusText = "OK";

  //Sending Response
  return res.json(customSuccessResponse);
};
