import mongoose from 'mongoose';
import users from './users.server.model';
import Products from './products.server.model';

var Schema = mongoose.Schema;
var wishlistSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    productlist: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
    wishlistUser: { type: Schema.Types.ObjectId, ref: 'users' },
    wishlistName: String,
    privacy: { type: Number, default: 1 }
});

export default mongoose.model('Wishlists', wishlistSchema)