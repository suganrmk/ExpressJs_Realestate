import mongoose from 'mongoose';

var crypto = require('crypto');
var nodemailer = require('nodemailer');
var config = require('config.json');
var express = require('express');
var findOrCreate = require('mongoose-findorcreate');

var router = express.Router();
var userService = require('services/user.service');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

const app = express();
app.set('superSecret', config.secret);
//import models
import users from '../models/users.server.model';
import Token from '../models/token.server.model';
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/resendToken', resendtoken);
router.post('/forgetpass', forgetPassword);
router.get('/resetpassword/:id', resetpass);
router.post('/updatepass', updatepassword);
router.post('/changepass', changepassword);

// router.post('/resetpassword/:id', resetpassword);


router.get('/alluser', getAll);
// router.get('/current', getCurrent);
// router.get('/:_id', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);
router.post('/auth/google', googleauth);

module.exports = router;


// Login Using google ------------------------------------------------------------------------------------

function googleauth(req, res) {
    const payload = {
        admin: false
    };
    var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: 14440 // expires in 24 hours
    });
    // try to find the user based on their google id
    users.findOne({ 'google.id': req.body.id }, function (err, user) {
        console.log(user)
        if (err)
            return res.json({ 'success': false });
        if (user) {
            return res.json({ 'success': true, user, token });
        } else {
            // if the user isnt in our database, create a new user
            let user = new users();
            user.google.id = req.body.id;
            user.google.token = req.body.authToken;
            user.google.name = req.body.name;
            user.google.email = req.body.email; // pull the first email
            user.common.photoUrl = req.body.photoUrl;
            user.common.firstName = req.body.name;
            user.common.email = req.body.email;
            user.verfication.google = true;

            // save the user
            user.save(function (err) {
                if (err)
                    throw err;
                return res.json({ 'success': true, user, token });
            });
        }
    });
}

// Login  ------------------------------------------------------------------------------------

function authenticate(req, res) {
    users.findOne({
        'local.email': req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (!user.isVerified) {
            res.json({ success: false, message: 'Authentication failed. User Is not verfied yet.' });
        } else if (user && user.isVerified) {
            //  check if password matches
            if (!bcrypt.compareSync(req.body.password, user.local.hash)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password

                const payload = {
                    admin: user.common
                };
                console.log('payload', payload, app.get('superSecret'))
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 14440 // expires in 24 hours
                });
                user.local.hash = '';
                console.log(user.local);
                req.session.userId = user._id;
                req.session.login(user._id, function (err) {
                    if (err) {
                        return res.status(500).send("There was an error logging in. Please try again later.");
                    }
                });
                // return the information including token as JSON
                res.json({ success: true, message: 'Enjoy your token!', token: token, res: user });
            }
        }
    });
}

// Register ------------------------------------------------------------------------------------
function register(req, res) {
    users.findOne({
        'local.email': req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            res.json({ success: false, message: 'Email name already available' });
        } else {
            createUser(req.body);
        }
    });

    function createUser(data) {
        var user = _.omit(data, 'password');
        // add hashed password to user object
        user.hash = bcrypt.hashSync(data.password, 10);
        var newuser = new users();
        newuser.common = user;

        newuser.local = user;

        newuser.save((err, user) => {
            if (err) {
                return res.json({ 'success': false, 'message': 'Some Error tod' });
            }
            var token = new Token({ _userId: newuser._id, token: crypto.randomBytes(16).toString('hex') });
            console.log(token)
            token.save(function (err) {
                if (err) { console.log({ msg: err.message }); }

                // Send the email
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'suganrmk@gmail.com',
                        pass: 'sug#nr#j25'
                    }
                });
                var mailOptions = { from: 'no-reply@yourwebapplication.com', to: 'suganrmk@gmail.com', subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/user' + '\/verfication\/' + token.token + '.\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { console.log({ msg: err.message }); }
                    console.log('A verification email has been sent to ' + data.email + '.');
                });
            });
            return res.json({ 'success': true, 'message': 'A verification email has been sent to' + data.email });
        })
    }
}

