const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/EventController');

router.route("/createEvent/:clubId").post(eventController.createEvent)
router.route("/RegisterEvent").post(eventController.registerForEvent)
router.route("/deleteEvent/:id").delete(eventController.deleteEvent)
router.route("/updateEvent/:id").put(eventController.updateEvent)
router.route("/getevent").get(eventController.getEvent)
router.route("/getAllEvents/:clubId").get(eventController.getAllEvents)


module.exports = router;