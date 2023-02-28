/* 
  File Name:     /models/contact.js
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          27-FEB-2023 
*/

let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    contact_name: String,
    contact_number: String,
    email_address: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contact', contactModel);