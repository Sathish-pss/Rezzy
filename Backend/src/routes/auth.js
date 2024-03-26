// Importing the Modules, Packages here
const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/auth.js");

// Defining the Express routes for the End Points here

router.post("/register", register);
router.post("/login", login);

// Exporting the Modules
module.exports = router;
