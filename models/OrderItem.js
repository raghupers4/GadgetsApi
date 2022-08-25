const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderItemSchema = schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  deliveredDate: {
    type: Date,
  },
});

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);
module.exports = orderItemModel;
