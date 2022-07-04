const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUserCart = async (user_id) => {
  const items = await CartItem.find({ user: user_id });
  return items;
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
router.get("/:id", async (req, res, next) => {
  try {
    // we have to handle the cart and orders routes as below
    // This is because by default express will redirect /users/cart to /users/:id
    // expressconsiders only one main get /users/param request per route
    // so we need to check params and then tranfer the route accordingly as below
    if (req.params.id === "cart") {
      // handling /users/cart route
      return next();
    }
    if (req.params.id === "orders") {
      // handling /users/orders route
      return next();
    }
    let user = await User.findById(req.params.id);
    if (user) {
      // to append cartItems and orders we have to convert mongodb returned document to plain JS object using .toObject()
      user = user.toObject();
      // get cart items and orders placed
      const cartItems = await getUserCart(user);
      const placedOrders = await getUserPlacedOrders(user);
      const cancelledOrders = await getUserCancelledOrders(user);
      const returnedOrders = await getUserReturnedOrders(user);
      user.cart = cartItems && cartItems.length > 0 ? cartItems : [];
      user.placedOrders =
        placedOrders && placedOrders.length > 0 ? placedOrders : [];
      user.cancelledOrders =
        cancelledOrders && cancelledOrders.length > 0 ? cancelledOrders : [];
      user.returnedOrders =
        returnedOrders && returnedOrders.length > 0 ? returnedOrders : [];
      return res.json(user);
    }
    return res.status(400).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route
router.post("/register", async (req, res) => {
  try {
    const { email, phonenum } = req.body;
    const existingUserWithSameEmail = await User.findOne({ email });
    if (existingUserWithSameEmail) {
      return res.status(409).json({
        message:
          "User already exists with the same email. Please login or create account with different email",
      });
    }
    const existingUserWithSamePhoneNum = await User.findOne({ phonenum });
    if (existingUserWithSamePhoneNum) {
      return res.status(409).json({
        message:
          "This mobile number is already in use by another user. Please use different number.",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email,
      password: hashedPassword,
      phonenum: req.body.phonenum,
      address: req.body.address,
      paymentcard: req.body.paymentcard,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const payload = { user_id: user._id, email };
      const accessToken = await generateToken(payload);
      if (!accessToken) {
        return res.status(500).json({ message: "Token not generated" });
      }
      const cartItems = await getUserCart(user._id);
      user = user.toObject();
      // no need of sending password back to the user
      delete user["password"];
      res.status(200).json({ user, accessToken, cartItems });
    } else {
      // Incorrect email id
      res.status(400).json({ message: "Invalid email id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const generateToken = async (payload) => {
  const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
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
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = { ...req.body };
    console.log(updatedUser);
    await User.findByIdAndUpdate(req.params.id, updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH route
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.name) {
      res.user.name = req.body.name;
    }
    if (req.body.password) {
      res.user.password = req.body.password;
    }
    if (req.body.address) {
      res.user.address = req.body.address;
    }
    if (req.body.phonenum) {
      res.user.phonenum = req.body.phonenum;
    }
    if (req.body.paymentcard) {
      res.user.paymentcard = req.body.paymentcard;
    }
    await res.user.save();
    res.json(res.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE route
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: `Removed user with id ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CART ROUTES
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const cartItems = await getUserCart(req.user.user_id);
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getCartItem = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId);
  return cartItem;
};

// POST cart route
router.post("/cart", verifyToken, async (req, res) => {
  try {
    const cart = await CartItem.create({
      productId: req.body.productId,
      productName: req.body.productName,
      imageUrl: req.body.imageUrl,
      productPrice: req.body.productPrice,
      quantity: req.body.quantity,
      user: req.user.user_id,
    });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH cart route
router.patch("/cart/:id", verifyToken, async (req, res) => {
  try {
    const cartItem = await getCartItem(req.params.id);
    if (cartItem === null) {
      return res.status(404).json({
        message: `Cannot find the cart item with id ${req.params.id}`,
      });
    }
    if (req.body.quantity) {
      cartItem.quantity = req.body.quantity;
    }
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE cart route
router.delete("/cart/:id", verifyToken, async (req, res) => {
  try {
    const cartItem = await getCartItem(req.params.id);
    if (cartItem === null) {
      return res.status(404).json({
        message: `Cannot find the cart item with id ${req.params.id}`,
      });
    }
    await cartItem.remove();
    res.json({ message: `Removed the cart item with id ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
