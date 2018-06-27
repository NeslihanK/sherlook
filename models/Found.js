const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const foundSchema = new Schema({
  category: { type: String, required: true},
  foundItem: { type: String, required: true },
  location: { type: String},
  foundDate: { type: Date },
  imageURL: { type: String},
  desc: { type: String},
  _user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

const Found = mongoose.model("Found", foundSchema);
module.exports = Found;