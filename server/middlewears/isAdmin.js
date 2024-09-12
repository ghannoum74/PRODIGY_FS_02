const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden: You do not have access" });
  }
  next();
};

module.exports = { isAdmin };
