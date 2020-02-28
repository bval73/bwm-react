const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    fromUser: {type: Schema.Types.ObjectId, ref: 'User'}, //person paying 
    fromStripeCustomerId: String,
    toUser: {type: Schema.Types.ObjectId, ref: 'User'}, // rental owner getting the money
    booking: {type: Schema.Types.ObjectId, ref: 'Booking'}, //just need the booking
    amount: Number,
    tokenId: String,
    charge: Schema.Types.Mixed, // don't know what it's going to be so could be string number or all types
    status: { type: String, default: 'pending'} //can be pending, declined and accepting
});

module.exports = mongoose.model('Payment', paymentSchema);