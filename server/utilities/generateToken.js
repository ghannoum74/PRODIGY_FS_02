const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = generateToken;
