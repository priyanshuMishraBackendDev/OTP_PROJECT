const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, require: true }
}
, {collection: 'userToken'}
, {strict: true});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken