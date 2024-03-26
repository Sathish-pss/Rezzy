// Initializing the express server
const express = require("express");
const app = express();
const port = 3000;
// Initializing the cors
const cors = require("cors");
// Initializing the cookie parser
const cookieParser = require("cookie-parser");
// Initializing the file system here
const { dbConnect } = require("./config/db");
// Importing the dotenv file here
require("dotenv").config();
//Importing the Routes here
const authRoutes = require("./src/routes/auth");
const hotelRoutes = require("./src/routes/hotels");
const roomRoutes = require("./src/routes/rooms");
const userRoutes = require("./src/routes/users");
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
 * Defining the API Test Route here
 */
// Simple Get API for Testing
app.get("/test", (req, res) => {
  res.send("Server created Succesfully for the Rezzy APP");
});

/**
 * Defining the Routes here
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

// Starting the server and listening to the specified port
app.listen(port, () => {
  console.log(`Server listening at the ${port} successfully`);
});
