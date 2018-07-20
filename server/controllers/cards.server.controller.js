// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import Cards from '../models/cards.server.model';


export const addcarddetails = (req, res) => {
    console.log(req.body);
    const newCards = new Cards(req.body);
    newCards.save((err, card) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', card });
    })
}



export const getCards = (req, res) => {
    console.log(req.params.id)

    Cards.find({ user: req.params.id }).exec((err, cards) => {
        console.log('product', cards)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (cards.length) {
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', cards });
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })
}


export const updateCards = (req, res) => {
    console.log(req.body, req.body._id)
    Cards.findOneAndUpdate({ _id: req.body._id }, req.body, (err, cards) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(cards);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', cards });
    })
}

export const deleteCards = (req, res) => {
    Cards.findByIdAndRemove(req.params.id, (err, cards) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Products Deleted Successfully', cards });
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