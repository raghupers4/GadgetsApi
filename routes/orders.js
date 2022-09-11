const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const CartItem = require("../models/CartItem");
const {
  SUCCESS_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require("../constants/statuscodes");
const { validateOrder } = require("../middleware/validateuserinput");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

const getOrderItems = async (orderId) => {
  try {
    let orderItems = await OrderItem.find({ orderId }).populate({
      path: "product",
      select: ["name", "imageUrl", "price", "isDiscounted", "discountedPrice"],
    });
    return orderItems;
  } catch (error) {
    throw new Error(error);
  }
};

router.get("/:id", verifyToken, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (order && Object.keys(order.toObject()).length > 0) {
      order = order.toObject();
      order["orderItems"] = await getOrderItems(order._id);
      res.status(SUCCESS_STATUS_CODE).json(order);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

router.get("/orderitems/:id", verifyToken, async (req, res) => {
  try {
    let orderItem = await OrderItem.findById(req.params.id).populate({
      path: "product",
      select: ["name", "imageUrl", "price", "isDiscounted", "discountedPrice"],
    });
    if (orderItem && Object.keys(orderItem.toObject()).length > 0) {
      res.status(SUCCESS_STATUS_CODE).json(orderItem);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

const calculateTotalPrice = (orderItems) => {
  let subTotal = orderItems.reduce((acc, item) => {
    acc += item.unitPrice * item.quantity;
    return acc;
  }, 0);
  subTotal = Math.round((subTotal + Number.EPSILON) * 100) / 100;
  const tax = subTotal * 0.13;
  let totalPrice = subTotal + tax;
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  return {
    subTotal,
    tax,
    totalPrice,
  };
};

router.post("/", [validateOrder, verifyToken], async (req, res) => {
  try {
    let orderItems = req.body.orderItems;
    const { subTotal, tax, totalPrice } = calculateTotalPrice(orderItems);
    const order = new Order({
      user: req.user.userId,
      orderedDate: new Date(),
      shippingAddress: req.body.shippingAddress,
      subTotal,
      tax,
      totalPrice,
    });
    let newOrder = await order.save();
    newOrder = newOrder.toObject();
    await addOrderItems(req.user.userId, newOrder._id, orderItems);
    res.status(CREATED_STATUS_CODE).json(newOrder);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

const addOrderItems = async (userId, orderId, orderItems) => {
  try {
    for (let i = 0; i < orderItems.length; i++) {
      // add 1-10 days from today's date
      let deliveredDate = new Date().setDate(
        new Date().getDate() + Math.floor(Math.random() * 10)
      );
      const orderItem = new OrderItem({
        orderId,
        product: orderItems[i]?.productId,
        unitPrice: orderItems[i]?.unitPrice,
        quantity: orderItems[i]?.quantity,
        deliveredDate: new Date(deliveredDate),
      });
      await orderItem.save();
      // delete the product in the cart if the order has been placed for the product
      await deleteCartItem(userId, orderItems[i]?.productId);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCartItem = async (userId, productId) => {
  try {
    const cartItem = await CartItem.findOne({
      user: userId,
      product: productId,
    });
    if (cartItem && Object.keys(cartItem.toObject()).length > 0) {
      await cartItem.remove();
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = router;
