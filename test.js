'use strict';

var request = require('request');

function test(cb){
  console.log('\n--GET CONTACTS LIST--');
  request.get('http://localhost:3000/contacts', cb); // should get contacts list

  // console.log('\n--ADD NEW CONTACT--');
  // request.post('http://localhost:3000/contacts', cb);  

  // console.log('\n--GET CONTACTS LIST AGAIN--');
  // request.get('http://localhost:3000/contacts', cb);
}



test(function(err, data){
  if(err){
    console.log('ERROR:', err, '\n');
  } else {
    console.log('DATA:', data.body, '\n');
  }
});


/*

can POST to http://localhost:3000/contacts successfully with a body of
{
  "contact": {
    "name": "Benjamin",
    "email": "gorrel@gmail.com",
    "phone": "222-333-4444",
    "twitter": "@dragon",
    "group": "family"
  }
}

the md5 hash of that contact is 7863141326dade91ca7084d12583c04c
so DELETE it with
{
  "hash": "7863141326dade91ca7084d12583c04c"
}

can update (PUT) with, say
{
  "hash": "7863141326dade91ca7084d12583c04c",
  "contact": {
    "name": "Benjamin",
    "email": "gorrel@gmail.com",
    "phone": "222-333-4444",
    "twitter": "@dragon",
    "group": "none"
  }
}

*/