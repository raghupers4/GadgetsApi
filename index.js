const express = require("express");
const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");

const app = express();
app.use(express.json());

// sepcifying the routes
app.use("/categories", categoriesRoute);
app.use("/products", productsRoute);

// setting port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
