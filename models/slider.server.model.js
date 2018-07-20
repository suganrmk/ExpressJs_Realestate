import mongoose from 'mongoose';


var sliderSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    subtitle: String,
    sliderImage: Object
});

export default mongoose.model('HomeSlider', sliderSchema)