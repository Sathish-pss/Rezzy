// Importing the necessary modules
const jwt = require("jsonwebtoken");
const createError = require("../middleware/error.js");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Function to verify the Token
 */
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Function to return the Verify user
 */
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Function to verify the user is Admin
 */
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyUser };
