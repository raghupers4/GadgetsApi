const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../constants/statuscodes");

router.get("/", async (req, res) => {
  try {
    let products;
    const query = req.query;
    if (query && Object.keys(query).length > 0) {
      // ?CategoryId=100 && IsDiscounted=1 && make=Apple
      products = await Product.find(req.query);
    } else {
      products = await Product.find();
    }
    if (products) {
      res.status(SUCCESS_STATUS_CODE).json(products);
    } else {
      res.status(SUCCESS_STATUS_CODE).json([]);
    }

    // if (query && Object.keys(query).length > 0) {
    //   let filteredProducts = [...products];
    //   for (let key in query) {
    //     filteredProducts = filteredProducts.filter((prod) => {
    //       if (
    //         typeof prod[key] === "string" &&
    //         prod[key]?.toLowerCase() === query[key].toLowerCase()
    //       ) {
    //         return true;
    //       } else if (
    //         typeof prod[key] === "number" &&
    //         prod[key] === Number(query[key])
    //       ) {
    //         return true;
    //       } else if (
    //         typeof prod[key] === "boolean" &&
    //         !isNaN(query[key]) &&
    //         (Number(query[key]) === 0 || Number(query[key]) === 1) &&
    //         prod[key] === Boolean(Number(query[key]))
    //       ) {
    //         return true;
    //       }

    //       return false;
    //     });
    //   }
    //   if (filteredProducts.length > 0) {
    //     res.status(200).send(filteredProducts);
    //   } else {
    //     returnError(res);
    //   }
    // } else {
    //   res.status(200).send(products);
    // }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(SUCCESS_STATUS_CODE).json(product);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

module.exports = router;
