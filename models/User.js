const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const emailRX = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/;
const passwordRX = /^(?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !@$ %^&* -]).{ 8, }$/;

const userSchema = new Schema({
    name:{type: String,require:true},
    email: { type: String, require: true, match: emailRX ,unique:true},
    phone: { type: String, require: true, unique: true },
    gender: { type: String, default: "" },
    age: { type: Number, require: true },
    password: { type: String, require: true, match: passwordRX }
}
, {collection: 'users'}
, {strict: true});

const Users = mongoose.model('User', userSchema);

module.exports = Users;