import mongoose from 'mongoose';
import users from './users.server.model';
import products from './products.server.model';
import Reviews from './reviews.server.model';


var Schema = mongoose.Schema;
var bookingsSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    bookedby: { type: Schema.Types.ObjectId, ref: 'users' },
    producthost: { type: Schema.Types.ObjectId, ref: 'users' },
    productId: { type: Schema.Types.ObjectId, ref: 'Products' },
    traveller: { type: Schema.Types.ObjectId, ref: 'users' },
    hoster: { type: Schema.Types.ObjectId, ref: 'users' },
    bookingId: String,
    pricing: {
        baseprice: { type: Number, default: 0 },
        currency: { type: String, default: '$' },
        staydays: { type: Number, default: 1 },
        calculatedprice: { type: Number, default: 0 },
        serviceprice: { type: Number, default: 0 },
        cleaningprice: { type: Number, default: 0 },
        totalprice: { type: Number, default: 0 },
    },
    numberofguest: Number,
    hostapproval: { type: String, default: 'pending' },
    payment: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    refundtoGuest: { type: String, default: 'Not Eligible' }, 
    payouttoHost: { type: String, default: 'pending' }, 
    bookedfrom: Date,
    bookedto: Date,
    declinedAt: Date,
    updatedAt: Date,
    type: String,
    review: { type: Boolean, default: false }, 
    reviewId: { type: Schema.Types.ObjectId, ref: 'Reviews' }
    

});

export default mongoose.model('Bookings', bookingsSchema)