import mongoose from 'mongoose';
import users from './users.server.model'


var cardSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    billingaddress: {
        country: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zip: String
    },
    bankdetails: {
        firstname: String,
        lastname: String,
        routenumber: Number,
        expiryMonth: Number,
        expiryYear: Number,
        account: Number,
        ssn: Number
    },
    paypaldetail: {
        email: String,
        currency: String
    },
    method: String,
    default: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Cards', cardSchema)