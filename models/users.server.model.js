import mongoose from 'mongoose';
import Products from './products.server.model'
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,

    hash: String,
    token: String,

    notification: {
        emailnotify: Array,
        mobilenotify: {
            mobilealert: String,
            notifywhen: Array
        }
    },
    common: {
        email: String,
        firstName: String,
        lastName: String,
        birthday: {
            day: { type: String, default: null },
            month: { type: String, default: null },
            year: { type: String, default: null }
        },
        gender: String,
        Email: String,
        dateofbirth: Object,
        country: String,
        mobile: String,
        description: String,
        liveplace: String,
        photoUrl: { type: String, default: 'https://www.atomix.com.au/media/2015/06/atomix_user31.png' },
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    local: {
        email: String,
        firstName: String,
        lastName: String,
        hash: String,
        birthday: {
            day: String,
            month: String,
            year: String
        }
    },
    verfication: {
        google: { type: Boolean, default: false },
        email: { type: Boolean, default: false },
        facebook: { type: Boolean, default: false },
        mobile: { type: Boolean, default: false }
    },
    isVerified: { type: Boolean, default: false },
    cart: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
});

userSchema.plugin(findOrCreate);
export default mongoose.model('users', userSchema)