const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The event must have title"],
    trim: true,
  },
  link: {
    type: String,
    required: [true, "link should be there"],
    trim: true,
  },
  eventDate: Date,
  eventTime: {
    start: String,
    end: String,
  },
  eventDesc: {
    type: String,
    required: [true, "Event description should be there"],
    trim: true,
  },
  speaker: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "speaker",
    },
  ],
  moderator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "moderator",
    },
  ],
  unstructure: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unstructure",
    },
  ],
});
eventSchema.path("link").validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

const event = mongoose.model("event", eventSchema);
module.exports = event;
