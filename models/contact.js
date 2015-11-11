'use strict';

var fs = require('fs');
var Todo = {};

Todo.find = function(cb) {
  fs.readFile('db/contacts.json', 'utf-8', function(err, data) {
    if (err) {
      cb(err);
    } else {
      if (data) {
        var todos = JSON.parse(data);
      }
      cb(null, todos || []);
    }
  });
}

Todo.add = function(todo, cb) {
  console.log(`\ntrying to add: ${todo}\n`); // DEBUG
  fs.readFile('db/contacts.json', 'utf-8', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var todos = JSON.parse(data);
      todos.push({task: todo, done: false});

      fs.writeFile('db/contacts.json', JSON.stringify(todos), cb);
    }
  });
}

Todo.toggle = function(toToggle, cb) {
  console.log(`\ntrying to toggle: ${toToggle}\n`); // DEBUG
  fs.readFile('db/contacts.json', 'utf-8', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var todos = JSON.parse(data);

      // find the task toToggle in todos and toggle its "done" value
      var tasks = todos.map(item => item.task);
      var i = tasks.indexOf(toToggle);
      todos[i].done = !todos[i].done;

      fs.writeFile('db/contacts.json', JSON.stringify(todos), cb);
    }
  });
}

Todo.remove = function(toRemove, cb) {
  console.log(`\nremoving: ${toRemove}\n`); // DEBUG
  fs.readFile('db/contacts.json', 'utf-8', function(err, data) {
    if (err) {
      cb(err);
    } else {
      var todos = JSON.parse(data);

      // find the task toRemove in todos and delete it
      var tasks = todos.map(item => item.task);
      var i = tasks.indexOf(toRemove);

      if (i !== -1) {
        todos.splice(i, 1);
        fs.writeFile('db/contacts.json', JSON.stringify(todos), cb);
      } else {
        cb('task not present');
      }
    }
  });
}

module.exports = Todo;
