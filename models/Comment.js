const mongoose = require("mongoose");
const schema = mongoose.Schema;

const imageSchema = new schema({
  url: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
  },
});

const commentSchema = new schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  commentsText: {
    type: String,
  },
  reviewedDate: {
    type: Date,
    required: true,
  },
  images: {
    type: [imageSchema],
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
