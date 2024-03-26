// Importing the Models, modules and Packages here
const User = require("../models/User.js");

//Function to Update a User based on the Query ID
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Function to Delete a User based on the QUERY ID
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Function to Get a User based on the Query ID
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Function to fetch all the Users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Exporting all the Controllers functions
module.exports = { updateUser, getUser, getUsers, deleteUser };
