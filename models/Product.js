const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = schema({
  name: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  totalReviews: {
    type: Number,
  },
  avgRating: {
    type: Number,
  },
  isDiscounted: {
    type: Boolean,
  },
  discountedPrice: {
    type: Number,
  },
  categoryId: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
