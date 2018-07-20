import mongoose from 'mongoose';
import users from './users.server.model'


var cancellationpolicySchema = mongoose.Schema({
    title: String,
    type: String,
    details: Array,
    fullRefund: Number,
    halfRefund: Number,    
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Cancellationpolicy', cancellationpolicySchema)