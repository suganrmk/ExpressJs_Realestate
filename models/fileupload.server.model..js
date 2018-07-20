import mongoose from 'mongoose';

var UploadSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    fieldname: String,
    originalname: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});


export default mongoose.model('FileUpload', UploadSchema);