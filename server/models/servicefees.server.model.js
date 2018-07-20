import mongoose from 'mongoose';

var servicefeesSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    guestfeetype: String,
    guestservicefee: String,
    hostfeetype: String,
    hostservicefee: String,
    currency: String,
    updatedAt: {
        type: Date,
        default: Date.now
    },
    appid: {
        type: String,
        default: 'admin01'
    }
});

export default mongoose.model('servicefees', servicefeesSchema)