const express = require("express");
const CartItem = require("../models/CartItem");
const {
  SUCCESS_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
} = require("../constants/statuscodes");
const { verifyToken } = require("../middleware/auth");
const {
  validateUserAddedCart,
  validateUserEditCart,
} = require("../middleware/validateuserinput");
const router = express.Router();

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id).populate({
      path: "product",
      select: ["name", "imageUrl", "price", "isDiscounted", "discountedPrice"],
    });
    if (cartItem) {
      res.status(SUCCESS_STATUS_CODE).json(cartItem);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

router.post("/", [validateUserAddedCart, verifyToken], async (req, res) => {
  try {
    const cartWithSameProducts = await CartItem.find({
      user: req.user.userId,
      product: req.body.productId,
    }).lean();

    if (cartWithSameProducts?.length > 0) {
      return res.status(BAD_REQUEST_STATUS_CODE).json({
        message:
          "Found cart items with the same productId. Please update the cart or add cart with different productId",
      });
    }
    const cartItem = new CartItem({
      user: req.user.userId,
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    await cartItem.save();
    res.status(SUCCESS_STATUS_CODE).json(cartItem);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

router.put("/:id", [validateUserEditCart, verifyToken], async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (cartItem) {
      cartItem.quantity = req.body.quantity;
      await cartItem.save();
      res.status(SUCCESS_STATUS_CODE).json(cartItem);
    } else {
      res
        .status(NOT_FOUND_STATUS_CODE)
        .json({ message: `No Cart Item found with id: ${req.params.id}` });
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (cartItem) {
      await cartItem.remove();
      res
        .status(SUCCESS_STATUS_CODE)
        .json({ message: `Cart Item with id: ${req.params.id} is deleted` });
    } else {
      res
        .status(NOT_FOUND_STATUS_CODE)
        .json({ message: `No Cart Item found with id: ${req.params.id}` });
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ message: error?.message });
  }
});

module.exports = router;
