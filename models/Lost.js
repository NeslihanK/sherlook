const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const lostSchema = new Schema({
  category: { type: String, required: true},
  lostItem: { type: String, required: true },
  imageURL: { type: String},
  location: { type: String},
  lostDate: { type: Date },
  desc: { type: String},
  reward: { type: String},
  _user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

const Lost = mongoose.model("Lost", lostSchema);
module.exports = Lost;