const User = require("../model/User");

const addUser = async(req, res, next) => {
    const {first_name, last_name, email} = req.body;
    if (!first_name && first_name.trim() === "" &&
        !last_name && last_name.trim() === "" &&
        !email && email.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }
    let user;
    try {
        user = new User({
            first_name, last_name, email
        })
        user = await user.save();
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate username
            return res.status(422).send({ success: false, message: 'User already exists!' });
          }
        return next(err);
    }
    if(!user) {
        return res.status(500).json({message: "Unable to save user"});
    }
    return res.status(201).json(user);
};

const findUser = async(req, res, next) => {
    const {email} = req.body;
    if (!email && email.trim() === "") {
        return res.status(422).json({message: "Invalid Data"});
    }
    let user;
    try {
        user = await User.findOne({email});
    } catch (err) {
        return next(err);
    }
    if(!user) {
        return res.status(404).json({message: "User does not exist"});
    }
    return res.status(200).json(user);
};

const registerEvent = async(req, res, next) => {
    const{event_id} = req.body;
    const user_id = req.params.userid;
    if (!event_id && event_id.trim() === "") {
        return res.status(422).json({message: "Invalid Event Id"});
    }
    let user;
    try {
        user = await User.findByIdAndUpdate(user_id, {$push : {registered_events: event_id}});
    } catch (err) {
        return next(err);
    }
    if(!user) {
        return res.status(403).json({message: "Invalid User Id"});
    }
    return res.status(200).json({message: "Successfully registered to the event"});
}

const unRegisterEvent = async(req, res, next) => {
    const{event_id} = req.body;
    const user_id = req.params.userid;
    if (!event_id && event_id.trim() === "") {
        return res.status(422).json({message: "Invalid Event Id"});
    }
    let user;
    try {
        user = await User.findByIdAndUpdate(user_id, {$pull : {registered_events: event_id}});
    } catch (err) {
        return next(err);
    }
    if(!user) {
        return res.status(403).json({message: "Invalid User Id"});
    }
    return res.status(200).json({message: "Successfully unregistered to the event"});
}

const userEvents = async(req, res, next) => {
    const user_id = req.params.userid;
    let user;
    try {
        user = await User.findById(user_id);
    } catch (err) {
        return next(err);
    }
    if(!user) {
        return res.status(403).json({message: "Invalid User Id"});
    }
    user = user.registered_events;
    return res.status(200).json(user);
}

exports.addUser = addUser;
exports.findUser = findUser;
exports.registerEvent = registerEvent;
exports.unRegisterEvent = unRegisterEvent;
exports.userEvents = userEvents;