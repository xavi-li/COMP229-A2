let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//create a reference to the db Schema which is the model
let Contact = require('../models/contact');

//we want to display the contactList
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
           //console.log(contactList);
            res.render('contact/list', { title: 'Contacts', contactList: contactList, displayName:req.user?req.user.displayName:'' });
        }
    });
}

// module.exports.displayAddPage = (req, res, next) => {
//     res.render('contact/add',{title:'Add Book',displayName:req.user?req.user.displayName:''})
// }

// module.exports.processAddPage = (req, res, next) => {
//     let newBook = Contact({
//         "name": req.body.name,
//         "author": req.body.author,
//         "published": req.body.published,
//         "description": req.body.description,
//         "price": req.body.price
//     });
//     Contact.create(newBook, (err, Book) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             res.redirect('/contactList');
//         }
//     });
// }

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactToUpdate) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contact/update', { title: 'Update Contacts', contact: contactToUpdate, displayName:req.user?req.user.displayName:'' });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    let updatedBook = Contact({
        "_id": id,
        "contact_name": req.body.contactName,
        "contact_number": req.body.contactNumber,
        "email_address": req.body.emarilAddress
    });
    console.log('req.body.price' , req.body)
    Contact.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}

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