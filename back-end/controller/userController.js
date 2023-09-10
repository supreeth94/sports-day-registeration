const User = require("../model/User");

const addUser = async(req, res) => {
    // Retrieve user deatils from request
    const {first_name, last_name, email} = req.body;

    // Return 422 if the details are invalid
    if (!first_name || first_name.trim() === "" ||
        !last_name || last_name.trim() === "" ||
        !email || email.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }
    let user;

    try {
        // Create new user detail
        user = new User({
            first_name, last_name, email
        })

        // Save the details on DB
        user = await user.save();
    } catch (err) {
        // DB operation return error code 11000 if the user details already exist
        if (err.code === 11000) {
            // Return 403 as the user already exists
            return res.status(403).send({ success: false, message: 'User already exists!' });
          }
          console.log(err);

          // Return 500 for any other error
          return res.status(500).json({message: "Internal server error"});
    }

    // Return 201 if the DB operation has no errors
    return res.status(201).json(user);
};


const findUser = async(req, res) => {
    // Retrive user details from the request
    const {email} = req.body;

    // Return 422 if the details are invalid
    if (!email || email.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }
    let user;

    // Find the user details on the DB
    try {
        user = await User.findOne({email});
    } catch (err) {
        // Catch the error
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

    // Return 404 if the user details cannot be retrieved from the DB
    if(!user) {
        return res.status(404).json({message: "User does not exist"});
    }

    // Return 200 if the user details were be retrieved from the DB
    return res.status(200).json(user);
};


const registerEvent = async(req, res) => {
    // Retrive event id from the request
    const{event_id} = req.body;

    // Retrive user from the pramas
    const user_id = req.params.userid;

    // Return 422 if the details are invalid
    if (!event_id || event_id.trim() === "") {
        return res.status(422).json({message: "Invalid Event Id"});
    }

    let user;
    try {
        // Find the user details on the DB
        user = await User.findById(user_id);

        // Retrieve the user registered events
        let registeredEvents = user.registered_events;

        // Check if the user has already registered to more than the limit
        if(registeredEvents.length > 2) {
            // Return 403 if yes
            return res.status(403).json({message: "User has reached the limit of registerations"})
            
            // Check if the event intended for registeration already exist in the list of registered events
        }else if(registeredEvents.includes(event_id)) {

            // Return 409 if yes
            return res.status(409).json({message: "User has already registered to this event"})
        } else {

            // If the above conditions are not then update the list of registered events with the provided event id
            user = await User.findByIdAndUpdate(user_id, {$push : {registered_events: event_id}});
        }
    } catch (err) {
        // Catch the error
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

    // Return 404 if the user details cannot be fetched.
    if(!user) {
        return res.status(404).json({message: "User does not exist"});
    }

    // Return 200 if the list of registered events was updated with the provided event id
    return res.status(200).json({message: "Successfully registered to the event"});
}


const unRegisterEvent = async(req, res) => {
    // Retrive event id from the request
    const{event_id} = req.body;

    // Retrive user from the pramas
    const user_id = req.params.userid;

    // Return 422 if the details are invalid
    if (!event_id || event_id.trim() === "") {
        return res.status(422).json({message: "Invalid Event Id"});
    }
    let user;

    try {
        // Find the user details on the DB
        user = await User.findById(user_id);

        // Retrieve the user registered events
        let registeredEvents = user.registered_events;

        // Check if the event intended for unregisteration already exists in the list of registered events
        if(registeredEvents.includes(event_id)) {
            // If yes, remove the event id from the list of registered events
            user = await User.findByIdAndUpdate(user_id, {$pull : {registered_events: event_id}});
        } else {
            // Return 404 if no
            return res.status(404).json({message: "Event not registered or does not exist"})
        }
    } catch (err) {
        // Catch the error
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

    // Return 404 if the user details cannot be fetched.
    if(!user) {
        return res.status(404).json({message: "Invalid User Id or Event Id"});
    }

    // Return 200 if the list of registered events was updated by the removal of provided event id
    return res.status(200).json({message: "Successfully unregistered to the event"});
}


const userEvents = async(req, res, next) => {
    // Retrieve user id from params
    const user_id = req.params.userid;

    // Return 422 if the details are invalid
    if (!user_id || user_id.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }

    let user;

    // Retrieve the user with the given user_id from the database
    try {
        user = await User.findById(user_id);
    } catch (err) {
        // catch the error
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }

    // If no user is found with the given user_id, return a 404 status code and an error message
    if(!user) {
        return res.status(404).json({message: "User not found"});
    }

    // Retrieve the registered events for the user
    let registeredEvents = user.registered_events;

    // Return a 200 status code and the user's registered events
    return res.status(200).json(registeredEvents);
}

exports.addUser = addUser;
exports.findUser = findUser;
exports.registerEvent = registerEvent;
exports.unRegisterEvent = unRegisterEvent;
exports.userEvents = userEvents;