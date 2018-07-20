// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import users from '../models/users.server.model';

// export const getUser = (req, res) => {
//     users.find().exec((err, user) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error in users' });
//         }
//         return res.json({ 'success': true, 'message': 'users fetched successfully', user });
//     });
// }

// export const searchProducts = (req, res) => {
//     var searcReq = req.body;
//     var searchInput = {};
//     const outputVal = 'ProductType RoomType Photos.filename Rooms.Beds Description.Title Pricing.Baseprice Location.lat Location.lng';

//     for (var key in req.body) { //could also be req.query and req.params
//         req.body[key] !== "" ? searchInput[key] = req.body[key] : null;
//     }


//     // if (searcReq.country !== 0) {
//     //     searchInput['Location.country'] = searcReq.country
//     // }
//     // if (searcReq.Accommodates !== 0) {
//     //     searchInput['Accommodates'] = searcReq.Accommodates
//     // }
//     // if (searcReq.price !== 0) {
//     //     searchInput['Pricing.Baseprice'] = searcReq.price
//     // }

//     console.log(searchInput)
//         // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
//     Products.find(searchInput, outputVal, function(err, product) {
//         console.log('%s %s is a %s.', product);
//         if (err) return handleError(err);
//         else
//             return res.json({ 'success': true, 'message': 'Products fetched by id successfully', product });

//         // Prints "Space Ghost is a talk show host".


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

export const updateUsers = (req, res) => {
    console.log('serupdate', req.body)
    users.findOneAndUpdate({ _id: req.body._id }, req.body, (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(user);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', user });
    })
}

export const updateUsersImage = (req, res) => {
    console.log('serupdate', req.body)
    users.findOneAndUpdate({ _id: req.body._id }, { $set:{ 'common.photoUrl': req.body.common.photoUrl }} , (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(user);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', user });
    })
}

export const getuser = (req, res) => {
    console.log(req.body._id)

    users.find({ _id: req.body._id }).exec((err, user) => {
        console.log('user', user)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (user.length) {
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', user });
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })
}

// export const deleteProducts = (req, res) => {
//     Products.findByIdAndRemove(req.params.id, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }
//         return res.json({ 'success': true, 'message': 'Products Deleted Successfully', product });
//     })
// }

