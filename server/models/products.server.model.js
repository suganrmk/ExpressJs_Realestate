import mongoose from 'mongoose';
import HomeSlider from './slider.server.model';
import users from './users.server.model';
import Cancellationpolicy from './policy.server.model';

var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    ProductType: { type: String, default: null },
    RoomType: { type: String, default: null },
    Accommodates: { type: Number, default: null },
    City: { type: String, default: null },
    fulladdress: { type: String, default: null },
    Rooms: {
        Bedrooms: { type: Number, default: null },
        Beds: { type: Number, default: null },
        Bathrooms: { type: Number, default: null }
    },
    Listing: {
        ProductType: { type: String, default: null },
        RoomType: { type: String, default: null },
        Accommodates: { type: Number, default: null },
    },
    Description: {
        Title: { type: String, default: null },
        Summary: { type: String, default: null }
    },
    extradetails: {
        otherdetail: { type: String, default: null },
        houserules: { type: String, default: null },
        spacedetail: { type: String, default: null },
        houseruleslist: { type: Array, default: null }
    },
    cancellation: {
        cancellationType: { type: Schema.Types.ObjectId, ref: 'Cancellationpolicy' },
        deposit: { type: Number, default: null }
    },
    Location: {
        coords: { type: [Number], index: '2d' , default: [0 , 0] },
        postal_code: { type: String, default: null },
        state: { type: String, default: null },
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
        city: { type: String, default: null },
        street: { type: String, default: null }, 
        street_number: { type: String, default: null },
        country: { type: String, default: null },
    },
    Amenities: {
        Common: { type: Array, default: null },
        Additional: { type: Array, default: null }
    },
    Photos: { type: Array, default: null },
    coverphoto:  { type: Object, default: null },
    Pricing: {
        Baseprice: { type: Number, default: 0 },
        Longtermprice: {
            Weekly: { type: Number, default: 0 },
            Montly: { type: Number, default: 0 }
        },
        Additionalprice: {
            cleaning: { type: Number, default: 0 },
        },
        currency: { type: String, default: 'EUR' }
    },
    UnavailabeDates:  { type: [Date], default: null } ,
    calendertype: { type: String, default: null },
    status: { type: String, default: 'Draft' },
    ProductRatingCount: { type: Number, default: 0 },
    ProductRating: { type: Number, default: 0 },
    slider: { type: Schema.Types.ObjectId, ref: 'HomeSlider' },
    host: { type: Schema.Types.ObjectId, ref: 'users' },
    payment: { type: String, default: 'pending' },
    published: { type: Boolean, default: false }
});

export default mongoose.model('Products', productSchema);