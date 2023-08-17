const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AfterOneHour = () => {
    const now = Date.now();
    return new Date(now + 1000 * 60 * 60 * 2);
  };

const tokenSchema = new Schema({
    // userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    expiresAt: {type: Date, default: AfterOneHour},
    expired: {type: Boolean, default: false},
    token:{type:Number, require:true}
}
, {collection: 'token'}
, {strict: true});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token