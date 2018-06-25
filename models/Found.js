const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const foundSchema = new Schema({
  foundItem: { type: String, required: true },
  imageURL: { type: String},
  location: { type: String},
  foundDate: { type: Date },
  desc: { type: String},
  _user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

const Found = mongoose.model("Found", foundSchema);
module.exports = Found;