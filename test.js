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

seed db:
[{"name":"Nicholas","email":"nicholas@gmail.com","phone":"555-555-5555","twitter":"Babelthuap","group":"family"},{"name":"Benjamin","email":"gorrel@gmail.com","phone":"222-333-4444","twitter":"@dragon","group":"family"}]

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

the md5 hash of that contact is 46af1d9c37913b9f97c7c5b4f56f1d55
so DELETE it with
{
  "hash": "46af1d9c37913b9f97c7c5b4f56f1d55"
}

can update (PUT) with, say
{
  "hash": "46af1d9c37913b9f97c7c5b4f56f1d55",
  "contact": {
    "name": "Benjamin",
    "email": "gorrel@gmail.com",
    "phone": "222-333-4444",
    "twitter": "@dragon",
    "group": "HE'S MY BROTHER"
  }
}

(which then has a hash of 5fa0c0dad7673a873def7c6426ed10de)





*/