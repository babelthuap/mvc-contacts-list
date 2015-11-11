'use strict';

$(document).ready(function() {
  console.log('jQuery working!');

  $('#retrieve').click(getList);

  function getList() {
    $.get('/contacts')
    .done(function(contacts) {
      console.log('contacts:', contacts);
      if (contacts.length > 0) {
        let $tbody = $('<tbody>');
        contacts.forEach(contact => {
          $tbody.append( createRow(contact) );
        });
        $('#list').empty().append($tbody);
      }
    });
  };

  function createRow(contact) {
    let keys = Object.keys(contact);
    let $row = $('<tr>');
    keys.forEach(key => {
      $row.append( $('<td>').text(contact[key]) );
    });
    return $row;
  }

});
