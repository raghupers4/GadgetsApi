require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let header;
  let accessToken;
  if (req.headers && req.headers["authorization"]) {
    header = req.headers["authorization"];
    accessToken = header && header.split(" ")[1];
  } else {
    accessToken = req.headers["x-access-token"];
  }
  if (!accessToken) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Res email: " + user?.email);
    console.log("Res id: " + user?.user_id);
    req.user = user;
    next();
  });
}

module.exports = { verifyToken };
