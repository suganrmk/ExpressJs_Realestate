// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import Reviews from '../models/reviews.server.model';


export const addReviews = (req, res) => {
    console.log(req.body);
    const newReviews = new Reviews(req.body);
    newReviews.save((err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', product });
    })
}

// export const getReviews = (req, res) => {
//     Reviews.find().exec((err, products) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error in products' });
//         }
//         return res.json({ 'success': true, 'message': 'products fetched successfully', products });
//     });
// }


// export const addReviews = (req, res) => {
//     console.log(req.body);
//     const newReviews = new Reviews(req.body);
//     newReviews.save((err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error tod' });
//         }
//         return res.json({ 'success': true, 'message': 'Products added successfully', product });
//     })
// }

// export const updateReviews = (req, res) => {
//     console.log(req.body, req.body._id)
//     Reviews.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
//         }
//         console.log(product);
//         return res.json({ 'success': true, 'message': 'Products Updated Successfully', product });
//     })
// }

export const getuserReviews = (req, res) => {
    console.log(req.body)
    var searchInput = { host: req.body.host };
    const outputVal = 'created usercomment Reviewby productrating';

    Reviews.find(searchInput, outputVal).lean().
    populate('Reviewby', 'common.email , common.photoUrl ,  common.firstName , common.lastName').sort({ created: -1 }).
    exec(function(err, review) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', review });
        // prints "The author is Ian Fleming"
    });
}


export const getReviewsByuser = (req, res) => {
    console.log(req.body)
    var searchInput = { Reviewby: req.body.Reviewby };
    const outputVal = 'created usercomment Reviewby productrating';

    Reviews.find(searchInput, outputVal).lean().
    populate('host', 'common.email , common.photoUrl ,  common.firstName , common.lastName').sort({ created: -1 }).
    exec(function(err, review) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', review });
        // prints "The author is Ian Fleming"
    });
}


export const getReviews = (req, res) => {
    console.log(req.params.id)

    Reviews.find({ productid: req.params.id }).exec((err, review) => {
        // console.log('review', review)
        var productReview = {
            productaccuracy: 0,
            productlocation: 0,
            productcommunication: 0,
            productcheckin: 0,
            productcleanliness: 0,
            productvalue: 0,
            productreviewcount: review.length,
            totalproductrating: 0
        };
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (review.length) {
            for (let i = 0; i < review.length; i++) {
                productReview.productaccuracy += review[i].productaccuracy;
                productReview.productlocation += review[i].productlocation;
                productReview.productcommunication += review[i].productcommunication;
                productReview.productcheckin += review[i].productcheckin;
                productReview.productcleanliness += review[i].productcleanliness;
                productReview.productvalue += review[i].productvalue;
            }
            productReview.productaccuracy = Math.round(productReview.productaccuracy / review.length * 2) / 2;
            productReview.productlocation = Math.round(productReview.productlocation / review.length * 2) / 2;
            productReview.productcommunication = Math.round(productReview.productcommunication / review.length * 2) / 2;
            productReview.productcheckin = Math.round(productReview.productcheckin / review.length * 2) / 2;
            productReview.productcleanliness = Math.round(productReview.productcleanliness / review.length * 2) / 2;
            productReview.productvalue = Math.round(productReview.productvalue / review.length * 2) / 2;
            productReview.totalproductrating = Math.round((productReview.productaccuracy + productReview.productlocation + productReview.productcommunication + productReview.productcheckin + productReview.productcleanliness + productReview.productvalue) / 6 * 2) / 2;
            console.log(productReview);
            Reviews.find({ productid: req.params.id }, res.body, { skip: req.body.productskip, limit: 2 }).populate('host', 'common.firstName common.photoUrl').exec((err, filteredreview) => {
                    // Products.find(searchInput, outputVal, { skip: productskip, limit: 1 }, function(err, product) {
                    if (err) {
                        return res.json({ 'success': false, 'message': 'Some Errord' });
                    }
                    if (filteredreview.length) {
                        return res.json({ 'success': true, 'message': 'filteredreview fetched by id successfully', productReview, filteredreview , 'reviewCount': review.length});
                    } else {
                        return res.json({ 'success': false, 'message': 'filteredreview with the given id not found' });
                    }
                })
                // return res.json({ 'success': true, 'message': 'review fetched by id successfully', review });
        } else {
            return res.json({ 'success': false, 'message': 'review with the given id not found' });
        }
    })
}

// export const deleteReviews = (req, res) => {
//     Reviews.findByIdAndRemove(req.params.id, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }
//         return res.json({ 'success': true, 'message': 'Products Deleted Successfully', product });
//     })
// }