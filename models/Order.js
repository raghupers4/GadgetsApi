const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Order schema
const OrderSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  orderedDate: {
    type: Date,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  shippingAddress: {
    type: String,
  },
  deliveredDate: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
