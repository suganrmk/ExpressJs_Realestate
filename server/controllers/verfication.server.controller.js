import mongoose from 'mongoose';
import MobileTokens from '../models/mobiletoken.server.model';
import users from '../models/users.server.model';



var bcrypt = require('bcryptjs');
const accountSid = 'AC9b99748994ecab9cca1c7265744aa90d';
const authToken = '13d827b84699da4884d9c190267f4d1d';
const client = require('twilio')(accountSid, authToken);
export const generatemobileToken = (req, res) => {

    const userId = req.body.userId;
    const usernumber = req.body.usernumber;
    console.log(usernumber, typeof(usernumber))

    let createToken = 'HS' + Math.floor(1000 + Math.random() * 9000);
    let generatedmobiletoken = bcrypt.hashSync(createToken, 10);

    let newMobileTokens = new MobileTokens(req.body);
    newMobileTokens.mobiletoken = generatedmobiletoken


    MobileTokens.findOne({
        'userId': req.body.userId
    }, function(err, user) { 
        // console.log('token', user)
        if (err) throw err;
        if (!user) {
            console.log('token no user')
            newMobileTokens.save((err, token) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error Found' });
                } else {
                    client.messages
                        .create({
                            body: `your token - ` + createToken,
                            from: '+15412756733',
                            to: usernumber
                        })
                        .then(message , err => {
                            console.log(ji , err);
                            return res.json({ 'success': true, 'message': 'token added successfully', token });
                        })
                        .catch(e => { console.error('Got an error:', e.code, e.message); })
                        .done();
                  
                }
            });
        } else if (user) { 
            console.log('token yes user')
            MobileTokens.findOneAndUpdate({ 'userId': userId }, { 'mobiletoken': generatedmobiletoken }, { new: true }, (err, updatedtoken) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                }
                client.messages
                    .create({
                        body: `your token - ` + createToken,
                        from: '+15412756733',
                        to: usernumber
                    })
                    .then(message => console.log(message.sid))
                    .catch(e => { console.error('Got an error:', e.code, e.message); })
                    .done();
                return res.json({ 'success': true, 'message': 'token Updated Successfully', updatedtoken });
            })
        }
    });

    

}

export const verifymobileToken = (req, res) => {
    const userId = req.body.userId;
    const mobiletoken = req.body.mobiletoken;
    MobileTokens.findOne({
        'userId': req.body.userId
    }, function(err, token) {
        console.log('token', token)
        if (err) throw err;
        if (!token) {
            res.json({ success: false, message: 'Authentication failed. token not found.' });
        } else if (!bcrypt.compareSync(req.body.mobiletoken, token.mobiletoken)) {
            res.json({ success: false, message: 'Sorry your token is not matched!' });
        } else if (bcrypt.compareSync(req.body.mobiletoken, token.mobiletoken)) {
            users.findOneAndUpdate({ _id: userId }, { 'verfication.mobile': true }, (err, user) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
                }
                console.log(user);
                res.json({ success: true, message: 'Enjoy your token is verified!', token: token });
            })

        }
    });

}

export const googleverification = (req, res) => {
    const verifyMethod = req.body.verifyMethod;
    const verifyStatus = req.body.verifyStatus;
    let verify = {
        verfication: {}
    };
    verify.verfication[verifyMethod] = verifyStatus;

    // let verify = {
    //     verifyMethod: verifyStatus
    // }
    console.log(verify)
    users.findOneAndUpdate({ _id: req.body.userId }, verify, (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        return res.json({ 'success': true, 'message': 'user verified!', user });
    })
}