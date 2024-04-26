const mongoose = require("mongoose");
const { Schema } = mongoose;

//Password BCryptor
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: [true, "LastName is required"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Methods for user schema
userSchema.methods.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.securePassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("User", userSchema);
