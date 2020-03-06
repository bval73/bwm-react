const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    endAt: { type: Date, required: 'Ending date is required' },
    startAt: { type: Date, required: 'Starting date is required' },
    totalPrice: { type: Number },
    days: { type: Number },
    guests: { type: Number },
    createdAt: { type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rental: {type: Schema.Types.ObjectId, ref: 'Rental'},
    payment: { type: Schema.Types.ObjectId, ref: 'Payment'},
    status: { type: String, default: 'pending'}, //can be pending, declined and accepting
    review: { type: Schema.Types.ObjectId, ref: 'Review'},
  });

module.exports = mongoose.model('Booking', bookingSchema);
