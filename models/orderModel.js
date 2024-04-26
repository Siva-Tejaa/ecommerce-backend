const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const cartProductsSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  quantity: Number,
  price: Number,
});

const CartProducts = mongoose.model("CartProducts", cartProductsSchema);

const orderSchema = new Schema(
  {
    products: [cartProductsSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("OrderModel", orderSchema);

module.exports = { Order, CartProducts };
