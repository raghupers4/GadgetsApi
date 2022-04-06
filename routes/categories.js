const express = require("express");
const data = require("../data/data");

const router = express.Router();

const { categories } = data;
router.get("/", (req, res) => {
  try {
    const query = req.query;
    if (query && Object.keys(query).length > 0) {
      const filteredCategory = categories.filter(
        (cat) => cat.CategoryId === Number(query.Id)
      );
      if (filteredCategory.length > 0) {
        res.status(200).send(filteredCategory);
      } else {
        res.status(400).send("Resource not found");
      }
    } else {
      res.status(200).send(categories);
    }
  } catch (error) {
    res.status(400).send("Resource not found");
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const filteredCategory = categories.filter((cat) => cat.CategoryId === id);
    if (filteredCategory.length > 0) {
      res.status(200).send(filteredCategory);
    } else {
      res.status(400).send("Resource not found");
    }
  } catch (e) {
    res.status(400).send("Resource not found");
  }
});

module.exports = router;
