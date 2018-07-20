import mongoose from 'mongoose';
import users from './users.server.model'


var mobiletokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    mobiletoken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});



export default mongoose.model('MobileTokens', mobiletokenSchema)