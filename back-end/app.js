const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes")

app.use(express.json());
app.use("/users", userRouter);
app.use("/events", eventRouter);

mongoose.connect(
    "mongodb+srv://supreeth94:Leospark94@cluster0.9fmbdjo.mongodb.net/?retryWrites=true&w=majority"
).then(() => app.listen(5050, () => console.log("Connected and listening on port 5050"))
).catch((err) => console.log(err));