'use strict';

$(document).ready(function() {

  let $list = $('#list');

  $list.on('click', '.remove', remove);
  $list.on('click', '.edit', edit);

  // function createRow(contact) {
  //   let keys = Object.keys(contact);
  //   let $row = $('<tr>');
  //   keys.forEach(key => {
  //     $row.append( $('<td>').text(contact[key]) );
  //   });
  //   let $remove = $('<button>').addClass('remove').text('X');
  //   let $edit = $('<button>').addClass('edit').append( $('<i>').addClass("fa fa-pencil-square-o") );
  //   $row.append( $('<td>').append([$remove, $edit]) );
  //   return $row;
  // }

  function remove() {
    let $contact = $(this).closest('tr');
    console.log('remove!', $contact);
    console.log('hash:', hashContact($contact));
  }

  function edit() {
    let $contact = $(this).closest('tr');
    console.log('edit!', $contact);
  }

  function hashContact($contact) {
    let $tds = $contact.find('td');
    let numFields = $tds.length - 1;
    let data = '';
    for (let i = 0; i < numFields; i++) {
      data += $tds[i].innerHTML;
    }
    console.log('data:', data);
    return md5(data);
  }

});
