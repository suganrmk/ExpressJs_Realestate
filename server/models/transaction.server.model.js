import mongoose from 'mongoose';
import users from './users.server.model';
import products from './products.server.model';

var Schema = mongoose.Schema;
var transactionSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    transactionMethod: String,
    transactionId: String,
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
    hostapproval: { type: String, default: 'pending' },
    payment: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    bookedfrom: Date,
    bookedto: Date,
    paymentfor: String

});

export default mongoose.model('transactions', transactionSchema)