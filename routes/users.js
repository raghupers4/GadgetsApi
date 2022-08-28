const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/auth");
const {
  validateUserSignupDetails,
  validateUserProfileDetails,
  validateUserLoginDetails,
} = require("../middleware/validateuserinput");
const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require("../constants/statuscodes");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(SUCCESS_STATUS_CODE).json(users);
    } else {
      res.json(SUCCESS_STATUS_CODE).json([]);
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error.message });
  }
});

const getUserCart = async (user_id) => {
  const items = await CartItem.find({ user: user_id }).populate({
    path: "product",
    select: ["name", "imageUrl", "price", "isDiscounted", "discountedPrice"],
  });
  return items;
};

const getCartItemsCount = async (userId) => {
  let cartItems = await CartItem.find({ user: userId }).lean();
  return cartItems?.length;
};

const getUserPlacedOrders = async (user_id) => {
  const placedOrders = await Order.find({ user: user_id, isCancelled: false });
  return placedOrders || [];
};

const getUserCancelledOrders = async (user_id) => {
  const cancelledorders = await Order.find({
    user: user_id,
    isCancelled: true,
  });
  return cancelledorders || [];
};

const getUserReturnedOrders = async (user_id) => {
  const returnedOrders = await Order.find({
    user: user_id,
    isReturned: true,
  });
  return returnedOrders || [];
};
// GET speicific user route
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    // we have to handle the cart and orders routes as below
    // This is because by default express will redirect /users/cart to /users/:id
    // expressconsiders only one main get /users/param request per route
    // so we need to check params and then tranfer the route accordingly as below
    if (req.params.id === "cart") {
      // handling /user/cart route
      return next();
    }
    if (req.params.id === "orders") {
      // handling /user/orders route
      return next();
    }
    let user = await User.findById(req.params.id);
    if (user) {
      // to append cartItems count we have to convert mongodb returned document to plain JS object using .toObject()
      user = user.toObject();
      // get cart items count
      user.cartItemsCount = await getCartItemsCount(req.user.userId);
      return res.status(SUCCESS_STATUS_CODE).json(user);
    }
    return res.status(BAD_REQUEST_STATUS_CODE).json();
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

// POST route
router.post("/signup", validateUserSignupDetails, async (req, res) => {
  try {
    const { email, phoneNum } = req.body;
    const existingUserWithSameEmail = await User.findOne({ email });
    if (existingUserWithSameEmail) {
      return res.status(CONFLICT_STATUS_CODE).json({
        message:
          "User already exists with the same email. Please login or create account with different email",
      });
    }
    // const existingUserWithSamePhoneNum = await User.findOne({ phoneNum });
    // if (existingUserWithSamePhoneNum) {
    //   return res.status(CONFLICT_STATUS_CODE).json({
    //     message:
    //       "This mobile number is already in use by another user. Please use different number.",
    //   });
    // }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email,
      password: hashedPassword,
      phoneNum,
      address: req.body.address,
    });
    const newUser = await user.save();
    res.status(CREATED_STATUS_CODE).json(newUser);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error.message });
  }
});

// login route
router.post("/login", validateUserLoginDetails, async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .json({ message: "Invalid email or password" });
      }
      const payload = { userId: user._id };
      const accessToken = await generateToken(payload);
      if (!accessToken) {
        return res
          .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
          .json({ message: "Error in generating token. Please try later." });
      }
      const cartItemsCount = await getCartItemsCount(user._id);
      user = user.toObject();
      // no need of sending password back to the user
      delete user["password"];
      res
        .status(SUCCESS_STATUS_CODE)
        .json({ user, accessToken, cartItemsCount });
    } else {
      // Incorrect email id
      res
        .status(BAD_REQUEST_STATUS_CODE)
        .json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error.message });
  }
});

const generateToken = async (payload) => {
  const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  return accessToken;
};

const getUser = async (req, res, next) => {
  // a middle ware function that gets executed before the callback
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      return res
        .status(400)
        .json({ message: `Cannot find the user with id ${req.params.id}` });
    }
    verifyToken();
    res.user = req.user;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

// PUT route
router.put("/", [validateUserProfileDetails, verifyToken], async (req, res) => {
  try {
    const updatedUser = { ...req.body };
    if (updatedUser?.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatedUser.password, salt);
      updatedUser.password = hashedPassword;
    }
    await User.findByIdAndUpdate(req.user.userId, updatedUser);
    let user = await User.findById(req.user.userId);
    user = user.toObject();
    delete user["password"];
    res.status(SUCCESS_STATUS_CODE).json(user);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error.message });
  }
});

// PATCH route
router.patch(
  "/",
  [validateUserProfileDetails, verifyToken],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updatedUser.password, salt);
        user.password = hashedPassword;
      }
      if (req.body.address) {
        user.address = req.body.address;
      }
      if (req.body.phoneNum) {
        user.phoneNum = req.body.phoneNum;
      }
      if (req.body.paymentcard) {
        user.paymentcard = req.body.paymentcard;
      }
      await user.save();
      user = user.toObject();
      delete user["password"];
      res.status(SUCCESS_STATUS_CODE).json(user);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .json({ message: error.message });
    }
  }
);

// REMOVE route
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const user = await User.find(req.user.userId);
//     await user.remove();
//     res
//       .status(SUCCESS_STATUS_CODE)
//       .json({ message: `Removed user with id ${req.params.id}` });
//   } catch (error) {
//     res
//       .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
//       .json({ message: error.message });
//   }
// });

// GET user cart
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const cartItems = await getUserCart(req.user.userId);
    if (cartItems) {
      res.json(cartItems);
    } else {
      res.json([]);
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error.message });
  }
});

const getCartItem = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId);
  return cartItem;
};

// ORDERS ROUTES
router.get("/orders", verifyToken, async (req, res) => {
  try {
    const placedOrders = await getUserPlacedOrders(req.user.user_id);
    const cancelledOrders = await getUserCancelledOrders(req.user.user_id);
    const returnedOrders = await getUserReturnedOrders(req.user.user_id);
    res.json({ placedOrders, cancelledOrders, returnedOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getOrder = async (orderid) => {
  const specificOrder = await Order.findById(orderid);
  return specificOrder || null;
};

router.post("/orders", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      productId: req.body.productId,
      orderedDate: req.body.orderedDate,
      paymentMethod: req.body.paymentMethod,
      total: req.body.total,
      isCancelled: req.body.isCancelled,
      shippingAddress: req.body.shippingAddress,
      user: req.user.user_id,
    });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH order route
router.patch("/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    if (order === null) {
      return res.status(404).json({
        message: `Cannot find the order with id: ${req.params.id}`,
      });
    }
    if (req.body.isCancelled) {
      order.isCancelled = req.body.isCancelled;
    }
    if (req.body.shippingAddress) {
      order.shippingAddress = req.body.shippingAddress;
    }
    if (req.body.deliveredDate) {
      order.deliveredDate = req.body.deliveredDate;
    }
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE order route
router.delete("/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    if (order === null) {
      return res.status(404).json({
        message: `Cannot find the order with id: ${req.params.id}`,
      });
    }
    await order.remove();
    res.json({ message: `Removed the order with id ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
