/* 
  File Name:     /routes/index.js 
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          27-FEB-2023 
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

module.exports = router;
