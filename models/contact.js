'use strict';

var fs = require('fs');
var md5 = require('md5');
var Contacts = {};

// to be used as:  var hashes = contacts.map(hashContact);
function hashContact(contact) {
  var keys = Object.keys(contact);
  var data = keys.reduce((tot, key) => (tot + contact[key]), '');
  return md5(data);
}

Contacts.list = function(cb) {
  fs.readFile('db/contacts.json', function(err, data) {
    if (err) {
      cb(err);
    } else {
      if (data) {
        var contacts = JSON.parse(data);
      }
      cb(null, contacts || []);
    }
  });
}

Contacts.add = function(contact, cb) {
  console.log(`\to add: ${contact}\n`); // DEBUG
  fs.readFile('db/contacts.json', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);
      contacts.push(contact);
      fs.writeFile('db/contacts.json', JSON.stringify(contacts), cb);
    }
  });
}

Contacts.remove = function(hash, cb) {
  console.log(`\nremoving: ${hash}\n`); // DEBUG
  fs.readFile('db/contacts.json', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var contacts = JSON.parse(data);

      // find the hash in contacts and delete it
      var hashes = contacts.map(hashContact);
      var i = hashes.indexOf(hash);

      if (i !== -1) {
        contacts.splice(i, 1);
        fs.writeFile('db/contacts.json', JSON.stringify(contacts), cb);
      } else {
        cb('contact not present');
      }
    }
  });
}

Contacts.update = function(hash, contact, cb) {
  console.log(`\nto update: ${contact}\n`); // DEBUG
  Contacts.remove(hash, function(err) {
    if (!err) {
      Contacts.add(contact, cb);
    } else {
      cb(err);
    }
  });
}

module.exports = Contacts;
