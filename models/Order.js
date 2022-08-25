const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  addressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

// Order schema
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderedDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "credit card",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: addressSchema,
    required: true,
  },
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
