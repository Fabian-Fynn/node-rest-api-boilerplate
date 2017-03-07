import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.models = {};
mongoose.modelSchemas = {};

const userSchema = new Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
