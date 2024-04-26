const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxLength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryModel", categorySchema);
