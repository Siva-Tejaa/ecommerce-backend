const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 3000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxLength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductModel", productSchema);
