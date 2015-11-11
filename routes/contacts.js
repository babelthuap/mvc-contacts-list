'use strict';

var express = require('express');
var router = express.Router();
var Todo = require('../models/contact'); // our Model


// responds with the the array of todos
router.get('/', function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send(todos);
    }
  });
});

// accepts a req.body with a key "task", & adds that task to the list
router.post('/', function(req, res) {
  var task = req.body.task;
  Todo.add(task, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Todo created.');
    }
  });
});

// accepts a req.body that has a key "task", & toggles that task
router.put('/', function(req, res) {
  var toToggle = req.body.task;
  Todo.toggle(toToggle, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Task toggled.');
    }
  });
});

// accepts a req.body that has a key "task", & removes that task
router.delete('/', function(req, res) {
  var toRemove = req.body.task;
  Todo.remove(toRemove, function(err) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send('Task removed.');
    }
  });
});

module.exports = router;
