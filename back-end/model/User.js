const mongoose = require("mongoose");
const Event = require("./Event");
const Schema = mongoose.Schema;


const userSchema = new Schema( {

    // First name of the user
    first_name : {
        type: String,
        required: true
    },

    // Last name of the user
    last_name : {
        type: String,
        required: true
    },

    // Email id of the user
    email: {
        type: String,
        required: true,
        unique: true
    },

    // List of the Object Ids of the events the user has registered to
    registered_events: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
}, {
    
    // Configuring not to save the version key in the DB
    versionKey: false,

    // Configuring to not persist the document properties in DB
    virtuals: true,

    // Configuring to save the generated _id for the document as user_id
    toJSON: { 
        transform: function(doc, ret) {
          ret.user_id = ret._id;
          delete ret._id;
        }
      }
});

module.exports =  mongoose.model("User", userSchema);