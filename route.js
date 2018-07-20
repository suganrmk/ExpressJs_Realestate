// ./express-server/routes/product.server.route.js
import express from 'express';

//import controller file
import * as homeslider from './controllers/homeslider.server.controller';
import * as productController from './controllers/products.server.controller';
// import * as roomtype from './controllers/roomtype.server.controller';
import * as listingprops from './controllers/listingtype.controller';
import * as searchController from './controllers/search.server.controller';
import * as messageController from './controllers/message.server.controller';
import * as bookingsController from './controllers/bookings.server.controller';
import * as reviewController from './controllers/reviews.server.controller';
import * as cardController from './controllers/cards.server.controller';
import * as policyController from './controllers/policy.server.controller';
import * as mobiletokenController from './controllers/verfication.server.controller';

import * as userlistingController from './controllers/userlisting.server.controller'
import * as userController from './controllers/user.server.controller';
import * as sitesettings from './controllers/sitesettings.server.controller';
import * as commonController from './controllers/common.server.controller';
import * as wishlistController from './controllers/wishlist.server.controller';



var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        console.log('File Name', file);
        cb(null, Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage });

// get an instance of express router
const router = express.Router();

//Home Slider
router.route('/slider').get(homeslider.getHomeSliders);
router.route('/slider').post(homeslider.addHomeSlider);
router.route('/slider').put(homeslider.updateHomeSlider);
router.route('/slider/:id').delete(homeslider.deleteHomeSlider);
//Room Type

router.route('/roomtype/filtered').get(listingprops.getAdminData);
router.route('/roomtype').get(listingprops.getAll);
router.route('/roomtype').post(listingprops.addNew);
router.route('/roomtype').put(listingprops.updateData);
router.route('/roomtype/:id').delete(listingprops.deleteData);
//bathroom Type
router.route('/bathroomtype/filtered').get(listingprops.getAdminData);
router.route('/bathroomtype').get(listingprops.getAll);
router.route('/bathroomtype').post(listingprops.addNew);
router.route('/bathroomtype').put(listingprops.updateData);
router.route('/bathroomtype/:id').delete(listingprops.deleteData);
//house Type
router.route('/housetype/filtered').get(listingprops.getAdminData);
router.route('/housetype').get(listingprops.getAll);
router.route('/housetype').post(listingprops.addNew);
router.route('/housetype').put(listingprops.updateData);
router.route('/housetype/:id').delete(listingprops.deleteData);
//building size
router.route('/buildingsize/filtered').get(listingprops.getAdminData);
router.route('/buildingsize').get(listingprops.getAll);
router.route('/buildingsize').post(listingprops.addNew);
router.route('/buildingsize').put(listingprops.updateData);
router.route('/buildingsize/:id').delete(listingprops.deleteData);
//Bed Type
router.route('/bedtype/filtered').get(listingprops.getAdminData);
router.route('/bedtype').get(listingprops.getAll);
router.route('/bedtype').post(listingprops.addNew);
router.route('/bedtype').put(listingprops.updateData);
router.route('/bedtype/:id').delete(listingprops.deleteData);
//essentialamenities Type
router.route('/essentialamenities/filtered').get(listingprops.getAdminData);
router.route('/essentialamenities').get(listingprops.getAll);
router.route('/essentialamenities').post(listingprops.addNew);
router.route('/essentialamenities').put(listingprops.updateData);
router.route('/essentialamenities/:id').delete(listingprops.deleteData);
//essentialamenities Type
router.route('/houserules/filtered').get(listingprops.getAdminData);
router.route('/houserules').get(listingprops.getAll);
router.route('/houserules').post(listingprops.addNew);
router.route('/houserules').put(listingprops.updateData);
router.route('/houserules/:id').delete(listingprops.deleteData);
//safetyamenities Type  
router.route('/safetyamenities/filtered').get(listingprops.getAdminData);
router.route('/safetyamenities').get(listingprops.getAll);
router.route('/safetyamenities').post(listingprops.addNew);
router.route('/safetyamenities').put(listingprops.updateData);
router.route('/safetyamenities/:id').delete(listingprops.deleteData);
//spaces Type
router.route('/spaces/filtered').get(listingprops.getAdminData);
router.route('/spaces').get(listingprops.getAll);
router.route('/spaces').post(listingprops.addNew);
router.route('/spaces').put(listingprops.updateData);
router.route('/spaces/:id').delete(listingprops.deleteData);

