// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import Messages from '../models/messages.server.model';


export const getMessages = (req, res) => {
    //to: req.body.id,
    console.log(req.body.inboxtype)
    var searchInput;
    if (req.body.inboxtype === 'travelling') {
        searchInput = { traveller: req.body.id };
    } else if (req.body.inboxtype === 'hosting') {
        searchInput = { hoster: req.body.id };
    }
    const outputVal = 'subject from to status message sendDate bookingId traveller hoster bookingStatus';

    console.log(searchInput)
    Messages.find(searchInput, outputVal).lean().
    populate('from', 'common.email  common.firstName , common.lastName , common.photoUrl').sort({ sendDate: -1 }).
    exec(function(err, message) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', message });
        // prints "The author is Ian Fleming"
    });
}






export const getBookingMessages = (req, res) => {
    console.log(req.body)
    var searchInput = { bookingId: req.body.bookingId };
    const outputVal = 'subject from to status message sendDate bookingId hoster traveller';

    Messages.find(searchInput, outputVal).lean().
    populate('from', 'common.email , common.photoUrl ,  common.firstName , common.lastName').sort({ sendDate: -1 }).
    exec(function(err, message) {
        if (err) return handleError(err);
        else
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', message });
        // prints "The author is Ian Fleming"
    });
}


export const replyMessages = (req, res) => {
    console.log(req.body);
    const newMessages = new Messages(req.body);
    newMessages.save((err, message) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'Products added successfully', message });
    })
}

export const updateStatus = (req, res) => {
    console.log(req.body)
    Messages.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, product) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(product);
        return res.json({ 'success': true, 'message': 'Products Updated Successfully', product });
    })
}


export const deleteMessage = (req, res) => {
    Messages.findByIdAndRemove(req.params.id, (err, message) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Products Deleted Successfully', message });
    })
}