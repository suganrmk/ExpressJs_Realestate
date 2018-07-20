// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import sitesettings from '../models/sitesettings.server.model';
import servicefees from '../models/servicefees.server.model';



export const getsitesettings = (req, res) => {
    sitesettings.findOne({ appid: 'admin01' }).exec((err, settings) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in settings' });
        }
        return res.json({ 'success': true, 'message': 'settings fetched successfully', settings });
    });
}


export const addsitesettings = (req, res) => {
    console.log(req.body);
    const newsitesettings = new sitesettings(req.body);
    newsitesettings.save((err, settings) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in settings' });
        }
        return res.json({ 'success': true, 'message': 'settings added successfully', settings });
    })
}

export const updatesitesettings = (req, res) => {
    console.log(req.body, req.body._id)
    sitesettings.findOneAndUpdate({ appid: 'admin01' }, req.body, { new: true }, (err, setting) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error setting', 'error': err });
        }
        console.log(setting);
        return res.json({ 'success': true, 'message': 'setting Updated Successfully', setting });
    })
}

// export const getsitesettings = (req, res) => {
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

// export const deletesitesettings = (req, res) => {
//     Products.findByIdAndRemove(req.params.id, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }
//         return res.json({ 'success': true, 'message': 'Products Deleted Successfully', product });
//     })
// }

// -------------------------------------------servicefees-------------------------------------------------------------------
//  servicefees



export const getservicefees = (req, res) => {
    servicefees.findOne({ appid: 'admin01' }).exec((err, servicefees) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in settings' });
        }
        return res.json({ 'success': true, 'message': 'settings fetched successfully', servicefees });
    });
}


export const updateservicefees = (req, res) => {

    servicefees.findOne({
        appid: 'admin01'
    }, function (err, data) {
        if (err) {
            throw err;
        }
        if (data) {
            servicefees.findOneAndUpdate({ appid: 'admin01' }, req.body, { new: true }, (err, fees) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error servicefees', 'error': err });
                }
                console.log(err, fees);
                return res.json({ 'success': true, 'message': 'servicefees Updated Successfully', fees });
            })
        } else {
            const newservicefees = new servicefees(req.body);
            newservicefees.save((err, settings) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error in settings' });
                }
                return res.json({ 'success': true, 'message': 'servicefees added successfully', settings });
            })
        }

    });
};

