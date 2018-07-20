import mongoose from 'mongoose';
import users from './users.server.model'
var Schema = mongoose.Schema;
var messageSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    sendDate: {
        type: Date,
        default: Date.now
    },
    from: { type: Schema.Types.ObjectId, ref: 'users' },
    to: { type: Schema.Types.ObjectId, ref: 'users' },
    subject: { type: String, default: 'No Subject' },
    traveller: { type: Schema.Types.ObjectId, ref: 'users' },
    hoster: { type: Schema.Types.ObjectId, ref: 'users' },
    message: String,
    bookingId: String,
    bookingStatus: String,
    status: { type: String, default: 'unread' }
});

export default mongoose.model('Messages', messageSchema)