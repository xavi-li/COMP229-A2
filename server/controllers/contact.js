let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//create a reference to the db Schema which is the model
let Contact = require('../models/contact');

//display the contactList
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
           //console.log(contactList);
            res.render('contact/list', { 
                title: 'Business Contacts List', 
                ContactList: contactList, 
                displayName: req.user ? req.user.displayName : '' 
            });
        }
    }).sort('contact_name'); //order by contact_name in ascending alphabetical order
};

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contact/update', { 
                title: 'Update Business Contacts', 
                Contact: contact,
                displayName:req.user?req.user.displayName:''
            });
        }
    });
};


module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id
    let updatedContact = Contact({
        "_id": id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "email_address": req.body.email_address
    });

    Contact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}