'use strict';

var PORT = process.env.PORT || 3000;

// MODULES
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');


// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// ROUTES
app.use('/', require('./routes/index'));
app.use('/contacts', require('./routes/contacts'));


// 404 HANDLER
app.use(function(req, res) {
  res.status(404).send('404 File Not Found');
})

app.listen(PORT, function() {
  console.log('listening on port %s', PORT);
});
