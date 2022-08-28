const express = require("express");
const Category = require("../models/Category");
const {
  SUCCESS_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../constants/statuscodes");
const data = require("../data/data");

const router = express.Router();

// const { categories } = data;
router.get("/", async (req, res) => {
  try {
    const query = req.query;
    let categories;
    if (query && Object.keys(query).length > 0) {
      categories = await Category.find(query);
    } else {
      categories = await Category.find();
    }
    if (categories) {
      res.status(SUCCESS_STATUS_CODE).json(categories);
    } else {
      res.status(SUCCESS_STATUS_CODE).json([]);
    }
    // if (query && Object.keys(query).length > 0) {
    //   const filteredCategory = categories.filter(
    //     (cat) => cat.CategoryId === Number(query.Id)
    //   );
    //   if (filteredCategory.length > 0) {
    //     res.status(200).send(filteredCategory);
    //   } else {
    //     res.status(400).send("Resource not found");
    //   }
    // } else {
    //   res.status(200).send(categories);
    // }
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(SUCCESS_STATUS_CODE).json(category);
    } else {
      res.status(SUCCESS_STATUS_CODE).json({});
    }
  } catch (e) {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .json({ error: error?.message });
  }
});

module.exports = router;
