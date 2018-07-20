// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import Products from '../models/products.server.model';

export const getProducts = (req, res) => {
    Products.find().exec((err, products) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in products' });
        }
        return res.json({ 'success': true, 'message': 'products fetched successfully', products });
    });
}

export const searchProducts = (req, res) => {
    var productskip = req.body.productskip;
    var pageLimit = req.body.pageLimit;
    var searchInput = {};
    const outputVal = 'ProductType RoomType Photos.filename Rooms.Beds Description.Title Pricing.Baseprice Location.lat Location.lng UnavailabeDates ProductRating ProductRatingCount';
    for (var key in req.body.searchFilter) {
        req.body.searchFilter[key] !== "" ? searchInput[key] = req.body.searchFilter[key] : null;
    }
    searchInput["status"] = "completed";
    searchInput["published"] = true;
     
    console.log(searchInput)

    Products.find(searchInput, outputVal, function(err, product) {
        // console.log(product)
        if (err) return handleError(err);
        else {
            var totalrecord = product.length;
            Products.find(searchInput, outputVal, { skip: productskip, limit: pageLimit }, function(err, product) {
                if (err) return handleError(err);
                else
                    return res.json({ 'success': true, 'message': 'Products fetched by id successfully', product, totalrecord });
            });
        }
    });
}



export const addProducts = (req, res) => {
    // console.log(req.body);
    const newProducts = new Products(req.body);
    newProducts.save((err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', product });
    })
}

export const updateProducts = (req, res) => {
    // console.log(req.body)
    Products.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        // console.log(product);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', product });
    })
}

export const getProduct = (req, res) => {
    // console.log(req.params.id)

    Products.find({ _id: req.params.id }).populate('host').exec((err, product) => {
        // console.log('product', product)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (product.length) {
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', product });
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })
}

export const deleteProducts = (req, res) => {
    Products.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Products Deleted Successfully', product });
    })
}