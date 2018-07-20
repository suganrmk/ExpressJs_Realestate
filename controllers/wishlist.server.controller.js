// ./express-server/controllers/product.server.controller.js
import mongoose from 'mongoose';

//import models 
import Wishlists from '../models/wishlist.model';



export const addWishlist = (req, res) => {
    console.log(req.body)
    const newWishlists = new Wishlists(req.body);
    newWishlists.save((err, wishlist) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error Found' });
        }

        return res.json({ 'success': true, 'message': 'wishlist added successfully', wishlist });
    })
}


export const getwishlist = (req, res) => {
    Wishlists.find({ wishlistUser: req.body.wishlistUser }).populate('productlist', 'Description.Title coverphoto.filename').exec((err, wishlist) => {
        console.log('product', wishlist)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (wishlist.length) {
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', wishlist });
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })
}


export const getwishlistbyId = (req, res) => {
    Wishlists.find({ _id: req.body.listid }).populate('productlist').exec((err, wishlist) => {
        console.log('product', wishlist)
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (wishlist.length) {
            return res.json({ 'success': true, 'message': 'Products fetched by id successfully', wishlist });
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })
}


export const updatewishlist = (req, res) => {
    console.log(req.body);

    Wishlists.find({ _id: req.body.listid }).exec((err, wishlist) => {

        if (err) {
            return res.json({ 'success': false, 'message': 'Some Errord' });
        }
        if (wishlist.length) {
            if (req.body.type === 'active') {
                var updatedlist = wishlist[0].productlist.push(req.body.productid);
                var updatewishlist = wishlist[0];
                console.log('finalupdate', updatewishlist , wishlist[0])
                Wishlists.findOneAndUpdate({ _id: req.body.listid }, updatewishlist, (err, updated) => {
                    if (err) {
                        return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                    }
                    return res.json({ 'success': true, 'message': 'wishlist Updated Successfully', updated });
                })

            } else if (req.body.type === 'inactive') {
                var updatedlist = wishlist[0].productlist.splice(wishlist[0].productlist.indexOf(wishlist.productid), 1);
                var updatewishlist = wishlist[0];

                Wishlists.findOneAndUpdate({ _id: req.body.listid }, updatewishlist, (err, updated) => {
                    if (err) {
                        return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                    }
                    return res.json({ 'success': true, 'message': 'wishlist Updated Successfully', updated });
                })
            }
        } else {
            return res.json({ 'success': false, 'message': 'Products with the given id not found' });
        }
    })

    // Wishlists.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, wishlist) => {
    //     if (err) {
    //         return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
    //     }
    //     console.log(wishlist);
    //     return res.json({ 'success': true, 'message': 'HomeSlider Updated Successfully', wishlist });
    // })
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