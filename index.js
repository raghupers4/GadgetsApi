require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const reviewsRoute = require("./routes/reviews");
const app = express();

// to parse the JSON sent through POST requests from the client
app.use(express.json());

mongoose.connect(process.env.DATABASE_SERVER_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connection established"));

// sepcifying the routes
app.use("/categories", categoriesRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/reviews", reviewsRoute);

// setting port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
