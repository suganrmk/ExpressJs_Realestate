// ./express-server/controllers/roomType.server.controller.js
import mongoose from 'mongoose';

var listingSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    status: String
});

var listingType = mongoose.model('listingType', listingSchema);
var roomType = mongoose.model('roomType', listingSchema);

/* Room Type */



export const getAll = (req, res) => {
    let typeName = req.url.substr(1);
    var dbtable = mongoose.model(typeName, listingSchema);
    return getAllDatas(dbtable, req, res);
}

export const getAdminData = (req, res) => {
    let typeName = req.url.split('/').slice(-2)[0];
    var dbtable = mongoose.model(typeName, listingSchema);
    return getAdminDatas(dbtable, req, res);
}

export const addNew = (req, res) => {
    let typeName = req.url.substr(1);
    var dbtable = mongoose.model(typeName, listingSchema);
    return addNewData(dbtable, req, res);
}

export const updateData = (req, res) => {
    let typeName = req.url.substr(1);
    var dbtable = mongoose.model(typeName, listingSchema);
    return updateById(dbtable, req, res);
}

export const deleteData = (req, res) => {
    let typeName = req.url.split('/').slice(-2)[0];
    var dbtable = mongoose.model(typeName, listingSchema);
    return deleteById(dbtable, req, res);
}

function getAllDatas(dbtable, req, res) {
    dbtable.find().exec((err, roomTypes) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in roomTypes' });
        }
        return res.json({ 'success': true, 'message': 'roomTypes fetched successfully', roomTypes });
    });
}

function getAdminDatas(dbtable, req, res) {
    dbtable.find({'status':'Enable'}).exec((err, roomTypes) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in roomTypes' });
        }
        return res.json({ 'success': true, 'message': 'roomTypes fetched successfully', roomTypes });
    });
}

function addNewData(dbtable, req, res) {
    const newdata = new dbtable(req.body);
    newdata.save((err, result) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error tod' });
        }
        return res.json({ 'success': true, 'message': 'roomType added successfully', result });
    })
}

function updateById(dbtable, req, res) {
    dbtable.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, result) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'roomType Updated Successfully', result });
    })
}



function deleteById(dbtable, req, res) {
    dbtable.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Products Deleted Successfully', result });
    })
}