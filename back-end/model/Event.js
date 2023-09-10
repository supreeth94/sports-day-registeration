const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const eventSchema = new Schema( {
    
    // Name of the event
    event_name : {
        type: String,
        required: true,
        unique: true
    },

    // Category of the event
    event_category : {
        type: String,
        required: true
    },

    // Start time of the event
    start_time: {
        type: String,
        required: true,
    },

    // End time of the event
    end_time: {
        type: String,
        required: true,
    }
}, {

    // Configuring not to save the version key in the DB
    versionKey: false,

    // Configuring to not persist the document properties in DB
    virtuals: true,

    // Configuring to save the generated _id for the document as event_id
    toJSON: { 
        transform: function(doc, ret) {
          ret.event_id = ret._id;
          delete ret._id;
        }
      }
});

module.exports =  mongoose.model("Event", eventSchema);