let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    // if (!req.isAuthenticated())
    // {
    //     return res.redirect('/login')
    // }
    // next();
    return true;
}

//connect to our contact model
let Contact = require('../models/contact');
let contactController = require('../controllers/contact');

//GET ROUTE for the contact list page -READ OPERATION
router.get('/', contactController.displayContactList);

// GET Route for displaying the Update page - UPDATE operation
router.get('/update/:id', requireAuth, contactController.displayUpdatePage);

// POST Route for processing the Update page - UPDATE Operation
router.post('/update/:id', requireAuth, contactController.processUpdatePage);

// GET to perform Deletion - DELETE Operation 
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;