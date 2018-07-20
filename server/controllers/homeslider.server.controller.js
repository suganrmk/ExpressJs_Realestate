// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models
import FileUpload from '../models/fileupload.server.model.';
import HomeSlider from '../models/slider.server.model';

export const getHomeSliders = (req, res) => {
    console.log('in homesliders')
    HomeSlider.find().exec((err, homesliders) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error in sliders' });
        }

        return res.json({ 'success': true, 'message': 'sliders fetched successfully', homesliders });
    });
}


export const addHomeSlider = (req, res) => {
    console.log(req.body)
    const newSlider = new HomeSlider(req.body);
    newSlider.save((err, homesliders) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error Found' });
        }

        return res.json({ 'success': true, 'message': 'Slider added successfully', homesliders });
    })
}

export const updateHomeSlider = (req, res) => {
    HomeSlider.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, homesliders) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(homesliders);
        return res.json({ 'success': true, 'message': 'HomeSlider Updated Successfully', homesliders });
    })
}

export const deleteHomeSlider = (req, res) => {
    HomeSlider.findByIdAndRemove(req.params.id, (err, homesliders) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }

        return res.json({ 'success': true, 'message': 'HomeSlider Deleted Successfully', homesliders });
    })
}

// export const getSliders = (req, res) => {
//     console.log('in')
//     Slider.find().exec((err, sliders) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error in products' });
//         }

//         return res.json({ 'success': true, 'message': 'products fetched successfully', sliders });
//     });
// }

// app.post("/upload", multer({ dest: "./uploads/" }).array("myfile[]", 12), function(req, res) {
//     console.log(req.files)
//     res.send(req.files);
// });

export const addSlider = (req, res) => {
    console.log(req.files[0])
    const newSlider = new HomeSlider(req.files[0]);
    newSlider.save((err, slider) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error Found' });
        }

        return res.json({ 'success': true, 'message': 'Slider added successfully', slider });
    })
}

// export const updateProduct = (req, res) => {
//     Product.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
//         }
//         console.log(product);
//         return res.json({ 'success': true, 'message': 'Product Updated Successfully', product });
//     })
// }

// export const getProduct = (req, res) => {
//     Product.find({ _id: req.params.id }).exec((err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Errord' });
//         }
//         if (product.length) {
//             return res.json({ 'success': true, 'message': 'Product fetched by id successfully', product });
//         } else {
//             return res.json({ 'success': false, 'message': 'Product with the given id not found' });
//         }
//     })
// }

// export const deleteProduct = (req, res) => {
//     Product.findByIdAndRemove(req.params.id, (err, product) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }

//         return res.json({ 'success': true, 'message': 'Product Deleted Successfully', product });
//     })
// }