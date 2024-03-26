// Importing the Modules, Packages here
const express = require("express");
const router = express.Router();
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../Controllers/room.js");
const { verifyAdmin } = require("../middleware/verifyToken.js");

// Defining the HTTP Routes for the Room Controller Functions

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

module.exports = router;
