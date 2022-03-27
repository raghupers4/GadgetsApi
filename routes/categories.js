const express = require("express");
const data = require("../data/data");

const router = express.Router();

const { categories } = data;
router.get("/", (req, res) => {
  res.status(200).send(categories);
});

module.exports = router;
