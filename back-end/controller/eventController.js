const Event = require("../model/Event");


const addEvent = async(req, res, next) => {
    const {event_name, event_category, start_time, end_time} = req.body;
    if (!event_name && event_name.trim() === "" &&
        !event_category && event_category.trim() === "" &&
        !start_time && start_time.trim() === "" &&
        !end_time && end_time.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }
    let event;
    try {
        event = new Event({
            event_name, event_category, start_time, end_time
        })
        event = await event.save();
    } catch (err) {
        if (err.code === 11000) {
            console.log(err);
            // Duplicate event
            return res.status(422).send({ success: false, message: 'Event already exists!' });
          }
        return next(err);
    }
    if(!event) {
        return res.status(500).json({message: "Unable to save event"});
    }
    return res.status(201).json(event);
};

const getAllEvents = async(req, res, next) => {
    let events;
    try{
        events = await Event.find();
    } catch (err) {
        return next(err);
    }
    if(!events) {
        return res.status(500).json({message: "Internal server error"});
    }
    return res.status(200).json([events]);
}

exports.addEvent = addEvent;
exports.getAllEvents = getAllEvents;