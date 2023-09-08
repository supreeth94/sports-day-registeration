const express = require("express");
const { addUser, findUser, registerEvent, unRegisterEvent, userEvents } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/login", findUser);
userRouter.post("/:userid/register", registerEvent);
userRouter.post("/:userid/unregister", unRegisterEvent);
userRouter.get("/:userid/events", userEvents);

module.exports = userRouter;