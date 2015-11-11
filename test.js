'use strict';

var request = require('request');

function test(cb){
  request.get('http://localhost:3000/contacts', cb);
}

test(function(err, data){
  if(err){
    console.log('ERROR:', err);
  } else {
    console.log('DATA:', data.body);
  }
});
