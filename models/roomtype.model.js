import mongoose from 'mongoose';


var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    status: String
});

export default mongoose.model('roomType', Schema)