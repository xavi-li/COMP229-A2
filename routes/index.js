/* 
  File Name:     index.js 
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          05-FEB-2023 
*/

var express = require('express');
var router = express.Router();

/* GET index page, aka Home Page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', message: ''});
});

/* GET About Me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects Showcase'});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services Available' });
});

/* GET Contact Me page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

/* POST redirect from Contact to Index */
router.post('/', function(req, res, next) {
  // To-DO: Input Form data processing
  console.log('Name:', req.body.name);
  console.log('Email:', req.body.email);
  console.log('Contact Number:', req.body.contactNumber);
  console.log('Message:', req.body.message);

  // redirect to index page after submission
  res.render('index', { title: 'Home', message: 'Form submitted successfully!' });
});

module.exports = router;
