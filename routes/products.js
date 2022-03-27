const express = require("express");
const data = require("../data/data");
const router = express.Router();

const { products } = data;

router.get("/", (req, res) => {
  res.status(200).send(products);
});

module.exports = router;
