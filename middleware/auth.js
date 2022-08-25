require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  SUCCESS_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
} = require("../constants/statuscodes");

function verifyToken(req, res, next) {
  let header;
  let accessToken;
  if (req.headers) {
    header = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["x-access-token"];
    accessToken = header && header.split(" ")[1];
  }
  if (!accessToken) {
    return res
      .status(FORBIDDEN_STATUS_CODE)
      .json({ message: "Token is required" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { verifyToken };
