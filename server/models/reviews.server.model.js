import mongoose from 'mongoose';
import users from './users.server.model'
import products from './products.server.model';
var Schema = mongoose.Schema;

var reviewSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    Reviewby: { type: Schema.Types.ObjectId, ref: 'users' },
    host: { type: Schema.Types.ObjectId, ref: 'users' },
    productid: { type: Schema.Types.ObjectId, ref: 'products' },
    bookingid: String,
    productcomment: String,
    productrating: { type: Number, default: 0 },
    usercomment: String,
    productaccuracy: { type: Number, default: 0 },
    productlocation: { type: Number, default: 0 },
    productcommunication: { type: Number, default: 0 },
    productcheckin: { type: Number, default: 0 },
    productcleanliness: { type: Number, default: 0 },
    productvalue: { type: Number, default: 0 }
});

export default mongoose.model('Reviews', reviewSchema)