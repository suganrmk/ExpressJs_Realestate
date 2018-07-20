import mongoose from 'mongoose';
// import users from './users.server.model'
var Schema = mongoose.Schema;
var countrySchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    countrylist: Array
});

export default mongoose.model('Countries', countrySchema)