// include express module and other supporting modules
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const port = 3000; // launch app at port 3000

// config EJS as 
app.set('view engine', 'ejs');

// mount middleware functions
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('node_modules'));

// routing to pages
var str1 = '<br/> COMP229 Assignment 1 <br/> Portfolio Express Website';
app.get('/', (req, res) => {
  res.send('Home page' + str1);
});

var str2 = '<br/> Hello, my name is Xavier and I am from Hong Kong. <br/>' +
            'I have spent the past decade working in the IT industry <br/>' +
            'and am now excited to take my career to the next level <br/>' +
            'by studying software engineering technology, with a focus on AI. <br/>' +
            'I have always been fascinated by the potential of AI <br/>' +
            'and I am eager to apply my experience and new skills <br/>' +
            'to stay on the cutting edge of technology. <br/>' +
            'I am excited to be here and looking forward to <br/>' +
            'learning from and working with everyone. <br/>';
app.get('/about', (req, res) => {
  res.send('About Me' + str2);
});

var str3 = '<br/> 1. Management of Information System <br/> 2. Insurance Policy Underwriting <br/> 3. Exam Personnel Management';
app.get('/projects', (req, res) => {
  res.send('Projects' + str3);
});

var str4 = '<br/> 1. IT Consultancy <br/> 2. System Design <br/> 3. System Integration <br/>'
app.get('/services', (req, res) => {
  res.send('Services' + str4);
});

var str5 = '<br/> Email: yli549@my.centennialcollege.ca'
app.get('/contact', (req, res) => {
  res.send('Contact Me' + str5);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});