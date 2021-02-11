const express = require("express");
const eventController = require("./../controller/eventController");

const router = express.Router();

// event route
router.get("/", eventController.getAllEvent);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

// speaker route

module.exports = router;
