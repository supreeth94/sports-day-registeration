const express = require("express");
const { addUser, findUser, registerEvent, unRegisterEvent, userEvents } = require("../controller/userController");

const userRouter = express.Router();

// API route to add or register a new user
userRouter.post("/signup", addUser);

// API route validate user details exist or registered
userRouter.post("/login", findUser);

// API route for an user to register to an event
userRouter.post("/:userid/register", registerEvent);

// API route for an user to unregister from an event
userRouter.post("/:userid/unregister", unRegisterEvent);

// API route to fetch the list of events the user has registered
userRouter.get("/:userid/events", userEvents);

module.exports = userRouter;