'use strict';

var express = require('express');
var router = express.Router();
var Contacts = require('../models/contact'); // our Model


// responds with just the the array of contacts
router.get('/list', function(req, res) {
  Contacts.list(function(err, contacts) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send(contacts);
    }
  });
});

// responds with the rendered page of contacts
router.get('/', function(req, res) {
  Contacts.list(function(err, contacts) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.render('contacts', {contacts: contacts});
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
// e.g. md5('%Nicholas%nicholas@gmail.com%555-555-5555%@Babelthuap%family')
//      === '7ded8a1e66b36af17ef260abc3ed71ff'
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

// expect hash of contact to update along with new version of contact
// in {"hash": <hash>, "contact": <contact>}
router.put('/', function(req, res) {
  var hash = req.body.hash;
  var contact = req.body.contact;
  Contacts.update(hash, contact, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Contact updated.');
    }
  });
});

module.exports = router;
