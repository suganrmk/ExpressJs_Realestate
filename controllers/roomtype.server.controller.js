// ./express-server/controllers/roomType.server.controller.js
import mongoose from 'mongoose';

//import models
import roomType from '../models/roomtype.model';

export const getroomTypes = (req, res) => {
    roomType.find().exec((err, roomTypes) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in roomTypes' });
        }
        return res.json({ 'success': true, 'message': 'roomTypes fetched successfully', roomTypes });
    });
}


export const addroomType = (req, res) => {
    console.log(req.body);
    const newroomType = new roomType(req.body);
    newroomType.save((err, roomType) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'roomType added successfully', roomType });
    })
}

export const updateroomType = (req, res) => {
    console.log(req.body)
    roomType.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, roomType) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(roomType);
        return res.json({ 'success': true, 'message': 'roomType Updated Successfully', roomType });
    })
}

export const getroomType = (req, res) => {
    console.log(req.params.id)

    roomType.find({ _id: req.params.id }).populate('host').exec((err, roomType) => {
        console.log('roomType', roomType)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (roomType.length) {
            return res.json({ 'success': true, 'message': 'roomType fetched by id successfully', roomType });
        } else {
            return res.json({ 'success': false, 'message': 'roomType with the given id not found' });
        }
    })
}

export const deleteroomType = (req, res) => {
    roomType.findByIdAndRemove(req.params.id, (err, roomType) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'roomType Deleted Successfully', roomType });
    })
}