const express = require("express");
const { getAllEvents } = require("../controller/eventController");


const eventRouter = express.Router();

// API route to fetch all the events
eventRouter.get("/", getAllEvents);

module.exports = eventRouter;