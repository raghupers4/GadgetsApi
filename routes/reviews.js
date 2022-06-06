const express = require("express");
const router = express.Router();
const data = require("../data/data");

const { productreviews, products } = data;

router.get("/:productid", (req, res) => {
  try {
    const productid = req.params.productid;
    if (productreviews) {
      const prodReviews = productreviews.find(
        (prod) => prod.ProductId === productid
      );
      if (prodReviews?.reviews) {
        res.status(200).json(prodReviews.reviews);
      } else {
        res.status(400).json({ message: "No reviews found for this product" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err?.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newReview = {
      username: req.body.username,
      rating: req.body.rating,
      revieweddate: req.body.revieweddate,
      header: req.body.header,
      comments: req.body.comments,
    };
    const product = products.find((p) => p.Id === req.body.productId);
    if (product) {
      const prodReviews = productreviews.find(
        (prod) => prod.ProductId === product.Id
      );
      if (prodReviews?.reviews || prodReviews?.reviews?.length > 0) {
        prodReviews.reviews.push(newReview);
      } else {
        productreviews.push({ ProductId: product.Id, reviews: [newReview] });
      }
      res.status(201).json({ message: "New review posted" });
    } else {
      res.status(400).json({ message: "Selected product is not available" });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

module.exports = router;
