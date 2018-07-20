// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import Cancellationpolicy from '../models/policy.server.model';

export const getPolicy = (req, res) => {
    Cancellationpolicy.find().exec((err, cancellationpolicy) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in cancellationpolicy' });
        }
        return res.json({ 'success': true, 'message': 'cancellationpolicy fetched successfully', cancellationpolicy });
    });
}


export const addPolicy = (req, res) => {
    console.log(req.body);
    const newCancellationpolicy = new Cancellationpolicy(req.body);
    newCancellationpolicy.save((err, cancellationpolicy) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', cancellationpolicy });
    })
}

// export const updateProducts = (req, res) => {
//     console.log(req.body, req.body._id)
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