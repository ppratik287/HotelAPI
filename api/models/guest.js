const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   address: {
      type:String,
      required: true
   },
   rooms: {
      type: Number,
      required: true
   },
   cost: {
      type: Number,
      required: true
   },
   max_guests: {
      type: Number,
      required: true
   },
   pool: String,
   laundry: String,
   cab_service: String
});

module.exports = mongoose.model("Guest", guestSchema);