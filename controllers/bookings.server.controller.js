// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';
//import models
// import Products from '../models/products.server.model';
import Bookings from '../models/bookings.server.model';
import transactions from '../models/transaction.server.model';

// const accountSid = 'AC9b99748994ecab9cca1c7265744aa90d';
// const authToken = '13d827b84699da4884d9c190267f4d1d';
// const client = require('twilio')(accountSid, authToken);

export const previoustrips = (req, res) => {

    var searcReq = req.body;
    var now = new Date();
    var searchInput = {
        bookedby: searcReq.host,
        bookedfrom: { $lte: now }
    };
    console.log(searchInput)
    Bookings.find(searchInput, res.body).lean().
    populate('bookedby', '_id common.firstName common.lastName').
    populate('producthost', '_id common.firstName common.lastName common.photoUrl').
    populate({
        path: 'productId',
        select: 'createdAt host Description.Title',
        populate: { path: 'host', select: 'common.firstName' }
    }).exec(function(err, trips) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', trips });
        // prints "The author is Ian Fleming"
    });
}


export const currenttrips = (req, res) => {
    var searcReq = req.body;
    var now = new Date();
    var searchInput = {
        bookedby: searcReq.host,
        bookedfrom: { $gt: now }
    };
    console.log(searchInput)
    Bookings.find(searchInput, res.body).lean().
    populate('bookedby', '_id common.firstName common.lastName').
    populate('producthost', '_id common.firstName common.lastName common.photoUrl').
    populate({
        path: 'productId',
        select: 'createdAt host Description.Title Location',
        populate: { path: 'host', select: 'common.firstName' }
    }).exec(function(err, trips) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', trips });
        // prints "The author is Ian Fleming"
    });
}



export const userreservation = (req, res) => {

    var searcReq = req.body;
    var searchInput = {
        producthost: searcReq.host
    };
    Bookings.find(searchInput, res.body).lean().
    populate('producthost', '_id common.firstName common.lastName common.photoUrl').
    populate('bookedby', '_id common.firstName common.lastName common.photoUrl').
    populate({
        path: 'productId',
        select: 'createdAt host Description.Title',
        populate: { path: 'host', select: 'username _id' }
    }).exec(function(err, trips) {
        if (err) return handleError(err);
        else {
            // trips = trips.filter(function(pro) {
            //     return pro.productId.host._id == searcReq.host;
            // })
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', trips });
        }
    });
}



export const updateuserreservation = (req, res) => {
    console.log(req.body)
    Bookings.findOneAndUpdate({ bookingId: req.body.bookingId }, req.body, { new: true }, (err, booking) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(booking);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', booking });
    })
}

export const addreservation = (req, res) => {
    console.log(req.body);
    const newBookings = new Bookings(req.body);
    newBookings.save((err, bookings) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', bookings });
    })
}

//------------- ----------   completedtransaction

export const savetransaction = (req, res) => {
    var searcReq = req.body;
    searcReq.payment = 'completed';

    const newtransactions = new transactions(searcReq);
    newtransactions.save((err, transactions) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error Found' });
        } else {
            Bookings.findOneAndUpdate({ _id: searcReq._id }, searcReq, { new: true }, (err, booking) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                }
                return res.json({ 'success': true, 'message': 'Products Updated Successfully', booking });
            })
        }

    });
}



export const completedtransaction = (req, res) => {
    var searcReq = req.body;
    console.log(searcReq)

    transactions.find({ bookedby: searcReq.host }, 'transactionMethod transactionId createdAt pricing', { new: true }, (err, transaction) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', transaction });
    })
}


export const futuretransaction = (req, res) => {
    var searcReq = req.body;
    var searchInput = {
        bookedby: searcReq.host,
        payment: 'pending'
    };
    console.log(searchInput)
    Bookings.find(searchInput, 'price createdAt bookingId productId bookedfrom bookedto').lean().populate({
        path: 'productId',
        select: 'createdAt host Description.Title',
        populate: { path: 'host', select: 'username' }
    }).exec(function(err, trips) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', trips });
    });
}


// get booking by id




export const getbooking = (req, res) => {
    var searcReq = req.body;
    var searchInput = { bookingId: req.params.id }
    console.log(searchInput)
    Bookings.find(searchInput).lean().populate({
        path: 'productId',
        select: 'createdAt host Description.Title Pricing Location Photos RoomType',
        populate: { path: 'host', select: 'username' }
    }).populate('traveller', 'common').populate('producthost', 'common').exec(function(err, bookings) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', bookings });
    });
}



export const getallReservations = (req, res) => {
    var searcReq = req.body;
    Bookings.find().lean().populate({
        path: 'productId',
        select: 'createdAt host Description.Title Pricing Location Photos RoomType cancellation',
        populate: { path: 'host', select: 'username' },
        populate: { path: 'cancellation.cancellationType' },
        
    }).populate('traveller', 'common').populate('producthost', 'common').exec(function(err, bookings) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', bookings });
    });
}

// export const getProducts = (req, res) => {
//     Products.find().exec((err, products) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error in products' });
//         }
//         return res.json({ 'success': true, 'message': 'products fetched successfully', products });
//     });
// }

// export const searchProducts = (req, res) => {
//     var searcReq = req.body;
//     var searchInput = {};
//     const outputVal = 'ProductType RoomType Photos.filename Rooms.Beds Description.Title Pricing.Baseprice Location.lat Location.lng';

//     for (var key in req.body) { //could also be req.query and req.params
//         req.body[key] !== "" ? searchInput[key] = req.body[key] : null;
//     }

//     console.log(searchInput)
//     Products.find(searchInput, outputVal, function(err, product) {
//         console.log('%s %s is a %s.', product);
//         if (err) return handleError(err);
//         else
//             return res.json({ 'success': true, 'message': 'Products fetched by id successfully', product });
//     });
// }



// export const addProducts = (req, res) => {
//     console.log(req.body);
//     const newProducts = new Products(req.body);
//     newProducts.save((err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error tod' });
//         }
//         return res.json({ 'success': true, 'message': 'Products added successfully', product });
//     })
// }

// export const updateProducts = (req, res) => {
//     console.log(req.body)
//     Products.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
//         }
//         console.log(product);
//         return res.json({ 'success': true, 'message': 'Products Updated Successfully', product });
//     })
// }

// export const getProduct = (req, res) => {
//     console.log(req.params.id)

//     Products.find({ _id: req.params.id }).populate('host').exec((err, product) => {
//         console.log('product', product)
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Errord' });
//         }
//         if (product.length) {
//             return res.json({ 'success': true, 'message': 'Products fetched by id successfully', product });
//         } else {
//             return res.json({ 'success': false, 'message': 'Products with the given id not found' });
//         }
//     })
// }

// export const deleteProducts = (req, res) => {
//     Products.findByIdAndRemove(req.params.id, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }
//         return res.json({ 'success': true, 'message': 'Products Deleted Successfully', product });
//     })
// }