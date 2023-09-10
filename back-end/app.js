const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes")

// Configuring app with an instance of application instance
const app = express();

// Configuring the app instance to parse the incoming JSON data from HTTP requests
app.use(express.json());

// Configuring the app instance to respond to cross-origin requests
app.use(cors());

// Configuring the app instance with the /users router
app.use("/users", userRouter);

// Configuring the app instance with the /events router
app.use("/events", eventRouter);

// Connecting Mongoose to the remote mongoDb, on success start the app instance server to listen to requests
mongoose.connect(
    "mongodb+srv://supreeth94:Leospark94@cluster0.9fmbdjo.mongodb.net/?retryWrites=true&w=majority"
).then(() => app.listen(5050, () => console.log("Connected and listening on port 5050"))
).catch((err) => console.log(err));