// Email Confirmathin link------------------------------------------------------------------------------------
router.get('/confirmation/:id', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'), req.params.id);
    // Find a matching token
    Token.findOne({ token: req.params.id }, function (err, token) {
        if (!token) {
            return res.json({ sucess: false, type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });
        } else {
            // If we found a token, find a matching user
            users.findOne({ _id: token._userId }, function (err, user) {
                if (!user) {
                    return res.json({ sucess: false, type: 'not-verified', msg: 'We were unable to find a user for this token.' });
                }
                if (user.isVerified) {
                    console.log(user.isVerified);
                    return res.json({ sucess: false, type: 'already-verified', msg: 'This user has already been verified.' });
                } else {
                    // Verify and save the user
                    console.log(user.isVerified);
                    user.isVerified = true;
                    user.verfication.email = true;
                    user.save(function (err) {
                        if (err) { return res.json({ msg: err.message }); }
                        res.json({ sucess: true, type: 'verified', msg: 'The account has been verified. Please log in.' });
                    });
                }
            });
        }
    });
});

// Resending Email Confirmation------------------------------------------------------------------------------------
function resendtoken(req, res) {
    users.findOne({ 'local.email': req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'suganrmk@gmail.com',
                    pass: 'sug#nr#j25'
                }
            });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: 'suganrmk@gmail.com', subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/user' + '\/verfication\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { console.log({ msg: err.message }); }
                console.log('A verification email has been sent to ' + user.email + '.');
            });
        });

    });
};


// Send Forgot password Confirmation------------------------------------------------------------------------------------

function forgetPassword(req, res) {
    console.log(req.body)
    users.findOne({ 'local.email': req.body.email }, function (err, user) {
        if (!user) return res.json({ message: 'We were unable to find a user with that email.' });
        // if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the token
        token.save(function (err) {
            if (err) { return res.json({ message: err.message }); }
            // Send the email
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'suganrmk@gmail.com',
                    pass: 'sug#nr#j25'
                }
            });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: req.body.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please changepassword your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/resetpass/' + token.token + '\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.json({ message: err.message }); }
                return res.json({ 'success': true, 'message': 'Password reset Link  has been sent to' + req.body.email });
            });
        });

    });
}




function resetpass(req, res) {
    console.log(req.protocol + ":/" + req.get('host'), req.params.id);

};



function updatepassword(req, res) {
    console.log(req.body)
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) {
            return res.json({ success: false, type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        } else {
            // If we found a token, find a matching user
            users.findOne({ _id: token._userId }, function (err, user) {
                if (!user) {
                    return res.json({ success: false, msg: 'We were unable to find a user for this token.' });
                } else {
                    user.local.hash = bcrypt.hashSync(req.body.password, 10);
                    user.save(function (err) {
                        if (err) {
                            return res.json({ success: false, msg: err.message });
                        } else {
                            Token.remove({ token: req.body.token }, (err, deletedData) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('deleted')
                                }
                            });
                            res.json({ success: true, msg: "The Password Has updated. Please log in." });
                        }
                    });
                }

            });
        }
    });
}




// Login  ------------------------------------------------------------------------------------

function changepassword(req, res) {
    users.findOne({ '_id': req.body.id }, function (err, user) {
        if (err) throw err;
        if (!user.local.hash) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (!user.isVerified) {
            res.json({ success: false, message: 'Authentication failed. User Is not verfied yet.' });
        } else if (user && user.isVerified) {
            //  check if password matches
            if (!bcrypt.compareSync(req.body.password, user.local.hash)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                user.local.hash = bcrypt.hashSync(req.body.newpassword, 10);
                user.save(function (err) {
                    if (err) {
                        return res.json({ success: false, msg: err.message });
                    } else {

                        res.json({ success: true, msg: "The Password Has updated. Please log in." });
                    }

                });
                // return the information including token as JSON
                // res.json({ success: true, message: 'Enjoy your token!', token: token, res: user });
            }
        }
    });
}


// creating new password after cliking email confm link -----------------------------------------------------------------------


function getAll(req, res) {
    users.find({}, function (err, users) {
        res.json(users);
    });
}

// function getCurrent(req, res) {
//     console.log(req.user.sub)
//     userService.getById(req.user.sub)
//         .then(function(user) {
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }

// function update(req, res) {
//     userService.update(req.params._id, req.body)
//         .then(function() {
//             res.sendStatus(200);
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }



// function _delete(req, res) {
//     userService.delete(req.params._id)
//         .then(function() {
//             res.sendStatus(200);
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }

// export const updateUser = (req, res) => {
//     console.log(req.body)
//     users.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, user) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
//         }
//         console.log(user);
//         return res.json({ 'success': true, 'message': 'Products Updated Successfully', user });
//     })
// }