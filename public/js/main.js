'use strict';

$(document).ready(function() {

  let $list = $('#list');

  $('#add').click(add);
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

  function add() {
    let info = {};
    ['Name', 'Email', 'Phone', 'Twitter', 'Group'].forEach(field => {
      info[field] = $(`input#${field}`).val();
    });

    $.post('/contacts', {contact: info})
    .done(() => window.location.reload())
    .fail(err => console.log("ERROR ADDING CONTACT:", err));
  }

  function remove() {
    let $contact = $(this).closest('tr');
    console.log('remove!', $contact);
    console.log('hash:', hashContact($contact));

    $.ajax({
      method: 'DELETE',
      url: '/contacts',
      data: {hash: hashContact($contact)}
    })
    .done(() => window.location.reload())
    .fail(err => console.log("ERROR DELETING CONTACT:", err));
  }

  function edit() {
    let $contact = $(this).closest('tr');
    console.log('edit!', $contact);
    console.log('hash:', hashContact($contact));
  }

  function hashContact($contact) {
    let $tds = $contact.find('td');
    let numFields = $tds.length - 1;
    let data = '';
    for (let i = 0; i < numFields; i++) {
      data += '%' + $tds[i].innerHTML;
    }
    console.log('data:', data); // DEBUG
    return md5(data);
  }

});
