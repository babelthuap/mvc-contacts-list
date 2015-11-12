'use strict';

var fs = require('fs');
var md5 = require('md5');

var Contacts = {};
var db = 'db/contacts.json';
const KEYS = ["Name", "Email", "Phone", "Twitter", "Group"];

function hashContact(contact) {
  var data = KEYS.reduce((tot, key) => (tot + '%' + contact[key]), '');
  return md5(data);
}

Contacts.list = function(cb) {
  fs.readFile(db, function(err, data) {
    if (err) return cb(err);
    var contacts = JSON.parse(data);
    cb(null, contacts || []);
  });
}

Contacts.add = function(contact, cb) {
  Contacts.list(function(err, contacts) {
    contacts.push(contact);
    fs.writeFile(db, JSON.stringify(contacts), cb);
  });
}

Contacts.remove = function(hash, cb) {
  Contacts.list(function(err, contacts) {
    // find the hash in hashes (a list of the contacts' hashes) and delete it
    var hashes = contacts.map(hashContact);
    var i = hashes.indexOf(hash);

    if (i !== -1) {
      contacts.splice(i, 1);
      fs.writeFile(db, JSON.stringify(contacts), cb);
    } else {
      cb('contact not present');
    }
  });
}

Contacts.update = function(hash, contact, cb) {
  Contacts.remove(hash, function(err) {
    if (!err) {
      Contacts.add(contact, cb);
    } else {
      cb(err);
    }
  });
}

module.exports = Contacts;
