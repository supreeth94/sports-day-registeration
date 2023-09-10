const Event = require("../model/Event");

const getAllEvents = async(req, res) => {
    let events;

    // Retrieve all events from the DB
    try{
        events = await Event.find();
    } catch (err) {
        console.log(err);
    }

    // Return 500 if retrieval of events is erraneous
    if(!events) {
        return res.status(500).json({message: "Internal server error"});
    }

    // Return 200 along with the list of events
    return res.status(200).json(events);
}

exports.getAllEvents = getAllEvents;