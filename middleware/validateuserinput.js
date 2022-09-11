const {
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../constants/statuscodes");
const mongoose = require("mongoose");

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function isValidName(name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
}

const validateUserSignupDetails = (req, res, next) => {
  const errors = [];
  let isValid = false;
  // check("name")
  //   .notEmpty()
  //   .withMessage("Name is required")
  //   .isAlpha()
  //   .withMessage("Only alphabets are allowed for name"),
  //   check("email")
  //     .notEmpty()
  //     .withMessage("Email is required")
  //     .isEmail()
  //     .withMessage("Invalid email"),
  //   check("password")
  //     .notEmpty()
  //     .withMessage("Password is required")
  //     .isLength({ min: 6 })
  //     .withMessage("Password requires atleast 6 characters");
  const { name, email, password, phoneNum, address } = req.body;
  if (!name) {
    errors.push({ message: "Name is required", param: "name" });
  } else if (!isValidName(name)) {
    errors.push({
      message: "Only alphabets are allowed for name",
      param: "name",
    });
  }
  if (!email) {
    errors.push({ message: "Email is required", param: "email" });
  } else if (!isValidEmail(email)) {
    errors.push({ message: "Invalid email format", param: "email" });
  }
  if (!password) {
    errors.push({ message: "Password is required", param: "password" });
  } else if (password.length < 8) {
    errors.push({
      message: "Password requires atleast 8 characters",
      param: "password",
    });
  }
  if (!phoneNum) {
    errors.push({ message: "Phone number is required", param: "phoneNum" });
  } else if (!(Number(phoneNum) > 0)) {
    errors.push({
      message: "Invalid phone number",
      param: "phoneNum",
    });
  } else if (phoneNum.length !== 10) {
    errors.push({
      message: "Length of phone number should be 10 digits",
      param: "phoneNum",
    });
  }
  if (!address) {
    errors.push({
      message: "address is required",
      param: "address",
    });
  } else {
    errors.push(...validateAddress(address));
  }
  if (errors.length > 0) {
    return res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateUserProfileDetails = (req, res, next) => {
  const errors = [];
  const { name, password, phoneNum, address } = req.body;
  if (name && !isValidName(name)) {
    errors.push({
      message: "Only alphabets are allowed for name",
      param: "name",
    });
  }
  if (password && password.length < 8) {
    errors.push({
      message: "Password requires atleast 8 characters",
      param: "password",
    });
  }
  if (phoneNum && !(Number(phoneNum) > 0)) {
    errors.push({
      message: "Invalid phone number",
      param: "phoneNum",
    });
  } else if (phoneNum && phoneNum.length !== 10) {
    errors.push({
      message: "Length of phone number should be 10 digits",
      param: "phoneNum",
    });
  }
  if (address) {
    errors.push(...validateAddress(address));
  }
  if (errors.length > 0) {
    return res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  }
  next();
};

const validateUserLoginDetails = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;
  if (!email) {
    errors.push({ message: "Email is required", param: "email" });
  } else if (!isValidEmail(email)) {
    errors.push({ message: "Invalid email format", param: "email" });
  }
  if (!password) {
    errors.push({ message: "Password is required", param: "password" });
  } else if (password.length < 8) {
    errors.push({
      message: "Password requires atleast 8 characters",
      param: "password",
    });
  }
  if (errors.length > 0) {
    return res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateUserAddedCart = (req, res, next) => {
  const { productId, quantity } = req.body;
  const errors = [];
  if (!quantity) {
    errors.push({ message: "quantity is required", param: "quantity" });
  } else if (quantity <= 0 || quantity > 5 || quantity % 1 !== 0) {
    errors.push({
      message: "quantity accepts only positive integers from 1-5",
      param: "quantity",
    });
  }
  if (!productId) {
    errors.push({ message: "productId is required", param: "productId" });
  } else if (!mongoose.isValidObjectId(productId)) {
    errors.push({ message: "productId is not valid", param: "productId" });
  }
  if (errors.length > 0) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateUserEditCart = (req, res, next) => {
  const { quantity } = req.body;
  const errors = [];
  if (quantity && (quantity <= 0 || quantity > 5 || quantity % 1 !== 0)) {
    errors.push({
      message: "quantity accepts only positive integers from 1-5",
      param: "quantity",
    });
  }

  if (errors.length > 0) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateUserComment = (req, res, next) => {
  const { heading, rating, productId } = req.body;
  const errors = [];
  if (!productId) {
    errors.push({ message: "productId is required", param: "productId" });
  } else if (!mongoose.isValidObjectId(productId)) {
    errors.push({ message: "productId is not valid", param: "productId" });
  }

  if (!heading) {
    errors.push({ message: "heading is required", param: "heading" });
  }
  if (!rating) {
    errors.push({ message: "rating is required", param: "rating" });
  } else if (!isValidRating(rating)) {
    errors.push({
      message: "Rating must be a number from 1-5",
      param: "rating",
    });
  }
  if (errors.length > 0) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateEditComment = (req, res, next) => {
  const errors = [];
  const { rating } = req.body;
  if (rating && !isValidRating(rating)) {
    errors.push({
      message: "Rating must be a number from 1-5",
      param: "rating",
    });
  }
  if (errors.length > 0) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const isValidRating = (rating) => {
  // const { rating } = req.body;
  if (
    rating &&
    !isNaN(rating) &&
    parseFloat(rating) > 0 &&
    parseFloat(rating) <= 5
  ) {
    return true;
  }
  return false;
};

const validateOrder = (req, res, next) => {
  const errors = [];
  let { orderItems, shippingAddress } = req.body;
  if (!orderItems) {
    errors.push({
      message: "Atleast one order item is required to place a order",
      param: "orderItems",
    });
  } else {
    if (orderItems?.length > 0) {
      orderItems.forEach((item) => {
        const { productId, unitPrice, quantity } = item;
        if (!mongoose.isValidObjectId(productId)) {
          errors.push({
            message: `productId: ${productId} is not valid`,
            param: "productId",
          });
        }
        if (!quantity) {
          errors.push({
            message: `quantity is required for the productId: ${productId}`,
            param: "quantity",
          });
        } else if (
          quantity &&
          !(Number(quantity) > 0 && Number(quantity) < 6 && quantity % 1 === 0)
        ) {
          errors.push({
            message: `quantity accepts only positive integers from 1-5 for the productId: ${productId}`,
            param: "quantity",
          });
        }

        if (!unitPrice) {
          errors.push({
            message: `unitPrice is required for the productId: ${productId}`,
            param: "unitPrice",
          });
        } else if (!(Number(unitPrice) > 0)) {
          errors.push({
            message: `unitPrice should be a positive decimal value for the productId: ${productId}`,
            param: "unitPrice",
          });
        }
      });
    } else {
      errors.push({
        message: "Atleast one order item is required to place a order",
        param: "orderItems",
      });
    }
  }

  if (!shippingAddress) {
    errors.push({
      message: "shippingAddress is required for the order",
      param: "shippingAddress",
    });
  } else {
    const addressErrors = validateAddress(shippingAddress);
    errors.push(...addressErrors);
  }

  if (errors.length > 0) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ errors });
  } else {
    next();
  }
};

const validateAddress = (address) => {
  const { street, city, province, postalCode } = address;
  const errors = [];
  if (!street) {
    errors.push({
      message: "street is required for the address",
      param: "street",
    });
  }
  if (!city) {
    errors.push({
      message: "city is required for the address",
      param: "city",
    });
  }
  if (!province) {
    errors.push({
      message: "province is required for the address",
      param: "province",
    });
  }
  if (!postalCode) {
    errors.push({
      message: "postalCode is required for the address",
      param: "postalCode",
    });
  }
  return errors;
};

const defaultExports = {
  validateUserSignupDetails,
  validateUserLoginDetails,
  validateUserProfileDetails,
  validateUserAddedCart,
  validateUserEditCart,
  validateOrder,
  validateUserComment,
  validateEditComment,
};

module.exports = defaultExports;
