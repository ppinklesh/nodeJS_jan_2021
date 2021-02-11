const mongoose = require("mongoose");
const moderatorSchema = new mongoose.Schema({
  name: String,
  about: String,
  photo: {
    type: String,
    default: "default.jpg",
  },
});

const moderator = mongoose.model("moderator", moderatorSchema);
module.exports = moderator;
