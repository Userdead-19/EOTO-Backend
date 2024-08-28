const express = require("express");
const eventController = require("../Controller/EventController");

const router = express.Router();

// Route to create a new event
router.post("/", eventController.createEvent);

// Route to get an event by ID
router.get("/:id", eventController.getEventById);

// Route to get all events
router.get("/", eventController.getAllEvents);

// Route to update an event by ID
router.put("/:id", eventController.updateEventById);

// Route to delete an event by ID
router.delete("/:id", eventController.deleteEventById);

// Route to add an attendee to an event
router.post("/:id/add-attendee", eventController.addAttendeeToEvent);

// Route to remove an attendee from an event
router.post("/:id/remove-attendee", eventController.removeAttendeeFromEvent);

module.exports = router;
