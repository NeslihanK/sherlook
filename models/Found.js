const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const foundSchema = new Schema({
  category: { type: String, required: true},
  foundItem: { type: String, required: true },
  location: { type: String},
  foundDate: { type: Date },
  image: { type: String},
  desc: { type: String},
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
  _user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

const Found = mongoose.model("Found", foundSchema);
module.exports = Found;