const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenum: {
    type: Number,
    required: true,
    unique: true,
    length: 10,
  },
  address: {
    type: String,
    default: "",
  },
  paymentcard: {
    type: Number,
    length: 16,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
