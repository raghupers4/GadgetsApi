const express = require("express");
const data = require("../data/data");
const router = express.Router();

const { products } = data;

// comment added
router.get("/", (req, res) => {
  try {
    const query = req.query;
    if (query && Object.keys(query).length > 0) {
      let filteredProducts = [...products];
      for (let key in query) {
        filteredProducts = filteredProducts.filter((prod) => {
          if (
            typeof prod[key] === "string" &&
            prod[key]?.toLowerCase() === query[key].toLowerCase()
          ) {
            return true;
          } else if (
            typeof prod[key] === "number" &&
            prod[key] === Number(query[key])
          ) {
            return true;
          } else if (
            typeof prod[key] === "boolean" &&
            !isNaN(query[key]) &&
            (Number(query[key]) === 0 || Number(query[key]) === 1) &&
            prod[key] === Boolean(Number(query[key]))
          ) {
            return true;
          }

          return false;
        });
      }
      if (filteredProducts.length > 0) {
        res.status(200).send(filteredProducts);
      } else {
        returnError(res);
      }
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    res.status(400).send("Resource not found");
  }
});

const buildFilterQuery = (queryObj) => {
  let filterQuery = {};
  for (let prop in queryObj) {
    if (queryObj[prop] !== undefined) {
      const propType = typeof prop;
      filterQuery["type"] = propType;
      filterQuery[prop] = queryObj[prop];
    }
  }
  return filterQuery;
};

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const filteredProducts = products.filter((prod) => prod.Id === id);
  if (filteredProducts.length > 0) {
    res.status(200).send(filteredProducts);
  } else {
    returnError(res);
  }
});

const returnError = (res) => res.status(400).send("Resoure not found");

module.exports = router;
