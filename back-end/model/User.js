const mongoose = require("mongoose");
const Event = require("./Event");
const Schema = mongoose.Schema;


const userSchema = new Schema( {
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registered_events: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
}, {
    versionKey: false,
    virtuals: true,
    toJSON: { 
        transform: function(doc, ret) {
          ret.user_id = ret._id;
          delete ret._id;
        }
      }
});

module.exports =  mongoose.model("User", userSchema);