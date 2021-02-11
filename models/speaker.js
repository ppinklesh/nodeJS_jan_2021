const mongoose = require("mongoose");
const speakerSchema = new mongoose.Schema({
  name: String,
  about: String,
  photo: {
    type: String,
    default: "default.jpg",
  },
});

const speaker = mongoose.model("speaker", speakerSchema);
module.exports = speaker;
