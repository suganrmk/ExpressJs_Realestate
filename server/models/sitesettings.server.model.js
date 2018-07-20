import mongoose from 'mongoose';


var sitesettingsSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    logo: Object,
    name: String,
    meta: String,
    facebook: String,
    twitter: String,
    instagram: String,
    appid: {
        type: String,
        default: 'admin'
    }
}); 

export default mongoose.model('sitesettings', sitesettingsSchema)