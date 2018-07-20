import mongoose from 'mongoose';
// import users from './users.server.model'
var Schema = mongoose.Schema;
var currencySchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    base: String,
    date: String,
    timestamp: String,
    rates: Object
});

export default mongoose.model('Currencies', currencySchema)