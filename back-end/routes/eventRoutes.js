const express = require("express");
const { addEvent, getAllEvents } = require("../controller/eventController");


const eventRouter = express.Router();

eventRouter.post("/add", addEvent);
eventRouter.get("/", getAllEvents);

module.exports = eventRouter;