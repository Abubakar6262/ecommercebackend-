const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler')
const userModel = require('../models/userModel')
const CryptoJS = require('crypto-js');
const moment = require('moment'); // Use the 'moment' library for working with timestamps
const secretKey = process.env.JWT_SECRET_KEY;

const registerUser = asynchandler(async (req, res) => {
    // console.log('user for sign up =>', req.body);

    const { email, password, fname, lname, country, gender, city } = req.body
    // Hash the password using SHA256
    const upassword = CryptoJS.SHA256(password).toString();
    // Get the current server timestamp
    const serverTimestamp = moment().toISOString();

    console.log('My user for signup', req.body)

    const user = await userModel.create({
        fname,
        lname,
        email,
        gender,
        country,
        city,
        role:'customer',
        password: upassword,
        registerAt: serverTimestamp,
    })
    console.log('complete user data', user);
    if (user) {
        res.status(200).json({ message: 'user register success' })
    } else {
        res.status(400).json({ message: 'Regiter can not successfully' })
    }

})

const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body

    // Hash the password using SHA256
    const upassword = CryptoJS.SHA256(password).toString();


    try {
        const user = await userModel.findOne({ email }).exec();

        if (user) {
            if (user.password === upassword) {
                console.log('user after comparing password =>', user);

                const id = user._id;
                const email = user.email
                const username = user.fname
                const role = user.role
                // console.log('This is my secret key =>',secretKey);
                const token = jwt.sign({ id, email,username,role  }, secretKey, {
                    expiresIn: '30d'
                })
                console.log('This is my token', token);
                res.status(200).json({ token });
                // res.status(200).json({
                //     message: 'i am here in res section',
                // });
            } else {
                res.status(400).json({ message: 'Password can not matched' });
            }
        }

    } catch (err) {
        return res.status(400).json({ message: 'user can not find' });
        // condole.log('Error of user can not get =>', err)
    }
})


// const tokenGenrate = (id, email) => {
//     return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
//         expiresIn: '30d'
//     })
// }

module.exports = {
    registerUser,
    loginUser
}