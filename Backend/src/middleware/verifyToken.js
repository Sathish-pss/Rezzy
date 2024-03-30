// Importing the necessary modules
const jwt = require("jsonwebtoken");

/**
 * @returns Function to verify the Token
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("You are not authenticated");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    req.user = user;
    next();
  });
};
/**
 * @returns Function to return the Verify user
 */
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not a authorized user");
    }
  });
};
/**
 * @returns Function to verify the user is Admin
 */
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not a authorized Admin");
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyUser };
