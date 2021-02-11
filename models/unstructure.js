const mongoose = require("mongoose");
const unstructureSchema = new mongoose.Schema({
  any: [mongoose.Schema.Types.Mixed],
});

any.markModified("unstructure");
const unstructure = mongoose.model("unstructure", unstructureSchema);
module.exports = unstructure;
