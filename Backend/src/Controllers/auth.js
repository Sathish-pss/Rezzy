// Importing the necessary modules and files
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @returns Function to Register the Users
 */
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

/**
 * @returns Function to Login the user
 */
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect Password" });

    const jwtSecret = process.env.JWT; // Change process.env.JWT to process.env.JWT_SECRET
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, {
      expiresIn: "1h",
    });

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
