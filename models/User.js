const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
  _losts: [{type: Schema.Types.ObjectId, ref:'Lost'}],
  _founds: [{type: Schema.Types.ObjectId, ref:'Found'}],
  // email: {type: String, required: true},
  // mob_number: Number
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
