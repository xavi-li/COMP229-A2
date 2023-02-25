/* 
  File Name:     /routes/index.js 
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          05-FEB-2023 
*/

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index'); 

router.get('/', indexController.displayHomePage);
router.get('/about', indexController.displayAboutPage);
router.get('/projects', indexController.displayProjectsPage);
router.get('/services', indexController.displayServicesPage);
router.get('/contact', indexController.displayContactPage);
router.get('/login', indexController.displayLoginPage);
router.post('/login',indexController.processLoginPage);
router.get('/logout', indexController.performLogout);



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home', message: ''});
// });


// router.get('/about', function(req, res, next) {
//   res.render('about', { title: 'About Me' });
// });


// router.get('/projects', function(req, res, next) {
//   res.render('projects', { title: 'Projects Showcase'});
// });


// router.get('/services', function(req, res, next) {
//   res.render('services', { title: 'Services Available' });
// });


// router.get('/contact', function(req, res, next) {
//   res.render('contact', { title: 'Contact Me' });
// });


// router.post('/', function(req, res, next) {
//   // To-DO: Input Form data processing
//   console.log('Name:', req.body.name);
//   console.log('Email:', req.body.email);
//   console.log('Contact Number:', req.body.contactNumber);
//   console.log('Message:', req.body.message);

//   // redirect to index page after submission
//   res.render('index', { title: 'Home', message: 'Form submitted successfully!' });
// });


module.exports = router;
