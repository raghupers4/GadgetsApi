const express = require("express");
const router = express.Router();
const data = require("../data/data");

const { productreviews } = data;

router.get("/:productid", (req, res) => {
  try {
    const productid = req.params.productid;
    if (productreviews) {
      const prodReviews = productreviews.find(
        (prod) => prod.ProductId === productid
      );
      res.status(200).json(prodReviews.reviews);
    }
  } catch (err) {
    res.status(400).json({ message: "No reviews found for this product" });
  }
});

module.exports = router;
