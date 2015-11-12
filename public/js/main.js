'use strict';

$(document).ready(function() {

  const KEYS = ['Name', 'Email', 'Phone', 'Twitter', 'Group'];
  let $list = $('#list');
  let $editing;

  $('#add').click(getNewContact);
  $('#new input').on('keypress', e => {
    if (e.keyCode === 13) {
      add();
      $('#Name').focus();
    }
  })

  $list.on('click', '.remove', remove);
  $list.on('click', '.edit', edit);


  function getNewContact() {
    $editing = undefined;
    $('#editName').text('New Contact');
    $('#editingForm input').val('');
    $('#commit').off('click').text('Add').on('click', add);
  }


  function add() {
    if ($('#modalName').val()) {
      let info = {};
      KEYS.forEach(key => {
        info[key] = $(`#modal${key}`).val();
      });
      $('#new input').val('');

      $.post('/contacts', {contact: info})
      .done(() => $list.append(addRow(info)))
      .fail(err => console.log("ERROR ADDING CONTACT:", err));
    }
  }


  function addRow(info) {
    let $row = $('<tr>');
    KEYS.forEach(key => {
      $row.append( $('<td>').text(info[key]) );
    });

    let $edit = $('<button>').addClass('edit')
      .append( $('<i>').addClass("fa fa-pencil-square-o") )
      .attr('data-toggle', 'modal')
      .attr('data-target', '#myModal')
    let $remove = $('<button>').addClass('remove')
      .append( $('<i>').addClass("fa fa-times") );
    $row.append( $('<td>').append([$edit, $remove]) );

    return $row;
  }


  function remove() {
    let $contact = $(this).closest('tr');

    $.ajax({
      method: 'DELETE',
      url: '/contacts',
      data: {hash: hashContact($contact)}
    })
    .done(() => $contact.remove())
    .fail(err => console.log("ERROR DELETING CONTACT:", err));
  }


  function edit() {
    $('#commit').off('click').text('Update').on('click', update);

    $editing = $(this).closest('tr');
    $('#editName').text( 'Edit ' + $editing.find(':first-child').text() );

    // set the modal's inital field values
    KEYS.forEach((key, i) => {
      let current = $editing.find(`td:nth-of-type(${i + 1})`).text();
      $(`#modal${key}`).val(current);
    });
  }


  function update() {
    let newInfo = contactInfoFromModal();

    $.ajax({
      method: 'PUT',
      url: '/contacts',
      data: {hash: hashContact($editing), contact: newInfo}
    })
    .done(() => {
      // update locally
      $editing.find('td:not(:last-child)').each((i, field) => {
        let newValue = newInfo[ KEYS[i] ];
        $(field).text(newValue);
      });
    })
    .fail(err => console.log("ERROR UPDATING CONTACT:", err));
  }


  function contactInfoFromModal() {
    let contact = {};
    KEYS.forEach(key => {
      contact[key] = $('#editingForm').find(`#modal${key}`).val();
    });
    return contact;
  }


  function hashContact($contact) {
    let data = '';
    $contact.find('td:not(:last-child)').each((_, td) => {
      data += '%' + td.innerHTML;
    });
    return md5(data);
  }

});