router.get('/products', productController.getProducts);
//New Products
router.route('/allproducts').get(productController.getAllProducts);
// router.route('/products').get(productController.getProducts);
router.route('/products').post(productController.addProducts);
router.route('/products').put(productController.updateProducts);
router.route('/products/:id').get(productController.getProduct)
router.route('/products/:id').delete(productController.deleteProducts);

//review
router.route('/review').post(reviewController.addReviews);
router.route('/getreview/:id').post(reviewController.getReviews);
router.route('/getuserreview').post(reviewController.getuserReviews);
router.route('/getReviewsByuser').post(reviewController.getReviewsByuser);


// payout - card details
router.route('/savecard').post(cardController.addcarddetails);
router.route('/getcard/:id').get(cardController.getCards);
router.route('/updatecard').put(cardController.updateCards);
router.route('/deletecard/:id').delete(cardController.deleteCards);

//policy

 
router.route('/addcancellationpolicy').post(policyController.addPolicy);
router.route('/getcancellationpolicy').get(policyController.getPolicy);


//sitesettings

router.route('/updatesitesettings').put(sitesettings.updatesitesettings);
router.route('/getsitesettings').get(sitesettings.getsitesettings);

// servicefeee
router.route('/getservicefees').get(sitesettings.getservicefees);
router.route('/updateservicefees').put(sitesettings.updateservicefees);


// commonController
router.route('/getcountries').get(commonController.getCountrylist);
router.route('/getcurrency').get(commonController.getCurrencylist);


//search
router.route('/search').post(searchController.searchProducts);


//wishlist
router.route('/createwishlist').post(wishlistController.addWishlist);
router.route('/getuserlist').post(wishlistController.getwishlist);
router.route('/updatewishlist').put(wishlistController.updatewishlist);
router.route('/getwishlistbyId').post(wishlistController.getwishlistbyId);





//message
router.route('/message').post(messageController.getMessages);
router.route('/bookingmessage').post(messageController.getBookingMessages);
router.route('/reply').post(messageController.replyMessages);
router.route('/deletemessage/:id').delete(messageController.deleteMessage);
router.route('/statuschange').put(messageController.updateStatus)

//bookings


router.route('/getbooking/:id').get(bookingsController.getbooking);


router.route('/previoustrips').post(bookingsController.previoustrips);
router.route('/currenttrips').post(bookingsController.currenttrips);
router.route('/reservation').post(bookingsController.userreservation);
router.route('/updatereservation').put(bookingsController.updateuserreservation);
router.route('/addreservation').post(bookingsController.addreservation);
router.route('/getallReservations').get(bookingsController.getallReservations);




//bookings
router.route('/savetransaction').post(bookingsController.savetransaction);
router.route('/completedtransaction').post(bookingsController.completedtransaction);
router.route('/futuretransaction').post(bookingsController.futuretransaction);




//user data
router.route('/userupdate').put(userController.updateUsers);
router.route('/userpicupdate').put(userController.updateUsersImage);
router.route('/getuser').post(userController.getuser);

//mobileverification
router.route('/generatemobileverfication').post(mobiletokenController.generatemobileToken);
router.route('/verifymobileToken').post(mobiletokenController.verifymobileToken);
router.route('/googleverification').post(mobiletokenController.googleverification);



//userlisting
router.route('/user/listing').post(userlistingController.getlistings);

// file upload
router.post('/upload', upload.array("myfile[]", 12), function(req, res, next) {
    return res.send({
        success: true,
        file: req.files
    });
});

export default router;