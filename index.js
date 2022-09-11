require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const usersRoute = require("./routes/users");
const cartRoute = require("./routes/cart");
const ordersRoute = require("./routes/orders");
const commentsRoute = require("./routes/comments");
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
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/user", usersRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/comments", commentsRoute);

// setting port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
