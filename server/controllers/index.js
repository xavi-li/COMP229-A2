/* 
  File Name:     /controller/index.js
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          27-FEB-2023 
*/

let express = require('express');
let router = express.Router();

// add mongoose
let mongoose = require('mongoose');
let passport = require('passport');

// create userModel instance
let UserModel = require('../models/user');
let User = UserModel.User;


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', message: '', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', message: '', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects Showcase', message: '', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services Available', message: '', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact Me', message: '', displayName: req.user ? req.user.displayName : ''});
}

// POST redirect from Contact to Index 
module.exports.processContactForm = (req, res, next) => {
    console.log('Name:', req.body.name);
    console.log('Email:', req.body.email);
    console.log('Contact Number:', req.body.contactNumber);
    console.log('Message:', req.body.message);
  
    // redirect to index page after submission
    res.render('index', { title: 'Home', message: 'Form submitted successfully!' });
  
}


module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already log in
    if (!req.user) {
        res.render('auth/login', 
            {
            title: "Login",
            messages: req.flash('loginMessage'), // display message for auth field
            displayName: req.user ? req.user.displayName : ''
            }
        )
    }
    else {
        return res.redirect('/'); // back to homepage
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, User, info) => {
        console.log(err)

        // server error?
        if (err) {
            return next(err);
        }
        // is there a user login error?
        if (!User) {
            console.log("user login error: " + req.body.username + "(" + req.body.password + ")");
                         
            req.flash("loginMessage", 'Authentication Error');
            return res.redirect('/login'); // back to login page
        }

        req.login(User, (err) => {
            // server error?
            if (err) {
                return next(err);
            }
            return res.redirect('/contactList');
        });
        
    }) (req, res, next)
    
}


module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not already logged in*/
    if (!req.user)
    {
        res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
    }
    else
    {
        return res.redirect('/');
        }
}
module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object*/
    let newUser = new User({
        username: req.body.username,
        //password:req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error:inserting New User");
            if (err.name == "UserExits Error") {
                req.flash('registerMessage',
                    'Registration Error: User Already Exists!');
                console.log('Error: user Already Exists')
            }
            
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
        }
        else {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contactList')
            });
        }
            
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}