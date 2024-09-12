const jwt = require("jsonwebtoken");

const isUserAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json("Unauthenticated user!");
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json("Token required!");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = decoded;
    next();
  });
};
module.exports = { isUserAuthenticated };
