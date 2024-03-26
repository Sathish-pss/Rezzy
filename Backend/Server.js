// Initializing the express server
const express = require("express");
const app = express();
const port = 3000;
// Initializing the cors
const cors = require("cors");
// Initializing the mongoose ODM here
const mongoose = require("mongoose");
// Initializing the JWT here
const jwt = require("jsonwebtoken");

// Initializing the cookie parser
const cookieParser = require("cookie-parser");

// Initializing the file system here
const fs = require("fs");

const { dbConnect } = require("./config/db");

// Importing the dotenv file here
require("dotenv").config();
//Function to call the Database connection
dbConnect();

/**
 * App Using the Built in Packages
 */
// Enabling the cors
app.use(cors());

// Using Express.json to get the input from the client
app.use(express.json());
app.use(cookieParser());

/**
 * Defining the API Routes here
 */
// Simple Get API for Testing
app.get("/test", (req, res) => {
  res.send("Server created Succesfully for the Rezzy APP");
});

// Starting the server and listening to the specified port
app.listen(port, () => {
  console.log(`Server listening at the ${port} successfully`);
});
