const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUserCart = async (user) => {
  const items = await CartItem.find({ user: user._id });
  return items;
};

const getUserPlacedOrders = async (user) => {
  const placedOrders = await Order.find({ user: user._id, isCancelled: false });
  return placedOrders;
};

const getUserCancelledOrders = async (user) => {
  const cancelledorders = await Order.find({
    user: user._id,
    isCancelled: true,
  });
  return cancelledorders;
};

const getUserReturnedOrders = async (user) => {
  const returnedOrders = await Order.find({
    user: user._id,
    isReturned: true,
  });
  return returnedOrders;
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
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
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

const getUser = async (req, res, next) => {
  // a middle ware function that gets executed before the callback
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      return res
        .status(400)
        .json({ message: `Cannot find the user with id ${req.params.id}` });
    }
    res.user = user;
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
router.patch("/:id", getUser, async (req, res) => {
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

// cart routes
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (cartItem === null) {
      return res.status(404).json({
        message: `Cannot find the cart item with id ${req.params.id}`,
      });
    }
    res.cartItem = cartItem;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

router.get("/cart/:id", getCartItem, (req, res) => {
  res.json(res.cartItem);
});

// POST cart route
router.post("/cart", async (req, res) => {
  try {
    const cart = new CartItem({
      productId: req.body.productId,
      quantity: req.body.quantity,
      user: req.body.user,
    });
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH cart route
router.patch("/cart/:id", getCartItem, async (req, res) => {
  try {
    if (req.body.quantity) {
      res.cartItem.quantity = req.body.quantity;
    }
    await res.cartItem.save();
    res.json(res.cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE cart route
router.delete("/cart/:id", getCartItem, async (req, res) => {
  try {
    await res.cartItem.remove();
    res.json({ message: `Removed cart item with id ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Orders routes

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getOrder = async (req, res, next) => {
  try {
    const specificOrder = await Order.findById(req.params.id);
    if (specificOrder === null) {
      return res
        .status(404)
        .json({ message: `Cannot find the order with id ${req.params.id}` });
    }
    res.order = specificOrder;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

router.get("/orders/:id", getOrder, (req, res) => {
  res.json(res.order);
});

router.post("/orders", async (req, res) => {
  try {
    const order = new Order({
      productId: req.body.productId,
      orderedDate: req.body.orderedDate,
      paymentMethod: req.body.paymentMethod,
      total: req.body.total,
      isCancelled: req.body.isCancelled,
      shippingAddress: req.body.shippingAddress,
      user: req.body.user,
    });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH order route
router.patch("/orders/:id", getOrder, async (req, res) => {
  try {
    if (req.body.isCancelled) {
      res.order.isCancelled = req.body.isCancelled;
    }
    if (req.body.shippingAddress) {
      res.order.shippingAddress = req.body.shippingAddress;
    }
    if (req.body.deliveredDate) {
      res.order.deliveredDate = req.body.deliveredDate;
    }
    await res.order.save();
    res.json(res.order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE order route
router.delete("/orders/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: `Removed the order with id ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
