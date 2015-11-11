'use strict';

var express = require('express');
var router = express.Router();
var Contacts = require('../models/contact'); // our Model


// responds with the the array of contacts
router.get('/', function(req, res) {
  Contacts.list(function(err, contact) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send(contact);
    }
  });
});

// expect req.body.contact to consist of an object with keys
// name, email, phone, twitter, group
router.post('/', function(req, res) {
  var contact = req.body.contact;
  Contacts.add(contact, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Contact created.');
    }
  });
});

// expect the md5 hash of the concatenated data from the contact to delete
// e.g. md5('Nicholasnicholas@gmail.com555-555-5555Babelthuapfamily')
//      === '19da48bbb8fd16367fe9793bb0558ee0'
router.delete('/', function(req, res) {
  var hash = req.body.hash;
  Contacts.remove(hash, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Contact removed.');
    }
  });
});

router.put('/', function(req, res) {
  var contact = req.body.contact;
  Contacts.update(contact, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Contact updated.');
    }
  });
});

module.exports = router;
