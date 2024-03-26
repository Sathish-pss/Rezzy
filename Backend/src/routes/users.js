// Importing the Packages, Modules here
const express = require("express");
const router = express.Router();
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../middleware/verifyToken.js");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../Controllers/user.js");
// Defining the HTTP Routes for the Users here
//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
