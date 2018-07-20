import mongoose from 'mongoose';
import users from './users.server.model'


var tokenSchema = mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model('Token', tokenSchema)