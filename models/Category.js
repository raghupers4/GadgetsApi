const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  categoryId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model("Categorie", categorySchema);
module.exports = categoryModel;
