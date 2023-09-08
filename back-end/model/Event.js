const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const eventSchema = new Schema( {
    event_name : {
        type: String,
        required: true,
        unique: true
    },
    event_category : {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    virtuals: true,
    toJSON: { 
        transform: function(doc, ret) {
          ret.event_id = ret._id;
          delete ret._id;
        }
      }
});

module.exports =  mongoose.model("Event", eventSchema);